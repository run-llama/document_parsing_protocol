---
title: Bottom Edge Totals and Islands
rule_id: tables-bottom-edge-totals-and-islands
status: rule
scope: page
tags: [tables, drops, boundaries]
---

# The Bottom Edge: totals, summary lines, islands

> [!success] ✅ Normative
> Content printed below or beside a table MUST NOT be dropped, even when it sits outside the ruled
> frame. Where it continues the table's ruled grid it MUST be rendered as rows of that table; where
> it stands apart as its own unbordered block it MUST be rendered as its own small key-value table.

The bottom edge is where content goes missing most often, because everything here sits past the
last rule of the frame — and it is usually the numbers the reader actually wanted.

```text
| Item   | Qty | Rate | Amount |
| Widget | 2   | 30   | 60     |
└──── ruled frame ends ────────┘
               Subtotal    60      ← outside the frame:
               Shipping    10        footer rows of the table? its own KV
               Total       70        table? dropped entirely?
```

## The frame decides

The block under the table is placed by one question: does it sit **inside** the ruled frame, or
visually continue the table's ruled column grid?

| Block under the table | Rendering |
| --- | --- |
| **Inside the frame**, or continuing its ruled column grid | footer rows of that table, each value in its printed column |
| **Standing apart** as a separate unbordered block — even if its columns loosely line up under the table's rightmost columns | its own key-value table: one row per printed line, a label cell and a value cell |

The block MUST NOT be omitted, and a block that is not part of the grid MUST NOT be padded into the
main table as extra footer rows. This is the frame test of [[Titles Banners Captions]], applied at
the other edge of the table. Footnotes are the one exception — see [[Footnotes Inside the Frame]].

### ✅ **Sample** — a totals block continuing the frame

![[bag-goods-receipt-form.png]]

`Subtotal` to `TOTAL` sit under the item grid inside the frame's two right-hand columns, ruled the
same way, with the left three columns absent below the last item row. They are footer rows of the
item table, label under `Unit Price` and value under `Extension`; the printed empty item rows are
kept as empty rows.

<details>
<summary>Expected Markdown · the item table</summary>

```markdown
<table>
  <tr> <th>Item No.</th> <th>Qty</th> <th>Description</th> <th>Unit Price</th> <th>Extension</th> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <th data-level="0">Subtotal</th> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td data-level="0">Sales Tax</td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <td data-level="0">Shipping/Handling</td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td> </td> <th data-level="0">TOTAL</th> <td>$ 0.00</td> </tr>
</table>
```

</details>

## Trailing aligned summary lines

Lines such as "Selected …" or "Reserve to Surplus Ratio:" whose values land under real columns are
rows of the grid. They MUST be rendered as rows, each value in its printed column — not as prose
after the table.

```text
| Year | Reserves | Surplus |
| 2023 | 1,204    | 887     |
Selected             1,190     ← values align under real columns:
Reserve/Surplus:     1.36        rows of the table
```

## Invoice-style totals blocks

A Subtotal / Discount / Shipping / Total block printed below the line-item table and outside its
frame MUST be rendered as its own key-value table: label and value, one row per printed line.

This is a deliberate exception to the treatment of ungridded key-value regions in
[[Forms and Key-Value Regions]]. Trailing totals are a numeric continuation of the table's data, and
a table whose totals are missing has lost the part of the page most people read first.

### ✅ **Sample** — `2cc`

![[zoo-2cc.png]]

A `Total - 175` line below the table, outside its implicit frame and not even aligned with the
second column. It is kept, as its own one-row key-value table after the list. The column headers
are bold and underlined.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th><u>Company Name</u></th> <th><u>State or Sovereign Power of<br/>Incorporation</u></th> </tr>
  <tr> <td>SMF Leasing LLC</td> <td>Delaware</td> </tr>
  <tr> <td>SMF Serviços de Mobilidade Ltda.</td> <td>Brazil</td> </tr>
  <tr> <td>SMF Wholesale Receivables LLC</td> <td>Delaware</td> </tr>
  <tr> <td>Grand Pointe Holdings, Inc.</td> <td>Michigan</td> </tr>
  <tr> <td>Guangxi Haoling Automotive Technology Co., Ltd.</td> <td>China</td> </tr>
  <tr> <td>Kinohi Insurance Company LLC</td> <td>Hawaii</td> </tr>
  <!-- … -->
  <tr> <td>WRE, Inc.</td> <td>Michigan</td> </tr>
  <tr> <td>Zona Franca Industrial Colmotores SAS</td> <td>Colombia</td> </tr>
</table>

<table>
  <tr> <th data-level="0">Total -</th> <td>175</td> </tr>
</table>
```

</details>

## Detached cell islands

A small offset group of cells that lines up with a table's column tracks is content. It MUST be
rendered; it is not decoration.

```text
| (1) | (2) | (3)  |
| 100 | 82  | 0.82 |

            | 0.79 |   ← "(8) Benchmark" offset box, aligned
                         with column (3)'s track
```

Where it goes is decided by one test: **does the island line up with an existing table's column
tracks?**

- **Yes** → it belongs to that table and MUST be appended as an extra row: the label in the stub
  column, the value in the column whose track it lines up with.
- **No** → it MUST be rendered as its own small table.

Column-track alignment is the typesetter saying "this value belongs under that heading". A floating
box that lines up with nothing makes no such claim, so it stands alone.

### ✅ **Sample** — `wwa`

![[zoo-wwa.png]]

The boxed *Selected: / Trend* values, the boxed trend period and the *Rolling 4-Qtr / Annual Trend*
table sit **outside** the main frame and do not continue its column grid, so each is its own small
table after the main one. The main table's italic footnote line follows it as footnote text.

<details>
<summary>Expected Markdown · excerpt, end of table 1 and the islands</summary>

```markdown
<table>
  <!-- … -->
  <tr> <td>20243</td> <td>6,762</td> <td>10,399,111</td> <td>11,171,105</td> <td>1,652</td> <td>26,922</td> <td>40,293,219</td> <td>44,436,437</td> <td>1,651</td> </tr>
</table>

*(Justify Selection and Trend Period in Filing Memorandum)*

<table>
  <tr> <th><strong>Selected:</strong></th> <th>Trend</th> </tr>
  <tr> <td>24 pt</td> <td>2.7%</td> </tr>
</table>

<table>
  <tr> <td>Trend Period (Years) for Most Recent Year in Experience Period:</td> <td>2.251</td> </tr>
</table>

<table>
  <tr> <th colspan="2">Rolling 4-Qtr</th> <th>Annual Trend</th> </tr>
  <tr> <td>8 pt</td> <td> </td> <td>5.2%</td> </tr>
  <tr> <td>12 pt</td> <td> </td> <td>4.6%</td> </tr>
  <tr> <td>16 pt</td> <td> </td> <td>2.8%</td> </tr>
  <tr> <td>20 pt</td> <td> </td> <td>2.2%</td> </tr>
  <tr> <td>24 pt</td> <td> </td> <td>2.7%</td> </tr>
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — `2tab`

![[zoo-2tab.png]]

*Calibration Factors:* and *Highest vs Lowest:* sit detached below the ruled frames, aligned to the
value columns, so they are appended as rows of the table: the four boxed calibration factors under
`Final Area Factors` and the three prior-year columns, `1.1498` under `Final Area Factors`. The two
panels share one Region row spine and are rendered as one wide table (see
[[Column Continuation]]).

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th colspan="5"><u>2026 Area Factor Development</u></th> <th colspan="3"><em><u>Projected vs Prior</u></em></th> </tr>
  <tr> <th>Region</th> <th>Projected Members</th> <th>Trended EHB Allowed Claims</th> <th>Calculated Area Factors</th> <th>Final Area Factors</th> <th>2025 Area Factors</th> <th>2024 Area Factors</th> <th>2023 Area Factors</th> </tr>
  <tr> <td data-level="0">1</td> <td>8,834</td> <td>$795.60</td> <td>0.9753</td> <td>1.0000</td> <td>1.0000</td> <td>1.0000</td> <td>1.0000</td> </tr>
  <tr> <td data-level="0">2</td> <td>2,127</td> <td>$810.63</td> <td>0.9937</td> <td>1.0189</td> <td>1.0104</td> <td>1.0120</td> <td>1.0423</td> </tr>
  <tr> <td data-level="0">3</td> <td>3,408</td> <td>$914.75</td> <td>1.1214</td> <td>1.1498</td> <td>1.1227</td> <td>1.1148</td> <td>1.0729</td> </tr>
  <tr> <td data-level="0">4</td> <td>2,162</td> <td>$795.87</td> <td>0.9756</td> <td>1.0003</td> <td>0.9858</td> <td>0.9871</td> <td>1.0236</td> </tr>
  <tr> <td data-level="0">5</td> <td>4,092</td> <td>$795.85</td> <td>0.9756</td> <td>1.0003</td> <td>0.9985</td> <td>0.9993</td> <td>1.0327</td> </tr>
  <tr> <td data-level="0">6</td> <td>499</td> <td>$822.63</td> <td>1.0084</td> <td>1.0340</td> <td>1.0082</td> <td>0.9861</td> <td>0.9814</td> </tr>
  <tr> <td data-level="0">8</td> <td>3,025</td> <td>$806.61</td> <td>0.9888</td> <td>1.0138</td> <td>1.0045</td> <td>0.9875</td> <td>0.9857</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>24,147</strong></td> <td><strong>$815.75</strong></td> <td><strong>1.0000</strong></td> <td><strong>1.0253</strong></td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td colspan="4" data-level="0"><strong>Calibration Factors:</strong></td> <td><strong>0.975</strong></td> <td><strong>0.983</strong></td> <td><strong>0.974</strong></td> <td><strong>0.975</strong></td> </tr>
  <tr> <td colspan="4" data-level="0"><em>Highest vs Lowest:</em></td> <td>1.1498</td> <td> </td> <td> </td> <td> </td> </tr>
</table>
```

</details>

### ✅ **Sample** — `3d`

![[zoo-3d.png]]

A boxed *Weighted Average Lapse Rate* summary detached below the main frame, its two values aligned
under the `Implied` and `"Current"` lapse-rate columns. It is stitched back in as trailing rows,
each value in the column it lines up with.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th rowspan="2">Policy<br/>Duration</th> <th rowspan="2">Total<br/>Lives</th> <th colspan="2">Total Terminations</th> <th colspan="2">Mortality Rate</th> <th colspan="3">Voluntary Lapse Rate</th> </tr>
  <tr> <th>Count</th> <th>Rate</th> <th>Actual</th> <th>Expected</th> <th>Actual</th> <th>Implied</th> <th>"Current"</th> </tr>
  <tr> <td data-level="0">1</td> <td>547</td> <td>22</td> <td>4.0%</td> <td>0.5%</td> <td>0.2%</td> <td>3.5%</td> <td>3.8%</td> <td>6.0%</td> </tr>
  <!-- … -->
  <tr> <td data-level="0">21</td> <td>20</td> <td>1</td> <td>5.0%</td> <td>5.0%</td> <td>6.0%</td> <td>0.0%</td> <td>-1.0%</td> <td>1.0%</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>8,098</strong></td> <td><strong>251</strong></td> <td><strong>3.1%</strong></td> <td><strong>1.8%</strong></td> <td><strong>1.9%</strong></td> <td><strong>1.3%</strong></td> <td><strong>1.2%</strong></td> <td> </td> </tr>
  <tr> <td colspan="7" data-level="0">Weighted Average Lapse Rate Durations 6+ =&gt;</td> <td>1.1%</td> <td>0.8%</td> </tr>
  <tr> <td colspan="7" data-level="0">Weighted Average Lapse Rate Durations 8+ =&gt;</td> <td>1.2%</td> <td>0.9%</td> </tr>
  <tr> <td colspan="7" data-level="0">Weighted Average Lapse Rate Durations 10+ =&gt;</td> <td>1.4%</td> <td>1.0%</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `2tt`

![[zoo-2tt.png]]

Boxed *Percentage Change: -8.3% / +30.0%* values below each frame, aligned under the
`Proposed Rate/Factor` column, folded back in as trailing rows.

<details>
<summary>Expected Markdown · excerpt, table 1 of 2</summary>

```markdown
<table>
  <tr> <th>Item</th> <th>Value</th> <th>Current Rate/Factor</th> <th>Proposed Rate/Factor</th> </tr>
  <tr> <td data-level="0">Pet Type</td> <td>Cat</td> <td>$471.51</td> <td>$612.96</td> </tr>
  <!-- … -->
  <tr> <td data-level="0">Years Claim Free</td> <td>1</td> <td>0.980</td> <td>0.980</td> </tr>
  <tr> <th data-level="0"><strong>Premium</strong></th> <td> </td> <td><strong>$717.60</strong></td> <td><strong>$658.16</strong></td> </tr>
  <tr> <td colspan="3" data-level="0">Percentage Change:</td> <td>-8.3%</td> </tr>
</table>
```

</details>

## Alignment on its own is not proof

Alignment places an island once it is known to belong to the table; it cannot by itself prove that
an out-of-frame line is a footer row. On a premium-tax page an underline closes a
`Premium Tax / Total` mini-table, and the `3. DCCE to Loss Ratio` line printed beneath it sits under
the same columns while belonging to neither table.

The frame test MUST be applied first, and alignment used only to place what it hands over — not
the other way round.

## Where the frame is genuinely ambiguous

Some pages have no ruled border either way. There, both encodings — footer rows of the table, or
a separate key-value table — conform, provided every printed line is kept. A document MUST use one
of them throughout. See [[Accepted Alternatives]] and [[Choices Made Once Per Document]].

<!-- skill:generate
- Never drop lines printed just below or beside a table (totals, "Selected …" lines, boxed values, small offset boxes).
- If they sit inside the table's frame or continue its ruled column grid, or their values line up under the table's columns, add them as extra <tr> rows at the bottom of that table, each value in the column it sits under.
- If they stand apart and line up with nothing, write them as their own small <table>, one <tr> per printed line with a label cell and a value cell.
- A footnote line is not such a block: it goes after the table as a paragraph.
-->

<!-- skill:check
- FAIL (MUST) if a totals line, summary line or detached value box printed below or beside a table is missing from the Markdown.
- FAIL (MUST) if an out-of-frame block whose values line up under the table's columns is rendered as prose instead of rows, or its values sit in columns other than the ones they are printed under.
- FAIL (MUST) if a separate unbordered block that does not continue the table's grid is padded into the main table as footer rows.
- WARN (SHOULD) if, on pages without ruled frames, one document renders trailing blocks as footer rows in one place and as separate tables in another.
-->

## Related

- [[Total and Subtotal Rows]] — totals printed inside the grid
- [[Footnotes Inside the Frame]] — the one bottom-edge block that never becomes a row
- [[Titles Banners Captions]] — the same frame test at the top edge
- [[Forms and Key-Value Regions]] — the key-value treatment this rule makes an exception to
