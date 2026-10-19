# DPP working draft 0.1 — starter reference

Core conventions for parsing a document page. This is a practical excerpt, not the full convention guide or a complete interchange schema.

## The contract

The rendered page is the ground truth. Transcribe what is printed, including typos. Use OCR and the PDF text layer as supporting evidence; inspect the image when they disagree. Do not complete clipped words from context or make a number more plausible.

Preserve visible content and the structure the page supports. Do not add a label, value, cell span, header tier, or relationship that is not supported by the print. Keep commentary about parsing separate from the extracted content.

### Three rule states

- Settled: follow the convention.
- Accepted either way: choose a supported encoding, record it, and use it consistently within the document.
- Open: preserve the visible evidence, make the uncertainty explicit, and flag the region. Do not present a working choice as a settled rule.

### Scope

A page rule can be applied from one page. A document rule needs other pages of the same file. From a single page, do not infer the document's heading hierarchy, recurring furniture, or a table continuation. Preserve the available fragment and flag what requires more context.

## Tables

### Boundaries

- Recognize aligned rows and columns even when no borders are printed. Whitespace alone can establish a table.
- Use borders, fills, column tracks, and header structure to establish the boundary. A date band or shaded row within the grid does not automatically begin another table.
- A title sharing the table's border or fill belongs in a spanning row. A title outside the frame is caption text. Include the title once.
- Retain the last row, trailing summaries, detached islands, and sparse columns. Examine their alignment and framing before deciding how to represent them.
- Preserve each visible cross-page fragment separately and flag a suspected continuation. Do not silently merge fragments.

### Headers and cells

- Count the leaf columns from the body. Preserve each real header tier with its exact colspan. A group header spans only its data columns; a row-label stub can span header rows.
- Join a wrapped header label with a space when it still labels one column. A line break alone is not another header tier.
- A value printed at separate positions belongs in separate cells, even when the strings match. Use rowspan or colspan only where the page supports a merged cell.
- Keep empty cells empty. Whitespace beside a label is not evidence that the label spans that space.
- Attach a detached currency glyph to its number in one cell. Do not add currency symbols to values where they are not printed.
- Preserve accounting notation verbatim: parentheses, separators, percent signs, currency marks, and dashes. Do not normalize values during transcription.
- A subtotal label uses a header cell; its values remain ordinary data cells. Preserve printed row order and indentation. Do not add bold styling where it is absent.
- Encode label indentation with absolute data-level values counted from the left edge of the stub, not relative to the preceding row. Indentation alone does not establish arithmetic membership.
- Keep footnote text outside the table, even when it is inside the table's ruled frame. Preserve its marker and wording.

### Examples of representation

These are small encoding illustrations, not parser output or evidence from a source page.

```html
<!-- Two printed copies remain two cells. -->
<td>6,485</td><td>6,485</td>

<!-- Preserve accounting notation. -->
<td>(565)</td>

<!-- One date wrapped over two printed lines is one leaf header. -->
<th>September 28, 2024</th>

<!-- A period group spans its two date columns. -->
<th colspan="2">Three Months Ended</th>
```

## Forms

- Represent fields as a key-value list rather than inventing a table around an ungridded form.
- Preserve labels, field identifiers, instructions, and preprinted values. Do not invent a label for an unlabeled field.
- Write [___] for a blank answer field. A field spanning several writing lines is still one field.
- Preserve checkboxes and radio choices as [ ] or [x]. An unchecked box is content, not an instruction to omit it.
- Keep options grouped with their question and preserve pick-one instructions. Do not infer a choice from context.
- Retain instructions and fine print in their printed position among fields. A genuine data table embedded in a form remains a table.

## Text and page structure

- Preserve meaningful reading order, paragraph boundaries, labels, and list structure. Keep a run-in label with the sentence or value it introduces.
- Join a wrapped title that is one title. Do not combine a company name or page furniture with it automatically.
- Use <hr/> for a printed section separator. Reserve --- for page boundaries in Markdown output.
- Keep visible parts of clipped text and describe the clipping separately. Do not reconstruct hidden characters.
- Escape printed characters when Markdown would interpret them as syntax. Escaping preserves the characters; it does not authorize deleting them.
- Preserve deleted and inserted text where the page shows revisions. Keep the exact printed spans separate.
- Represent a contiguous redaction as [REDACTED], keeping any visible printed code. Never guess the hidden text.
- Preserve legible marginal handwriting separately near the content it annotates. Flag uncertain associations.

## Charts

- Inspect every panel, series, labeled position, and printed callout. Distinguish actual data marks from reference lines, trend lines, and event annotations.
- Copy printed labels and values exactly before considering geometric estimates. Never attach a tolerance to an exact printed value.
- If a task requests an estimate, use the mark's own axis, account for logarithmic or secondary axes, and label the result as an estimate. Do not substitute an estimate for visible text.
- Do not invent labels or compute unprinted values as though they were on the page. Flag regions that cannot be read reliably.
- The complete guide defines additional chart annotation formats. This starter does not specify that schema or provide a chart evaluation tool.

## Review record

After the transcription, identify the inspected page(s), any accepted encoding choices, and each unresolved region. Distinguish what is visible, what an existing annotation claims, and what you chose to encode. Record requested deviations from this draft explicitly.

## Source and scope

Adapted for use outside the annotation application from the DPP guide's How to Use This Guide, Quick Reference, and annotation QA checklist, as of September 17, 2026.

This file is self-contained. The package's SKILL.md is a parsing workflow written for this starter.


---

# DPP — page QA checklist

A portable adaptation of the annotation guide's QA checklist. Compare the actual source page with the extraction; do not tick a check that was not performed.

## Tables: eight checks

1. **Boundary.** Inspect border and fill. Is a title or band inside the table, or separate caption text? Is it represented once?
2. **Column count.** Count leaf columns in the body. Account for occupied rowspan cells when checking each row's effective width. Does every group header span only its own data columns?
3. **Merged cells.** Prove each rowspan and colspan from the image. Did separately printed repeated values survive as separate cells?
4. **Parallel blocks.** Inspect every repeated block independently. Did later years, topics, or panels lose a subsection?
5. **Bottom edge.** Check the last printed row, trailing summaries, detached islands, and sparse trailing columns.
6. **Accepted alternatives.** Record the chosen encoding and keep it consistent. A permitted alternative is not automatically an error.
7. **Claim types.** Separate source evidence, existing annotation, chosen encoding, settled rule, and unresolved question.
8. **Conflicts.** Flag competing interpretations or rules. Do not silently settle an open question.

## Forms and text

- Check blank fields, unchecked options, field identifiers, instructions, and repeated labels against the page.
- Check reading order and the boundaries between paragraphs, captions, tables, notes, and page furniture.
- Preserve printed number formats, visible clipping, redactions, and meaningful marks without filling gaps from context.

## Charts

- Count panels, series, and data marks before checking values. Inspect tails and small marks as well as prominent ones.
- Locate each point with printed labels and the appropriate axis.
- Search for exact printed values before estimating from geometry.
- Identify estimates explicitly; distinguish reference ink from data.
- Flag unreadable marks, ambiguous axes, or a requested output schema not specified by this starter.

## Across pages, when available

- Keep accepted encoding choices consistent across the supplied document.
- Check recurring headers and footers and heading continuity using the actual other pages.
- Preserve cross-page table fragments and flag suspected continuations instead of merging silently.

## Completion record

Record: which page or crop was inspected; which convention applies; what is visible; what was an encoding choice; and what remains unresolved. List independent issues separately.

Adapted September 17, 2026 from the DPP guide's annotation QA checklist and core conventions. Application-specific Publish/Checked controls and benchmark schema requirements are omitted. This is a manual review checklist, not an automated conformance test.
