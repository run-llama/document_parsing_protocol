---
title: Ground Truth — Charts
tags: [ground-truth]
---

# Ground Truth — Charts

How chart ground truth is produced against the chart chapter. The file format itself is in
[[The Ground-Truth File]]; the checks before a chart is done are in
[[The annotation QA checklist]].

## Encoding the chart table as rules

- Every cell of the chart table becomes one `chart_data_point` rule; every gantt span, sankey flow,
  whisker interval, box and map class becomes one `chart_judge_point` rule — see
  [[The Ground-Truth File]]. → [[Cover Every Data Point]]
- A rule's `labels` are the smallest set of printed strings that locates one point: the category
  alone for a single series, category + series for two dimensions, a third label only when two
  are not unique. Too few labels match several points; extra labels only add ways to fail. Order
  inside `labels` does not matter. → [[Labels]]
- A printed title (or a distinctive fragment of it) joins the labels only to break a tie between
  charts on one page that share a label set — the twin pies add `September 2025` /
  `Fiscal Year 2025`, the two box plots add `Figure 16` / `Figure 17`. All rules of a page sit in
  one flat list; nothing marks which chart a rule belongs to. → [[Multiple Charts and Reference Ink]]
- Where long labels blur and a short identifier prints crisply beside them (Activity IDs in a
  schedule), the identifier is the label. A label that cannot be read at zoom is not a label.
  → [[Gantt and Sankey Charts]]
- Printed values keep their printed spelling; `normalize_numbers` absorbs formatting differences.
  Keep one number style per file. → [[Values and Tolerances]]
- Estimated values carry `relative_tolerance` from the readability buckets and
  `"tags": ["need_estimate"]`; printed values carry no tolerance. → [[Values and Tolerances]]

## Working a chart

1. **Census the points** — positions × series, plus printed callouts, plus every panel — before
   judging any value. A skipped series, tail or panel is the most common coverage failure.
   → [[Cover Every Data Point]]
2. **Sweep for printed values first** — on the marks, beside slices, in the legend, at line ends,
   in side text. A printed value missed becomes a wrong estimate. → [[Legend and Overlay Values]]
3. **Measure the estimates** — chart values beyond those printed are measured from the page's
   vector or pixel geometry (axis calibration by least squares over the tick labels, bars from fill
   rectangles, lines by snapping vertices at the ticks), not eyeballed. Where the draft and the
   measurement disagree, the measurement wins; re-check the tolerance while there.
   → [[Values and Tolerances]]
4. **Flag the doubtful points** rather than tightening them artificially: a 3-D bar whose reference
   plane is ambiguous, a near-zero estimate needing a wide tolerance, a whisker whose ends cannot be
   read (no judge rule), a comparator-only treemap tile (`<1%`, no rule), a sankey that prints no
   values, a ribbon that cannot be traced, a map region between two swatches (no rule — pick
   another region). → [[Scatter and Error Bars]] · [[Maps and Treemaps]] · [[Gantt and Sankey Charts]]
5. **Gantt boundaries** — record the last period a bar visibly fills and move on; the judge
   accepts one boundary off. → [[Gantt and Sankey Charts]]
6. **Hunt invented content** — no rules for reference ink or event callouts, no invented label
   text, no computed values, no expanded abbreviations. → [[Multiple Charts and Reference Ink]]

## Authority

- The PDF is the only source of truth. Parse results are reference material, never truth.
- A value is never adjusted to make a parser pass, and a correct rule is never deleted because a
  parse fails it — that failure is the benchmark doing its job. → [[Cover Every Data Point]]
- A chart where most points cannot be located or read fails as a test case and is deleted whole.
