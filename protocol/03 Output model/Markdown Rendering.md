---
title: Markdown Rendering
rule_id: output-markdown-rendering
status: rule
scope: document
order: 2
tags: [output, output-model, markdown]
---

# Markdown Rendering

> [!success] ✅ Normative
> The output MUST be one Markdown document for the whole document, with pages in order separated
> by a line holding only `---`, and each page's elements in reading order. Where Markdown has no
> syntax for a construct, the output MUST use the HTML element this protocol names, and MUST NOT
> invent a notation of its own.

## Page boundaries

- Pages MUST appear in document order, each separated from the next by a line containing only
  `---`, preceded and followed by a blank line.
- `---` MUST NOT be used for anything else. A printed separator rule is `<hr/>` — see
  [[Line Separators and Breaks]] — and printed text that begins with `---` is escaped — see
  [[Escaping Printed Marks]].
- A page with no ink at all is represented by the single line `<!-- blank page -->` — see
  [[Ignoring and Rejecting]].
- Content MUST stay on the page it is printed on: a table, paragraph or cell that runs onto the
  next page is split at the boundary — see [[Cross-Page Tables]] and [[Output Options]].

## Markdown first, HTML where Markdown cannot

| Construct | Rendering |
| --- | --- |
| Headings | ATX `#` headings |
| Bold / italic | Markdown `**` / `*`; inside HTML tables, see [[Bold and Italic Inside Tables]] |
| Underline, superscript, subscript, highlight | `<u>`, `<sup>`, `<sub>`, `<mark>` |
| Meaningful text colour | `<font color="NAME">` |
| Tables | HTML `<table>` with `<tr>`, `<th>`, `<td>`, `rowspan`, `colspan` |
| Tables representing charts | HTML `<table data-source="chart">` — see [[Cover Every Data Point]] |
| Table and chart captions | `<caption>…</caption>` first or last inside `<table>` according to reading order — see [[Titles Banners Captions]] |
| Printed separator rule | `<hr/>` |
| Line break inside one block | a plain newline — see [[Line Breaks Inside a Block]] |
| Maths | `$$ … $$`, inline and displayed |
| Diagrams and blueprints | fenced `diagram/<language>` block; fenced `description` only when no suitable language can faithfully represent the content |

Tables MUST be HTML because spanning cells, multi-tier headers and multi-line cells cannot be
expressed in pipe tables; pipe tables MUST NOT be used. See [[Nested Tables]].

## Markers

The protocol defines a small set of bracketed markers for printed things that are not text. They
are the only placeholders allowed: `[blank]` an empty field, `[x]` / `[ ]` a checkbox,
`[signature]` / `[signature:{name}]`, `[seal: …]`, `[logo: …]` / `[logo]`, `[watermark: …]`, `[stamp: …]` / `[stamp]`, `[handwritten: …]`, `[REDACTED]`. Each is
defined in its own rule.

## Page header and footer bands

A header band MUST be rendered as its own paragraph(s) at the start of its page's content and a
footer band at the end, never as a heading. A producer MAY wrap each band in `<header>…</header>` /
`<footer>…</footer>`, so a consumer can drop or keep furniture without guessing where it ends; the
wrapper is optional, and output with or without it conforms.

<!-- skill:generate
- Output one Markdown document; separate pages with a line containing only --- (blank line before and after). Never use --- for anything else; a printed rule line is <hr/>.
- Use Markdown for headings (#), bold and italic; use HTML for underline <u>, superscript <sup>, subscript <sub>, highlight <mark> and every table (<table>, never pipe tables). A table representing a chart opens with <table data-source="chart">; ordinary printed tables do not carry that attribute.
- Use $$…$$ for all maths, inline and displayed. Use a diagram/<language> fenced block for diagrams, choosing a language that preserves the content: diagram/mermaid, diagram/plantUml or another suitable language; use a description fence only if no suitable language can faithfully represent the figure.
- Keep each page's content on its own page, in reading order; a page with no ink is the single line <!-- blank page -->. Render header and footer bands as their own paragraphs at the start and end of the page, never as headings; you may wrap them in <header>…</header> / <footer>…</footer>.
-->

<!-- skill:check
- FAIL (MUST) if a table representing a chart lacks data-source="chart" on its opening <table> tag, or an ordinary printed table carries that attribute.
- FAIL (MUST) if the number of --- page separators does not equal the number of pages minus one, or --- appears anywhere else as a line.
- FAIL (MUST) if a table is written as a Markdown pipe table instead of an HTML <table>.
- FAIL (MUST) if underline, superscript, subscript or highlight use a notation other than <u>, <sup>, <sub>, <mark>.
- FAIL (MUST) if a page header or footer band is rendered as a heading or in the middle of the page's content.
-->

## Related

- [[Elements]] — the rendering of each element class
- [[Text Formatting Conventions]] — the inline markup table
- [[Line Separators and Breaks]] — why `---` is reserved for page boundaries
