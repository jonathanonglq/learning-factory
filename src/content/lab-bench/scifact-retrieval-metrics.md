---
title: Reading Between The Retrieval Scores
description: A local SciFact benchmark comparing BM25, dense retrieval, and Reciprocal Rank Fusion, with the metrics and failure cases left visible.
date: 2026-06-01
---

This was my first proper attempt at running a retrieval experiment end to end. I did not start with a sophisticated research question and only wanted to familiarise myself with the basic shape of an experiment: choose a curated corpus, prepare the data, implement a few retrieval methods, run them under the same evaluation harness, and compare the outputs without hand-waving too much.

Search retrieval felt like a good first target because the trade-off is concrete: BM25 cares about exact words, Dense retrieval cares about semantic similarity, while Hybrid retrieval tries to keep both signals alive. The full experiment repo can be found here: [comparing-basic-search-retrieval](https://github.com/jonathanonglq/comparing-basic-search-retrieval).

## The Benchmark Setup

This experiment uses BEIR SciFact. BEIR (Benchmark Information Retrieval) is a retrieval benchmark format that packages a corpus, a set of queries, and query relevance judgements. SciFact is the scientific-claims part of that benchmark: the queries are short scientific claims, and the documents are scientific paper titles and abstracts. The retrieval task is to return the papers that are labelled relevant for each claim.

The completed run used:

- Documents: `5,183`
- Queries: `1,109`
- Relevance judgements: `339`

The raw BEIR files come in two main formats. The corpus and queries are JSONL, where each line is one JSON object. Corpus rows use `_id`, `title`, `text`, and `metadata`:

```json
{
  "_id": "4983",
  "title": "Microstructural development of human newborn cerebral white matter assessed in vivo by diffusion tensor magnetic resonance imaging.",
  "text": "Alterations of the architecture of cerebral white matter in the developing human brain can affect cortical development...",
  "metadata": {}
}
```

Queries are also JSONL, but simpler:

```json
{
  "_id": "0",
  "text": "0-dimensional biomaterials lack inductive properties."
}
```

The relevance judgements, usually called qrels, are stored as a TSV file. Each row links one query to one corpus document:

```text
query-id    corpus-id    score
1           31715818     1
```
Note that for this setup, relevance is binary. A labelled query-document pair has `score = 1`, meaning relevant. If a query-document pair is absent from the query relevance judgements, the evaluator treats it as `0`, meaning not relevant. That makes evaluation straightforward, but it also means the benchmark is only as complete as its labels.

The retrieval unit was also deliberately simple. Each document became its title plus its text:

```python
# search_retrieval/src/common/io.py
def retrieval_text(doc):
    return f"{doc.get('title') or ''}\n{doc.get('text') or ''}".strip()
```

This tiny function defines a lot. It means the experiment starts after the text has already been extracted and cleaned. There is no crawling, no parser, no chunking, no overlap, no passage selection, and no reranker. The benchmark is about retrieval over clean title-plus-text documents.

## Three Retrievers, Three Assumptions

I compared three retrievers: BM25, dense retrieval, and hybrid retrieval, each of which encoded a different assumption about what makes a document relevant.

### BM25: Exact Words Matter

In this experiment, BM25's text processing was intentionally simple: lowercase the text, then use a regex to extract alphanumeric tokens.

```python
# search_retrieval/src/common/text.py
TOKEN_PATTERN = re.compile(r"[a-z0-9_]+")

def tokenize(text: str) -> list[str]:
    return TOKEN_PATTERN.findall(text.lower())
```

The assumption is straightforward: if the query terms matter, exact word overlap should carry a lot of signal. That is useful for identifiers, acronyms, technical terms, numbers, and phrases where a semantic near-match is not enough.

### Dense Retrieval: Meaning Gets Compressed

Dense retrieval embeds each document and query into a vector. I used `sentence-transformers/all-MiniLM-L6-v2`, then compared query and document vectors with cosine similarity. In the implementation, embeddings are normalised. That makes the dot product equivalent to cosine similarity:

```python
# search_retrieval/src/retrievers/dense.py
query_embedding = self.model.encode(
    [query],
    normalize_embeddings=True,
    convert_to_numpy=True,
)[0]

scores = self.doc_embeddings @ query_embedding
```

The dense retriever's assumption is different from BM25's. It can recover documents that discuss the same idea using different words. The cost is that exact details can get blurred. A document can be topically close while still missing the specific entity, identifier, or relationship the query is asking for.

### Hybrid Retrieval: Keep Both Signals Alive

BM25 scores and cosine similarities do not naturally live on the same scale. A BM25 score of `12` and a cosine similarity of `0.82` are not comparable just because both are numbers.

As such, we used Reciprocal Rank Fusion (RRF), which combines rank positions rather than raw scores:

```python
# search_retrieval/src/retrievers/hybrid.py
scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (self.rrf_k + int(item["rank"]))
```

In this run, we arbitrarily assumed `rrf_k = 60`. Note that this constant dampens the effect of rank position, so rank 1 still helps more than rank 10, but not overwhelmingly.


## What The Metrics Were Really Asking

`recall@5`, `recall@10`, `recall@100`, `mrr@10`, and `ndcg@10` were used as the benchmarking metrics. In this section, we work through the metrics to find out what they are really measuring.

Notation:
- $q$ is a query.
- $R_q$ is the ranked list returned for query $q$.
- $R_q[i]$ is the document at rank $i$, using 1-indexed ranks (i.e. first result is rank 1).
- $Rel(q)$ is the set of labelled relevant documents from qrels.
- $Q'$ is the set of evaluated queries with at least one labelled relevant document.

### Recall@k: Did We Retrieve The Answer At All?

`recall@k` measures the fraction of labelled relevant documents were retrieved within the top `k` results. For a single query:

$$
\mathrm{Recall@k}(q) = \frac{|Rel(q)\cap \{R_q[1..k]\}|}{|Rel(q)|}
$$

Overall recall is the average over queries with at least one labelled relevant document:

$$
\mathrm{Recall@k} = \frac{1}{|Q'|}\sum_{q\in Q'} \mathrm{Recall@k}(q)
$$

`recall@k` measures coverage; It does not care about ordering inside the cutoff. A relevant document at rank 1 and a relevant document at rank 10 both count for `recall@10`. If most queries have one relevant document, `recall@10` behaves a lot like “what fraction of queries had a hit in the top 10?” If a query has multiple relevant documents, the score becomes fractional.

This is why `recall@100` is important: In a multi-stage search system, the first retriever often exists to produce a candidate pool for later reranking. Missing the relevant document entirely at this stage is much harder to recover from.

### MRR@10: How Fast Does The First Good Result Appear?

Mean Reciprocal Rank (MRR) focuses on the first relevant hit. For each query, define $r_q$ as the rank of the first relevant document in the top 10:

$$
r_q = \min\{i \le 10 : R_q[i]\in Rel(q)\}
$$

Then:

$$
\mathrm{MRR@10} = \frac{1}{|Q'|}\sum_{q\in Q'} \frac{1}{r_q}
$$

If no relevant document appears in the top 10, that query contributes `0`.

MRR rewards a very specific user experience: one good result should appear early. Rank 1 contributes `1.0`; rank 2 contributes `0.5`; rank 5 contributes `0.2`. Everything after the first relevant result is ignored.

That makes MRR useful, but narrow. Queries with many relevant documents can be easier to score well on because there are more chances for one of them to appear early. MRR, on its own, should not be read as overall retrieval quality.

### nDCG@10: How Good Is The Top-10 Ordering?

Normalised Discounted Cumulative Gain (nDCG) looks at ranking quality inside the top 10. First, Discounted Cumulative Gain (non-normalised) is defined by:

$$
\mathrm{DCG@10}(q)=\sum_{i=1}^{10}\frac{2^{rel_i}-1}{\log_2(i+1)}
$$

Here, $rel_i$ is the relevance label of the document at rank $i$. Essentially, DCG@10 is the total usefulness of the top 10 results after applying a rank discount. A relevant document near the top contributes more than the same relevant document lower down the list.

Next, Ideal DCG (IDCG) is computed by sorting the relevance labels into the best possible order for that query, then taking the top 10. nDCG is:

$$
\mathrm{nDCG@10}(q)=\frac{\mathrm{DCG@10}(q)}{\mathrm{IDCG@10}(q)}
$$

For example, suppose a query has two labelled relevant documents, and the retriever places them at ranks 2 and 5. With binary relevance, each relevant document has gain `1`, so:

$$
\mathrm{DCG@10}(q)=\frac{1}{\log_2(2+1)}+\frac{1}{\log_2(5+1)}
$$

The ideal ranking would place those two relevant documents at ranks 1 and 2:

$$
\mathrm{IDCG@10}(q)=\frac{1}{\log_2(1+1)}+\frac{1}{\log_2(2+1)}
$$

The nDCG score is the first value divided by the second. This means the retriever can still get partial credit for finding both relevant documents, but it loses credit because they appeared later than the ideal order.

nDCG rewards relevant documents appearing earlier, and unlike MRR, it can reward multiple relevant documents in the same top-10 list.

The nuance in this experiment is that relevance is binary: $rel\in\{0,1\}$. The ideal ranking is all labelled relevant documents first, followed by non-relevant documents. Any order among the relevant documents is equally ideal because they all have the same gain. So nDCG@10 here mostly asks: how much labelled relevant mass did the retriever pack into the top 10, and how early did it appear?

### Speed Is Of The Essence

I also logged timing because retrieval quality is only half of the picture. A method that retrieves more relevant documents can still be harder to use if it is much slower, more expensive to prepare, or less predictable at query time.

There are two different costs here. Offline costs happen before serving queries. For BM25, that means building the index. For dense retrieval, that means embedding all documents and caching the matrix. These costs can often be paid ahead of time.

Online latency is the per-query cost paid when a user asks a question. That is usually the more sensitive number for product experience, because it affects how quickly the system can return results.

In this implementation, dense retrieval includes query embedding and brute-force similarity search. Note that these numbers are useful for comparison in this local setup, but they are not production latency claims. A real service would likely use batching, caching, approximate nearest neighbour search, or a multi-stage architecture.

## Results

The completed SciFact run produced:

| method | recall@5 | recall@10 | recall@100 | mrr@10 | ndcg@10 | mean ms | median ms | p95 ms | max ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| BM25 | 0.7268 | 0.7757 | 0.8731 | 0.6184 | 0.6523 | 9.01 | 8.11 | 15.31 | 230.88 |
| Dense | 0.7379 | 0.7833 | 0.9250 | 0.6047 | 0.6451 | 64.02 | 35.32 | 154.58 | 2341.93 |
| Hybrid | 0.7395 | 0.8059 | 0.9577 | 0.6503 | 0.6840 | 66.32 | 52.91 | 146.61 | 644.78 |

Offline costs:

| method | offline index seconds | offline embedding seconds | notes |
| --- | ---: | ---: | --- |
| BM25 | 0.25 | 0.00 | Builds a BM25 index over tokenised documents. |
| Dense | 0.00 | 43.21 | Embeds all documents on first run, then caches them. |
| Hybrid | 0.25 | 0.00 | Rebuilt the BM25 index and reused cached dense document embeddings. |

My first reading was simple: hybrid retrieval won. It had the best `recall@5`, `recall@10`, `recall@100`, `mrr@10`, and `ndcg@10`.

The more useful reading came after slowing down. The clearest result was `recall@100`. Hybrid retrieval reached `0.9577`, compared with `0.9250` for dense retrieval and `0.8731` for BM25. That suggests BM25 and dense retrieval surfaced partly different labelled relevant documents. Fusion helped because it kept both candidate streams alive.

The top-10 metrics were less dramatic. Dense retrieval slightly beat BM25 on recall, while BM25 slightly beat dense retrieval on MRR and nDCG. That fits the failure pattern I saw later: dense retrieval often helped coverage, but lexical evidence could place the first relevant hit closer to the top when exact terms mattered.

Hybrid had the best MRR@10 and nDCG@10 in this run, but I would not overstate that. The gains were real in this setup, not a general law about retrieval.

The timing table also complicated the “hybrid won” story. BM25 was much cheaper locally. Dense retrieval paid query embedding cost and brute-force vector scoring. Hybrid inherited most of that online cost because it used the dense retriever too.

At this point, the score table had answered the narrow benchmark question, but it had not yet taught me much about the retrieval behaviour. For that, I had to inspect individual queries.

## The Failure Cases Made The Metrics Legible

The failure report became the most useful output of the experiment. That was not obvious to me at the start. I expected the metrics table to be the main artefact, and the query-level report to be supporting detail. It ended up being the other way around.

The report compared BM25, dense, and hybrid results query by query, using the top-100 results saved in `results.jsonl`. Metrics like `recall@5` and `mrr@10` were sliced from those same runs rather than generated separately.

Three examples made the aggregate table easier to understand.

### Dense Helped When Words Did Not Line Up

Query `238`: `Cells undergoing methionine restriction may activate miRNAs.`

The labelled relevant document was `2251426`, titled `microRNAs: A Safeguard against Turmoil?`

BM25 ranked methionine-heavy papers first and missed the labelled relevant document in the top 5. Dense retrieval ranked the microRNA paper at rank 2. Hybrid placed it at rank 4.

This is the useful version of semantic retrieval. The dense model picked up that the query was about microRNAs and cellular stress responses, even though BM25 was pulled toward documents with stronger surface overlap around `methionine` and `restriction`.

The hybrid result was also a useful reminder. Fusion recovered the relevant document in the top 5, but it did not magically become the best reranker. It kept the candidate alive.

### BM25 Helped When Identifiers Mattered

Query `70`: `Activation of PPM1D suppresses p53 function.`

BM25 ranked both labelled `PPM1D` documents first and second. Dense retrieval ranked broader `p53` papers above the labelled relevant documents.

This is the failure mode that made the benchmark click for me. Dense retrieval recognised topical neighbourhood, but the exact identifier mattered. `PPM1D` was not a soft semantic hint; it was central to the query. BM25 handled that better because exact token evidence remained strong.

Hybrid recovered both relevant documents in the top 5 because BM25 contributed the identifier signal. This is where hybrid retrieval felt less like compromise and more like insurance against choosing the wrong retrieval assumption too early.

### Hybrid Helped When Both Signals Agreed

Query `5`: `1/2000 in UK have abnormal PrP positivity.`

The labelled relevant document was about abnormal prion protein in human appendixes after bovine spongiform encephalopathy.

BM25 ranked it first. Dense retrieval ranked it second. Hybrid ranked it first.

This is the clean case for Reciprocal Rank Fusion. Both retrievers surfaced the same useful document near the top, so fusion amplified that agreement. The point is not that hybrid invented a new signal. It preserved agreement between two different signals.

## What This Does Not Test

This experiment starts after the hard question of “what text should be indexed?” has already been answered. SciFact gives clean title and text fields. Many real search failures happen earlier: crawling misses a page, parsing drops a table, boilerplate overwhelms the useful text, or chunking separates the answer from the context that makes it meaningful.

It also does not test approximate nearest neighbour indexes, learned rerankers, query rewriting, field weighting, production caching, or model throughput. Dense retrieval looked slower here because the implementation used local query embedding and brute-force similarity search. That should not be converted into a broad claim that dense retrieval is inherently slow.

The labels matter too. SciFact qrels are binary in this setup. A document is either labelled relevant or treated as non-relevant. That makes the evaluation clean, but it cannot capture every shade of usefulness a real user might care about.

So the claim I would make is narrow: in this local SciFact benchmark, with this tokeniser, this embedding model, this fusion method, and binary qrels, hybrid retrieval improved candidate coverage and produced the best aggregate top-10 ranking metrics.

That narrow claim is still useful. It is also much less interesting than the process of finding out why the methods behaved differently.

## What I Would Keep From This Build

The main thing I learnt was that running the experiment and understanding the experiment are not the same step.

At first, I wanted practice with the mechanics: dataset setup, retriever implementation, metric calculation, local timings, and reproducible outputs. That part mattered. Without it, there is no experiment to inspect.

But the most useful outcome was not the final table. It was the ability to name retrieval failures precisely.

BM25 failed when useful meaning did not share enough words with the query. Dense retrieval failed when exact identifiers mattered more than general topic similarity. Hybrid retrieval helped most when the two systems contributed different useful candidates, or when both agreed on a good one.

The metrics mattered because they forced me to separate different meanings of “better”. Recall@100 asked whether the candidate pool contained the answer. MRR@10 asked whether the first good result arrived early. nDCG@10 asked whether the top-10 ranking was closer to the benchmark's ideal order. Timing asked whether the implementation was cheap enough to imagine serving.

The habit I would carry into the next experiment is not “hybrid retrieval wins”. It is making retrieval failure inspectable. Once a failure has a query, a rank, a document, a metric, and an implementation choice attached to it, it becomes much harder to hide behind a single score.

## Further Reading

- BEIR benchmark repository, "BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models" - dataset format and benchmark context.
- Cormack, Clarke, and Buettcher (2009), "Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods" - RRF definition and motivation.
- Robertson et al. (1994), "Okapi at TREC-3" - BM25 lineage.
- Reimers and Gurevych (2019), "Sentence-BERT" - embedding model framing.
