---
title: Run-In Headings
rule_id: headings-run-in-headings
status: rule
scope: page
tags: [rule, structure, headings]
---

# Run-In Headings

> [!success] ✅ Normative
> A run-in label and the sentence, value or URL that follows it on the same line MUST be rendered
> as one paragraph, with the label's printed emphasis preserved. The label MUST NOT be rendered as a
> Markdown heading.

A run-in heading is set at the start of its own paragraph, in bold or colour, with the body text
continuing on the same line. Contracts number their clauses this way; glossaries print the term
this way.

```text
Section 11.1.1 The Department requires that business enterprises so certified by …
AMBIGUOUS  Confusing question in that it is capable of being understood in more than one sense.
  ↑ bold label, text continues on the same line
```

## Requirements

- The label and its text MUST stay in one paragraph; a label that wraps onto a further line remains
  part of the same paragraph.
- The label's printed bold, italic, underline or small capitals MUST be kept as inline marks (see
  [[Bold and Italics]], [[Underlined Text]], [[Small Capitals]]).
- The label MUST NOT be split onto a line of its own or promoted to a heading: a lead-in rendered as
  a heading creates a false outline entry.
- A numbered title set **on its own line**, with its text beneath, is not run-in; it is a heading —
  see [[Numbered Section Headings]].

### ✅ **Sample** — numbered contract clauses

![[bag-run-in-sections.png]]

`Section 11.1.1` through `11.1.4` open their paragraphs in bold; `Section 11.1` and `11.2` are set
on their own lines, underlined, and behave as ordinary headings. Both shapes on one page. The
two-line `ARTICLE 11` title is one heading (see [[Stacked Headings]]). Heading depths are relative:
the page, sheet 41 of 96, does not show the outline above the article.

<details>
<summary>Expected Markdown</summary>

```markdown
## ARTICLE 11 ECONOMIC INCLUSION REQUIREMENTS

### Section 11.1 Definitions

For purposes of this Article, the following terms have the meanings set out below, and apply to every Contract issued under this Agreement regardless of funding source.

**Section 11.1.1** The Department requires that business enterprises so certified by the Office of Contract Compliance as a Locally Owned Small Business (an "LSB") be given a good faith opportunity to participate in the performance of Contracts financed in whole or in part with Department funds.

**Section 11.1.2** "Utilization" means the dollar value of Work self-performed or subcontracted to a certified LSB, expressed as a percentage of the total base Contract value, exclusive of Owner-furnished materials and allowances.

**Section 11.1.3** "Good Faith Effort" means the documented steps a Contractor takes to solicit, evaluate, and, where practicable, engage certified LSB firms, including the record-keeping described in Section 11.3.

**Section 11.1.4** "Commercially Useful Function" means that the LSB firm is responsible for the execution of a distinct element of the Work and carries out its responsibilities by actually performing, managing, and supervising that element.

### Section 11.2 Utilization Requirements

Each Contractor shall achieve a minimum LSB Utilization of eighteen percent (18%) of the total base Contract value, unless a lower or higher goal is stated in the Special Conditions for this Contract. Utilization credit is available only for Commercially Useful Function performed by a currently certified LSB firm, and is measured at Contract closeout as well as at the time of award.

Failure to meet the goal stated above, without a Good Faith Effort accepted in writing by the Office of Contract Compliance under Section 11.1.3, is a material breach of this Agreement and may result in the remedies described in Article 14.

Standard Construction Agreement — Article 11 — Page 41 of 96
```

</details>

### ✅ **Sample** — a glossary of objections

![[bag-objections-glossary.png]]

Thirty-odd entries, each a red bold term followed on the same line by its definition and a rule
citation. Two entries carry a bold `Note:` inside the definition. The red is decoration and is not
carried; the italic citations are. The left column is read before the right.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
# Evidentiary Trial Objections

A quick-reference glossary for use at counsel table

**Ambiguous.** The question is capable of more than one reasonable meaning and calls for the witness to guess which one is intended. *(R. Evid. 611)*

**Argumentative.** The question states a conclusion and asks the witness to agree rather than seeking testimony. *(R. Evid. 611)*

<!-- … -->

**Badgering the Witness.** Counsel is harassing or intimidating the witness rather than eliciting testimony. *(R. Evid. 611)* **Note:** distinct from Argumentative, which attacks the answer rather than the witness.

<!-- … -->

**Invades the Province of the Jury.** The question asks the witness to decide an ultimate issue reserved for the jury. *(R. Evid. 704)* **Note:** most jurisdictions permit ultimate-issue opinions from experts; this objection is strongest against lay witnesses.

<!-- … -->
```

</details>

### ✅ **Sample** — section numbers in the margin

![[bag-ifrs-guide-margin-numbers.png]]

`32.5` and `32.6` sit in a left margin column beside their headings; `32.5.1` … `32.6.2` open
their paragraphs in bold on the same line. The page also prints each paragraph number a second
time, in plain type, in the margin column; both copies are printed, so both are kept, in reading
order. Heading depths follow the numbering and assume chapters are top level; the running header
is left out of this excerpt.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
## 32.5 PRESENTATION AND DISCLOSURE

32.5.1 **32.5.1** Basic and diluted earnings per share are shown with equal prominence on the face of the Statement of Comprehensive Income for **each** class of ordinary shares with different rights. Information presented should include:

* profit or loss from continuing operations attributable to ordinary equity holders of the parent entity;
* profit or loss attributable to ordinary equity holders of the parent entity; and
* any reported discontinued operation.

32.5.2 **32.5.2** Basic and diluted **losses** per share are disclosed when they occur.

<!-- … -->

<hr/>

## 32.6 FINANCIAL ANALYSIS AND INTERPRETATION

32.6.1 **32.6.1** When discussing companies, investors and others commonly refer to **earnings per share.** If a company has a simple capital structure, one that contains no convertible bonds or preferred shares, no warrants or options, and no contingent shares, it will present only its **basic earnings per share.**

<!-- … -->
```

</details>

## Labels followed by values

A label followed on the same line by a value or URL MUST be kept as a label–value pair in one
paragraph. Small caps, colour or underlining do not make it a heading. See
[[Recognising Ambiguous Headings]].

<!-- skill:generate
- When a bold, coloured or small-cap label starts a paragraph and the text continues on the same line, keep label and text in one paragraph: "**Section 11.1.1** The Department requires …".
- Keep the label's printed styling as inline marks (**bold**, *italic*, <u>underline</u>; small capitals as capital letters).
- Never turn such a label into a # heading or put it on its own line.
- A label followed by a value or URL on the same line is one paragraph: "**Original Article:** https://…".
-->

<!-- skill:check
- FAIL (MUST) if a label that shares its printed line with following text is rendered as a heading or on a line of its own.
- FAIL (MUST) if the text following a run-in label is split into a separate paragraph from the label.
- WARN (SHOULD) if the run-in label's printed bold, italic or underline is missing.
-->

## Related

- [[Numbered Section Headings]] — the same numbers on their own line, which are headings
- [[Stacked Headings]] — the other way a heading fails to be one line
- [[Bold and Italics]] — the label's bold is printed, so it is kept
- [[Recognising Ambiguous Headings]] — run-in labels among the other heading look-alikes
