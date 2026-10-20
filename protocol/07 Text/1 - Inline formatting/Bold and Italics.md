---
title: Bold and Italics
rule_id: text-bold-and-italics
status: rule
scope: page
tags: [text, formatting, inline]
---

# Bold and Italics

> [!success] ✅ Normative
> Bold MUST be written `**bold**` and italic `*italic*`, in Markdown, except where the Markdown
> delimiter cannot close, where `<strong>` / `<em>` MUST be used. They MUST be applied only where the
> printed glyphs are heavier or slanted than their neighbours.

HTML elements are reserved for marks Markdown cannot express at all — see [[Underlined Text]],
[[Superscript and Subscript]] and [[Highlighted Text]]. `<b>`, `<i>`, `<strong>` and `<em>` MUST NOT
be used for ordinary emphasis in the Markdown text.

## Where `**` cannot close

CommonMark cannot close `**` or `*` between a punctuation mark and a letter: `**---**To be` is not
bold when rendered. In exactly that case — the emphasised run ends in punctuation and a letter or
digit follows with no space — the run MUST be written with `<strong>` (bold) or `<em>` (italic)
instead: `<strong>---</strong>To be`. Everywhere else the Markdown delimiters are used. (Inside HTML
table cells, emphasis is always `<strong>` / `<em>` — see [[Bold and Italic Inside Tables]].)

## Styling comes from the glyphs, not from the role

The syntax is the easy half. The failure that costs fidelity is styling text because of what it
*is* rather than what it *looks like*: bolding a heading because headings are usually bold, or
bolding a whole column because one cell in it is heavy.

- Styling MUST be decided from the glyphs on the page, one run of text at a time.
- A run MUST NOT be styled because of its role (heading, label, total) when its glyphs are not
  heavier or slanted.
- Where it cannot be established whether a run is heavier than its neighbours, the run SHOULD be
  left unstyled. An unmarked run loses a nuance; a wrongly marked one asserts something the page
  does not print — the **never invent** failure.

Tables are where this goes wrong most often, and they are judged cell by cell — see
[[Bold and Italic Inside Tables]].

<!-- skill:generate
- Write bold as **text** and italic as *text*. Only where the run ends in punctuation and a letter or digit follows directly (so ** or * cannot close), write <strong>…</strong> or <em>…</em> instead, e.g. <strong>---</strong>To be. Never use <b> or <i>.
- Bold or italicise a run only when its printed glyphs are visibly heavier or slanted than the text around it; never because it is a heading, a label or a total.
- Decide run by run and cell by cell; if you cannot tell whether a run is heavier, leave it plain.
-->

<!-- skill:check
- FAIL (MUST) if emphasis is written with <b>, <i>, <strong> or <em> instead of ** and *.
- FAIL (MUST) if a run is marked bold or italic whose glyphs on the page are not heavier or slanted than their neighbours.
- WARN (SHOULD) if a run whose glyphs are clearly heavier or slanted is left unstyled.
-->

## Related

- [[Bold and Italic Inside Tables]] — the same rule applied cell by cell, where over-application is most common
- [[Text Formatting Conventions]] — the full inline-markup table
- [[Drop Caps]] — size is typography, not a style the output records
