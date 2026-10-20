---
title: Line Breaks Inside a Block
rule_id: text-line-breaks-inside-a-block
status: rule
scope: page
tags: [text, layout, line-breaks]
---

# Line Breaks Inside a Block

> [!success] ✅ Normative
> One printed block set on several lines MUST stay one element, with a plain newline between its
> printed lines — no trailing spaces, no `<br>`. The same spelling MUST be used for every multi-line
> block in the document. Inside a table cell, where a newline cannot be written, the break is `<br>`.

One printed block that runs to more than one line because the page sets it that way: a stacked
masthead, a postal address, a two-line banner, a title broken across a rule. The lines belong
together; only the typesetting separates them.

```text
MEREVALD                     ← one block, two printed lines
Merevald Retail Ltd
```

## Settled: the block stays whole

- One printed block MUST be one element, whatever break is written between its lines. Two stacked
  lines of a masthead MUST NOT become two headings, two paragraphs, or a heading with a subtitle.
  Splitting it is the **never invent** failure: the page printed one block, and a split claims it
  printed two.
- Whether lines form one block is judged by the printing, not the wording: a single set, a single
  alignment and a single leading mean one block, even when the two lines read as separable phrases.

## The break is a plain newline

The Markdown source keeps every printed line on its own source line. A renderer shows a single
newline inside a paragraph as a space, so a rendered view runs the lines together; that is a
display artefact, not a change to the output, which is judged on its source (see
[[Numbered Section Headings]] for the same principle). Two trailing spaces are invisible and are
stripped by most whitespace normalisation; `<br>` puts markup on every line. Neither is used outside
table cells.

- The break MUST be a plain newline, and the same spelling MUST be used for **every** multi-line
  block in the document — paragraphs, addresses, headers and footers alike.
- Inside a table cell a newline cannot be written, so a printed break there is `<br>` — see
  [[Record Groups and Multi-Line Cells]].
- A line that Markdown would parse as a list item or heading (`- `, `1. `, `# ` at its start) is
  escaped — see [[Escaping Printed Marks]].

## Not this rule's case

- A rule printed *between* blocks is a separator, not a break inside one — see
  [[Line Separators and Breaks]].
- A line that wraps because it ran out of column width is not a printed break at all: its lines
  MUST be joined with a space.
- Text whose line breaks carry meaning, such as verse, is governed by [[Verse and Hard Line Breaks]].

<!-- skill:generate
- Keep one printed block (a masthead, an address, a two-line banner or title) as one element; never split its lines into separate headings or paragraphs.
- Between the printed lines of such a block, write a plain newline (no trailing spaces, no <br>); inside a table cell use <br>.
- Join lines that only wrap because the column ran out of width with a single space.
- Use the same break spelling for every multi-line block in the document.
-->

<!-- skill:check
- FAIL (MUST) if one printed block (same type size, alignment and leading) is rendered as two headings, two paragraphs, or a heading plus subtitle.
- FAIL (MUST) if a line break inside one block outside a table cell is written as <br> or trailing spaces instead of a plain newline.
- WARN (SHOULD) if the document mixes break spellings between multi-line blocks.
-->

## Related

- [[Line Separators and Breaks]] — a rule between blocks, which resolves differently
- [[Verse and Hard Line Breaks]] — text whose breaks are content
- [[Stacked Headings]] — a title wrapped over several lines, joined with spaces
- [[Recurring Page Furniture]] — header and footer bands, which take the same break
