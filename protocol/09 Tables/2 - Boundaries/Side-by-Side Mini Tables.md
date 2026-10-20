---
title: Side-by-Side Mini Tables
rule_id: tables-side-by-side-mini-tables
status: rule
scope: page
tags: [tables, boundaries, failure-mode]
---

# Side-by-Side Independent Mini-Tables

> [!success] ✅ Normative
> Boxes sitting side by side with **their own titles and their own schemas** MUST be rendered as
> separate tables — even when their rows line up perfectly. Neighbouring tables MUST NOT be woven
> together, and a small side table MUST NOT be folded into the middle of another table's body.

```text
Printed:  [Box A]      [Box B]        Woven output (non-conforming):
          | a1 | a2 |  | b1 | b2 |    | a1 | a2 | b1 | b2 |
          | a3 | a4 |  | b3 | b4 |    | a3 | a4 | b3 | b4 |
                                        ↑ rows from unrelated boxes glued together
```

Weaving is not merely mis-structured. It asserts that `a1` and `b1` belong to the same record,
which the page never said (**never invent**).

## Requirements

- Each box MUST be rendered as its own table, with its own title and its own header stack.
- Row alignment MUST NOT be used as a grouping signal. Boxes are top-aligned for looks, so their rows
  land at the same heights by accident.
- The title and the schema decide: its own title and its own columns means its own table.
- A small side table MUST NOT be absorbed into another table's body. A "12pt / 3 Year" side panel is
  not three extra rows in the claims grid beside it.

### ✅ **Sample** — `3tables`

![[zoo-3tables.png]]

Three separately bordered and titled card-count tables, identical schema, distinct data. Each boxed
title is the first header row of its own table.

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

### ✅ **Sample** — `3tt`

![[zoo-3tt.png]]

Three badged panels — DIABETES, OBESITY, RARE DISEASE — same schema, different products. The
footnote numbers are printed raised.

<details>
<summary>Expected Markdown · excerpt, table 1 of 3</summary>

```markdown
**DIABETES**

<table>
  <tr> <th>Product</th> <th>US</th> <th>China</th> <th>Japan</th> <th>Europe<sup>2</sup></th> </tr>
  <tr> <td>Human insulin and Modern insulins<sup>3</sup></td> <td>Expired</td> <td>Expired</td> <td>Expired</td> <td>Expired</td> </tr>
  <tr> <td>Glucovia®<sup>4</sup></td> <td>Expired</td> <td>Expired</td> <td>Expired</td> <td>Expired</td> </tr>
  <tr> <td>Basalyn®</td> <td>2029</td> <td>2024</td> <td>2027</td> <td>2028</td> </tr>
  <tr> <td>Ryvelex®</td> <td>2029</td> <td>2024</td> <td>2024<sup>5</sup></td> <td>2028</td> </tr>
  <tr> <td>Xultara®</td> <td>2029</td> <td>2024</td> <td>2024<sup>5</sup></td> <td>2028</td> </tr>
  <tr> <td>Fiaprin®</td> <td>2030<sup>6</sup></td> <td>2030<sup>6</sup></td> <td>2030<sup>6</sup></td> <td>2030<sup>6</sup></td> </tr>
  <tr> <td>Insutide®</td> <td>2032</td> <td>2026</td> <td>2031</td> <td>2031</td> </tr>
  <tr> <td>Rebalsen®</td> <td>2032</td> <td>2026</td> <td>2031</td> <td>2031</td> </tr>
</table>

**OBESITY**

<!-- … -->
```

</details>

### ✅ **Sample** — `2tt`

![[zoo-2tt.png]]

Two independently framed pet-insurance worksheets (Cat, Dog), rendered as two tables. The blank
gap after *Coverage of Exam Fees* is left out, and the bold `Premium` line closes each worksheet.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th>Item</th> <th>Value</th> <th>Current Rate/Factor</th> <th>Proposed Rate/Factor</th> </tr>
  <tr> <td>Pet Type</td> <td>Cat</td> <td>$471.51</td> <td>$612.96</td> </tr>
  <tr> <td>State</td> <td>NY</td> <td>1.040</td> <td>1.040</td> </tr>
  <tr> <td>ZIP Code</td> <td>11211</td> <td>1.520</td> <td>1.520</td> </tr>
  <tr> <td>Limit</td> <td>$15,000</td> <td>0.824</td> <td>0.824</td> </tr>
  <tr> <td>Co-Pay</td> <td>80%</td> <td>0.800</td> <td>0.800</td> </tr>
  <tr> <td>Deductible</td> <td>$300</td> <td>0.500</td> <td>0.500</td> </tr>
  <tr> <td>Deductible Frequency</td> <td>Annual</td> <td>1.100</td> <td>1.100</td> </tr>
  <tr> <td>Coverage of Exam Fees</td> <td>Yes</td> <td>1.000</td> <td>1.000</td> </tr>
  <tr> <td>Breed</td> <td>Domestic Shorthair</td> <td>0.990</td> <td>0.990</td> </tr>
  <tr> <td>Animal Age</td> <td>9</td> <td>1.955</td> <td>1.931</td> </tr>
  <tr> <td>Initial Age</td> <td>8</td> <td>1.400</td> <td>1.000</td> </tr>
  <tr> <td>Working Dog</td> <td>No</td> <td>1.000</td> <td>1.000</td> </tr>
  <tr> <td>Internet Discount</td> <td>No</td> <td>1.000</td> <td>1.000</td> </tr>
  <tr> <td>Discount</td> <td>None</td> <td>1.000</td> <td>1.000</td> </tr>
  <tr> <td>Wellness Plan</td> <td>No</td> <td>1.000</td> <td>1.000</td> </tr>
  <tr> <td>Years Claim Free</td> <td>1</td> <td>0.980</td> <td>0.980</td> </tr>
  <tr> <th data-level="0"><strong>Premium</strong></th> <td> </td> <td><strong>$717.60</strong></td> <td><strong>$658.16</strong></td> </tr>
</table>

Percentage Change: -8.3%
```

</details>

### ✅ **Sample** — `waw`

![[zoo-waw.png]]

Five boxed ACA panels laid out in two rows, each with its own title band **and** its own full header
stack. The dark band across the top of each panel shares its frame, so it is the first row of that
panel's table. `Carrier Cata-` / `strophic` is one wrapped label; the lower panels print
`Cata-strophic` with the hyphen mid-line, so the hyphen is part of the printed word and is kept.

<details>
<summary>Expected Markdown · table 1 of 5</summary>

```markdown
<table>
  <tr> <th colspan="10">ACTUAL EXPERIENCE, 2024</th> </tr>
  <tr> <th rowspan="4">Description</th> <th colspan="9">ACTUAL EXPERIENCE, 2024</th> </tr>
  <tr> <th> </th> <th colspan="5">Carrier</th> <th> </th> <th colspan="2">Carrier</th> </tr>
  <tr> <th>Statewide Metal Plans</th> <th>Total for Metal + Catastrophic</th> <th>Total for Metal Plans</th> <th>Platinum</th> <th>Gold</th> <th>Silver</th> <th>Bronze</th> <th>Statewide Catastrophic Plans</th> <th>Carrier Cata-strophic</th> </tr>
  <tr> <th>6,183</th> <th>6,183</th> <th>-</th> <th>864</th> <th>1,645</th> <th colspan="2">3,674</th> <th> </th> <th> </th> </tr>
  <tr> <td><strong>Billable Member Months (MM)</strong></td> <td> </td> <td><strong>6,183</strong></td> <td><strong>6,183</strong></td> <td><strong>-</strong></td> <td><strong>864</strong></td> <td><strong>1,645</strong></td> <td><strong>3,674</strong></td> <td> </td> <td><strong>-</strong></td> </tr>
  <tr> <td>Actuarial Value (AV)</td> <td>0.686</td> <td> </td> <td>0.654552522</td> <td>0.900</td> <td>0.800</td> <td>0.700</td> <td>0.600</td> <td>0.570</td> <td>0.570</td> </tr>
  <tr> <td>Plan Liability Risk Score (PLRS)</td> <td>1.292</td> <td> </td> <td>2.091</td> <td>0.000</td> <td>4.604</td> <td>3.401</td> <td>0.914</td> <td>0.000</td> <td>0.000</td> </tr>
  <tr> <td>Allowable Rating Factor (ARF)</td> <td>1.711</td> <td> </td> <td>1.776</td> <td>0.000</td> <td>1.538</td> <td>1.754</td> <td>1.842</td> <td>0.000</td> <td>0.000</td> </tr>
  <tr> <td>Induced Demand Factor (IDF)</td> <td>1.030</td> <td> </td> <td>1.019</td> <td>0.000</td> <td>1.080</td> <td>1.030</td> <td>1.000</td> <td>0.000</td> <td>0.000</td> </tr>
  <tr> <td>Geographic Cost Factor (GCF)</td> <td>1.000</td> <td> </td> <td>1.005</td> <td>0.000</td> <td>0.980</td> <td>1.030</td> <td>1.014</td> <td>0.000</td> <td>0.000</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `strike`

![[zoo-strike.png]]

*Current Rates* and *Proposed Rates* as independently titled boxed pairs: all four blocks are
separate tables. Every current rate is struck through.

<details>
<summary>Expected Markdown · excerpt, table 1 of 4</summary>

```markdown
**<u>Current Rates</u>**

**Taverns & Restaurants**

<table>
  <tr> <th> </th> <th> </th> <th colspan="2">Restaurants</th> <th colspan="2">Taverns</th> </tr>
  <tr> <th>Each Claim</th> <th>Aggregate</th> <th>Upstate</th> <th>NY City</th> <th>Upstate</th> <th>NY City</th> </tr>
  <tr> <td>25,000</td> <td>25,000</td> <td>~~0.42~~</td> <td>~~0.42~~</td> <td>~~0.80~~</td> <td>~~0.80~~</td> </tr>
  <tr> <td>50,000</td> <td>50,000</td> <td>~~0.57~~</td> <td>~~0.57~~</td> <td>~~1.08~~</td> <td>~~1.08~~</td> </tr>
  <tr> <td>100,000</td> <td>100,000</td> <td>~~0.82~~</td> <td>~~0.82~~</td> <td>~~1.56~~</td> <td>~~1.56~~</td> </tr>
  <tr> <td>200,000</td> <td>200,000</td> <td>~~1.11~~</td> <td>~~0.93~~</td> <td>~~2.11~~</td> <td>~~1.77~~</td> </tr>
  <tr> <td>250,000</td> <td>250,000</td> <td>~~1.21~~</td> <td>~~0.97~~</td> <td>~~2.30~~</td> <td>~~1.84~~</td> </tr>
  <tr> <td>300,000</td> <td>300,000</td> <td>~~1.32~~</td> <td>~~1.01~~</td> <td>~~2.51~~</td> <td>~~1.92~~</td> </tr>
  <tr> <td>500,000</td> <td>500,000</td> <td>~~1.58~~</td> <td>~~1.11~~</td> <td>~~3.00~~</td> <td>~~2.11~~</td> </tr>
  <tr> <td>1,000,000</td> <td>1,000,000</td> <td>~~1.85~~</td> <td>~~1.21~~</td> <td>~~3.52~~</td> <td>~~2.30~~</td> </tr>
  <tr> <td>2,000,000</td> <td>2,000,000</td> <td>~~2.17~~</td> <td>~~1.42~~</td> <td>~~4.12~~</td> <td>~~2.70~~</td> </tr>
</table>

<!-- … -->
```

</details>

### ❌ **Counter-sample** — `figure-cards-p6`

![[zoo-figure-cards-p6.png]]

The Figure 5 boxed panels look like side-by-side mini-tables but are image-plus-caption cards, not
tabular data: they are rendered as the figure's content in reading order. The only table on the page
is Table 3, whose bold `Total` row closes it.

<details>
<summary>Expected Markdown · excerpt, Figure 5 and Table 3</summary>

```markdown
Q: What is the main predator that competes with this animal for prey?

A flat illustration of an animal: a brown oval body with a darker round head, on a tan background.

**Grey Wolf**

A pack predator occupying a similar ecological niche and range overlap with the <mark>coyote</mark> across temperate forest habitats; studies report a dietary overlap of 61.2%. Wolves largely ignore coyotes...

\+

Q: What is the estimated population of this animal?

A flat illustration of an animal: a brown oval body with a darker round head, on a pale background.

**Coyote**

The coyote (Canis latrans), also known as the prairie wolf, is listed as least concern by the IUCN on account of its widespread range and large numbers, estimated between <mark>340,000 and 430,000</mark> individuals. The species is...

=

***Chained question with bridge: coyote***

***What is the estimated population of the main predator that competes with this animal for prey?***

**Figure 5: Illustration of two-hop question generation using bridge entities.** The bridge entity, e.g. coyote, is an answer to a single-hop question which has its own entry in the knowledge base. Hence we can ask a second single-hop question about it. These two questions are then chained into a two-hop question.

<!-- … -->

<table>
  <tr> <th> </th> <th colspan="3">Number of (Q, A) pairs</th> <th colspan="3">Total (I, Q, A) triplets</th> </tr>
  <tr> <th> </th> <th>Train</th> <th>Val</th> <th>Test</th> <th>Train</th> <th>Val</th> <th>Test</th> </tr>
  <tr> <td>Templated</td> <td>13,928</td> <td>400</td> <td>1,000</td> <td>66,535</td> <td>1,827</td> <td>1,000</td> </tr>
  <tr> <td>Automatic</td> <td>153,441</td> <td>1,750</td> <td>2,750</td> <td>737,114</td> <td>8,025</td> <td>2,750</td> </tr>
  <tr> <td>Multi Answer</td> <td>23,929</td> <td>400</td> <td>1,000</td> <td>112,736</td> <td>1,844</td> <td>1,000</td> </tr>
  <tr> <td>Two Hop</td> <td>21,040</td> <td>400</td> <td>1,000</td> <td>99,866</td> <td>1,895</td> <td>1,000</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>212,338</strong></td> <td><strong>2,950</strong></td> <td><strong>5,750</strong></td> <td><strong>1,016,251</strong></td> <td><strong>13,591</strong></td> <td><strong>5,750</strong></td> </tr>
  <caption><strong>Table 3: Question type counts by train / val / test split.</strong></caption>
</table>
```

</details>

## Header attribution is per column, not per table

A header owns the columns printed under it, not everything to its right. A title like "Reported
Claims" sitting over the claim-count columns does not also claim the year labels beside them. A
spanning header MUST span exactly the columns it sits above.

## Contrast with the cases that DO merge

The neighbouring cases pull the other way, which is why the title and schema are checked rather than
a blanket "boxes are always separate":

- [[Column Continuation]] — side-by-side blocks that **are** one series: same schema, headers
  repeated, key continuing onward
- [[Split Tables Sharing a Header]] — fragments that **must** merge: one header, printed once

The discriminator is own title / own schema. If each box declares what it is and how its columns
are named, it stands alone.

### ✅ **Sample** — a two-sided balance sheet in one frame

![[bag-two-sided-balance-sheet.png]]

Assets down the left, liabilities and equity down the middle, an income statement on the right,
all inside one ruled box under two title bands. These are different schemas, not consecutive ranges
of a repeated schema. Repeated-schema continuations follow [[Column Continuation]] even inside
one enclosing frame. Row *n* on the left has nothing to do with row *n*
in the middle, and yet this is **one table, row *n* across all blocks** — the frame is one grid and
is transcribed as the grid it prints. The side-by-side rule above is for boxes with their own
frames.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th colspan="4">Balance Sheet</th> <th colspan="2">Income Statement</th> </tr>
  <tr> <th colspan="4"><em>Millions of yen</em></th> <th colspan="2"><em>Millions of yen</em></th> </tr>
  <tr> <th colspan="4">As of Jan. 31, 2025</th> <th colspan="2">Feb. 1, 2024 – Jan. 31, 2025</th> </tr>
  <tr> <td><strong>Assets</strong></td> <td> </td> <td><strong>Liabilities</strong></td> <td> </td> <td><strong>Net sales</strong></td> <td><strong>14,208</strong></td> </tr>
  <tr> <td>Current assets</td> <td>7,410</td> <td>Current liabilities</td> <td>2,010</td> <td>Cost of sales</td> <td>13,502</td> </tr>
  <tr> <td>Cash and deposits</td> <td>6,204</td> <td>Advances received</td> <td>840</td> <td><strong>Operating income</strong></td> <td><strong>706</strong></td> </tr>
  <tr> <td>Notes and accounts receivable</td> <td>98</td> <td>Other current liabilities</td> <td>1,170</td> <td>Non-operating income</td> <td>14</td> </tr>
  <tr> <td>Other current assets</td> <td>1,108</td> <td>Fixed liabilities</td> <td>4,208</td> <td>Other expenses</td> <td>7</td> </tr>
  <tr> <td><strong>Fixed assets</strong></td> <td><strong>1,904</strong></td> <th data-level="0"><strong>Total liabilities</strong></th> <td><strong>6,218</strong></td> <td><strong>Recurring income</strong></td> <td><strong>713</strong></td> </tr>
  <tr> <td>Tangible fixed assets</td> <td>1,296</td> <td> </td> <td> </td> <td>Extraordinary loss</td> <td>12</td> </tr>
  <tr> <td>Buildings and structures</td> <td>702</td> <td>Shareholders’ equity</td> <td> </td> <td><strong>Income before taxes</strong></td> <td><strong>701</strong></td> </tr>
  <tr> <td>Land</td> <td>488</td> <td>Paid-in capital</td> <td>410</td> <td>Current income taxes</td> <td>340</td> </tr>
  <tr> <td>Other</td> <td>106</td> <td>Retained earnings</td> <td>1,890</td> <td>Deferred income taxes</td> <td>(38)</td> </tr>
  <tr> <td><strong>Investments and other assets</strong></td> <td><strong>608</strong></td> <td><strong>Net income</strong></td> <td><strong>399</strong></td> <td><strong>Net income</strong></td> <td><strong>399</strong></td> </tr>
  <tr> <td>Investment in securities</td> <td>52</td> <th data-level="0"><strong>Total shareholders’ equity</strong></th> <td><strong>3,096</strong></td> <td>Retained earnings brought forward</td> <td>6</td> </tr>
  <tr> <th data-level="0"><strong>Total assets</strong></th> <td><strong>9,314</strong></td> <th data-level="0"><strong>Total liabilities and shareholders’ equity</strong></th> <td><strong>9,314</strong></td> <td><strong>Unappropriated retained earnings</strong></td> <td><strong>405</strong></td> </tr>
</table>
```

</details>

<!-- skill:generate
- Render side-by-side boxes that each have their own title and their own column headers as separate <table> elements, even when their rows line up.
- Never join row n of one box to row n of its neighbour, and never fold a small side panel into the body of the table beside it.
- Keep different-schema blocks inside one single ruled frame as the printed grid. Repeated-schema continuation blocks are instead preferably separate tables, even when their frame is continuous.
- Make a spanning header cover exactly the columns printed under it.
-->

<!-- skill:check
- FAIL (MUST) if two separately framed or separately titled boxes are rendered as one <table> whose rows join cells from both.
- FAIL (MUST) if a small side panel's rows appear inside another table's body.
- FAIL (MUST) if a spanning header's colspan covers columns not printed under it.
-->

## Related

- [[Column Continuation]] — side-by-side blocks that continue one series
- [[Split Tables Sharing a Header]] — fragments that share one printed header and merge
- [[Is This Even a Table]] — boxed panels that are not tables at all
