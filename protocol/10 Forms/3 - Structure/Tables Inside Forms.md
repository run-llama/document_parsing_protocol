---
title: Tables Inside Forms
rule_id: forms-tables-inside-forms
status: rule
scope: page
tags: [forms, tables]
---

# Tables Inside Forms

> [!success] ✅ Normative
> Inside a form, a table MUST be used only for a **genuine grid**: one shared set of printed column
> headers over repeating rows of the same shape, or a printed row-by-column matrix. Where it is
> ambiguous, the fields SHOULD be rendered as individual field lines.

## Numbered form lines are never table rows

A line with its own caption and one amount box is a **field line**, even when the amount boxes
align into a ruled column. It MUST be rendered as a field line, not as a table row: the alignment
is typesetting, the caption is the structure.

Dollars and cents printed in two ruled columns MUST be rendered as one value — `1,234.00` — never
split.

## A matrix keeps its blank corner

The empty corner header of a matrix MUST be kept. Dropping it shifts every heading one column left:

```markdown
<table>
  <tr><th></th><th>Beginning</th><th>Ending</th></tr>
  <tr><td>Profit</td><td>1.0000000000 %</td><td>1.0000000000 %</td></tr>
  <tr><td>Loss</td><td>1.0000000000 %</td><td>1.0000000000 %</td></tr>
  <tr><td>Capital</td><td>1.0000000000 %</td><td>1.0000000000 %</td></tr>
</table>
```

This is the rule of [[Barely-Existing Columns and Headers|a blank corner cell in any table]].

## Cells carry the normal form notation

- A checkbox cell MUST be rendered `[x]` or `[ ]`. A blank cell *intended* to be checked is a
  checkbox; a blank cell not intended to be checked stays empty.
- Every printed row MUST be emitted, blank rows included, as full rows of empty cells. Rows MUST
  NOT be merged, reordered or added.
- Each entry belongs to its own row's rule lines, never to a neighbour's. Insurance-application
  coverage grids are the stress test.
- A cell containing form fields MUST use the normal form notation, as list items inside the cell.

```markdown
<tr><td>Jane</td><td>Doe</td><td>987-65-4321</td><td>Daughter</td><td>[x]</td><td>[ ]</td></tr>
<tr><td></td><td></td><td></td><td></td><td>- [ ]</td><td>- [ ]</td></tr>
```

## A table as a field's value

Some keyed entries take a grid as their value. The key MUST stay a normal field line, and the table
MUST be placed **below it, indented to the list item's content column**, with a blank line on each
side:

```markdown
- \[J\] **Partner's share of profit, loss, and capital (see instructions):**

  <table>
    <tr><th></th><th>Beginning</th><th>Ending</th></tr>
    <tr><td>Profit</td><td>1.0000000000 %</td><td>1.0000000000 %</td></tr>
  </table>

- **Check if decrease is due to sale or exchange of partnership interest.**: [ ]
```

**The indent is load-bearing.** An indented table belongs to the list item, so the list — and the
depth of everything after it — survives. A flush-left table between bullets ends the list and
flattens everything that follows.

## Not every table on a form page is form content

A large standalone data table that is not part of the fillable form — an embedded financial
schedule — is an ordinary table. See [[Is This Even a Table]].

### ✅ **Sample** — a self-certification form built from grids

![[bag-housing-asset-form.png]]

Part III prints two side-by-side asset grids sharing one header row (`Type of Asset`, `(A) Cash
Value*`, `(B) Annual Income`), each rendered as its own table; Parts I, II and IV are field
lines, and the description tables under Parts III and IV are empty pre-printed rows. Several empty
value cells print only a `$` — see [[Fill-Ins]].

<details>
<summary>Expected Markdown</summary>

```markdown
**Borvika Housing Trust**
BHT

**Exhibit D**

# Exhibit D – Asset Self-Certification

**For households whose <u>combined</u> net assets do not exceed the applicable Imputed Income Limitation.**

**(Complete only <u>one</u> form *per household; include assets of children.)***

For the following asset types, include the current Cash Value of **each** asset held by any family member and the actual income that the asset earns. \*Cash value is ***current*** market value minus cost to convert an asset to cash, such as broker’s fees, settlement costs, outstanding loans, penalties for early withdrawal, etc.

- **Property Name:** [blank]
- **Property Number:** [blank]
- **Household Name:** [blank]
- **Unit Number:** [blank]

### \[Part I\] Assets Disposed of for <u>less than</u> Fair Market Value (FMV)

- **Within the past two (2) years, I/we have sold or given away assets below their fair market value (FMV)?**
  - [ ] Yes
  - [ ] No
- **Asset #1:** [blank]
- **Date of Disposal:** [blank]
- **FMV – amt received:** [blank]
- **Asset #2:** [blank]
- **Date of Disposal:** [blank]
- **FMV – amt received:** [blank]

### \[Part II\] Federal Tax Return or Refundable Federal Tax Credit

- **Have you received a federal tax return or refundable federal tax credit in the last 12 months?**
  - [ ] Yes
  - [ ] No
- **Amount of return/credit:** $[blank]

### \[Part III\] Non-Necessary Personal Property (NNPP)

- **Do you or members in the household have any non-necessary personal property?**
  - [ ] Yes
  - [ ] No

If yes, list below.

<table>
  <tr> <th>Type of Asset</th> <th>(A) Cash Value*</th> <th>(B) Annual Income</th> </tr>
  <tr> <td>Cash on Hand</td> <td>$[blank]</td> <td>N/A</td> </tr>
  <tr> <td>Pre-paid Debit Card (including Govt. Benefits)</td> <td>$[blank]</td> <td>N/A</td> </tr>
  <tr> <td>Checking/Savings</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Checking/Savings</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Savings</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Internet based assets (Cash App, Venmo, PayPal, Crowdfunding, etc.)</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td></td> <td></td> <td></td> </tr>
</table>

<table>
  <tr> <th>Type of Asset</th> <th>(A) Cash Value*</th> <th>(B) Annual Income</th> </tr>
  <tr> <td>Whole Life Insurance</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Cryptocurrency</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Money Market/ CD</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Annuities</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Brokerage Account</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Stocks/Bonds</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td>Other:</td> <td>$[blank]</td> <td>$[blank]</td> </tr>
</table>

<table>
  <tr> <td colspan="2"><strong>Non-Account Based</strong> Possessions not generally held in an account such as vehicles used for recreation (e.g., RVs, ATVs, and boats), antique cars, collectibles (e.g., stamps, jewelry, coins, and artwork.), and equipment/machinery that is not used to generate income for a business.</td> </tr>
  <tr> <th>Description</th> <th>(A) Cash Value *</th> </tr>
  <tr> <td></td> <td>$[blank]</td> </tr>
  <tr> <td></td> <td>$[blank]</td> </tr>
</table>

### \[Part IV\] Real Property

- **Do you or members in the household have any real property?**
  - [ ] Yes
  - [ ] No

If yes, list below.

<table>
  <tr> <th>Description of Property</th> <th>(C) Cash Value*</th> <th>(D) Income</th> </tr>
  <tr> <td></td> <td>$[blank]</td> <td>$[blank]</td> </tr>
  <tr> <td></td> <td>$[blank]</td> <td>$[blank]</td> </tr>
</table>

**Under penalty of perjury, I/we certify that the information presented in this certification is true and accurate to the best of my/our knowledge. The undersigned further understand(s) that providing false representations herein constitutes an act of fraud. False, misleading, or incomplete information may result in the termination of a lease agreement.**

- **Signature:** [blank]
- **Date:** [blank]
- **Signature:** [blank]
- **Date:** [blank]

**PENALTIES FOR MISUSING THIS CONTENT:** Title 18, Section 1001 of the Borvika Code states that a person is guilty of a felony for knowingly and willingly making false or fraudulent statements to any department of the Borvika Government. BHT and any owner (or any employee of BHT or the owner) may be subject to penalties for unauthorized disclosures or improper uses of information collected based on the consent form.

1
REV. 4/4/25
```

</details>

<!-- skill:generate
- On a form, use a <table> only for a real grid: shared printed column headers over same-shaped rows, or a row-by-column matrix. Otherwise, and when unsure, write field lines.
- A numbered line with its own caption and one amount box is a field line, even if the amounts line up in a ruled column.
- Keep a matrix's empty corner header cell (<th></th>). Keep every printed row, including blank rows, as rows of empty cells; checkbox cells are [x] / [ ].
- When a field's value is a grid, write the field line, then a blank line, then the <table> indented to the list item's content column, then a blank line.
-->

<!-- skill:check
- FAIL (MUST) if captioned form lines with one amount box each are rendered as rows of a table.
- FAIL (MUST) if a matrix's empty corner header cell is dropped, shifting the column headers.
- FAIL (MUST) if a printed row of a form grid (including a blank row) is missing, merged or reordered, or a row is added.
- FAIL (MUST) if a checkbox cell uses a notation other than [x] or [ ].
- FAIL (MUST) if a table that is the value of a list item is not indented under that item, so that the list is broken.
- WARN (SHOULD) if an ambiguous grid of fields is rendered as a table rather than as field lines.
-->

## Related

- [[The Key-Value List]] — the notation used around and inside the grid
- [[Checkboxes]] — checkbox cells
- [[Blank and Spacer Rows]] — blank rows that are printed are kept
- [[Barely-Existing Columns and Headers]] — the blank corner cell
- [[Is This Even a Table]] — standalone tables on a form page
