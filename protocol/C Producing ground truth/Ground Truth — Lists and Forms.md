---
title: Ground Truth — Lists and Forms
tags: [ground-truth]
---

# Ground Truth — Lists and Forms

What to do, when producing ground truth, in the cases the list and form rules leave to review.
Each step serves the rule it links to; the rule decides the output.

| Situation | Step | Rule |
| --- | --- | --- |
| A form and a real ruled grid cannot be cleanly separated — they share rulings, or the fields sit inside the grid's own borders | Reject the page rather than guess a boundary between form and table | [[Forms and Key-Value Regions]], [[Ignoring and Rejecting]] |
| A page prints buttons (`Print`, `Save`, `Clear`), an input placeholder, or a box reserved for a stamp or seal | Apply the working default and record the page, so it can be revisited when the open point closes | [[Printed Buttons and Placeholders]] |
| A checklist item prints its box before its id | Write the box first, per the working default, and record the page | [[Checklists]] |
| A box's state cannot be read with confidence, even zoomed in | Enter `[ ]`, as the rule requires; do not guess a tick from the text layer | [[Checkboxes]] |
