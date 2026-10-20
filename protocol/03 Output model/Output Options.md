---
title: Output Options
rule_id: output-output-options
status: open
scope: document
order: 5
tags: [output, output-model, options]
---

# Output Options

> [!warning] ❓ Open point
> Four situations have more than one conforming output, depending on what the producer was asked
> to produce. **Working default:** the narrower reading — fragments separate, graphics described,
> everything printed recorded — which conforms under either setting. **Proposed resolution:** make
> each an explicit, named option of the request, and judge the output under the options it was
> produced with.

Every other requirement holds whatever the producer was configured to do. These four do not: an
output that assumes a setting the producer did not use is not held to a stricter standard; it is
held to an unreachable one.

## The four options

| The page shows | With the option | Without it (working default) |
| --- | --- | --- |
| A printed folio | The number is also recorded on its own, per page | It survives only inside the band text |
| A logo, seal or icon | The mark MAY be referenced as a saved image | Its content MUST be put into the text stream — see [[Images]] |
| A table continuing overleaf | The fragments MAY be joined into one table | Each fragment MUST stand alone — see [[Cross-Page Tables]] |
| A table titled `(continued)` | As above | The marker is kept and the fragment stands alone — see [[Continued in the Title]] |

## Why the narrower reading is the default

Nothing in the narrower reading is wrong under the wider setting; it is only less than the wider
setting allows. The reverse is not true: an output that fuses two fragments cannot be split into two
again if the setting turns out to be off.

<!-- skill:generate
- Unless the request says otherwise: keep table fragments on their own pages (never join across a page break), describe logos, seals and icons as text rather than referencing an image file, and keep a printed page number inside its header/footer text.
-->

<!-- skill:check
- WARN (SHOULD) if, with no option requesting it, table fragments from two pages are joined into one table (open point).
- WARN (SHOULD) if, with no option requesting it, a logo, seal or icon is referenced as an image instead of described (open point).
-->

## Related

- [[Cross-Page Tables]] — fragments and their continuation flags, which a join would build on
- [[Printed Page Numbers]] — the folio option
- [[Images]] — what a mark becomes when it is not referenced
