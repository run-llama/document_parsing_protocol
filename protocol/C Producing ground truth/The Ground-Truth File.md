---
title: The Ground-Truth File
tags: [ground-truth, charts, basics]
---

# The Ground-Truth File

> [!tip] Procedure
> The deliverable for a chart page is its `{name}.test.json`: `chart_data_point` rules, one
> per data point, covering **every data point** in the chart
> ([[Cover Every Data Point]]) — plus a `chart_judge_point` rule for each fact no printed
> text locates or no single table shape carries: whisker spans, choropleth classes, gantt
> spans, sankey flows.

## The files on disk

| File | What it is |
| --- | --- |
| `{name}.pdf` | the single page holding the chart — **the only source of truth** |
| `{name}.test.json` | the ground truth — the file you deliver |
| `{name}_llama_agentic.md` | a reference parse, roughly 70–80% right — reference only, never authority |

The JSON envelope has three keys: `expected_markdown` (stays `null`), `test_rules`, and
`tags`. The top-level tags carry document provenance from the fixed sector vocabulary
(`domain:government`, `domain:energy`, …); the loader copies them onto every rule.

## The rule

One rule = one data point:

```json
{
  "type": "chart_data_point",
  "labels": ["Very high DSI", "2014"],
  "value": "25 (13.0%)",
  "max_diffs": 0,
  "normalize_numbers": true,
  "verified": true,
  "id": "4d47b974398b0306"
}
```

You author **three things**: `labels` (the printed text that locates the point —
[[Labels]]), `value` (printed or estimated — [[Values and Tolerances]]), and
`relative_tolerance` on estimated values only. The other fields (`type`, `max_diffs`,
`normalize_numbers`, `verified`) are handled by the annotation tool, and `id` is stamped on
save — never authored. Estimated rules also carry `"tags": ["need_estimate"]`.

## The judge rule

A few chart families carry facts no printed text locates — an error bar's whisker span, a
choropleth's region-to-class pairing, a gantt bar's span on the time axis. Those get a
second rule shape, scored by an LLM judge that accepts any output faithfully conveying the
fact:

```json
{
  "type": "chart_judge_point",
  "chart_type": "map_class",
  "labels": ["CO"],
  "expected": {"region": "CO", "class": "20%-<25%"},
  "verified": true
}
```

You author `chart_type` (`error_bar`, `box_plot`, `map_class`, `gantt_span`, or
`sankey_flow`), the same `labels`, the family's `expected` payload, and a tolerance on
estimated payloads. Where each applies, with worked pages: [[Scatter and Error Bars]]
(whiskers and box plots), [[Gantt and Sankey Charts]] (task spans in one `gantt_span` shape, ribbon flows in one
`sankey_flow` shape),
[[Maps and Treemaps]] (choropleth classes).
Everything printed or axis-readable stays a `chart_data_point`.

## The complete file

The file for the page in [[Cover Every Data Point]]: 6 years × 4 series, every value
printed — 24 exact rules:

```json
{
  "expected_markdown": null,
  "test_rules": [
    {"type": "chart_data_point", "labels": ["Low DSI", "2014"], "value": "32 (16.6%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Middle DSI", "2014"], "value": "74 (38.3%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["High DSI", "2014"], "value": "62 (32.1%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Very high DSI", "2014"], "value": "25 (13.0%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Low DSI", "2016"], "value": "32 (16.6%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Middle DSI", "2016"], "value": "57 (29.5%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["High DSI", "2016"], "value": "75 (38.9%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Very high DSI", "2016"], "value": "29 (15.0%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Low DSI", "2018"], "value": "15 (7.8%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Middle DSI", "2018"], "value": "65 (33.7%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["High DSI", "2018"], "value": "73 (37.8%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Very high DSI", "2018"], "value": "40 (20.7%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Low DSI", "2020"], "value": "8 (4.1%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Middle DSI", "2020"], "value": "59 (30.6%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["High DSI", "2020"], "value": "69 (35.8%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Very high DSI", "2020"], "value": "57 (29.5%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Low DSI", "2022"], "value": "7 (3.6%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Middle DSI", "2022"], "value": "53 (27.5%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["High DSI", "2022"], "value": "73 (37.8%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Very high DSI", "2022"], "value": "60 (31.1%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Low DSI", "2024"], "value": "11 (5.7%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Middle DSI", "2024"], "value": "44 (22.8%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["High DSI", "2024"], "value": "62 (32.1%)", "max_diffs": 0, "normalize_numbers": true, "verified": true},
    {"type": "chart_data_point", "labels": ["Very high DSI", "2024"], "value": "76 (39.4%)", "max_diffs": 0, "normalize_numbers": true, "verified": true}
  ],
  "tags": ["domain:government"]
}
```

The checker looks each rule up independently — it finds the value in the parsed tables and
verifies the labels sit on that cell's row and column. No order matters, no orientation
matters, and no rule says which chart on the page it belongs to; the labels do the locating.

In the examples across these notes, rules are shown in the short authored form —
`labels` / `value` / `relative_tolerance` / `tags` — since the tool supplies the rest.

## Related

- [[Cover Every Data Point]] — how many rules a chart needs
- [[Labels]] — the locator text
- [[Values and Tolerances]] — printed, estimated, and zero values
- [[Multiple Charts and Reference Ink]] — several charts, one flat rule list
- [[The annotation QA checklist]] — the file check before a page is done
