---
title: BM25 Is Simple Until The Index Gets Huge
description: A systems-minded reading of Exa's BM25 optimisation post, and why keyword retrieval starts to look like a memory-layout problem at web scale.
date: 2026-05-29
---

I used to think of Best Matching 25 (BM25) mainly as a ranking formula. A query comes in, documents get scored based on term frequency, inverse document frequency, and document length, and the search engine returns the best matches. That is the version that usually shows up in learning notes because it is the part we can write down neatly.

Exa's post on [serving BM25 with more than 50% memory reduction](https://exa.ai/blog/bm25-optimization) made the problem feel less neat in a useful way. The post is not really about inventing a new ranking function. It is about making the old ranking function cheap enough to serve across billions of documents. Once the index gets large, BM25 stops being only an information retrieval idea. It becomes a question of bytes, buffers, gaps between document identifiers, cache locality, and how much overhead is hiding inside a data structure that looked innocent at small scale.

That is the part I want to slow down on. Not BM25 versus embeddings again. I covered that broader retrieval split in [Why Semantic Search Still Needs Exact Words](#/rabbit-hole/bm25-embeddings-hybrid-retrieval). This post is narrower: what changes when the keyword layer has to fit into memory, stay fast, and still be large enough to matter?

## BM25 Is Only Half The Story

BM25 scores documents by asking a few simple questions. Does the document contain the query term? Is that term rare across the corpus? How often does it appear in this document? Is the document unusually long? The common form looks like this:

$$
\mathrm{score}(D, Q) = \sum_{t \in Q} \mathrm{IDF}(t) \cdot \frac{f(t, D)(k_1 + 1)}{f(t, D) + k_1\left(1 - b + b \frac{|D|}{\mathrm{avgdl}}\right)}
$$

Here, $D$ is the document, $Q$ is the query, and $t$ is a query term. $f(t, D)$ is the term frequency in the document. $|D|$ is the document length, $\mathrm{avgdl}$ is the average document length, and $k_1$ and $b$ control term frequency saturation and length normalisation.

The exact formula matters, but it is not the main character here. The formula tells us what information the system needs: for each query term, it needs to know which documents contain that term and how often the term appears. That requirement quietly implies a storage contract.

## From Formula To Inverted Index

A search engine does not want to scan every document whenever someone types a query. Instead, it uses an inverted index. A forward index asks, "what terms are in this document?" An inverted index asks the more useful search-time question: "which documents contain this term?"

For a tiny corpus, the idea is simple:

```text
doc1: rabbit hole search
doc2: rabbit search engine
doc3: search ranking search
```

The inverted index might look like this:

```text
rabbit  -> [(doc1, tf=1), (doc2, tf=1)]
hole    -> [(doc1, tf=1)]
search  -> [(doc1, tf=1), (doc2, tf=1), (doc3, tf=2)]
engine  -> [(doc2, tf=1)]
ranking -> [(doc3, tf=1)]
```

Each token points to a postings list. Each posting says that the token appears in a document, usually with enough metadata to score it. For BM25, the important metadata is term frequency. Exa describes their baseline representation as a hashmap from `token_id` to a list of `(doc_id, freq_count)` pairs, sorted by ascending document identifier.

At this size, nothing looks scary. The structure is clear, direct, and easy to reason about. But this is also where the trap starts. A representation can be logically clean and physically expensive.

## Scale Makes The Obvious Layout Expensive

Exa says its BM25 index used more than 1.8 terabytes per billion indexed documents across distributed workers. That number is the hinge of the post. At web scale, every posting is multiplied by a large corpus, a large vocabulary, and a long tail of tokens. The annoying details stop being details.

Fixed-width 32-bit document identifiers take four bytes each. Repeated frequency values take more space. Tuples can have padding and alignment waste. Each postings list may have its own allocation. Each small buffer may carry metadata. None of these sound dramatic alone, but a search index is mostly repetition. If a small overhead appears billions of times, it becomes architecture.

This is also where memory affects more than the cloud bill. A larger index can mean more machines, more coordination, worse cache locality, more bytes fetched per query, and more pressure on the retrieval layer that sits before any reranker or language model. If lexical retrieval is part of a hybrid system, the cost of this layer shapes the cost of the whole pipeline.

So the real question becomes: can we preserve the information BM25 needs while changing the physical shape of the index?

## Store Less Repeated Frequency Data

The first move is to notice that the naive posting stores two things together:

```text
(doc_id, term_frequency)
```

For one token, that might look like this:

```text
[(12, 1), (53, 1), (88, 1), (101, 2), (155, 1)]
```

The frequency value `1` appears again and again. That is not surprising. Many tokens appear once in a document. Some appear twice. Fewer appear many times. BM25 also has term frequency saturation, so the jump from one to two occurrences usually matters more than the jump from fifty to fifty-one.

Exa's layout groups documents by frequency:

```text
tf=1 -> [12, 53, 88, 155]
tf=2 -> [101]
```

This changes the representation from "each document carries its own frequency" to "each frequency carries a list of documents". The scoring information is still there, but the repeated frequency value has been moved out of every posting and stored once per group.

This is not yet about compressing document identifiers. It is about removing frequency metadata that did not need to be repeated. The distinction matters because the next optimisation attacks a different part of the posting. Frequency grouping reduces one kind of redundancy. Document identifier encoding reduces another.

## Make Document Identifiers Compressible

The document identifiers are the larger prize. A 32-bit document identifier takes four bytes whether the number is `7` or `987654321`. That is wasteful if the numbers inside a postings list have structure.

Postings lists are usually sorted by document identifier:

```text
[1050, 1082, 1091, 1300]
```

Once a list is sorted, we do not have to store every absolute identifier. We can store the gap from the previous identifier:

```text
[1050, 32, 9, 209]
```

This is delta encoding, sometimes called storing d-gaps in information retrieval. The first number may still be large, but many of the following gaps are much smaller than the original identifiers. The important point is that sorting creates the possibility of smaller numbers.

Smaller numbers are useful because they can be stored with variable-length integer encoding. In a fixed-width layout, every integer might take four bytes. In a variable-length layout, small integers take fewer bytes, while large integers take more. A rough mental model is:

```text
0 to 127       -> 1 byte
128 to 16,383  -> 2 bytes
larger values  -> more bytes
```

The exact encoding details can vary, but the intuition is enough. Delta encoding turns a sorted list of large-ish absolute identifiers into a list where many values are small. Variable-length encoding then rewards those small values.

Exa reports that this step reduced average document identifier overhead from four bytes to about 1.3 bytes. That is a large saving because document identifiers appear everywhere in the index.

There is a useful chain here:

```text
sorted doc_ids -> smaller gaps -> cheaper integer encoding -> fewer bytes to store and scan
```

This is the crux of the post for me. Compression does not appear at the end as a magic shrink-wrap layer. The data structure is being shaped so that compression has something to exploit. Grouping creates regularity. Sorting creates small gaps. Variable-length encoding converts those small gaps into fewer bytes. General-purpose compression can then work on a representation that is already friendlier to it.

Exa also applies Zstandard (zstd) compression to large postings lists. That makes sense if the access pattern is mostly streaming: pick a postings list, decompress it progressively, decode the integers, reconstruct the document identifiers, score the candidates. It is less obviously ideal if the system needs lots of random access into the middle of a compressed list. This is one of the trade-offs that keeps the topic interesting. A compression scheme is never just a compression scheme. It is also a bet on how the data will be read.

## The Overhead After The Obvious Overhead

Once the payload shrinks, the wrapper starts looking large. This is the slightly funny part of systems work. You optimise the big thing, and suddenly the thing around it looks unreasonable.

Frequency grouping can introduce nested buffers. A simple representation might store one buffer per frequency group:

```text
[
  (tf=1, Vec<encoded_doc_ids>),
  (tf=2, Vec<encoded_doc_ids>),
  (tf=3, Vec<encoded_doc_ids>)
]
```

That is convenient, but every inner buffer has metadata and usually its own allocation. In Rust, a `Vec<T>` is commonly represented by a pointer, length, and capacity. On a 64-bit system, that is 24 bytes before thinking about allocator overhead. If a token has many small groups, the bookkeeping can become embarrassingly large relative to the useful data.

Exa's answer is to flatten the frequency groups into one buffer, separated by reserved bytes, and use compact metadata to recover which frequencies are present. Conceptually:

```text
frequencies present: {1, 2}
data: [encoded tf=1 docs][separator][encoded tf=2 docs]
```

This is no longer just "store the same data in fewer bytes". It is reducing allocations, reducing per-buffer metadata, and making the access pattern more contiguous.

The same logic applies across tokens. Instead of keeping each token's compressed postings in its own `Vec`, Exa consolidates postings into one large buffer and stores offsets and lengths. The mapping becomes something like:

```text
token_id -> (offset, length)
```

That turns many separate allocations into slices of one larger byte array. Exa says this reduces per-token metadata from 24 bytes to 8 bytes by using two 32-bit integers for offset and length.

The singleton case is another version of the same idea. Some tokens appear in only one document. Web corpora have a long tail: typos, identifiers, rare names, hashes, strange strings, and one-off phrases. Giving a one-document token the full postings-list treatment is wasteful. If the token appears once, the index can often store the document identifier directly.

This is easy to call obvious after the fact. It is less obvious until you look at the distribution and realise the long tail is not a corner case. At web scale, rare tokens are everywhere.

## Why Smaller Can Also Be Faster

The surprising claim in Exa's post is that memory fell by more than 50%, while average query latency also dropped by about 10%. Compression is often casually associated with slowness because decompression costs central processing unit (CPU) time. But the real question is what the system was waiting on before.

A rough model is:

```text
uncompressed_time = memory_read_time(large_data) + scoring_time
```

With compression:

```text
compressed_time =
  memory_read_time(smaller_data)
  + decompression_time
  + decoding_time
  + scoring_time
```

Compression helps latency when the memory time saved is larger than the decompression and decoding time added:

```text
memory_read_time(large_data) - memory_read_time(smaller_data)
>
decompression_time + decoding_time
```

That inequality is not guaranteed. If a workload is CPU-bound, or if the encoding is branchy and expensive to decode, compression can hurt. If the system needs random access into compressed blocks, whole-list compression may also become awkward.

But Exa's result is plausible because search over postings can be heavily shaped by memory behaviour. Fewer bytes read can mean fewer cache misses. A more compact working set can fit better into cache. Consolidated buffers can reduce pointer chasing. Fewer allocations can improve locality. If the earlier representation forced the CPU to wait on memory, spending some extra CPU cycles on decoding can still be a good trade.

This is the part I like because it resists the simple story. Compression is not automatically good for latency. It can be good when the original bottleneck was moving too many scattered bytes through the machine.

## What I Would Explore Next

Exa's post opens a deeper rabbit hole than it closes. The natural next questions are less about whether their approach is "right" in the abstract and more about where the trade-offs move under different workloads.

One direction is alternative integer encodings. Variable-byte encoding is easy to understand, but information retrieval systems also use schemes such as Simple-9, Simple-16, PForDelta, packed blocks, and Elias-Fano. These make different trade-offs between compression ratio, decoding speed, skipping support, and implementation complexity.

Another direction is block-level structure. Whole-list streaming compression is attractive if the query algorithm scans selected postings lists end to end. But top-k retrieval often wants to skip. Weak AND (WAND) and Block-Max WAND style methods rely on upper bounds and block-level pruning so the system can avoid scoring documents that cannot enter the top results. If a postings list is compressed as one stream, skipping becomes a different problem from scanning.

I would also want to separate query classes. Rare identifier queries, medium-frequency topic queries, and common broad queries may stress the index differently. The best encoding for a singleton token is probably not the best encoding for a token that appears in half the corpus. Average latency is useful, but percentile latency would say more about the painful cases.

There is also a comparison to production search engines like Lucene. Lucene's postings formats already use ideas such as delta encoding, packed blocks, variable integers, skip data, and singleton handling. That does not make Exa's work uninteresting. It places it in a longer tradition: search systems have always been part ranking theory, part compression engineering, and part hardware negotiation.

## The Mental Model I Would Keep

The clean mental model is that BM25 is a ranking formula. The more useful production mental model is that BM25 is also an access path into a huge corpus.

The formula decides how evidence should be scored. The inverted index decides whether that evidence can be found quickly. The memory layout decides how many bytes the machine must touch before scoring can even happen.

That is why Exa's post is worth reading even if you already know BM25. It shows the point where retrieval stops looking like a neat equation and starts looking like a physical object. The ranking equation is still there, but the performance story lives in the representation: what gets repeated, what gets grouped, what gets delta-encoded, what gets compressed, and what can be skipped or streamed.

Semantic search may have made retrieval feel more neural, but exact-match search still lives or dies on old systems questions: what do we store, in what order, and how many bytes do we need to touch before we can answer?

## Further Reading

- Tom An, ["Serving BM25 with 50% memory reduction using a novel encoding scheme"](https://exa.ai/blog/bm25-optimization), Exa, 2025 - the post this note is responding to.
- Robertson et al., ["Okapi at TREC-3"](https://ir.webis.de/anthology/1994.trec_conference-1994.11/), 1994 - canonical BM25 lineage.
- Manning, Raghavan, and Schutze, ["Okapi BM25: a non-binary model"](https://nlp.stanford.edu/IR-book/html/htmledition/okapi-bm25-a-non-binary-model-1.html), *Introduction to Information Retrieval* - clear textbook treatment of BM25.
- Manning, Raghavan, and Schutze, ["Index compression"](https://nlp.stanford.edu/IR-book/html/htmledition/index-compression-1.html), *Introduction to Information Retrieval* - useful background on dictionary and postings compression.
- Broder et al., ["Efficient query evaluation using a two-level retrieval process"](https://research.google/pubs/efficient-query-evaluation-using-a-two-level-retrieval-process/), 2003 - Weak AND (WAND) retrieval.
- Apache Lucene, [`Lucene101PostingsFormat`](https://lucene.apache.org/core/10_1_0/core/org/apache/lucene/codecs/lucene101/Lucene101PostingsFormat.html) - production-style postings compression and singleton handling.
- Facebook, [`zstd`](https://github.com/facebook/zstd) - reference implementation for Zstandard compression.
