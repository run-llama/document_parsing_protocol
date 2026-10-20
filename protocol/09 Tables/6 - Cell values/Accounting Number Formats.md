---
title: Accounting Number Formats
rule_id: tables-accounting-number-formats
status: rule
scope: page
tags: [tables, fidelity, numbers]
---

# Accounting Number Formats

> [!success] ✅ Normative
> Every number in a cell MUST be transcribed exactly as printed — parentheses, currency dashes,
> separators and change markers included. The output MUST NOT carry a normalised twin of the value
> beside it, and MUST NOT replace the printed form with a normalised one.

Accounting pages print numbers in shapes that look as if they ask to be tidied up. They do not: the
cell is copied character for character.

```text
Printed:     (1,204)    $—     n/m     1.204,50 (EU)     △2.5%
Verbatim:    (1,204)    $—     n/m     1.204,50          △2.5%
Normalized:  -1204      0?     null?   1204.50           +2.5%? -2.5%?
```

## Requirements

| Printed form | Requirement |
| --- | --- |
| **Parenthesised negative** — `(1,204)`, `(2.0)%`, `($8.75)` | MUST keep its parentheses; MUST NOT be rewritten with a minus sign. |
| **Leading minus** — `-50.009` | MUST stay a leading minus; MUST NOT be converted into parentheses. The page's convention is the one recorded. |
| **Currency and percent dashes** — `$—`, `— %` | MUST stay dashes, with their currency or percent sign. |
| **Placeholders** — `n/m`, `NM`, anything printed in place of a figure | MUST be transcribed as written. |
| **Separators** — `1.074.778`, `1.204,50` | MUST stay as printed: thousands points stay points, a decimal comma stays a comma, and no separator is removed or swapped for the other convention. |
| **Change markers** — `△2.5%` | MUST stay attached to the number, in the same cell. |

Spacing printed inside a value — `3.8 %`, `$ 17,565.8` — is part of the printed form and is kept.

### ✅ **Sample** — `sssa`

![[zoo-sssa.png]]

Negative percentages as `(2.0)%` and `(8.3)%`, and elsewhere with a space before the percent sign,
`(2.6) %`, `(3.5) %` — each kept as printed. The two parent rows are bold in every cell; *Ticket*
and *Transactions* are indented under them.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th></th> <th colspan="5">2023</th> <th colspan="3">2024</th> </tr>
  <tr> <th><em>Fiscal year ending December,</em></th> <th>Q1</th> <th>Q2</th> <th>Q3</th> <th>Q4</th> <th>FY</th> <th>Q1</th> <th>Q2</th> <th>Q3</th> </tr>
  <tr> <td data-level="0"><strong>Systemwide Same Shop Sales</strong></td> <td><strong>(2.0)%</strong></td> <td><strong>3.8 %</strong></td> <td><strong>4.0 %</strong></td> <td><strong>5.0 %</strong></td> <td><strong>2.8 %</strong></td> <td><strong>10.0 %</strong></td> <td><strong>4.1 %</strong></td> <td><strong>2.7 %</strong></td> </tr>
  <tr> <td data-level="1">Ticket</td> <td>6.3 %</td> <td>6.4 %</td> <td>9.5 %</td> <td>5.4 %</td> <td>7.2 %</td> <td>8.8 %</td> <td>6.1 %</td> <td>1.9 %</td> </tr>
  <tr> <td data-level="1">Transactions</td> <td>(8.3)%</td> <td>(2.6) %</td> <td>(5.5) %</td> <td>(0.4) %</td> <td>(4.4) %</td> <td>1.2 %</td> <td>(2.0) %</td> <td>0.8 %</td> </tr>
  <tr> <td data-level="0"><strong>Company-Operated Same Shop Sales</strong></td> <td><strong>(3.5) %</strong></td> <td><strong>1.6 %</strong></td> <td><strong>2.8 %</strong></td> <td><strong>4.6 %</strong></td> <td><strong>1.5 %</strong></td> <td><strong>10.9 %</strong></td> <td><strong>5.2 %</strong></td> <td><strong>4.0 %</strong></td> </tr>
  <tr> <td data-level="1">Ticket</td> <td>6.5 %</td> <td>6.1 %</td> <td>9.1 %</td> <td>4.9 %</td> <td>7.1 %</td> <td>8.2 %</td> <td>6.0 %</td> <td>1.6 %</td> </tr>
  <tr> <td data-level="1">Transactions</td> <td>(10.0) %</td> <td>(4.5) %</td> <td>(6.3) %</td> <td>(0.3) %</td> <td>(5.6) %</td> <td>2.7 %</td> <td>(0.8) %</td> <td>2.4 %</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `e22`

![[zoo-e22.png]]

Parenthesised negatives printed in red — `($8.75)`, `($11.99)`. The parentheses already carry the
sign, so the red is decoration and the text is kept as printed. The column headings are bold as a
row; *Rx Claim Information* is also underlined.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th><u>Rx Claim Information</u></th> <th>Generic</th> <th>Brand</th> <th>Specialty</th> <th>Total</th> </tr>
  <!-- … -->
  <tr> <td>Experience Period Paid PMPM</td> <td>$9.36</td> <td>$17.90</td> <td>$29.51</td> <td>$56.77</td> </tr>
  <tr> <td>Experience Period Rx Rebates PMPM</td> <td></td> <td></td> <td></td> <td>($8.75)</td> </tr>
  <!-- … -->
  <tr> <td>Projected Paid PMPM</td> <td>$9.42</td> <td>$24.25</td> <td>$39.27</td> <td>$72.94</td> </tr>
  <tr> <td>Projected Rx Rebates</td> <td></td> <td></td> <td></td> <td>($11.99)</td> </tr>
  <tr> <td>Net Projected Paid PMPM</td> <td></td> <td></td> <td></td> <td>$60.95</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `entwick`

![[zoo-entwick.png]]

German conventions: `1.074.778` with thousands points, and `-50.009` with a leading minus rather
than parentheses. Cells the page leaves blank stay empty. The column headings wrap inside words at
printed hyphens (`Kapital-` / `rücklagen`), so each is one label; the closing row is bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th></th> <th>Grundkapital</th> <th>Kapitalrücklagen</th> <th>Gewinnrücklagen</th> <th>Sonstige Rücklagen</th> <th>Eigene Anteile</th> <th>Gesellschafter VAG</th> <th>Minderheitenanteile</th> <th>Gesamtkapital</th> </tr>
  <tr> <td data-level="0">1. Jänner 2005</td> <td>218.100</td> <td>1.074.778</td> <td>2.816.854</td> <td>172.965</td> <td>-14.761</td> <td>4.267.936</td> <td>1.493.854</td> <td>5.761.790</td> </tr>
  <tr> <td data-level="0">Unrealisierte Gewinne/Verluste (-)<br/>aus der Bewertung von Wertpapieren:</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">Saldo Gewinn/Verlust (-) der Periode<br/>vor Ertragssteuern</td> <td></td> <td></td> <td></td> <td>200.291</td> <td></td> <td>200.291</td> <td></td> <td>200.291</td> </tr>
  <tr> <td data-level="1">Ertragssteuern</td> <td></td> <td></td> <td></td> <td>-50.009</td> <td></td> <td>-50.009</td> <td></td> <td>-50.009</td> </tr>
  <tr> <td data-level="1">Realisierte, im JÜ ausgewiesene<br/>Gewinne (-)/Verluste vor Ertragssteuern</td> <td></td> <td></td> <td></td> <td>-77</td> <td></td> <td>-77</td> <td></td> <td>-77</td> </tr>
  <tr> <td data-level="1">Ertragssteuern</td> <td></td> <td></td> <td></td> <td>19</td> <td></td> <td>19</td> <td></td> <td>19</td> </tr>
  <tr> <td data-level="0">Rückkauf eigener Anteile</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>0</td> </tr>
  <tr> <td data-level="0">Währungsdifferenzen aus der Umrechnung<br/>ausländischer Geschäftsbetriebe</td> <td></td> <td></td> <td></td> <td>158.718</td> <td></td> <td>158.718</td> <td>120.673</td> <td>279.391</td> </tr>
  <tr> <td data-level="0">Jahresüberschuss</td> <td></td> <td></td> <td>593.579</td> <td></td> <td></td> <td>593.579</td> <td>99.714</td> <td>693.293</td> </tr>
  <tr> <td data-level="0">Dividendenausschüttung</td> <td></td> <td></td> <td>-131.414</td> <td></td> <td></td> <td>-131.414</td> <td>-1.814</td> <td>-133.228</td> </tr>
  <tr> <td data-level="0">Kapitalerhöhung</td> <td>81.900</td> <td>-81.894</td> <td></td> <td></td> <td></td> <td>6</td> <td></td> <td>6</td> </tr>
  <tr> <th data-level="0"><strong>30. Juni 2005</strong></th> <td><strong>300.000</strong></td> <td><strong>992.988</strong></td> <td><strong>3.279.019</strong></td> <td><strong>464.170</strong></td> <td><strong>-14.474</strong></td> <td><strong>5.021.703</strong></td> <td><strong>1.695.593</strong></td> <td><strong>6.717.296</strong></td> </tr>
</table>
```

</details>

## Why no normalised twin

A cleaned-up value beside the printed one looks free to produce and saves every consumer the same
work. It is refused for two reasons.

**Normalisation here is not a transformation, it is a guess.** A "clean" column would have to decide
things the page does not say: is `$—` zero, or not applicable? Is `n/m` null, an empty string, or a
string literal? Does `△2.5%` mean up or down — the triangle's direction is conventional and the sign
is not printed at all. A twin column would carry three guesses dressed as data, and nothing
downstream distinguishes a guessed value from a read one.

**A second value is a second thing to be wrong.** The printed form is verifiable against the page;
the derived form is verifiable only against whatever rules produced it. A consumer that needs a
number applies its own conventions to the printed string — and it knows its own conventions, which
the producer does not.

Hence: **one value per cell, and it is the one on the page.** Verbatim leaves the interpretation to
whoever consumes the table, the only place it can be made safely.

### ✅ **Sample** — `yef`

![[zoo-yef.png]]

`$ —` for a nil value beside `(626.6)` parenthesised negatives, and a bare `—` in the rows below.
The page sets a space between `$` and the figure, and it is kept. The year line is a bold band
across the grid, rendered as a spanning header cell.

<details>
<summary>Expected Markdown · excerpt, first year block</summary>

```markdown
<table>
  <tr> <th>(in millions)</th> <th>Willowbrook Segment</th> <th>Corporate, Support and Other</th> <th>Total</th> </tr>
  <tr> <th colspan="4">Year Ended February 1, 2025</th> </tr>
  <tr> <td>Net sales</td> <td>$ 17,565.8</td> <td>$ —</td> <td>$ 17,565.8</td> </tr>
  <tr> <td>Cost of sales</td> <td>11,284.1</td> <td>—</td> <td>11,284.1</td> </tr>
  <tr> <td>Gross Profit</td> <td>6,281.7</td> <td>—</td> <td>6,281.7</td> </tr>
  <tr> <td>Other revenue</td> <td>0.1</td> <td>12.6</td> <td>12.7</td> </tr>
  <tr> <td>Selling, general and administrative expenses</td> <td>4,193.2</td> <td>639.2</td> <td>4,832.4</td> </tr>
  <tr> <td>Operating income (loss)</td> <td>2,088.6</td> <td>(626.6)</td> <td>1,462.0</td> </tr>
  <tr> <td>Interest expense, net</td> <td></td> <td></td> <td>107.5</td> </tr>
  <tr> <td>Other (income) expense, net</td> <td></td> <td></td> <td>(29.1)</td> </tr>
  <tr> <td>Income from continuing operations before income taxes</td> <td></td> <td></td> <td>$ 1,383.6</td> </tr>
  <tr> <td>Depreciation and amortization expense</td> <td>$ 488.9</td> <td>$ 38.0</td> <td>$ 526.9</td> </tr>
  <tr> <td>Capital expenditures</td> <td>$ 1,262.2</td> <td>$ 38.3</td> <td>$ 1,300.5</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `wdb`

![[zoo-wdb.png]]

`(8)%`, `NM` and `— %` in one table — three different ways of writing *not a number here*, each
kept as printed. The years sit on the second header line with an empty ruled cell beneath them, so
they take no `rowspan`. The row labels are bold; the *Total revenues* and *Adjusted EBITDA* rows
are bold in every cell.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th></th> <th colspan="4">Three Months Ended September 30,</th> <th colspan="4">Nine Months Ended September 30,</th> </tr>
  <tr> <th></th> <th>2024</th> <th>2023</th> <th colspan="2">% Change</th> <th>2024</th> <th>2023</th> <th colspan="2">% Change</th> </tr>
  <tr> <th><em>$ in millions</em></th> <th></th> <th></th> <th>Reported</th> <th>Ex-FX<sup>(*)</sup></th> <th></th> <th></th> <th>Reported</th> <th>Ex-FX<sup>(*)</sup></th> </tr>
  <tr> <td data-level="0"><strong>Distribution</strong></td> <td>$ 2,598</td> <td>$ 2,833</td> <td>(8)%</td> <td>(7)%</td> <td>$ 8,070</td> <td>$ 8,769</td> <td>(8)%</td> <td>(7)%</td> </tr>
  <tr> <td data-level="0"><strong>Advertising</strong></td> <td>1,490</td> <td>1,709</td> <td>(13)%</td> <td>(13)%</td> <td>5,691</td> <td>6,394</td> <td>(11)%</td> <td>(11)%</td> </tr>
  <tr> <td data-level="0"><strong>Content</strong></td> <td>833</td> <td>215</td> <td>NM</td> <td>NM</td> <td>1,396</td> <td>744</td> <td>88 %</td> <td>87 %</td> </tr>
  <tr> <td data-level="0"><strong>Other</strong></td> <td>89</td> <td>111</td> <td>(20)%</td> <td>(21)%</td> <td>250</td> <td>300</td> <td>(17)%</td> <td>(18)%</td> </tr>
  <tr> <th data-level="0"><strong>Total revenues</strong></th> <td><strong>5,010</strong></td> <td><strong>4,868</strong></td> <td><strong>3 %</strong></td> <td><strong>3 %</strong></td> <td><strong>15,407</strong></td> <td><strong>16,207</strong></td> <td><strong>(5)%</strong></td> <td><strong>(4)%</strong></td> </tr>
  <tr> <td data-level="0"><strong>Costs of revenues (excluding depreciation &amp; amortization)</strong></td> <td>2,185</td> <td>1,800</td> <td>21 %</td> <td>22 %</td> <td>7,088</td> <td>7,243</td> <td>(2)%</td> <td>(1)%</td> </tr>
  <tr> <td data-level="0"><strong>Selling, general and administrative</strong></td> <td>710</td> <td>672</td> <td>6 %</td> <td>6 %</td> <td>2,087</td> <td>2,109</td> <td>(1)%</td> <td>— %</td> </tr>
  <tr> <th data-level="0"><strong>Adjusted EBITDA</strong></th> <td><strong>$ 2,115</strong></td> <td><strong>$ 2,396</strong></td> <td><strong>(12)%</strong></td> <td><strong>(11)%</strong></td> <td><strong>$ 6,232</strong></td> <td><strong>$ 6,855</strong></td> <td><strong>(9)%</strong></td> <td><strong>(9)%</strong></td> </tr>
</table>
```

</details>

<!-- skill:generate
- Copy every number in a table cell character for character: keep parentheses for negatives ("(1,204)", "($8.75)", "(2.0)%"), keep a leading minus as a minus, keep "$—", "— %", "n/m", "NM" and change markers like "△2.5%" exactly as printed.
- Keep the page's separators: "1.074.778" and "1.204,50" stay as printed; never switch to the other convention or strip separators.
- Keep spaces printed inside a value ("3.8 %", "$ 17,565.8").
- Output one value per cell — never add a normalised copy (such as -1204 or 0) next to the printed value.
-->

<!-- skill:check
- FAIL (MUST) if a parenthesised negative is rendered with a minus sign, or a leading-minus value is rendered in parentheses.
- FAIL (MUST) if "$—", "— %", "n/m", "NM" or a change marker printed in a cell is replaced by a number, blank or other text.
- FAIL (MUST) if thousands or decimal separators differ from the page image (swapped, removed or added).
- FAIL (MUST) if a cell carries a normalised value in addition to, or instead of, the printed one.
-->

## Related

- [[Cell Text Fidelity]] — the general rule that the page, not the text layer, decides what a cell says
- [[Marks and Symbols in Cells]] — when a dash alone in a cell is a value
- [[Gutter Columns]] — a currency sign typeset in a column track of its own
- [[Units Row]] — units printed once for a column rather than in each cell
