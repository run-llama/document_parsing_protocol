---
title: Geographic Maps
rule_id: diagrams-geographic-maps
status: rule
scope: page
tags: [images, diagrams]
---

# Geographic Maps

> [!success] ✅ Normative
> How a map is rendered depends on what it is *for*. A data map whose values sit in **drawn
> regions** MUST be rendered as a `Region | Value` table — the region names MAY be recognised from
> the drawn outlines when the page does not print them, and the key column is then marked
> `data-recognised`. A map of values placed only by position MUST be described, with its legend
> transcribed, and no table. A map whose content is geography MUST be described. Every printed label
> MUST be kept.

A map appearing as a figure — typically a choropleth, or a labelled regional map.

## The test

What the figure is carrying decides the rendering:

| The map is… | Rendering |
| --- | --- |
| **A data display wearing a costume** — a shaded rate map is a `Region \| Value` table drawn on an outline; the geography is decoration, the numbers are the content | An HTML `<table data-source="chart">`, region in one column and value in another, with the legend's units kept in the caption |
| **Data placed only by position** — readings plotted at points, identified by nothing but where they sit | A description with the legend transcribed; no table |
| **A real map** — routes, adjacency, borders, position relative to other features; flattening it to a table destroys the only information it carried | A description, with every printed label, legend entry and scale transcribed |
| **Both** — shaded values *and* meaningful geography, or it cannot be told which | The description **and** the table: two encodings lose nothing, picking one loses half the figure |

## The key column

A table needs a key. When the regions carry no printed names, the key MAY be supplied by
recognising the drawn regions — Italian regions from their outlines, US states from theirs — but
only when every value sits inside one drawn, bounded region and the region is unambiguous to a
reader of the page. A recognised key is not printed text, so the table MUST say so: the header cell
of the key column carries the attribute `data-recognised`, and a header the page does not print is
worded after the map's own caption or legend.

```html
<tr> <th data-recognised>Regione</th> <th>Prevalenza (%) …</th> </tr>
```

Values positioned only by coordinates — a scatter of point readings with no names — have no region
to recognise. They MUST NOT be tabulated by coordinate; the map is described and its legend
transcribed.

Whatever the rendering, the printed text of a map — title, caption, legend, labels, scale — MUST be
kept (**never drop**).

## Examples

### ✅ **Sample** — a shaded rate map

![[map-as-printed.png]]

A regional map of Italy shaded in three bands, one value printed in each region, a four-entry
legend and a caption. The geography is decoration; the values are the content, so the map is a
table. The map prints only values: each region is recognised from its outline, so the key column is marked
`data-recognised`, and its header follows the caption's wording. Basilicata is printed white (`n.d.`) with no value, so it has no
row; the caption states the gap. The table as it renders:

![[map-converted-to-table.png]]

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <tr> <th data-recognised>Regione</th> <th>Prevalenza (%) di sovrappeso e obesità</th> </tr>
  <tr> <td>Valle d'Aosta</td> <td>14</td> </tr>
  <tr> <td>Piemonte</td> <td>16</td> </tr>
  <tr> <td>Lombardia</td> <td>18</td> </tr>
  <tr> <td>Trentino-Alto Adige</td> <td>20</td> </tr>
  <tr> <td>Veneto</td> <td>21</td> </tr>
  <tr> <td>Friuli-Venezia Giulia</td> <td>22</td> </tr>
  <tr> <td>Liguria</td> <td>17</td> </tr>
  <tr> <td>Emilia-Romagna</td> <td>17</td> </tr>
  <tr> <td>Toscana</td> <td>17</td> </tr>
  <tr> <td>Marche</td> <td>25</td> </tr>
  <tr> <td>Umbria</td> <td>24</td> </tr>
  <tr> <td>Lazio</td> <td>25</td> </tr>
  <tr> <td>Abruzzo</td> <td>27</td> </tr>
  <tr> <td>Molise</td> <td>25</td> </tr>
  <tr> <td>Campania</td> <td>36</td> </tr>
  <tr> <td>Puglia</td> <td>26</td> </tr>
  <tr> <td>Calabria</td> <td>27</td> </tr>
  <tr> <td>Sicilia</td> <td>27</td> </tr>
  <tr> <td>Sardegna</td> <td>17</td> </tr>
  <caption><strong>Prevalenza (%) di sovrappeso e obesità nei bambini, per regione</strong> (elaborazione su dati Istat e Istituto Superiore di Sanità, 2001–2002). Per la Basilicata il dato non è disponibile.</caption>
</table>
```

</details>

### ✅ **Sample** — a map that is entirely data, with no printed key

![[corpus-data-map.png]]

An observed-precipitation map: state outlines, and on top of them a dense scatter of numeric
readings, colour-coded by value.

![[corpus-data-map-detail.png]]

This is a data display wearing a map, so the test says table. But it is also the case where that
answer stops being practical: the readings are positioned by latitude and longitude with **no
station names printed**, so there is no key column to put them in. The readings sit at points,
not in drawn regions, so there is nothing to recognise as a key: the legend text is transcribed,
the map is described, and no table is built.

The legend block in the top-left — title, valid time, sources and a red *"Data not fully quality
controlled"* caveat — is printed text and MUST survive whatever is done with the plotted values.
The red colour is emphasis, not a value, and is not carried. The plotted readings are too small to
transcribe reliably at this resolution and are not listed.

<details>
<summary>Expected Markdown</summary>

```markdown
Observed 24-hour Precipitation
Valid 12Z Jul 21, 2012
Sources: METAR, SYNOPTIC, COOP
Prepared by HPC from CPC data
Note: Data not fully quality controlled

Map of the contiguous United States with state outlines and parts of neighbouring Canada and Mexico, overlaid with a dotted latitude–longitude grid labelled 50, 45, 40, 35, 30 and 25 along the left edge and -120, -115, -110, -105, -100, -95, -90, -85 and -80 along the bottom edge. Colour-coded numeric precipitation readings are plotted at point locations across the map; no station names are printed.
```

</details>

### ✅ **Sample** — a real map with a printed legend

![[bag-pfas-map.png]]

An aerial map of well locations, colour-coded by concentration band, with a six-entry legend, a
scale bar, a callout (`610 ng/l`), a state inset and a photograph. The positions are the content,
so the map is described as an image with every legend entry and label transcribed. Expected
boxes: the title, the subtitle, the map with its caption, the legend, the inset with its caption
and the photograph with its caption.

<details>
<summary>Expected Markdown</summary>

```markdown
# PFAS Airborne Transport Found Near Caldrivane Chemical Facility

Groundwater sampling results, well network within 3 miles of the facility — data as of March 2025

Aerial map of a well network around a grey building labelled "Facility". Twelve wells are plotted as coloured dots around the building: four in the Non-detect (ND) colour, two Detected – 40, two 40 – 100, two 100 – 200, one 200 – 450 and one > 450. A callout from the > 450 well, just below the building, reads **610 ng/l**. A scale bar in the lower left is labelled 0.5 mi.

Aerial map of the well network, colour-coded by PFAS concentration band

**PFAS concentration (ng/l)**
Non-detect (ND)
Detected – 40
40 – 100
100 – 200
200 – 450
\> 450

A state outline with a star marking the facility.

State location inset — star marks the facility

An aerial photograph of the facility area: a building with two dark rectangles on its roof, and a road crossing below it.

Aerial photograph of the facility area
```

</details>

<!-- skill:generate
- A shaded or labelled data map whose values each sit in a drawn region: render an HTML <table data-source="chart">, region then value, keeping the legend's units in the caption. If the regions are not named on the page, name them from their recognisable outlines and mark the key column's header cell with data-recognised, e.g. <th data-recognised>Region</th>.
- A map of values plotted at points with no names: describe it and transcribe its legend; do not build a table, not even keyed by coordinates.
- A map whose content is geography (routes, borders, positions): describe it, transcribing every printed label, legend entry and scale.
- Always keep the map's printed title, caption, legend, labels and scale.
-->

<!-- skill:check
- FAIL (MUST) if a data map whose values sit in drawn regions is not rendered as a region/value table, or a value is missing or wrong.
- FAIL (MUST) if a table's region names are not printed on the page and its key column header lacks data-recognised.
- FAIL (MUST) if point readings placed only by position are tabulated (by coordinate or otherwise).
- FAIL (MUST) if a printed title, caption, legend entry, label or scale of a map is missing.
-->

## Related

- [[Images]] — the general rule for what an image becomes
- [[Blueprints]] — the same "coerced into a table" trap
- [[Cover Every Data Point]] — what a data display becomes when it is a chart
- [[Slide Diagrams]] — labelled figures that are neither maps nor charts
