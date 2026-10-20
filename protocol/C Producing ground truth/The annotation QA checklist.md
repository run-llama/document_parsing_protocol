---
title: "The annotation QA checklist"
tags: [ground-truth, guide-rule, process]
---

# The annotation QA checklist

> [!tip] Procedure
> Work a table in this order, and run the same eight checks again before you call the page done.

### 1. Frame test first

Decide what belongs to the table by border and fill, then deal with the bands.
→ [[Titles Banners Captions]]

### 2. Count N from the leaf tracks

Take a body row and count the leaf columns — that is N. Then verify **every header row's colspans
sum to N**, and that **no group colspan covers the stub**.
→ [[Multi-Row Header Tiers]]

### 3. Prove every rowspan

A repeated value printed **once** is a rowspan. Printed **k times at distinct y-coordinates**, it is
k separate cells. When you cannot tell by eye, extract the word boxes.
→ [[Repeated Identical Values]]

### 4. Walk parallel blocks independently

Where the page repeats a structure — one block per year, one per topic — check each block has all of
its sub-sections. It is easy to complete the first block carefully and skim the rest.

### 5. End-of-table check

**The bottom edge is where content is most often lost. Check for:**

- the last printed row
- trailing summary lines → [[Bottom Edge Totals and Islands]]
- detached islands → [[Bottom Edge Totals and Islands]]
- sparse trailing columns → [[Barely-Existing Columns and Headers]]

### 6. Record equivalences — don't resolve them silently

When a page genuinely admits two encodings, write the canonical form and record that the other
reading is also defensible.
→ [[Accepted Alternatives]]

### 7. Keep claim types separate

Never blend these into one verdict. Say which one you mean:

what you can **see on the page** · what an **existing annotation** says · a **choice you made**
between two defensible encodings · a **settled convention** · an open question

This is what stops you writing "the annotation is wrong" when what you actually observed is "the
annotation differs from what I would have written".

### 8. Escalate conflicts

> **Do not silently choose among open options.**

Where two conventions are both live, record both and flag the page. A silent pick becomes precedent.

## The completion record

Before you call a page done, you should be able to answer:

- Which image and which crop did you inspect?
- Which case does this fall under?
- What is **directly visible** on the page?
- What is an **encoding choice** you made?
- What settled convention, if any, makes that choice the canonical one?

**One page can carry several independent issues** — a phantom header row, a repeated value wrongly
spanned, and an out-of-frame title can all sit in a single crop. Record them separately rather than
giving the page one verdict.

---

## Working a chart

Seven checks, in order, before a chart's rules are done:

### 1. Census the points

Count positions × series — plus printed callouts, plus every panel — before judging any
value: that is the rule count full coverage owes. A skipped series, tail, or panel is the
number-one coverage failure. On the judge families the census includes the judged facts —
every whisker span, box, gantt mark, and unambiguous choropleth region owes its
`chart_judge_point` ([[The Ground-Truth File]]).
→ [[Cover Every Data Point]] · [[Multiple Charts and Reference Ink]]

### 2. Check every label

Printed text only, copied whole, the minimal set that uniquely locates the point; unlabeled
positions by their axis value; a title fragment only to break a tie between charts. No
colors, no chart-type words, no appended units, no merged dimensions.
→ [[Labels]]

### 3. Sweep for printed values first

On the marks, beside slices, in the legend, at line ends, in the side text — before
estimating anything. A printed value you missed becomes a wrong estimate; every printed
value is exact and tolerance-free.
→ [[Values and Tolerances]] · [[Legend and Overlay Values]]

### 4. Verify the estimated values

Visual center, read against the mark's **own** axis (watch second axes and log bands),
stacks and steps as their own spans, tolerance from the readability buckets.
→ [[Values and Tolerances]] · [[Dual-Axis and Combo Charts]] · [[Stacked Bars and Waterfalls]] · [[Log Scale Charts]]

### 5. Audit the zeros and the gaps

A baseline mark or an empty labeled position is `0`; a point no label set can locate, or a
whisker end, carries no rule — deliberately, not by omission.
→ [[Values and Tolerances]] · [[Scatter and Error Bars]]

### 6. Hunt invented content

No rules for reference ink or event callouts, no invented label text, no computed values,
no expanded abbreviations, no tolerance on printed values.
→ [[Multiple Charts and Reference Ink]] · [[Labels]]

### 7. Check the file

The envelope (`expected_markdown` null, `test_rules`, doc `tags`), one flat rule list,
`need_estimate` tags on estimates, tool-managed fields untouched, ids appearing on save —
not from you.
→ [[The Ground-Truth File]]

---

## Before publishing a multi-page document

Checks that only fail when you look across pages, not at one — see [[Document Rules]]:

- [ ] The document type and its cover were decided once, and every page follows them
- [ ] Every recurring margin band is filed the same way on **every** page it appears on
- [ ] No heading repeats on more than half the pages — one that does is furniture filed as structure
- [ ] No page after the first opens at a top-level heading unless that page actually prints one
- [ ] Every ⚖️ choice is encoded the same way on every page, and the page that made it is flagged
- [ ] Every table that runs across a page break is one fragment per page, none is joined, and both fragments carry matching continuation flags

## Before publishing a Block layout

A page-level layout pass has its own gate. Every line must be true:

- [ ] Every meaningful visible region has one correct Block and class, **or** is explicitly ignored with a valid reason
- [ ] Each Block's layout class matches the corresponding Markdown element's class in [[Elements]]; any disagreement was resolved against the printed page
- [ ] Table and chart captions use `<caption>` inside their table HTML, first if read before the object and last if read after it; each retains its Caption class and its own box
- [ ] Separate paragraphs, columns, list items, captions and notes are **not** merged together
- [ ] Table and Picture boundaries contain the complete object **without** absorbing captions or nearby prose
- [ ] Reading order is complete, contiguous and correct — starts at 0, no gaps, no duplicates
- [ ] Imported and generated Block suggestions were reviewed **individually**
- [ ] **Hide boxes** was used to sweep for gaps, clipping, duplicates and wrong classes
- [ ] The Block annotation is marked **Checked**
- [ ] **I swept the entire page** is ticked
- [ ] **Validate page** reports no blockers, and every warning was read
- [ ] The draft is saved before **Publish page**

The hide-boxes sweep is the step that finds real errors. With the boxes drawn, the eye fills in what
it expects; with them hidden, a missed paragraph is obvious.

→ [[Block Annotation]] · [[Block Classes]] · [[Block Boundaries]] · [[Reading Order]]

## Related
