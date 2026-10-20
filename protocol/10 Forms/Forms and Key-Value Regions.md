---
title: Forms and Key-Value Regions
rule_id: forms-forms-and-key-value-regions
status: rule
scope: page
order: 1
tags: [forms]
---

# Forms and Key-Value Regions

> [!success] ✅ Normative
> Fill-in fields and checkbox regions are key-value content, not tables: they MUST be rendered as
> the key-value list of [[The Key-Value List]] and MUST NOT be rendered as a table. The output MUST
> NOT contain a two-column key/value table that the page does not print as a ruled grid.

Form controls printed on the page — labels waiting for a value, checkbox rows, signature and date
lines — look tabular because they line up in columns. They are not tables: the alignment is
typesetting, not structure.

```text
Insurer: ________        NAIC #: ________
☒ Renewal     ☐ New business
```

```markdown
- **Insurer:** [blank]
- **NAIC #:** [blank]
- [x] Renewal
- [ ] New business
```

## Fillable or static

A region is **form content** when it prints labelled fields to fill, checkboxes, or blanks —
**even when its layout looks like a plain grid of labels and values**. Such a region MUST be
rendered as a key-value list.

A **static key-value reference** — a legend, a specification sheet, a summary box, filing
metadata — prints fixed labels and values and **nothing to fill in and no checkbox**. It is not a
form. The test is whether anything on it was meant to be filled in.

## The border test for static key-value blocks

A page that raises this question is usually half form, half grid, so the decision is made region
by region. For each static block of `label: value` pairs:

| The block | Rendering |
| --- | --- |
| **Printed inside a ruled border** (a gridded key/value block) | It MUST be rendered as a table, per [[Is This Even a Table]]; leaving it out drops a table. |
| **Not ruled** — a specification stack, a cluster of `Label: value` fields above a table, an address block, a prose-line legend | It MUST be rendered as text in reading order and MUST NOT be rendered as a table. |

A totals block printed under a table is the one exception: it belongs to the table above it, not
to the surrounding fields — see [[Bottom Edge Totals and Islands]].

### ✅ **Sample** — `ratefiling`

![[zoo-ratefiling.png]]

SERFF filing metadata as ungridded `Label: value` fields above two genuine ruled tables on the
same page. Nothing on the page is fillable, so the fields are static text lines; only the two
ruled grids are tables.

<details>
<summary>Expected Markdown · excerpt, both tables</summary>

```markdown
<!-- … -->

# Disposition

**Disposition Date:** 09/09/2014

**Effective Date (New):** 02/01/2015

**Effective Date (Renewal):** 02/01/2015

**Status:** Accepted

**Comment:**

<table>
  <tr> <th>Company Name:</th> <th>Overall % Indicated Change:</th> <th>Overall % Rate Impact:</th> <th>Written Premium Change for this Program:</th> <th>Number of Policy Holders Affected for this Program:</th> <th>Written Premium for this Program:</th> <th>Maximum % Change (where req'd):</th> <th>Minimum % Change (where req'd):</th> </tr>
  <tr> <td>American Merevald Insurance Company</td> <td>%</td> <td>-1.800%</td> <td>$-8,416</td> <td>62</td> <td>$467,577</td> <td>4.700%</td> <td>-9.900%</td> </tr>
  <tr> <td>American Guaranty and Fidelity Insurance Company</td> <td>%</td> <td>1.900%</td> <td>$26,396</td> <td>57</td> <td>$1,389,273</td> <td>9.600%</td> <td>-7.400%</td> </tr>
  <tr> <td>Colonial Merevald Casualty &amp; Surety Company</td> <td>%</td> <td>0.000%</td> <td>$0</td> <td>0</td> <td>$0</td> <td>0.000%</td> <td>0.000%</td> </tr>
  <tr> <td>Merevald Fidelity and Deposit Company</td> <td>%</td> <td>0.000%</td> <td>$0</td> <td>0</td> <td>$0</td> <td>0.000%</td> <td>0.000%</td> </tr>
  <tr> <td>Merevald American Insurance Company of Illinois</td> <td>%</td> <td>3.900%</td> <td>$22,233</td> <td>87</td> <td>$570,072</td> <td>17.600%</td> <td>-7.200%</td> </tr>
  <tr> <td>Merevald American Insurance Company</td> <td>%</td> <td>0.900%</td> <td>$189,835</td> <td>262</td> <td>$21,092,749</td> <td>9.600%</td> <td>-21.800%</td> </tr>
</table>

**Overall Rate Information for Multiple Company Filings**

**Overall Percentage Rate Indicated For This Filing** 0.000%

**Overall Percentage Rate Impact For This Filing** 1.000%

**Effect of Rate Filing-Written Premium Change For This Program** $230,048

**Effect of Rate Filing - Number of Policyholders Affected** 468

<table>
  <tr> <th>Schedule</th> <th>Schedule Item</th> <th>Schedule Item Status</th> <th>Public Access</th> </tr>
  <tr> <td><strong>Supporting Document (revised)</strong></td> <td>Form RF3 - (Summary Sheet)</td> <td></td> <td>Yes</td> </tr>
  <tr> <td><strong>Supporting Document</strong></td> <td>Form RF3 - (Summary Sheet)</td> <td></td> <td>Yes</td> </tr>
</table>

PDF Pipeline for SERFF Tracking Number MDN-047719203 Generated 09/23/2014 07:39 AM
```

</details>

### ✅ **Sample** — `10k`

![[zoo-10k.png]]

Yes/No lines answered with check marks (no box is drawn around the options) and address blocks
around a real securities table. The ruled securities grid is a table; the check-mark questions are
option groups.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

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

- **Indicate by check mark if the Registrant is a well-known seasoned issuer, as defined in Rule 405 of the Securities Act.**
  - [x] Yes
  - [ ] No
- **Indicate by check mark if the Registrant is not required to file reports pursuant to Section 13 or Section 15(d) of the Act.**
  - [ ] Yes
  - [x] No
- **Indicate by check mark whether the Registrant (1) has filed all reports required to be filed by Section 13 or 15(d) of the Exchange Act during the preceding 12 months, and (2) has been subject to such filing requirements for the past 90 days.**
  - [x] Yes
  - [ ] No
- **Indicate by check mark whether the Registrant has submitted electronically every Interactive Data File required to be submitted during the preceding 12 months.**
  - [x] Yes
  - [ ] No
- **Indicate by check mark whether the Registrant is a large accelerated filer, an accelerated filer, a non-accelerated filer, a smaller reporting company, or an emerging growth company.**
  - [x] Large accelerated filer
  - [ ] Accelerated filer
  - [ ] Non-accelerated filer
  - [ ] Smaller reporting company
  - [ ] Emerging growth company
- **Indicate by check mark whether the Registrant is a shell company (as defined in Rule 12b-2 of the Act).**
  - [ ] Yes
  - [x] No
- **State the aggregate market value of the voting stock held by non-affiliates of the Registrant as of June 30, 2030:** $612,300,000,000
- **Indicate the number of shares outstanding of each of the Registrant's classes of common stock:** February 9, 2031 — Class A common stock 511,204 shares; February 9, 2031 — Class B common stock 1,204,880,117 shares
```

</details>

### ✅ **Sample** — `2linebug`

![[zoo-2linebug.png]]

*Policyholder:*, *Policy Number:*, *Signature:* and `☐ Power of Attorney ☐ Conservator ☐ Other:`
fields outside the options grid. The grid is a table and keeps its own checkboxes; the fields
around it are key-value content. The red bracket numbers are bold and printed, so they are kept.

<details>
<summary>Expected Markdown</summary>

```markdown
# COVERAGE ELECTION FORM

- **Policyholder:** \[**1** John Doe\]
- **Policy Number:** \[**2** 123456789\]

If you don't want to pay the increased premiums and instead wish to reduce your policy's benefits or if you wish to surrender your policy and receive a cash payment, you **must** complete and return this form postmarked by [**3** July 18, 2017]. If you will pay the increased premiums and therefore do not wish to reduce your policy's benefits, you do not need to do anything. Each of the options listed below are described in greater detail on the reverse side of this form.

You may only check **ONE** box below. The option you choose cannot be reversed after the Decision Due Date.

<table>
  <tr> <th></th> <th></th> <th colspan="4">Effective [4 September 1, 2017]</th> </tr>
  <tr> <th></th> <th>CURRENT</th> <th>MAINTAIN<br/>CURRENT<br/>COVERAGE:<br/>No Action<br/>Required</th> <th>OPTION 1:<br/>Reduce<br/>Benefits</th> <th>OPTION 2:<br/>Convert<br/>to<br/>Paid-Up</th> <th>OPTION 3:<br/>Surrender<br/>Coverage</th> </tr>
  <tr> <td></td> <td>[<strong>5</strong> Annual] Premium</td> <td>$[<strong>6</strong> 1,000.00]</td> <td>$[<strong>7</strong> 1,400.00]</td> <td>$[<strong>8</strong> 800.00]</td> <td>None</td> <td rowspan="5">Receive<br/>a cash<br/>payment<br/>of $[<strong>17</strong><br/>10,000].</td> </tr>
  <tr> <td></td> <td>Maximum Daily Benefit</td> <td>$[<strong>9</strong><br/>200.00]</td> <td>$[<strong>10</strong> 200.00]</td> <td>$[<strong>11</strong><br/>200.00]</td> <td>$[<strong>12</strong><br/>200.00]</td> </tr>
  <tr> <td></td> <td>Policy benefits inflate annually?</td> <td>Yes</td> <td>Yes</td> <td>No</td> <td>No</td> </tr>
  <tr> <td></td> <td>Maximum Lifetime Guaranty<br/>Association Coverage</td> <td>$[<strong>13</strong><br/>290,000]</td> <td>$[<strong>14</strong><br/>290,000]</td> <td>$[<strong>15</strong><br/>290,000]</td> <td>$[<strong>16</strong><br/>20,000]</td> </tr>
  <tr> <td></td> <td>Policy Benefits Above Guaranty<br/>Association Coverage</td> <td colspan="2">Partial amount may be<br/>available up to policy<br/>maximum limits, subject to<br/>court ruling.</td> <td>No</td> <td>No</td> </tr>
  <tr> <td colspan="3"><strong>Check ONE Box if you want Option 1, 2 or 3 to apply</strong></td> <td>[ ]</td> <td>[ ]</td> <td>[ ]</td> </tr>
</table>

### Signatures:

I understand the election I have made above and acknowledge that I have made the election voluntarily. I agree that the changes I have requested will become effective and are irrevocable on [**18** September 1, 2017].

- **Signature:** [blank]
- **Date:** [blank]

If signing on behalf of an insured, please complete the following and provide documentation for signatory authority if you have not provided it previously to the issuing insurance company.

Print name here: [blank] and indicate signatory authority: [ ] Power of Attorney [ ] Conservator [ ] Other: [blank]

Return this form in the enclosed envelope, or mail it to **Policy Service Center, P.O. Box 4420, Meridale, OH 43081**, or fax it to **614-555-0148.**

**VANLARK MUTUAL**

**Questions? Call 1-800-555-0172**
```

</details>

### ✅ **Sample** — `sln`

![[zoo-sln.png]]

Below the specification grid, a small ruled block pairs *Signature of Quotation Bidder (with seal)*
and *Name of Quotation Bidder* with one shared cell holding a handwritten signature. It is a
key-value block to fill in, not a data row of the grid above.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

<table>
  <tr> <th>SL No</th> <th>Name of Item</th> <th colspan="2">Technical Specifications and Standards</th> <th>Bidder's Response</th> </tr>
  <tr> <td>1</td> <td>Brand</td> <td colspan="2">To Be Mentioned By Tenderer</td> <td></td> </tr>
  <tr> <td>2</td> <td>Model</td> <td colspan="2">To Be Mentioned By Tenderer</td> <td></td> </tr>
  <tr> <td>3</td> <td>Country of Origin</td> <td colspan="2">USA/UK/EU or Equivalent</td> <td></td> </tr>
  <tr> <td>4</td> <td>Category</td> <td colspan="2">Cat.6</td> <td></td> </tr>
  <tr> <td>5</td> <td>Reference standard</td> <td colspan="2">ISO/IEC11801, ANSI/TIA/EIA-568-C.2-D, IEC61156-5<br/>EN50399, RoHS Compliant.</td> <td></td> </tr>
  <tr> <td rowspan="2">6</td> <td rowspan="2">Conductor</td> <td>Material</td> <td>Solid-Bare Copper</td> <td></td> </tr>
  <tr> <td>Structure AWG</td> <td>23 AWG</td> <td></td> </tr>
  <tr> <td rowspan="2">7</td> <td rowspan="2">Insulation</td> <td>Material</td> <td>HDPE</td> <td></td> </tr>
  <tr> <td>Nominal OD</td> <td>1.0 ± 0.10 mm</td> <td></td> </tr>
  <tr> <td>8</td> <td>Twist</td> <td colspan="2">Direction: S</td> <td></td> </tr>
  <tr> <td>9</td> <td>Fillers</td> <td colspan="2">Material: PE</td> <td></td> </tr>
  <tr> <td rowspan="4">10</td> <td rowspan="4">Jacket</td> <td>Thickness</td> <td>0.60 ± 0.10 mm</td> <td></td> </tr>
  <tr> <td>Diameter</td> <td>6.30 ± 0.30 mm</td> <td></td> </tr>
  <tr> <td>Material</td> <td>PVC</td> <td></td> </tr>
  <tr> <td>Color</td> <td>Orange/Blue/Gray</td> <td></td> </tr>
  <tr> <td rowspan="2">11</td> <td rowspan="2">Jacket physical properties</td> <td>Before aging</td> <td>Tensile strength ≥ 13.5 Mpa<br/>Elongation ≥ 150%</td> <td></td> </tr>
  <tr> <td>After aging</td> <td>Tensile strength ≥ 12.5 Mpa<br/>Elongation ≥ 125%</td> <td></td> </tr>
  <tr> <td>12</td> <td>Cable length</td> <td colspan="2">305m/Box</td> <td></td> </tr>
</table>

We hereby declare that we/our proposed goods and related services shall comply fully with the above technical specifications and standards. All items, materials and accessories included shall be new, unused and of the most current model.

- **Signature of Quotation Bidder (with seal)**: [signature:R. Chowdhury]
- **Name of Quotation Bidder**

Note:

1. Columns 1, 2, 3 and 4 shall be filled by the purchaser, and columns 5 and 6 shall be filled by the quotation bidder.
2. Specifications shall be complete and precise; a set of clear and correct specifications is the precondition of competitive quotation.

F:\Kholpur-2024\KMDA-2022\Tender\RFQ\2024-2025 fifth batch,16. Distribution Extension.docx

8
```

</details>

## Why not a small table

A two-column key/value table built from an unruled block creates a record that exists nowhere on
the page — the **never invent** failure of [[Never Drop, Never Invent]]. It teaches whatever learns
from the output that structure can be conjured from whitespace. Rendering the block as text or as a
key-value list loses nothing, because nothing there was ever printed as tabular.

<!-- skill:generate
- Render fill-in fields, checkboxes and blanks as a "- **Label:** value" key-value list, never as a table, even when they line up like a grid.
- Render a static label/value block (no blanks, no boxes) as plain text lines unless it is printed inside a ruled border; only a ruled block becomes a <table>.
- Never build a two-column key/value <table> the page does not print as a ruled grid.
- A totals block printed directly under a table belongs to that table.
-->

<!-- skill:check
- FAIL (MUST) if fill-in fields, checkboxes or blanks are rendered as a <table> instead of a key-value list (except checkbox cells inside a genuine ruled grid).
- FAIL (MUST) if the Markdown contains a key/value <table> for a block the page prints without ruling.
- FAIL (MUST) if a ruled key/value grid with fixed printed values is missing or not rendered as a table.
- FAIL (MUST) if the text of an unruled label/value block is missing from the Markdown.
-->

## Related

- [[The Key-Value List]] — how form content is transcribed once it is recognised
- [[Is This Even a Table]] — the test a ruled static block goes through
- [[Marks and Symbols in Cells]] — checkbox glyphs used as values inside a real table cell
- [[Empty Pre-Printed Grids]] — a fully blank ruled form, where the structure is the content
