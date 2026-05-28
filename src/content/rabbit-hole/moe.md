---
title: Mixture of Experts
description: Sparse routing, load balancing, and the appeal of scaling parameters without scaling active compute.
date: 2026-08-24
---

Mixture of Experts models scale by adding many specialised sub-networks while activating only a small number for each token. The attraction is straightforward: more parameters, but not proportionally more compute per inference step.

The routing problem is the heart of the design. A router decides which experts should process each token, and the system has to balance specialisation against load. If routing collapses onto a few experts, the model wastes capacity and becomes harder to train.

MoE models make scaling feel less like building one giant dense block and more like managing a distributed organisation. The architecture promises efficiency, but only if the routing, load balancing, and training dynamics hold together.
