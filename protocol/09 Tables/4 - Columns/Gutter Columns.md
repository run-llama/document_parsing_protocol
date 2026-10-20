---
title: Gutter Columns
rule_id: tables-gutter-columns
status: rule
scope: page
tags: [tables, columns, currency]
---

# Currency / Unit / Separator Gutter Columns

> [!success] ✅ Normative
> A currency glyph or a separator typeset in a column track of its own SHOULD be rendered in the
> same cell as the value it belongs to — `$ 277.09`, `$1,200 — $1,800`. A marker numeral such as
> `(i)` or `(ii)` SHOULD be rendered in a column of its own.

Financial PDFs frequently typeset `$` in its own column track, and print ranges as `value — value`
with the dash in a track of its own. Those tracks are real in the typesetting, but they are layout,
not data.

```text
Printed tracks:  $ | 1,200 | — | $ | 1,800
Rendered as:     $1,200 — $1,800   (one cell)
```

## Currency and separators: merged into the value

- A currency glyph printed in its own track SHOULD be rendered in the cell of the number it
  belongs to. The glyph MUST NOT be dropped: where the page prints `$` only on some rows, only
  those rows' values carry it.
- A separator between the two ends of a range (a dash, `+/-`, `to`) SHOULD be rendered in one cell
  with both ends.
- A `$` kept in a cell of its own beside its value, as a pair of cells, also conforms; the single
  cell is the preferred form.

### ✅ **Sample** — `warn`

![[zoo-warn.png]]

`$` typeset in its own column track, separate from the digits, throughout the balance sheet. It is
printed only on the first row of each block and on the grand total, so only those values carry it.
The stub header is italic. The row labels are printed flush left, without indentation, so every
label is level 0.

<details>
<summary>Expected Markdown · excerpt, first block</summary>

```markdown
<table>
  <tr> <th><em>Unaudited; in millions, except par value</em></th> <th>September 30, 2024</th> <th>December 31, 2023</th> </tr>
  <tr> <th colspan="3">ASSETS</th> </tr>
  <tr> <td colspan="3" data-level="0">Current assets:</td> </tr>
  <tr> <td data-level="0">Cash and cash equivalents</td> <td>$2,414</td> <td>$2,850</td> </tr>
  <tr> <td data-level="0">Receivables, net</td> <td>4,120</td> <td>4,510</td> </tr>
  <tr> <td data-level="0">Prepaid expenses and other current assets</td> <td>2,905</td> <td>3,102</td> </tr>
  <tr> <th data-level="0"><strong>Total current assets</strong></th> <td><strong>9,439</strong></td> <td><strong>10,462</strong></td> </tr>
  <tr> <td data-level="0">Film and television content rights and games</td> <td>15,220</td> <td>16,340</td> </tr>
  <tr> <td data-level="0">Property and equipment, net</td> <td>4,890</td> <td>4,715</td> </tr>
  <tr> <td data-level="0">Goodwill</td> <td>19,640</td> <td>24,905</td> </tr>
  <tr> <td data-level="0">Intangible assets, net</td> <td>24,110</td> <td>27,830</td> </tr>
  <tr> <td data-level="0">Other noncurrent assets</td> <td>5,715</td> <td>5,940</td> </tr>
  <tr> <th data-level="0"><strong>Total assets</strong></th> <td><strong>$79,014</strong></td> <td><strong>$90,192</strong></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `earn`

![[zoo-earn.png]]

The same `$`-gutter pattern in Halyard Genomics' cash-flow statement.

<details>
<summary>Expected Markdown · excerpt, table 1 of 2</summary>

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
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `earnin`

![[zoo-earnin.png]]

And again in Sablecrest Dynamics' statement of operations — this typesetting is the norm, not an
oddity. *Gross profit*, *Gross margin* and *Operating income (loss)* are indented one step.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3">Three Months Ended</th> <th colspan="2">Nine Months Ended</th> </tr>
  <tr> <th> </th> <th>September 27, 2025</th> <th>June 28, 2025</th> <th>September 28, 2024</th> <th>September 27, 2025</th> <th>September 28, 2024</th> </tr>
  <tr> <td data-level="0">Net revenue</td> <td>$9,246</td> <td>$7,685</td> <td>$6,819</td> <td>$24,369</td> <td>$18,127</td> </tr>
  <tr> <td data-level="0">Cost of sales</td> <td>4,206</td> <td>4,366</td> <td>3,167</td> <td>12,023</td> <td>8,590</td> </tr>
  <tr> <td data-level="0">Amortization of acquisition-related intangibles</td> <td>260</td> <td>260</td> <td>233</td> <td>771</td> <td>694</td> </tr>
  <tr> <th data-level="0">Total cost of sales</th> <td>4,466</td> <td>4,626</td> <td>3,400</td> <td>12,794</td> <td>9,284</td> </tr>
  <tr> <td data-level="1">Gross profit</td> <td>4,780</td> <td>3,059</td> <td>3,419</td> <td>11,575</td> <td>8,843</td> </tr>
  <tr> <td data-level="1">Gross margin</td> <td>52%</td> <td>40%</td> <td>50%</td> <td>47%</td> <td>49%</td> </tr>
  <!-- … -->
  <tr> <th data-level="0"><strong>Net income</strong></th> <td><strong>$1,243</strong></td> <td><strong>$872</strong></td> <td><strong>$771</strong></td> <td><strong>$2,824</strong></td> <td><strong>$1,159</strong></td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `some`

![[zoo-some.png]]

The `$` sits in its own boxed column track in the image, which looks like a column of its own. It is
not: the glyph belongs to the value, so the first value cell reads `$274`. The *Second Quarter* and
*January - June* spanners printed above the header are part of the table.

<details>
<summary>Expected Markdown · table 1 of 5</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3">Second Quarter</th> <th colspan="3">January - June</th> </tr>
  <tr> <th>Main Indicators</th> <th>2Q06</th> <th>2Q05</th> <th>Change</th> <th>2006</th> <th>2005</th> <th>Change</th> </tr>
  <tr> <th>Million US dollars</th> <th>(1)</th> <th>(2)</th> <th>(1)/(2)</th> <th>(3)</th> <th>(4)</th> <th>(3)/(4)</th> </tr>
  <tr> <td>Net Revenue</td> <td>$274</td> <td>207</td> <td>32.3%</td> <td>515</td> <td>409</td> <td>26.07%</td> </tr>
  <tr> <td>EBITDA</td> <td>$53</td> <td>49</td> <td>7.7%</td> <td>105</td> <td>111</td> <td>19.05%</td> </tr>
</table>
```

</details>

## Marker gutters: kept as a column

```text
| (i)  | Base salary … |     ← one column for the numeral, one for the text
| (ii) | Bonus …       |
```

A marker numeral such as `(i)` / `(ii)` SHOULD be rendered in a column of its own. A merged
`(i) Base salary …` cell also conforms, but the separate numeral column is the preferred form.

## Why the two resolve opposite ways

A currency symbol is *part of the value*. A marker numeral is a *reference label*: it is cited
elsewhere on the page ("see (ii)"), so it has an identity of its own and earns a column.

A gutter this rule does not name is decided by the column-count test: a track gets its own column
only if a competent person modelling this data in a spreadsheet would give it one. That is the same
appeal to how a person would model the content that decides [[Is This Even a Table]] — judge by the
data, not by what is inked.

### ✅ **Sample** — an operator in its own track

![[bag-outlook-plus-minus.png]]

The `Outlook` table prints `$5.70 Billion | +/- | $300 Million` as three ruled cells, and
`1.26 Billion` spanning all three on the last row. The `+/-` track is the range dash of this
rule in another costume: one value, one cell. Merged, the GAAP and Non-GAAP ranges each become one
column and the reconciling amount sits between them; the row labels are bold.

<details>
<summary>Expected Markdown · table</summary>

```markdown
<table>
  <tr> <th> </th> <th>U.S. GAAP</th> <th>Reconciling Items</th> <th>Non-GAAP</th> </tr>
  <tr> <td><strong>Revenue</strong></td> <td>$5.70 Billion +/- $300 Million</td> <td>—</td> <td>$5.70 Billion +/- $300 Million</td> </tr>
  <tr> <td><strong>Gross margin as a percentage of revenue</strong></td> <td>48.0% +/- 1%</td> <td>$ 2.4 Million</td> <td>48.0% +/- 1%</td> </tr>
  <tr> <td><strong>Operating income as a percentage of revenue</strong></td> <td>33.0% +/- 1%</td> <td>$ 2.8 Million</td> <td>33.6% +/- 1%</td> </tr>
  <tr> <td><strong>Net income per diluted share</strong></td> <td>$1.30 +/- $0.10</td> <td>$ 3.2 Million</td> <td>$1.30 +/- $0.10</td> </tr>
  <tr> <td><strong>Diluted share count</strong></td> <td>1.26 Billion</td> <td>—</td> <td>1.26 Billion</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a line-number column in the middle

![[bag-bank-line-number-column.png]]

`LINE #` runs `1` to `22` in a column between the labels and the first year, not at the left
edge. A marker gutter keeps its column wherever the page puts it. The column headers are italic
except *FOR THE PERIOD ENDED*; the empty spacer track between 2023 and 2024 prints nothing and is not
a column.

<details>
<summary>Expected Markdown · excerpt, first two sections</summary>

```markdown
<table>
  <tr> <th> </th> <th><em>LINE #</em></th> <th colspan="3"><em>2023</em></th> <th colspan="4"><em>2024</em></th> <th><em>Q2 % change vs Q2 23</em></th> <th colspan="2"><em>Year To Date</em></th> </tr>
  <tr> <th>FOR THE PERIOD ENDED</th> <th> </th> <th><em>Q2</em></th> <th><em>Q3</em></th> <th><em>Q4</em></th> <th><em>Q1</em></th> <th><em>Q2</em></th> <th><em>Q3</em></th> <th><em>Q4</em></th> <th> </th> <th><em>2023</em></th> <th><em>2024</em></th> </tr>
  <tr> <th colspan="12">Results of operations ($ millions)</th> </tr>
  <tr> <td>Net income – operating cash basis</td> <td>1</td> <td>412</td> <td>398</td> <td>405</td> <td>440</td> <td>318</td> <td>–</td> <td>–</td> <td>(27)%</td> <td>852</td> <td>758</td> </tr>
  <tr> <td>Net interest income (TEB)</td> <td>2</td> <td>781</td> <td>769</td> <td>812</td> <td>824</td> <td>899</td> <td>–</td> <td>–</td> <td>15</td> <td>1,550</td> <td>1,723</td> </tr>
  <tr> <td>Total revenue (TEB) excluding special gains</td> <td>3</td> <td>2,214</td> <td>2,180</td> <td>2,266</td> <td>2,301</td> <td>2,412</td> <td>–</td> <td>–</td> <td>(2)</td> <td>4,394</td> <td>4,713</td> </tr>
  <tr> <th colspan="12">Per common share</th> </tr>
  <tr> <td>Basic net income – operating cash basis</td> <td>4</td> <td>$ .68</td> <td>.65</td> <td>.66</td> <td>$ .71</td> <td>.51</td> <td>–</td> <td>–</td> <td>(25)%</td> <td>$ 1.33</td> <td>1.22</td> </tr>
  <tr> <td>Diluted net income – operating cash basis</td> <td>5</td> <td>.67</td> <td>.64</td> <td>.65</td> <td>.70</td> <td>.50</td> <td>–</td> <td>–</td> <td>(26)%</td> <td>1.31</td> <td>1.20</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `v.` in its own track

![[bag-court-list-v-column.png]]

A court daily list: time, case number and party, `v.`, the other party, hearing type. The `v.`
column carries the same token on every row that has two parties and nothing on the rows that do
not — a separator track, like the range dash, so it joins the two parties in one cell. Rows with a
single *In the matter of…* line then take the same shape.

<details>
<summary>Expected Markdown · excerpt, first three rows</summary>

```markdown
<table>
  <tr> <td>10:30</td> <td>S HCI 2025 07641<br/>Tobias Renwick Hale v. Marisa Quellan &amp; Ors.</td> <td>Post Mediation Directions Hearing</td> </tr>
  <tr> <td>10:30</td> <td>S HCI 2026 00638<br/>Oswin Barrow Tallis v. Denholt Legal Pty Ltd trading as Denholt Partners &amp; Ors.</td> <td>Directions Hearing</td> </tr>
  <tr> <td>10:30</td> <td>S HCI 2026 00914<br/>Brightvane Pty Ltd (ACN 900 437 375) v. Gideon Farrow &amp; Ors.</td> <td>Post Mediation Directions Hearing</td> </tr>
  <!-- … -->
</table>
```

</details>

<!-- skill:generate
- When a currency sign ($, €) is typeset in its own narrow column beside a number, put it in the number's cell: <td>$2,414</td>, not <td>$</td><td>2,414</td>. Only values printed with the sign get it.
- When a range or tolerance is split across tracks (value | — | value, value | +/- | value), render it as one cell: <td>48.0% +/- 1%</td>.
- Give marker numerals such as (i), (ii) or a LINE # column their own column, wherever the column sits.
- For any other narrow track, give it its own column only if a person modelling the data in a spreadsheet would.
-->

<!-- skill:check
- FAIL (MUST) if a currency sign or range separator printed on the page is missing from the Markdown.
- WARN (SHOULD) if a currency sign typeset in its own track is rendered as a separate cell instead of joining its value.
- WARN (SHOULD) if the two ends of a printed range and their separator are split across cells.
- WARN (SHOULD) if a column of marker numerals such as (i), (ii) is merged into the adjacent text cells.
-->

## Related

- [[Accounting Number Formats]] — how the value itself (parentheses, dashes) is transcribed
- [[Barely-Existing Columns and Headers]] — a narrow track that is a real column
- [[Units Row]] — units printed in a row rather than beside each value
