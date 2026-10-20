---
title: Quote Blocks
rule_id: text-quote-blocks
status: rule
scope: page
tags: [text, formatting]
---

# Quote Blocks

> [!success] ✅ Normative
> A quoted or inset region MUST be flattened: its content is rendered as ordinary text, headings
> and tables included. The output MUST NOT add `>` block-quote markers.

A boxed or inset region on the page renders as:

```text
## here we go
Yeah
```

not:

```text
>
> ## here we go
> Yeah
```

## Why flatten

Block-quote markers interact badly with headings and tables that sit inside the quoted region. Most
inset regions in real documents are not quotations at all — they are callouts, pull quotes or
sidebars that happen to be visually offset. Flattening keeps the content addressable. The cost is
losing the "this was inset" signal, and that cost is accepted.

## A real quotation

In prose documents an inset block sometimes does mean *someone else said this*. It is flattened
all the same: the words survive, and every printed character of them — quotation marks, attribution
line — MUST be kept.

<!-- skill:generate
- Render a boxed, inset or indented quotation region as ordinary text, with its headings, lists and tables rendered normally.
- Never prefix lines with > block-quote markers.
- Keep every printed word of the region, including quotation marks and any attribution line.
-->

<!-- skill:check
- FAIL (MUST) if any line of the Markdown begins with a > block-quote marker.
- FAIL (MUST) if text inside an inset or quoted region on the page is missing from the Markdown.
-->

## Related

- [[Text Formatting Conventions]] — the full inline-markup table
- [[Reading Order]] — where an inset region's content falls in the page's sequence
- [[Escaping Printed Marks]] — printed characters that are also Markdown syntax
