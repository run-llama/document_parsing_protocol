---
title: Bullets and Sub-Bullets
rule_id: lists-bullets-and-sub-bullets
status: rule
scope: page
tags: [lists]
---

# Bullets and Sub-Bullets

> [!success] ✅ Normative
> A top-level bulleted item MUST be rendered with the `*` marker and a sub-item with the `-`
> marker. The two markers carry the nesting and MUST NOT be interchanged.

A printed list: items led by a bullet glyph or a number, sometimes with indented sub-items beneath
them.

```text
• Top-level item
   – Sub-item beneath it
   – Another sub-item
• Next top-level item
```

```markdown
* Top-level item
  - Sub-item beneath it
  - Another sub-item
* Next top-level item
```

## Ordered lists

- A printed numbering MUST be kept verbatim, including its style: `1.` `2.` `3.`, `a.` `b.` `c.`,
  `(i)` `(ii)` and `1)` `2)` differ on the page and MUST differ in the output. The numbering is
  often cited elsewhere in the document.

## Deeper nesting

- Where the page shows more than two levels, each further level MUST be carried by indentation.
- The relative structure MUST be preserved: a three-level list MUST NOT be flattened into two.

## Lists inside table cells

A cell holding a vertical list is governed by [[Record Groups and Multi-Line Cells]]: `<ul><li>`
and `<br>•` both conform inside a cell, and parallel lists across several columns of one row MUST
NOT be collapsed — they become one row per printed line.

## Bridge text between lists

An unbulleted line printed between two runs of bullets, such as `partially offset by`, MUST be
rendered as a paragraph between the two lists. It MAY be rendered as indented continuation text
only when it belongs to one specific list item.

### ✅ **Sample** — a line between bullets that is not a bullet

![[bag-release-bullet-interjection.png]]

Four bulleted increases, then `partially offset by` on its own unbulleted line, then one more
bullet. The interjection is a paragraph between two lists.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

GAAP diluted EPS for fiscal 2024 were $11.44, a 6% increase over $10.77 for fiscal 2023. Excluding a $0.51 and $1.28 decrease for business optimization costs in fiscal 2024 and 2023, respectively, and a $0.38 increase for a gain on an investment in fiscal 2023, adjusted EPS were $11.95, a 2% increase over $11.67 in fiscal 2023. The $0.28 increase in EPS on an adjusted basis reflects:

* a $0.19 increase from higher revenue and operating results;
* a $0.05 increase from lower share count;
* a $0.05 increase from a lower effective tax rate; and
* a $0.02 increase from higher non-operating income;

partially offset by

* a $0.03 decrease from higher noncontrolling interests.
```

</details>

## Bullet glyphs that carry meaning

- A printed bullet glyph that carries meaning — a tick for *acceptable*, a cross for
  *unacceptable* — MUST be kept as the first content token after the Markdown marker:
  `* ✓ Bank statement`.
- A decorative bullet shape (•, ◦, ▪, ➢) MUST be normalised to the Markdown marker and MUST NOT be
  transcribed.

### ✅ **Sample** — bullet glyphs that carry meaning

![[bag-university-icon-bullets.png]]

`Acceptable Financial Documents` bulleted with `✓`, `Unacceptable Financial Documents` bulleted
with `⊗`, side by side. Each meaningful glyph is kept after the Markdown bullet; see
[[Iconography and Symbols]]. The two captions are standalone subheads over their lists.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

### Acceptable Financial Documents

* ✓ Bank statement (checking or savings only)
* ✓ Bank letter on official letterhead
* ✓ Letter from organizational sponsor (company, government, scholarship)
* ✓ Loan sanction letter
* ✓ Letter from sponsor confirming you will have free room and meals

### Unacceptable Financial Documents

* ⊗ Employment income or salary statement
* ⊗ Property valuations (real estate, jewelry, automobile, etc.)
* ⊗ Investments including stocks
* ⊗ Credit card account statements
* ⊗ Bank deposit slip

<!-- … -->
```

</details>

<!-- skill:generate
- Write top-level bullets with "* " and sub-bullets with "- "; carry any deeper level by further indentation, never flattening levels.
- Keep printed list numbering exactly as printed: 1. / a. / (i) / 1) stay as they are.
- A plain line printed between two bullet runs (e.g. "partially offset by") is a paragraph between two lists, not a bullet.
- Keep a bullet glyph that means something (✓, ✗, ⊗) as the first word after the marker: "* ✓ Bank statement". Drop purely decorative bullet shapes.
-->

<!-- skill:check
- FAIL (MUST) if a top-level bullet uses a marker other than "*" or a sub-bullet uses a marker other than "-".
- FAIL (MUST) if printed list numbering is changed (renumbered, restyled, or replaced by bullets).
- FAIL (MUST) if a printed list with three or more nesting levels is flattened to fewer levels.
- FAIL (MUST) if a meaningful bullet glyph (tick, cross) visible on the page is missing after the Markdown marker.
- WARN (SHOULD) if an unbulleted line printed between two bullet runs is rendered as a list item.
-->

## Related

- [[Checkboxes]] — a box before an item is a form control, not a bullet
- [[Record Groups and Multi-Line Cells]] — lists printed inside table cells
- [[Row-Label Hierarchy]] — indentation that nests table rows rather than list items
- [[Iconography and Symbols]] — glyphs that stand for a value
