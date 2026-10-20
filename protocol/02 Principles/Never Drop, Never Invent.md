---
title: Never Drop, Never Invent
rule_id: principles-never-drop-never-invent
status: rule
scope: page
order: 2
tags: [principles]
---

# Never Drop, Never Invent

> [!success] ✅ Normative
> Every piece of printed content MUST survive into the output (**never drop**), and the output
> MUST NOT contain a label, value, span, header, structure or relationship that the page does not
> print (**never invent**).

Almost every rule in this protocol exists to prevent one of these two failures.

## Never drop

Printed content means visually perceptible content under [[The Page Is the Ground Truth]]. Hidden,
microscopic or imperceptibly low-contrast source strings are outside that scope; visible but
unreadable text is retained as evidence with `[illegible]`, not silently discarded.

A visible row, column, cell, marker, header, caption, footnote, stamp or repeated table MUST appear
in the output. The most-dropped items are the last row of a table, trailing summary lines, detached
cells beside a grid, sparse columns proven only by their header, and text in the margins.

Where the protocol is unsure how to represent something, the rendering that loses no content is
the conforming one.

## Never invent

The output MUST NOT add what the page does not print. A `rowspan` is a claim that the page merged
those cells; if the page printed them separately, the claim is false. A heading level, a header
tier, a list nesting or a table boundary is likewise a claim about the page and MUST be supported
by it.

Placeholders that stand for content — `[image]`, `[The image shows…]`, `...` — are invented and
MUST NOT appear, except the explicit markers this protocol defines (such as `[blank]` for an empty
form field and `[signature]`).

<!-- skill:generate
- Every visible piece of content on the page must appear in your output: last rows, totals, footnotes, margin text, detached cells, repeated tables.
- Never add anything the page does not print: no invented headers, labels, values, merged cells, headings or relationships.
- When unsure how to render something, choose the rendering that loses no content.
-->

<!-- skill:check
- FAIL (MUST) if any printed text, row, column, cell, caption, footnote or marker visible on the page is missing from the Markdown.
- FAIL (MUST) if the Markdown contains a label, value, header, span or structure that the page does not print.
- FAIL (MUST) if the Markdown contains a placeholder such as "[image]" or "[The image shows…]" instead of content.
-->

## Related

- [[The Page Is the Ground Truth]] — what the output is judged against
- [[Traceability]] — every output element points back at printed content
- [[Accepted Alternatives]] — where two renderings are equally faithful
