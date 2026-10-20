---
title: Column Continuation
rule_id: tables-column-continuation
status: rule
scope: page
tags: [tables, boundaries, continuation]
---

# Column Continuation — one series printed as side-by-side halves

> [!success] ✅ Normative
> One long series printed as side-by-side blocks SHOULD be rendered as **one table per printed
> block**, each carrying its own copy of the headers, including repeated blocks inside one frame.
> A checker MUST accept source-supported joined equivalents without losing or reassigning records.

A long series — states A–Z, durations 1–36 — printed as two or three blocks beside each other under
one title, with the headers repeated over each block and the key continuing from one block to the
next.

```text
Printed:   | State | Rate |   | State | Rate |
           | AL    | 1.10 |   | MT    | 0.95 |

Rendered:  one table for the left block, one table for the right block,
           each with its own | State | Rate | header.
```

## Requirements

- Each printed block SHOULD be its own table, in reading order, with its own copy of the headers
  exactly as printed above it.
- Stacking the blocks into one table — the second block's rows appended under the first block's
  header — carries the same rows and is an accepted equivalent (see [[Accepted Alternatives]]); a
  document MUST use one form consistently throughout.
- **Do not invent a wide grid.** For separately framed blocks, zipping row *i* of each block into one wide row MUST NOT be done: it pairs `AL`
  with `MT` and asserts a relationship between two unrelated records. A row reading
  `STATE | AVAILABILITY | WITHDRAWAL | STATE | AVAILABILITY | WITHDRAWAL` built from separate blocks
  is non-conforming unless that wide grid is itself printed inside one enclosing frame.
- Repeated copies of the same schema inside one enclosing frame SHOULD also be split into one
  table per printed block. The outer frame and continuous horizontal rules do not make records
  with different keys belong to the same row. Keeping that source-printed wide grid is an
  accepted equivalent; splitting is preferred because each series can be traversed directly.
- A shared title MUST remain attached to the whole group. It MAY appear once outside the group;
  a title band MAY instead be repeated over each block with its span reduced to the block width.
  Actual shared row keys, non-repeating column groups, and cells carrying relationships across
  blocks MUST NOT be split by this rule.
- A shared key column MUST NOT be duplicated into both halves' output. It adds nothing and breaks
  the link between cells and their position on the page.

### ✅ **Sample** — `4tables`

![[zoo-4tables.png]]

Kansas county codes as four side-by-side `County | Code` blocks. Header repeated, key continuing
Allen…Ellsworth │ Finney…Lincoln │ Linn…Republic │ Rice…Wyandotte. The textbook case.

<details>
<summary>Expected Markdown · excerpt, table 1 of 4</summary>

```markdown
<table>
  <tr> <th>County</th> <th>Code</th> </tr>
  <tr> <td>Allen</td> <td>001</td> </tr>
  <tr> <td>Anderson</td> <td>003</td> </tr>
  <tr> <td>Atchison</td> <td>005</td> </tr>
  <tr> <td>Barber</td> <td>007</td> </tr>
  <tr> <td>Barton</td> <td>009</td> </tr>
  <tr> <td>Bourbon</td> <td>011</td> </tr>
  <!-- … -->
  <tr> <td>Ellsworth</td> <td>053</td> </tr>
</table>

<table>
  <tr> <th>County</th> <th>Code</th> </tr>
  <tr> <td>Finney</td> <td>055</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `4t`

![[zoo-4t.png]]

A single quarterly return series split across four blocks, quarters running 1999 Q2 → 2019 Q2. Each
two-line header is one wrapped label.

<details>
<summary>Expected Markdown · excerpt, table 1 of 4</summary>

```markdown
<table>
  <tr> <th>QUARTER ENDING</th> <th>HORIZON RETURN</th> </tr>
  <tr> <td>1999 Q2</td> <td>—</td> </tr>
  <tr> <td>1999 Q3</td> <td>—</td> </tr>
  <tr> <td>1999 Q4</td> <td>—</td> </tr>
  <tr> <td>2000 Q1</td> <td>—</td> </tr>
  <tr> <td>2000 Q2</td> <td>—</td> </tr>
  <tr> <td>2000 Q3</td> <td>—</td> </tr>
  <!-- … -->
  <tr> <td>2004 Q2</td> <td>2.83</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `ert`

![[zoo-ert.png]]

One ascending class-code series printed as **four** identical side-by-side blocks, so four tables.
A printed blank row separates the 00xx codes from the 01xx codes in every block. Zipping the four
blocks into one twelve-column table, as below, is the widening this rule forbids.

<details>
<summary>Expected Markdown · table 1 of 4</summary>

```markdown
<table>
  <tr> <th>CLASS CODE</th> <th>ELR</th> <th>D RATIO</th> </tr>
  <tr> <td>0010</td> <td>0.912</td> <td>0.42</td> </tr>
  <tr> <td>0015</td> <td>0.955</td> <td>0.41</td> </tr>
  <tr> <td>0025</td> <td>0.972</td> <td>0.38</td> </tr>
  <tr> <td>0040</td> <td>1.164</td> <td>0.40</td> </tr>
  <tr> <td></td> <td></td> <td></td> </tr>
  <tr> <td>0100</td> <td>0.888</td> <td>0.39</td> </tr>
  <tr> <td>0115</td> <td>1.010</td> <td>0.41</td> </tr>
  <tr> <td>0130</td> <td>0.842</td> <td>0.37</td> </tr>
  <tr> <td>0145</td> <td>1.075</td> <td>0.42</td> </tr>
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th>CLASS CODE</th> <th>ELR</th> <th>D RATIO</th> <th>CLASS CODE</th> <th>ELR</th> <th>D RATIO</th> <th>CLASS CODE</th> <th>ELR</th> <th>D RATIO</th> <th>CLASS CODE</th> <th>ELR</th> <th>D RATIO</th> </tr>
  <tr> <td>0010</td> <td>0.912</td> <td>0.42</td> <td>1005</td> <td>0.874</td> <td>0.46</td> <td>2010</td> <td>0.771</td> <td>0.44</td> <td>3015</td> <td>1.402</td> <td>0.40</td> </tr>
  <tr> <td>0015</td> <td>0.955</td> <td>0.41</td> <td>1012</td> <td>1.588</td> <td>0.41</td> <td>2022</td> <td>0.816</td> <td>0.45</td> <td>3025</td> <td>0.512</td> <td>0.41</td> </tr>
  <tr> <td>0025</td> <td>0.972</td> <td>0.38</td> <td>1020</td> <td>1.088</td> <td>0.40</td> <td>2030</td> <td>0.940</td> <td>0.42</td> <td>3040</td> <td>0.288</td> <td>0.41</td> </tr>
  <tr> <td>0040</td> <td>1.164</td> <td>0.40</td> <td>1035</td> <td>1.150</td> <td>0.45</td> <td>2045</td> <td>0.699</td> <td>0.45</td> <td>3055</td> <td>0.921</td> <td>0.41</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `535`

![[zoo-535.png]]

The `SL Tier | Factor` pair repeats three times inside one frame, with tiers 0–30, 31–61,
62–92. These are three consecutive ranges of one series. Three tables are preferred even though
horizontal rules cross the entire frame. The source-printed six-column grid and a single vertically
stacked series remain equivalent when every tier/factor association is preserved.

<details>
<summary>Expected Markdown · excerpts, all three blocks</summary>

```markdown
<table>
  <tr><th>SL Tier</th><th>Factor</th></tr>
  <tr><td>0</td><td>0.667</td></tr>
  <tr><td>1</td><td>0.668</td></tr>
  <!-- … -->
  <tr><td>30</td><td>0.717</td></tr>
</table>

<table>
  <tr><th>SL Tier</th><th>Factor</th></tr>
  <tr><td>31</td><td>0.721</td></tr>
  <tr><td>32</td><td>0.725</td></tr>
  <!-- … -->
  <tr><td>61</td><td>1.000</td></tr>
</table>

<table>
  <tr><th>SL Tier</th><th>Factor</th></tr>
  <tr><td>62</td><td>1.011</td></tr>
  <tr><td>63</td><td>1.022</td></tr>
  <!-- … -->
  <tr><td>92</td><td>1.200</td></tr>
</table>
```

</details>

## The case that looks the same but is not

Blocks with **different super-headers** over the same rows are one genuinely wide table, not a
continuation. They MUST be rendered as a single table with each super-header spanning its columns.

```text
| Non-Tobacco | Tobacco |     ← different super-headers over the same
| Age | M | F | M | F   |       ages: ONE genuinely wide table
```

The discriminator: in a continuation the blocks are the *same* columns with the key continuing
onward; here the blocks are *different* columns describing the same rows.

### ❌ **Counter-sample** — `3tables`

![[zoo-3tables.png]]

Same visual shape, different meaning: Solaris / Halcyon / Total are three **independent series**,
not one series split by key range, so they are three tables, each with its boxed title as a
spanning header row. Distinguishing this from the samples above is the whole difficulty.

<details>
<summary>Expected Markdown · table 1 of 3</summary>

```markdown
<table>
  <tr> <th colspan="3">Solaris Cards</th> </tr>
  <tr> <th>Period</th> <th>Cards (Mil.)</th> <th>Actual Growth</th> </tr>
  <tr> <td>2026Q1</td> <td>3,408</td> <td>7.3%</td> </tr>
  <tr> <td>2025Q4</td> <td>3,377</td> <td>8.0%</td> </tr>
  <tr> <td>2025Q3</td> <td>3,308</td> <td>8.1%</td> </tr>
  <tr> <td>2025Q2</td> <td>3,231</td> <td>7.7%</td> </tr>
  <tr> <td>2025Q1</td> <td>3,177</td> <td>7.2%</td> </tr>
  <tr> <td>2024Q4</td> <td>3,127</td> <td>7.1%</td> </tr>
  <tr> <td>2024Q3</td> <td>3,060</td> <td>7.4%</td> </tr>
  <tr> <td>2024Q2</td> <td>3,000</td> <td>7.9%</td> </tr>
  <tr> <td>2024Q1</td> <td>2,963</td> <td>9.2%</td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `2tab`

![[zoo-2tab.png]]

The contrast case sharpened: two differently titled panels that share one Region row spine are
**one wide table**, each panel title a spanning super-header. The left title is bold and
underlined, the right one bold, italic and underlined; the `Total` row prints values in the left
panel only.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="5"><u>2026 Area Factor Development</u></th> <th colspan="3"><u><em>Projected vs Prior</em></u></th> </tr>
  <tr> <th>Region</th> <th>Projected Members</th> <th>Trended EHB Allowed Claims</th> <th>Calculated Area Factors</th> <th>Final Area Factors</th> <th>2025 Area Factors</th> <th>2024 Area Factors</th> <th>2023 Area Factors</th> </tr>
  <tr> <td>1</td> <td>8,834</td> <td>$795.60</td> <td>0.9753</td> <td>1.0000</td> <td>1.0000</td> <td>1.0000</td> <td>1.0000</td> </tr>
  <tr> <td>2</td> <td>2,127</td> <td>$810.63</td> <td>0.9937</td> <td>1.0189</td> <td>1.0104</td> <td>1.0120</td> <td>1.0423</td> </tr>
  <tr> <td>3</td> <td>3,408</td> <td>$914.75</td> <td>1.1214</td> <td>1.1498</td> <td>1.1227</td> <td>1.1148</td> <td>1.0729</td> </tr>
  <tr> <td>4</td> <td>2,162</td> <td>$795.87</td> <td>0.9756</td> <td>1.0003</td> <td>0.9858</td> <td>0.9871</td> <td>1.0236</td> </tr>
  <tr> <td>5</td> <td>4,092</td> <td>$795.85</td> <td>0.9756</td> <td>1.0003</td> <td>0.9985</td> <td>0.9993</td> <td>1.0327</td> </tr>
  <tr> <td>6</td> <td>499</td> <td>$822.63</td> <td>1.0084</td> <td>1.0340</td> <td>1.0082</td> <td>0.9861</td> <td>0.9814</td> </tr>
  <tr> <td>8</td> <td>3,025</td> <td>$806.61</td> <td>0.9888</td> <td>1.0138</td> <td>1.0045</td> <td>0.9875</td> <td>0.9857</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>24,147</strong></td> <td><strong>$815.75</strong></td> <td><strong>1.0000</strong></td> <td><strong>1.0253</strong></td> <td> </td> <td> </td> <td> </td> </tr>
</table>

<!-- … -->
```

</details>

<!-- skill:generate
- When one long series (the key keeps counting up) is printed as several side-by-side blocks, each with the same headers, output one <table> per block in reading order, each with its own copy of the header row.
- Do not invent a wide row joining records from separately framed continuation blocks.
- Split repeated-schema continuation blocks into separate tables even inside one ruled frame; preserve shared title context and every record. Source-printed wide grids and vertical stacking are also accepted.
- If the side-by-side blocks have different titles or super-headers over the same rows, render one wide table with each title as a spanning header cell.
-->

<!-- skill:check
- FAIL (MUST) if separate side-by-side blocks continuing one series are zipped into one table whose rows join records from different blocks.
- FAIL (MUST) if a shared key column is repeated in the output where the page prints it once.
- WARN (SHOULD) if continuation blocks are stacked, or kept in their source-printed wide frame, rather than rendered one table per block.
- WARN (SHOULD) if one document renders some continuation blocks as separate tables and others as a stacked table.
-->

## Related

- [[Horizontal Slicing]] — the transpose of this case
- [[Split Tables Sharing a Header]] — the inverse: header printed once, not repeated
- [[Repeated Headers and Title Bands]] — a header repeated below, rather than beside, data rows
- [[Side-by-Side Mini Tables]] — independent schemas, including grids with no repeated continuation schema
