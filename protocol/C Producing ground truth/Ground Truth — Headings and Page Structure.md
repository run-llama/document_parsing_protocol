---
title: Ground Truth — Headings and Page Structure
tags: [ground-truth]
---

# Ground Truth — Headings and Page Structure

What to do, when producing ground truth, in the cases the heading and page-structure rules leave to
review. Each step serves the rule it links to; the rule decides the output.

| Situation | Step | Rule |
| --- | --- | --- |
| A page has a multi-line block (masthead, address, banner) | Keep it as one block with plain newlines and flag the page, so it can be revisited when the open point closes | [[Line Breaks Inside a Block]] |
| It is unclear which paragraph a marginal note annotates | Keep the note as its own block near its printed position and flag the page | [[Marginal Notes]] |
| A numbered line reads plausibly both as a heading and as a list item | Apply the working default and flag the page | [[Numbered Section Headings]] |
| A page is a table of contents or index | Choose the form the litmus test gives, record the choice for the document, and flag the page so both encodings stay visible | [[Table of Contents]] |
| A page is a transcript with numbered Q/A lines | Apply the working default and flag the page | [[Transcript Pages]] |
| Whether a page-top label is a running header depends on repetition on pages not in hand | Check the surrounding pages; if they are unavailable, keep the label where the page prints it and flag the page | [[Recognising Ambiguous Headings]] · [[Recurring Page Furniture]] |
| Only one page is available and a heading's absolute depth depends on pages not in hand | Keep the page's relative hierarchy and flag the page rather than guessing the level | [[Recognising Ambiguous Headings]] · [[Heading Depth Across Pages]] |

## Related

- [[Producing Ground Truth]] — the general procedure these steps belong to
- [[The annotation QA checklist]] — the checks run before a page is called done
