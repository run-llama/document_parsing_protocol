---
title: Horizontal Slicing
rule_id: tables-horizontal-slicing
status: rule
scope: page
tags: [tables, continuation, boundaries]
---

# Horizontal Slicing — too-wide table printed in stacked blocks

> [!success] ✅ Normative
> A table too wide for the page, printed as stacked column blocks, MUST be rendered as one table per
> printed block, each keeping its repeated row-label column. The blocks MUST NOT be re-widened into a
> single wide table.

A table too wide for the page is printed as column blocks stacked vertically, with the row-label
column repeated in each block.

```text
| State | Jan | Feb | Mar |
| AL    | 1.1 | 1.2 | 1.2 |

| State | Apr | May | Jun |   ← same rows, next columns
| AL    | 1.3 | 1.3 | 1.4 |
```

### ✅ **Sample** — `5line heaer`

![[zoo-5line heaer.png]]

Columns (1)–(5) and (6)–(10) of one logical table stacked vertically, the *Industry Group* stub
repeated in each block over the same six rows. Each column header is one label wrapped over many
lines and is joined into one cell.

<details>
<summary>Expected Markdown · both tables</summary>

```markdown
<table>
  <tr> <th>Industry Group</th> <th>(1) Latest Year Current Expected Losses Prior to Adjustment for Change in Off-Balance</th> <th>(2) Five Year Current Expected Losses Prior to Adjustment for Change in Off-Balance</th> <th>(3) Five Year Proposed Expected Losses Prior to Adjustment for Change in Off-Balance</th> <th>(4) Current Ratio of Manual to Standard Premium</th> <th>(5) Proposed Ratio of Manual to Standard Premium</th> </tr>
  <tr> <td>Manufacturing</td> <td>77,510,436</td> <td>338,649,937</td> <td>315,156,641</td> <td>1.162</td> <td>1.156</td> </tr>
  <tr> <td>Contracting</td> <td>244,423,390</td> <td>1,046,738,721</td> <td>974,416,048</td> <td>1.108</td> <td>1.099</td> </tr>
  <tr> <td>Office &amp; Clerical</td> <td>99,137,891</td> <td>425,709,394</td> <td>396,154,601</td> <td>1.186</td> <td>1.183</td> </tr>
  <tr> <td>Goods &amp; Services</td> <td>308,876,410</td> <td>1,299,162,826</td> <td>1,209,037,084</td> <td>1.068</td> <td>1.062</td> </tr>
  <tr> <td>Miscellaneous</td> <td>176,900,574</td> <td>768,557,721</td> <td>715,461,415</td> <td>1.080</td> <td>1.068</td> </tr>
  <tr> <td>Statewide</td> <td>906,848,702</td> <td>3,878,818,599</td> <td>3,610,225,790</td> <td> </td> <td> </td> </tr>
</table>

<table>
  <tr> <th>Industry Group</th> <th>(6) Latest Year Current Expected Losses Adjusted for Change in Off-Balance</th> <th>(7) Five Year Current Expected Losses Adjusted for Change in Off-Balance</th> <th>(8) Five Year Proposed Expected Losses Adjusted for Change in Off-Balance</th> <th>(9) Current/Proposed (7)/(8)</th> <th>(10) Adjustment to Proposed for Current Relativity (9)IG/(9)SW</th> </tr>
  <tr> <td>Manufacturing</td> <td>77,912,740</td> <td>340,407,635</td> <td>316,792,402</td> <td>1.075</td> <td>1.001</td> </tr>
  <tr> <td>Contracting</td> <td>246,425,037</td> <td>1,055,310,740</td> <td>982,395,798</td> <td>1.074</td> <td>1.000</td> </tr>
  <tr> <td>Office &amp; Clerical</td> <td>99,389,298</td> <td>426,788,961</td> <td>397,159,219</td> <td>1.075</td> <td>1.001</td> </tr>
  <tr> <td>Goods &amp; Services</td> <td>310,621,474</td> <td>1,306,502,729</td> <td>1,215,867,802</td> <td>1.075</td> <td>1.001</td> </tr>
  <tr> <td>Miscellaneous</td> <td>178,888,221</td> <td>777,193,201</td> <td>723,500,307</td> <td>1.074</td> <td>1.000</td> </tr>
  <tr> <td>Statewide</td> <td>913,236,770</td> <td>3,906,203,266</td> <td>3,635,715,528</td> <td>1.074</td> <td>1.000</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `busbands`

![[zoo-busbands.png]]

A bus timetable too wide for the page, printed as stacked AM/PM/PM blocks with the stop-name column
repeated in every block. The stop names are bold.

<details>
<summary>Expected Markdown · table 1 of 3</summary>

```markdown
<table>
  <tr> <th>Monday to Friday</th> <th colspan="16">AM</th> </tr>
  <tr> <td><strong>Harborview Terminal</strong></td> <td>6.15</td> <td>6.45</td> <td>7.00</td> <td>7.15</td> <td>7.35</td> <td>7.50</td> <td>8.05</td> <td>8.20</td> <td>8.35</td> <td>8.55</td> <td>9.25</td> <td>9.55</td> <td>10.25</td> <td>10.55</td> <td>11.25</td> <td>11.55</td> </tr>
  <tr> <td><strong>Thistledown Mall</strong></td> <td>6.25</td> <td>6.55</td> <td>7.12</td> <td>7.28</td> <td>7.49</td> <td>8.04</td> <td>8.19</td> <td>8.33</td> <td>8.48</td> <td>9.07</td> <td>9.37</td> <td>10.07</td> <td>10.37</td> <td>11.07</td> <td>11.37</td> <td>12.07</td> </tr>
  <tr> <td><strong>Northgate Plaza</strong></td> <td>6.35</td> <td>7.06</td> <td>7.23</td> <td>7.40</td> <td>8.03</td> <td>8.18</td> <td>8.33</td> <td>8.47</td> <td>9.00</td> <td>9.19</td> <td>9.49</td> <td>10.19</td> <td>10.49</td> <td>11.19</td> <td>11.49</td> <td>12.19</td> </tr>
  <tr> <td><strong>University Quarter</strong></td> <td>6.43</td> <td>7.16</td> <td>7.33</td> <td>7.50</td> <td>8.13</td> <td>8.28</td> <td>8.43</td> <td>8.57</td> <td>9.09</td> <td>9.28</td> <td>9.58</td> <td>10.28</td> <td>10.58</td> <td>11.28</td> <td>11.58</td> <td>12.28</td> </tr>
  <tr> <td><strong>Fenwick Green</strong></td> <td>6.55</td> <td>7.33</td> <td>7.50</td> <td>8.07</td> <td>8.30</td> <td>8.45</td> <td>9.00</td> <td>9.11</td> <td>9.23</td> <td>9.42</td> <td>10.12</td> <td>10.42</td> <td>11.12</td> <td>11.42</td> <td>12.12</td> <td>12.42</td> </tr>
  <tr> <td><strong>Oakford College</strong></td> <td>7.13</td> <td>7.51</td> <td>8.08</td> <td>8.25</td> <td>8.48</td> <td>9.03</td> <td>9.18</td> <td>9.29</td> <td>9.41</td> <td>10.00</td> <td>10.30</td> <td>11.00</td> <td>11.30</td> <td>12.00</td> <td>12.30</td> <td>1.00</td> </tr>
</table>
```

</details>

## Requirements

- Each printed block MUST be rendered as its own table, top to bottom.
- The repeated row-label column MUST be kept in every block. It is printed in each one, and it is
  what makes the blocks joinable later.
- The blocks MUST NOT be re-widened into a single `State | Jan…Jun` table, even though the repeated
  key makes the join look obvious.

## How to recognise it

The blocks share their **rows** and differ in their **columns** — the same keys reappear down each
block, with new column headers over them. That is the opposite of [[Column Continuation]], where the
blocks share their columns and the key runs onward from one block to the next.

If the row keys do **not** line up across the blocks, it is not a slice of one wide table at all:
the blocks are separate tables, with no join to look for.

## The asymmetry worth noticing

In [[Column Continuation]], widening is the one shape that is always wrong: it pairs unrelated
records with each other. Here it is the *appealing* option, because the repeated key column gives a
reliable join and no record gets paired with a stranger. The rendering nevertheless stays one table
per printed block: the page printed blocks, and the join is left to whoever consumes the output.

<!-- skill:generate
- When a too-wide table is printed as blocks stacked vertically, each block repeating the same row labels under new column headers, output one <table> per block, top to bottom.
- Keep the repeated row-label column in every block's table.
- Never re-join the blocks into one wide table, even though the row labels match.
-->

<!-- skill:check
- FAIL (MUST) if vertically stacked column blocks that repeat the same row labels are merged into one wide <table>.
- FAIL (MUST) if a block's repeated row-label column is dropped from its table.
-->

## Related

- [[Column Continuation]] — the transpose: blocks side by side, key running onward
- [[Cross-Page Tables]] — blocks split by a page break instead of by width
- [[Repeated Headers and Title Bands]] — a header printed again below data rows opens a new table
