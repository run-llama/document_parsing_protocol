---
title: Boxes and Granularity
rule_id: output-boxes-and-granularity
status: rule
scope: page
order: 3
tags: [output, output-model, boxes, layout]
---

# Boxes and Granularity

> [!success] ✅ Normative
> A box is the region of the page that an element's printed content occupies. Boxes MUST be given at
> exactly the granularity that was requested, and at that granularity every element MUST have one
> box. A producer MUST NOT return several granularities in place of one.

## What a box covers

A box MUST enclose all of its element's printed content and SHOULD enclose nothing else. What
belongs to an element — whether a caption is inside a table's box, whether a list item's box
includes its bullet, where a picture ends — is decided by the layout rules: [[Block Boundaries]],
[[Block Annotation]] and [[Block Classes]]. A box never covers content moved out of its position
in the Markdown: a watermark's box is where the watermark is printed.

## The four levels

| Level | A box is given for… | Suited to |
| --- | --- | --- |
| **none** | each element (region level) | the default: region-level grounding |
| **cell** | each element, and each table cell | per-value verification and highlighting |
| **line** | each element, and each printed line | line-level citation, reading-order checks |
| **word** | each element, and each word | per-token grounding |

## The levels are a ladder

The levels subsume one another, and the resolution rule is strict precedence:

```text
word  >  line  >  cell  >  none
```

A request naming several levels MUST be served at the finest one named; naming coarser levels
alongside it changes nothing.

## Choosing a level

Finer is not better. Each step down multiplies the number of boxes, and every box can be wrong,
mis-attributed or drift out of alignment with its text. A consumer SHOULD request the coarsest
level that answers its question.

Where a rule turns on geometry — *is this value printed once or three times? does this ruling
line stop before that column?* — the evidence lives at **cell** level or finer. A coarser output
can neither settle nor dispute those questions.

<!-- skill:generate
- When boxes are requested, return them at exactly the requested level (none = one box per element; cell = also each table cell; line = also each printed line; word = also each word). If several levels are named, use the finest.
- A box encloses all of its element's printed content and nothing else.
-->

<!-- skill:check
- FAIL (MUST) if boxes are at a different granularity than requested, or an element at that granularity has no box.
- FAIL (MUST) if a box does not enclose all of its element's printed content.
- WARN (SHOULD) if a box encloses substantial content that belongs to a different element.
-->

## Related

- [[Traceability]] — why every element has a box
- [[Block Boundaries]] — what a Picture or Table box contains
- [[The Sidecar]] — how boxes are carried
