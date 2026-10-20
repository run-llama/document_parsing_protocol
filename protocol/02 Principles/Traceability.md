---
title: Traceability
rule_id: principles-traceability
status: rule
scope: page
order: 3
tags: [principles, boxes]
---

# Traceability

> [!success] ✅ Normative
> Every element of the output MUST be attributable to the place on the page it was read from. When
> boxes are requested, every Markdown element MUST have a box, and every box MUST cover exactly the
> printed content of its element.

Traceability is what lets a reader of the Markdown — a person or a model — go back to the page to
check, cite or highlight a statement. It is also what makes the two principles checkable: a
Markdown element with no printed source is invented; printed content with no Markdown element is
dropped.

- An element is traced by its **box**: the region of the page its content occupies. What a box
  covers and how fine boxes go are defined in [[Boxes and Granularity]]; how boxes are carried is
  defined in [[The Sidecar]].
- Content the protocol moves out of its printed position — a watermark placed first, a sidenote
  placed after its paragraph, a folio recorded on its own — still traces to where it was printed.
- A Markdown element that was synthesised rather than transcribed (for example a chart table built
  from marks) traces to the region of the page it was read from.

<!-- skill:generate
- When boxes are requested, give every Markdown element (heading, paragraph, list item, table, cell when asked, figure, caption, form field) a box on its page covering exactly its printed content.
-->

<!-- skill:check
- FAIL (MUST) if boxes were requested and a Markdown element has no box in the sidecar.
- FAIL (MUST) if a box does not cover the printed content of its element (points at the wrong place or misses part of it).
-->

## Related

- [[Boxes and Granularity]] — what a box covers, and how fine boxes go
- [[The Sidecar]] — where boxes are carried
- [[Never Drop, Never Invent]] — traceability makes both failures visible
