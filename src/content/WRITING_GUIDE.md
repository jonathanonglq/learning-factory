# Writing Guide

Use this guide when drafting or editing posts for `brain-dump`, `rabbit-hole`, and `lab-bench`.

The goal is not to make every post sound the same. The goal is to make each post clear, grounded, technically careful where needed, and recognisably written by a person thinking through the subject.

## Core Voice

Be concise where possible without losing essence. Prioritise specificity over abstraction, and clarity over flourish.

Write in a thoughtful, grounded, human way. Vary sentence lengths naturally. It is okay to sound slightly unfinished or opinionated at times if that reflects the actual state of the thought.

Use concrete observations, subtle personality, and occasional conversational asides where appropriate. Do not try too hard to sound profound.

Prefer:

- Specific examples and concrete observations.
- Real anecdotes, personal context, and local details when the user provides them and they are safe to share.
- Plain explanations of why something matters.
- Natural paragraph rhythm.
- Clear uncertainty when the idea is still developing.
- British/Singapore English where spelling differs.

Avoid:

- Excessive transition phrases.
- Generic inspirational language.
- Neatly packaged conclusions.
- Corporate phrasing.
- Overly balanced or symmetrical paragraphs.
- Em dashes.
- Short, standalone sentence paragraphs used for dramatic emphasis. They often feel LLM-like. Combine them into nearby paragraphs unless the pause is genuinely doing work.

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

Keep productive messiness, but clean sloppiness. Conversational texture, parenthetical asides, mild uncertainty, and emotional directness can stay when they add voice. Typos, repeated words, unexpanded acronyms, grammar slips, unsupported certainty, and vague phrasing should be fixed.

Do not over-sanitise the human parts of a draft. If a line carries genuine anxiety, doubt, frustration, or curiosity, sharpen it instead of replacing it with a safer corporate version.

## Post Modes

Each section has a different centre of gravity. Choose the mode first, then let the structure serve the post.

### Brain Dump

Use Brain Dump for less technical reflections on AI, society, work, incentives, open source, closed source, research culture, and how AI may reshape everyday life.

The centre of gravity is reflection, argument, tension, and personal judgement. The writing can start from a question, an unease, a contradiction, or a concrete observation.

Good Brain Dump posts should make the reader feel how the thought developed. They do not need to resolve every tension. It is fine to end with a sharper question, a revised view, or a more precise uncertainty.

Brain Dump posts should preserve personal specificity where possible. If the starting material includes a real conversation, workplace example, local context, or personal reaction, keep it unless there is a privacy, factual, or clarity reason to remove it. Prefer cleaning the example over replacing it with a generic one.

Section headings in Brain Dump can carry personality, tension, or a small aside if the heading still tells the reader what the section is doing. A heading like `The Transition Is Messy (Thankfully?)` can work because it signals both the topic and the writer's stance.

### Rabbit Hole

Use Rabbit Hole for learning notes. The goal is to explain AI/ML concepts clearly enough that writing them helps internalise them.

The centre of gravity is mechanism. Move from confusion to explanation. Start from what was hard to understand, what kept breaking in the mental model, or what practical question made the concept worth learning.

Prefer step-by-step clarity over cleverness. Definitions should feel useful, not textbook-like. Use examples, equations, edge cases, and careful definitions, but keep the explanation connected to the original confusion.

### Lab Bench

Use Lab Bench for implementation notes, experiments, comparisons, reproductions, and practical lessons from building.

The centre of gravity is practice. Make the setup and trade-offs visible. Explain what was tested, why it was tested, what changed during implementation, what failed, what surprised you, and what you would do differently next time.

Results matter, but so do constraints, dead ends, and small implementation details that changed the outcome.

## Titles

Titles should help the right reader decide whether the post is worth opening. They do not need to impress everyone else.

Prefer clear over clever, but do not make every title flat. Use the actual subject, not vague abstractions. Avoid clickbait, grand claims, or titles that sound like content marketing.

Section-specific guidance:

- Brain Dump titles can carry more tension, personality, or uncertainty.
- Rabbit Hole titles should name or strongly imply the concept being explained, but they can be thought-provoking, slightly clever, or metaphorical when that helps curiosity.
- Lab Bench titles should usually include the experiment, comparison, implementation detail, or result being examined.

For Rabbit Hole, a good title can pair the concept with a sharper angle:

- `BM25, Embeddings, and the Trouble with Meaning`
- `When Keywords Still Beat Vectors`
- `Why Semantic Search Still Needs Exact Words`
- `The Geometry of Similarity`
- `The Strange Half-Life of Keyword Search`
- `What Embeddings Forget`
- `Rerankers Are Where Search Slows Down to Think`
- `The Search Engine Inside RAG`
- `Why Retrieval Starts Before the Model Answers`

If a title uses tension, metaphor, or a clever phrase, the post should earn it. Refer back to the idea in the body, even lightly, so the title feels like part of the argument rather than decoration. For example, if the title mentions the `strange half-life` of keyword search, the post should explain why keyword methods keep remaining useful after many people expect them to fade.

Avoid titles like:

- `The Future of AI Search`
- `Why Retrieval Matters More Than Ever`
- `Unlocking the Power of Hybrid Search`

## Shape And Flow

Do not be constrained by blog-post length. Be concise at the sentence level, but give each sub-idea enough room to become understandable from first principles.

If an idea depends on a mechanism, assumption, trade-off, or hidden definition, explore it until the reader can see why it matters. Do not skip the middle steps just to keep the piece short.

Posts should feel like one thought developing, not a stack of self-contained explanations. Different posts can use different amounts of structure, but always consider what gives the reader a reason to move from one section to the next.

Useful continuity tools:

- Use a running example when the topic benefits from it. Return to the same example across sections so the reader can see how each new idea changes the situation.
- Treat strong anecdotes as possible through-lines. A concrete personal example can appear near the opening, return when testing the argument, and come back near the end as the implication becomes clearer.
- Frame the post as a progression when possible. For example: start with a simple approach, notice where it breaks, add the next idea, then examine the new trade-off.
- Add short bridge paragraphs at important turning points. A bridge should explain why the previous section naturally leads to the next, not merely announce a topic change.
- Make the reader feel the problem before introducing the fix. Avoid jumping straight into definitions when a concrete failure case would make the concept more intuitive.
- Let section endings create forward pull. A section can end by naming the limitation, unresolved question, or practical annoyance that the next section addresses.

Callbacks are useful, but avoid restating the thesis in the same form across multiple sections. Each return to the main idea should add a new angle, example, caveat, or emotional turn. If a paragraph only repeats the central claim, cut or compress it.

Do not force all of these into every post. Use them to make the writing feel more human and continuous, while preserving the natural shape of the topic.

## Openings

Openings should invite the reader into the actual problem. They should not feel like a generic introduction generated before the writer knew what they wanted to say.

Useful opening moves:

- Start with a concrete problem, question, failure case, or observation.
- Start from the confusion that made the topic worth learning.
- Start with a small practical scene: a query that fails, an experiment that behaves strangely, a claim that feels too neat.
- For Brain Dump, start with the tension or unease rather than a broad statement about AI.
- For Rabbit Hole, start with the mental model that initially felt incomplete.
- For Lab Bench, start with what was being tested and why it mattered.

These are suggestions, not a template. A post can begin quietly if that feels natural. Avoid forcing every opening into the same problem-solution shape.

## Endings

Endings should feel like the thought landed somewhere, even if the answer remains incomplete.

Useful ending moves:

- Say what changed in your understanding.
- Name the remaining uncertainty more precisely than at the start.
- Return to the running example and show what the concept now explains.
- State a practical implication, limitation, or next experiment.
- For Brain Dump, leave the reader with the sharper version of the tension.
- For Rabbit Hole, end with the mental model you would now use.
- For Lab Bench, end with what you would try next or what the result changed.

Avoid motivational wrap-ups, generic summaries, and endings that make the post feel more settled than the thinking actually is.

## Technical Clarity

Spell out abbreviations in full on first use, then use the acronym afterwards. For example: Hierarchical Navigable Small World (HNSW), then HNSW.

For Rabbit Hole posts, it is fine to be more technical when the concept needs it. Include key equations where they make the mechanism clearer, but introduce every symbol in plain language and explain what the equation is doing.

Equations should support understanding, not decorate the post. If an equation is included, follow it with a concrete interpretation or small example.

Use `$...$` for inline math and `$$...$$` for block equations.

## Evidence And Claims

Be clear about the status of a claim.

- Use primary sources where possible for technical claims: papers, official documentation, standards, release notes, or author posts.
- For fast-moving AI topics, check current sources before writing.
- Distinguish between what a source claims, what is common practice, and what is your interpretation.
- Do not over-cite in the prose if it makes the post stiff. A learning note should still read like a person thinking, not a literature review.
- If a claim is uncertain, scoped, or dependent on context, say so.

Avoid claims that are broader than the evidence:

- Avoid `always`, `never`, `clearly`, `obviously`, and similar certainty markers unless they are literally true.
- State trade-offs in terms of conditions: corpus size, user type, latency budget, data quality, model capability, organisational constraints.
- Prefer "can", "often", "usually", "in this setup", or "under this assumption" when the claim is context-dependent.
- Say where a claim stops applying.
- Say what would change the conclusion when that is knowable.
- Treat benchmarks, anecdotes, and production behaviour as different kinds of evidence.

Good writing can still be opinionated. The point is to make the scope of the opinion visible.

For Artificial General Intelligence (AGI), automation, labour market, and future-society claims, be especially careful about certainty. Avoid saying something is `bound to happen` unless the post is explicitly arguing for that forecast and supporting it. Prefer conditional framing such as "if something like this arrives", "should this happen", or "I do not know when, or whether, that happens" when the future claim is a boundary condition rather than the main argument.

## Sources And Further Reading

Use source names in prose when they help the reader understand lineage. For example, it is fine to mention that Best Matching 25 (BM25) comes from the Okapi information retrieval work, or that Retrieval Augmented Generation (RAG) is associated with Lewis et al. 2020. Do not force every factual sentence to carry a citation.

Use an optional `## Further Reading` section at the end when a post relies on specific papers, documentation, or technical posts. Prefer this over footnotes for now because it keeps the main essay readable and works cleanly in Markdown.

Format each item as a short bullet:

```markdown
## Further Reading

- Robertson et al. (1994), "Okapi at TREC-3" - original Okapi/BM25 retrieval work.
- Apache Lucene documentation, `BM25Similarity` - practical implementation details and default parameters.
- Lewis et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" - canonical RAG paper.
```

Use links when available and useful. Keep descriptions short. If a post only draws on general background knowledge and does not depend on specific sources, `Further Reading` is not required.

Footnotes are not the default style. Use them only when a side note would distract from the main paragraph but is still worth preserving. If footnotes become common, revisit the renderer and house style.

## Markdown And Rendering

Write with the site renderer in mind.

- Use `##` for major sections. Avoid going deeper than `###` unless the post genuinely needs it.
- Use bullets for lists, checks, and compact comparisons. Avoid turning reflective prose into long bullet lists.
- Use inline code only for literal tokens, commands, filenames, variable names, field names, function names, model names, error messages, or query examples.
- Do not use inline code merely to emphasise ordinary words.
- Use block equations only when the equation is explained immediately before or after.
- Keep equations readable in Markdown. Avoid dense notation if plain language would be clearer.
- Use links sparingly inside paragraphs. If there are many sources, put them in `Further Reading`.

## Agent Workflow

For substantial posts, use a staged workflow. The goal is to separate thinking, evidence, drafting, and editing so the post does not become smooth before it becomes clear.

### Stage 0: Intent Clarification

Before outlining, clarify:

- Target section: Brain Dump, Rabbit Hole, or Lab Bench.
- Target reader level.
- Intended depth.
- Whether external research is needed.
- Whether equations, code, diagrams, or examples are expected.
- What the post should not become.

### Stage 1: Outline Scrub

Before drafting the full post, propose the structure first. Include:

- Working title.
- Thesis or learning objective.
- Section titles.
- A brief description of what each section should cover.
- Key concepts, equations, or examples to include.
- The intended narrative spine, such as a running example, step-by-step build-up, problem-to-fix progression, or bridge between sections.
- Expected reader confusion points.
- Open questions, assumptions, or places where the argument may need sharper framing.

Stop after this stage and wait for feedback. Do not write the full post until the outline is approved.

### Stage 2: Parallel Exploration

After the outline is approved, consider using a small set of specialised agents if the user explicitly asks for subagents or parallel drafting.

Suggested roles:

- Researcher: consolidate relevant sources, current developments, definitions, examples, and citations where needed. For recent or fast-moving topics, browse the web and prioritise primary sources.
- Technical explainer: work through the mechanism from first principles. For Rabbit Hole posts, identify useful equations, examples, edge cases, and places where readers may get confused.
- Sceptic: challenge weak claims, missing assumptions, hype, unsupported leaps, and explanations that sound too neat.
- Reader proxy: represent the target reader. Flag confusing jumps, undefined terms, over-compressed sections, and places where the explanation assumes too much.

Run Researcher, Technical explainer, Sceptic, and Reader proxy in parallel when their tasks are independent. Give each agent the approved outline, the relevant section type, and this writing guide.

Ask each parallel agent for structured notes, not prose drafts. They should return useful facts, mechanisms, equations, examples, risks, objections, comprehension issues, and suggested changes to the outline.

### Stage 3: Outline Revision

Before drafting, revise the outline using the parallel outputs. Resolve contradictions and decide what to keep.

The revised outline should include:

- Final section structure.
- Accepted source notes.
- Accepted equations or examples.
- Rejected ideas.
- Unresolved caveats.

### Stage 4: Drafting

Run Synthesiser after outline revision. The Synthesiser should produce the full Markdown draft from the revised outline and selected notes.

The Synthesiser should not invent a new structure unless there is a clear gap. Preserve the agreed architecture.

### Stage 5: Adversarial Edit

Run two edit passes after the draft exists:

- Technical editor: check correctness, equations, acronym expansion, source fidelity, assumptions, and whether each section is technically clear.
- Voice editor: check this guide's style rules, banned phrases, paragraph rhythm, no em dashes, no short dramatic standalone paragraphs, and whether the post sounds like a person thinking carefully.

When useful, split review into these passes:

- Clarity pass: can the reader follow the idea from first principles?
- Continuity and structure pass: read the whole piece as one argument. Check that each section has a distinct job, that no section merely repeats an earlier point, and that the post develops rather than circles around the same thesis.
- Technical correctness pass: are definitions, equations, assumptions, and source claims right?
- Evidence pass: are claims properly scoped and supported?
- Voice pass: does the prose sound human, specific, and grounded?
- Compression pass: can sentences be tightened without removing necessary reasoning, personal specificity, or the concrete examples that give the piece its texture? Can repeated thesis statements be replaced with sharper examples or cut entirely?

### Stage 6: Final Integration

Apply the final edit locally, then run guide checks and build.

Do not use all roles by default. Use the smallest set that fits the post. For a quick draft, one writer and one editor may be enough. For technical Rabbit Hole posts or current-events Brain Dump posts, Researcher, Technical explainer, Sceptic, Reader proxy, Synthesiser, Technical editor, and Voice editor are usually useful.

## Checklist

- Is the post in the right mode: Brain Dump, Rabbit Hole, or Lab Bench?
- Does the title clearly signal the subject while matching the post's actual tone and argument?
- If the title is clever or metaphorical, does the body make that title relevant?
- Is the main idea clear within the first few paragraphs?
- Does the opening start from a concrete problem, question, observation, or confusion?
- Are abstract claims backed by concrete examples?
- If the user provided personal examples, anecdotes, or local context, did the edit preserve them where useful?
- Do the sections connect naturally, or does the post read like separate notes placed next to each other?
- Does each section have a unique main point, or are multiple sections doing the same work?
- Is there a running example, progression, or bridge where continuity would help?
- Did any strong anecdote become a through-line rather than a one-off detail?
- Does each callback to the thesis add something new, or is the post repeating the same idea in different words?
- Are claims scoped to the conditions where they are true?
- Are speculative claims, especially about AGI or future labour markets, framed with the right level of uncertainty?
- Are sources or further reading included when the post depends on specific papers, documentation, or technical claims?
- Are abbreviations spelled out before the acronym is used?
- Are code formatting, headings, equations, and lists used only where they help the rendered post?
- Does the ending land somewhere useful without becoming too neat?
- Does the post sound like a person thinking carefully, not a press release?
- Are there any generic closing lines that can be cut?
- Are there any em dashes to replace?
