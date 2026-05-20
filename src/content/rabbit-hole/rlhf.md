---
title: RLHF from Scratch
description: Implementing the PPO loop for alignment and understanding the reward model bottleneck.
date: 2026-10-27
readTime: 9 min read
---

RLHF makes more sense when broken into its separate promises. First, collect human preferences. Then train a reward model to imitate those preferences. Finally, tune the language model so its outputs score well under that learned reward.

The tricky part is that each step compresses messy judgement into something easier to optimise. Preference data is partial, reward models can be fooled, and reinforcement learning can push the policy towards behaviours that look good to the scorer without being genuinely better.

Working through the loop from scratch is useful because it reveals where alignment is technical and where it is a measurement problem. The machinery matters, but the bottleneck is often the quality of the signal we ask the machinery to chase.
