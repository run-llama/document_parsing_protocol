---
title: Triangles and Matrix Tables
rule_id: tables-triangles-and-matrix-tables
status: rule
scope: page
tags: [tables, encoding, empty-cells]
---

# Triangles & Matrix Tables (loss development)

> [!success] ✅ Normative
> **Every row MUST carry the full column count.** The jagged half MUST be padded with **individual
> empty cells** — one `<td></td>` per missing position. A `colspan` or `rowspan` over the empty region
> MUST NOT be used, and a `0` or any other value MUST NOT be invented.

Loss development exhibits and similar matrices are jagged on purpose. The missing half is
**meaningfully** empty — that development period has not happened yet — not data that failed to be
read.

```text
Accident yr | 12mo | 24mo | 36mo |
| 2021      | 450  | 512  | 530  |
| 2022      | 470  | 528  |      |  ← structurally empty,
| 2023      | 465  |      |      |    not "failed to read"
```

## Requirements

- **The shape MUST be kept.** Every row has the full column count; the cells past the end of the row
  are present and empty. Rows MUST NOT be truncated.
- **One empty cell per missing position.** Four unhappened periods are four `<td></td>`, not one
  `colspan="4"`. The span would say *"this region is one thing"*, and it is not — it is four distinct
  coordinates that each have not happened yet.
- **The empty half MUST NOT be padded with values.** Filling it with `0`, `n/a` or a repeat of the
  last figure destroys the only thing the triangle asserts.
- **A printed value MUST NOT be read as structural emptiness either.** Some pages print `0` across
  the future half. A zero is a claim and a blank is an absence; the output MUST render whichever the
  page prints.
- A cell that is empty because it cannot be read is a different situation — see
  [[Cell Text Fidelity]].

### ✅ **Sample** — `ppy`

![[zoo-ppy.png]]

Stacked loss-development exhibits where the empty lower-right is **meaningfully** empty: those
development periods have not happened. Every row of the first triangle carries all eleven cells. The
column headers are underlined, not bold.

<details>
<summary>Expected Markdown · table 1 of 3</summary>

```markdown
<table>
  <caption>All Companies Reporting to the Loss Data Bureau <sup>1</sup></caption>
  <tr> <th><u>Accident Year Ended</u></th> <th><u>15</u></th> <th><u>27</u></th> <th><u>39</u></th> <th><u>51</u></th> <th><u>63</u></th> <th><u>75</u></th> <th><u>87</u></th> <th><u>99</u></th> <th><u>111</u></th> <th><u>123</u></th> </tr>
  <tr> <td>12/31/2003</td> <td>418,550,936</td> <td>418,042,452</td> <td>417,267,765</td> <td>417,492,929</td> <td>417,216,932</td> <td>417,189,136</td> <td>417,146,522</td> <td>417,095,498</td> <td>417,140,320</td> <td>417,120,054</td> </tr>
  <tr> <td>12/31/2004</td> <td>431,833,889</td> <td>427,373,100</td> <td>425,430,426</td> <td>425,032,454</td> <td>424,899,046</td> <td>424,930,538</td> <td>424,893,684</td> <td>424,824,851</td> <td>424,784,418</td> <td>424,738,538</td> </tr>
  <tr> <td>12/31/2005</td> <td>471,370,885</td> <td>466,106,849</td> <td>464,434,610</td> <td>463,396,915</td> <td>463,268,706</td> <td>463,175,541</td> <td>463,165,720</td> <td>463,139,866</td> <td>463,075,855</td> <td>463,014,244</td> </tr>
  <tr> <td>12/31/2006</td> <td>463,200,919</td> <td>457,725,282</td> <td>455,822,189</td> <td>454,841,890</td> <td>455,017,266</td> <td>455,000,340</td> <td>454,915,676</td> <td>454,822,382</td> <td>454,797,996</td> <td></td> </tr>
  <tr> <td>12/31/2007</td> <td>515,029,169</td> <td>510,374,742</td> <td>508,154,461</td> <td>507,592,525</td> <td>507,251,378</td> <td>507,252,665</td> <td>507,124,706</td> <td>507,069,577</td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2008</td> <td>547,084,231</td> <td>543,696,826</td> <td>542,151,638</td> <td>541,255,839</td> <td>540,913,464</td> <td>540,904,143</td> <td>540,713,622</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2009</td> <td>459,114,867</td> <td>455,232,703</td> <td>454,478,144</td> <td>454,047,620</td> <td>454,108,281</td> <td>453,794,733</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2010</td> <td>511,853,602</td> <td>507,399,547</td> <td>506,256,705</td> <td>506,014,933</td> <td>506,071,619</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2011</td> <td>571,554,254</td> <td>566,987,304</td> <td>565,194,620</td> <td>564,927,450</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2012</td> <td>603,862,305</td> <td>602,282,512</td> <td>600,316,599</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2013</td> <td>591,546,839</td> <td>588,047,899</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>12/31/2014</td> <td>656,279,959</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `waiox`

![[zoo-waiox.png]]

The same shape, filled differently: the un-earned future half is printed with explicit `0`s rather
than left blank. A zero is a claim; a blank is an absence — here every `0` is kept.

<details>
<summary>Expected Markdown · table 1 of 2, excerpt</summary>

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

## Why a span is wrong here, when it is free elsewhere

[[Blank and Spacer Rows]] leaves the encoding of an unruled empty region free: leading empty cells
and one blank spanning block render identically, and neither is preferred.

**A triangle is the carve-out.** Every empty cell sits at a real coordinate — an accident year
crossed with a development period — and *"12 months has not elapsed for the 2023 year"* is a
separate fact from the same statement about 24 months. Collapsed into one span, those coordinates
stop being addressable: a consumer can no longer ask what the 2023 row holds at 24 months, because
the cell it would look in no longer exists.

Elsewhere the empty region is one undifferentiated blank. Here it is a set of individually
meaningful absences that happen to be adjacent.

This is the same principle that settles blank space beside a header in
[[Barely-Existing Columns and Headers]]: **a span is a claim that the page merged something.** The
page did not merge these.

## Why the blank matters more here than elsewhere

In most tables, blank versus an explicit empty marker is cosmetic. In a loss triangle the blank
carries actuarial meaning: it asserts *this development period does not exist yet*, which is a fact
about the world, not a gap in the transcription. That is the same argument that makes the em-dash a
value in [[Marks and Symbols in Cells]] and the coloured fill a value in [[Color as the Value]] — a
non-value that is a value.

<!-- skill:generate
- In a triangle or jagged matrix (loss development, claims by paid and incurred month), give every row the full column count.
- Fill each position the page leaves blank with its own empty cell <td></td>; never cover the empty region with colspan or rowspan.
- Never write 0, n/a or a repeated value into a blank position; but where the page prints 0s in the future half, keep every 0.
-->

<!-- skill:check
- FAIL (MUST) if a row of a triangle or matrix table has fewer cells than the table's column count.
- FAIL (MUST) if a colspan or rowspan covers a region the page leaves blank in a triangle.
- FAIL (MUST) if a cell printed blank contains 0, n/a or any value, or a printed 0 is rendered as an empty cell.
-->

## Related

- [[Marks and Symbols in Cells]] — the em-dash and the blank as values
- [[Blank and Spacer Rows]] — where the encoding of an empty region is free
- [[Header Body Column Count Mismatch]] — padding short rows to the column count
