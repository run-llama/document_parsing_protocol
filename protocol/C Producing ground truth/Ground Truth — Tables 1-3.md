---
title: Ground Truth — Tables 1-3
tags: [ground-truth]
---

# Ground Truth — Tables 1-3

What to do, when producing ground truth, in the cases the table rules on detection, boundaries and
headers leave to review. Each step serves the rule it links to; the rule decides the output.

| Situation | Step | Rule |
| --- | --- | --- |
| A page mixes form fields with a ruled grid | Render the grid as a table and the fields as key-value lines, then flag the page | [[Is This Even a Table]] · [[Forms and Key-Value Regions]] |
| A region is a form, a trailing total outside a frame, a data grid under a chart, or detached aligned cells | Decide it by that case's own rule, not by the relation test alone | [[Is This Even a Table]] |
| A value in a whitespace-aligned block straddles two column tracks | Place it in the track its left edge is closest to and flag the page | [[Borderless Whitespace Tables]] |
| A printed form grid has no values entered | Keep every empty row and flag the page, so a reviewer can see the grid was empty rather than missed | [[Empty Pre-Printed Grids]] |
| A form prints dozens of identical empty rows | Transcribe them all rather than a few, and flag the page | [[Empty Pre-Printed Grids]] |
| A header row cannot be joined to a body (gap, mismatched columns, something in between) | Write the header line as text and flag the page; when the gap makes the join doubtful, do not merge | [[Header-Only Tables]] |
| A fragment's title carries `(cont'd)`, `(continued)` or similar | Keep the marker and note in the review record that the fragment continues an earlier table | [[Continued in the Title]] |
| A table continues across a page break | Keep each fragment on its own page as printed, and set the continuation flags on both fragments after looking at both pages | [[Cross-Page Tables]] |
| Column headers are printed again at the foot of a page's block | Keep the repeat as a row and flag the page | [[Cross-Page Tables]] |
| A paragraph, caption or heading sits between two fragments sharing one header | Merge while the second fragment depends on the header; flag the page when the material in the gap could read as a new section | [[Split Tables Sharing a Header]] |
| A row-label column is printed once beside several value blocks | Place the blocks as further columns of the labelled table and flag the page so the choice is visible | [[Split Tables Sharing a Header]] |
| Stacked header lines could be a wrap or a tier | Run the rule / self-standing-leaves / span test deliberately, not by eye | [[Header Wrap vs Real Tier]] |
| A header stack is finished | Count the leaf tracks and check that every header row adds up to that count before moving on | [[Multi-Row Header Tiers]] |
| A units line could go either way | Take the second header row and keep that choice for the whole document | [[Units Row]] · [[Choices Made Once Per Document]] |
| A table may be printed twice | Decide from the rendered page image, not the text layer | [[Duplicated Tables]] |

## Related

- [[Producing Ground Truth]] — the general procedure these steps belong to
- [[The annotation QA checklist]] — the checks run before a page is called done
- [[Ground Truth — Tables 4-8]] — the same steps for the rest of the tables chapter
