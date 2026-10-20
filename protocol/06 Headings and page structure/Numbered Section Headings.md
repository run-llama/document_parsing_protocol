---
title: Numbered Section Headings
rule_id: headings-numbered-section-headings
status: rule
scope: page
tags: [structure, headings, lists]
---

# Numbered Section Headings

> [!success] ✅ Normative
> A numbered line that stands alone as a title with body text beneath it MUST be rendered as a
> heading, one level deeper per level of numbering. A numbered line that is itself the content —
> including a bare number printed above its paragraph — MUST be rendered as a list item carrying
> that content. The printed number MUST be kept exactly as printed, on the same line as its text.

Legal and technical documents number their sections — `1.`, `1.1.`, `2.3.` — and set each on its
own line, often underlined or bold, with a paragraph beneath. On the page this is a heading; in the
text layer it is indistinguishable from an ordered list.

```text
1.    AFFIDAVIT

1.1.  COMPLETION AND SIGNATURE
      The Commissioner of Oaths must print his full name …
1.2.  SECURITY
      If security is claimed, then the amount …
```

## Heading or list item

| The page prints | Rendering |
| --- | --- |
| A numbered title on its own line, with body text beneath (`1. AFFIDAVIT`) | heading, depth from the numbering: `## 1. AFFIDAVIT`, `### 1.1. COMPLETION AND SIGNATURE` |
| A numbered line that is itself the content | list item: `3. The Registrar will set the matter down …` |
| A bare number on a line of its own, above its paragraph (`29.`) | list item: the number joins its paragraph's line, `29. As a direct and proximate result …` |

The test is the one [[Recognising Ambiguous Headings]] applies: a title organises the block
beneath it; a numbered paragraph is an item of an enumeration. Heading depth follows the printed
numbering, as [[Heading Depth Across Pages]] requires.

A bare number is moved onto its paragraph's line because it labels that paragraph ("paragraph
29"). Left on a line of its own it would read as an empty list item followed by an unrelated
paragraph. Only the centring is lost, and centring is layout.

## Numbers are written verbatim

The printed number MUST be written as printed — `29.`, `1.1.`, `(a)`, `IV.` — and MUST NOT be
renumbered, normalised or escaped to prevent list parsing. A number that is a valid Markdown list
marker (`29.`) then renders as a list item; one that is not (`1.1.`, `(a)`) renders as a paragraph
beginning with the number. Both carry the printed numbering exactly in the source, which is what
the output is judged on; a renderer that shows skipped numbers (29, 31) as consecutive is a display
artefact, not a change to the output.

The one exception is a line that Markdown would turn into a list although the page prints no list,
such as a sentence that begins `1995. was a record year`. Its marker MUST be escaped (`1995\.`) —
see [[Escaping Printed Marks]].

### ✅ **Sample** — two-level numbered notes

![[bag-numbered-headings.png]]

"1. AFFIDAVIT" over "1.1. COMPLETION AND SIGNATURE", "1.2. SECURITY", each sub-heading underlined
with a paragraph beneath it. Four top-level numbers on the page, sub-numbered under two of them.
Each numbered line is a heading, one level deeper per level of
numbering; the depths shown assume this page opens the document, under its title.

<details>
<summary>Expected Markdown</summary>

```markdown
# NOTES ON WINDING-UP PROCEDURE

## 1. AFFIDAVIT

### 1.1. COMPLETION AND SIGNATURE

The Liquidator must print his full name, capacity and date of appointment on the affidavit before signing it in the presence of a Commissioner of Oaths. An unsigned or undated affidavit will be returned without further consideration.

### 1.2. SECURITY

If security is claimed on any asset listed in the affidavit, the amount claimed and the name of the secured party must be stated in full. Where no security is claimed, the affidavit must say so expressly rather than leaving the field blank.

## 2. FILING

The completed affidavit, together with the annexed schedule of assets, must be filed with the Registrar within fourteen days of the Liquidator's appointment. A copy is retained on the estate file for the duration of the winding-up.

## 3. OBJECTIONS

### 3.1. NOTICE PERIOD

Any creditor wishing to object to an item in the schedule must lodge a written objection with the Registrar within twenty-one days of the affidavit being filed, stating the item objected to and the grounds.

### 3.2. HEARING

Where an objection is lodged in time, the Registrar will set the matter down for hearing and notify the Liquidator and the objecting creditor of the date.

## 4. COSTS

The costs of preparing and filing the affidavit are a first charge on the estate and are payable before any distribution to creditors.
```

</details>

### ✅ **Sample** — a paragraph number on its own line

![[bag-numbered-paragraphs-centred.png]]

`29.` to `34.` each centred on a line of their own, the paragraph beneath. The number is
neither a heading with text nor a list marker on the paragraph's line. The numbered paragraph is the text, so each number opens a list item carrying its paragraph. The
depth of `DAMAGES` is relative: the page does not show the outline above it.

<details>
<summary>Expected Markdown</summary>

```markdown
## DAMAGES

29. As a direct and proximate result of Defendant Harlan Office Supply Co.'s breach of the Purchase Agreement described above, Plaintiff Midvale Clinic LLC was unable to furnish its new waiting room in time for its scheduled opening and was forced to delay the opening by six weeks.

30. Plaintiff was required to source substitute seating from a third-party vendor on an emergency basis, at a cost substantially higher than the price agreed with Defendant for the same quantity and specification of chairs.

31. Plaintiff incurred additional costs for storage of the partial, non-conforming shipment that Defendant did deliver, which Plaintiff was unable to use and unable to return without incurring a restocking penalty under the Purchase Agreement.

32. Plaintiff lost revenue from patients who could not be scheduled during the delay described in Paragraph 29, in an amount to be proven at trial.

33. Plaintiff's reputation in the community was harmed by the delayed opening, which was reported in a local business newsletter and required Plaintiff to issue a public clarification to patients and referring physicians.

34. As a further direct and proximate result of Defendant's breach, Plaintiff has suffered damages in an amount to be determined at trial, but believed to exceed $75,000, together with interest, costs, and such other relief as the Court deems just and proper.
```

</details>

## Repeated item labels

“Question N”, “Interrogatory No. N” and “Request for Production N” are item labels, even when bold
and alone on a line, and MUST NOT be rendered as headings. A standalone section title organises a
block; a recurring label merely identifies the next item. See [[Recognising Ambiguous Headings]]
for the distinction in context.

<!-- skill:generate
- Keep a printed section or paragraph number on the same line as its text, exactly as printed ("1.1.", "29.", "(a)"); never renumber it and never escape it just to avoid list formatting.
- If a numbered title stands alone with body text beneath it, render it as a heading, one level deeper for each level of numbering: "## 1. AFFIDAVIT", "### 1.1. COMPLETION AND SIGNATURE".
- If the numbered line is itself the content, or a bare number stands above its paragraph, render a list item carrying the paragraph: "29. As a direct and proximate result …".
- Escape a number only when a line would become a Markdown list although the page prints none (a sentence beginning "1995. was …" → "1995\. was …").
- Never make "Question N", "Interrogatory No. N" or "Request for Production N" labels into headings.
-->

<!-- skill:check
- FAIL (MUST) if a printed section or paragraph number is dropped, renumbered or separated from its text.
- FAIL (MUST) if a numbered title with body text beneath it is not a heading, or a numbered paragraph is rendered as a heading.
- FAIL (MUST) if a subsection number (1.1.) is rendered at the same or a shallower heading depth than its parent (1.).
- FAIL (MUST) if a bare paragraph number is left on a line of its own instead of joining its paragraph.
- WARN (SHOULD) if a repeated item label such as "Interrogatory No. 8:" is rendered as a heading, or a numbered list marker is escaped although the numbered text is a list item.
-->

## Related

- [[Bullets and Sub-Bullets]] — ordered lists keep their printed numbering
- [[Block Classes]] — Section-header versus List-item
- [[Table of Contents]] — where the same numbers reappear as an index
- [[Heading Depth Across Pages]] — printed numbering sets the depth
