---
title: The Key-Value List
rule_id: forms-the-key-value-list
status: rule
scope: page
tags: [forms]
---

# The Key-Value List

> [!success] ✅ Normative
> Fillable form content MUST be rendered as a Markdown key-value list, not as a table. Every field
> MUST be one list item using the `-` marker.

## The shape

```markdown
### \[Part I\] Information About the Partnership

- \[A\] **Partnership's employer identification number**: 27-4162308
- \[D\] **Check if this is a publicly traded partnership (PTP)**: [ ]
- **CONTACT NAME:** Melinda Clayton
- **FAX (A/C, No):** [blank]
- \[G\]
  - [x] General partner or LLC member-manager
  - [ ] Limited partner or other LLC member
- **Your signature**: [signature: John Doe]
```

## The line format

```text
- \[id\] **Label**: value
```

- The id and the label MUST each appear **only when printed**. A field with no printed id carries
  no brackets.
- An id MUST be written in **escaped** square brackets — `\[1a\]` — **outside** the bold label.
- An empty fill-in MUST be rendered as `[blank]`. A checkbox MUST be rendered as `[x]` (checked) or
  `[ ]` (unchecked).
- An option line MUST be box-first: `- [x] Single`.
- A printed section heading MUST be rendered as a Markdown heading. A box whose id covers several
  fields MUST be rendered as a parent list item with the fields nested beneath it.

## Why the id is escaped

`\[x\]` is a printed field designator "x"; `[x]` is a **checked box**. Without the escape the two
cannot be told apart, and a field id silently becomes a tick.

## Colons

- When the printed label ends in `:`, the colon MUST stay **inside** the bold label:
  `- **CONTACT NAME:** Melinda Clayton`.
- When the value is not printed on the same line as its label — a caption printed under its
  line, an answer area below its question — the `:` after the label MUST be omitted:
  `- **SIGNATURE OF DEPONENT** [blank]`.

<!-- skill:generate
- Render fillable form content as a Markdown list, one field per "- " item, never as a table.
- Line format: "- \[id\] **Label**: value". Write the id only if printed, in escaped brackets \[ \] outside the bold label; write the label only if printed.
- Empty fill-in: [blank]. Checkbox: [x] checked, [ ] unchecked. Option lines start with the box: "- [x] Single".
- A printed section heading becomes a Markdown heading; a box whose id covers several fields becomes a parent item with nested children.
- If the printed label ends with ":", keep the colon inside the bold: "- **CONTACT NAME:** Melinda Clayton". If the value is printed on a different line from the label, add no ":" after the label.
-->

<!-- skill:check
- FAIL (MUST) if labelled form fields are rendered as a <table> instead of "- " list items (fields inside a genuine ruled grid, and blanks inside a sentence, excepted).
- FAIL (MUST) if a printed field id is written unescaped as [id], or inside the bold label.
- FAIL (MUST) if an id or label is present in the Markdown that the page does not print.
- FAIL (MUST) if an empty fill-in is not rendered as [blank], or a checkbox is not rendered as [x] or [ ].
- FAIL (MUST) if a label printed on a different line from its value is followed by ":" added outside the bold label.
-->

## Related

- [[Ids and Labels]] — what counts as an id and what as a label
- [[Values Are Verbatim]] — what goes after the label
- [[Fill-Ins]] · [[Checkboxes]] · [[Option Groups]] — the field shapes
- [[Forms and Key-Value Regions]] — deciding that a region is form content at all
