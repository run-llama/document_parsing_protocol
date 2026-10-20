---
title: Fill-Ins
rule_id: forms-fill-ins
status: rule
scope: page
tags: [forms]
---

# Fill-Ins

> [!success] ✅ Normative
> Each printed entry field MUST be rendered as one line. An empty field MUST be rendered as `[blank]`
> and MUST NOT be omitted.

The blank is the word marker `[blank]`, like the protocol's other markers (`[signature]`, `[seal]`,
`[stamp]`). It replaces the older `[___]`, whose underscores pair up as emphasis whenever two blanks
share a line (`from [___] to [___]`) and vanish when the Markdown is rendered. A printed bracketed
word `[blank]` on the page is escaped, `\[blank\]` — see [[Escaping Printed Marks]].

```markdown
- \[1\] **Wages, tips, other compensation**: 29,513
- \[7\] **Social security tips**: [blank]
- \[9\]: [blank]
```

## The shapes

| The page prints | Output |
| --- | --- |
| id + label + value | `- \[1\] **Label**: value` |
| id, no label *(shaded or unused boxes)* | `- \[9\]: [blank]` |
| neither id nor label, filled | the bare value |
| neither id nor label, empty | a bare `[blank]` |

## An empty field is content

An empty field says *this was asked and not answered*. Dropping it loses that, and the field count
no longer matches the form — on a W-2 that is boxes 7–11, on a 1040 page 2 most of lines 17–31.

## Adjacent boxes are separate fields

Two entry boxes printed side by side under one id are two fields and MUST NOT be fused into one
value. W-2 box 15 prints `State` and `Employer's state ID number` side by side:

```markdown
- \[15\]
  - **State**: SC
  - **Employer's state ID number**: 00-0000056
```

![[form-w2-p1.png]]

## A currency glyph before a blank

A currency glyph printed before an empty field MUST be kept immediately before the blank —
`$[blank]` — with any printed spacing preserved. The field's label MUST stay unchanged: the glyph is
not folded into it.

### ✅ **Sample** — `$` in empty cells

![[bag-housing-asset-form.png]]

Every value cell in the Part III grids prints a `$` and nothing else; two print `N/A`. Each `$`
cell is an empty field with its glyph kept: `$[blank]`.

<details>
<summary>Expected Markdown · excerpt, Part III asset grids</summary>

```markdown
<!-- … -->

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

<!-- … -->
```

</details>

### ✅ **Sample** — `$` before a dotted fee line

![[bag-notarial-labels-below.png]]

The bottom of a notarial form: `$` then a dotted blank captioned `FEE` beneath the line. The same
page is the sample for [[Blanks Inside Sentences]].

<details>
<summary>Expected Markdown · excerpt, fee line</summary>

```markdown
<!-- … -->

- **FEE** $[blank]
- **PERSON TO WHOM FEE CHARGED** [blank]
- **PERSON PAYING FEE, IF PAID** [blank]

<!-- … -->
```

</details>

## A field printed as several ruled lines

One answer field MUST be rendered as one `[blank]`, however many ruled writing lines it offers.
Separate blanks MUST be emitted only for fields that are separately labelled or independently
answerable.

### ✅ **Sample** — numbered answer areas of four lines each

![[bag-interrogatory-blanks.png]]

Items 24, 25 and 26 each print four ruled lines, then three checkbox lines, the last with a blank
inside its sentence (`OBJECTION# ______ listed above`). Each item's four lines are one field.

<details>
<summary>Expected Markdown · excerpt, items 24–26</summary>

```markdown
<!-- … -->

- \[24\]: [blank]
  - [ ] Not Applicable
  - [ ] Refer to attached list, chart, table or timeline
  - [ ] Refer to document provided in response to *Defendant’s Notice to Produce*
  - [ ] OBJECTION# [blank] listed above applies to this request
- \[25\]: [blank]
  - [ ] Not Applicable
  - [ ] Refer to attached list, chart, table or timeline
  - [ ] Refer to document provided in response to *Defendant’s Notice to Produce*
  - [ ] OBJECTION# [blank] listed above applies to this request
- \[26\]: [blank]
  - [ ] Not Applicable
  - [ ] Refer to attached list, chart, table or timeline
  - [ ] Refer to document provided in response to *Defendant’s Notice to Produce*
  - [ ] OBJECTION# [blank] listed above applies to this request

Plaintiff’s Response to Request for Interrogatories – Rev. February 2026

Page **9** of **15**

Provided by Ashgrove Legal Aid and the Camberly Law Library
```

</details>

## Values printed before anyone fills the form

A preprinted or computed value MUST be transcribed exactly as printed, including `0 %` and
`0.00`. A visible value MUST NOT be replaced with a blank.

### ✅ **Sample** — computed zeros in an unfilled invoice

![[bag-budget-invoice-form.png]]

Yellow input cells sit empty; every item row prints `0 %` under `% Total Budget` and
`% Spent To Date`, and the total rows print `0.00`. A `[A]` reference tag sits beside the first
total.

<details>
<summary>Expected Markdown · excerpt, Award Amount grid</summary>

```markdown
<!-- … -->

<table>
  <tr> <th colspan="5">Award Amount</th> </tr>
  <tr> <th></th> <th>Budget</th> <th>% Total Budget</th> <th>Spent this Period</th> <th>% Spent To Date</th> <th>Spent To Date</th> </tr>
  <tr> <td>A. Key Personnel</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>B. Other Personnel</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>C. Equipment Rental</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>Special Equipment</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>D. Materials &amp; Supplies</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>E. Travel</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>F. Subcontracts</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>G. Other Direct Costs</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>H. Indirect Costs</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>I. Fee</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td>J. Surveys</td> <td></td> <td>0 %</td> <td></td> <td>0 %</td> <td></td> </tr>
  <tr> <td><strong><em>Total Allowable Expense</em></strong></td> <td><strong><em>0.00</em></strong></td> <td><strong><em>0.0 %</em></strong></td> <td><strong><em>0.00</em></strong></td> <td><strong><em>0 %</em></strong></td> <td><strong><em>0.00 [A]</em></strong></td> </tr>
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — a totals block under an empty grid

![[bag-goods-receipt-form.png]]

Six empty item rows, then `Subtotal`, `Sales Tax`, `Shipping/Handling`, `TOTAL` continuing the
frame's two right-hand columns, each printing `0.00`; the last with a `$`. The totals stay in the
table, and every empty row is kept.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

I CERTIFY THAT THE FOLLOWING ITEMS WERE ORDERED FROM:

[blank] (Name of Vendor) AND RECEIVED ON [blank] (Date)

<table>
  <tr> <th>Item No.</th> <th>Qty</th> <th>Description</th> <th>Unit Price</th> <th>Extension</th> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td>Subtotal</td> <td>0.00</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td>Sales Tax</td> <td>0.00</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td>Shipping/Handling</td> <td>0.00</td> </tr>
  <tr> <td></td> <td></td> <td></td> <th data-level="0">TOTAL</th> <td>$ 0.00</td> </tr>
</table>

- **Reason(s) itemized invoice/receipt was not obtained for this order:** [blank]
- **Cardholder Signature** [blank]
- **Date** [blank]
- **Approving Official Signature** [blank]
- **Date** [blank]

Rev. 03/2021
```

</details>

## A label with no blank after it

An empty entry label such as `Signed:` or `Date:` MUST be followed by `[blank]` when the surrounding
form clearly asks for that value, even though no line, box or space is drawn. A field MUST NOT be
inferred from a colon in ordinary prose.

### ✅ **Sample** — signature lines with no line

![[bag-license-signed-date.png]]

`Corresponding Author:` with `Signed:` and `Date:` nested beneath it, each followed by a run of
dashes and no ruled line or box. Each is an empty field.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

**9.3** By signing below, the Corresponding Author accepts the terms of this Agreement on behalf of all co-authors.

- **Corresponding Author:** [blank]
  - **Signed:** [blank]
  - **Date:** [blank]

A signed copy of this Agreement must be returned to the Editorial Office before the manuscript can proceed to production.
```

</details>

### ✅ **Sample** — dotted lines as answer areas

![[bag-affidavit-dotted-lines.png]]

Six full-width dotted lines continue a statement from the previous page; `Answer ……` after each
of three questions; `Dated at …… this …… day of …… 20……` with four blanks in one sentence. The six
lines are one field, and each `Answer` word stays beside its blank.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
F-204

[blank]

(Any documentation acquired which may be used to identify or trace the respondent must be attached as an annexure to this form.)

- **Signature of Deponent** [blank]
- **Date** [blank]

I certify that before administering the \*oath / taking the affirmation I asked the Deponent the following questions and noted \*her/his answers in \*her/his presence as indicated below:-

- \[a\] **Do you know and understand the contents of the above declaration?** Answer [blank]
- \[b\] **Do you have any objection to taking the prescribed oath?** Answer [blank]
- \[c\] **Do you consider the prescribed oath to be binding on your conscience?** Answer [blank]

I certify that the Deponent has acknowledged that \*she/he knows and understands the contents of this declaration which was \*sworn to / affirmed before me, and the Deponent's signature was placed thereon in my presence.

Dated at [blank] this [blank] day of [blank] 20[blank]

<!-- … -->
```

</details>

### ✅ **Sample** — spreadsheet errors as printed values

![[bag-proforma-div0-values.png]]

A rotated-header pro-forma grid whose `Utility Rebate` column prints `#DIV/0!` in every row and
whose totals print `$0`, under a `SAMPLE` watermark; a `[enter contract # ]` placeholder in the
title and a `<<State Institution>>` placeholder in the corner header. The error strings are
printed values and are kept; the `Simple Payback (Years)` column has a header and no body cells.

<details>
<summary>Expected Markdown</summary>

```markdown
[watermark: SAMPLE]

# Work Order Contract *[enter contract # ]*

## Exhibit D

**Project Pro Forma**

*(This is a Contractor deliverable that will be included in the Work Order Amendment).*

<table>
  <tr> <th>Local Energy Efficiency Program – Financial Summary<br/>&lt;&lt;<em>State Institution</em>&gt;&gt;</th> <th>Facility</th> <th>Option</th> <th>ECM Code</th> <th>Energy Conservation Measures</th> <th>Energy Savings</th> <th>O&amp;M Savings</th> <th>Total Savings</th> <th>Project Cost</th> <th>Utility Rebate</th> <th>Simple Payback (Years)</th> </tr>
  <tr> <td rowspan="8">Borvika Hall</td> <td rowspan="8">1</td> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>2</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>3</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>4</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>5</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>6</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>7</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td>8</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>#DIV/0!</td> </tr>
  <tr> <td><strong>Borvika Hall</strong></td> <td></td> <td></td> <th data-level="0"><strong>TOTAL – Option 1</strong></th> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>#DIV/0!</strong></td> </tr>
  <tr> <td></td> <td></td> <td></td> <th data-level="0"><strong>TOTAL – Option 2</strong></th> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>#DIV/0!</strong></td> </tr>
  <tr> <td></td> <td></td> <td></td> <th data-level="0"><strong>TOTAL – Option 3</strong></th> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>#DIV/0!</strong></td> </tr>
  <tr> <td></td> <td></td> <td></td> <th data-level="0"><strong>TOTAL – Option 4</strong></th> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>$0</strong></td> <td><strong>#DIV/0!</strong></td> </tr>
</table>

WOC – State Institution – Contractor
LEEP Work Order Contract, Exhibit D
\#\#\#\# Amendment No. 1 (rev 20250601)
```

</details>

<!-- skill:generate
- One line per printed entry field. Write an empty field as [blank]; never leave it out.
- Shapes: "- \[1\] **Label**: value"; id but no label: "- \[9\]: [blank]"; no id and no label: the bare value, or a bare [blank].
- Two boxes printed side by side under one id are two fields: nest them under the id, never merge their values.
- Keep a currency sign printed before a blank: $[blank] (keep printed spacing, leave the label unchanged).
- Several ruled lines for one answer are one [blank]. Values the form prints before filling (0 %, 0.00, #DIV/0!) are copied as printed, never blanked.
- After a bare "Signed:" or "Date:" that a form clearly asks to fill, write [blank]; do not do this for a colon in ordinary prose.
-->

<!-- skill:check
- FAIL (MUST) if an empty entry field visible on the page has no [blank] in the Markdown.
- FAIL (MUST) if two side-by-side boxes are merged into one field value.
- FAIL (MUST) if a currency sign printed before a blank is dropped or moved into the label.
- FAIL (MUST) if a preprinted or computed value (0 %, 0.00, #DIV/0!) is replaced by [blank] or omitted.
- FAIL (MUST) if one answer area printed as several ruled lines is rendered as more than one [blank].
-->

## Related

- [[The Key-Value List]] — the line format
- [[Values Are Verbatim]] — what a filled value looks like
- [[Blanks Inside Sentences]] — blanks with no label before them
- [[Sections and Grouped Fields]] — boxes that group several fields
- [[Signatures]] — a signed signature field
