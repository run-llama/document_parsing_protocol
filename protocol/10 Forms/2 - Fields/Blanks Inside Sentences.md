---
title: Blanks Inside Sentences
rule_id: forms-blanks-inside-sentences
status: rule
scope: page
tags: [forms]
---

# Blanks Inside Sentences

> [!success] ✅ Normative
> A sentence with fill-in gaps MUST be kept intact, with each gap rendered as `[blank]` at its printed
> position. A hint printed with a blank MUST be kept next to that blank, once.

Affidavits, declarations and notarial blocks print their fields as prose with gaps in it:

```text
The Enterprise is ______________% Black Owned using the flow-through principle …
Executed on the (date) ______ day of (month) ____________ (year) ________
```

```markdown
The Enterprise is [blank]% Black Owned using the flow-through principle …
Executed on the *(date)* [blank] day of *(month)* [blank] *(year)* [blank]
```

[[Fill-Ins]] assumes a label followed by a field. Here there is no label — the sentence is the
label, and one sentence can hold three blanks. The sentence MUST NOT be broken up into key-value
lines, and a key MUST NOT be made up from the words before a blank.

## The sub-cases

| The page prints | Output |
| --- | --- |
| A blank inside a sentence | `[blank]` in its printed position |
| A hint inside or beside the blank | The hint as printed, next to its own blank, once |
| A caption under the line | The caption kept with that blank, once, never duplicated |
| A currency glyph before a blank | `$[blank]`, keeping the printed spacing |

### ✅ **Sample** — blanks inside bulleted sentences

![[bag-affidavit-blanks.png]]

Each bullet is a sentence with one percentage blank in it; the indented group prints a short label,
`=`, then the blank. The page also carries a three-row table whose last column is an unlabelled
tick box.

<details>
<summary>Expected Markdown</summary>

```markdown
3. I hereby declare under Oath that:
   * The Enterprise is [blank]% Local Owned using the flow-through principle as per Amended Schedule 100 of the Amended Codes of Good Practice issued under section 9(1) of the Caldrivane Ownership Act No. 41 of 2009 as Amended by Act No. 22 of 2016,
   * The Enterprise is [blank]% Local Founder-Family Owned as per Amended Schedule 100 of the Amended Codes of Good Practice issued under section 9(1) of the Caldrivane Ownership Act No. 41 of 2009 as Amended by Act No. 22 of 2016,
   * The Enterprise is [blank]% Designated Group Owned as per Amended Schedule 100 of the Amended Codes of Good Practice issued under section 9(1) of the Caldrivane Ownership Act No. 41 of 2009 as Amended by Act No. 22 of 2016,
   * Designated Group Owned % Breakdown as per the definition stated above:
     - Youth % = [blank]%
     - Disabled % = [blank]%
     - Unemployed % = [blank]%
     - People living in Rural areas % = [blank]%
     - Veterans % = [blank]%
   * Based on the Audited Financial Statements/Financial Statements and other information available on the latest financial year-end of [blank] (DD/MM/YYYY), the annual Total Revenue was B$8,500,000.00 (Eight Million Five Hundred Thousand Borvani Dollars) or less
   * Please Confirm on the below table the Local Ownership Level Contributor, **by ticking the applicable box.**

<table>
  <tr> <td>100% Local Owned</td> <td><strong>Level One</strong> (135% Local Ownership procurement recognition level)</td> <td>[ ]</td> </tr>
  <tr> <td>At least 51% Local Owned</td> <td><strong>Level Two</strong> (125% Local Ownership procurement recognition level)</td> <td>[ ]</td> </tr>
  <tr> <td>Less than 51% Local Owned</td> <td><strong>Level Four</strong> (100% Local Ownership procurement recognition level)</td> <td>[ ]</td> </tr>
</table>

4. I know and understand the contents of this affidavit and I have no objection to take the prescribed oath and consider the oath binding on my conscience and on the Owners of the Enterprise which I represent in this matter.
5. The sworn affidavit will be valid for a period of 12 months from the date signed by commissioner.

- **Deponent Signature:** [blank]
- **Date:** [blank]
```

</details>

### ✅ **Sample** — hints printed inside the blanks

![[bag-form-blue-hints.png]]

`Executed on the (date) ___ day of (month) ___ (year) ___`: the hints sit before each blank, in
blue italic. `Print Your Name:` and `Your Signature:` are ordinary labelled fill-ins; the
`(If any)` hint of `Lawyer Signature:` stays beside its blank.

<details>
<summary>Expected Markdown · excerpt, section 12</summary>

```markdown
### \[12\] Verified Signature

**Petitioner**

I declare under penalty of perjury under the law of Borvika that the foregoing is true and correct.

Executed on the *(date)* [blank] day of *(month)* [blank] *(year)* [blank]
at City: *(or other location)* [blank]
and State: *(or country)* [blank]

- **Print Your Name:** [blank]
- **Your Signature:** [blank]
- **Lawyer Signature:** *(If any)* [blank]

**Respondent** (or Co-petitioner)

I declare under penalty of perjury under the law of Borvika that the foregoing is true and correct.

Executed on the *(date)* [blank] day of *(month)* [blank] *(year)* [blank]
at City: *(or other location)* [blank]
and State: *(or country)* [blank]

- **Print Your Name:** [blank]
- **Your Signature:** [blank]
- **Lawyer Signature:** *(If any)* [blank]

<!-- … -->
```

</details>

### ✅ **Sample** — captions printed under the line

![[bag-notarial-labels-below.png]]

A notarial block where the caption is set in small capitals **beneath** each dotted line —
`NAME`, `DATE`, `SIGNATURE OF DEPONENT` — and a fee line that prints `$` before its blank. A
standalone line takes its caption as its label, with no colon because the two sit on different
lines; the `NAME` line inside the sentence keeps its caption right after its blank.

<details>
<summary>Expected Markdown</summary>

```markdown
6. Did you and the other witness(es) sign this paper in the presence of the decedent? **Ans.** [blank]
7. Do you know of any other will of the decedent? **Ans.** [blank]
8. Did the decedent execute this will freely and voluntarily as his or her last will and testament? **Ans.** [blank]

- **SIGNATURE OF DEPONENT** [blank]
- **CITY; COUNTY; STATE; TERRITORY; PROVINCE; COUNTY** [blank]

State/Province of [blank] [ ] City [ ] County of [blank]

The foregoing instrument was acknowledged before me this [blank] day of [blank] , 20 [blank]
by [blank] NAME
for the purpose of filing or reading as evidence in the matter of the probate of the will of the testator named above. I am:

- [ ] authorized to administer oaths (depositions taken in Calvera).
- [ ] authorized to take depositions in the jurisdiction where the deponent is (depositions outside Calvera).
- [ ] otherwise authorized under Rule 4:3 of the High Court of Calvera to take this deposition.

Given under my hand and seal.

- **DATE** [blank]
- **SIGNATURE** [blank]
- [blank]
  - [ ] CLERK
  - [ ] DEPUTY CLERK
  - [ ] NOTARY PUBLIC
- **My commission expires**: [blank]
- **Registration No.**: [blank]
- **DATE** [blank]
- **COURT, IF DEPOSITIONS TAKEN THEREIN** [blank]

Seal (where required)

I certify that the signature of the person who took the above deposition is genuine.
My seal is affixed.

- **AUTHENTICATING SIGNATURE WHERE REQUIRED** [blank]
- **TITLE** [blank]
- **FEE** $[blank]
- **PERSON TO WHOM FEE CHARGED** [blank]
- **PERSON PAYING FEE, IF PAID** [blank]

**See Rule 4:3, High Court of Calvera:** Depositions taken in Calvera do not require a seal. If a person taking a deposition outside Calvera does not have a seal, an official who has a seal must authenticate that person’s signature. Armed forces: A commissioned officer may take a deposition; his or her signature must be authenticated by the commanding officer of the installation or ship: no seal is required.

FORM PR-2160 (MASTER, PAGE TWO OF TWO) 05/08
```

</details>

<!-- skill:generate
- Keep a sentence with gaps as one sentence; write each gap as [blank] exactly where it is printed. Do not turn the sentence into "label: value" lines.
- Keep a hint printed with a blank, such as "(date)" or "(DD/MM/YYYY)", next to that blank, once, with its printed styling.
- A caption printed under a line belongs to that blank: as a standalone field write "- **CAPTION** [blank]"; inside a sentence put the caption right after its [blank].
- A currency sign printed before a blank stays attached: $[blank].
-->

<!-- skill:check
- FAIL (MUST) if a blank inside a printed sentence is missing, moved, or replaced by a key-value line built from the surrounding words.
- FAIL (MUST) if a hint or under-line caption printed with a blank is missing or appears twice.
- FAIL (MUST) if a currency sign printed before a blank is dropped or folded into a label.
-->

## Related

- [[Fill-Ins]] — the labelled case this rule extends
- [[Ids and Labels]] — a label is verbatim, which is why inventing one is a failure
- [[Fields Outside the Form]] — non-field prose on a form page
