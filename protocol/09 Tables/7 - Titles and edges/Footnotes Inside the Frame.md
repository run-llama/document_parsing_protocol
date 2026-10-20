---
title: Footnotes Inside the Frame
rule_id: tables-footnotes-inside-the-frame
status: rule
scope: page
tags: [tables, captions, boundaries]
---

# Footnote Lines Inside the Frame

> [!success] ✅ Normative
> A table footnote MUST be rendered outside the table, as footnote text placed after it — even when
> the page prints it inside the table's ruled border. It MUST NOT be rendered as a row of the table.
> It retains the Footnote class and MUST NOT be wrapped in `<caption>`. This is a deliberate
> exception to the frame test.

A footnote line printed within the table's own ruled border:

```text
| Rate A     | 1.10¹   |
| Rate B     | 1.25    |
| ¹ Excludes riders    |   ← printed INSIDE the ruled frame
```

## Why the frame test does not decide footnotes

The frame test — ink inside the border is a row, ink outside it is a caption — decides titles and
banners in [[Titles Banners Captions]] and totals blocks in [[Bottom Edge Totals and Islands]]. It
is worth having because it is mechanical.

A footnote is where it gives the wrong answer. **The line names no columns and carries no values**,
so rendering it as a row asserts something false about the table: a consumer counting records gets
one too many, and the row's single cell has no relationship to any column above it. Where the
typesetter drew the border is a layout accident — the footnote is commentary on the table either
way.

The carve-out costs the frame test its single-signal property, and that price is paid
deliberately: **the frame decides titles and banners; it does not decide footnotes.**

### ✅ **Sample** — `wwa`

![[zoo-wwa.png]]

`(Justify Selection and Trend Period in Filing Memorandum)` is printed **inside** the table's
grid, under the last data row — the case where the frame test and instinct disagree. It is set in
italics, and it follows the table as footnote text.

<details>
<summary>Expected Markdown · excerpt, table 1 of 4 and its footnote</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="4">Quarterly Data</th> <th colspan="4">Rolling 4-Quarter Data</th> </tr>
  <tr> <th>Calendar YYYYQ</th> <th>Earned Exposures</th> <th>Earned Premium</th> <th>On-Level Earned Premium</th> <th>On-Level Earned Premium per Exposure</th> <th>Earned Exposures</th> <th>Earned Premium</th> <th>On-Level Earned Premium</th> <th>On-Level Earned Premium per Exposure</th> </tr>
  <tr> <td>20181</td> <td>7,922</td> <td>7,176,347</td> <td>12,371,356</td> <td>1,562</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>20182</td> <td>8,182</td> <td>7,482,355</td> <td>12,699,979</td> <td>1,552</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>20183</td> <td>8,457</td> <td>7,873,442</td> <td>13,047,208</td> <td>1,543</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>20184</td> <td>8,533</td> <td>5,931,377</td> <td>9,267,627</td> <td>1,086</td> <td>33,095</td> <td>28,463,522</td> <td>47,386,171</td> <td>1,432</td> </tr>
  <tr> <td>20191</td> <td>8,455</td> <td>7,542,332</td> <td>11,782,122</td> <td>1,393</td> <td>33,627</td> <td>28,829,507</td> <td>46,796,936</td> <td>1,392</td> </tr>
  <tr> <td>20192</td> <td>8,731</td> <td>8,310,237</td> <td>12,647,017</td> <td>1,448</td> <td>34,176</td> <td>29,657,389</td> <td>46,743,974</td> <td>1,368</td> </tr>
  <!-- … -->
  <tr> <td>20243</td> <td>6,762</td> <td>10,399,111</td> <td>11,171,105</td> <td>1,652</td> <td>26,922</td> <td>40,293,219</td> <td>44,436,437</td> <td>1,651</td> </tr>
</table>

*(Justify Selection and Trend Period in Filing Memorandum)*
```

</details>

## Rendering the footnote

- **Wherever the border falls, the footnote MUST be footnote text placed immediately after the
  table.** It MUST be transcribed verbatim, including its leading marker, and MUST stay attached to
  the table it annotates rather than drifting into the surrounding prose.
- A line opening `¹`, `*`, `(a)` or `Note:` that refers to a marker printed in a cell above it is a
  footnote, not a row.
- Superscript markers **inside** cells MUST stay attached to their values — see
  [[Marks and Symbols in Cells]]. The footnote body leaving the table does not take the reference
  with it, so `1.10¹` in the cell and `¹ Excludes riders` after the table still point at each other.
- **The text MUST survive either way.** Only its placement is decided here; dropping it is never
  conforming.

### ✅ **Sample** — two footnotes inside a shaded frame

![[bag-bank-trading-table.png]]

Footnotes `1` and `2` sit inside the grey-bordered panel that frames the trading table, under the
`Total` row, in a smaller face. Both follow the table as footnote text; the superscript markers stay
in the header cells and the `Other trading` label. Only the year band and the `Total` row are
printed bold; the hyphenated header wraps (`per-` / `form-` / `ance`) are joined.

<details>
<summary>Expected Markdown · table and its footnotes</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3"><strong>2025</strong></th> <th colspan="3"><strong>2024</strong></th> </tr>
  <tr> <th>in € m.</th> <th>Trading revenues reported</th> <th>Net trading related interest<sup>1</sup></th> <th>Trading performance</th> <th>Trading revenues reported</th> <th>Net trading related interest<sup>1</sup></th> <th>Trading performance</th> </tr>
  <tr> <td data-level="0">Interest and credit trading</td> <td>1,412</td> <td>1,486</td> <td>2,898</td> <td>1,977</td> <td>1,240</td> <td>3,217</td> </tr>
  <tr> <td data-level="0">Equity trading</td> <td>58</td> <td>392</td> <td>450</td> <td>1,486</td> <td>402</td> <td>1,888</td> </tr>
  <tr> <td data-level="0">Foreign exchange, metal, commodity trading</td> <td>1,180</td> <td>4</td> <td>1,184</td> <td>1,301</td> <td>(5)</td> <td>1,296</td> </tr>
  <tr> <td data-level="0">Other trading<sup>2</sup></td> <td>1,290</td> <td>(214)</td> <td>1,076</td> <td>720</td> <td>(392)</td> <td>328</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>3,940</strong></td> <td><strong>1,668</strong></td> <td><strong>5,608</strong></td> <td><strong>5,484</strong></td> <td><strong>1,245</strong></td> <td><strong>6,729</strong></td> </tr>
</table>

<sup>1</sup> Includes interest income from trading assets and interest expense from trading liabilities, as well as allocations of interest expense and income representing the funding cost or benefit associated with trading positions. These amounts are included in net interest revenues in the Consolidated Statement of Income. Also adjusts net interest revenues on derivatives entered into for nontrading purposes, but failing to qualify for hedge accounting treatment.

<sup>2</sup> Includes gains and losses from derivatives not qualifying for hedge accounting treatment.
```

</details>

<!-- skill:generate
- A footnote line under a table (starting with a marker such as ¹, *, (a) or "Note:") is never a table row, even when it is printed inside the table's border: close the </table> and write the footnote as a paragraph right after it.
- Transcribe the footnote verbatim, keeping its leading marker (a raised marker as <sup>1</sup>) and its printed styling.
- Keep the footnote reference markers inside the cells where they are printed, e.g. <td>Other trading<sup>2</sup></td>.
-->

<!-- skill:check
- FAIL (MUST) if a footnote line printed under or inside a table's frame is rendered as a <tr> of the table.
- FAIL (MUST) if a table footnote visible on the page is missing from the Markdown, or is placed away from its table (not directly after it).
- FAIL (MUST) if a footnote reference marker printed in a cell is dropped from that cell.
-->

## Related

- [[Titles Banners Captions]] — the frame test that decides titles and banners, and does not decide footnotes
- [[Bottom Edge Totals and Islands]] — the frame test applied to totals and islands at the same edge
- [[Marks and Symbols in Cells]] — the in-cell marker that points at the footnote
