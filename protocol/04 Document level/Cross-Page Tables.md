---
title: Cross-Page Tables
rule_id: tables-cross-page-tables
status: rule
scope: document
tags: [continuation, tables]
---

# Cross-Page Tables

> [!success] ✅ Normative
> A table that runs across a page break MUST be rendered as one fragment per page, each on its own
> page, complete and exactly as that page prints it. Fragments MUST NOT be joined. In the sidecar,
> each fragment MUST carry two continuation flags — *continues from the previous page* and
> *continues onto the next page* — decided at document level, from the pages on both sides of the
> break.

A table runs off the bottom of one page and picks up on the next, sometimes with the headers
repeated, sometimes not, sometimes with "(continued)" in the title.

```text
── page 12 ──                    ── page 13 ──
| State | Rate |                 | State | Rate |   ← header repeated
| AL    | 1.10 |                 | MT    | 0.95 |     (sometimes it isn't)
| …     | …    |                 | …     | …    |
```

## Fragments stay on their pages

- Rows from two pages MUST NOT be merged into one table, unless a join is requested under
  [[Output Options]].
- A header from one page MUST NOT be copied onto another page's fragment. What is printed on a page
  is what that page's fragment holds (**never invent**).
- A cell cut by the page break MUST end at the page boundary; the next page's fragment holds only
  the text visible there. Missing labels or values MUST NOT be repeated to complete either half.
- A printed continuation marker such as `(continued)` is text and MUST be transcribed — see
  [[Continued in the Title]].

Reading a table's true extent needs a page that is not in view, so a join made from one page is a
guess. A fragment with its continuation flags loses nothing and claims nothing false; a wrong join
loses both fragments, and a fused table cannot be split again.

## Continuation flags — a document-level decision

Each table fragment in the sidecar carries two boolean flags, `continuesFromPreviousPage` and
`continuesOnNextPage` (see [[The Sidecar]]). They are decided with both sides of the break in view,
not from one page alone:

- A fragment that ends a page and the fragment that opens the next page are **one table** when the
  second has the same columns and either prints no header, repeats the first one's header, or is
  marked as continued. Then the first MUST have `continuesOnNextPage: true` and the second
  `continuesFromPreviousPage: true`.
- The two flags MUST agree across the break: a fragment flagged as continuing onto the next page
  requires the first table of the next page to be flagged as continuing from the previous one, and
  the reverse.
- A fragment that does not continue across a break MUST have both flags `false`.

```text
page 12  last table     continuesFromPreviousPage: false   continuesOnNextPage: true
page 13  first table    continuesFromPreviousPage: true    continuesOnNextPage: false
```

## Signals worth reading

- A repeated header at the top of the second fragment does **not** mean it is a new table — a
  continued table routinely re-declares its columns after a page break. This is the one place
  where header repetition is not a boundary; see [[Repeated Headers and Title Bands]].
- A second fragment that starts straight into data rows, with no header, is the strongest ordinary
  continuation signal.
- An explicit "(continued)" in the title or at the foot of the page is stronger still.
- A first fragment whose rows run to the foot of the page with no total row supports the reading;
  a closing total row argues against it.

### ✅ **Sample** — `dt1`

![[zoo-dt1.png]]

Page one: the company-relocation table under `Relocations to Pier District by Industry` prints its
`TAMI` band and header row once, and runs to the foot of the page with no closing total. The
italic industry sub-rows of the summary table above are not indented.

<details>
<summary>Expected Markdown · table 2 of 2, excerpt</summary>

```markdown
**Relocations to Pier District by Industry**

<table>
  <tr> <th colspan="5">TAMI</th> </tr>
  <tr> <th>Company</th> <th>SF Leased</th> <th>Year Lease Signed</th> <th>Former Location</th> <th>Industry</th> </tr>
  <tr> <td>Harrowgate Media</td> <td>1,061,000</td> <td>2011</td> <td>Uptown</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Belmore House (new owner of Castellan Inc.)</td> <td>702,500</td> <td>2014</td> <td>Uptown</td> <td>TAMI, Media</td> </tr>
  <tr> <td>AdmarQ</td> <td>661,900</td> <td>2013</td> <td>Uptown</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Sonarfy</td> <td>541,200</td> <td>2017</td> <td>Uptown South</td> <td>TAMI, Technology</td> </tr>
  <!-- … -->
  <tr> <td>NDC Partners</td> <td>192,600</td> <td>2020</td> <td>Uptown; Uptown South; Riverside</td> <td>TAMI, Advertising</td> </tr>
  <!-- … -->
  <tr> <td>Draygo5</td> <td>88,400</td> <td>2013</td> <td>Uptown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Business Ledger</td> <td>85,200</td> <td>2017</td> <td>Uptown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Higher Peak Games</td> <td>84,800</td> <td>2014</td> <td>Uptown South</td> <td>TAMI, Media</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `dt2`

![[zoo-dt2.png]]

Page two: pure data rows continuing it, with **no header row at all**. The fragment is rendered
headerless, exactly as printed — which shows why a per-page fragment can be unreadable alone.

<details>
<summary>Expected Markdown · the table</summary>

```markdown
<table>
  <tr> <td>Bramwell Dynamics</td> <td>58,042</td> <td>2017</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Northgate Media Group</td> <td>58,000</td> <td>2010</td> <td>Midtown</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Solveig Publishing (i.e. Solveig Magazine)</td> <td>55,470</td> <td>2019</td> <td>Midtown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>The Cobalt Bloc</td> <td>55,268</td> <td>2014</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Halloway &amp; Vance</td> <td>52,409</td> <td>2020</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Oceanview Media Systems</td> <td>50,639</td> <td>2019</td> <td>Midtown South</td> <td>TAMI, Technology</td> </tr>
  <tr> <td>Ferrand &amp; Co.</td> <td>49,880</td> <td>2016</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Kettlewell Interactive</td> <td>47,205</td> <td>2021</td> <td>Midtown</td> <td>TAMI, Technology</td> </tr>
  <tr> <td>Vantree Studios</td> <td>45,910</td> <td>2018</td> <td>Midtown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Ashworth Public Affairs</td> <td>44,330</td> <td>2015</td> <td>Midtown South</td> <td>TAMI, Public Relations</td> </tr>
  <tr> <td>Corvane Analytics</td> <td>42,760</td> <td>2019</td> <td>Midtown</td> <td>TAMI, Technology</td> </tr>
  <tr> <td>Millbrook &amp; Sons Media</td> <td>41,015</td> <td>2013</td> <td>Midtown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Larkspur Creative Group</td> <td>39,470</td> <td>2020</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Dunmore Systems</td> <td>37,850</td> <td>2011</td> <td>Midtown</td> <td>TAMI, Technology</td> </tr>
</table>
```

</details>

## Sub-case: headers printed at the bottom too

Some reports print the column headers at both the top and the bottom of each page's block. The
bottom repeat is printed content and MUST be kept, as a row of the fragment (**never drop**).

### ✅ **Sample** — a two-column comparison table continued from the previous page

![[bag-redline-table-continued.png]]

`ORIGINAL` / `REVISION` headers are repeated, and the first row starts mid-sentence in both
columns. The cells hold paragraphs and bulleted lists — see
[[Record Groups and Multi-Line Cells]] for lists inside a cell.

<details>
<summary>Expected Markdown · the table</summary>

```markdown
<table>
  <tr> <th>ORIGINAL</th> <th>REVISION</th> </tr>
  <tr> <td>deposition before an adversary proceeding. The court may at any stage in a particular matter direct that one or more of the other rules in Part VII shall apply. The court shall give the parties notice of any order issued under this paragraph to afford them a reasonable opportunity to comply with the procedures prescribed by the order.</td> <td><ul><li>(a)(3), other pretrial disclosures; and</li><li>(f), mandatory meeting before a scheduling conference.</li></ul>(3) <strong><em>Procedural Order.</em></strong> In issuing any procedural order under this subdivision (c), the court must give the parties notice and a reasonable opportunity to comply.<br/>(4) <strong><em>Perpetuating Testimony.</em></strong> An entity desiring to perpetuate testimony may do so in the manner provided by Rule 7027 for taking a deposition before an adversary proceeding.</td> </tr>
  <tr> <td>(d) TESTIMONY OF WITNESSES. Testimony of witnesses with respect to disputed material factual issues shall be taken in the same manner as testimony in an adversary proceeding.</td> <td><strong>(d) Taking Testimony on a Disputed Factual Issue.</strong> A witness’s testimony on a disputed material factual issue must be taken in the same manner as testimony in an adversary proceeding.</td> </tr>
  <tr> <td>(e) ATTENDANCE OF WITNESSES. The court shall provide procedures that enable parties to ascertain at a reasonable time before any scheduled hearing whether the hearing will be an evidentiary hearing at which witnesses may testify.</td> <td><strong>(e) Determining Whether a Hearing Will Be an Evidentiary Hearing.</strong> The court must provide procedures that allow parties—at a reasonable time before a scheduled hearing—to determine whether it will be an evidentiary hearing at which witnesses may testify.</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a continuation page with no header at all

![[bag-county-totals-continued.png]]

Page 9 of a long list: the first row is the last town of `CALLOWAY`, followed by its total; no
column headers anywhere on the page. The fragment cannot be read without the page before it. Each
bold `… Total` label sits in the town column, with its sum in the count column.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <td>CALLOWAY</td> <td>Town of Brixmoor</td> <td>37</td> </tr>
  <tr> <td> </td> <th data-level="0"><strong>CALLOWAY Total</strong></th> <td><strong>281</strong></td> </tr>
  <tr> <td>ASHFORD</td> <td>Town of Ansville</td> <td>12</td> </tr>
  <tr> <td>ASHFORD</td> <td>Town of Boonhaven</td> <td>3</td> </tr>
  <tr> <td>ASHFORD</td> <td>Town of Bridgewater</td> <td>1</td> </tr>
  <!-- … -->
  <tr> <td>ASHFORD</td> <td>Village of Waterville</td> <td>3</td> </tr>
  <tr> <td> </td> <th data-level="0"><strong>ASHFORD Total</strong></th> <td><strong>102</strong></td> </tr>
  <tr> <td>BRANDYWINE</td> <td>Town of Camillus</td> <td>40</td> </tr>
  <!-- … -->
  <tr> <td>ORLEAND</td> <td>Town of Farmington</td> <td>81</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `(Continued)` at the foot of the page

![[bag-municipal-continued-foot.png]]

A statement of net assets that ends with `Total assets` and then prints `(Continued)` at the
bottom right, outside the table: the page itself says the next page carries on. The marker is kept
as a line after the table. The stub prints four indent positions.

<details>
<summary>Expected Markdown · excerpt, head and foot of the table</summary>

```markdown
Business-type Activities Enterprise Funds

<table>
  <tr> <th> </th> <th>Airport System</th> <th>Convention &amp; Entertainment</th> <th>Water &amp; Sewer</th> </tr>
  <tr> <td colspan="4" data-level="0"><strong>Assets</strong></td> </tr>
  <tr> <td data-level="2">Equity in pooled cash and investments</td> <td>$ 9,812</td> <td>$ 26,940</td> <td>$ 68,331</td> </tr>
  <!-- … -->
  <tr> <th data-level="1">Total capital assets</th> <td>2,430,124</td> <td>379,446</td> <td>6,574,030</td> </tr>
  <tr> <td data-level="2">Less accumulated depreciation</td> <td>(661,290)</td> <td>(88,410)</td> <td>(2,761,904)</td> </tr>
  <tr> <td data-level="1">Net capital assets</td> <td>1,768,834</td> <td>291,036</td> <td>3,812,126</td> </tr>
  <tr> <th data-level="1">Total noncurrent assets</th> <td>2,456,993</td> <td>1,021,923</td> <td>4,544,335</td> </tr>
  <tr> <th data-level="2">Total assets</th> <td>$ 2,485,555</td> <td>$ 1,059,753</td> <td>$ 4,680,527</td> </tr>
</table>

(Continued)

<!-- … -->
```

</details>

### ✅ **Sample** — a cell cut by the page break

![[bag-budget-cell-split-across-pages.png]]

A two-row table whose second `Brief Description` cell ends mid-sentence at the foot of the page
— `as these services are also` — with the rest on the next page. The row, not just the table,
is split. Each page's fragment keeps only that page's visible text.

<details>
<summary>Expected Markdown · this page's fragment</summary>

```markdown
<table>
  <tr> <th>Program Name</th> <th>$ Change from 2025 Enacted (in millions)</th> <th>Brief Description of Program and Recommended Reduction or Increase</th> </tr>
  <tr> <td>Office of Coastal Water Systems (OCWS)</td> <td>-4,215</td> <td>The Budget restructures OCWS to concentrate its work on the systems that serve the most residents. Over the last decade, the Office has taken on a growing portfolio of small, overlapping grants that are costly to administer and difficult to evaluate. An internal review found that many awards were made without clear performance targets, and that a number of grantees could not show how funds had been used. The Budget proposes to consolidate these grants into three focus areas: drinking-water treatment upgrades, stormwater and flood resilience, and lead service line replacement. Each focus area would carry measurable outcomes and a public progress report. The Budget also ends funding for the Estuary Demonstration Program (-$212 million), which has not produced results that could be applied elsewhere, the Harbor Monitoring Pilot (-$88 million), the Regional Water Planning Councils (-$140 million), and the Small Systems Outreach Network (-$176 million). Technical assistance now delivered through these programs would be offered through the three focus areas instead, so that communities apply once rather than several times. The Budget maintains $9 billion for capital grants to water and wastewater utilities.</td> </tr>
  <tr> <td>Regional Library and Archive Grants (RLAG) Eliminations</td> <td>-1,065</td> <td>The Budget proposes to wind down RLAG, which funds local library and archive projects through a competitive process. Many of the funded activities, such as digitizing local records and extending opening hours, are already supported by county and municipal budgets. The Budget eliminates the Community Reading Rooms Program, the Local History Preservation Program, and the Mobile Library Services Program. These programs either duplicate other public spending or are too small to have a statewide impact. These eliminations also return decisions to local governments, as these services are also</td> </tr>
</table>
```

</details>

<!-- skill:generate
- Render each page's part of a table on that page only, complete and exactly as printed; never merge rows from two pages into one table unless a join is requested.
- Never copy a header row from another page onto a fragment that prints none; a headerless fragment stays headerless.
- If a cell's text is cut by the page break, end it where the page ends and put only the visible remainder in the next page's fragment.
- Keep a header row repeated at the bottom of a page's block as a row of that fragment, and keep printed "(continued)" markers as text.
- When returning a sidecar, look at both sides of each page break: if the last table of a page continues as the first table of the next (same columns; no header, a repeated header, or a continued marker), set continuesOnNextPage: true on the first and continuesFromPreviousPage: true on the second; otherwise false.
-->

<!-- skill:check
- FAIL (MUST) if rows printed on two different pages are rendered inside one <table> without a requested join.
- FAIL (MUST) if a fragment carries a header row that its own page does not print, or a cut cell contains text printed on the other page.
- FAIL (MUST) if a sidecar is present and a table continuing across a page break lacks continuesOnNextPage: true on the first fragment and continuesFromPreviousPage: true on the second.
- FAIL (MUST) if the continuation flags on the two sides of a page break disagree.
- WARN (SHOULD) if a header row repeated at the bottom of a page's block is missing.
-->

## Related

- [[Continued in the Title]] — the explicit marker, the strongest continuation signal
- [[Repeated Headers and Title Bands]] — on one page, a repeated header is a boundary
- [[The Sidecar]] — where the continuation flags are carried
- [[Output Options]] — whether a join can be requested
