---
title: Attention Is All You Need, Unpacked
description: A ground-up visual path through attention heads, positional encodings, and residual streams.
date: 2026-11-08
readTime: 10 min read
---

Attention became easier for me to understand once I stopped treating it as a magical lookup table and started thinking about it as a learned routing mechanism. Each token asks a question, compares that question against the surrounding context, and decides how much information to pull from each position.

The core move is simple, but the consequences are deep. Queries, keys, and values let the model form many overlapping views of the same sequence. Multi-head attention then gives those views room to specialise, with some heads tracking syntax, some tracking position, and others catching looser semantic relationships.

The part I keep returning to is that attention is not only about what a token sees. It is about how information flows through layers. Residual streams, positional encodings, and feed-forward blocks all shape what attention can preserve, rewrite, or amplify.
