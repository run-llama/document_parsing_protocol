---
title: Layout Regions
rule_id: layout-layout-regions
status: rule
scope: page
tags: [rule, layout]
---

# Layout Regions

> [!success] ✅ Normative
> A region's class MUST be settled before its content is rendered, because the class decides which
> rule governs the rendering. A region rendered under the wrong class is non-conforming however
> faithfully its text is transcribed.

A producer segments each page into **regions**, each carrying a label. The label decides which rule
applies — so getting the region right is upstream of every other decision in this protocol.

This note maps the vocabulary that region detectors commonly emit onto the protocol. The protocol's
own classes, and what box each gets, are defined in [[Block Classes]] and [[Block Annotation]].
Detector labels MUST be resolved to those classes before they become layout annotations. The
resulting layout class MUST match the corresponding Markdown element's class in [[Elements]].

## The vocabulary

**Structure**
`title` · `doc_title` · `section-header` · `paragraph_title` · `text` · `content` · `abstract` ·
`list-item` · `document-index`

**Data**
`table` · `chart` · `formula` · `formula_number` · `code` · `algorithm` · `number`

**Figures**
`picture` · `image` · `figure_title` · `caption`

**Forms**
`form` · `key-value-region` · `checkbox-selected` · `checkbox-unselected`

**Page furniture**
`header` · `page-header` · `footer` · `page-footer` · `footnote` · `aside_text` · `reference` ·
`reference_content` · `seal`

## The label decides the rule

| Label | Governing rule |
| --- | --- |
| `table` | [[Is This Even a Table]] and the whole Tables chapter |
| `chart` | [[Cover Every Data Point]] |
| `picture` / `image` | [[Images and Figures]] |
| `form` / `key-value-region` | [[The Key-Value List]] |
| `list-item` | [[Bullets and Sub-Bullets]] |
| `caption` / `figure_title` | [[Titles Banners Captions]] |
| `formula` | [[Displayed Equations]] — LaTeX in `$$ … $$` |
| `checkbox-*` | [[Checkboxes]] |

## A detected label is evidence, not a verdict

A region labelled `table` is **not automatically a table.** Address blocks, two-column prose and
ungridded specification stacks are routinely labelled `table` by layout detection, and
[[Is This Even a Table]] exists to overrule that. A detected label MUST NOT be accepted on its own:
the region MUST be classed by what is actually printed.

The same holds in reverse: a genuine grid that detection missed MUST still be rendered as a table.

<!-- skill:generate
- Resolve detector labels to the protocol's element classes and use the same class for each element in layout and Markdown.
- Decide what each region is (table, chart, picture, form, list, caption, formula, checkbox, text) from what is printed before transcribing it; the kind of region decides how it is written.
- Do not trust a region's detected label: address blocks, two-column prose and ungridded spec lists are not tables; a real grid is a table even if nothing labelled it one.
-->

<!-- skill:check
- FAIL (MUST) if a layout annotation's class differs from the corresponding Markdown element's class.
- FAIL (MUST) if a region is rendered under the wrong kind (a prose block or address stack as a <table>, a printed grid as plain text, a chart as prose).
-->

## Related

- [[Block Classes]] — the protocol's own classes
- [[Block Annotation]] — what gets an element and a box
- [[Is This Even a Table]] — the test that overrules a `table` label
- [[Images and Figures]] — what a `picture` region becomes
