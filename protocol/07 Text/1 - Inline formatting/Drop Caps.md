---
title: Drop Caps
rule_id: text-drop-caps
status: rule
scope: page
tags: [text, formatting, inline]
---

# Drop Caps

> [!success] ✅ Normative
> A drop cap MUST be joined directly to the rest of its word, with no space, line break or styling
> added. The output MUST NOT mark the letter as bold, enlarged or otherwise distinct.

A drop cap is an enlarged first letter, sunk two or more lines into the opening paragraph. The
letter belongs to the first word; the text layer often separates it, and a line-by-line reading
puts the rest of the word on a different line from its initial.

```text
T  he modern Recreational Boating Safety (RBS)
   Program traces its inception to the Federal Boat
   Safety Act (FBSA) of 1971.
```

## Requirements

- The initial MUST be joined to its word. The page prints one word in two sizes, not two words.
- The letter MUST NOT be bolded, enlarged or otherwise marked. Size here is typography, not
  emphasis — the same reasoning as [[Bold and Italics]].
- A decorated or ornamental initial is treated the same way: it is still the letter.
- The letter MUST be read from the image, not the text layer — see [[Cell Text Fidelity]]. A
  legible initial MUST NOT be dropped or replaced by the text layer's reading.

### ✅ **Sample** — a magazine opener

![[bag-uscg-drop-cap.png]]

The article opens with a three-line "T"; the first word is "The". The text layer of the file splits
it as `T` then `he`.

<details>
<summary>Expected Markdown · excerpt, first paragraph</summary>

```markdown
The modern Recreational Boating Safety (RBS) Program traces its inception to the Federal Boat Safety Act (FBSA) of 1971. The Act’s purpose was to improve boating safety by encouraging and assisting participation by the states, industry, and public. It also established national construction and performance standards and created flexible regulatory authority concerning boats. Since then, the many elements of the National RBS Program have successfully reduced incidents, injuries, and deaths. Led by the State RBS and National Nonprofit Organization grant programs, the combined effects of many program elements, and safer boats and boaters, the RBS Program achieved the fewest number of boating deaths in its history—a key measure of success.
```

</details>

### ✅ **Sample** — a journal article

![[bag-journal-drop-cap-equations.png]]

A four-line "D" opening "Deposition via surface limited redox replacement". The citation `2–4` is
split across two lines by the column; it is one superscript. The same page carries numbered display
equations — see [[Displayed Equations]].

<details>
<summary>Expected Markdown · excerpt, first paragraph</summary>

```markdown
Deposition via surface limited redox replacement (SLRR) of underpotentially-deposited (UPD) monolayer (ML)<sup>1</sup> has gained many applications in the last two decades.<sup>2–4</sup> The caveat of this deposition method is the use of the M UPD ML as sacrificial material to reduce/deposit a more noble metal P (galvanic displacement). Over the years, several experimental protocols have been developed. The first basic protocol<sup>1,5</sup> involves formation of a UPD ML of M on the substrate S(h,k,l) (potential controlled step) and then subsequent immersion of M<sub>UPD</sub>/S(h,k,l) in a separate solution where SLRR occurs and deposition of P takes place at open circuit (sample shuffling approach).

<!-- … -->
```

</details>

<!-- skill:generate
- Join an enlarged drop-cap initial to the rest of its word with no space or break: "The modern…", never "T he modern…" or "T\nhe modern…".
- Do not bold, enlarge, colour or otherwise mark the initial; an ornamental initial is still just the letter.
- Read the letter from the image, not from the text layer.
-->

<!-- skill:check
- FAIL (MUST) if a drop-cap initial is separated from the rest of its word by a space or line break, or is missing.
- FAIL (MUST) if the drop-cap initial is given its own styling (bold, heading, HTML) that the rest of the word does not carry.
-->

## Related

- [[Bold and Italics]] — styling comes from the glyphs, and size is not a style the output records
- [[Cell Text Fidelity]] — the image wins over the text layer
- [[Line-End Hyphenation]] — the other place the text layer splits a word
