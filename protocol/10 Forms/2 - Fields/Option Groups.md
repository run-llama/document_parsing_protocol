---
title: Option Groups
rule_id: forms-option-groups
status: rule
scope: page
tags: [forms]
---

# Option Groups

> [!success] ✅ Normative
> A question answered by ticking one or more of several printed boxes MUST be rendered as **one
> group**: the caption line, then one nested box-first line per option. Every printed option MUST
> be listed, ticked or not.

## Pick-one

```markdown
- **Filing Status**
  - [x] Single
  - [ ] Married filing jointly
  - [ ] Married filing separately (MFS)
  - [ ] Head of household (HOH)
  - [ ] Qualifying widow(er) (QW)
```

## A group whose caption is only its id

W-2 box 13 prints three independent checkboxes. They are one printed cluster, so they are one
group, captioned by the id alone:

```markdown
- \[13\]
  - [x] Statutory employee
  - [ ] Retirement plan
  - [ ] Third-party sick pay
```

## Options keep their own ids and may carry a write-in

An option MUST keep its printed id — here printed before the box, and written there — and an
option with a write-in MUST carry the write-in after its box:

```markdown
- \[16\] **Tax (see instructions). Check if any from Form(s):**
  - \[1\] [ ] 8814
  - \[2\] [ ] 4972
  - \[3\] [ ] [blank]
- \[16\]: 0.00
```

The line-16 **amount** is a separate unlabelled entry that shares the printed id, rendered right
after the group. An id printed once per role appears once per role; that is not a duplicate.

## Yes/No questions are option groups

A caption with two boxes — a virtual-currency question, K-1 items G and H1 — has the same
structure as a five-option filing status and MUST be rendered the same way.

![[form-option-groups.png]]

```markdown
- **At any time during 2020, did you receive, sell, send, exchange, or otherwise acquire any financial interest in any virtual currency?**
  - [x] Yes
  - [ ] No
```

<!-- skill:generate
- A question answered by ticking printed boxes is one group: "- **Caption**" (or "- \[id\]" when only an id is printed), then one nested line per option: "  - [x] Option" / "  - [ ] Option".
- List every printed option, ticked or not. Yes/No questions are groups too.
- Keep an option's own printed id where it is printed; when printed before the box: "  - \[1\] [ ] 8814". A write-in goes after the box: "  - \[3\] [ ] [blank]".
-->

<!-- skill:check
- FAIL (MUST) if a printed option of a group is missing from the Markdown.
- FAIL (MUST) if the options of one printed question are not nested under a single caption line.
- FAIL (MUST) if an option line does not start with its box ([x] or [ ]), apart from a printed option id placed before the box.
-->

## Related

- [[Checkboxes]] — the state of each box
- [[The Key-Value List]] — the line format
- [[Ids and Labels]] — option ids and caption ids
