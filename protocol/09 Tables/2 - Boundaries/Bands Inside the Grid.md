---
title: Bands Inside the Grid
rule_id: tables-bands-inside-the-grid
status: rule
scope: page
tags: [tables, boundaries, headers]
---

# Bands Inside the Grid: dates, cohorts, shading

> [!success] ✅ Normative
> A full-width band inside a grid — a date line, a section line, a change of shading — MUST NOT end
> the table. The rows above and below it MUST stay in one table, and the band MUST be rendered as
> one row whose single cell spans every column.

The signal is the column headers. If the headers are **not** re-declared under the band, the table
never closed: the band is an internal divider, not a boundary.

```text
| Product   | Premium | Losses |
| As of December 2024 (bold band, headers NOT repeated) |
| Term Life | 1,204   | 887    |
| As of December 2023                                   |
| Term Life | 1,150   | 902    |

→ one table, with the two "As of…" lines as full-width band rows
```

## Date and section bands

A bold "As of December 2024" line inside a grid whose column headers are not repeated is a **band
row spanning all columns**, not a boundary. The rows above and below it MUST stay in the same
table.

Splitting here is the most expensive boundary error. On a dense financial page, splitting per year
turns two tables into four and throws away most of the page's value — every resulting fragment is
wrong even though every cell in it is right.

The band's single cell MAY be a header cell (`<th colspan=N>`) or a body cell (`<td colspan=N>`);
both conform, and a document MUST use one form throughout — see
[[Choices Made Once Per Document]]. An in-frame **title** band is a spanning header cell (see
[[Titles Banners Captions]]), so the header cell is the default where nothing else decides.

### ✅ **Sample** — `warn`

![[zoo-warn.png]]

`ASSETS` and `LIABILITIES AND EQUITY` as full-width band rows inside one balance sheet, headers not
repeated after either. The stub header is italic, the labels under *Current assets:* and *Current
liabilities:* are indented one step, and the bold rows are totals.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th><em>Unaudited; in millions, except par value</em></th> <th>September 30, 2024</th> <th>December 31, 2023</th> </tr>
  <tr> <th colspan="3">ASSETS</th> </tr>
  <tr> <td colspan="3" data-level="0">Current assets:</td> </tr>
  <tr> <td data-level="1">Cash and cash equivalents</td> <td>$2,414</td> <td>$2,850</td> </tr>
  <tr> <td data-level="1">Receivables, net</td> <td>4,120</td> <td>4,510</td> </tr>
  <tr> <td data-level="1">Prepaid expenses and other current assets</td> <td>2,905</td> <td>3,102</td> </tr>
  <tr> <th data-level="0"><strong>Total current assets</strong></th> <td><strong>9,439</strong></td> <td><strong>10,462</strong></td> </tr>
  <tr> <td data-level="0">Film and television content rights and games</td> <td>15,220</td> <td>16,340</td> </tr>
  <tr> <td data-level="0">Property and equipment, net</td> <td>4,890</td> <td>4,715</td> </tr>
  <tr> <td data-level="0">Goodwill</td> <td>19,640</td> <td>24,905</td> </tr>
  <tr> <td data-level="0">Intangible assets, net</td> <td>24,110</td> <td>27,830</td> </tr>
  <tr> <td data-level="0">Other noncurrent assets</td> <td>5,715</td> <td>5,940</td> </tr>
  <tr> <th data-level="0"><strong>Total assets</strong></th> <td><strong>$79,014</strong></td> <td><strong>$90,192</strong></td> </tr>
  <tr> <th colspan="3">LIABILITIES AND EQUITY</th> </tr>
  <tr> <td colspan="3" data-level="0">Current liabilities:</td> </tr>
  <tr> <td data-level="1">Accounts payable</td> <td>$890</td> <td>$985</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `earn`

![[zoo-earn.png]]

`Calculation of free cash flow:` — a shaded band row that introduces a derived block mid-table,
with the column headers not repeated under it.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="2">Three Months Ended</th> <th colspan="2">Nine Months Ended</th> </tr>
  <tr> <th> </th> <th>September 29, 2024</th> <th>October 1, 2023</th> <th>September 29, 2024</th> <th>October 1, 2023</th> </tr>
  <tr> <td>Net cash provided by operating activities</td> <td>$316</td> <td>$139</td> <td>$473</td> <td>$254</td> </tr>
  <tr> <td>Net cash used in investing activities</td> <td>(42)</td> <td>(54)</td> <td>(130)</td> <td>(146)</td> </tr>
  <tr> <td>Net cash used in financing activities</td> <td>(332)</td> <td>(707)</td> <td>(523)</td> <td>(1,183)</td> </tr>
  <tr> <td>Effect of exchange rate changes on cash and cash equivalents</td> <td>7</td> <td>(4)</td> <td>1</td> <td>(9)</td> </tr>
  <tr> <td>Net decrease in cash and cash equivalents</td> <td>(51)</td> <td>(626)</td> <td>(179)</td> <td>(1,084)</td> </tr>
  <tr> <td>Cash and cash equivalents, beginning of period</td> <td>920</td> <td>1,553</td> <td>1,048</td> <td>2,011</td> </tr>
  <tr> <td>Cash and cash equivalents, end of period</td> <td>$869</td> <td>$927</td> <td>$869</td> <td>$927</td> </tr>
  <tr> <th colspan="5">Calculation of free cash flow:</th> </tr>
  <tr> <td>Net cash provided by operating activities</td> <td>$316</td> <td>$139</td> <td>$473</td> <td>$254</td> </tr>
  <tr> <td>Purchases of property and equipment</td> <td>(32)</td> <td>(45)</td> <td>(99)</td> <td>(144)</td> </tr>
  <tr> <th data-level="0"><strong>Free cash flow (a)</strong></th> <td><strong>$284</strong></td> <td><strong>$94</strong></td> <td><strong>$374</strong></td> <td><strong>$110</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `dtu`

![[zoo-dtu.png]]

Three full-width bands (*Pay TV digital subscribers*, *Free-to-view digital households*,
*Additional homes receiving analogue multi-channel services*) with no repeated column headers. The
asterisks are printed on the baseline, attached to the words, and point at the notes below.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th>Q1, 2005</th> <th>Q2, 2005</th> <th>Quarterly growth rate</th> </tr>
  <tr> <th colspan="4">Pay TV digital subscribers</th> </tr>
  <tr> <td>Digital cable</td> <td>2,544,048</td> <td>2,601,354</td> <td>2.3%</td> </tr>
  <tr> <td>Digital satellite (Orbita)</td> <td>7,349,000</td> <td>7,424,000</td> <td>1.0%</td> </tr>
  <tr> <td>TV over ADSL</td> <td>20,000\*</td> <td>20,000\*</td> <td> </td> </tr>
  <tr> <th data-level="0"><strong>Total digital pay TV households\*\*</strong></th> <td><strong>9,913,048</strong></td> <td><strong>10,045,354</strong></td> <td><strong>1.3%</strong></td> </tr>
  <tr> <th colspan="4">Free-to-view digital households</th> </tr>
  <tr> <td>Free-to-view DTT (ClearView) homes</td> <td>5,059,350</td> <td>5,177,824</td> <td>2.3%</td> </tr>
  <tr> <td>Free-to-view digital satellite\*\*\*</td> <td>445,000</td> <td>492,000</td> <td>10.6%</td> </tr>
  <tr> <th data-level="0"><strong>Total Free-to-view homes</strong></th> <td><strong>5,504,350</strong></td> <td><strong>5,669,824</strong></td> <td><strong>3.0%</strong></td> </tr>
  <tr> <th data-level="0"><strong>Total UK digital households</strong></th> <td><strong>15,417,398</strong></td> <td><strong>15,715,178</strong></td> <td><strong>1.9%</strong></td> </tr>
  <tr> <td><strong>Digital penetration</strong></td> <td><strong>61.9%</strong></td> <td><strong>63.0%</strong></td> <td><strong>1.1%~</strong></td> </tr>
  <tr> <th colspan="4">Additional homes receiving analogue multi-channel services</th> </tr>
  <tr> <td>Analogue cable</td> <td>744,214</td> <td>700,260</td> <td>-5.9%</td> </tr>
  <tr> <td><strong>Multi-channel penetration</strong></td> <td><strong>64.9%</strong></td> <td><strong>65.8%</strong></td> <td><strong>0.9%~</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `P200509160137_0137_6519`

![[zoo-P200509160137_0137_6519.png]]

Bilingual band rows — *服務行業 Service Industry*, *服務界別 Service Domain* — inside a
business-receipts index. The stacked header lines are wrapped labels, joined without a space inside
the Chinese phrase and with one between the Chinese and English parts.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>2005年Q2指數 Index for Q2 2005</th> <th colspan="2">2005年Q2與2005年Q1比較 Q2 2005 compared with Q1 2005</th> <th colspan="2">2005年Q2與2004年Q2比較 Q2 2005 compared with Q2 2004</th> <th colspan="2">2005年Q1至Q2與2004年Q1至Q2比較 Q1-Q2 2005 compared with Q1-Q2 2004</th> </tr>
  <tr> <th> </th> <th>（點） (Points)</th> <th>（點） (Points)</th> <th>（百分率） (%)</th> <th>（點） (Points)</th> <th>（百分率） (%)</th> <th>（點） (Points)</th> <th>（百分率） (%)</th> </tr>
  <tr> <th colspan="8">服務行業 Service Industry</th> </tr>
  <tr> <td><strong>批發/零售 Wholesale/Retail</strong></td> <td>102.3</td> <td>-1.1</td> <td>-1.1</td> <td>+7.2</td> <td>+7.6</td> <td>+7.2</td> <td>+7.5</td> </tr>
  <tr> <td><em>細分 breakdown</em>：批發 Wholesale</td> <td>81.7</td> <td>+1.3</td> <td>+1.6</td> <td>+6.6</td> <td>+8.8</td> <td>+4.8</td> <td>+6.3</td> </tr>
  <tr> <td>零售 Retail</td> <td>109.7 \*</td> <td>-2.0</td> <td>-1.8</td> <td>+7.4</td> <td>+7.3</td> <td>+8.1</td> <td>+7.9</td> </tr>
  <tr> <td><strong>進口與出口貿易 Import and export trades</strong></td> <td>108.5</td> <td>+11.0</td> <td>+11.3</td> <td>+10.1</td> <td>+10.3</td> <td>+10.9</td> <td>+11.8</td> </tr>
  <tr> <td><strong>飲食 Restaurants</strong></td> <td>92.5</td> <td>-3.0</td> <td>-3.1</td> <td>+4.0</td> <td>+4.5</td> <td>+4.7</td> <td>+5.3</td> </tr>
  <tr> <td><strong>酒店 Hotels</strong></td> <td>113.6</td> <td>-0.9</td> <td>-0.8</td> <td>+20.8</td> <td>+22.4</td> <td>+21.0</td> <td>+22.6</td> </tr>
  <!-- … -->
  <tr> <td><strong>電影 Film entertainment</strong></td> <td>116.4</td> <td>-2.7</td> <td>-2.2</td> <td>+6.1</td> <td>+5.6</td> <td>+8.0</td> <td>+7.3</td> </tr>
  <tr> <th colspan="8">服務界別 Service Domain</th> </tr>
  <tr> <td><strong>旅遊、會議及展覽服務 Tourism, convention and exhibition services</strong></td> <td>132.1</td> <td>-4.0</td> <td>-3.0</td> <td>+14.1</td> <td>+11.9</td> <td>+16.4</td> <td>+13.9</td> </tr>
  <tr> <td><strong>電腦及有關服務 Computer and information services</strong></td> <td>145.4</td> <td>+22.5</td> <td>+18.3</td> <td>+31.1</td> <td>+27.2</td> <td>+23.3</td> <td>+21.0</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `vap`

![[zoo-vap.png]]

`Precision`, in bold italic, heads *Repeatability* and *Interm. Precision*. **Ambiguous by
design:** it reads both as a full-width band and as a parent row label — the band-versus-hierarchy
boundary in one cell. It spans the full width, so it is a band.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Type of analytical procedure</th> <th rowspan="2">IDENTIFICATION</th> <th colspan="2">TESTING FOR IMPURITIES</th> <th rowspan="2">ASSAY<br/>- dissolution (measurement only)<br/>- content/potency</th> </tr>
  <tr> <th>characteristics</th> <th>quantitat.</th> <th>limit</th> </tr>
  <tr> <td>Accuracy</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
  <tr> <th colspan="5"><em>Precision</em></th> </tr>
  <tr> <td>Repeatability</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
  <tr> <td>Interm.Precision</td> <td>-</td> <td>+ <sup>(1)</sup></td> <td>-</td> <td>+ <sup>(1)</sup></td> </tr>
  <tr> <td>Specificity <sup>(2)</sup></td> <td>+</td> <td>+</td> <td>+</td> <td>+</td> </tr>
  <tr> <td>Detection Limit</td> <td>-</td> <td>- <sup>(3)</sup></td> <td>+</td> <td>-</td> </tr>
  <tr> <td>Quantitation Limit</td> <td>-</td> <td>-</td> <td>+ <sup>(3)</sup></td> <td>-</td> </tr>
  <tr> <td>Linearity</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
  <tr> <td>Range</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `2012_tushin_nittei`

![[zoo-2012_tushin_nittei.png]]

*清掃の時間* is centred and reads like a full-width band, but it sits inside the track column with
the other columns' rules running through its row. It is an ordinary entry in that one cell, not a
spanning band row. The letter-spaced headers are written as normal words.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>時刻</th> <th>トラック</th> <th>跳躍（高さ）</th> <th>跳躍（距離）</th> <th>投擲</th> </tr>
  <tr> <td>９：３０</td> <td>女共４×１００ｍ予５組１着＋３</td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>５０</td> <td>男共４×１００ｍ予６組０着＋８</td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>１０：２０</td> <td>男 ３０００ｍ 決２組タイムレース</td> <td> </td> <td> </td> <td>女砲丸投</td> </tr>
  <!-- … -->
  <tr> <td>５５</td> <td>女１年 １００ｍ 決</td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td>清掃の時間</td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>１５：３０</td> <td>女共４×１００ｍ 決</td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>３５</td> <td>男共４×１００ｍ 決</td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>５０</td> <td>閉会式</td> <td> </td> <td> </td> <td> </td> </tr>
</table>
```

</details>

## Shading, zebra striping, colour changes

Shading MUST NOT be treated as a table boundary.

```text
| A | 1.10 |   ← white rows
| B | 1.25 |
| C | 1.31 |   ← gray rows start here: still the same table
```

Shading is a readability aid applied by the typesetter. It makes no claim about what the rows mean,
so it cannot start a new table.

## What does justify a split

Only a **semantic** signal justifies a split:

- a new subject
- a new schema
- a key that stops continuing

Appearance alone MUST NOT split a table.

## Cohort bands with no column headers anywhere

```text
FEMALE                 ← band; no column headers anywhere
| 25 | 1.02 | 1.10 |
MALE
| 25 | 1.08 | 1.15 |
```

This one resolves the other way: **one table per cohort, with the band as that table's header
row.** The band is the only thing naming what the rows below it are. See
[[Group and Cohort Bands]].

## Group bands over one shared row spine

```text
|        | Loss of Income | Other         |  ← two boxed bands
| (1)    | (2)   | (3)    | (4)   | (5)   |  ← full-width numbered tier
| 2019   | 1,204 | 887    | 310   | 95    |  ← one shared row spine
```

**One table.** A full-width numbered tier running across the whole width shows that all those
columns describe one row — splitting there destroys the row identity that crosses the groups. See
[[Group and Cohort Bands]].

<!-- skill:generate
- A full-width line inside a table (a date, section or category line) whose column headers are not printed again below it does not end the table: render it as one row with a single cell spanning all columns, e.g. <tr> <th colspan="4">Pay TV digital subscribers</th> </tr>.
- Use the same cell type (th or td) for every such band in the document; default to th.
- Never split a table at shading, zebra striping or a colour change.
- A centred entry that sits inside one column, with the other columns' rules running through its row, is an ordinary cell, not a band.
-->

<!-- skill:check
- FAIL (MUST) if a table is split into two <table> elements at a full-width band row when the column headers are not printed again below the band.
- FAIL (MUST) if a full-width band is rendered as a partial row or with a colspan smaller than the table width.
- FAIL (MUST) if a table is split where the page only changes shading or row colour.
- WARN (SHOULD) if full-width bands are th in some tables and td in others within the same document.
-->

## Related

- [[Repeated Headers and Title Bands]] — a band with the headers printed again does open a new table
- [[Titles Banners Captions]] — in-frame title bands use the same spanning header cell
- [[Group and Cohort Bands]] — bands that head a table rather than divide one
- [[Row-Label Hierarchy]] — a parent label inside one column, the other reading of `Precision`
