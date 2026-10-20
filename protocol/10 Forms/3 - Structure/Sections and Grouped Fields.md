---
title: Sections and Grouped Fields
rule_id: forms-sections-and-grouped-fields
status: rule
scope: page
tags: [forms]
---

# Sections and Grouped Fields

> [!success] ✅ Normative
> A printed heading that names a group of fields opens a section. Only a printed grouping MAY get a
> parent: fields MUST NOT be wrapped in a section or group the form does not print.

A printed grouping takes one of two shapes, depending on its size.

## Form grouping and the document outline

The Markdown headings of this rule delimit local form groups. They do not make every form label a
section of the document: a form's section labels are form content and MUST NOT be added to the
containing page's outline — least of all inside an embedded screenshot of a form. See
[[Recognising Ambiguous Headings]] for form furniture and real document titles.

## Band or part headings become Markdown headings

A bold or boxed caption in the margin or spanning the page — `Part I`, `Filing Status`,
`POLICY INFORMATION`, `Sign Here` — MUST be rendered as a `###` heading, and every field printed
under or beside it MUST follow that heading.

The heading is **in addition to** the field labels inside it; both MUST be kept.

Where a printed designator sits beside a descriptive title, the designator is the id and the title
is the heading text:

```markdown
### \[Part II\] Information About the Partner

- \[E\] **Partner's SSN or TIN (Do not use TIN of a disregarded entity. See inst.)**: 38-7714902
- \[I1\] **What type of entity is this partner?**: CORPORATION
```

![[form-k1-p1.png]]

Bands with no printed ids work the same way:

```markdown
### POLICY INFORMATION

- **PROPOSED EFF DATE**: 08/23/2026
- **PROPOSED EXP DATE**: 08/23/2027
- **PAYMENT PLAN**: MONTHLY
- **MINIMUM PREMIUM**: [blank]
- **POLICY PREMIUM**: 34,259.95
```

![[form-commercial-application-p1.png]]

A section almost never holds a single field. One field under a heading usually means the heading
was invented.

## Small captioned boxes become nested list items

A printed box whose label groups a few entries MUST be rendered as a parent list item with its
entries nested one level beneath it:

```markdown
- \[e\]
  - **Employee's first name and initial**: Joan Jackson
  - **Last name**: [blank]
  - **Suff.**: [blank]
- \[12a\]
  - **Code**: D
  - 1,500.00
- \[15\]
  - **State**: SC
  - **Employer's state ID number**: 00-0000056
```

The `12a` amount slot prints no label, so it is the bare value; an unlabelled empty entry would be
a bare `[blank]` — see [[Fill-Ins]].

## Repeating groups without labels

Field groups that repeat without a printed heading are anonymous groups in printed order,
separated by blank lines, with no invented `Vehicle 1` heading — see
[[Open Questions on Forms|Repeated and Unlabelled Fields]].

## Never invent a wrapper

The W-2 is almost entirely flat. It prints no `Identification` or `Employer` grouping, so neither
appears in the output. Inventing one is the same failure as inventing a table header: it adds
structure the page does not have.

<!-- skill:generate
- A bold or boxed band naming a group of fields (Part I, POLICY INFORMATION, Sign Here) becomes a "### " heading, with its fields as list items below it. If a designator is printed beside the title, write it as the id: "### \[Part II\] Information About the Partner".
- A small printed box whose label covers several entries becomes a parent list item with the entries nested beneath it.
- Never add a heading or parent group the form does not print. Do not make form section labels part of the document's own heading outline.
-->

<!-- skill:check
- FAIL (MUST) if a printed band or part heading over a group of fields is missing or is not a Markdown heading.
- FAIL (MUST) if a heading or parent group appears in the Markdown that the form does not print.
- FAIL (MUST) if fields printed in a small captioned box are not nested under that box's parent item.
- WARN (SHOULD) if a section heading has exactly one field under it (a sign the heading was invented).
-->

## Related

- [[The Key-Value List]] — the line format inside each section
- [[Fill-Ins]] — the entries a box groups
- [[Form Reading Order]] — sections do not interleave
- [[Ids and Labels]] — the designator beside a section title
