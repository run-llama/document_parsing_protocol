---
title: Is This Even a Table
rule_id: tables-is-this-even-a-table
status: rule
scope: page
tags: [tables, detection, boundaries]
---

# Is This Even a Table?

> [!success] ✅ Normative
> A region MUST be rendered as a table when, and only when, its rows and columns **encode a
> relation** — when the position of a value in the grid is what gives the value its meaning. A
> region that encodes no relation MUST NOT be rendered as a table.

This is the first decision about a region, and every other table rule depends on it. A single page
often shows the whole spectrum at once: real grids, gridded legends, ungridded `label: value` spec
stacks, address blocks, and two-column prose that looks like a grid but is not.

```text
Same page, three regions:

┌─────────────┬───────────────┐      Motor: 1/2 HP, 115V      ← ungridded spec
│ (1) Premium │ Base rate …   │      Speed: 3-speed              stack: table? text?
│ (2) Losses  │ Incurred …    │
└─────────────┴───────────────┘      Acme Corp
  ↑ gridded legend: table?           123 Main St    ← address block: never a table
```

## The test

The question is: **would this be a `<table>` in well-written HTML, or a `<div>` positioned with
CSS?**

A border alone does not make a region a table, and alignment alone is not always enough either. The
relation decides.

| Strong evidence it **is** a table | Strong evidence it is **not** |
| --- | --- |
| explicit row **and** column headers | running prose, however neatly it is set in columns |
| repeated records under a shared schema | address blocks |
| a printed grid, or consistent column tracks running down the block | text sitting beside a logo |
| a legend printed as label/definition records **inside a grid** | decorative alignment with no record schema behind it |

### ❌ **Counter-sample** — `4x`

![[zoo-4x.png]]

The page starts straight into data rows with no header row. Column meaning has to be inferred from
the values, which is the edge of the relation test: repeated records under one schema still make it
a table, and the output MUST NOT invent the missing header row.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <td>N3787500W11567500</td> <td>89001</td> <td>Alamo</td> <td>Lincoln</td> </tr>
  <tr> <td>N3787500W11566500</td> <td>89001</td> <td>Alamo</td> <td>Lincoln</td> </tr>
  <tr> <td>N3787500W11565500</td> <td>89001</td> <td>Alamo</td> <td>Lincoln</td> </tr>
  <tr> <td>N3787500W11564500</td> <td>89001</td> <td>Alamo</td> <td>Lincoln</td> </tr>
  <tr> <td>N3787500W11563500</td> <td>89001</td> <td>Alamo</td> <td>Lincoln</td> </tr>
  <tr> <td>N3787500W11562500</td> <td>89001</td> <td>Alamo</td> <td>Lincoln</td> </tr>
  <!-- … -->
</table>
```

</details>

## Legends and static key-value references are tables

The "Column | Description" box under a rate grid, explaining what (1)–(11) mean, MUST be rendered as
a table.

```text
| Column | Description     |
| (1)    | Earned premium  |
| (2)    | Incurred claims |
```

It looks decorative, but it maps one thing to another, and a mapping is a relation. Omitting it
drops real content off the page.

## Prose and address blocks are never tables

Two-column running prose only *looks* like a grid — its columns carry no meaning, they are a
typesetting choice. The same holds for an address block, or a caption stacked beside an image.
These MUST NOT be rendered as tables.

### ❌ **Counter-sample** — `10k`

![[zoo-10k.png]]

A 10-K cover: `Yes ✓ No` check-mark lines and an address block, both column-shaped, neither
tabular. The genuine table is the small *Title of each class / Trading Symbols / Exchange* grid.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
Delaware
State or other jurisdiction of
incorporation or organization

51-0724981
(I.R.S. Employer
Identification No.)

4820 Larkspur Avenue, Hartland, Ohio
(Address of principal executive office)

44902
(Zip Code)

Registrant's telephone number, including area code (440) 555-2100

**Securities registered pursuant to Section 12(b) of the Act:**

<table>
  <tr> <th>Title of each class</th> <th>Trading Symbols</th> <th>Name of each exchange on which registered</th> </tr>
  <tr> <td>Class A Common Stock</td> <td>MDI.A</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>Class B Common Stock</td> <td>MDI.B</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>0.000% Senior Notes due 2025</td> <td>MDI25</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>1.125% Senior Notes due 2027</td> <td>MDI27</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.150% Senior Notes due 2028</td> <td>MDI28</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>1.500% Senior Notes due 2030</td> <td>MDI30</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.000% Senior Notes due 2034</td> <td>MDI34</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>1.625% Senior Notes due 2035</td> <td>MDI35</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.375% Senior Notes due 2039</td> <td>MDI39</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>0.500% Senior Notes due 2041</td> <td>MDI41</td> <td>New York Stock Exchange</td> </tr>
  <tr> <td>2.625% Senior Notes due 2059</td> <td>MDI59</td> <td>New York Stock Exchange</td> </tr>
</table>

**Securities registered pursuant to Section 12(g) of the Act: NONE**

Indicate by check mark if the Registrant is a well-known seasoned issuer, as defined in Rule 405 of the Securities Act. Yes ✓ No

<!-- … -->
```

</details>

### ❌ **Counter-sample** — `xl`

![[zoo-xl.png]]

Two real calculation tables surrounded by narrative paragraphs. The prose is not a table however
neatly it sits between them. Each column header is one label wrapped over two lines, so each is a
single header cell, not a two-row tier (see [[Header Wrap vs Real Tier]]).

<details>
<summary>Expected Markdown · excerpt, table 1 of 2</summary>

```markdown
<u>Line I</u>

The effective income tax rate on investment income is calculated as a weighted average of the effective tax rate on investments and the tax rate for capital gains, with the rates of return used as weights.

<table>
  <tr> <th> </th> <th><u>Rate of Return</u></th> <th><u>Federal Income Tax Rate</u></th> </tr>
  <tr> <td>Net Investment Income Earned</td> <td>1.94%</td> <td>20.8%</td> </tr>
  <tr> <td>Net Realized Capital Gains</td> <td><u>0.05%</u></td> <td><u>21.0%</u></td> </tr>
  <tr> <td> </td> <td>1.99%</td> <td>20.9%</td> </tr>
</table>

The average rate of federal income tax is determined by applying appropriate tax rates to the distribution of investment income earned for the current year for Anchorlight Group.

<!-- … -->
```

</details>

## Label / value blocks without a grid

Two columns of labels and values with no ruled grid are a table or key-value content depending on
the **data**, not the layout. The same two whitespace tracks can hold either.

| The rows are… | Rendering | Examples |
| --- | --- | --- |
| **Records of one kind** — every label is paired with the same kind of value (an amount per component, a factor per year) | a table, even with no header row and no ruled grid | a *Working Capital* panel (see [[Borderless Whitespace Tables]]); the *Trend Factors* block of `wwa` below |
| **Different kinds of fact** — each label names its own field (a filing number, a state, a date) | key-value content — see [[Forms and Key-Value Regions]] | filing metadata, a spec sheet, a biography's `Name:` / `Affiliation:` lines |
| **Headline figures** — labelled KPIs set as tiles or a highlight panel | stat tiles — see [[Stat Tiles]] | `Out-of-home +26.5%` |

A bold label with its value flowing after it — blower spec sheets and similar — is the second kind.

```text
**Motor**: 1/2 HP, 115V      ← no ruled grid, value flows after the label
**Airflow**: 1,200 CFM
```

A stack whose labels name different kinds of fact MUST NOT be rendered as a table unless a ruled
grid is printed around it; it is key-value content, and every line of it MUST still appear in the
output. A stack whose rows are records of one kind MUST be rendered as a table.

### ❌ **Counter-sample** — `ratefiling`

![[zoo-ratefiling.png]]

The SERFF filing metadata is a **label:value stack** — *SERFF Tracking #*, *State* at the top, a
separate *Disposition* block below. Both read as two columns; neither is a table. The two ruled
grids further down the same page are.

<details>
<summary>Expected Markdown · excerpt, table 1 of 2</summary>

```markdown
- **SERFF Tracking #:** MDN-047719203
- **State Tracking #:** [blank]
- **Company Tracking #:** 84332, 84050, 84368, 84074
- **State:** Illinois
- **First Filing Company:** American Merevald Insurance Company, ...
- **TOI/Sub-TOI:** 20.0 Commercial Auto/20.0001 Business Auto
- **Product Name:** IL-CA-84332 ~ IL-CA-84050 ~ IL-CA-84368 ~ IL-CA-84074 - Adoption of ISO's Commercial Automobile Loss Costs and Rules Revision & Commercial Auto Loss Cost Multiplier Revision
- **Project Name/Number:** 84332, 84050, 84368, 84074/

# Disposition

- **Disposition Date:** 09/09/2014
- **Effective Date (New):** 02/01/2015
- **Effective Date (Renewal):** 02/01/2015
- **Status:** Accepted
- **Comment:** [blank]

<table>
  <tr> <th>Company Name:</th> <th>Overall % Indicated Change:</th> <th>Overall % Rate Impact:</th> <th>Written Premium Change for this Program:</th> <th>Number of Policy Holders Affected for this Program:</th> <th>Written Premium for this Program:</th> <th>Maximum % Change (where req'd):</th> <th>Minimum % Change (where req'd):</th> </tr>
  <tr> <td>American Merevald Insurance Company</td> <td>%</td> <td>-1.800%</td> <td>$-8,416</td> <td>62</td> <td>$467,577</td> <td>4.700%</td> <td>-9.900%</td> </tr>
  <tr> <td>American Guaranty and Fidelity Insurance Company</td> <td>%</td> <td>1.900%</td> <td>$26,396</td> <td>57</td> <td>$1,389,273</td> <td>9.600%</td> <td>-7.400%</td> </tr>
  <tr> <td>Colonial Merevald Casualty &amp; Surety Company</td> <td>%</td> <td>0.000%</td> <td>$0</td> <td>0</td> <td>$0</td> <td>0.000%</td> <td>0.000%</td> </tr>
  <tr> <td>Merevald Fidelity and Deposit Company</td> <td>%</td> <td>0.000%</td> <td>$0</td> <td>0</td> <td>$0</td> <td>0.000%</td> <td>0.000%</td> </tr>
  <tr> <td>Merevald American Insurance Company of Illinois</td> <td>%</td> <td>3.900%</td> <td>$22,233</td> <td>87</td> <td>$570,072</td> <td>17.600%</td> <td>-7.200%</td> </tr>
  <tr> <td>Merevald American Insurance Company</td> <td>%</td> <td>0.900%</td> <td>$189,835</td> <td>262</td> <td>$21,092,749</td> <td>9.600%</td> <td>-21.800%</td> </tr>
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — `wwa`

![[zoo-wwa.png]]

The bottom *Trend Factors* block (6th Prior Year … Most Recent Year) has no grid and no header, but
every row is the same kind of record — a year and its trend factor — so it is a table, with its
bold label as text above it. The large premium-trend grid above it and the ruled *Rolling 4-Qtr*
box are tables too.

<details>
<summary>Expected Markdown · excerpt, main table and the Trend Factors block</summary>

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
</table>

<!-- … -->

**Trend Factors:**

<table>
  <tr> <td>6<sup>th</sup> Prior Year</td> <td><strong>1.209</strong></td> </tr>
  <tr> <td>5<sup>th</sup> Prior Year</td> <td><strong>1.178</strong></td> </tr>
  <tr> <td>4<sup>th</sup> Prior Year</td> <td><strong>1.148</strong></td> </tr>
  <tr> <td>3<sup>rd</sup> Prior Year</td> <td><strong>1.118</strong></td> </tr>
  <tr> <td>2<sup>nd</sup> Prior Year</td> <td><strong>1.089</strong></td> </tr>
  <tr> <td>Most Recent Year</td> <td><strong>1.061</strong></td> </tr>
</table>
```

</details>

## Form intertwined with a grid

Rate-filing pages that are half form, half table.

```text
Insurer: [blank]   NAIC #: [blank]     ← form fields…
| Year | Rate change |
| 2024 | +4.2%       |               ← …and a genuine grid, same page
```

The ruled grid region MUST be rendered as a table and the form fields as key-value content, so that
nothing printed is lost. The table MUST NOT be stretched to swallow the form fields, and the grid
MUST NOT be dropped because the page as a whole reads like a form.

## Cases the relation test does not settle on its own

The relation test alone MUST NOT decide these cases; each is governed by its own rule:

- forms and ungridded key-value ([[Forms and Key-Value Regions]])
- trailing totals outside a frame ([[Bottom Edge Totals and Islands]])
- a printed data grid under a chart ([[Chart With a Printed Data Grid]])
- detached aligned cells

## Why the cost runs both ways

A missed legend makes a real relation vanish from the output (**never drop**). A decorative box
rendered as a table asserts structure the page never claimed (**never invent**). Neither error is
recoverable downstream, which is why the relation test — not the border, not the alignment —
decides.

### ❌ **Counter-sample** — two-column author biographies

![[corpus-two-column-bios.png]]

Two columns, each with bold labels — `Name:`, `Affiliation:`, `Address:`, `Main Works:` — and
values beneath them, separated by horizontal rules top and bottom. Every visual cue says table:
aligned label column, ruled boundaries, repeated schema across the two halves.

It is not one. The two columns are **independent biographies**, not two records of one relation,
and the rule lines are section dividers rather than a grid. Reading it as a table would pair
`Marcus Ainsley` with `Priya Delacroix` as though they shared a row.

The label/value blocks inside each column are ungridded key-value content — see
[[Forms and Key-Value Regions]] — and the bulleted publication lists are ordinary lists. The columns
are unrolled in reading order, left biography first.

<details>
<summary>Expected Markdown · excerpt, below the running head</summary>

```markdown
A grey silhouette portrait placeholder.

**Name:**
Marcus Ainsley

**Affiliation:**
Dr. Visiting Lecturer, Information, Production and Systems Research Center, Bramwell University

**Address:**
14-9 Farrowfield, Ashcombe-ku, Renwick 220-0114, Freldova

**Brief Biographical History:**
1998 Received M. Eng. Sci. degree from University of Dunwich
2006 Received Ph.D. degree from Graduate School of Information, Production and Systems, Bramwell University
2006- Visiting Lecturer at Bramwell University

**Main Works:**

- “Layered Rule Induction for Sparse Transaction Streams,” Journal of Applied Adaptive Systems, Vol.9, No.1, pp. 98-107, 2005.
- “Pruning Association Graphs with Bootstrap Confidence Bounds,” In Proc. of the Freldova Conference on Learning Systems, pp. 5220-5226, 2005.

**Membership in Academic Societies:**

- Institute of Electrical and Electronics Engineers (IEEE)
- The Society of Instrument and Control Engineers (SICE)
- The Information Processing Society of Freldova (IPSF)

A grey silhouette portrait placeholder.

**Name:**
Priya Delacroix

**Affiliation:**
Dr. Professor, Graduate School of Information, Production and Systems, Bramwell University

**Address:**
14-9 Farrowfield, Ashcombe-ku, Renwick 220-0114, Freldova

**Brief Biographical History:**
1965 Joined Halloway Corp.
1991- Professor at Renwick University
2001- Professor at Bramwell University

**Main Works:**

- “Cooperative Foraging in Heterogeneous Agent Colonies,” Bramwell Review of Control and Autonomy –Part B–, Vol.34, No.1, pp. 168-182, 2005.
- “A Moment-Based Observer for Granular Mill Loading,” Transactions of the Freldova Control Society, Vol.11, Issue 6, pp. 786-799, November 2003.

**Membership in Academic Societies:**

- Institute of Electrical and Electronics Engineers (IEEE)
- Association for Computing Machinery (ACM)
- The Society of Instrument and Control Engineers (SICE)
```

</details>

<!-- skill:generate
- Render a region as an HTML <table> only when its rows and columns encode a relation: the position of a value in the grid tells what it means (headers, repeated records under one schema, a printed grid or steady column tracks).
- Render a legend or key printed as label/definition records inside a ruled grid as a table.
- Never render two-column prose, address blocks or a caption beside an image as a table. A two-column label/value block with no grid is a table when every row is the same kind of record (an amount per item, a factor per year), and key-value lines when each label names a different kind of fact (form or metadata fields); keep every line either way.
- On a page mixing form fields and a ruled grid, render only the grid as a table and the fields as key-value lines.
- Do not add a header row to a headerless table.
-->

<!-- skill:check
- FAIL (MUST) if running prose, an address block, or a stack of labels naming different kinds of fact is rendered as a <table>.
- FAIL (MUST) if a label/value block whose rows are records of one kind is rendered as loose lines instead of a <table>.
- FAIL (MUST) if a ruled legend or key-value grid printed on the page is missing or rendered only as loose text.
- FAIL (MUST) if a table contains a header row the page does not print.
- FAIL (MUST) if a table is stretched to include form fields printed outside its ruled grid, or a grid is dropped because the page reads like a form.
-->

## Related

- [[Forms and Key-Value Regions]] — where ungridded label:value content goes instead
- [[Borderless Whitespace Tables]] — the "no rules at all" end of the spectrum
- [[Table of Contents]] — a column-shaped region with its own rendering
- [[Header-Only Tables]] — degenerate outputs that follow from getting this decision wrong
