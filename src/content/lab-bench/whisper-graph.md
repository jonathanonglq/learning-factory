---
title: Whisper-to-Graph
description: A pipeline for turning spoken research notes into a linked concept map with source timestamps.
date: 2026-10-30
---

The idea behind Whisper-to-Graph is to turn messy spoken notes into something navigable. First transcribe the audio, then segment it into claims, concepts, and transitions, and finally link those pieces into a graph with timestamps back to the source.

I am interested in the workflow because spoken thinking is often more exploratory than written notes. It contains false starts, repetitions, and half-formed links. A useful system should preserve that texture while still making the output searchable and structured.

The hard part is deciding what deserves to become a node. Too many nodes and the graph becomes noise. Too few and the structure hides the reasoning that made the note valuable.
