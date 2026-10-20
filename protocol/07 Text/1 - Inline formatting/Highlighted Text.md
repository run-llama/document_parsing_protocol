---
title: Highlighted Text
rule_id: text-highlighted-text
status: rule
scope: page
tags: [text, formatting, color]
---

# Highlighted Text

> [!success] ✅ Normative
> Highlighted text MUST be wrapped in `<mark>` carrying the highlighter colour as an attribute:
> `<mark style="background-color: yellow">the highlighted phrase</mark>`.

Text printed on a highlighter background is content, not decoration. The highlight MUST NOT be
dropped, and MUST NOT be reduced to bold or italic.

```text
<mark style="background-color: yellow">the highlighted phrase</mark>
```

## Requirements

- The colour MUST be named with the nearest HTML colour name — `yellow`, `green`, `cyan`,
  `magenta`, `lightgray` — not a hex value or an invented label. That keeps the vocabulary finite
  and matches the treatment of colour in [[Text Colors]] and [[Color as the Value]].
- The `<mark>` MUST cover exactly the run of text that carries the background. If the highlight
  stops mid-sentence, so does the `<mark>`.
- Inside a table, only the cells whose background is actually coloured are marked; a whole row or
  column MUST NOT be marked because part of it is highlighted — the same over-application problem
  as [[Bold and Italic Inside Tables]].

## Why keep the colour

In a reviewed document, different highlight colours usually mean different things — one reviewer
per colour, or one category per colour. A bare `<mark>` collapses that distinction and there is no
way to recover it afterwards.

<!-- skill:generate
- Wrap text printed on a highlighter background in <mark style="background-color: COLOUR">…</mark>, where COLOUR is the nearest HTML colour name (yellow, green, cyan, magenta, lightgray…), never a hex value.
- Start and end the <mark> exactly where the coloured background starts and ends; never widen it to the whole sentence, row or column.
- Never replace a highlight with bold or italic, and never drop it.
-->

<!-- skill:check
- FAIL (MUST) if text printed on a highlighter background is not wrapped in <mark>, or is rendered as bold/italic instead.
- FAIL (MUST) if a <mark> has no background-color, or gives it as a hex value or a non-HTML colour name.
- FAIL (MUST) if a <mark> covers text that has no coloured background on the page (a whole row, column or sentence when only part is highlighted).
- WARN (SHOULD) if the named colour is not the nearest HTML colour name to the printed highlight.
-->

## Related

- [[Text Colors]] — the same colour vocabulary for coloured text
- [[Bold and Italic Inside Tables]] — highlighting inside tables inherits the over-application problem
- [[Escaping Printed Marks]] — highlighted template placeholders, marked and escaped
