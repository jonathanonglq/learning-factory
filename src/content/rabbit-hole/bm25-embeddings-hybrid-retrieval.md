---
title: BM25, Embeddings, and Hybrid Retrieval
description: Why keyword search still matters, what dense embeddings add, and how hybrid retrieval combines lexical and semantic signals before reranking.
date: 2026-05-29
---

Search sounds like a solved problem until you try to build it. A user asks a question, the system finds relevant documents, and the rest feels like ranking and interface work. Then the edge cases arrive. Some queries need exact words. Some need meaning. Some need both at once, and some fail because a single rare term was treated as if it were just another word.

This is why retrieval systems still combine older keyword methods with newer embedding methods. Okapi BM25, usually just called BM25, is a sparse retrieval method that rewards exact lexical overlap. Dense embeddings are vector representations that make semantic similarity searchable. Rerankers add a more careful judgement step after the first retrieval pass. The practical question is less about which method is philosophically superior and more about which failure modes you can tolerate.

## Sparse retrieval starts with counting, but not naive counting

Sparse retrieval represents text by the terms it contains. A query like `flashattention cuda kernel` is treated as a set of lexical signals, and documents are scored according to how strongly they match those signals. The word `kernel` matters. The word `cuda` matters. A common word like `the` should barely move the score.

BM25 is one of the most widely used sparse retrieval functions because it encodes a few useful intuitions in a compact formula. For a query $Q$ and document $D$, the BM25 score is usually written as:

$$
\mathrm{score}(D, Q) = \sum_{t \in Q} \mathrm{IDF}(t) \cdot \frac{f(t, D)(k_1 + 1)}{f(t, D) + k_1\left(1 - b + b \frac{|D|}{\mathrm{avgdl}}\right)}
$$

Here, $t$ is a term in the query, $f(t, D)$ is the number of times term $t$ appears in document $D$, $|D|$ is the length of the document, and $\mathrm{avgdl}$ is the average document length in the corpus. The constants $k_1$ and $b$ control how quickly repeated terms saturate and how much document length should be normalised.

There are three ideas inside the equation. First, matching query terms should help. Second, repeated matches should help less and less after a point. Third, a long document should not win purely because it has more chances to contain the query terms by accident.

The inverse document frequency (IDF) term handles rarity. A common version looks like this:

$$
\mathrm{IDF}(t) = \log\left(1 + \frac{N - n(t) + 0.5}{n(t) + 0.5}\right)
$$

$N$ is the total number of documents, and $n(t)$ is the number of documents containing term $t$. If a term appears in nearly every document, it is weak evidence. If it appears in only a few documents, it is strong evidence. This is why a rare phrase, product name, function name, or paper title can dominate a BM25 result in a sensible way.

## Why exact words still matter

BM25 is literal, and that literalness is often a feature. If a user searches for Hierarchical Navigable Small World (HNSW), a keyword system will look for HNSW. If a user pastes an error message, a legal section, a benchmark name, or a model checkpoint, the exact string is probably not incidental. It is the thing being searched for.

Dense systems can blur these details because they are trained to place related meanings near each other. That is useful when the user does not know the exact term, but it can be annoying when the exact term is the query. `BM25` and `BERT` both sit in the broader Natural Language Processing (NLP) neighbourhood. A semantic retriever may know they are related, but a user asking for BM25 probably does not want an answer about BERT just because both are associated with search or language models.

This is the part I find easy to forget when reading about semantic search. Many real queries are not beautifully phrased questions. They are fragments. Acronyms. Stack traces. Half-remembered titles. Names of systems. A retrieval method that respects surface form is still doing useful work.

BM25 also has the underrated advantage of being inspectable. If a document ranks highly, you can usually see which words matched and why they mattered. That makes debugging easier. When retrieval goes wrong, you can ask whether the relevant document contained the query term, whether the term was too common, or whether length normalisation behaved oddly.

## Where sparse retrieval gets stuck

Keyword search struggles when the right document uses different words from the query. If someone searches for `how do models remember previous conversations`, the relevant document might talk about context windows, conversation state, retrieval augmented generation, or memory stores. A sparse method cannot easily infer that `remember` and `conversation state` are connected.

This gets worse for beginners because beginners often lack the right vocabulary. A person may understand the problem well enough to ask a reasonable question, but not well enough to use the terms an expert would use. That mismatch is exactly where dense embeddings become useful.

Sparse retrieval also struggles with abstraction. A query like `why benchmarks can mislead model development` could match documents about evaluation leakage, overfitting to leaderboards, data contamination, or poorly designed test sets. The overlap is conceptual rather than lexical. You can add synonyms, query expansion, or hand-built rules, but the system starts to become a patchwork.

This does not make BM25 weak. It means BM25 is answering a narrower question: which documents share important words with the query? Sometimes that is the right question. Sometimes it is not enough.

## Dense embeddings search through geometry

Dense retrieval starts by turning text into vectors. A model maps a query into a vector $\mathbf{q}$ and each document or document chunk into a vector $\mathbf{d}$. Retrieval then becomes a nearest-neighbour problem: find the document vectors closest to the query vector. One common similarity measure is cosine similarity:

$$
\cos(\mathbf{q}, \mathbf{d}) = \frac{\mathbf{q} \cdot \mathbf{d}}{\|\mathbf{q}\| \|\mathbf{d}\|}
$$

The numerator $\mathbf{q} \cdot \mathbf{d}$ measures how much the two vectors point in the same direction. The denominator normalises by their lengths. If the angle between the query and document vectors is small, cosine similarity is high. In plain language, the embedding model is saying: these two pieces of text seem to be about similar things.

This is powerful because it handles vocabulary mismatch. A query about `how models remember previous conversations` can land near text about context windows or retrieval augmented generation (RAG), even if the exact word `remember` never appears. The model has learned that these phrases often live near the same underlying idea.

The cost is that meaning gets compressed. A dense vector is a fixed-size representation of the input text. It can carry a lot of information, but it cannot preserve everything. Exact wording, rare identifiers, and small distinctions may get softened because the model is optimising for semantic neighbourhoods rather than literal string matching.

## Chunking is part of the retrieval model

Dense retrieval often works on chunks rather than full documents. A long article might be split into 300-token or 800-token chunks, perhaps with overlap. Each chunk gets embedded separately, and the search system retrieves chunks instead of whole documents.

This preprocessing decision affects retrieval quality more than it first appears. If chunks are too small, they lose context. A paragraph might refer to `this method` while the previous paragraph explains the method. The chunk embedding becomes weaker because the chunk is incomplete.

If chunks are too large, they mix multiple ideas together. The embedding becomes an average of several topics. A chunk about BM25, dense embeddings, reranking, and indexing may be generally about retrieval, but it may not be sharply about any one of those things.

There is no universally correct chunk size. The right choice depends on the corpus and the task. For source code, function boundaries may matter. For legal text, sections and clauses may matter. For personal notes, headings might be a useful split point. Chunking is not just a storage detail. It shapes what the retriever is capable of finding.

## Approximate nearest neighbour search is the scaling trick

If a corpus has millions or billions of vectors, comparing a query vector to every document vector can be too slow. Dense retrieval systems usually rely on approximate nearest neighbour (ANN) search. The goal is to find vectors that are very close to the query without checking every vector exhaustively.

Hierarchical Navigable Small World (HNSW) graphs are one popular ANN method. The rough idea is to build a graph where each vector is connected to nearby vectors. Search starts from an entry point and walks through the graph towards closer neighbours. Higher layers give faster long-range movement, while lower layers refine the local search.

The word approximate matters. ANN indexes trade a little recall for speed. You may not always get the exact nearest vectors, but you get close enough results much faster. In retrieval systems, that trade-off can be reasonable because the first stage usually produces candidates for a later reranker.

This is another reason dense retrieval should be treated as a system, not just an embedding model. The embedding model, chunking strategy, vector index, search parameters, and reranker all shape the final results.

## Hybrid retrieval combines different signals

Hybrid retrieval uses both sparse and dense retrieval. One simple version runs BM25 and dense search separately, merges the candidate sets, then reranks the merged list. The sparse side catches exact lexical matches. The dense side catches conceptual matches. The reranker gets a broader set of candidates to judge.

There are several ways to combine the scores. If both scores are calibrated onto comparable scales, a weighted sum can work:

$$
\mathrm{score}_{hybrid}(D, Q) = \alpha \cdot \mathrm{score}_{sparse}(D, Q) + (1 - \alpha) \cdot \mathrm{score}_{dense}(D, Q)
$$

$\alpha$ controls how much weight goes to the sparse score. If $\alpha$ is close to 1, the system behaves more like keyword search. If $\alpha$ is close to 0, it behaves more like dense retrieval. The difficult part is that BM25 scores and cosine similarities do not naturally live on the same scale, so score normalisation becomes part of the design.

Another common approach is rank fusion. Reciprocal Rank Fusion (RRF) combines ranked lists without requiring raw scores to be directly comparable:

$$
\mathrm{RRF}(D) = \sum_{r \in R} \frac{1}{k + r(D)}
$$

Here, $R$ is the set of ranking systems, $r(D)$ is the rank position of document $D$ in one ranking, and $k$ is a smoothing constant that reduces the impact of small rank differences near the top. A document that appears reasonably high in both BM25 and dense retrieval can score well, even if the two systems produced very different raw scores.

I like RRF as a mental model because it is modest. It does not pretend that one score space has the final truth. It says: if different retrieval methods agree that a document is useful, pay attention.

## Reranking is where the system spends more judgement

The first retrieval stage is usually built for recall. It should pull in candidates that might be relevant. The reranker is then allowed to be slower and more careful because it only sees a smaller set of candidates.

A cross-encoder reranker, for example, can look at the query and candidate text together. This differs from dense retrieval, where query and document embeddings are usually computed separately. Joint scoring is more expensive, but it lets the model evaluate relevance with more context.

For a query like `why does BM25 still help semantic search`, a reranker can distinguish between a document that merely mentions BM25 and embeddings, and a document that actually explains their complementary failure modes. That distinction is hard to capture with first-stage retrieval alone.

The pattern is common: retrieve broadly, rerank carefully, then pass only the best evidence downstream. In a RAG system, that final context may be fed into a large language model (LLM). If retrieval is weak, the LLM receives poor evidence and may produce a fluent answer built on shaky context.

## Why this matters for RAG

Retrieval augmented generation (RAG) makes retrieval quality part of model behaviour. If the retriever misses the key document, the model may fill the gap. If the retriever finds a loosely related chunk, the answer may sound grounded while relying on the wrong evidence. If the chunk is too broad, the model may quote the right source but answer the wrong question.

For a small personal notes system, BM25 might be enough for exact recall. If I remember writing `Vaccinated Travel Lanes`, keyword search is direct and hard to beat. For broader questions, embeddings help because I may not remember the exact wording I used months ago.

For a serious assistant, I would usually start with hybrid retrieval. Use BM25 for exact terms. Use embeddings for semantic recall. Use reranking to sort the candidates. Then show the retrieved context clearly enough that a human can inspect whether the answer was grounded.

This is the practical lesson for me. Retrieval is not one model choice. It is a sequence of representation choices, filtering choices, indexing choices, and ranking choices. BM25, embeddings, and rerankers each answer a different version of the relevance question, and the best systems tend to keep more than one version alive.
