---
title: Seals and Round Stamps
rule_id: text-seals-and-round-stamps
status: rule
scope: page
tags: [text, marks]
---

# Seals and Round Stamps

> [!success] ✅ Normative
> A seal or round stamp MUST be rendered as `[seal: printed text]`, holding all of its legible rim
> and centre text in reading order, in a block separate from body prose. The bare `[seal]` MUST be
> used only when none of its text is legible.

A round or oval impression — an auditor's firm seal, a notary seal, a court seal — printed or inked
on the page, usually beside a signature. Its text runs around the rim.

```text
   ╭────────────╮        For, Caldrivane & Rao LLP
  ( CALDRIVANE &    )       Chartered Accountants
  (  RAO LLP     )       [signature]
   ╰────────────╯        A. N. Bhatt
```

## Requirements

- The seal MUST NOT be dropped. It is the page's proof of authority, the same kind of fact as a
  signature, and its text is often the only place the firm's name is printed.
- Its text MUST be kept verbatim and in a readable order — in the samples, upper rim, then centre,
  then lower rim — including a word the rim cuts short. Illegible characters are left out, never
  guessed.
- The seal MUST be its own block, never part of a sentence beside it.
- A stamp that lands on a table is kept out of the grid — see [[Handwriting and Stamps]].
- A signature written across the seal is a separate mark — see [[Signatures]].

### ✅ **Sample** — an auditor's seal beside a signature

![[bag-auditor-seal.png]]

A blue circular seal: `CALDRIVANE & RAO LLP` along the upper rim, `H&R` over `LLP` in the centre,
and `CHARTERED ACCOUNTAN` along the lower rim — the rim runs out before the word ends. Beside it, a
handwritten signature over a printed name, designation and registration numbers. Also the sample
for a signature whose name is printed beneath it — see [[Signatures]].

<details>
<summary>Expected Markdown · excerpt, the signature block</summary>

```markdown
<!-- … -->

[seal: CALDRIVANE & RAO LLP H&R LLP CHARTERED ACCOUNTAN]

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

### ✅ **Sample** — a firm stamp with a signature inside it

![[bag-letterhead-stamp.png]]

A purple round stamp at the foot of a scanned letter: `KESSLER & VANE` on the upper rim,
`CHARTERED ACCOUNTANTS` in the centre, `FRN-408217E • ASTILBE` on the lower rim, and a handwritten
mark through its centre. The letterhead prints a logo on the left and two address blocks on the
right.

<details>
<summary>Expected Markdown · excerpt, foot of the page</summary>

```markdown
<!-- … -->

Branches also at Farrowmede, Nordwick & Cassilport

[seal: KESSLER & VANE CHARTERED ACCOUNTANTS FRN-408217E • ASTILBE]

[signature]
```

</details>

<!-- skill:generate
- Write a round seal or stamp as its own block: [seal: all legible text] in a readable order (upper rim, centre, lower rim), e.g. [seal: KESSLER & VANE CHARTERED ACCOUNTANTS FRN-408217E • ASTILBE].
- Copy the letters exactly as printed, even when the rim cuts a word short; never complete or guess text.
- Use the bare [seal] only when none of its text can be read. A signature across the seal is a separate [signature] block.
-->

<!-- skill:check
- FAIL (MUST) if a seal or round stamp on the page has no [seal…] marker.
- FAIL (MUST) if legible seal text is missing from the marker, or the marker holds text the seal does not print.
- FAIL (MUST) if the bare [seal] is used while some of the seal's text is legible.
- FAIL (MUST) if the seal text is merged into a body sentence instead of its own block.
-->

## Related

- [[Signatures]] — the mark it usually accompanies
- [[Handwriting and Stamps]] — a stamp that lands on a table
- [[Watermarks]] — the other page-level mark with its own placement
