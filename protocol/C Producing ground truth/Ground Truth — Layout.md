---
title: Ground Truth — Layout
tags: [ground-truth]
---

# Ground Truth — Layout

How ground truth is produced for the document-level and layout rules. Each step names the rule it
serves; the rule, not this note, says what the result must be.

## Order of work for a document

1. Open the file and settle the document type and the cover from several sheets, including the
   last → [[Document Type]].
2. Sweep a few pages for recurring margin bands and settle them for the whole file →
   [[Recurring Page Furniture]].
3. Annotate page by page. When a page forces an either-way choice for the first time, make it,
   flag that page with the rendering chosen, and hold it from then on →
   [[Choices Made Once Per Document]].
4. Before publishing, run the multi-page checks in [[The annotation QA checklist]].

With only one page available, apply what the page supports and flag the page, so the document
decision can be made once the rest of the file arrives → [[Document Rules]].

## Order of work for a page

1. Confirm the page is clear, correctly cropped and correctly oriented → [[Ignoring and Rejecting]].
2. Review every existing box — boundary, class, rotation, reading order. Imported and generated
   boxes are proposals, not answers: verify each one, and delete duplicates and spurious ones →
   [[Block Annotation]], [[Block Classes]].
3. Add every missing box → [[Block Annotation]].
4. **Hide the boxes** and sweep the full page for unannotated content. With the boxes visible the
   eye fills in what it expects to see; with them hidden, gaps and clipping become obvious.
5. Recheck the reading-order sequence after every addition, deletion or exclusion: each shifts
   everything after it, and a gap or duplicate introduced late is easy to miss →
   [[Reading Order]].
6. Mark the block layer **Checked**, tick **I swept the entire page**, save the draft, then
   **Validate page**. Resolve every blocker and read every warning before publishing.

## Page furniture in attribution references

In a `markdown_attribution` sidecar, every Page-header and Page-footer reference, folios included,
carries `"optional": true`. The bands are still annotated and their text still follows
[[Recurring Page Furniture]] and [[Printed Page Numbers]]; the flag only says that a Markdown output
may leave furniture out (a consumer may drop the bands, see [[Markdown Rendering]]), so a band that
no Markdown element matches is not counted as missed. A band the output does write is scored like
any other block.

## Decorative pictures in attribution references

In a `markdown_attribution` sidecar (scorer version 2), a Picture reference with no text carries
`"decorative": true` when the page prints nothing there that the Markdown must write: purely
decorative background art, shapes and ornaments that print no label or value (they MUST NOT be
described, see [[Slide Furniture]]), a faint background repeat of a mark, or a scan speck. A
decorative picture that no image element stands for is out of coverage; one the output does write
is paired and scored like any other picture. Logos ([[Logos]]), icons that carry a meaning or label a
field ([[Iconography and Symbols]]), photos and illustrations are content and never decorative.

## Regions written as several blocks

When a region is naturally written as several Markdown blocks (a grid of fields, a form, a stacked
label/value list, a heading printed on two lines), annotate it in a `markdown_attribution` sidecar as
one parent reference with `spans` for the blocks. The existing span credit then scores an output
that writes the blocks; the scorer's many-to-one group match (version 2) is only a fallback for
outputs that split the region where the ground truth has no span.

## When a class is unclear

Add a review note and request a second review; never pick a class merely to finish the page →
[[Block Classes]].

## Excluding a region, rejecting a page

- **Ignore this visible region** takes a reason from the allowed list and a short review note →
  [[Ignoring and Rejecting]].
- **Page rejection** takes an explanation, and the annotation lead is notified. A rejected page is
  never published.
- A page with no ink at all is neither: keep it, record that it is blank, and flag it.

## Pages to flag for open points

Flag the page so the pair or the case can be found once the point is settled:

- a court caption block → [[Court Caption Blocks]];
- pleading paper or a line-numbered manuscript; record once, out of the reading flow, that the page
  carries line numbers → [[Pleading Line Numbers]].
