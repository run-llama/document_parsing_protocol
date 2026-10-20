---
title: Scatter and Error Bars
rule_id: charts-scatter-and-error-bars
status: rule
scope: page
tags: [charts, types]
---

# Scatter and Error Bars

> [!success] ✅ Normative
> A **named** scatter point MUST be rendered as one row holding its x value and its y value. Marker
> series over categories are ordinary series columns. An error bar's **centre** is an ordinary
> value, and its **whisker span** MUST be given with it: the low and high ends read at the whisker
> caps. A box plot MUST give its median, first and third quartiles, and its whisker ends when they
> are drawn. Points with no printed name have nothing to locate them and are not rendered as rows.

## Scatter

Each named dot contributes its two coordinates, each read against its own axis (see
[[Values and Tolerances]]). A fitted trend line through the cloud is reference ink (see
[[Multiple Charts and Reference Ink]]).

**How scatter points, whiskers and boxes appear in the chart table.**

- A scatter chart MUST give one row per named point, a column for x and a column for y, each headed
  by its printed axis title.
- An error bar's interval MUST be written in the centre's cell, after the centre, as
  `centre (low–high)` — `3.60 (3.47–3.73)`.
- A box plot MUST give one row per box: its label, then the low whisker end, first quartile, median,
  third quartile and high whisker end in axis order, the whisker ends only where drawn, under the
  header row `Low` | `Q1` | `Median` | `Q3` | `High` (first cell: the printed label column's title,
  or empty). These header cells are **protocol vocabulary**, like the markers `[blank]` or `[logo: …]`: the page does
  not print them, and they are the one deliberate exception to **never invent**, so that the columns
  can be read without guessing. They are written exactly as given.

### ✅ **Sample (constructed)** — `make_scatter`

![[chart-scatter.png]]

Ten named points, one row each, x and y under the two printed axis titles. The plotted values are
whole numbers by construction; on a printed page they would be estimates, judged with a tolerance.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>R&amp;D intensity and operating margin, 2025</strong></caption>
  <tr> <th></th> <th>R&D spend (% of revenue)</th> <th>Operating margin (%)</th> </tr>
  <tr> <td>Alta</td> <td>2</td> <td>8</td> </tr>
  <tr> <td>Borel</td> <td>3</td> <td>12</td> </tr>
  <tr> <td>Cormo</td> <td>4</td> <td>9</td> </tr>
  <tr> <td>Delta</td> <td>5</td> <td>16</td> </tr>
  <tr> <td>Eiger</td> <td>6</td> <td>21</td> </tr>
  <tr> <td>Fandor</td> <td>7</td> <td>14</td> </tr>
  <tr> <td>Grus</td> <td>8</td> <td>24</td> </tr>
  <tr> <td>Helix</td> <td>9</td> <td>18</td> </tr>
  <tr> <td>Ionia</td> <td>10</td> <td>27</td> </tr>
  <tr> <td>Jotun</td> <td>11</td> <td>22</td> </tr>
</table>
```

</details>

## Dot and marker series over categories

Dots drawn per category — markers above bars, one marker per gender per country — are ordinary
series: one column per marker series, one value per mark.

### ✅ **Sample** — `health-profile-europe-2024_p105`

![[chart-cancer-mortality.png]]

A bar series and two marker series over thirty-three countries, nothing printed on the marks:
33 × 3 = **99 values**, each an estimate on the 50-unit grid (tolerance 0.05 to 0.1 by
readability). The highlighted `EU27` bar is an ordinary row. The value-axis title follows the
table.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Figure 3.9. Cancer mortality in European countries by gender, 2021 (or nearest year)</strong></caption>
  <tr> <th></th> <th>Total</th> <th>Men</th> <th>Women</th> </tr>
  <tr> <td>Hungary</td> <td>310</td> <td>420</td> <td>240</td> </tr>
  <tr> <td>Croatia</td> <td>303</td> <td>428</td> <td>225</td> </tr>
  <tr> <td>Latvia</td> <td>288</td> <td>435</td> <td>204</td> </tr>
  <tr> <td>Slovenia</td> <td>279</td> <td>386</td> <td>210</td> </tr>
  <tr> <td>Slovak Republic</td> <td>272</td> <td>376</td> <td>214</td> </tr>
  <tr> <td>Denmark</td> <td>266</td> <td>322</td> <td>228</td> </tr>
  <tr> <td>Estonia</td> <td>262</td> <td>405</td> <td>186</td> </tr>
  <tr> <td>Poland</td> <td>258</td> <td>348</td> <td>198</td> </tr>
  <tr> <td>Lithuania</td> <td>255</td> <td>394</td> <td>181</td> </tr>
  <tr> <td>Czechia</td> <td>252</td> <td>334</td> <td>200</td> </tr>
  <tr> <td>Netherlands</td> <td>250</td> <td>306</td> <td>214</td> </tr>
  <tr> <td>Ireland</td> <td>246</td> <td>290</td> <td>208</td> </tr>
  <tr> <td>Romania</td> <td>244</td> <td>332</td> <td>174</td> </tr>
  <tr> <td>Greece</td> <td>241</td> <td>320</td> <td>166</td> </tr>
  <tr> <td>Germany</td> <td>239</td> <td>292</td> <td>190</td> </tr>
  <tr> <td>EU27</td> <td>238</td> <td>303</td> <td>182</td> </tr>
  <tr> <td>Bulgaria</td> <td>233</td> <td>314</td> <td>168</td> </tr>
  <tr> <td>Portugal</td> <td>229</td> <td>312</td> <td>158</td> </tr>
  <tr> <td>Austria</td> <td>226</td> <td>281</td> <td>178</td> </tr>
  <tr> <td>France</td> <td>224</td> <td>293</td> <td>166</td> </tr>
  <tr> <td>Italy</td> <td>221</td> <td>280</td> <td>174</td> </tr>
  <tr> <td>Belgium</td> <td>218</td> <td>279</td> <td>172</td> </tr>
  <tr> <td>Spain</td> <td>215</td> <td>296</td> <td>146</td> </tr>
  <tr> <td>Cyprus</td> <td>212</td> <td>268</td> <td>162</td> </tr>
  <tr> <td>Finland</td> <td>208</td> <td>265</td> <td>166</td> </tr>
  <tr> <td>Sweden</td> <td>205</td> <td>236</td> <td>182</td> </tr>
  <tr> <td>Luxembourg</td> <td>201</td> <td>268</td> <td>154</td> </tr>
  <tr> <td>Malta</td> <td>197</td> <td>254</td> <td>151</td> </tr>
  <tr> <td>United Kingdom</td> <td>255</td> <td>306</td> <td>216</td> </tr>
  <tr> <td>Norway</td> <td>222</td> <td>258</td> <td>188</td> </tr>
  <tr> <td>Iceland</td> <td>214</td> <td>243</td> <td>196</td> </tr>
  <tr> <td>Switzerland</td> <td>190</td> <td>240</td> <td>153</td> </tr>
  <tr> <td>Türkiye</td> <td>168</td> <td>245</td> <td>106</td> </tr>
</table>

Age-standardised mortality rate per 100 000 population

Source: Caldrivane Health Observatory, mortality database 2024.
```

</details>

## Error bars

The centre is copied when printed and estimated otherwise. The whisker ends are read at the caps
against the axis, like any estimate. A whisker whose ends cannot be read honestly is not given an
interval.

A checker judges the interval on meaning: it accepts any output that conveys it —
`3.60 ± 0.13`, `3.60 (3.47–3.73)`, separate low and high columns, prose — within the tolerance of
an ordinary estimate, and fails a centre given with no interval.

### ✅ **Sample** — `db242_p2`

![[chart-water-intake-errorbars.png]]

Six bars printing their means, with footnote markers, and 95% confidence whiskers drawn but not
printed. Each cell holds the printed centre, markers included, followed by the whisker ends read
against the 0.50 grid. The dashed `Adequate intake` lines are reference ink: their labels follow
the table as text. The whisker symbol before `95% confidence interval.` is not text.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption>Figure 2. Mean total water intake per day among adults aged 20 and over, by sex and race and Hispanic origin: United States, 2009–2012</caption>
  <tr> <th></th> <th>Non-Hispanic white</th> <th>Non-Hispanic black</th> <th>Hispanic</th> </tr>
  <tr> <td>Men</td> <td><sup>1,2</sup>3.60 (3.47–3.73)</td> <td><sup>2</sup>2.92 (2.78–3.06)</td> <td>3.33 (3.13–3.53)</td> </tr>
  <tr> <td>Women</td> <td><sup>1,2</sup>2.85 (2.76–2.94)</td> <td><sup>2</sup>2.41 (2.29–2.54)</td> <td>2.58 (2.49–2.67)</td> </tr>
</table>

Total water intake (liters)

Adequate intake (3.7 liters)

Adequate intake (2.7 liters)

95% confidence interval.
<sup>1</sup>Significantly different from non-Hispanic black, *p* < 0.05.
<sup>2</sup>Significantly different from Hispanic, *p* < 0.05.
NOTE: Access data table for Figure 2 at: http://www.cdc.gov/nchs/data/databriefs/db242_table.pdf#2.
SOURCE: CDC/NCHS, National Health and Nutrition Examination Survey, 2009–2012.
```

</details>

### ✅ **Sample** — `climate-assessment-sdm_p7`

![[chart-warming-attribution.png]]

Nothing is printed on any mark: centres **and** whisker ends are all estimates on the 0.5 grid. A
three-panel figure, each panel its own table headed by its axis unit (`°C`): panel (a) has a single
bar with no category label; in panel (b), `Solar and volcanic drivers` and `Internal variability`
are drawn on the zero line, so their centre is `0`, with whiskers either side. Panel (c) shows its
first three bars, then the rest; its two bracket captions follow its table as text. The page
heading and the figure caption below the panels are elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <caption><strong>Observed warming</strong>
(a) Observed warming 2010–2019 relative to 1850–1900</caption>
  <tr> <th></th> <th>°C</th> </tr>
  <tr> <td></td> <td>1.07 (0.88–1.21)</td> </tr>
</table>

<table data-source="chart">
  <caption><strong>Contributions to warming based on two complementary approaches</strong>
(b) Aggregated contributions to 2010–2019 warming relative to 1850–1900, assessed from attribution studies</caption>
  <tr> <th></th> <th>°C</th> </tr>
  <tr> <td><strong>Total human influence</strong></td> <td>1.07 (0.80–1.30)</td> </tr>
  <tr> <td>Well-mixed greenhouse gases</td> <td>1.50 (1.00–2.00)</td> </tr>
  <tr> <td>Other human drivers</td> <td>-0.40 (-0.80–0.00)</td> </tr>
  <tr> <td>Solar and volcanic drivers</td> <td>0 (-0.10–0.10)</td> </tr>
  <tr> <td>Internal variability</td> <td>0 (-0.20–0.20)</td> </tr>
</table>

<table data-source="chart">
  <caption>(c) Contributions to 2010–2019 warming relative to 1850–1900, assessed from radiative forcing studies</caption>
  <tr> <th></th> <th>°C</th> </tr>
  <tr> <td>Carbon dioxide</td> <td>0.79 (0.52–1.25)</td> </tr>
  <tr> <td>Methane</td> <td>0.51 (0.30–0.83)</td> </tr>
  <tr> <td>Nitrous oxide</td> <td>0.09 (0.05–0.15)</td> </tr>
<!-- … -->
</table>

Mainly contribute to changes in non-CO<sub>2</sub> greenhouse gases

Mainly contribute to changes in anthropogenic aerosols

<!-- … -->
```

</details>

### ✅ **Sample** — `ac8b3538-en_p131`

![[chart-jobstrain-ci.png]]

Five bars with confidence whiskers, nothing printed: five rows, negatives included, each with its
interval. The whisker ends are read at the drawn caps against the printed axis. The
`GHG-intensive occupations` bar sits almost on zero: a relative tolerance means little there, so a
checker widens it (0.3) rather than tightening the reading.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Annex Figure 2.C.13. The incidence of job strain is lower in new and emerging and green-enhanced skills green occupations even when controlling for the job characteristics</strong>
Marginal effect of the job strain indicator on the share of green-driven occupations, controlling for main individual and job characteristics, 2021 for Ostrevane Union members and 2015 for Borvika</caption>
  <tr> <th></th> <th>%</th> </tr>
  <tr> <td>Green-driven occupations</td> <td>-8.7 (-15–-2.6)</td> </tr>
  <tr> <td>Green new and emerging occupations</td> <td>-11.5 (-17.2–-6.6)</td> </tr>
  <tr> <td>Green-enhanced skills occupations</td> <td>-25 (-32.1–-19)</td> </tr>
  <tr> <td>Green increased demand occupations</td> <td>17 (7.2–26.6)</td> </tr>
  <tr> <td>GHG-intensive occupations</td> <td>-1 (-9.3–7.3)</td> </tr>
</table>

Note: The chart reports the point estimate (and 95% confidence intervals) of the percentage difference in the incidence of each type of green-driven occupation between job strained and not strained workers. Estimates come from a linear regression with the inverse hyperbolic sine of the share of each occupation type as dependent variable and a job strain dummy, occupation shares, education, gender, age, sector and country dummies as explanatory variables. The sample excludes Agriculture.
```

</details>

## Box plots

A box's median, quartiles and drawn whisker ends are read from the geometry. Statistics **printed**
beside the plot are text on the page and are copied as printed.

### ✅ **Sample** — `charpy_verification_p24`

![[chart-charpy-boxplot.png]]

Two box plots, both over the category `HH-103`, each its own table under its own figure caption,
which tells them apart. Each box gives five readings against its axis; the printed annotation box
and the labels of the dashed outlier-limit lines follow the table as text. The individual test
values (crosses) and the mean marker carry no name and are not rows.

<details>
<summary>Expected Markdown</summary>

```markdown
The same procedure was applied to the second set of specimens. As before, no single test value was excluded before the limits were computed.

<table data-source="chart">
  <tr> <th></th> <th>Low</th> <th>Q1</th> <th>Median</th> <th>Q3</th> <th>High</th> </tr>
  <tr> <td>HH-103</td> <td>5.00</td> <td>5.12</td> <td>5.18</td> <td>5.29</td> <td>5.38</td> </tr>
  <caption><strong>Figure 16 - Box-and-whisker plot for <em>KV</em> values from KLST specimens of HH-103.</strong></caption>
</table>

**KV (J)**

Upper outlier limit

Interquartile range: 0.1775 J
1.5 × Interq. range = 0.26625 J
Upper outlier limit = 5.55625 J
Lower outlier limit = 4.84625 J
Number of outliers = 0

Lower outlier limit

<table data-source="chart">
  <tr> <th></th> <th>Low</th> <th>Q1</th> <th>Median</th> <th>Q3</th> <th>High</th> </tr>
  <tr> <td>HH-103</td> <td>13.78</td> <td>14.26</td> <td>14.45</td> <td>14.67</td> <td>15.61</td> </tr>
  <caption><strong>Figure 17 - Box-and-whisker plot for <em>KV</em> values from full-size specimens of HH-103.</strong></caption>
</table>

**KV (J)**

Upper outlier limit

Interquartile range: 0.42 J
1.5 × Interq. range = 0.63 J
Upper outlier limit = 15.30 J
Lower outlier limit = 13.62 J
Number of outliers = 1

Lower outlier limit
```

</details>

<!-- skill:generate
- Scatter: one row per named point with its x and y values, the two columns headed by the printed axis titles; unnamed points get no row; a fitted trend line adds nothing.
- Error bars: write the centre (printed value exactly, with any footnote markers, or an estimate) followed by the whisker ends read at the caps, as "3.60 (3.47–3.73)"; omit the interval only if the caps cannot be read.
- Box plot: one row per box with its label, then low whisker end, first quartile, median, third quartile, high whisker end (whisker ends only if drawn), under the protocol header row <th></th><th>Low</th><th>Q1</th><th>Median</th><th>Q3</th><th>High</th>; copy any statistics printed beside the plot as text after the table.
- Marker series over categories are ordinary columns, one value per marker.
-->

<!-- skill:check
- FAIL (MUST) if a named scatter point is missing, or its x or y value lies outside the readability tolerance of the checker's reading.
- FAIL (MUST) if an error bar's centre is given without its interval when the whisker caps are readable; any rendering that conveys low and high ("± 0.13", "(3.47–3.73)", separate columns, prose) counts.
- FAIL (MUST) if a drawn box plot lacks its median or quartiles, or statistics printed beside it are missing or altered.
- FAIL (MUST) if unnamed points of a cloud are rendered as rows under invented names.
- FAIL (MUST) if intervals or box statistics use a layout other than "centre (low–high)" in the cell and label-low-Q1-median-Q3-high rows.
-->

## Related

- [[Values and Tolerances]] — coordinates and whisker ends are ordinary estimates
- [[Labels]] — named points, and the tie between two boxes over one category
- [[Multiple Charts and Reference Ink]] — trend lines and reference lines are not data
- [[Line Charts]] — named lines instead of named points
