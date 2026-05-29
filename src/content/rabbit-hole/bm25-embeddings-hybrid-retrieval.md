---
title: Why Semantic Search Still Needs Exact Words
description: A step-by-step look at keyword retrieval, embeddings, hybrid search, and reranking, and why modern search still needs both meaning and literal terms.
date: 2026-05-29
---

Retrieval is what happens before a system can answer, summarise, cite, or reason over anything. A user gives a query. The system searches a corpus. It returns a ranked list of documents or chunks that might be useful. Everything downstream depends on whether the right candidates made it into that list.

That sounds almost too basic until the words stop lining up. Suppose the query is `cheap laptop for college`. One document says `affordable notebook computer for students`. Another says `laptop laptop laptop discount`. A third is a careful `MacBook Pro benchmark review`. A human can see the problem quickly. The first document is probably close to the user's intent even though the words differ. The second has strong word overlap but feels low quality. The third is about laptops, but maybe not about the student's constraint.

This is the search retrieval problem in miniature. Relevance can come from exact wording, similar meaning, or some awkward mixture of both. Best Matching 25 (BM25) is good at preserving lexical evidence. Dense embeddings are good at finding text that uses different words for related ideas. Hybrid retrieval keeps both signals available. Reranking then spends more compute judging the candidates that survived the first pass.

The title of this post is deliberately pointed: semantic search still needs exact words. Not because keyword search is charmingly old, or because embeddings are overhyped. Exact words remain evidence. They are often the only clean signal when the query contains identifiers, constraints, acronyms, versions, error codes, or terms that should not be smoothed into a nearby meaning.

## Start With A Crude Keyword Search

If I were building search from scratch, the most obvious first attempt would be keyword matching. A document that contains words from the query should rank higher than one that does not. For `cheap laptop for college`, the document repeating `laptop` should receive some credit. A document that never mentions laptops at all should probably receive less.

The crude version breaks almost immediately. Common words are not very useful. Repeating a query term should help, but should not let `laptop laptop laptop discount` dominate every result. Long documents have more chances to contain any given word, so they can win by being long rather than being focused. A good keyword ranking function needs to reward overlap without becoming naive about it.

BM25 is one of the standard answers to this. It is a sparse lexical retrieval method: sparse because documents are represented through terms from a vocabulary, and lexical because the signal comes from observed words or analysed tokens. The formula looks intimidating at first, but the intuition is fairly compact. Rare query terms should matter more. Repeated terms should help with diminishing returns. Long documents should be normalised so they do not win just by having more words.

One common simplified form of BM25 over analysed query terms is:

$$
\mathrm{score}(D, Q) = \sum_{q_i \in Q} \mathrm{IDF}(q_i) \cdot \frac{f(q_i, D)(k_1 + 1)}{f(q_i, D) + k_1\left(1 - b + b \frac{|D|}{\mathrm{avgdl}}\right)}
$$

Here, $D$ is the document, $Q$ is the query, and $q_i$ is an analysed query term. $f(q_i, D)$ is the frequency of that term in the document. $|D|$ is the document length, and $\mathrm{avgdl}$ is the average document length in the corpus. $k_1$ controls term frequency saturation, which is how quickly repeated mentions stop adding much new evidence. $b$ controls document length normalisation.

The Inverse Document Frequency (IDF) term gives more weight to terms that appear in fewer documents:

$$
\mathrm{IDF}(t) = \log\left(1 + \frac{N - df(t) + 0.5}{df(t) + 0.5}\right)
$$

$N$ is the number of documents in the corpus, and $df(t)$ is the number of documents containing term $t$. If a word appears everywhere, it is weak evidence. If it appears rarely, it is more informative. This is why a rare error code, function name, or paper title can carry so much weight.

BM25 also depends on what the search engine considers a term. Tokenisation, lowercasing, stemming, lemmatisation, stopword handling, synonym maps, field boosts, and phrase matching can all change what BM25 sees. The equation is only part of the system. The analyser decides whether `run`, `running`, and `runs` are treated as related, whether `Artificial Intelligence (AI)` and `AI` connect, and whether punctuation in an error code is preserved.

So BM25 gives us a better first system than raw counting. It protects exact words from being washed away, and it handles repetition and document length with some care. But it still has a hard dependency: the useful words have to be present, or at least recoverable through the analyser.

## Then The Words Stop Matching

The laptop example exposes the first crack. `Cheap laptop for college` and `affordable notebook computer for students` can describe the same need without sharing the most important words. BM25 has little direct evidence if `cheap` becomes `affordable`, `laptop` becomes `notebook computer`, and `college` becomes `students`.

This is vocabulary mismatch. It appears everywhere. A user searches for `delayed payment penalties`, while the document says `late fee clause`. Someone asks how models `remember previous conversations`, while the useful note talks about context windows, conversation state, or retrieval memory. A beginner may know the shape of the problem but not the phrase an expert would use.

Traditional lexical systems can reduce this. Stemming helps with word forms. Synonym maps can connect `refund` and `reimbursement`. Query expansion can add related terms. Field-specific rules can encode local knowledge. Learned sparse retrieval can go further than plain BM25. But BM25 itself does not infer that two different wordings point to the same idea just because their meanings are close.

At this point the first system has taught us something useful. Exact words are valuable when they exist, but relevance can survive without them. If word overlap is too brittle, we need a representation where related meanings can sit near each other even when the tokens differ.

## Embeddings Make Meaning Searchable

Dense retrieval starts by mapping text into vectors. An embedding model takes a query or document chunk and produces a list of numbers. The model is trained so related texts tend to end up near one another in that vector space.

For search, the usual pattern is simple. Embed the query. Embed the documents or chunks. Compare the query vector with stored vectors. Return the nearest candidates. A common similarity measure is cosine similarity:

$$
\cos(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}
$$

$\mathbf{a}$ and $\mathbf{b}$ are embedding vectors. $\mathbf{a} \cdot \mathbf{b}$ is their dot product, while $\|\mathbf{a}\|$ and $\|\mathbf{b}\|$ are their vector lengths. Cosine similarity compares direction. If two vectors point in a similar direction, their cosine similarity is high.

This helps with the laptop query. The vector for `cheap laptop for college` may sit close to `affordable notebook computer for students`, even with little exact overlap. A query about `heart attack symptoms` can find `myocardial infarction warning signs`. A query about models remembering old messages can find notes about context windows or conversation state.

This is the part that makes semantic search feel slightly magical the first time it works. But the magic should be kept in check. Embeddings encode learnt statistical similarity. They often track meaning, but they do not guarantee human-like understanding, and they do not guarantee that a nearby passage actually answers the query.

The fix has introduced a new problem. Dense retrieval softens language so that different wordings can meet. That same softness can blur details that should remain sharp.

## What Embeddings Can Blur

If the query is `ORA-00942`, I probably do not want a gentle tour of database errors. I want the exact error. If I search `useEffect`, I may not want a broad React lifecycle article unless it specifically covers that hook. If I search for Hierarchical Navigable Small World (HNSW), Python `3.11`, a statutory reference, a product ID, or an exact paper title, the literal surface form matters.

Modern embedding models can represent many technical terms, especially common ones. The point is not that dense retrieval cannot handle them at all. The point is that lexical matching is a more direct signal when exact form is the thing being asked for. BM25 does not need to know what `ORA-00942` means. It only needs to preserve and match the token.

Dense retrieval can also struggle with small but decisive distinctions. Dates, quantities, versions, negation, and eligibility conditions are easy to make semantically adjacent while still being practically different. `Refunds are available` and `refunds are not available` live in the same neighbourhood of topic and vocabulary. For the user, the difference is the whole answer.

This is why exact words are not a leftover from pre-semantic search. They are a different kind of evidence. Embeddings help when language varies. Lexical signals help when language must stay fixed. A useful retrieval system often needs both, but before combining them, there is another question hiding underneath: what exactly are we retrieving?

## Decide What The Retriever Sees

A retriever does not search an abstract document in the human sense. It searches whatever units we give it. That unit might be a full document, a paragraph, a section, a code function, a frequently asked question pair, or a chunk produced by splitting a longer text.

Chunking affects both sparse and dense retrieval. For BM25, chunk boundaries change document length, term frequency, and how concentrated the matches look. For embeddings, chunk boundaries change what meaning gets compressed into one vector. The ranking method matters, but the object being ranked matters too.

Small chunks can be precise. If a long guide has one paragraph answering the laptop query, retrieving that paragraph is cleaner than retrieving the entire guide. But small chunks can lose the surrounding definition, qualification, or negation. A chunk that says `this approach improves recall` is not very useful if the previous paragraph defines what `this approach` means.

Large chunks preserve more context, but they mix signals. A chunk containing student laptops, gaming laptops, MacBook benchmarks, and shopping advice might be broadly related to the query while being less focused than a short passage about affordable notebooks for students. Overlap can reduce boundary problems, but it increases index size and can produce duplicate results. Structure-aware chunking often beats blind fixed-size splitting when documents have headings, tables, code, or legal clauses.

Once the searchable unit is chosen, we can return to the main problem: which signals should retrieve it? If exact words and semantic similarity fail differently, combining them becomes the natural next step.

## Hybrid Retrieval Keeps Both Signals Alive

Hybrid retrieval usually means running sparse retrieval and dense retrieval, then merging their candidate lists. BM25 may retrieve the `laptop laptop laptop discount` page because it sees the exact term. Dense retrieval may retrieve `affordable notebook computer for students` because it sees the semantic match. Hybrid retrieval keeps both candidates available for a later stage to judge.

This often improves candidate coverage, especially when queries mix fuzzy intent with literal constraints. A query like `React useEffect cleanup bug` contains exact framework vocabulary and a broader troubleshooting goal. A query like `S3 AccessDenied bucket policy` mixes exact service vocabulary with intent that may be described in several ways. Sparse and dense retrieval each see part of the query that the other can weaken.

The complication is that their scores do not naturally fit together. A BM25 score of `12` and a cosine similarity of `0.82` are not comparable just because both are numbers. BM25 scores depend on query terms, corpus statistics, analyzers, and document lengths. Cosine similarities are bounded mathematically, but their useful range depends on the embedding model and corpus.

A weighted score can work if the scores are normalised carefully:

$$
\mathrm{score}_{hybrid}(D) = \alpha \cdot \mathrm{normBM25}(D) + (1 - \alpha) \cdot \mathrm{normDense}(D)
$$

$\alpha$ controls the weight given to the lexical signal. $\mathrm{normBM25}(D)$ is the normalised BM25 score for document $D$, and $\mathrm{normDense}(D)$ is the normalised dense similarity score. The word normalised is doing real work here. Without calibration, a weighted sum can behave in surprising ways.

Rank-based fusion is a simpler alternative. Reciprocal Rank Fusion (RRF) combines ranked lists using positions rather than raw scores:

$$
\mathrm{RRF}(D) = \sum_{r \in R_D} \frac{1}{k + r(D)}
$$

$D$ is the document. $R_D$ is the set of ranked lists where document $D$ appears. $r(D)$ is the rank position of $D$ in list $r$. $k$ is a constant that dampens the effect of rank position, often set around `60`. If a document is missing from a list, it contributes zero for that list.

RRF avoids pretending that BM25 and dense scores are directly comparable. A document gets credit for appearing high in either list, and extra credit for appearing reasonably high in more than one list. The trade-off is that RRF discards raw score magnitude. It is a useful fusion heuristic, not a complete relevance model.

Hybrid retrieval gets more plausible candidates into the room. But candidate collection is still not candidate judgement. The top of the merged list can remain noisy, duplicated, or only loosely related. That is where reranking enters.

## Reranking Is Where Search Slows Down

First-stage retrieval is usually built for recall. It searches the whole corpus quickly and tries not to miss useful candidates. Reranking is a second-stage pass over a smaller candidate set. It spends more compute to improve precision.

The distinction often shows up as bi-encoders versus cross-encoders. A bi-encoder encodes the query and document separately, then compares their vectors. This is fast because document vectors can be precomputed. A cross-encoder reads the query and candidate text together, then scores their relevance directly. That joint interaction is often better for fine-grained ranking, but too expensive to run over the entire corpus for every query.

A practical pipeline might retrieve the top `100` candidates using BM25 and dense retrieval, fuse them with RRF, rerank the top `50` with a cross-encoder, then return the top `5`. In the laptop example, the reranker can decide that `affordable notebook computer for students` is more useful than a generic MacBook benchmark review, even if both are semantically related to laptops.

The limitation is blunt: rerankers cannot recover documents that first-stage retrieval missed. If neither BM25 nor dense retrieval retrieved the answer-bearing chunk, the reranker has no chance to place it at the top. This is why retrieval remains a pipeline problem rather than a single model choice.

The stakes get higher when the retrieved text is not merely shown as search results, but passed into a model as evidence.

## What This Means For Retrieval Augmented Generation

Retrieval Augmented Generation (RAG) combines a retriever with a generator. The retriever fetches external context. A Large Language Model (LLM) then generates an answer using that context. Retrieval quality shapes what evidence is available before the model writes anything.

RAG does not remove retrieval risk. It moves the risk upstream. If the retriever misses the right chunk, the LLM may fill the gap from its parameters. If retrieval returns a related but non-answer-bearing passage, the response may sound grounded while using the wrong evidence. Even when the right context is retrieved, the model can ignore it, misread it, or over-generalise from it.

Exact words matter here because RAG queries often mix meaning with literal constraints. A user may ask a broad question that also contains a product ID, a policy clause, a version number, or an error code. Dense retrieval helps with the broad intent. BM25 protects the sharp terms. Reranking decides which candidate actually helps answer the question.

Evaluation should follow the stages. Retrieval recall asks whether the right evidence appeared in the candidate set. Reranking precision asks whether the best evidence rose to the top. Answer quality asks whether the model used the evidence correctly. If all of that is compressed into one quality score, it becomes hard to tell whether the retriever failed, the reranker failed, or the generator failed.

## The Mental Model I Would Keep

The useful lesson is not that BM25 beats embeddings, or that embeddings make keywords unnecessary. They answer different questions. BM25 asks whether important words line up. Embeddings ask whether meanings are close. Hybrid retrieval keeps both signals available. Reranking asks whether a specific candidate actually helps with a specific query.

Exact words are not a nostalgic leftover. They are inspectable, precise evidence. Semantic similarity is also evidence, especially when the user and the document do not share vocabulary. Search gets brittle when we expect one signal to replace the other.

That is the strange half-life of keyword search. Every few years it looks like it should fade into the background, and then some user searches for an error code, a version number, a paper title, or a clause reference, and the old lexical signal becomes the cleanest thing in the system.

## Further Reading

- Robertson et al. (1994), ["Okapi at TREC-3"](https://www.microsoft.com/en-us/research/publication/okapi-at-trec-3/) - Okapi information retrieval lineage behind BM25.
- Apache Lucene documentation, [`BM25Similarity`](https://lucene.apache.org/core/7_1_0/core/org/apache/lucene/search/similarities/BM25Similarity.html) - practical BM25 defaults and Inverse Document Frequency implementation details.
- Reimers and Gurevych (2019), ["Sentence-BERT"](https://arxiv.org/abs/1908.10084) - sentence embeddings that can be compared using cosine similarity.
- Karpukhin et al. (2020), ["Dense Passage Retrieval for Open-Domain Question Answering"](https://arxiv.org/abs/2004.04906) - dual-encoder dense retrieval for passage search.
- Cormack, Clarke, and Buettcher (2009), ["Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods"](https://cormack.uwaterloo.ca/cormacksigir09-rrf) - rank-based fusion method.
- Nogueira and Cho (2019), ["Passage Re-ranking with BERT"](https://arxiv.org/abs/1901.04085) - cross-encoder reranking for retrieved passages.
- Lewis et al. (2020), ["Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"](https://arxiv.org/abs/2005.11401) - canonical RAG paper.
