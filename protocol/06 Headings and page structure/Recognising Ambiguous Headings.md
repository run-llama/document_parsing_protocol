---
title: Recognising Ambiguous Headings
rule_id: headings-recognising-ambiguous-headings
status: rule
scope: page
tags: [rule, headings, structure]
---

# Recognising Ambiguous Headings

> [!success] ✅ Normative
> A standalone structural title that organises what follows MUST be rendered as a heading. Run-in
> labels, repeated item labels, captions and page furniture MUST keep their own roles and MUST NOT
> be rendered as headings. Font size alone MUST NOT decide whether a line is a heading.

What a line does decides its role; its depth is chosen afterwards. A short bold line can organise a
section; a large banner can belong entirely to a form or a table.

```text
Company name over a title    ← its own line, above the heading
Company name alone           ← furniture
Document title               ← heading
Standalone section title     ← heading
Bold label: value or sentence ← inline label
Table 1: ...                 ← caption
```

Heading depths in the samples below are relative wherever the crop does not show the outline above
the heading: the rendering keeps the hierarchy the crop shows, and the absolute level comes from
[[Heading Depth Across Pages]].

## Run-in labels

A label followed on the same line by a sentence, value or URL MUST stay inline, with its printed
emphasis preserved. A line that wraps onto another line remains the same paragraph. See
[[Run-In Headings]].

### ✅ **Sample** — run-in labels 1

![[headings-01.jpg]]

“(a) PROHIBITED USES.” stays inline with its sentence; its small capitals are transcribed as
capitals. The standalone “Rule 410. Pleas, Plea Discussions, and Related Statements” is a heading.
The crop clips item (3), which is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
## Rule 410. Pleas, Plea Discussions, and Related Statements

(a) PROHIBITED USES. In a civil or criminal case, evidence of the following is not admissible against the defendant who made the plea or participated in the plea discussions:

(1) a guilty plea that was later withdrawn;

(2) a nolo contendere plea;

<!-- … -->
```

</details>

### ✅ **Sample** — run-in labels 2

![[headings-02.jpg]]

“Consumer Banking and Lending” stays in its paragraph: the sentence continues immediately after
the bold, underlined label. The line below the paragraph is outside this example and is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<u>**Consumer Banking and Lending**</u> offers diversified financial products and services for consumers and small businesses. These financial products and services include checking and savings accounts, credit and debit cards, as well as home, auto, personal, and small business lending. We also provide personalized wealth management and financial planning services through our branch channel.

<!-- … -->
```

</details>

### ✅ **Sample** — run-in labels 3

![[headings-03.jpg]]

“Original Article:” stays with its URL as a label–value line. The red of the label is decoration
and is not carried; the URL is raw text.

<details>
<summary>Expected Markdown</summary>

```markdown
Critics have singled out the trilogy's closing aria as a significant and memorable contribution to contemporary opera.

<u>**Original Article:**</u> https://www.caldrivane.example/culture/2025/09/17/mira-solano-elric-vantana-music-reviews
```

</details>

## Standalone subheads

A standalone title that organises the paragraphs or bullets below it MUST be a heading, even at
body-text size. Weight, colour and underlining support the reading; none decides it alone.

### ✅ **Sample** — standalone subheads 1

![[headings-04.jpg]]

“Highlights:” and its subordinate “Summary” are headings; each introduces the bullet block below.
“Summary” is one level deeper than “Highlights:”. The quotation above is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

## Highlights:

### Summary

* Revenue growth of 9.0% driven by our market-leading network, strong brands and operational focus
* Operating profit before exceptional items increased by 26.7% to €4,443 million (2023: €3,507 million) as we continue to execute our transformation programme
* Structural improvements delivering a world-class operating margin before exceptional items of 13.8% (2023: 11.9%)
* Free cash flow of €3,556 million, after investing €2,816 million into the business
* Return on invested capital of 17.3%, as a result of disciplined capital allocation
* Delivering sustainable value creation for our shareholders
```

</details>

### ✅ **Sample** — standalone subheads 2

![[headings-05.jpg]]

“Risk weighted assets” is a heading: its own line introduces the following prose.

<details>
<summary>Expected Markdown</summary>

```markdown
…primarily as a result of increased utilisation of wholesale credit protection vehicles, which has now been curtailed.

## Risk weighted assets

Retail Banking risk weighted assets have increased by £4.2 billion, principally as a result of movements in the mortgage assets which carry a 50% risk weighting. These include £3.1 billion of RWAs relating to net lending and the transfer of social housing assets equating to £1.7 billion RWAs from Wholesale Banking partially offset by the net impact of mortgage asset securitisations.

Wholesale Banking risk weighted assets have decreased by £9.2 billion due to asset portfolio disposals and the transfer of Social Housing to Retail Banking, offset by the transfer in of £1.1 billion of bond related risk weighted assets previously…
```

</details>

### ✅ **Sample** — standalone subheads 3

![[headings-06.jpg]]

“Strong cash performance” is a heading. Colour does not prevent the line from organising its
bullets. `one-off` breaks at its own hyphen and keeps it.

<details>
<summary>Expected Markdown</summary>

```markdown
…offset by increased interest costs and higher tax charge. Adjusted earnings per share increased 19% at constant exchange rates.

## Strong cash performance

* Operating cash flow increased £211m to £337m (H1 2025: £126m), driven by movements in working capital, including payment timing benefits expected to reverse in H2, and the one-off proceeds from the settlement of a US insurance policy.
* Free cash flow remained strong, increasing by £103m to £259m (H1 2025: £156m), driven by the strong operating cash performance. This was partially offset by the normalisation of cash interest and tax payments following the one-off state aid refund received in the prior period.
```

</details>

### ✅ **Sample** — standalone subheads 4

![[headings-07.jpg]]

“Restatement of operating costs” is a heading; it introduces the paragraphs below it.

<details>
<summary>Expected Markdown</summary>

```markdown
…related Disclosures have been issued but not yet endorsed by the UK authorities. We will continue to monitor new disclosure requirements and update our disclosures as part of the TCFD reporting where relevant.

## Restatement of operating costs

During FY25, following the roll-out of a new payroll system, we have identified employee pension contributions were incorrectly included in employer pension costs and should have been recorded as gross wages and salaries. Additionally, sales commissions were omitted from wages and salaries, being recognised in 'sales commissions'.

In FY24, following completion of a finance system transformation, we have more granular information with which to better align cost allocations with our accounting policies. As a result, we have identified certain reclassifications…
```

</details>

## Numbered titles and numbered paragraphs

A printed number or letter MUST stay with the standalone section title it numbers. A number opening
a body sentence is a list marker. A number on a line by itself does not turn its paragraph into a
section. See [[Numbered Section Headings]].

### ✅ **Sample** — numbered titles and numbered paragraphs 1

![[headings-08.jpg]]

“d. Employees and Volunteers” is a heading, with the printed letter attached. A faint diagonal
watermark, only partly legible in the crop, is left out of this excerpt.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

…be held responsible for claims filed for Worker's Compensation under RCW Title 51 by the Contractor or its employees under such laws and regulations.

## d. Employees and Volunteers

Insurance required of the Contractor under the Contract shall include coverage for the acts and omissions of the Contractor's employees and volunteers. In addition, the Contractor shall ensure that all employees and volunteers who use vehicles to transport clients or deliver services have personal automobile insurance and current driver's licenses.
```

</details>

### ✅ **Sample** — numbered titles and numbered paragraphs 2

![[headings-09.jpg]]

“25.” stays with the sentence it numbers; the numbered paragraph is not promoted to a heading. The
centred title below it, printed on two lines, is one heading (see [[Stacked Headings]]).

<details>
<summary>Expected Markdown</summary>

```markdown
25. As a result, Borvika Holdings has been unjustly enriched at the expense of Ostrevane Systems Inc., to the extent of $98,000, and it is against equity and good conscience to allow Borvika Holdings to retain the benefits bestowed upon it as alleged here.

## AS AND FOR A FIFTH (ALTERNATIVE) CAUSE OF ACTION FOR MONEY HAD AND RECEIVED
```

</details>

## Repeated item labels

Repeated Question, Interrogatory and Request for Production labels MUST stay with their items, even
when bold and on their own lines. Each label MUST NOT be made a document heading.

### ✅ **Sample** — repeated item labels 1

![[headings-10.jpg]]

“INTERROGATORY NO. 8:” is the label of its question, like the next interrogatory label below it.
It is printed bold, underlined and in small capitals, which are transcribed as capitals.

<details>
<summary>Expected Markdown</summary>

```markdown
<u>**INTERROGATORY NO. 8:**</u>

On the average, how many hours per day do you currently spend with your spouse?

<u>**INTERROGATORY NO. 9:**</u>
```

</details>

## Document titles and company lines

A document title MUST be separated from its logo, company-name line and exhibit label. The
surrounding words are transcribed as furniture; only the title takes a heading role. A company name
MUST NOT be joined to a title merely because they are stacked.

### ✅ **Sample** — document titles and company lines 1

![[headings-11.jpg]]

“Benefits Terms of Service” is the document title. The Zendra logo — a small icon over the
wordmark — and “Exhibit D” stay separate; the logo becomes `[logo: Zendra]`. The title is
shown at the top level of the exhibit.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
[logo: Zendra]

**Exhibit D**

# Benefits Terms of Service

If Customer purchases Arvex Works Benefits Products (as detailed in an Order), these additional Benefits Terms of Service (the “**Benefits Terms of Service**”) apply. These Benefits Terms of Service set forth the terms and conditions under which Zendra will provide the Arvex Works Benefits Products (the “**Benefits Services**”) to Customer in
<!-- … -->
```

</details>

### ✅ **Sample** — document titles and company lines 2

![[headings-12.jpg]]

“BOARD OF DIRECTORS GOVERNANCE PRINCIPLES” is the title. “BORVIKA LLC” stays a separate company
line. The printed rule under the title is a separator.

<details>
<summary>Expected Markdown</summary>

```markdown
**BORVIKA LLC**

# BOARD OF DIRECTORS GOVERNANCE PRINCIPLES

<hr/>

## 1. INTRODUCTION

The Board of Directors (the “Board”) of Borvika LLC (the “Company”) has adopted these Governance Principles to assist the Board in the exercise of its duties and responsibilities.
```

</details>

## Principal statement and schedule titles

The principal title of a financial statement or numbered schedule is structural and MUST be a
heading. The company line and the units or audit-status line MUST stay separate. This is a
specific exception to the caption rule below: a statement or schedule can itself be a document
section.

A numbered schedule title remains structural when printed inside a grid. Its text MUST appear once,
in its printed table position; it keeps its heading role in the element classes and boxes (see
[[Boxes and Granularity]]) and MUST NOT be duplicated as a Markdown heading outside the table.
[[Titles Banners Captions]] governs its cell placement.

### ✅ **Sample** — principal statement and schedule titles 1

![[headings-13.jpg]]

“CONDENSED CONSOLIDATED BALANCE SHEETS” is the statement heading. The company name and the
parenthesised units line stay separate. The table beneath is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
**CORVANE MEDIA CORPORATION**

## CONDENSED CONSOLIDATED BALANCE SHEETS

**(unaudited; $ in millions, except per share data)**

<!-- … -->
```

</details>

### ✅ **Sample** — principal statement and schedule titles 2

![[headings-14.jpg]]

“Operating Income by Geographic Market” is the statement heading. “Marlowick Consulting plc”, the
currency units and the audit status stay outside the heading. The table beneath is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
**Marlowick Consulting plc**

## Operating Income by Geographic Market

*(In thousands of U.S. dollars)*

*(Unaudited)*

<!-- … -->
```

</details>

### ✅ **Sample** — principal statement and schedule titles 3

![[headings-15.jpg]]

“11. SOFTWARE DEVELOPMENT EXPENSES” is a structural schedule title in its printed grid position:
a full-width row of the table, not a Markdown heading. The company line is separate furniture. The
blue of the current-year figures is decoration. The crop ends after `Staff welfare`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
**PALMERIN SOFTWARE LIMITED**

*in local units, millions*

<table>
  <tr> <th>Schedules to the Profit and Loss Account for the</th> <th colspan="2">Quarter ended March 31,</th> <th colspan="2">Half-year ended March 31,</th> <th colspan="2">Year ended March 31,</th> </tr>
  <tr> <th></th> <th>2002</th> <th>2001</th> <th>2002</th> <th>2001</th> <th>2002</th> <th>2001</th> </tr>
  <tr> <th colspan="7">11. SOFTWARE DEVELOPMENT EXPENSES</th> </tr>
  <tr> <td>Salaries and bonus including overseas staff expenses</td> <td>256.30</td> <td>177.67</td> <td>509.13</td> <td>348.36</td> <td>976.11</td> <td>605.51</td> </tr>
  <tr> <td>Staff welfare</td> <td>1.27</td> <td>2.56</td> <td>2.69</td> <td>4.67</td> <td>6.14</td> <td>7.63</td> </tr>
  <!-- … -->
</table>
```

</details>

## Table captions and bands

An ordinary table caption, coloured title band, repeated caption stack or column label MUST NOT
enter the document outline. A `Table N` caption remains a caption even when its typography
resembles a heading or it appears in a PDF outline. The principal-statement exception above applies
only to an actual statement or schedule section.

Captions stay outside the table and title bands inside it, as [[Titles Banners Captions]] requires.
The same title MUST NOT be emitted both as a cell and as an outside heading.

### ✅ **Sample** — table captions and bands 1

![[headings-16.jpg]]

“Free Cash Flow and Free Cash Flow Dividend Payout Ratio” is the table's title band, inside the
table.

<details>
<summary>Expected Markdown</summary>

```markdown
cash is generated by routine business operations, including capital expenditures and vendor financing, and makes decisions based on it. Management also views free cash flow as a measure of cash available to pay debt and return cash to shareowners.

<table>
  <tr> <th colspan="5">Free Cash Flow and Free Cash Flow Dividend Payout Ratio</th> </tr>
  <tr> <th><em>Dollars in millions</em></th> <th></th> <th></th> <th></th> <th></th> </tr>
  <tr> <th></th> <th colspan="2">Second Quarter</th> <th colspan="2">Six-Month Period</th> </tr>
  <tr> <th></th> <th>2026</th> <th>2025</th> <th>2026</th> <th>2025</th> </tr>
  <tr> <td>Net Cash Provided by Operating Activities from Continuing Operations</td> <td>$ 10,801</td> <td>$ 9,763</td> <td>$ 18,396</td> <td>$ 18,812</td> </tr>
  <tr> <td>Less: Distributions from Fennick Media classified as operating activities</td> <td>—</td> <td>(503)</td> <td>—</td> <td>(1,926)</td> </tr>
</table>
```

</details>

### ✅ **Sample** — table captions and bands 2

![[headings-17.jpg]]

“Ondrea Group. Summarized income statement” is the local table caption, with its units line
separate; a caption is not promoted merely because it names a statement. `Change` over `%` is one
wrapped header label. The paragraph above the caption is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

**Ondrea Group. Summarized income statement**

*EUR million*

<table>
  <tr> <th></th> <th>Q2’26</th> <th>Q1’26</th> <th>Change %</th> <th>H1’26</th> <th>H1’25</th> <th>Change %</th> </tr>
  <tr> <td>Net interest income</td> <td>11,692</td> <td>11,019</td> <td>6.1</td> <td>22,711</td> <td>21,211</td> <td>7.1</td> </tr>
</table>
```

</details>

### ✅ **Sample** — table captions and bands 3

![[headings-18.jpg]]

The “Portfolio Detail Statistics” stack stays with its table as caption text; its lines do not
become heading levels.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
Portfolio Detail Statistics as of June 30, 2026
International common stock
10 Largest Holdings in Descending Order by Fair Value
(Dollar Amounts and Shares in Thousands)

<table>
  <tr> <th>Description</th> <th>No. of Shares</th> <th>Fair Value ($)</th> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — table captions and bands 4

![[headings-19.jpg]]

“Table 1: Milestones achieved since the prior results announcement” is a caption. “Results
highlights” organises the section above it and is a heading. The crop clips the table after its
second row.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
## Results highlights

Table 1: Milestones achieved since the prior results announcement
Phase III and other registrational data readouts

<table>
  <tr> <th>Medicine</th> <th>Trial</th> <th>Indication</th> <th>Event</th> </tr>
  <tr> <td><em>Zorvalix</em></td> <td>VOLARA</td> <td>MIBC not candidates for cisplatin</td> <td>Primary endpoint met</td> </tr>
  <tr> <td><em>Zorvalix</em></td> <td>EMBER-2</td> <td>Adjuvant HCC</td> <td>Primary endpoint not met</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — table captions and bands 5

![[headings-20.jpg]]

“Turnover” is a column header. “Growth” is the standalone title above the table and is a heading.

<details>
<summary>Expected Markdown</summary>

```markdown
## Growth

<table>
  <tr> <th>(unaudited)</th> <th>Turnover</th> <th>USG</th> <th>UVG</th> <th>UPG</th> <th>A&amp;D</th> <th>Currency</th> <th>Turnover change</th> </tr>
  <tr> <td><strong>First Half</strong></td> <td><strong>€25.6bn</strong></td> <td><strong>4.8%</strong></td> <td><strong>4.2%</strong></td> <td><strong>0.6%</strong></td> <td><strong>0.7%</strong></td> <td><strong>(4.9)%</strong></td> <td><strong>0.5%</strong></td> </tr>
  <tr> <td>Second Quarter</td> <td>€13.0bn</td> <td>5.8%</td> <td>5.5%</td> <td>0.2%</td> <td>0.6%</td> <td>(2.4)%</td> <td>3.8%</td> </tr>
</table>

Underlying sales growth (USG) in the first half was 4.8%, with 4.2% from volume and 0.6% from price, accelerating in the
```

</details>

## Chart titles and text-column titles

A title naming a chart is part of that chart. A standalone title organising a text column or
explanatory block below or beside the charts MUST be a heading.

### ✅ **Sample** — chart titles and text-column titles 1

![[headings-21.jpg]]

“Fourth Quarter 2025” and “Full Year 2025” are headings, peers, for the text columns beneath the
charts. The two charts and their legend are elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

## Fourth Quarter 2025

* Revenue grew 10%, or 7% on an organic constant currency basis, versus the prior-year period, including 8% growth in Advisory Solutions, 6% in Market Research and 8% in Data Services, each on a reported basis.

## Full Year 2025

* Revenue grew 10%, or 8% on an organic constant currency basis, versus the prior-year period, with a favorable foreign currency impact of 1%.
* Recurring revenue grew 12% on a reported and 9% on an organic constant currency basis.
```

</details>

## Slides and embedded forms

The principal slide title and a real subtitle are structural titles and MUST be headings.
Navigation sidebars, tabs, warning banners and form section labels are furniture or form labels
and MUST NOT be headings. Titles inside an embedded form screenshot MUST NOT enter the containing
slide's outline; their printed text MUST be kept in the embedded content.

### ✅ **Sample** — slides and embedded forms 1

![[headings-22.jpg]]

“Caldrivane submission schedule” is the slide title and “Supplementary indications for existing
brands” its subtitle. “Content” stays in the navigation sidebar. The navigation tabs print no text.
Depths assume the file is a deck, where each slide title is top level.

<details>
<summary>Expected Markdown</summary>

```markdown
**Content**

Click below to navigate through the document

Company overview

# Caldrivane submission schedule

## Supplementary indications for existing brands
```

</details>

### ✅ **Sample** — slides and embedded forms 2

![[headings-23.jpg]]

The form title, warning banner and subcontractor-section label stay inside the embedded form
content, outside the containing slide's outline: none of them is a heading. The instructions box
and the code list are elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
CaldrivaneMetro

**SCHEDULE C.2: Disadvantaged Business Enterprise (DBE)**
**Subcontractor Participation & Intent to Perform (Other Subcontract Services)**

11/2024

<u>**DO NOT RECREATE OR CHANGE THIS DOCUMENT**</u>

<!-- … -->

- **Prime Contractor:** [blank]
- **Project Name:** [blank]
- **IFB/RFP/SOQ#:** [blank]
- **Firm's Age:** [blank]
- **Firm's Annual Gross Receipts ($):** [blank]
- **Contact Name:** [blank]
- **Title:** [blank]
- **Phone#:** [blank]
- **Email Address:** [blank]
- **Address:** [blank]

<!-- … -->

**Subcontractor Section (Other Subcontract Services)**

<!-- … -->

***COMPLETE THIS FORM FOR ALL SUBCONTRACTORS IDENTIFIED FOR THIS PROJECT. YOU MAY USE MULTIPLE FORMS.***
```

</details>

## Running headers and decorative marks

Whether a page-top label is a running header is a document decision, made in
[[Recurring Page Furniture]]: the same words may have been a section heading where the section
began, and repetition at a page boundary does not open it again. From one page alone, a margin
label that carries no argument of its own is furniture. A purely decorative arrow before a heading
MUST be omitted from the heading text; a printed section number MUST be kept.

### ✅ **Sample** — running headers and decorative marks 1

![[headings-24.jpg]]

When “Consolidated Financial Statements” repeats at the page top, it is a running header: a band
paragraph, not a heading. The repetition is established on the surrounding pages; this crop alone
does not establish it. The Markdown shown assumes it does.

<details>
<summary>Expected Markdown</summary>

```markdown
**Consolidated Financial Statements**
```

</details>

### ✅ **Sample** — running headers and decorative marks 2

![[headings-25.jpg]]

“19. Personnel expenses” is the heading text. The decorative arrow to its left is excluded. The
table beneath is cut by the crop.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
## 19. Personnel expenses

Personnel expenses are made up as follows:

<table>
  <tr> <th></th> <th>2002<br/>T-€</th> </tr>
  <!-- … -->
</table>
```

</details>

## Depth comes after role

Heading levels MUST be the document-absolute levels of [[Heading Depth Across Pages]]. When only
one page is available, the relative hierarchy the page shows MUST be kept consistent. The first
heading on a page MUST NOT be assumed to be the top level, and a level that is common elsewhere
MUST NOT be assumed for this page. Whether the deck convention applies is decided once for the file
in [[Document Type]]; a level MUST NOT be copied from another document.

<!-- skill:generate
- Make a line a # heading only if it is a standalone title that organises the content after it (a document, statement, schedule, section or slide title); never decide by font size alone.
- Keep bold or coloured labels followed on the same line by text, a value or a URL inside their paragraph: "**Original Article:** https://…".
- Keep "Question N", "Interrogatory No. N:" and "Request for Production N" labels, table captions ("Table 1: …"), title bands, column labels, running headers, sidebars and form section labels as ordinary text, never as headings.
- Keep a company line, exhibit label, [logo: …] marker and units line as separate paragraphs around the title heading; keep a printed section number in the heading ("## 19. Personnel expenses") but drop a decorative arrow.
- A statement or schedule title printed inside a table stays once, in its table row, and is not repeated as a heading outside the table.
- Keep heading levels consistent with the hierarchy the page shows; do not make the first heading on a page # by default.
-->

<!-- skill:check
- FAIL (MUST) if a run-in label, repeated item label, table caption, title band, column label, running header or form label is rendered as a heading.
- FAIL (MUST) if a standalone title that organises following paragraphs or bullets is rendered as plain text rather than a heading.
- FAIL (MUST) if a title printed inside a table grid appears both in the table and as a heading outside it.
- FAIL (MUST) if a company line, exhibit label or units line is merged into a title heading that the page separates from it.
- FAIL (MUST) if a heading is deeper or shallower than its visible parent or sibling headings imply (a subsection at or above its parent's level).
- WARN (SHOULD) if a decorative arrow or ornament is kept in heading text, or a printed section number is dropped from it.
-->

## Related

- [[Heading Depth Across Pages]] — choose the level after deciding that a line is a heading
- [[Recurring Page Furniture]] — the document-wide call on repeated page-top labels
- [[Run-In Headings]] — a label kept within its paragraph
- [[Numbered Section Headings]] — numbered titles versus numbered content
- [[Titles Banners Captions]] — table titles kept once, in their printed position
