---
title: Auto-Eval Sandbox
description: A minimal harness for writing model evals against generated traces and hand-scored rubrics.
date: 2026-08-29
readTime: 9 min read
---

The Auto-Eval Sandbox is a small harness for testing model behaviour with more discipline. It generates traces, scores them against explicit rubrics, and keeps enough context around each run to make failures inspectable.

The reason to build it is simple: vague impressions are not enough. If a prompt, tool, or model version feels better, I want a way to compare that feeling against examples that expose the behaviour I care about.

The most useful evals are not necessarily large. They are targeted, annoying, and easy to rerun. A good small eval can catch regressions long before a general benchmark notices anything has changed.
