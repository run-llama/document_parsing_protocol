---
title: Marginal Notes
rule_id: layout-marginal-notes
status: rule
scope: page
tags: [layout, rule, structure, legal]
---

# Marginal Notes

> [!success] ✅ Normative
> Each printed marginal note MUST be rendered as a separate block placed immediately after the
> element it annotates. Where the element it belongs to cannot be established, the note MUST still
> be kept as a separate block and MUST NOT be merged into body text.

Statutes and some textbooks print short notes in the outer margin — a citation, a one-word
gloss — aligned with the line they annotate. They are printed text, not handwriting, and they
belong to a particular line.

```text
SEC. 105. INVESTIGATIONS AND DISCIPLINARY PROCEEDINGS.        15 USC 7215.
   (a) IN GENERAL.—The Board shall establish, by rule, …      Establishment.
```

## Requirements

- A marginal note MUST be its own element, never part of the heading or paragraph it sits beside.
- It MUST follow the element it annotates — the heading or paragraph level with it — in reading
  order, before the next element of the body.
- A geometric reading that inserts `15 USC 7215.` into the middle of the section heading, or
  splices a gloss into a line of the paragraph, does not conform.

### ✅ **Sample** — a public law with sidenotes

![[bag-statute-sidenotes.png]]

`15 USC 7215.` and `Establishment.` in the right margin, level with `SEC. 105.` and `(a) IN
GENERAL.`; the body is set in one narrower column. The small capitals of `IN GENERAL` are
transcribed as capitals. The heading depth is relative: the page does not show the outline above
the section.

<details>
<summary>Expected Markdown · excerpt from SEC. 105</summary>

```markdown
## SEC. 105. INVESTIGATIONS AND DISCIPLINARY PROCEEDINGS.

15 USC 7215.

(a) IN GENERAL.—The Board shall establish, by rule, subject to the requirements of this section, fair procedures for the investigation and disciplining of registered public accounting firms and associated persons of such firms.

Establishment.

<!-- … -->
```

</details>

<!-- skill:generate
- Render each note printed in the page margin (a citation such as "15 USC 7215.", a one-word gloss) as its own paragraph.
- Place it immediately after the heading or paragraph it is level with; never insert it inside that heading or paragraph.
- If it is unclear which block a margin note belongs to, still keep it as its own paragraph near its printed position.
-->

<!-- skill:check
- FAIL (MUST) if a printed marginal note is missing from the Markdown.
- FAIL (MUST) if a marginal note's text is merged into a heading or paragraph instead of standing as its own block.
- WARN (SHOULD) if a marginal note is placed away from the element it is level with on the page.
-->

## Related

- [[Reading Order]] — notes go where a reader meets them
- [[Run-In Headings]] — the small-cap run-in heads on the same page
- [[Handwritten Annotations]] — the handwritten equivalent
- [[Small Capitals]] — how `IN GENERAL` is transcribed
