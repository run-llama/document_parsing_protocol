---
title: SEC Period Tiers
rule_id: tables-sec-period-tiers
status: rule
scope: page
tags: [tables, headers, sec]
---

# SEC Period Tiers

> [!success] ✅ Normative
> A financial period stack MUST be rendered as its printed tiers: period groups over their own date
> leaves, an apex qualifier above them, a stacked month and year joined into one leaf label, and the
> units note kept verbatim as the corner header cell.

This is the header stack of every 10-K and 10-Q. It looks ambiguous, but every part of it has a
fixed answer.

```text
| $ in millions |       Average for the        |  ← apex qualifier
|               | Three Months Ended | Year …  |  ← sibling period groups
|               | December | December | Dec…   |  ← stacked month/year =
|               | 2024     | 2023     | 2024   |    ONE leaf, joined
```

| The page shows | Requirement |
| --- | --- |
| "Three/Six Months Ended…", "Year(s) Ended…" | MUST be **sibling group tiers** over their own date leaves |
| An apex qualifier like "Average for the" | MUST be a tier **above** them, spanning the period groups |
| Stacked "December" / "2024" | MUST be **one leaf label**, the lines joined |
| Bold on the current-period column | **styling, not structure**: the header structure MUST NOT change; the bold is marked per cell as printed |
| "$ in millions" in the stub corner | MUST be **the corner header cell**, kept verbatim |

### ✅ **Sample** — `wdb`

![[zoo-wdb.png]]

*Three Months Ended* / *Nine Months Ended* bands with the `$ in millions` corner note in the stub.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="4">Three Months Ended September 30,</th> <th colspan="4">Nine Months Ended September 30,</th> </tr>
  <tr> <th> </th> <th>2024</th> <th>2023</th> <th colspan="2">% Change</th> <th>2024</th> <th>2023</th> <th colspan="2">% Change</th> </tr>
  <tr> <th><em>$ in millions</em></th> <th> </th> <th> </th> <th>Reported</th> <th>Ex-FX<sup>(\*)</sup></th> <th> </th> <th> </th> <th>Reported</th> <th>Ex-FX<sup>(\*)</sup></th> </tr>
  <tr> <td><strong>Distribution</strong></td> <td>$ 2,598</td> <td>$ 2,833</td> <td>(8)%</td> <td>(7)%</td> <td>$ 8,070</td> <td>$ 8,769</td> <td>(8)%</td> <td>(7)%</td> </tr>
  <tr> <td><strong>Advertising</strong></td> <td>1,490</td> <td>1,709</td> <td>(13)%</td> <td>(13)%</td> <td>5,691</td> <td>6,394</td> <td>(11)%</td> <td>(11)%</td> </tr>
  <tr> <td><strong>Content</strong></td> <td>833</td> <td>215</td> <td>NM</td> <td>NM</td> <td>1,396</td> <td>744</td> <td>88 %</td> <td>87 %</td> </tr>
  <tr> <td><strong>Other</strong></td> <td>89</td> <td>111</td> <td>(20)%</td> <td>(21)%</td> <td>250</td> <td>300</td> <td>(17)%</td> <td>(18)%</td> </tr>
  <tr> <th data-level="0"><strong>Total revenues</strong></th> <td><strong>5,010</strong></td> <td><strong>4,868</strong></td> <td><strong>3 %</strong></td> <td><strong>3 %</strong></td> <td><strong>15,407</strong></td> <td><strong>16,207</strong></td> <td><strong>(5)%</strong></td> <td><strong>(4)%</strong></td> </tr>
  <tr> <td><strong>Costs of revenues (excluding depreciation &amp; amortization)</strong></td> <td>2,185</td> <td>1,800</td> <td>21 %</td> <td>22 %</td> <td>7,088</td> <td>7,243</td> <td>(2)%</td> <td>(1)%</td> </tr>
  <tr> <td><strong>Selling, general and administrative</strong></td> <td>710</td> <td>672</td> <td>6 %</td> <td>6 %</td> <td>2,087</td> <td>2,109</td> <td>(1)%</td> <td>— %</td> </tr>
  <tr> <td><strong>Adjusted EBITDA</strong></td> <td><strong>$ 2,115</strong></td> <td><strong>$ 2,396</strong></td> <td><strong>(12)%</strong></td> <td><strong>(11)%</strong></td> <td><strong>$ 6,232</strong></td> <td><strong>$ 6,855</strong></td> <td><strong>(9)%</strong></td> <td><strong>(9)%</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `10k1`

![[zoo-10k1.png]]

*For the Years Ended December 31,* spanning 2030/2029/2028 plus a *Change* tier, with an
`(in millions, except percentages)` corner note.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3">For the Years Ended December 31,</th> <th colspan="2">Change</th> </tr>
  <tr> <th>(in millions, except percentages)</th> <th>2030</th> <th>2029</th> <th>2028</th> <th colspan="2">2030 vs. 2029</th> </tr>
  <tr> <th colspan="6">Revenues</th> </tr>
  <tr> <td data-level="0">MerevaldCare</td> <td>$ 301,450</td> <td>$ 284,900</td> <td>$ 252,100</td> <td>$ 16,550</td> <td>6%</td> </tr>
  <tr> <td data-level="1">Vantage Health</td> <td>108,200</td> <td>97,650</td> <td>73,300</td> <td>10,550</td> <td>11</td> </tr>
  <tr> <td data-level="1">Vantage Insight</td> <td>19,300</td> <td>19,480</td> <td>15,010</td> <td>(180)</td> <td>(1)</td> </tr>
  <tr> <td data-level="1">Vantage Rx</td> <td>137,000</td> <td>119,400</td> <td>102,650</td> <td>17,600</td> <td>15</td> </tr>
  <tr> <td data-level="1">Vantage eliminations</td> <td>(4,520)</td> <td>(3,810)</td> <td>(2,840)</td> <td>(710)</td> <td>19</td> </tr>
  <tr> <td data-level="0">Vantage</td> <td>260,980</td> <td>232,720</td> <td>188,120</td> <td>27,260</td> <td>12</td> </tr>
  <tr> <td data-level="0">Eliminations</td> <td>(162,300)</td> <td>(146,700)</td> <td>(116,700)</td> <td>(15,600)</td> <td>11</td> </tr>
  <tr> <th data-level="0"><strong>Consolidated revenues</strong></th> <td><strong>$ 400,130</strong></td> <td><strong>$ 370,920</strong></td> <td><strong>$ 323,520</strong></td> <td><strong>$ 29,210</strong></td> <td><strong>8%</strong></td> </tr>
  <tr> <th colspan="6">Earnings from operations</th> </tr>
  <tr> <td data-level="0">MerevaldCare</td> <td>$ 15,820</td> <td>$ 16,650</td> <td>$ 14,590</td> <td>$ (830)</td> <td>(5)%</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `2q`

![[zoo-2q.png]]

*Three / Six Months Ended September 30,* over 2004/2003 leaves, with an `(in thousands)` lead-in.
Each period label wraps over two lines inside its own group cell and is joined. The currency sign is
printed with a space before the figure; `Nova Studio Net Product Revenue` is indented one step.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="2">Three Months Ended September 30,</th> <th colspan="2">Six Months Ended September 30,</th> </tr>
  <tr> <th> </th> <th>2004</th> <th>2003</th> <th>2004</th> <th>2003</th> </tr>
  <tr> <td data-level="0">Rivera 2</td> <td>$ 311,839</td> <td>$ 221,180</td> <td>$ 473,815</td> <td>$ 339,549</td> </tr>
  <tr> <td data-level="0">PC</td> <td>140,702</td> <td>93,022</td> <td>207,453</td> <td>173,360</td> </tr>
  <tr> <td data-level="0">Orbit</td> <td>141,936</td> <td>68,691</td> <td>199,146</td> <td>100,212</td> </tr>
  <tr> <td data-level="0">Lumos Cube</td> <td>38,181</td> <td>24,553</td> <td>64,605</td> <td>45,707</td> </tr>
  <tr> <td data-level="0">Handheld Go</td> <td>10,081</td> <td>3,809</td> <td>28,069</td> <td>6,168</td> </tr>
  <tr> <td data-level="0">Subscription Services</td> <td>12,554</td> <td>11,124</td> <td>24,994</td> <td>24,755</td> </tr>
  <tr> <td data-level="1">Nova Studio Net Product Revenue</td> <td>655,293</td> <td>422,379</td> <td>998,082</td> <td>689,751</td> </tr>
  <tr> <td data-level="0">Co-publishing and Distribution</td> <td>48,913</td> <td>92,512</td> <td>116,105</td> <td>164,059</td> </tr>
  <tr> <td data-level="0">Advertising, Programming, Licensing and Other</td> <td>11,522</td> <td>15,114</td> <td>33,182</td> <td>29,576</td> </tr>
  <tr> <th data-level="0">Total Net Revenue</th> <td>$ 715,728</td> <td>$ 530,005</td> <td>$ 1,147,369</td> <td>$ 883,386</td> </tr>
</table>
```

</details>

## Why the stacked month and year join

"December" and "2024" are not two levels of anything — no other column shares a "December" parent.
The typesetter broke one label across two lines to fit a narrow column, so it is a wrap. A tier is
kept only for a label that genuinely spans more than one leaf column, as
[[Multi-Row Header Tiers]] requires.

<!-- skill:generate
- In a financial statement header, render "Three Months Ended…", "Six Months Ended…", "Year Ended…" as sibling header cells, each with a colspan over its own date columns.
- Render a qualifier printed above them, such as "Average for the", as a higher header row spanning the period groups.
- Join a month and year stacked in one column ("December" over "2024") into one header cell: December 2024.
- Put a units note such as "$ in millions" in the top-left corner header cell, verbatim; do not change the header structure because one column is bold.
-->

<!-- skill:check
- FAIL (MUST) if a month and year stacked over a single column are rendered as two header rows.
- FAIL (MUST) if a period group ("Three Months Ended…") does not span exactly its own date columns.
- FAIL (MUST) if a printed units note in the stub corner ("$ in millions") is missing or moved out of the header.
-->

## Related

- [[Multi-Row Header Tiers]] — the general tier rules these calls apply
- [[Header Wrap vs Real Tier]] — why a stacked month and year is a wrap
- [[Units Row]] — units printed as a line under the header rather than in the corner
