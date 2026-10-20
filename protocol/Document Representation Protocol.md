---
title: Document Representation Protocol
tags: [home]
---

# Document Representation Protocol

*Working title — draft.* A standard for representing a document as text: how each part of a page
is **interpreted** (is this a table? a heading? page furniture?), how each interpreted element is
**rendered as Markdown**, and how every Markdown element is **traced back to its box** on the page.

Markdown is the output because it is what language models read best. Where Markdown has no syntax,
the protocol names the HTML element to use; where a fact does not fit in text at all — the position
of each element — it is carried in a [[The Sidecar|sidecar]] alongside the Markdown.

## Reading the protocol

- [[Requirements Language]] — MUST, SHOULD and MAY
- [[Conformance]] — what a conforming output is, and how a check reports findings
- [[Rule Status and Scope]] — ✅ normative · ⚖️ equivalent forms · ❓ open point; 📄 page or 📚 document rule
- [[The Page Is the Ground Truth]] and [[Never Drop, Never Invent]] — the principles every rule serves
- [[Elements]] and [[Markdown Rendering]] — the output model in two pages
- [[Quick Reference]] — every requirement on one page

Every rule carries worked examples: a page and its **expected Markdown**. The whole protocol is
also available as [one long document](rfc.html) and as two generated agent skills — one that
produces conforming Markdown from page images and one that checks an output against the rules
([skills](skills/index.html)).

## Contents

<!-- toc -->
