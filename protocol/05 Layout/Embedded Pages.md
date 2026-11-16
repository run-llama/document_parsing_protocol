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

## Explicit embedded-page boundaries

A producer MAY enclose a reproduced page in `<sub_page>…</sub_page>`. This is a protocol-defined
structural wrapper, not printed text and not a new physical page. Output without the wrapper
continues to conform when the required content and reading order are preserved.

- Each opening `<sub_page>` MUST have a matching closing tag. Tags MUST be properly nested and
  MUST NOT cross a physical page boundary. Multiple embedded pages use separate wrappers in
  reading order; a further nested wrapper is appropriate only when the reproduced page visibly
  contains another page.
- The outer page's header, labels and footer MUST remain outside the wrapper. The embedded
  page's own header, body and footer MUST remain inside it, in their printed reading order.
- Optional `<header>` and `<footer>` bands belong to the nearest enclosing `<sub_page>`; outside
  any such wrapper they belong to the physical page. A filename printed below an embedded scan
  belongs to the outer page, not to the scan's footer.
- Repeated printed pagination MUST be retained at each printed occurrence. A consumer MUST NOT
  deduplicate equal page numbers across the outer and embedded pages or across repeated stamps.
- A consumer that does not use embedded-page structure MUST ignore only the opening and closing
  wrapper tags, retaining all enclosed content and block boundaries. The wrapper MUST NOT be
  transcribed as words or interpreted as an instruction to omit its contents.
- The wrapper does not add a sidecar page, change physical page numbering, or create a new layout
  element class. Existing elements keep their boxes in the containing physical page's coordinate
  system. See [[The Sidecar]] and [[Block Classes]].

### ✅ **Sample** — a court scan inside a faxed page (constructed excerpt)

![[embedded-court-scan-boundaries.png]]

This boundary-only excerpt follows ParseBench-2's `text_ocr__contrast` page. The outer fax line
prints `PAGE 04/29`. The embedded court scan prints `Page 3 of 28` three times: at its upper right,
below its court heading, and at its lower right. The outer page ends with the printed filename
`court document 2.tiff`. The personal case narrative and identifying fields are omitted from this
teaching excerpt; omission comments below are editorial and are not printed source content.

```text
Fax line … PAGE 04/29                         ← outer header
┌──────────────────────────────────────────┐
│                         Page 3 of 28     │  ← embedded header
│ IN THE DISTRICT COURT OF BECKHAM          │
│ STATE OF OKLAHOMA                        │
│ Page 3 of 28                             │  ← another printed stamp
│ … case content …                        │
│                         Page 3 of 28     │  ← embedded footer
└──────────────────────────────────────────┘
court document 2.tiff                        ← outer footer
```

<details>
<summary>Expected Markdown · boundary-only excerpt</summary>

```markdown
<header>
<!-- Remaining fax header fields omitted from this excerpt. -->
PAGE 04/29
</header>

<sub_page>

<header>
Page 3 of 28
</header>

IN THE DISTRICT COURT OF BECKHAM
STATE OF OKLAHOMA
Page 3 of 28

<!-- Case identifiers and body omitted from this excerpt. -->

<footer>
Page 3 of 28
</footer>

</sub_page>

<footer>
court document 2.tiff
</footer>
```

</details>

The stamp below the court heading stays at that printed position; it is not moved to the outer
page's header. No additional standalone `3` is supplied. The filename is visible text, not merely
an image destination: an image link to `court_document_2.tiff` does not transcribe it.

### ❌ **Counter-sample** — treating the embedded page as ignorable content (constructed excerpt)

![[embedded-court-scan-boundaries.png]]

For the same page, this excerpt loses the court scan and is invalid:

```markdown
<header>PAGE 04/29</header>
<sub_page></sub_page>
<footer>court document 2.tiff</footer>
```

<details>
<summary>Expected Markdown · boundary-only excerpt</summary>

```markdown
<header>
<!-- Remaining fax fields omitted from this excerpt. -->
PAGE 04/29
</header>

<sub_page>

<header>Page 3 of 28</header>

IN THE DISTRICT COURT OF BECKHAM
STATE OF OKLAHOMA
Page 3 of 28

<!-- Case identifiers and body omitted from this excerpt. -->

<footer>Page 3 of 28</footer>

</sub_page>

<footer>court document 2.tiff</footer>
```

</details>

The correct boundary-only excerpt retains the inner document. A complete transcription must also retain the case
content omitted for this teaching example. The presence of `<sub_page>` never authorizes dropping
that content. Ordinary columns, tables and text boxes are not embedded pages merely because a
border surrounds them.

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
- You may wrap each reproduced page in <sub_page>…</sub_page>, leaving outer furniture outside and embedded furniture inside. Header/footer bands belong to the nearest enclosing sub_page. Retain all repeated printed pagination and any visible outer filename. The wrapper adds no physical page or layout class; ignore its tags only, never its contents.
- Keep both page numbers, each in its own band. Never make a title inside an embedded screenshot a heading of the outer document.
-->

<!-- skill:check
- FAIL (MUST) if the wrapper's header, label, filing stamp or footer is missing, or either of the two page numbers is dropped.
- FAIL (MUST) if embedded content appears before the wrapper header or after the wrapper footer.
- FAIL (MUST) if sub_page tags are unbalanced, cross physical page boundaries, absorb outer furniture, or cause any enclosed content to be omitted or the tag name to be transcribed.
- FAIL (MUST) if repeated printed pagination is deduplicated or an extra page number is invented.
- FAIL (MUST) if a title inside an embedded form screenshot is rendered as a Markdown heading.
-->

## Related

- [[Overlapping Text]] — the same stamp printed on top of content
- [[Court Caption Blocks]] — the head of the wrapping document
- [[Block Classes]] — Page-header and Page-footer, twice over
- [[Printed Page Numbers]] — the folio is recorded on its own; here there are two
