---
title: Slide Furniture
rule_id: layout-slide-furniture
status: rule
scope: page
tags: [rule, layout, slides]
---

# Slide Furniture

> [!success] ✅ Normative
> Every printed navigation tab of a slide MUST be transcribed, in printed order, as furniture, and a
> highlight that identifies the active section MUST be kept with the highlight convention. Labels
> printed on a photograph MUST be kept with the photograph's description; purely decorative
> background art MUST NOT be described.

Presentation decks print things around their content that a document does not: a row of section
tabs along the top edge with the current one highlighted, name labels overlaid on photographs, a
running footer with the deck name and slide number.

## Requirements

| The slide prints | The output |
| --- | --- |
| A row of navigation tabs | Every tab, in printed order, as furniture; the active tab's highlight as `<mark style="background-color: …">` with the nearest HTML colour name — see [[Highlighted Text]] |
| A label printed on a photograph | The label, kept with the photograph's description |
| Background art with no labels, values or meaningful relationships | Nothing |
| Background art whose geography or shape conveys content | A description of what it conveys |

### ✅ **Sample** — tabs, tiles and labelled photos

![[bag-slide-kpi-tiles.png]]

Three tabs top-left, the third filled red; a slide title and subtitle; four bullets and a stat-tile
panel in the left card; two photographs, grey silhouettes each with a boxed name label at the lower
right; a footnote; a footer with the slide number, deck name and a wordmark with a small symbol.
The tabs are one furniture block in printed order, the active one highlighted; each photo becomes a
one-line description carrying its label.

<details>
<summary>Expected Markdown</summary>

```markdown
FY 2025 highlights
Delivering strong performance
<mark style="background-color: crimson">Driving continued profitable growth</mark>

# Coffee

## Strong growth in the out-of-home channel

* Executed on our joint strategic decision with **Borvika Roasters** to **focus on out-of-home channel**
* Recruited **2,100** new out-of-home outlets
* Building a **strong, credible business** with unique capabilities
* Confident in **medium-term growth potential**

2025 volume growth<sup>1</sup>

- **Out-of-home**: **+26.5%**
- **Total**: **−19.8%**

A grey silhouette of a person in front of two panels, with the label "Borvika Roasters".

Grey silhouettes of an adult and a child, with the label "Caldrivane Café".

1\. Organic volume growth
For details on APMs refer to ‘Alternative Performance Measures’ and ‘Definitions and reconciliations of APMs’ sections of our FY 2025 Press Release

**22 Ostrevane Beverages FY 2025 Results**

[logo: Ostrevane]
```

</details>

### ✅ **Sample** — a map behind the text

![[bag-consumer-americas-tile.png]]

A pale, wavy background shape fills the right-hand card behind two headings and six bullets. It
prints no text, no values and no labels, so it yields no Markdown. The left card is a stat tile over
a small table — see [[Stat Tiles]].

<details>
<summary>Expected Markdown</summary>

```markdown
# Consumer – Americas

- Q1 2026: **€240m** **+2.2%** **+6.7% LFL**

<table>
  <tr> <th>Region</th> <th>Q1 2025</th> <th>Q1 2026</th> <th>Change</th> </tr>
  <tr> <td>North America</td> <td>€148m</td> <td>€151m</td> <td>+2.0%</td> </tr>
  <tr> <td>South America</td> <td>€87m</td> <td>€89m</td> <td>+2.3%</td> </tr>
</table>

## Where we are winning

* Cookware share gains across three priority accounts
* Small-appliance listings expanded in two new retail chains
* Direct-to-consumer orders up double digits

## What's next

* Regional distribution centre opening in Q3
* New induction range launching in the second half
* Continued investment in the loyalty programme
```

</details>

<!-- skill:generate
- Transcribe every navigation tab along a slide's edge, in printed order, as a header block; wrap the highlighted (active) tab in <mark style="background-color: NAME"> with the nearest HTML colour name.
- Describe each photograph in one line and include any label printed on it.
- Skip purely decorative background art (shapes, faint maps) that prints no labels or values; describe it only if its shape or geography carries content.
-->

<!-- skill:check
- FAIL (MUST) if any printed navigation tab is missing, or the tabs are out of printed order.
- FAIL (MUST) if a label printed on a photograph is missing from the Markdown.
- WARN (SHOULD) if the active tab's highlight is not carried as a <mark> with a colour, or decorative background art with no content is described.
-->

## Related

- [[Stat Tiles]] — the figures panel on the same slide
- [[Logos]] — the mark in the corner
- [[Margin Banners]] — the deck name printed along an edge
- [[Images]] — what a photograph becomes
