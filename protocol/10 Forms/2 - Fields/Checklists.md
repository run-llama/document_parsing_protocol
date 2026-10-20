---
title: Checklists
rule_id: forms-checklists
status: rule
scope: page
tags: [forms, checkboxes]
---

# Checklists

> [!success] ✅ Normative
> Each checklist item MUST be rendered box-first — the box before its printed label — and items
> MUST be nested under their group label. A group-level box MUST stay on its group's line. A form's
> group labels MUST NOT be promoted to document headings.

A list of items each led by a box, sometimes under a group label that carries a box of its own.
Nothing is being answered; the page is a to-do list or a required-documents list.

```text
☐ Division 9 rate filings
    ☐ Transmittal information
    ☐ Certification (EC-1, residential property)
    ☐ Rate filing checklist (Exhibit A)
```

```markdown
- [ ] **Division 9 rate filings**
  - [ ] Transmittal information
  - [ ] Certification (EC-1, residential property)
  - [ ] Rate filing checklist (Exhibit A)
```

A checklist item has no caption above it and no label before its box, so neither shape of
[[The Key-Value List]] applies unchanged: it is not an option of a captioned group, and it is not a
labelled field with a box in the value position. It is rendered box-first, like an option line.

### ✅ **Sample** — a filing checklist

![[bag-insurance-checklist.png]]

Two bold group labels, each with a large box before it; ten and one indented items under them,
each with a smaller box. Four labelled fill-ins sit in the top-right corner.

<details>
<summary>Expected Markdown</summary>

```markdown
PC420 | 0116

*<u>Halvana Department of Insurance Regulation</u>*
*<u>Property/Casualty Rate Filing Exhibit</u>*

- **Company Name:** [blank]
- **Company NAIC Number:** [blank]
- **Company Filing Number:** [blank]
- **Line:** [blank]

*Exhibit A – Rate Filing Checklist (Page 2 of 2)*

- [ ] **Division 9 rate filings**
  - [ ] Transmittal information
  - [ ] Certification (EC-1, residential property)
  - [ ] Certification (EC-2, personal automobile)
  - [ ] Rates and supplementary rating information
  - [ ] Filing memorandum
  - [ ] Rate filing checklist (Exhibit A)
  - [ ] Rate change information (Exhibit C)
  - [ ] SERFF rate data (Exhibit B, if not filing in SERFF)
  - [ ] Policyholder impact information (for owner-occupied homeowners and personal automobile)
  - [ ] Average rate change by county (Exhibit County, for owner-occupied homeowners)
- [ ] **Division 10 additional requirements for certain county mutual insurers**
  - [ ] Additional information for certain county mutual insurers (Exhibit CM)

Halvana Department of Insurance Regulation | www.hdir.halvana.example

2/2
```

</details>

### ✅ **Sample** — boxes on section headings of a court form

![[bag-small-claims-boxes.png]]

`PAYMENT OF CLAIM:`, `DENIAL OF CLAIM` and `COUNTERCLAIM:` each carry a box before the label; the
denial line then prints two more boxes inside its sentence (`hearing {or} jury trial`). Each label
stays on its box's line, with what it governs nested beneath it; none becomes a heading.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

- [ ] **PAYMENT OF CLAIM:**

  Proof of payment (including fees and costs) to Plaintiff is attached (or proof that the requested property was returned to Plaintiff)

  Total Amount Paid: $ [blank] *(or)* Describe property and method of return: [blank]

- [ ] **DENIAL OF CLAIM**

  I deny the plaintiff's claim and demand a [ ] hearing {or} [ ] jury trial\*

  \*Claim must total more than $750 (including prejudgment interest, fees, and costs) to request a jury trial

- [ ] **COUNTERCLAIM:**

  I make the following counterclaim\* against the plaintiff for $[blank]

  \*Counterclaims must arise out of the same transaction or event as the plaintiff's claim.

  I, Defendant, claim that on or about *(date)* [blank], the above-named plaintiff owed me the amount claimed because [blank], and this amount is still due.

  If the amount is the value of property that you believe should be given to you, describe the property: [blank]

<!-- … -->
```

</details>

### ✅ **Sample** — an option group laid out in two rows

![[bag-agency-esign.png]]

`Audit history …` is followed by five boxed options set in three columns over two rows, with no
ids. With no ids to follow, the options are read row by row, like any unnumbered grid of equal
items.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

### All A&E Contract Information:

* Total participation amount $[blank] on all Regional and RRP contracts for Architectural & Engineering services that the consultant received in the last three fiscal periods.
* The number of regions in which the consultant does business is[blank].
* Years of consultant’s experience with Cost Rule Part 31 is[blank].
* Audit history of the consultant’s current and prior years (if applicable)
  - [ ] Cognizant ICR Audit
  - [ ] Local Gov’t ICR Audit
  - [ ] Department ICR Audit
  - [ ] CPA ICR Audit
  - [ ] Regional Gov’t ICR Audit

<!-- … -->
```

</details>

## Blank lines used as check marks

A short printed line that stands where a box would be, in front of a checklist item, is a
checklist control: it MUST be rendered `[ ]` (or `[x]` when marked). `[blank]` MUST be used only when
the line asks for a written value.

### ✅ **Sample** — blank lines used as check marks

![[bag-bankruptcy-checklist.png]]

Every item is led by `___` rather than a box, including the indented `* SCHEDULE A` …
`* SCHEDULE J` run. A `REFERENCE` column of citations sits at the right margin under its own
printed header, aligned to the items, so each section is a two-column table whose item cells hold
the checklist.

<details>
<summary>Expected Markdown · excerpt, second section</summary>

```markdown
<!-- … -->

<table>
  <tr> <th><u>COMPLETION OF CASE FILING</u></th> <th><u>REFERENCE</u></th> </tr>
  <tr> <td><ul><li>[ ] <strong>OFFICIAL FORM 6 - SCHEDULES</strong>
    <ul>
      <li>[ ] <strong>* SUMMARY OF SCHEDULES</strong></li>
      <li>[ ] <strong>*STATISTICAL SUMMARY OF CERTAIN LIABILITIES</strong> [Individual Debtors Only]</li>
      <li>[ ] <strong>* SCHEDULE A - REAL PROPERTY</strong></li>
      <li>[ ] <strong>* SCHEDULE B - PERSONAL PROPERTY</strong></li>
      <li>[ ] <strong>* SCHEDULE C - PROPERTY CLAIMED AS EXEMPT</strong></li>
      <li>[ ] <strong>* SCHEDULE D - CREDITORS HOLDING SECURED CLAIMS</strong></li>
      <li>[ ] <strong>* SCHEDULE E - CREDITORS HOLDING UNSECURED PRIORITY CLAIMS</strong></li>
      <li>[ ] <strong>* SCHEDULE F - CREDITORS HOLDING UNSECURED NONPRIORITY CLAIMS</strong></li>
      <li>[ ] <strong>* SCHEDULE G - EXECUTORY CONTRACTS AND UNEXPIRED LEASES</strong></li>
      <li>[ ] <strong>* SCHEDULE H - CODEBTORS</strong></li>
      <li>[ ] <strong>* SCHEDULE I - CURRENT INCOME OF INDIVIDUAL DEBTOR(S)</strong></li>
      <li>[ ] <strong>* SCHEDULE J - CURRENT EXPENDITURES OF INDIVIDUAL DEBTOR(S)</strong></li>
    </ul>
    [Signed by debtor(s)-perjury]</li></ul></td> <td>Bkr. Rule 1007<br/>LBR 1007-1</td> </tr>
  <tr> <td><ul><li>[ ] <strong>STATEMENT OF FINANCIAL AFFAIRS [Official Form 7]</strong><br/>[Signed by debtor(s)-perjury]</li></ul></td> <td>Bkr. Rule 1007<br/>LBR 1007-1</td> </tr>
  <tr> <td><ul><li>[ ] <strong>CHAPTER 13 STATEMENT OF CURRENT MONTHLY INCOME AND COMMITMENT PERIOD</strong><br/><strong>[Official Form 22C]</strong> [Signed by debtor(s) under penalty of perjury]</li></ul></td> <td>Bkr. Rule 1007</td> </tr>
  <tr> <td><ul><li>[ ] <strong>CHAPTER 13 PLAN AND MOTIONS and NOTICE TO SECURED CREDITOR (if applicable)</strong><br/>[Signed by debtor(s); and dated; <strong>Plan must be on approved form which is available on the Court's website,</strong> accompanied by proof of service.; New objection deadline should be <strong>14 days prior to confirmation hearing date.</strong>]</li></ul></td> <td>Bkr. Rule 3015<br/>LBR 3015-2 &amp; 5005-1</td> </tr>
  <tr> <td><ul><li>[ ] <strong>DISCLOSURE STATEMENT OF ATTORNEY or DISCLOSURE OF COMPENSATION OF BANKRUPTCY PETITION PREPARER (Form V-280)</strong><br/>[Signed by attorney or bankruptcy petition preparer]</li></ul></td> <td>Bkr. Code § 110, Bkr. Rule 2016<br/>LBR 2016-1(B)</td> </tr>
</table>

[dvck13 ver. 03/15]
```

</details>

## A grid of checklists

A ruled grid whose cells each hold a checklist is a table: the cells are the table's content, and
each cell's checklist is rendered as list items inside the cell.

### ✅ **Sample** — nine checklists in a grid

![[bag-court-checklist-grid.png]]

A three-by-three ruled grid, each cell a centred title over a list of boxed items, some with an
italic qualifier. The cells are the table's content and the boxes are the cells' content.

<details>
<summary>Expected Markdown</summary>

```markdown
- **Case No.**: [blank]

<table>
  <tr>
    <td><strong>DIVORCE (OR ANNULMENT) WITHOUT CHILDREN</strong><ul><li>[ ] Petition</li><li>[ ] Summons</li><li>[ ] Preliminary Injunction</li><li>[ ] Notice of your Rights about Health Insurance Coverage</li><li>[ ] Notice Regarding Creditors</li><li>[ ] Spousal Maintenance Worksheet <em>(if applicable)</em></li></ul></td>
    <td><strong>LEGAL SEPARATION WITHOUT CHILDREN</strong><ul><li>[ ] Petition</li><li>[ ] Summons</li><li>[ ] Preliminary Injunction</li><li>[ ] Notice Regarding Creditors</li><li>[ ] Spousal Maintenance Worksheet <em>(if applicable)</em></li></ul></td>
    <td><strong>LEGAL DECISION-MAKING, PARENTING TIME, AND CHILD SUPPORT</strong><ul><li>[ ] Petition</li><li>[ ] Summons</li><li>[ ] Preliminary Injunction</li><li>[ ] Child Support Worksheet</li><li>[ ] Parenting Plan</li><li>[ ] Order and Notice to Attend Parent Information Class</li></ul></td>
  </tr>
  <tr>
    <td><strong>ESTABLISH CHILD SUPPORT</strong><ul><li>[ ] Petition</li><li>[ ] Child Support Worksheet</li><li>[ ] Order to Appear</li></ul></td>
    <td><strong>PATERNITY OF AN ADULT CHILD</strong><ul><li>[ ] Petition</li><li>[ ] Summons</li></ul></td>
    <td><strong>ESTABLISH PATERNITY, LEGAL DECISION MAKING, PARENTING TIME, AND CHILD SUPPORT</strong><ul><li>[ ] Petition</li><li>[ ] Summons</li><li>[ ] Preliminary Injunction</li><li>[ ] Child Support Worksheet</li><li>[ ] Parenting Plan</li><li>[ ] Order and Notice to Attend Parent Information Class</li></ul></td>
  </tr>
  <tr>
    <td><strong>MODIFY SPOUSAL MAINTENANCE OR SPOUSAL MAINTENANCE AND CHILD SUPPORT</strong><ul><li>[ ] Petition to Modify Support</li><li>[ ] Affidavit of Financial Information <em>(of filing party)</em></li><li>[ ] Affidavit of Financial Information <em>(blank one for other party)</em></li><li>[ ] Order to Appear</li><li>[ ] Spousal Maintenance Worksheet</li></ul></td>
    <td><strong>MODIFY CHILD SUPPORT (“SIMPLIFIED MOD”)</strong><ul><li>[ ] Petition to Modify</li><li>[ ] Child Support Worksheet</li></ul></td>
    <td><strong>MODIFY CHILD SUPPORT (“STANDARD MOD”)</strong><ul><li>[ ] Petition to Modify</li><li>[ ] Child Support Worksheet <em>(from order you wish to change)</em></li><li>[ ] Affidavit of Financial Information <em>(of filing party)</em></li><li>[ ] Affidavit of Financial Information <em>(blank one for other party)</em></li><li>[ ] Order to Appear</li></ul></td>
  </tr>
</table>

© Superior Court of Borvika in Arlefen County
ALL RIGHTS RESERVED

Page 3 of 6

CK18f 091725
```

</details>

## A box printed before an id

**The order of box and id.** A lettered or numbered item can print its box **before** its id:
`☐ (h) The crime of …`. It MUST be rendered box first, then the escaped id — `- [ ] \[h\] The crime
of …` — so that the box always opens the line whether or not an id follows it.

### ✅ **Sample** — a box before a lettered id

![[bag-plea-form-box-before-id.png]]

Items `(h)` to `(k)` each print a box, then the letter id, then a paragraph with blanks inside it.
Each line opens with the box, then the escaped id: `- [ ] \[h\]`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

***Notification Relating to Specific Crimes: If any of the Following Paragraphs Apply, the Box Should Be Checked and the Paragraph Initialed by the Defendant.***

- [ ] \[h\] The crime of [blank] has a mandatory minimum sentence of [blank] days in jail and a $[blank] fine, plus costs and assessments.
- [ ] \[i\] The crimes of solicitation, indecent exposure, permitting solicitation, and patronizing have a mandatory assessment of $[blank]. The court may reduce up to 2/3 of this assessment if the court finds that I am not able to pay the assessment. HRC 12A.410.
- [ ] \[j\] If this crime involves patronizing, a condition of my sentence will be that I not be subsequently arrested for patronizing or commercial sexual abuse of a minor. The court will impose crime-related geographical restrictions on me, unless the court finds they are not feasible. If this is my first offense, the court will order me to attend a program designed to educate me about the negative costs of patronizing.
- [ ] \[k\] This plea of guilty will result in suspension or revocation of my driving license or privilege by the Department of Licensing for a minimum period of [blank]. The Department of Licensing may impose a longer period of suspension or revocation based upon my record of conviction. The Department of Licensing shall

<!-- … -->
```

</details>

<!-- skill:generate
- Write each checklist item box-first: "- [ ] Item text". Nest items under their group label; a box printed before the group label stays on that line: "- [ ] **Division 9 rate filings**".
- Do not turn checklist or form group labels into # headings.
- A short line (___) standing where a box would be, before an item, is a checkbox: write [ ]. Use [blank] only where the line asks for written text.
- A ruled grid whose cells each hold a checklist is a <table>; inside a cell write the items as <ul><li>[ ] Item</li></ul>.
- When a box is printed before an item's id, write the box first, then the id: "- [ ] \[h\] …".
-->

<!-- skill:check
- FAIL (MUST) if a checklist item's box is written after its label instead of before it.
- FAIL (MUST) if checklist items are not nested under their printed group label, or a group-level box is dropped or moved off the group's line.
- FAIL (MUST) if a checklist group label is rendered as a Markdown heading.
- FAIL (MUST) if a short line used as a checklist box is rendered as [blank] instead of [ ] or [x].
- FAIL (MUST) if an item that prints its box before its id is written id-first ("- \[h\] [ ]").
-->

## Related

- [[Checkboxes]] — what counts as checked
- [[Option Groups]] — boxes answering one captioned question
- [[The Key-Value List]] — the two field shapes a checklist sits between
- [[Form Reading Order]] — ids decide the order; where there are none, rows do
