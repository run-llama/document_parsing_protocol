---
title: Logos
rule_id: images-logos
status: rule
scope: page
tags: [images, furniture]
---

# Logos

> [!success] ✅ Normative
> A logo MUST be rendered as a marker carrying its printed words, `[logo: OSTREVANE]`, at the logo's
> place in reading order. A logo that prints no legible text MUST be rendered as `[logo]`. The
> artwork MUST NOT be described.

Almost every slide and letterhead carries one: a wordmark in the corner, a symbol beside it,
sometimes a faint version behind the content. The marker keeps the printed words (**never drop**)
and tells a reader that they are a brand mark rather than a word of the body text.

## Requirements

- The words a logo prints MUST appear inside the marker exactly as printed, case included:
  `[logo: VELTRAND LIFE]`. A wordmark set on two lines is one marker, its lines joined with a space.
- The marker sits at the logo's place in reading order. A logo inside a header or footer band stays
  inside that band — see [[Recurring Page Furniture]].
- A logo with no legible text — a symbol on its own — is the bare `[logo]`.
- A symbol printed beside its own wordmark is part of that logo; it does not get a second marker.
- A faint copy of a mark repeated behind the content is not a second logo and adds nothing; it MUST
  NOT break into the table or paragraph it lies behind. A faint background mark that carries words
  is a watermark — see [[Watermarks]].
- The artwork — colours, shapes, the apple — MUST NOT be described.

### ✅ **Sample** — a corner wordmark and a background mark

![[bag-logo-watermark.png]]

The wordmark `OSTREVANE` with a yellow apple symbol sits in the bottom-right corner of the footer
band, and a large faint version of the same apple sits behind the lower (CAPEX) table. The
background apple is a faint repeat of the mark and adds nothing to the table; the wordmark becomes
`[logo: OSTREVANE]` in the footer band. Expected boxes: the CAPEX table as one Table box; the footer band as page furniture,
with the wordmark inside it.

<details>
<summary>Expected Markdown · CAPEX table and footer band</summary>

```markdown
## CAPEX

<table>
  <tr> <th><em>Millions of Euros</em><br/>CAPEX</th> <th>2025</th> <th>2026</th> <th>Var.</th> </tr>
  <tr> <th><em>YTD March 31</em></th> <th></th> <th></th> <th></th> </tr>
  <tr> <td>Casinos</td> <td>19.8</td> <td>17.0</td> <td>-2.8</td> </tr>
  <tr> <td>Slots Halvia</td> <td>23.3</td> <td>34.8</td> <td>11.5</td> </tr>
  <tr> <td>Slots Borvano</td> <td>3.3</td> <td>4.4</td> <td>1.1</td> </tr>
  <tr> <td>On-line Gaming & Betting</td> <td>3.4</td> <td>8.4</td> <td>5.0</td> </tr>
  <tr> <td>Structure</td> <td>0.0</td> <td>0.7</td> <td>0.7</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>49.8</strong></td> <td><strong>65.3</strong></td> <td><strong>15.5</strong></td> </tr>
</table>

First Quarter 2026 Results **13** [logo: OSTREVANE]
```

</details>

### ✅ **Sample** — two stacked wordmarks on a slide

![[bag-logo-map-legend.png]]

`VELTRAND PROVIDENCE` (set on two lines) and `VELTRAND LIFE`, each a red box with a white diamond
symbol, top-right. Each wordmark is one marker; the two-line one joins its lines with a space.
The slide's map is a real map with a two-entry legend — see [[Geographic Maps]]; it is elided
here. Expected boxes: one box per wordmark.

<details>
<summary>Expected Markdown · title and wordmarks</summary>

```markdown
# European footprint

Core and non-core markets, FY 2025

[logo: VELTRAND PROVIDENCE]

[logo: VELTRAND LIFE]

<!-- … -->
```

</details>

<!-- skill:generate
- Render a logo or wordmark as [logo: its printed words] exactly as printed (same case), at the logo's place in reading order, e.g. [logo: OSTREVANE]; a two-line wordmark is one marker with its lines joined by a space. A logo in a header or footer band stays in that band.
- A logo with no legible text is [logo]. A symbol beside its own wordmark is part of the same marker.
- Never describe the artwork. A faint repeat of a mark behind the content adds nothing and must not break into the table or text it lies behind.
-->

<!-- skill:check
- FAIL (MUST) if a logo on the page has no [logo…] marker, or its printed words are missing or altered inside the marker.
- FAIL (MUST) if logo words appear as plain text instead of inside a [logo: …] marker, or the artwork is described.
- FAIL (MUST) if a faint background repeat of a mark breaks into a table or paragraph.
- WARN (SHOULD) if a logo marker is moved out of the header or footer band it is printed in.
-->

## Related

- [[Images]] — the general rule this point extends
- [[Margin Banners]] — brand text printed along the page edge
- [[Watermarks]] — a faint background mark that carries words
- [[Output Options]] — the option under which a logo may be referenced as a saved image
