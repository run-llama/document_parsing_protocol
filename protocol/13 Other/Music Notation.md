---
title: Music Notation
rule_id: other-music-notation
status: rule
scope: page
tags: [other, images, diagrams]
---

# Music Notation

> [!success] ✅ Normative
> Every string printed on a music page MUST be transcribed as ordinary text. The staves themselves
> MUST be described, not encoded: each staff region is a fenced `description` block in the shared fixed
> shape, and no notes are read into note names, ABC, LilyPond or MusicXML.

A page of printed staves. The notes on the staff have no agreed textual form yet, but a music page
is rarely *only* staves: it carries a great deal of ordinary printed text, and none of that may be
lost while the staff question is open.

## Requirements

1. **Every printed string MUST be transcribed.** Titles, composer and arranger credits, instrument
   names, tempo and expression markings, dynamics, lyrics under the staff, bar numbers, rehearsal
   letters, chord symbols, footnotes and copyright lines are text and follow the ordinary text rules.
2. **Notes MUST NOT be encoded.** Reading a staff into pitches is error-prone and cannot be checked
   by reading the page; a wrong transcription is worse than an honest description (**never
   invent**). No note names and no music notation (ABC, LilyPond, MusicXML) appear in the output.
3. **Each staff region MUST be described** as a fenced `description` block in the fixed shape shared by
   every described figure (see [[Slide Diagrams]]):
   - one line saying what it is — how many staves, for what instruments where printed, the clef,
     key and time signature as drawn, the number of bars;
   - one bullet per text symbol printed on the staff — chord symbols, rehearsal letters, bar
     numbers, dynamics — verbatim, followed only by where it is drawn;
   - lyrics printed under a staff are text and follow the block.

### ✅ **Sample** — a four-bar lead sheet

![[music-notation.png]]

A title, an arrangement line, one treble-clef staff of four bars in common time with a boxed chord
symbol over each bar, and two paragraphs of prose below. The staff is described; its four chord
symbols are its labels; no notes are encoded.

<details>
<summary>Expected Markdown</summary>

````markdown
## Evening Waltz, No. 3

arr. for voice and guitar — capo II

```description
One treble-clef staff of four bars, common time, ending with a final barline.
- **C**: boxed chord symbol above bar 1
- **G**: boxed chord symbol above bar 2
- **G7**: boxed chord symbol above bar 3
- **C**: boxed chord symbol above bar 4
```

The refrain returns here in the relative key, marked *dolce* in the printed score. Keep the second verse's lyric line directly beneath the staff it belongs to, and carry the fingering numerals printed above the guitar part into the following paragraph rather than treating them as part of the staff region.

Rehearsal letter **B** begins the bridge four bars later, marked *a tempo* after the optional ritardando in bar twelve.
````

</details>

<!-- skill:generate
- On a page of printed music, transcribe every printed string as ordinary text: title, credits, instrument names, tempo and expression marks, dynamics, lyrics, chord symbols, bar numbers, rehearsal letters, footnotes, copyright lines.
- Never read the staff into notes: no note names, no ABC, LilyPond or MusicXML.
- Describe each staff region as a fenced block tagged description: one line with the number of staves, instruments if printed, clef, key and time signature as drawn, and the number of bars; then one bullet per text symbol printed on the staff (chord symbols, rehearsal letters, bar numbers, dynamics), verbatim, with where it is drawn.
-->

<!-- skill:check
- FAIL (MUST) if a string printed on a music page (title, credit, marking, lyric, chord symbol, rehearsal letter) is missing from the Markdown.
- FAIL (MUST) if the Markdown contains note names or a music encoding (ABC, LilyPond, MusicXML) for a printed staff.
- FAIL (MUST) if a staff region has no diagram block describing it.
-->

## Related

- [[Images]] — the general rule for what an image becomes
- [[Slide Diagrams]] — the shared shape of every described figure
- [[Electrical Schematics]] — another figure described rather than encoded
