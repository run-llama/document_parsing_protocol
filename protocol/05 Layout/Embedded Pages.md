---
title: Embedded Pages
rule_id: layout-embedded-pages
status: rule
scope: page
tags: [rule, layout, legal]
---

# Embedded Pages

> [!success] ✅ Normative
> A page reproduced inside another page MUST be rendered as the wrapper's furniture followed by the
> embedded page in its own reading order. Both page numbers MUST be kept, each with its own region,
> and titles inside an embedded form screenshot MUST NOT be promoted into the wrapper's outline.

A page reproduced inside another page: a statute page shrunk into the middle of an exhibit sheet, a
slide placed on a letter-size page. Each carries its own header and page number, so the sheet has
two of everything.

```text
      Case 1:23-cv-06750   Document 1-4   Filed 08/02/23   Page 4 of 4     ← wrapper header
                              EXHIBIT D
                          ┌────────────────────┐
                          │   H. R. 2617—507   │  ← embedded header
                          │   (1) The term …   │
                          └────────────────────┘
                              Page 3 of 3                                  ← wrapper footer
```

## Requirements

- The wrapper's label and filing stamp MUST be kept: they identify the particular copy.
- The embedded content MUST appear between the wrapper header and the wrapper footer, in the
  embedded page's own reading order.
- The wrapper's page number and the embedded page's number MUST both be kept, each where its own
  band prints it.
- A title printed inside an embedded form screenshot MUST NOT become a heading of the wrapping
  document.

### ✅ **Sample** — a statute page as an exhibit

![[bag-embedded-statute-page.png]]

A blue e-filing header in four parts, a red `EXHIBIT D` label, then a reduced statute page with its
own running head `H. R. 2617—507`, and a red `Page 3 of 3` at the foot. Expected boxes: four
Page-header elements for the e-filing line, Text for `EXHIBIT D`, a Page-header for the embedded
running head, one Text per statute paragraph, and a Page-footer for `Page 3 of 3`. The colours are
decoration and are not carried.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
Case 3:26-cv-01184

Document 1-4

Filed 02/11/26

Page 4 of 4

**EXHIBIT D**

H. R. 2617—507

(1) The term "affiliated technician" has the meaning given such term in section 101 of title 38, United States Code.

(2) The term "covered household" means a household, as such term is defined in section 101 of title 38, United States Code, that has a member with a service-connected disability that results in the inability to procreate without medical assistance.

<!-- … -->

SEC. 220. (a) Except as provided in subsection (b), the Secretary of Veterans Affairs, in consultation with the Secretary of Defense and the Secretary of Labor, shall discontinue using Social Security account numbers to identify individuals in all information systems of the Department of Veterans Affairs as follows:

Page 3 of 3
```

</details>

<!-- skill:generate
- When a page is reproduced inside another (an exhibit, a slide on a letter page), output the wrapper header first, then the wrapper label (e.g. EXHIBIT D), then the embedded page in its own reading order including its own running head, then the wrapper footer.
- Keep both page numbers, each in its own band. Never make a title inside an embedded screenshot a heading of the outer document.
-->

<!-- skill:check
- FAIL (MUST) if the wrapper's header, label, filing stamp or footer is missing, or either of the two page numbers is dropped.
- FAIL (MUST) if embedded content appears before the wrapper header or after the wrapper footer.
- FAIL (MUST) if a title inside an embedded form screenshot is rendered as a Markdown heading.
-->

## Related

- [[Overlapping Text]] — the same stamp printed on top of content
- [[Court Caption Blocks]] — the head of the wrapping document
- [[Block Classes]] — Page-header and Page-footer, twice over
- [[Printed Page Numbers]] — the folio is recorded on its own; here there are two
