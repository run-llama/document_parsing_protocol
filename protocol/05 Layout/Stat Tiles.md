---
title: Stat Tiles
rule_id: layout-stat-tiles
status: rule
scope: page
tags: [rule, layout, slides]
---

# Stat Tiles

> [!success] ✅ Normative
> Each stat tile MUST be rendered as one printed label–value pair, in tile reading order, under the
> panel's heading where the panel prints one. Units and qualifiers MUST stay attached to their value.

A slide panel that prints a big number with a short label — `Out-of-home +26.5%`, `Total -19.8%` —
usually two or three of them side by side under a heading.

```text
┌─ 2025 volume growth¹ ──────────┐
│  Out-of-home        Total       │
│  ┌────────┐       ┌────────┐    │
│  │ +26.5% │       │ -19.8% │    │
└──────────────────────────────────┘
```

Read top to bottom, the labels come first and the values after, so a geometric reading separates
each figure from its label — the failure to avoid.

## Requirements

- Each tile MUST be one key-value line, `- label: value`, with the label and the value as printed;
  bold only where the glyphs are heavier.
- The tiles MUST follow tile reading order, each label next to its own value.
- A printed panel heading MUST come before its tiles. A heading MUST NOT be invented where the panel
  prints none.
- A unit, sign, footnote marker or qualifier (`LFL`, `(+1.9%)`) MUST stay with the value it
  qualifies; an icon that carries the direction MUST be kept — see [[Iconography and Symbols]].

### ✅ **Sample** — a growth panel beside two photos

![[bag-slide-kpi-tiles.png]]

`2025 volume growth¹` over two labelled figures, inside an orange box under four bullets. Each tile
becomes one line, label then value, in left-to-right order. The rest of the slide — tabs, photos,
footer — is rendered in [[Slide Furniture]].

<details>
<summary>Expected Markdown · excerpt, the stat panel</summary>

```markdown
<!-- … -->

2025 volume growth<sup>1</sup>

- **Out-of-home**: **+26.5%**
- **Total**: **−19.8%**

<!-- … -->
```

</details>

### ✅ **Sample** — a headline figure over a small table

![[bag-consumer-americas-tile.png]]

`Q1 2026` over `€240m`, with the qualifiers `+2.2%` and `+6.7% LFL` in pills beneath, then a
four-column table in the same card. The headline figure is one tile: its label, its value and both
qualifiers on one line. The right-hand card is rendered in [[Slide Furniture]].

<details>
<summary>Expected Markdown · excerpt, the left card</summary>

```markdown
# Consumer – Americas

- Q1 2026: **€240m** **+2.2%** **+6.7% LFL**

<table>
  <tr> <th>Region</th> <th>Q1 2025</th> <th>Q1 2026</th> <th>Change</th> </tr>
  <tr> <td>North America</td> <td>€148m</td> <td>€151m</td> <td>+2.0%</td> </tr>
  <tr> <td>South America</td> <td>€87m</td> <td>€89m</td> <td>+2.3%</td> </tr>
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — tiles with an arrow icon

![[bag-revenue-stat-tiles.png]]

Two rounded tiles beside a stacked-bar chart: `1H FY25/26` over `$9,675.2M`, then `YoY` with a
green up-arrow before `$177.8M (+1.9%)`. The arrow carries the direction and is kept as a bracketed
tag. The chart prints no value axis and no values; its rendering follows the Charts chapter and is
elided here.

<details>
<summary>Expected Markdown</summary>

```markdown
# Group Revenue

$ million, by quarter

<!-- … -->

- 1H FY25/26: **$9,675.2M**
- YoY: [up] **$177.8M (+1.9%)**
```

</details>

<!-- skill:generate
- Write each stat tile (a big number with a short label) as one list line "- label: value", keeping the label's and value's printed bold, in tile order; put the panel's printed heading first.
- Keep signs, units, footnote markers and qualifiers such as "LFL" or "(+1.9%)" on the same line as their value; keep a direction arrow as a bracketed tag such as [up].
- Never list all labels first and all values after.
-->

<!-- skill:check
- FAIL (MUST) if a tile's value is separated from its label (labels listed together, values listed together) or paired with the wrong label.
- FAIL (MUST) if a unit, sign or qualifier of a tile value is dropped or moved to another tile.
- WARN (SHOULD) if a panel heading is invented where none is printed, or a printed panel heading is not placed before its tiles.
-->

## Related

- [[Borderless Whitespace Tables]] — the panel test, for the larger version
- [[Slide Furniture]] — the other things a slide prints around its content
- [[Forms and Key-Value Regions]] — a key-value region that is not a form
