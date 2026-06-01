# Writing Guide

Use this guide when drafting or editing posts for `brain-dump`, `rabbit-hole`, and `lab-bench`.

The goal is not uniformity. The goal is clear, grounded, technically careful writing that sounds like a person thinking through the subject.

## Core Voice

Be concise without sanding off the point. Prefer specificity over abstraction, clarity over flourish, and concrete examples over broad claims.

Write in a thoughtful, grounded, human way. Natural uncertainty, parenthetical asides, mild opinion, and emotional directness can stay when they add voice. Clean typos, repeated words, unexpanded acronyms, grammar slips, unsupported certainty, and vague phrasing.

Prefer:

- Specific examples and concrete observations.
- Real anecdotes, personal context, and local details when provided and safe to share.
- Plain explanations of why something matters.
- Natural paragraph rhythm.
- British/Singapore English where spelling differs.

Avoid:

- Generic inspirational language.
- Corporate phrasing.
- Overly neat or symmetrical paragraphs.
- Motivational wrap-ups.
- Em dashes.
- Short standalone paragraphs for dramatic effect, unless the pause is genuinely doing work.

Avoid leaning on these words unless they are genuinely the plainest choice:

- Defensible.
- Honest.
- Unpack.
- Delve.
- Underscore.

Avoid these sentence patterns:

- "It is not X, it is Y."
- "Not X, not Y, not Z."
- "X stands out."
- "It is worth noting."

Do not over-sanitise human parts of a draft. If a line carries real anxiety, doubt, frustration, or curiosity, sharpen it instead of replacing it with a safer corporate version.

## Post Modes

Choose the mode first. Each section has a different centre of gravity.

### Brain Dump

Use Brain Dump for less technical reflections on AI, society, work, incentives, open source, closed source, research culture, and how AI may reshape everyday life.

The centre of gravity is reflection, argument, tension, and personal judgement. Start from a question, unease, contradiction, concrete observation, or lived example. The post does not need to resolve every tension; it can end with a sharper question, a revised view, or a more precise uncertainty.

Preserve personal specificity where useful. If the starting material includes a real conversation, workplace example, local context, or personal reaction, keep it unless there is a privacy, factual, or clarity reason to remove it.

Headings can carry personality or tension if they still tell the reader what the section is doing.

### Rabbit Hole

Use Rabbit Hole for learning notes. The goal is to explain AI/ML concepts clearly enough that writing them helps internalise them.

The centre of gravity is mechanism. Move from confusion to explanation. Start from what was hard to understand, what broke the mental model, or what practical question made the concept worth learning.

Prefer step-by-step clarity over cleverness. Definitions should feel useful, not textbook-like. Use examples, equations, edge cases, and careful definitions, but keep them connected to the original confusion.

### Lab Bench

Use Lab Bench for implementation notes, experiments, comparisons, reproductions, and practical lessons from building.

The centre of gravity is practice. Make the setup, trade-offs, constraints, dead ends, results, and small implementation choices visible. Explain what was tested, why it was tested, what changed during implementation, what failed, what surprised you, and what you would do differently next time.

## Titles

Titles should help the right reader decide whether to open the post. Prefer clear over clever, but do not make every title flat. Name the actual subject; avoid clickbait, grand claims, and content-marketing language.

- Brain Dump titles can carry more tension, personality, or uncertainty.
- Rabbit Hole titles should name or strongly imply the concept, with a sharper angle where useful.
- Lab Bench titles should usually include the experiment, comparison, implementation detail, or result.

Good Rabbit Hole title shapes:

- `BM25, Embeddings, and the Trouble with Meaning`
- `When Keywords Still Beat Vectors`
- `Why Semantic Search Still Needs Exact Words`
- `The Geometry of Similarity`
- `What Embeddings Forget`
- `Rerankers Are Where Search Slows Down to Think`

If a title uses tension, metaphor, or a clever phrase, the body should earn it. Avoid titles like:

- `The Future of AI Search`
- `Why Retrieval Matters More Than Ever`
- `Unlocking the Power of Hybrid Search`

## Shape And Flow

Posts should feel like one thought developing, not separate notes placed next to each other. Be concise at the sentence level, but do not skip the middle steps when an idea depends on a mechanism, assumption, trade-off, or hidden definition.

Use continuity tools where they help:

- A running example that changes as the explanation deepens.
- A concrete anecdote that returns near the end with a sharper implication.
- A progression from simple approach, to failure, to next idea, to trade-off.
- Short bridge paragraphs that explain why one section leads to the next.
- Section endings that name the limitation or unresolved question that motivates the next section.

Make the reader feel the problem before introducing the fix. Callbacks are useful, but each return to the thesis should add a new angle, example, caveat, or emotional turn. Cut repeated thesis restatements.

## Openings And Endings

Openings should invite the reader into the actual problem, not sound like a generic introduction written before the writer knew the point.

Useful openings:

- A concrete problem, question, failure case, or observation.
- The confusion that made the topic worth learning.
- A small practical scene: a query that fails, an experiment that behaves strangely, a claim that feels too neat.
- For Brain Dump, the tension or unease.
- For Rabbit Hole, the incomplete mental model.
- For Lab Bench, what was being tested and why it mattered.

Endings should land somewhere useful without making the thinking feel more settled than it is.

Useful endings:

- Say what changed in your understanding.
- Name the remaining uncertainty more precisely.
- Return to the running example and show what the concept now explains.
- State a practical implication, limitation, or next experiment.
- For Brain Dump, leave the sharper version of the tension.
- For Rabbit Hole, end with the mental model you would now use.
- For Lab Bench, end with what you would try next or what the result changed.

## Technical Clarity

Spell out abbreviations in full on first use, then use the acronym. For example: Hierarchical Navigable Small World (HNSW), then HNSW.

For Rabbit Hole and technical Lab Bench posts, include equations when they clarify the mechanism. Introduce every symbol in plain language, then explain what the equation is doing with a concrete interpretation or small example.

Use `$...$` for inline math and `$$...$$` for block equations.

## Evidence And Claims

Be clear about the status of a claim.

- Use primary sources where possible for technical claims: papers, official documentation, standards, release notes, or author posts.
- For fast-moving AI topics, check current sources before writing.
- Distinguish between what a source claims, what is common practice, and what is your interpretation.
- Treat benchmarks, anecdotes, and production behaviour as different kinds of evidence.
- If a claim is uncertain, scoped, or context-dependent, say so.

Avoid claims broader than the evidence:

- Avoid `always`, `never`, `clearly`, `obviously`, and similar certainty markers unless they are literally true.
- State trade-offs in terms of conditions: corpus size, user type, latency budget, data quality, model capability, or organisational constraints.
- Prefer "can", "often", "usually", "in this setup", or "under this assumption" for context-dependent claims.
- Say where a claim stops applying and what would change the conclusion when knowable.

For Artificial General Intelligence (AGI), automation, labour markets, and future-society claims, be especially careful. Avoid saying something is `bound to happen` unless the post is explicitly arguing for that forecast and supporting it. Prefer conditional framing such as "if something like this arrives", "should this happen", or "I do not know when, or whether, that happens".

## Sources And Further Reading

Use source names in prose when they help the reader understand lineage. Do not force every factual sentence to carry a citation.

Use an optional `## Further Reading` section when a post relies on specific papers, documentation, or technical posts. Keep it short:

```markdown
## Further Reading

- Robertson et al. (1994), "Okapi at TREC-3" - original Okapi/BM25 retrieval work.
- Apache Lucene documentation, `BM25Similarity` - practical implementation details and default parameters.
- Lewis et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" - canonical RAG paper.
```

Use links when available and useful. If a post only draws on general background knowledge, `Further Reading` is not required.

Footnotes are not the default style. Use them only when a side note would distract from the main paragraph but is still worth preserving.

## Markdown And Rendering

Write with the site renderer in mind. The renderer treats Markdown as an article layout:

- The first paragraph receives a drop cap, so start with prose rather than a list, table, or code block.
- Use `##` for major sections; these render as prominent headings with a left accent.
- Use `###` for subsections; these render as quieter but visible headings.
- Use `####` rarely for local labels inside dense technical sections.
- Use bullets for lists, checks, and compact comparisons. Avoid turning reflective prose into long bullet lists.
- Use inline code only for literal tokens, commands, filenames, variables, fields, functions, model names, error messages, or query examples.
- Do not use inline code merely to emphasise ordinary words.
- Use inline math with `$...$` and block math with `$$...$$`.
- Use block equations only when explained immediately before or after.
- Keep equations readable. Avoid dense notation when plain language is clearer.
- Tables use GitHub-flavoured Markdown and scroll horizontally if wider than the text column.
- Code blocks and tables carry visual weight. Place them near the explanation they support, not in a dump at the end.
- Use links sparingly inside paragraphs. If there are many sources, use `Further Reading`.

## Workflow

For substantial posts, separate thinking, evidence, drafting, and editing so the post does not become smooth before it becomes clear.

### 1. Clarify Intent

Before outlining, clarify:

- Target section: Brain Dump, Rabbit Hole, or Lab Bench.
- Target reader level and intended depth.
- Whether external research is needed.
- Whether equations, code, diagrams, or examples are expected.
- What the post should not become.

### 2. Outline First

Before drafting, propose the structure and wait for feedback. Include:

- Working title.
- Thesis or learning objective.
- Section titles and purpose.
- Key concepts, equations, snippets, or examples.
- Narrative spine: running example, progression, bridge, or problem-to-fix arc.
- Expected reader confusion points.
- Open questions, assumptions, or weak spots.

### 3. Lab Bench Repo-First Pass

For Lab Bench posts, do not default to subagents. If the experiment repo exists, start from the artefact: code, commands, generated outputs, logs, reports, assumptions, and failure cases.

Before outlining or drafting, produce an experiment map:

- What was built and what question it tested.
- What data or corpus was used, including format transformations.
- Which files are central to the experiment.
- Which commands reproduce the setup and results.
- What outputs were generated.
- What metrics were used and what each metric measures.
- Which implementation choices materially affect the result.
- What assumptions are baked into the setup.
- What the experiment does not test.
- What changed, failed, or surprised you.

Structure the post around the experiment's spine:

- Why it was run.
- What the setup was.
- What pipeline was implemented.
- What was measured.
- What the results showed.
- What the metrics mean and do not mean.
- What examples or failure cases reveal.
- What the experiment excludes.
- What the result changes about the next build or question.

For technical Lab Bench posts, plan code snippets during the outline. Snippets should show a design choice, mechanism, metric, data shape, or result path. Avoid large boilerplate snippets. Place snippets where they are discussed, not at the end.

When reporting metrics, explain:

- The equation, if useful.
- What the metric rewards.
- What user behaviour or product assumption it implies.
- What labels or relevance judgements it depends on.
- What it hides.
- How it should and should not be interpreted in this experiment.

### 4. Use Subagents Sparingly

Use subagents only when they add real value. Ask for structured notes, not prose drafts.

For Brain Dump and Rabbit Hole, useful roles can include:

- Researcher: sources, facts, definitions, current developments, examples, and citations.
- Technical explainer: first-principles mechanism, equations, examples, and edge cases.
- Sceptic: weak claims, missing assumptions, hype, unsupported leaps, and explanations that sound too neat.
- Reader proxy: confusing jumps, undefined terms, over-compressed sections, and hidden assumptions.

For Lab Bench, use a single-writer repo-first workflow by default. Only use subagents when the experiment is large, statistically subtle, unfamiliar, or high-stakes. Prefer repo-aware roles:

- Repo mapper: files, execution path, commands, inputs, outputs, and implementation boundaries.
- Results analyst: metrics, timings, tables, reports, failure cases, and what the results support.
- Implementation explainer: code snippets worth showing and why they matter.
- Assumption checker: setup assumptions, benchmark interpretation, missing baselines, overbroad claims, and hidden limitations.
- Reader proxy: reproducibility and whether the result is understandable without knowing the repo.

### 5. Revise, Draft, Edit

Before drafting, revise the outline using any research, repo inspection, or subagent notes. Decide what to keep, reject, and leave unresolved.

Draft from the approved structure. Do not invent a new structure unless there is a clear gap. For Lab Bench, preserve the experiment map, commands, file references, metrics, results, limitations, and snippet plan.

Run at least two edit passes:

- Technical pass: correctness, equations, acronym expansion, source fidelity, assumptions, and scope.
- Voice pass: this guide's style rules, paragraph rhythm, no em dashes, no unnecessary dramatic standalone paragraphs, and whether the post sounds human.

When useful, add focused passes for clarity, continuity, evidence, or compression.

Apply the final edit locally, then run guide checks and build.

## Checklist

- Is the post in the right mode: Brain Dump, Rabbit Hole, or Lab Bench?
- Does the title clearly signal the subject and match the post's tone?
- If the title is clever or metaphorical, does the body earn it?
- Is the main idea clear within the first few paragraphs?
- Does the opening start from a concrete problem, question, observation, or confusion?
- Are abstract claims backed by concrete examples?
- If personal examples were provided, were they preserved where useful?
- Do sections connect naturally instead of reading like separate notes?
- Does each section have a distinct job?
- Is there a running example, progression, or bridge where continuity would help?
- Does each callback to the thesis add something new?
- Are claims scoped to the conditions where they are true?
- Are speculative claims, especially about AGI or future labour markets, framed with the right uncertainty?
- Are sources or further reading included when the post depends on specific papers, documentation, or technical claims?
- Are abbreviations spelled out before acronyms?
- Are code formatting, headings, equations, lists, and tables used only where they help the rendered post?
- For Lab Bench, is the experiment repo treated as the primary source of truth?
- For Lab Bench, can the reader see the setup, central files, commands, outputs, and result path?
- For Lab Bench, are metrics explained in terms of what they reward, assume, hide, and depend on?
- For Lab Bench, are limitations and non-tested areas stated without becoming generic disclaimers?
- Does the ending land somewhere useful without becoming too neat?
- Does the post sound like a person thinking carefully, not a press release?
- Are there generic closing lines to cut?
- Are there em dashes to replace?
