---
title: Struck and Replaced Values
rule_id: tables-struck-and-replaced-values
status: rule
scope: page
tags: [tables, redline, ocr, failure-mode]
---

# Struck-and-Replaced Values (redlined rate tables)

> [!success] ✅ Normative
> A cell holding a struck value and its replacement MUST render both, struck first —
> **`~~1.316~~ 1.335`** — and MUST NOT merge them into one figure. The `~~` MUST cover exactly the
> glyphs struck on the page: `1.~~316~~ 335` when only the digits are crossed out.

A cell holds an old value crossed out plus its replacement. A text layer joins them without a trace:

```text
page shows:  1.316 (struck)  1.335
text layer:  1.316335        ← this number does not exist on the page
```

That is the worst outcome available on a table: not a drop and not a garble, but a fabricated number
that looks entirely plausible and that nothing downstream can catch. Struck cells MUST be read from
the rendered page, never from the text layer — see [[Cell Text Fidelity]].

## Writing the cell

- A struck value and its replacement MUST be rendered `~~old~~ new`, which keeps the two readings
  distinct and marks which one is superseded.
- Where the page marks the change with an underline instead of a strike, the replacement MUST be
  rendered `<u>1.335</u>`, recording what is actually drawn.
- A handwritten correction over a printed value MUST use the same markup — see
  [[Handwriting and Stamps]]. A printed strikethrough and a pen stroke are the same act, so a
  consumer never has to tell them apart.
- The output MUST NOT restructure the table into "Previous" and "Current" columns. Where the page
  itself prints the old and new figures in separate tables or columns, each MUST be rendered where
  it appears rather than folded into one cell.

### ✅ **Sample** — `strike`

![[zoo-strike.png]]

Every *Current Rates* figure is struck through, with its live replacement in the *Proposed Rates*
tables alongside: 54 struck values across two tables. Each struck value is wrapped in `~~…~~`, and
the four blocks stay four tables.

Note what the page itself does: it splits old and new into **parallel tables**, so the replacement
is not in the same cell. The output follows the page and does not fold them together.

<details>
<summary>Expected Markdown · table 1 of 4</summary>

```markdown
<table>
  <tr> <th> </th> <th> </th> <th colspan="2">Restaurants</th> <th colspan="2">Taverns</th> </tr>
  <tr> <th>Each Claim</th> <th>Aggregate</th> <th>Upstate</th> <th>NY City</th> <th>Upstate</th> <th>NY City</th> </tr>
  <tr> <td>25,000</td> <td>25,000</td> <td>~~0.42~~</td> <td>~~0.42~~</td> <td>~~0.80~~</td> <td>~~0.80~~</td> </tr>
  <tr> <td>50,000</td> <td>50,000</td> <td>~~0.57~~</td> <td>~~0.57~~</td> <td>~~1.08~~</td> <td>~~1.08~~</td> </tr>
  <tr> <td>100,000</td> <td>100,000</td> <td>~~0.82~~</td> <td>~~0.82~~</td> <td>~~1.56~~</td> <td>~~1.56~~</td> </tr>
  <tr> <td>200,000</td> <td>200,000</td> <td>~~1.11~~</td> <td>~~0.93~~</td> <td>~~2.11~~</td> <td>~~1.77~~</td> </tr>
  <tr> <td>250,000</td> <td>250,000</td> <td>~~1.21~~</td> <td>~~0.97~~</td> <td>~~2.30~~</td> <td>~~1.84~~</td> </tr>
  <tr> <td>300,000</td> <td>300,000</td> <td>~~1.32~~</td> <td>~~1.01~~</td> <td>~~2.51~~</td> <td>~~1.92~~</td> </tr>
  <tr> <td>500,000</td> <td>500,000</td> <td>~~1.58~~</td> <td>~~1.11~~</td> <td>~~3.00~~</td> <td>~~2.11~~</td> </tr>
  <tr> <td>1,000,000</td> <td>1,000,000</td> <td>~~1.85~~</td> <td>~~1.21~~</td> <td>~~3.52~~</td> <td>~~2.30~~</td> </tr>
  <tr> <td>2,000,000</td> <td>2,000,000</td> <td>~~2.17~~</td> <td>~~1.42~~</td> <td>~~4.12~~</td> <td>~~2.70~~</td> </tr>
</table>
```

</details>

## The strike span mirrors the printed strike

Where the strike starts and stops is printed information, and the markup carries it: exactly the
struck glyphs, no more, no less.

```text
whole value struck:      1.316 (all struck)  335        →  ~~1.316~~ 335
only the digits struck:  1.316 (316 struck)  335        →  1.~~316~~ 335
```

The unstruck `1.` sits **outside** the `~~`, because that is where it sits on the page. Nothing is
reconstructed and nothing is invented — the prefix is transcribed because it is printed and was
never struck.

`1.~~316~~ 335` gives a reader everything needed to arrive at `1.335` without the output asserting
it. The `1.` is printed, unstruck, and therefore still part of the value; the replacement digits
follow. The reading falls out of the transcription instead of being asserted on top of it.

That is why the span must be exact. `~~1.316~~ 335` for a page that only struck `316` throws away
the prefix a reader needs, and `1.~~316~~ 335` for a page that struck the whole value claims ink
that is not there. Both are losses, in opposite directions.

## One struck cell puts the column in play

Strikes are thin and reproduce badly at page zoom, so a struck cell is easy to miss. One struck cell
means the column is a redline column: every other cell in it MUST be read for a strike before the
column is rendered.

## Redline in prose

- Deleted text MUST be rendered `~~…~~` and inserted underlined text `<u>…</u>`, each over exactly
  the printed span.
- Where colour distinguishes revisions or authors, the colour MUST be preserved as well. Insertion
  MUST NOT be inferred from colour alone where the page marks nothing else.

### ✅ **Sample** — an interlineated court rule

![[bag-rule-redline.png]]

Paragraph (4): `[Deleted.]` struck through in red, followed by red underlined replacement text;
everything above it is plain black. Strike and underline already carry the revision, so the red adds
nothing a strike and an underline do not.

<details>
<summary>Expected Markdown · paragraph (4)</summary>

```markdown
(4) ~~\[Deleted.\]~~ <u>Unless otherwise agreed to by the parties or otherwise provided by court order or by law, only the witness, the parties, their respective counsel including such counsel's staff, experts identified pursuant to Rule 4:1(b)(4)(A), and those involved with the administration of the deposition (such as court reporters and translators) may attend the deposition, given the private nature of discovery. Counsel of record for the parties and counsel for any non-party deponent must timely confer regarding any other person's attendance at a deposition</u>
```

</details>

### ✅ **Sample** — insertions marked by colour alone

![[bag-rule30-colour-redline.png]]

Proposed rule text: deletions (`then`, `make this designation`) struck through in black, insertions in
red with **no** underline. Without the colour the insertions become indistinguishable from the
settled text, so the colour is kept. The colour is written as `<font color="red">` around the inserted words, as
[[Text Colors]] requires.

<details>
<summary>Expected Markdown · paragraph (6)</summary>

```markdown
(6) <u>Notice or Subpoena Directed to an Organization</u>. In its notice or subpoena, a party may name as the deponent a public or private corporation, a partnership, an association, a governmental agency, or other entity and must describe with reasonable particularity the matters for examination. The named organization must ~~then~~ designate one or more officers, directors, or managing agents, or designate other persons who consent to testify on its behalf; and it may set out the matters on which each person designated will testify. <font color="red">Before or promptly after the notice or subpoena is served, the serving party and the organization must confer in good faith about the matters for examination.</font> A subpoena must advise a nonparty organization of its duty to <font color="red">confer with the serving party and to designate each person who will testify</font> ~~make this designation~~. The persons designated must testify about information known or reasonably available to the organization. This paragraph (6) does not preclude a deposition by any other procedure allowed by these rules.
```

</details>

<!-- skill:generate
- A table cell with a struck value and its replacement: write both, struck first — ~~1.316~~ 1.335. Never merge them into one number, and read struck cells from the image, not the text layer.
- Wrap exactly the struck glyphs: if only 316 of 1.316 is struck, write 1.~~316~~ 335.
- A replacement marked by underline instead is <u>1.335</u>. A pen correction over a printed value uses the same markup.
- If the page prints old and new values in separate tables or columns, keep them there; never fold them into one cell or build Previous/Current columns yourself.
- In prose, deleted text is ~~…~~ and inserted underlined text <u>…</u>; keep text colour when it is the only thing marking an insertion.
- When one cell in a column is struck, check every other cell in that column for a strike.
-->

<!-- skill:check
- FAIL (MUST) if a value struck through on the page is not wrapped in ~~…~~, or an unstruck value is.
- FAIL (MUST) if a struck value and its replacement are merged into one figure (e.g. 1.316335) or either is missing.
- FAIL (MUST) if the ~~ span covers more or fewer glyphs than the page strikes.
- FAIL (MUST) if old and new values printed in separate tables or columns are folded into one cell, or Previous/Current columns are added that the page does not print.
- FAIL (MUST) if inserted text marked only by colour is rendered without that colour.
-->

## Related

- [[Cell Text Fidelity]] — the page, not the text layer, decides the value
- [[Handwriting and Stamps]] — the handwritten equivalent uses the same markup
- [[Underlined Text]] — `<u>`, not `<ins>`, for an underline
- [[Watermarks]] — "Redline Version" is often stamped on exactly these pages
