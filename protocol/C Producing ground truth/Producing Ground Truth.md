---
title: Producing Ground Truth
order: 1
tags: [ground-truth]
---

# Producing Ground Truth

This appendix is for the people who produce ground truth: the reference output a parser is scored
against. It is procedure, not protocol — it says how to arrive at a conforming output, and every
step points at the rule it serves.

Ground truth for a page is a **conforming output** of it (see [[Conformance]]): its Markdown, and,
where boxes are evaluated, its boxes at the evaluated granularity (see [[Boxes and Granularity]]).
Chart pages additionally carry the rules of [[The Ground-Truth File]].

## Before you start

- Read [[The Page Is the Ground Truth]] and [[Never Drop, Never Invent]].
- Settle the document-level decisions once: [[Document Rules]].

## While you work

- When a page forces an ⚖️ choice for the first time, make it, record it with the page, and keep it
  for the rest of the document — see [[Choices Made Once Per Document]].
- When a page meets a ❓ open point, follow the working default and record the page, so the case is
  easy to find when the point is settled.

## Before you call a page done

- [[The annotation QA checklist]]

## Related

- [[About the Examples]] — where the example pages come from and how their expected Markdown is derived
- Ambiguity List — the open points and their proposed resolutions
