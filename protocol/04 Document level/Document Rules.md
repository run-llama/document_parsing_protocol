---
title: Document Rules
scope: document
order: 1
tags: [meta, document, index]
---

# Document Rules

Almost every rule in this protocol is a **page rule**: it can be applied with only the page in
view. A handful are **document rules**: applying them needs other pages of the same document. Every
rule carries a 📄 or 📚 badge saying which it is — see [[Rule Status and Scope]].

| | 📄 Page rule | 📚 Document rule |
| --- | --- | --- |
| **Evidence** | this page alone | this page and others in the document |
| **When it is decided** | on each page | once, at or before the first page that forces it |
| **What a later page does** | decides again from its own print | follows the earlier decision |

## The document rules

- [[Document Type]] — slide deck or paged document, and which sheet is the cover
- [[Recurring Page Furniture]] — a band that is furniture anywhere is furniture everywhere
- [[Heading Depth Across Pages]] — a new page does not restart the hierarchy
- [[Choices Made Once Per Document]] — every ⚖️ rendering is held for the whole document
- [[Cross-Page Tables]] — fragments stay on their pages, with continuation flags set across each break

## Precedence

The document decisions come first: the document type and the cover gate the Title class and the
heading depth on every page, and the furniture decision gates which margin bands are headers and
footers. Page rules are then applied within those decisions, and each ⚖️ choice, once made, holds
for the rest of the document.

## A single page

A document rule cannot be settled from a single page. Each document rule states the conforming
behaviour for that case, and the pattern is always the same: the output applies what the page
itself supports and never assumes what other pages print.

## Related

- [[The Page Is the Ground Truth]] — the requirement every rule, page or document, serves
- [[Document Representation Protocol]] — the full index
