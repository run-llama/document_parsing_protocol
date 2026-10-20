---
title: Small Capitals
rule_id: text-small-capitals
status: rule
scope: page
tags: [text, formatting, inline]
---

# Small Capitals

> [!success] ✅ Normative
> Text set in small capitals MUST be transcribed as uppercase letters. The output MUST NOT add
> small-caps styling, and MUST NOT substitute the text layer's mixed case for the capitals the page
> shows.

Running heads, bylines and firm names are often set in small capitals: capital letterforms at
lowercase height, usually with a full-size initial. The text layer may hold `Jackson` while the page
shows `JACKSON`; Markdown has no small-caps mark.

```text
JACKSON, J., dissenting          ← small caps on the page
WASSON & ASSOCIATES, CHARTERED   ← the same face, full name
```

## Requirements

- Every letter printed as a capital letterform — full-size or small — MUST be an uppercase letter
  in the output.
- The rendered letterforms take precedence over the text layer's casing — see
  [[Cell Text Fidelity]].
- Small caps are not emphasis: they MUST NOT be turned into bold, italic or an HTML style. Bold or
  italic set in small caps is still marked, from the glyph weight and slant — see
  [[Bold and Italics]].
- Letter-spacing is typography, not content: the letters of a spaced word MUST be written as one
  word.

### ✅ **Sample** — a running head

![[bag-scotus-small-caps.png]]

`JACKSON, J., dissenting` centred under the citation line, in small capitals; the citation line
itself carries a printed `____`, and the page number `15` sits at its right.

<details>
<summary>Expected Markdown · excerpt, running head</summary>

```markdown
Cite as: 600 U. S. \_\_\_\_ (2023)

15

JACKSON, J., dissenting

<!-- … -->
```

</details>

### ✅ **Sample** — a letter-spaced footer

![[bag-trial-law-tips-small-caps.png]]

`HALVORNE & VOSS, CHARTERED` in bold small caps with wide letter-spacing, over an address line. The
masthead's `Trial Law TIPS`, in bold italic, is also letter-spaced, which the text layer renders as
`Tria l La w`; the page shows the words `Trial Law`.

<details>
<summary>Expected Markdown · excerpt, masthead and footer</summary>

```markdown
***Trial Law
TIPS***

**Page 9**

<!-- … -->

**HALVORNE & VOSS, CHARTERED**
410 Harbor Row, Suite 300, Port Selby, ST 55021
(555) 013-0220 dale@halvorneandvoss.example
```

</details>

### ✅ **Sample** — run-in small-cap headings in a statute

![[bag-statute-small-caps-runin.png]]

`(2) NO PARTICULAR OR UNIFORM ELECTRONIC VISIT VERIFICATION SYSTEM REQUIRED.—Nothing in the
amendment …`: the heading in small capitals, an em dash, then the paragraph on the same line.
See [[Run-In Headings]]. Heading (4) and the body text break words at line ends
(`REQUIRE-MENTS`, `selec-tion`, `elec-tronic`), which are joined — see [[Line-End Hyphenation]].

<details>
<summary>Expected Markdown · excerpt, paragraphs (2) to (4)</summary>

```markdown
<!-- … -->

(2) NO PARTICULAR OR UNIFORM ELECTRONIC VISIT VERIFICATION SYSTEM REQUIRED.—Nothing in the amendment made by this section shall be construed to require the use of a particular or uniform electronic visit verification system (as defined in subsection (l)(5) of section 1903 of the Social Security Act (42 U.S.C. 1396b), as inserted by subsection (a)) by all agencies or entities that provide personal care services or home health care under a State plan under title XIX of the Social Security Act (or under a waiver of the plan) (42 U.S.C. 1396 et seq.).

(3) NO LIMITS ON PROVISION OF CARE.—Nothing in the amendment made by this section may be construed to limit, with respect to personal care services or home health care services provided under a State plan under title XIX of the Social Security Act (or under a waiver of the plan) (42 U.S.C. 1396 et seq.), provider selection, constrain beneficiaries’ selection of a caregiver, or impede the manner in which care is delivered.

(4) NO PROHIBITION ON STATE QUALITY MEASURES REQUIREMENTS.—Nothing in the amendment made by this section shall be construed as prohibiting a State, in implementing an electronic visit verification system (as defined in subsection (l)(5) of section 1903 of the Social Security Act (42 U.S.C. 1396b), as inserted by subsection (a)), from establishing requirements related to quality measures for such system.

<!-- … -->
```

</details>

<!-- skill:generate
- Write text set in small capitals entirely in uppercase letters, as it looks on the page: JACKSON, J., dissenting — even if the text layer says "Jackson".
- Do not add any small-caps styling; mark bold or italic only if the small-cap glyphs are themselves heavier or slanted.
- Write letter-spaced words as normal words, without the extra spaces: HALVORNE, not H A L V O R N E.
-->

<!-- skill:check
- FAIL (MUST) if text printed in small capitals appears in mixed or lower case in the Markdown.
- FAIL (MUST) if small caps are rendered with HTML styling (font-variant, <span style>, <small>) or turned into bold/italic the glyphs do not carry.
- FAIL (MUST) if a letter-spaced word is written with spaces between its letters.
-->

## Related

- [[Cell Text Fidelity]] — the image wins over the text layer
- [[Bold and Italics]] — styling comes from the glyphs
- [[Run-In Headings]] — the statute's small-cap headings run into their paragraphs
- [[Escaping Printed Marks]] — the `____` on the first sample
