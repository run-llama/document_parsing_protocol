---
title: Iconography and Symbols
rule_id: text-iconography-and-symbols
status: rule
scope: page
tags: [text, images, marks]
---

# Iconography and Symbols

> [!success] ✅ Normative
> An icon that carries meaning MUST NOT be dropped. It MUST be rendered as a bracketed semantic tag
> in the icon's position: one lower-case word naming what the icon means — `[yes]`, `[no]`,
> `[locked]` — with `: degree` where the icons are graded (`[water: 3]`, `[sun: partial]`), and
> `[icon: shape]` naming the shape
> where the meaning is unclear (`[icon: sun]`). The vocabulary is open: the word is whatever names
> the meaning on this page.

Small symbols and images that stand in for a value rather than decorate — a tick in a
feature-comparison column, a padlock, a sun or water icon used as the cell content itself.

## Rendering

The icon is read the way the page intends it, and that reading is written in brackets:

```text
| Feature | Basic     | Pro   |
| SSO     | [locked]  | [yes] |
```

- Each icon MUST produce one tag, in the position the icon occupies.
- Where an icon has no clear meaning in context, the tag MUST describe what is drawn —
  `[icon: sun]` — rather than guess a value.
- Where the icons are graded, the tag MUST carry the **degree**, not just the presence:
  `[sun: full]` / `[sun: partial]`, `[water: 3]` / `[water: 1]`. A tag that distinguishes the
  values beats a prettier glyph that does not.

## Why a tag, and an open vocabulary

A tag reads back unambiguously and does not depend on a glyph existing, where the nearest Unicode
character or emoji may not exist or may carry a different meaning. Its word is not drawn from a fixed
list: no list would cover every icon, so the word is whatever names the meaning on this page, in
lower case, used the same way throughout the document.

## Why it matters

When the icon *is* the value, dropping it empties the table. A feature matrix or a scorecard whose
marks are gone says nothing at all. This is the same failure as [[Color as the Value]], where a
coloured fill with no text becomes an empty cell and the table stops meaning anything.

### ❌ **Counter-sample** — graded icons flattened to one glyph

![[iconography-example.png]]

A plant-list table with two icon-valued columns — **Sun** and **H₂O**. The printed page on the left
uses graded symbols: a filled, a half-filled or an empty sun, and one, two or three water droplets.
The parse preview on the right renders both columns as a single ☀️ and a single 💧.

**That is the failure this rule exists to prevent.** The icons were not dropped — they were
*flattened*. A plant needing three droplets and one needing a single droplet come out identical,
so the column still looks populated while the information it carried is gone. The columns are
the whole point of the table: *Sun* and *H₂O* are the two facts a reader consults it for. The
expected Markdown reads the empty sun as `[sun: none]`; the red outlines around the two columns
are highlighting added to the figure, not part of the page.

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th>Common Name</th> <th>Size</th> <th>Sun</th> <th>H<sub>2</sub>O</th> <th>Comment</th> </tr>
  <tr> <td>Marigold</td> <td>1' x 1'</td> <td>☀️</td> <td>💧</td> <td>Full sun, one droplet…</td> </tr>
  <tr> <td>Larkspur</td> <td>2' x 1'</td> <td>☀️</td> <td>💧</td> <td>Partial shade, two droplets…</td> </tr>
  <tr> <td>Fernwort</td> <td>1.5' x 1'</td> <td>☀️</td> <td>💧</td> <td>Shade only, three droplets…</td> </tr>
  <tr> <td>Coastal Sage</td> <td>3' x 2'</td> <td>☀️</td> <td>💧</td> <td>Drought tolerant…</td> </tr>
</table>
```

</details>

<details>
<summary>Expected Markdown · printed table (left)</summary>

```markdown
<table>
  <tr> <th>Common Name<br/>Botanical Name</th> <th>Size</th> <th>Sun</th> <th>H<sub>2</sub>O</th> <th>Comment</th> </tr>
  <tr> <td>Marigold<br/><em>Tagetes hybrida</em></td> <td>1' x 1'</td> <td>[sun: full]</td> <td>[water: 1]</td> <td>Full sun, one droplet: light, infrequent watering.</td> </tr>
  <tr> <td>Larkspur<br/><em>Consolida ajacis</em></td> <td>2' x 1'</td> <td>[sun: partial]</td> <td>[water: 2]</td> <td>Partial shade, two droplets: moderate, regular watering.</td> </tr>
  <tr> <td>Fernwort<br/><em>Pteris umbrosa</em></td> <td>1.5' x 1'</td> <td>[sun: none]</td> <td>[water: 3]</td> <td>Shade only, three droplets: keep evenly moist.</td> </tr>
  <tr> <td>Coastal Sage<br/><em>Salvia litoralis</em></td> <td>3' x 2'</td> <td>[sun: full]</td> <td>[water: 1]</td> <td>Drought tolerant once established.</td> </tr>
</table>
```

</details>

## Icons standing in for labels

An icon that clearly supplies a field's label — a pin before an address, a handset before a phone
number — MUST be rendered as a bracketed semantic label beside its value: `[address]`, `[phone]`,
`[web]`. The nearest word (`Address:`) MUST NOT be substituted: it is not printed. An icon whose
function is unclear is described by its shape instead of guessed.

### ✅ **Sample** — icons standing in for labels

![[bag-faq-footer-icons.png]]

The footer prints a pin, a handset and a globe before the address, the phone number and the
website — no words. The pictorial labels become `[address]`, `[phone]` and `[web]` beside their
values.

<details>
<summary>Expected Markdown · footer band</summary>

```markdown
**PAGE 1** [address] 7 Merevald Circle NW Suite 400 Harrowgate, BV 20036 [phone] 202-555-0180 [web] halvernwlc.example
```

</details>

<!-- skill:generate
- Never drop an icon that stands in for a value. Write it as a bracketed tag in the icon's position: [yes], [no], [locked].
- For graded icons write the degree, not just the presence: [sun: full] / [sun: partial] / [sun: none], [water: 1] / [water: 3]. Never collapse different icons to one emoji.
- If the meaning is unclear, describe the shape: [icon: sun].
- An icon that serves as a field label becomes [address], [phone], [web] before its value; never replace it with an unprinted word such as "Phone:".
-->

<!-- skill:check
- FAIL (MUST) if a value-bearing icon on the page has no tag in the Markdown.
- FAIL (MUST) if graded icons (different fill levels or counts) are rendered with the same tag or glyph.
- FAIL (MUST) if an icon is rendered as an emoji or Unicode glyph instead of a bracketed tag.
- FAIL (MUST) if a label icon is replaced by an unprinted word such as "Phone:".
-->

## Related

- [[Marks and Symbols in Cells]] — printed marks inside a table cell
- [[Color as the Value]] — the same failure when a fill is the value
- [[E-Signature Tags]] — a small printed mark that is an instruction, not a value
