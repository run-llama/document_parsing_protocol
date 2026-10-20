---
title: Repeated and Unlabelled Fields
rule_id: forms-repeated-and-unlabelled-fields
status: rule
scope: page
order: 2
tags: [forms]
---

# Repeated and Unlabelled Fields

> [!success] ✅ Normative
> Field groups that repeat without a printed heading MUST be kept as anonymous groups in printed
> order, separated by a blank line in the Markdown. The output MUST NOT invent a heading, label or
> positional id — no `Vehicle 1`, no `Child 2` — for a group or field the page does not name.

## Repeating unlabelled record blocks

Insurance-application premises, vehicle and applicant blocks, and family-court residence blocks
repeat the same field set several times and **print no heading of their own**.

![[form-vehicle-blocks.png]]

- Each repetition MUST be rendered as its own group of key-value lines, in printed order.
- Consecutive groups MUST be separated by one blank line in the Markdown; when a sidecar is
  produced, each group MUST be its own nested group of items.
- A heading, number or label that the page does not print MUST NOT be added to tell the groups
  apart.

## Where non-field text goes

Instructions, preambles and fine print MUST be transcribed at their printed reading position,
between the fields they accompany — see [[Fields Outside the Form]].

## Unlabelled entries with no id

An entry with neither a printed id nor a printed label MUST be rendered as its bare value, or as a
bare `[blank]` when it is empty. A label or positional id MUST NOT be invented for it.

### ✅ **Sample** — three identical child blocks

![[bag-family-court-repeated-child-blocks.png]]

Section 2 prints `Child’s Name` / `Address` / `City, State` / `Dates: From … To` / `Lived with`
/ `Relationship to Child` three times over, with no heading on any of the three blocks. Each
block is an anonymous group, read row by row; the blocks are separated by blank lines.

<details>
<summary>Expected Markdown · excerpt, section 2</summary>

```markdown
- **Case No.**: [blank]

### \[2\] INFORMATION REGARDING WHERE THE CHILDREN UNDER 18 YEARS OLD HAVE LIVED FOR THE LAST 5 YEARS (or since birth, if younger than 5).

- **Child’s Name:** [blank]
- **Dates:**
  - **From**: [blank]
  - **To**: [blank]
- **Address:** [blank]
- **Lived with:** [blank]
- **City, State:** [blank]
- **Relationship to Child:** [blank]

- **Child’s Name:** [blank]
- **Dates:**
  - **From**: [blank]
  - **To**: [blank]
- **Address:** [blank]
- **Lived with:** [blank]
- **City, State:** [blank]
- **Relationship to Child:** [blank]

- **Child’s Name:** [blank]
- **Dates:**
  - **From**: [blank]
  - **To**: [blank]
- **Address:** [blank]
- **Lived with:** [blank]
- **City, State:** [blank]
- **Relationship to Child:** [blank]

<!-- … -->
```

</details>

<!-- skill:generate
- When a form repeats the same set of fields with no heading on each repetition, output each repetition as its own group of "- **Label:** value" lines, in printed order, with one blank line between groups.
- Never add headings or labels such as "Vehicle 1" or "Child 2" that the page does not print.
- A field with no printed id and no label is written as its bare value, or a bare [blank] when empty.
-->

<!-- skill:check
- FAIL (MUST) if a heading, number or label not printed on the page (e.g. "Vehicle 1") is added to a repeated field group.
- FAIL (MUST) if a repeated field group is dropped, merged into another, or moved out of printed order.
- FAIL (MUST) if an unlabelled field is given an invented label or positional id.
- FAIL (MUST) if consecutive repeated groups are not separated by a blank line.
-->

## Related

- [[The Key-Value List]] — the line format every group uses
- [[Sections and Grouped Fields]] — groups that do print a heading
- [[Fields Outside the Form]] — where non-field text is placed
- [[Values Are Verbatim]] — what goes after the label
