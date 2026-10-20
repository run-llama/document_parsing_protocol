---
title: Blueprints
rule_id: diagrams-blueprints
status: rule
scope: page
tags: [images, diagrams]
---

# Blueprints

> [!success] ✅ Normative
> A floor plan or architectural drawing MUST use a faithful `diagram/<language>` encoding,
> preferring `diagram/tikz` then `diagram/svg`. If no suitable language can represent it faithfully,
> it MUST use a fenced `description` block. The output MUST preserve visible geometry, labels and
> printed measurements without inferred relationships or computed values. It MUST NOT be a table.

Floor plans and architectural drawings.

## How the element is recognised

A drawing whose content is spatial: walls, rooms, dimensions, door swings, labels placed where the
thing they name sits. There are no rows and no columns — only positions.

## Why a table is the wrong answer

A floor plan forced into a grid becomes a table of spatially adjacent labels that reads as data
downstream. That is worse than a description, because it is confidently wrong: nothing in the
output signals that the rows and columns were invented — the **never invent** failure. A floor plan
MUST NOT be rendered as a table.

The same trap appears in [[Geographic Maps]] (map coerced into a table) and
[[Electrical Schematics]] (circuit coerced into a graph): a spatial artefact flattened into a
linear structure that cannot carry position.

## Encode the spatial content

Language selection follows [[Diagrams and Flowcharts]]. The encoding MUST preserve visible walls,
openings, door swings, relative positions, dimensions, labels, scale bars, legends and notes.
Drawing coordinates MAY follow the visible geometry; they MUST NOT assert unprinted real-world
measurements. Inconsistent printed dimensions MUST be copied without correction. A room graph
that drops geometry is not a faithful encoding of a floor plan.

## Description fallback

Only when no suitable language can faithfully encode the drawing, use a fenced `description`
block in this shape:

1. **What it is** — one line describing the drawing.
2. **Areas and visible structure** — one item per labelled area in reading order, its printed label
   and size verbatim, followed by visible walls, openings and spatial relationships.
3. **Dimensions and notes** — every dimension line, scale bar, legend entry, north arrow label and
   note, verbatim.

Unshown adjacency, hidden openings, computed areas and corrected dimensions MUST NOT be added.
A visible doorway or shared wall may be described as drawn; proximity alone does not establish a
connection. The description MUST distinguish what is visible from what cannot be determined.

### ✅ **Sample** — a single-storey plan

![[blueprint.png]]

Twelve labelled areas, eight of them with a printed size, and dimension lines on all four sides. The
printed dimensions do not add up (`32'-0"`, `40'-0"` and `44'-0"` under a `62'-0"` span) and are
copied as printed.

<details>
<summary>Expected Markdown · description fallback when no faithful encoding is available</summary>

````markdown
```description
Floor plan of a single-storey house.

- MASTER BEDROOM 15'6" x 14'0"
- DINING 11'0" x 11'6"
- DECK
- KITCHEN 10'0" x 13'6"
- GREAT ROOM 16'0" x 20'0"
- BEDROOM #3 11'0" x 11'6"
- MASTER BATH
- GARAGE 22'0" x 22'0"
- STUDY 11'0" x 9'6"
- FOYER
- BEDROOM #2 14'0" x 13'6"
- PORCH

Dimension lines: 62'-0" across the top, divided 32'-0", 40'-0", 44'-0"; 28'-0", 22'-0", 15'-0" along the bottom; 54'-0" down the left, divided 30'-0", 24'-0"; 30'-0" and 24'-0" on the right.
```
````

</details>

<!-- skill:generate
- Encode floor plans as diagram/tikz, then diagram/svg, or another faithful language; preserve walls, openings, relative geometry and labels. Never substitute a table or a room graph that discards geometry.
- Only if no suitable language can faithfully encode it, describe it in a fenced block tagged description, in this shape: one line saying what the drawing is; then a list with one item per labelled area in reading order (top to bottom, left to right), the label then its printed size, both exactly as printed (an area with no size is listed by its label); then every dimension line, scale bar, legend entry and note, verbatim.
- Preserve visibly drawn walls and openings; do not infer hidden connections, computed areas or corrected dimensions. Drawing coordinates are not measured dimensions; copy printed dimensions even if inconsistent.
-->

<!-- skill:check
- FAIL (MUST) if a floor plan or architectural drawing is rendered as an HTML table.
- FAIL (MUST) if a room label, printed size, dimension, scale bar or legend entry printed on the drawing is missing or altered.
- FAIL (MUST) if the output invents an adjacency, opening, measured value or corrected dimension not supported by the drawing.
- FAIL (MUST) if the output discards meaningful geometry or uses a description when a faithful diagram encoding is available.
- WARN (SHOULD) if the description does not follow the fixed shape (what it is, then the areas in reading order, then dimensions and notes).
-->

## Related

- [[Geographic Maps]] — the same trap of a spatial figure coerced into a table
- [[Electrical Schematics]] — a spatial figure coerced into a graph
- [[Images]] — the general rule for what an image becomes
