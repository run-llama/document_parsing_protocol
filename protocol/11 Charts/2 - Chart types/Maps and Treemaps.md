---
title: Maps and Treemaps
rule_id: charts-maps-and-treemaps
status: rule
scope: page
tags: [charts, types]
---

# Maps and Treemaps

> [!success] ✅ Normative
> A treemap MUST be rendered with one row per tile: the tile's label and its **printed** value.
> Tile area MUST NOT be turned into a value: no axis calibrates it. A map with **printed values
> per region** MUST be rendered with one row per printed region–value pair. A shading-only map
> with a discrete legend MUST give each region whose fill matches one swatch unambiguously that
> legend class, copied verbatim.

## Treemaps

A tile's printed value is copied as printed. A tile that prints no value, only a comparator
(`<1%`), or a truncated label (`Re…`) gets no estimated value: its printed text is kept as it is,
and nothing is read from its area.

### ✅ **Sample** — `threat-report-2025_p29`

![[chart-malware-treemap.png]]

Every tile prints its label and share: eight rows in reading order, left to right and top to
bottom. The percent sign is printed raised beside each number and is written as a superscript. All
tile text is set in a heavier weight.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Observed Intrusion Tooling by Category, 2024</strong>
<strong>Ransomware-Related</strong></caption>
  <tr> <td><strong>Ransomware</strong></td> <td><strong>34<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Other</strong></td> <td><strong>16<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Credential Stealer</strong></td> <td><strong>12<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Utility</strong></td> <td><strong>10<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Tunneler</strong></td> <td><strong>7<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Backdoor</strong></td> <td><strong>10<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Downloader</strong></td> <td><strong>6<sup>%</sup></strong></td> </tr>
  <tr> <td><strong>Dropper</strong></td> <td><strong>5<sup>%</sup></strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `crypto_usage_report2024_p33`

![[chart-crypto-treemap.png]]

Eight tiles, every label copied whole, parenthesis and all. Seven print a number and the eighth,
`Social`, prints `<1%` — a comparator, not a value. Its row keeps the printed `<1%`; no value is
estimated from the sliver it draws. The footer's logo, copyright line and page number are elided.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>DeFi and stablecoins dominate crypto usage today — emerging categories include gaming and social</strong>
<strong>Category breakdown by daily active addresses (all blockchains)</strong></caption>
  <tr> <td><strong>Decentralized finance (DeFi)</strong></td> <td><strong>34%</strong></td> </tr>
  <tr> <td><strong>Stablecoins</strong></td> <td><strong>32%</strong></td> </tr>
  <tr> <td><strong>Infra (bridges, oracles, MEV, account abstraction, etc.)</strong></td> <td><strong>14%</strong></td> </tr>
  <tr> <td><strong>Token transfers</strong></td> <td><strong>13%</strong></td> </tr>
  <tr> <td><strong>Centralized exchanges</strong></td> <td><strong>3%</strong></td> </tr>
  <tr> <td><strong>Gaming</strong></td> <td><strong>2%</strong></td> </tr>
  <tr> <td><strong>NFTs</strong></td> <td><strong>1%</strong></td> </tr>
  <tr> <td><strong>Social</strong></td> <td><strong>&lt;1%</strong></td> </tr>
</table>

<!-- … -->

Active addresses can be associated with more than one category.
Source: Caldrivane Chain Analytics as of 9/30/2024, excludes wallet-to-wallet transfers.

<!-- … -->
```

</details>

## Maps

Two readable layers, each with its own place in the table (see also [[Geographic Maps]]):

- **Values printed per region or per pin** — one row per printed pair: the region or callout text
  as the label, the printed value copied as printed. A callout on a leader line (`DE 1`) is read
  like any other.
- **Shading with a discrete legend** — each region's fill is compared with the legend swatches, and
  the region takes the legend class **verbatim**. A region whose fill falls between two adjacent
  swatches is given no class.

**Where a map's classes go.** A choropleth MUST be one table with one row per region, in reading
order: the region label, its printed value when it has one, and its legend class in a last column
headed by the legend's printed title (no header row when the legend has none). A region with an
ambiguous fill has an empty class cell. Where the region names are recognised from the outlines
rather than printed, the region column's header carries `data-recognised` — see [[Geographic Maps]].

A checker judges a class on meaning: it accepts the class string, an equivalent range, or a value
inside the class's range, and treats region-name variants (`CO` / `Colorado`) as the same region.

### ✅ **Sample** — `apport_p19`

![[chart-apportionment-map.png]]

Both layers on one page: every state prints its seat count, and the fill classes its change, so
each state's row holds both — 50 states. Five states are shown, then the rest; the `DE 1` callout on
a leader line is read like any other. Delaware's fill is too small to compare with the swatches,
so its class cell is empty. The agency footer is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table data-source="chart">
  <caption><strong>Apportionment of the U.S. House of Representatives Based on the 2020 Census</strong></caption>
  <tr> <th></th> <th></th> <th><strong>Change from 2010 to 2020</strong></th> </tr>
  <tr> <td>TX</td> <td>38</td> <td>State gaining 2 seats</td> </tr>
  <tr> <td>OR</td> <td>6</td> <td>State gaining 1 seat</td> </tr>
  <tr> <td>WY</td> <td>1</td> <td>No change</td> </tr>
  <tr> <td>CA</td> <td>52</td> <td>State losing 1 seat</td> </tr>
  <tr> <td>DE</td> <td>1</td> <td></td> </tr>
<!-- … -->
</table>

Total U.S. representatives: 435

Numbers represent reapportioned totals of U.S. representatives.

<!-- … -->
```

</details>

### ✅ **Sample** — `cdc_p3`

![[chart-cdc-obesity-map.png]]

No values anywhere — state abbreviations printed, six legend classes, no legend title. Each region
takes its class: every state, DC and territory shown (about 53 regions). Four regions spread across
the classes are shown, then the rest. The legend draws `≥35%` as a `>` glyph over an underline bar;
`≥35%` is the reading, and a checker treats `>35%` as the same class. The source lines are cut off
at the page edge and are elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table data-source="chart">
  <tr> <td>CO</td> <td>20%-&lt;25%</td> </tr>
  <tr> <td>CA</td> <td>25%-&lt;30%</td> </tr>
  <tr> <td>TX</td> <td>30%-&lt;35%</td> </tr>
  <tr> <td>MS</td> <td>≥35%</td> </tr>
<!-- … -->
</table>

<!-- … -->
```

</details>

### ❌ **Counter-sample** — `regional-catastrophe-report-2023_p54`

![[chart-region-event-map.png]]

Event pins over a regional map, each callout naming an event and describing its losses
(`Eco: USD1.9bn / Ins: USD240mn`). The map's shading has no discrete legend to class regions
against, and a pin's position is not a value, so the map gives no chart table: its printed text is
transcribed as text. The data of this page is the loss chart beside the map, which is a chart
table like any other; its bars print no values, so they are estimates on the 20-unit grid. The
map's title, callouts and place names are elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <caption><strong>Eastern Region: annual losses (USD bn)</strong></caption>
  <tr> <th></th> <th>Economic Loss</th> <th>Insured Loss</th> </tr>
  <tr> <td>2011</td> <td>92</td> <td>18</td> </tr>
  <tr> <td>2013</td> <td>38</td> <td>6</td> </tr>
  <tr> <td>2015</td> <td>41</td> <td>7</td> </tr>
  <tr> <td>2017</td> <td>55</td> <td>11</td> </tr>
  <tr> <td>2019</td> <td>47</td> <td>9</td> </tr>
  <tr> <td>2021</td> <td>62</td> <td>12</td> </tr>
  <tr> <td>2023</td> <td>58</td> <td>10</td> </tr>
</table>

**Figure 36:** Map of notable Eastern Region events in 2023 | **Data and Graphic:** Caldrivane Re
```

</details>

<!-- skill:generate
- Treemap: one row per tile with its label and its printed value exactly as printed; for a tile printing only a comparator ("<1%") keep that text; never estimate a value from tile area.
- Map with values printed per region or pin: one row per region with the printed value.
- Shaded map with a discrete legend: give each region the legend class it matches, copied verbatim (e.g. "30%-<35%"), in a last column headed by the legend title if one is printed; leave the class empty for a region whose fill sits between two swatches.
- Map with shading but no discrete legend, or with event pins: no chart table; transcribe its printed text, and render any chart beside it as its own table.
-->

<!-- skill:check
- FAIL (MUST) if a treemap tile's printed label or value is missing, altered, or replaced by a value estimated from tile area (including a comparator like "<1%" turned into a number).
- FAIL (MUST) if a region's printed value is missing or attached to the wrong region.
- FAIL (MUST) if a region with an unambiguous fill has no class or a class other than the legend entry it matches; a class string, an equivalent range or a value inside the class range counts as a match, and region-name variants (CO / Colorado) count as the same region.
- FAIL (MUST) if a map with no discrete legend is given a table of values read from its shading or pin positions.
- FAIL (MUST) if map classes are placed other than in a last column of a region table.
-->

## Related

- [[Values and Tolerances]] — printed-or-nothing is the treemap rule
- [[Labels]] — tile labels, region abbreviations and callout text as labels
- [[Geographic Maps]] — how a map is rendered when it is geography rather than data
- [[Gantt and Sankey Charts]] — the other families where bare geometry is not read
