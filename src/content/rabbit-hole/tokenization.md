---
title: Introduction to Tokenization
description: Byte-pair encoding, weird edge cases, and why representation choices leak into behaviour.
date: 2026-09-11
readTime: 6 min read
---

Tokenization is easy to underestimate because it happens before the model gets involved. Text goes in, tokens come out, and the rest of the system treats those tokens as the basic units of thought.

But the choice of tokenizer changes what the model sees. Some words are single tokens, some are fragmented, and some languages or domains pay a higher token cost than others. Those choices affect context length, pricing, latency, and sometimes behaviour.

The lesson for me is that representation is never neutral. Before a model reasons about text, the tokenizer has already decided how that text is carved up.
