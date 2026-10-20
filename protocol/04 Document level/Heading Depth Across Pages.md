---
title: Heading Depth Across Pages
rule_id: headings-heading-depth-across-pages
status: rule
scope: document
tags: [headings, rule, layout]
---

# Heading Depth Across Pages

> [!success] ✅ Normative
> A new page MUST NOT restart the heading hierarchy. A heading MUST be given the depth its place in
> the document implies, and a top-level heading MUST appear only where the page prints one.

A page break is a printing accident, not a structural boundary. The section that was open at the
foot of one page is still open at the head of the next, and a heading that continues it keeps its
depth.

```text
page 4 …    ## 9.2 Pressure
                9.2.1 Pascal's Law          ← depth 3: inside 9.2
─── page break ───
page 5 …    9.2.2 Variation with Depth      ← still depth 3, not a fresh top level
```

## Depth comes from the document, not the page

Two signals settle almost every case, in this order:

1. **Printed numbering.** `9.2.1` sits under `9.2` sits under `9`. Where the document numbers its
   sections, the numbering MUST decide the depth, even where the typography disagrees.
2. **Typography, compared across pages.** Where nothing is numbered, a heading's depth MUST be
   judged against the other headings of the same document, not against the rest of its own page.
   The largest line on page 5 is not automatically a top-level heading.

A subsection MUST NOT come out at the same depth as its parent, or shallower. If `9.2` is depth 2
then `9.2.1` is depth 3, on whatever page it lands.

## Decks are the exception

In a slide deck the slides are peers and each slide title is legitimately top level. Whether the
document is a deck is decided once for the whole document — see [[Document Type]] — never slide by
slide.

## A single page

Where only one page is available, the hierarchy the page itself shows MUST be consistent — a
subsection always deeper than its parent — and the depth MUST be taken from printed numbering where
there is any. Where the absolute depth depends on pages that are not available, the output takes the
depth the page supports and asserts nothing more.

## Whether it is a heading at all

[[Recognising Ambiguous Headings]] separates standalone section titles from run-in labels, repeated
item labels and captions. Principal statement and numbered schedule titles are structural; a
company line directly above one stays a separate paragraph (see [[Stacked Headings]]), as do units
lines. A title
inside a grid is transcribed once, in its table position.

The following MUST NOT be rendered as headings:

- a running header — see [[Recurring Page Furniture]];
- a label naming the kind of document, such as `ORIGINAL ARTICLE` or `EXHIBIT 2` — it is text; the
  title beneath it is the heading;
- a value typed into a form field, however prominent;
- a table or figure caption — see [[Titles Banners Captions]].

<!-- skill:generate
- Keep heading depth continuous across pages: a heading that continues an open section keeps the depth it would have without the page break.
- Take depth from printed numbering first (9.2 one level deeper than 9, 9.2.1 one deeper again); without numbering, compare with other headings in the document, not just on the page.
- A subsection is always deeper than its parent. In a slide deck, every slide title is top-level.
- Never make a heading of a running header, a document-kind label such as EXHIBIT 2, a form value or a caption.
-->

<!-- skill:check
- FAIL (MUST) if a numbered subsection (e.g. 9.2.1) has the same or a shallower heading level than its parent (9.2) anywhere in the document.
- FAIL (MUST) if the first heading on a page is reset to top level although it continues a section opened on an earlier page (paged documents only).
- FAIL (MUST) if a running header, a document-kind label, a form value or a caption is rendered as a heading.
-->

## Related

- [[Document Type]] — decides whether the deck exception applies
- [[Block Classes]] — Title vs Section-header
- [[Recurring Page Furniture]] — a running header never earns a depth at all
- [[Titles Banners Captions]] — a caption never becomes a heading
