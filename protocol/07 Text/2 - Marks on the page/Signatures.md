---
title: Signatures
rule_id: text-signatures
status: rule
scope: page
tags: [text, marks]
---

# Signatures

> [!success] ✅ Normative
> A handwritten signature MUST be rendered as a bracketed placeholder: `[signature:{name}]` when its
> glyphs are genuinely legible, the bare `[signature]` otherwise. A name MUST NOT be guessed.

A handwritten signature over a signature line.

## The rendering

A signature whose name can be read from its glyphs:

```markdown
[signature:Mariana Augusta de Figueiredo Lacerda e Souza]
```

A signature whose name cannot:

```markdown
[signature]
```

A half-readable signature MUST get the bare `[signature]` form.

## Why

A signature is semantically meaningful — the document *is signed* — but it is not text. The
placeholder records the fact without asserting a transcription that could be wrong, and the
name-carrying form preserves the value when the glyphs really are readable.

This is the same shape as `[REDACTED]` in [[Redacted Text]]: a bracketed tag standing in for a
non-text region.

## Edge cases

- Two signatures on one line MUST get two placeholders, one each, in reading order — even when
  both are illegible.
- A signature that is also a stamp, or that overlaps a printed grid, follows
  [[Handwriting and Stamps]].

## On a form

A signature field follows the same shapes, with one addition: an **unsigned** field is a blank
fill-in, `[blank]`, not a missing signature.

```markdown
- **Your signature**: [signature:John Doe]
- **Spouse's signature. If a joint return, both must sign.**: [blank]
- **Date**: [blank]
- **Your occupation**: Accountant
```

A signature line's date and occupation companions are ordinary fill-ins — see [[Fill-Ins]].

## A signature with its name printed beside it

The name in `[signature:{name}]` is read off the signature's own glyphs. Many documents print the
signer's name directly under the signature line.

A name printed under or beside an illegible signature MUST NOT fill `[signature:{name}]`: the
signature is the bare `[signature]`, and the printed name is rendered as the text it is. The tag
records only what the strokes show — the printed name is not always the signer, as when someone
signs on another's behalf — and the name is kept as text beside it, so nothing is lost.

### ✅ **Sample** — an auditor's signature over a printed name

![[bag-auditor-seal.png]]

A handwritten signature whose glyphs cannot be read, with `A. N. Bhatt`, `Partner`, a membership
number and a UDIN printed beneath it, and the firm's round seal to the left — see
[[Seals and Round Stamps]].

<details>
<summary>Expected Markdown · excerpt, the signature block</summary>

```markdown
<!-- … -->

**For, Caldrivane & Rao LLP**
**Chartered Accountants**
**Firm Registration No. - 118427W/W100284**

[signature]

**A. N. Bhatt**
Partner
Membership No. 084213
UDIN: 26084213MZQPKT2231

<!-- … -->
```

</details>

## Initials on every page

Handwritten approval initials MUST be rendered as `[signature]` on every page that carries them,
with the initials inside the placeholder only when their glyphs support it. The placeholder MUST
be kept outside body sentences.

### ✅ **Sample** — a scanned decision with a paraph

![[bag-decision-initials.png]]

A handwritten mark at the bottom right of a scanned court decision page, below the footnotes, with
no printed line or caption. No letters can be read in it.

<details>
<summary>Expected Markdown · excerpt, foot of the page</summary>

```markdown
<!-- … -->

<sup>37</sup> Id. at 78–89. The August 11, 2023 Order in DRB Case No. 04-88 was approved by Chairperson Teodora L. Escamillas and Member Victor P. Renwick of the Construction Industry Arbitration Commission, Caldrivane City.

[signature]
```

</details>

## Typed names on signature lines

A name typed in a plain face on a signature line, or a conformed `/s/` signature, is not a
signature: it is printed text. It MUST be rendered as that text, verbatim — `/s/` included — and
MUST NOT be given a `[signature]` placeholder, which would assert handwriting the page does not
show.

### ✅ **Sample** — typed names on signature lines

![[bag-typed-approval-signatures.png]]

`Marcus Feldkirk`, `Renata Solis`, `Owen Tarrant` typed in a plain face on the three signature lines
of an approval box, with typed dates. No handwriting anywhere.

<details>
<summary>Expected Markdown · excerpt, the approval box</summary>

```markdown
<!-- … -->

**Read and approved by**

Marcus Feldkirk 12/03/2025
Renata Solis 12/04/2025
Owen Tarrant 12/04/2025
```

</details>

### ✅ **Sample** — a conformed `/s/` signature

![[bag-conformed-signature.png]]

`By: /s/ Dana R. Whitfield` in underlined italics on the signature line, the typed name beneath.
The `/s/` convention stands for a signature that was never inked.

<details>
<summary>Expected Markdown · excerpt, the signature block</summary>

```markdown
<!-- … -->

DATED: February 9, 2024 **WHITFIELD & COLE, LLP**

By: <u>*/s/ Dana R. Whitfield*</u>
Dana R. Whitfield (SBN 214977)
*dwhitfield@whitfieldcole.example*
2200 Bayport Avenue, Suite 940
Telephone: (415) 256-2884
Facsimile: (415) 256-2885

*Attorney for Plaintiff Marguerite Alcazar*

<!-- … -->
```

</details>

<!-- skill:generate
- Replace each handwritten signature with [signature], or [signature:Full Name] only when the name can be read from the signature's own strokes. If only partly readable, use [signature].
- Two signatures side by side get two placeholders, in reading order. Handwritten initials or a paraph also get [signature], on every page where they appear, outside the body sentences.
- An unsigned signature field is a blank: [blank].
- A name printed under an illegible signature stays ordinary text after a bare [signature]; typed names and "/s/ Name" on a signature line are written verbatim as text, with no placeholder.
-->

<!-- skill:check
- FAIL (MUST) if a handwritten signature or set of initials on the page has no [signature…] placeholder.
- FAIL (MUST) if [signature:{name}] carries a name that cannot be read from the signature's own strokes.
- FAIL (MUST) if an unsigned signature field is rendered as [signature] instead of [blank].
- FAIL (MUST) if two signatures are merged into one placeholder.
- FAIL (MUST) if a name printed under an illegible signature is moved inside the placeholder.
- FAIL (MUST) if a typed or /s/ name on a signature line is rendered as a [signature] placeholder, or its printed text (including /s/) is altered.
-->

## Related

- [[Handwriting and Stamps]] — handwriting over a printed grid
- [[E-Signature Tags]] — a signing tab is not a signature
- [[Seals and Round Stamps]] — the mark that often sits beside a signature
- [[Text Formatting Conventions]] — where the placeholder sits among the inline markers
