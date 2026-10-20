---
title: Elements
rule_id: output-elements
status: rule
scope: page
order: 1
tags: [output, output-model, layout]
---

# Elements

> [!success] ✅ Normative
> A document is represented as a sequence of pages, each a sequence of **elements** in reading
> order. Every element MUST have exactly one class from the table below and MUST be rendered in
> Markdown as that class prescribes.

An element is the smallest unit the protocol reasons about: it has one class, one rendering, one
position in reading order and — when boxes are requested — one box. The classes are the layout
classes of [[Block Classes]]; the rendering column says how each appears in the Markdown.
An element's class MUST be identical in its layout annotation and its Markdown representation.
Its Markdown syntax MAY be shared by several classes; the element's role determines the class.

| Class | Rendering in Markdown | Defined in |
| --- | --- | --- |
| **Title** | ATX heading at the document's top level | [[Document Type]], [[Heading Depth Across Pages]] |
| **Section-header** | ATX heading (`#`…`######`) at its document depth | [[Heading Depth Across Pages]], [[Recognising Ambiguous Headings]] |
| **Text** | Paragraph; inline marks per [[Text Formatting Conventions]] | chapter 7 |
| **List-item** | Markdown list item, nesting by printed indentation | [[Bullets and Sub-Bullets]] |
| **Table** | HTML `<table>` | chapter 9 |
| **Caption** | For a table or chart, `<caption>` first or last inside its table HTML according to reading order; otherwise a paragraph adjacent to its object | [[Titles Banners Captions]] |
| **Footnote** | Paragraph at its printed position | [[Footnotes Inside the Frame]] |
| **Formula** | `$$ … $$` LaTeX, with its printed equation number | [[Displayed Equations]] |
| **Picture** | Its content as text: a chart table (`<table data-source="chart">`), a `diagram/<language>` block, a `description` fallback block, or a prose description | [[Images and Figures]] |
| **Code** | Fenced code block | [[Block Classes]] |
| **Page-header** / **Page-footer** | Its own block, never a heading | [[Recurring Page Furniture]], [[Markdown Rendering]] |
| **Form** / **Key-Value Region** | Key-value lines with `[blank]` for empty fields | chapter 10 |
| **Checkbox-Selected** / **-Unselected** | `[x]` / `[ ]` before its label | [[Checkboxes]] |
| **Document Index** | Nested list, label then page number | [[Table of Contents]] |

## Elements inside elements

A table contains **cells**; a list contains **items**; a form contains **fields**. These inner
elements are rendered inside their parent's Markdown and receive boxes only at the granularity that
was requested — see [[Boxes and Granularity]].

A table or chart caption is rendered inside its object's `<table>` but retains the Caption class
and its own layout box. HTML nesting does not merge the caption into the Table or Picture class.

## Content outside the reading flow

Watermarks, margin banners, stamps, seals, handwriting and sidenotes are elements too. Each has a
defined place in the Markdown even though it sits outside the body flow on the page — see
[[Watermarks]], [[Margin Banners]], [[Seals and Round Stamps]], [[Handwritten Annotations]] and
[[Marginal Notes]].

<!-- skill:generate
- Split each page into elements in reading order; give each exactly one class, shared by layout and Markdown: Title, Section-header, Text, List-item, Table, Caption, Footnote, Formula, Picture, Code, Page-header, Page-footer, Form, Key-Value Region, Checkbox-Selected, Checkbox-Unselected, Document Index.
- Render headings as # headings, tables as HTML <table>, formulas as $$…$$, pictures as their content (chart table with <table data-source="chart">, diagram/<language> block, description fallback block or prose description), checkboxes as [x] / [ ].
-->

<!-- skill:check
- FAIL (MUST) if an element's layout class differs from its Markdown element class.
- FAIL (MUST) if a printed element is rendered with the wrong kind of Markdown (a heading as a paragraph, a table as text, a caption as a heading).
- FAIL (MUST) if a Picture is rendered as an image reference or placeholder instead of its content.
-->

## Related

- [[Block Classes]] — how to tell the classes apart on the page
- [[Markdown Rendering]] — the rules that hold across every class
- [[Boxes and Granularity]] — which elements get boxes
