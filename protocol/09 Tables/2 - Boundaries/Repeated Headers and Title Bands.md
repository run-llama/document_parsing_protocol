---
title: Repeated Headers and Title Bands
rule_id: tables-repeated-headers-and-title-bands
status: rule
scope: page
tags: [tables, boundaries, headers]
---

# Repeated Headers / Title Bands Mid-Page

> [!success] ✅ Normative
> Within one page, a column-header row printed again after data rows MUST close the table and open
> a new one at the repeat. Header repetition is the table-boundary signal.

```text
| State | Rate |
| AL    | 1.10 |
| State | Rate |   ← header printed again after data rows:
| MT    | 0.95 |     the first table ends, a second starts here
```

## Requirements

- A re-declared header row MUST start a new table. The rows under it belong to that new table, not
  to the one above.
- An entity or geography band that reappears as a title bar before each block likewise MUST open a
  new table each time it appears.
- The repeated header MUST be kept: it is printed, so it is the new table's header row.
- Two tables separated by a repeated header MUST NOT be fused, even where they read as one series
  broken up for layout.

### ✅ **Sample** — `busbands`

![[zoo-busbands.png]]

The *Monday to Friday* band with its AM/PM label reappears as a title bar before each stacked
block, so each block is its own table.

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

### ❌ **Counter-sample** — `2021-q3-consensus-poll-calculation`

![[zoo-2021-q3-consensus-poll-calculation.png]]

Four period blocks that look like one table whose headers reappear after each data group. Each
block has its own `Period` title and participant count above its header, so each is a **wholly
separate table** — the title and count form its opening `<caption>` rather than data rows.

<details>
<summary>Expected Markdown · excerpt, block 1 of 4</summary>

```markdown
<table>
  <caption><strong>Period</strong> Q3 2031
<em>Number of participants:</em> 9</caption>
  <tr> <th> </th> <th>Sales million EUR</th> <th>Gross profit margin %</th> <th>EBIT margin %</th> <th>Net result million EUR</th> </tr>
  <tr> <td>Average</td> <td><strong>142.6</strong></td> <td><strong>39.4%</strong></td> <td><strong>18.6%</strong></td> <td><strong>25.7</strong></td> </tr>
  <tr> <td>Median</td> <td><strong>144.0</strong></td> <td><strong>39.3%</strong></td> <td><strong>19.0%</strong></td> <td><strong>25.1</strong></td> </tr>
  <tr> <td>High</td> <td><strong>147.2</strong></td> <td><strong>39.8%</strong></td> <td><strong>20.4%</strong></td> <td><strong>36.9</strong></td> </tr>
  <tr> <td>Low</td> <td><strong>118.3</strong></td> <td><strong>39.0%</strong></td> <td><strong>14.2%</strong></td> <td><strong>15.6</strong></td> </tr>
</table>
```

</details>

## Read it against the mirror case

If two fragments share a header that is **not** repeated, they are one table — see
[[Split Tables Sharing a Header]]. Together, the two rules make header repetition the single
boundary signal, decidable from what is printed without judging what the rows mean. An exception
for a case that "obviously" continues weakens both rules and MUST NOT be made.

## Across a page break

Across a page break, a repeated header is routine and says nothing about whether the table ended.
That case is governed by [[Cross-Page Tables]], not by this rule; within one page, a repeat is a
boundary.

<!-- skill:generate
- Within a page, when a table's column-header row (or a title band naming an entity or region) is printed again below data rows, end the table and start a new <table> at the repeat, keeping the repeated header as the new table's header row.
- Never merge such blocks into one table, even if they look like one series.
- A header repeated at the top of a new page does not by itself start a new table.
-->

<!-- skill:check
- FAIL (MUST) if a header row (or title band) printed again below data rows on the same page is rendered inside the same <table> as the rows above it.
- FAIL (MUST) if a repeated header row is dropped instead of becoming the new table's header row.
-->

## Related

- [[Split Tables Sharing a Header]] — the mirror case: an unrepeated shared header joins fragments
- [[Cross-Page Tables]] — a header repeated after a page break is not a boundary
- [[Column Continuation]] — side-by-side blocks, each with its own header copy
