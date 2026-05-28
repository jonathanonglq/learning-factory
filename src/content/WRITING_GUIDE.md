# Writing Guide

Use this guide when drafting or editing posts for `brain-dump`, `rabbit-hole`, and `lab-bench`.

## Core Voice

Be concise where possible without losing essence. Write in a thoughtful, grounded, human way.

Avoid sounding overly polished, symmetrical, or corporate. Prioritise specificity over abstraction, and clarity over flourish. Vary sentence lengths naturally.

It is okay to sound slightly unfinished or opinionated at times. Use concrete observations, subtle personality, and occasional conversational asides where appropriate.

Do not try too hard to sound profound.

## Depth

Do not be constrained by blog-post length. Be concise at the sentence level, but give each sub-idea enough room to become understandable from first principles.

If an idea depends on a mechanism, assumption, trade-off, or hidden definition, explore it until the reader can see why it matters. Do not skip the middle steps just to keep the piece short.

## Avoid

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

## Prefer

- Specific examples and concrete observations.
- Plain explanations of why something matters.
- Natural paragraph rhythm.
- Honest uncertainty when the idea is still developing.
- British/Singapore English where spelling differs.

## Technical Clarity

Spell out abbreviations in full on first use, then use the acronym afterwards. For example: Hierarchical Navigable Small World (HNSW), then HNSW.

For Rabbit Hole posts, it is fine to be more technical when the concept needs it. Include key equations where they make the mechanism clearer, but introduce every symbol in plain language and explain what the equation is doing.

Equations should support understanding, not decorate the post. If an equation is included, follow it with a concrete interpretation or small example.

Use `$...$` for inline math and `$$...$$` for block equations.

## Agent Workflow

When generating a substantial post, consider using a small set of specialised agents if the user explicitly asks for subagents or parallel drafting.

Suggested roles:

- Researcher: consolidate relevant sources, current developments, definitions, examples, and citations where needed. For recent or fast-moving topics, browse the web and prioritise primary sources.
- Technical explainer: work through the mechanism from first principles. For Rabbit Hole posts, identify useful equations, examples, edge cases, and places where readers may get confused.
- Sceptic: challenge weak claims, missing assumptions, hype, unsupported leaps, and explanations that sound too neat.
- Synthesiser: turn the research, explanation, and critique into a coherent draft that follows this guide.
- Editor: check voice, banned phrases, acronym expansion, paragraph rhythm, no em dashes, no short dramatic standalone paragraphs, and whether each sub-idea is developed enough.

Do not use all roles by default. Use the smallest set that fits the post. For a quick draft, one writer and one editor may be enough. For technical Rabbit Hole posts or current-events Brain Dump posts, researcher, technical explainer, sceptic, and editor are usually useful.

## Section Notes

### Brain Dump

Use this for less technical reflections on AI, society, work, incentives, open source, closed source, research culture, and how AI may reshape everyday life.

The tone can be more reflective and opinionated, but should stay grounded.

### Rabbit Hole

Use this for learning notes. The goal is to explain AI/ML concepts clearly enough that writing them helps internalise them.

Prefer step-by-step clarity over cleverness. Definitions should feel useful, not textbook-like.

### Lab Bench

Use this for implementation notes, experiments, comparisons, reproductions, and practical lessons from building.

Be specific about setup, assumptions, trade-offs, failure modes, and what changed after testing.

## Checklist

- Is the main idea clear within the first few paragraphs?
- Are abstract claims backed by concrete examples?
- Does the post sound like a person thinking carefully, not a press release?
- Are there any generic closing lines that can be cut?
- Are there any em dashes to replace?
