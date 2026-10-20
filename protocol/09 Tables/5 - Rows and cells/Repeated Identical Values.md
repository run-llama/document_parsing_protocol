---
title: Repeated Identical Values
rule_id: tables-repeated-identical-values
status: rule
scope: page
tags: [tables, rowspan, failure-mode]
---

# Repeated Identical Values Down a Column

> [!success] ✅ Normative
> A `rowspan` MUST be used only where the page genuinely merged the cell. A value printed *k* times
> at *k* distinct vertical positions MUST be rendered as *k* cells; repeated content MUST NOT be
> merged.

"82.13%" printed nine separate times, "Data Page" repeated down a column, the same rate on every
row — the temptation is to collapse them into one spanning cell. That output is non-conforming.

```text
Printed (9 separate lines):    Non-conforming output:
| 1 | 82.13% |                 | 1 | [rowspan=9]82.13%  |
| 2 | 82.13% |                 | 2 | ROW_SPAN_CONTINUE  |  ← merges a value
| … | 82.13% |                 | … | ROW_SPAN_CONTINUE  |    printed 9 times
```

## Why merging is wrong, not just different

A `rowspan` is a claim about the *page*: "these cells are one cell." When the page printed nine
cells, that claim is false — the **never invent** failure. Anyone counting records downstream then
gets one where the document has nine, and the loss is invisible because the output still looks
well-formed. A span that cannot be pointed to on the page is an error even when the values under
it are right.

## Deciding from the geometry

The decision MUST be taken from where the value is printed, not from how the column reads:

- **one printed occurrence** spanning several rows → one cell with a `rowspan`;
- **distinct vertical positions** → separate cells, one per row.

A column of identical values is exactly where the eye stops resolving lines, so the word positions
on the page, not an impression of the column, settle it (see [[Boxes and Granularity]]). For the
opposite case — where the page really did merge a cell across a multi-line record — see
[[Record Groups and Multi-Line Cells]].

### ✅ **Sample** — `star`

![[zoo-star.png]]

`*` printed dozens of times down every column, each on its own ruled row, so each is its own cell
rather than a `rowspan`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="5">APPLICABILITY CHART</th> </tr>
  <tr> <th rowspan="2">STATE</th> <th colspan="4">TERRORISM OPTIONS – INCLUDING PRICING</th> </tr>
  <tr> <th>VERSION</th> <th>IMPLEMENTATION CIRCULAR</th> <th>EFFECTIVE DATE</th> <th>EXPIRATION DATE</th> </tr>
  <tr> <td>ALABAMA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>ALASKA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>ARIZONA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>ARKANSAS</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>CALIFORNIA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>COLORADO</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <!-- … -->
  <tr> <td>GEORGIA</td> <td>CS102</td> <td>CP–SC–2024–381</td> <td>2/01/25</td> <td>+</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `aao`

![[zoo-aao.png]]

`523` repeats down a zip-to-zone column for dozens of rows, each on its own ruled row and kept
separate — and the run is broken by `323` at 85922 and `423` at 85931, which a merge would bury.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>Zip Code</th> <th>Zone</th> </tr>
  <tr> <td>85716</td> <td>523</td> </tr>
  <tr> <td>85717</td> <td>523</td> </tr>
  <tr> <td>85718</td> <td>523</td> </tr>
  <tr> <td>85719</td> <td>523</td> </tr>
  <tr> <td>85721</td> <td>523</td> </tr>
  <tr> <td>85723</td> <td>523</td> </tr>
  <!-- … -->
  <tr> <td>85920</td> <td>523</td> </tr>
  <tr> <td>85922</td> <td>323</td> </tr>
  <tr> <td>85923</td> <td>523</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `ymm`

![[zoo-ymm.png]]

`2025` on every row of the Year column, never collapsed. Every body cell prints blue, underlined
text; the legend above the table says blue means *add/change*. The underline is rendered as `<u>`;
how the colour itself is carried is governed by [[Text Colors]] and is not shown here.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>Year</th> <th>Make</th> <th>Model</th> <th>Body</th> <th>Wheel</th> <th>Cyl</th> <th>Make_Sym</th> <th>Model_Sym</th> <th>Style_Sym</th> <th>Aux_Sym</th> </tr>
  <tr> <td><u>2025</u></td> <td><u>GMC</u></td> <td><u>YUKON</u></td> <td><u>4 DOOR WAGON</u></td> <td><u>4X2</u></td> <td><u>6</u></td> <td><u>GM</u></td> <td><u>YA</u></td> <td><u>56</u></td> <td><u>L1</u></td> </tr>
  <tr> <td><u>2025</u></td> <td><u>GMC</u></td> <td><u>YUKON</u></td> <td><u>4 DOOR WAGON</u></td> <td><u>4X2</u></td> <td><u>8</u></td> <td><u>GM</u></td> <td><u>YA</u></td> <td><u>58</u></td> <td><u>XX</u></td> </tr>
  <tr> <td><u>2025</u></td> <td><u>GMC</u></td> <td><u>YUKON</u></td> <td><u>4 DOOR WAGON</u></td> <td><u>4X4</u></td> <td><u>6</u></td> <td><u>GM</u></td> <td><u>YA</u></td> <td><u>5K</u></td> <td><u>KQ</u></td> </tr>
  <tr> <td><u>2025</u></td> <td><u>GMC</u></td> <td><u>YUKON</u></td> <td><u>4 DOOR WAGON</u></td> <td><u>4X4</u></td> <td><u>8</u></td> <td><u>GM</u></td> <td><u>YA</u></td> <td><u>5L</u></td> <td><u>XX</u></td> </tr>
  <tr> <td><u>2025</u></td> <td><u>HONDA</u></td> <td><u>ACCORD</u></td> <td><u>4 DOOR SEDAN</u></td> <td> </td> <td><u>4</u></td> <td><u>HD</u></td> <td><u>AS</u></td> <td><u>44</u></td> <td><u>LP</u></td> </tr>
  <tr> <td><u>2025</u></td> <td><u>HONDA</u></td> <td><u>ACCORD HYBRID</u></td> <td><u>4 DOOR SEDAN</u></td> <td> </td> <td><u>4</u></td> <td><u>HD</u></td> <td><u>AH</u></td> <td><u>44</u></td> <td><u>LP</u></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `0p`

![[zoo-0p.png]]

25.0% / 12.0% / 0.0% repeat down whole columns of a headerless table, every row its own `<tr>`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <td>180</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
  <tr> <td>181</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
  <tr> <td>182</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
  <tr> <td>183</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
  <tr> <td>184</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
  <tr> <td>186</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
  <!-- … -->
  <tr> <td>243</td> <td>25.0%</td> <td>12.0%</td> <td>0.0%</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `10k`

![[zoo-10k.png]]

*New York Stock Exchange* repeated eleven times down the third column, each a distinct cell.

<details>
<summary>Expected Markdown · securities table</summary>

```markdown
<table>
  <tr> <th>Title of each class</th> <th>Trading Symbols</th> <th>Name of each exchange on which registered</th> </tr>
  <tr> <td>Class A Common Stock</td> <td>MDI.A</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>Class B Common Stock</td> <td>MDI.B</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>0.000% Senior Notes due 2025</td> <td>MDI25</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>1.125% Senior Notes due 2027</td> <td>MDI27</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.150% Senior Notes due 2028</td> <td>MDI28</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>1.500% Senior Notes due 2030</td> <td>MDI30</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.000% Senior Notes due 2034</td> <td>MDI34</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>1.625% Senior Notes due 2035</td> <td>MDI35</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.375% Senior Notes due 2039</td> <td>MDI39</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>0.500% Senior Notes due 2041</td> <td>MDI41</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.625% Senior Notes due 2059</td> <td>MDI59</td> <td>New York Stock Exchange</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `waiox`

![[zoo-waiox.png]]

Long runs of `0` in a claims triangle, kept as separate cells.

<details>
<summary>Expected Markdown · excerpt, table 1 of 2</summary>

```markdown
<table>
  <tr> <th colspan="13">Medical</th> </tr>
  <tr> <th colspan="13">Incurred Month</th> </tr>
  <tr> <th>Paid Month</th> <th>202401</th> <th>202402</th> <th>202403</th> <th>202404</th> <th>202405</th> <th>202406</th> <th>202407</th> <th>202408</th> <th>202409</th> <th>202410</th> <th>202411</th> <th>202412</th> </tr>
  <tr> <td>202401</td> <td>41,539</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>202402</td> <td>191,691</td> <td>29,902</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>202403</td> <td>90,233</td> <td>324,478</td> <td>55,730</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>202404</td> <td>11,157</td> <td>20,717</td> <td>326,646</td> <td>70,804</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>202405</td> <td>5,533</td> <td>8,224</td> <td>429,936</td> <td>308,025</td> <td>125,102</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>202406</td> <td>283</td> <td>-45,171</td> <td>36,806</td> <td>13,870</td> <td>241,742</td> <td>52,107</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <!-- … -->
</table>
```

</details>

<!-- skill:generate
- When the same value is printed on several rows (a *, a year, an exchange name, a run of 0), write it once per row in its own cell. Never merge it into one cell with rowspan.
- Use rowspan only when the value is printed once and visibly spans several rows (a single cell covering several ruled lines).
-->

<!-- skill:check
- FAIL (MUST) if a cell carries a rowspan while the page prints its value separately on each of the spanned rows.
- FAIL (MUST) if the number of rows in the Markdown table is lower than the number of printed rows because repeated values were merged.
-->

## Related

- [[Record Groups and Multi-Line Cells]] — where `rowspan` **is** the required rendering
- [[Barely-Existing Columns and Headers]] — the same never drop, never invent discipline for columns
- [[Header Body Column Count Mismatch]] — never duplicate a value to fill a position
