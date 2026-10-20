---
title: About the Examples
tags: [ground-truth]
---

# About the Examples

Every rule in the protocol carries worked examples — a page next to the rule it demonstrates, with
the **Expected Markdown** for the region it shows. The expected Markdown is conforming output: it
is what a producer should emit, and what ground truth is built from.

| | Meaning |
| --- | --- |
| ✅ **Sample** | The rule applies; the Expected Markdown shows what conforming output looks like. |
| ❌ **Counter-sample** | Either it looks like the rule and isn't — the contrast case — or a rendering of it got it wrong (shown as **Non-conforming output**). |

## Why counter-samples matter as much as samples

Several rules here exist because two situations look identical on the page and resolve opposite
ways. Side-by-side blocks that continue one series are a continuation; side-by-side blocks with
their own titles and schemas are separate tables. A wrapped header label looks exactly like a
two-row tier. You cannot teach either case with a sample alone — the pair is the lesson.

## The most instructive examples are the ones that disagree

Many examples pair a page with an earlier rendering of it. That makes it possible to find pages where
the two contradict each other, and those teach a rule far better than a clean case does:

| Example | What went wrong |
| --- | --- |
| `3samehead` | The page prints `32031.9%`; the rendering records a plausible-looking `10.9%` |
| `3cc` | The page prints `2.5`; the rendering records `25` — a silently dropped decimal |
| `entwick` | The page prints blank cells; the rendering **invents** em-dash values for them |
| `3in1` | The rendering fabricates a header tier that was never printed |
| `w` | A `rowspan=2` header tier with an empty second row, where one line is printed |
| `wood` | Visually identical bands tagged as a header in one place and a body cell in another |

Each of these is a live illustration of the two failures the whole protocol is built around:
**never drop**, and **never invent**.

## What the examples do not cover

One situation has no worked example, because no example page exercises it yet —
[[Handwriting and Stamps]]. That note keeps its schematic sketch until a real page turns up.

A few rules have exactly one example rather than several, for the same reason: only one page
carries a struck-through value, only one carries a units row, only one shows a header and body
disagreeing on column count.

## Where the example pages come from

Every image in the protocol is either a **synthetic page** or a **public-domain document**.

- **Synthetic pages** re-create a situation first found on a real document, with fictional
  companies, people and figures. Each is an HTML page under `tools/synthetic/pages/`, rendered
  by `tools/synthetic/render.py`; the page is the source, so the Expected Markdown beside the image is
  correct by construction. Where an example demonstrates an annotation *error*, the page prints
  the true value and the extract keeps the documented mistake.
- **Public-domain documents** are U.S. federal government works (statistical tables, statutes,
  court opinions, agency guides, blank federal forms). They are reproduced as published; the
  credit for each lives in `tools/provenance/manifest.json`.
- A few chart families — gantt, sankey, and a clean labeled scatter — carry **constructed
  examples**, marked `Sample (constructed)` and rendered by `tools/constructed_charts/`.

Each example names its page in backticks, like `` `3samehead` ``; that name is the page's stem.
`tools/provenance/manifest.json` records where every image comes from, and the public build
(`tools/build_site.py --public`) refuses to run while any embedded image lacks a cleared entry.

Chart values beyond those printed on the page were **measured from the page's vector or pixel
geometry** (axis calibration by least squares over the axis-label positions, bars from fill
rectangles, lines by vertex-snapping at the ticks) — they are not eyeballed.

Adding a new example is covered in `SKILL.md` — including the rule that you must **look at the
rendered image before writing a caption about it.**

## Pages without a paired annotation

Images named `bag-<slug>.png` show a situation without a full expected annotation beside them;
their captions describe only what is printed and never what the annotation should be.

## Related

- [[The Page Is the Ground Truth]] · [[Document Representation Protocol]] · [[The annotation QA checklist]]
