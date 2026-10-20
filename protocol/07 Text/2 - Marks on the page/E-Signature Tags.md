---
title: E-Signature Tags
rule_id: text-e-signature-tags
status: rule
scope: page
tags: [text, marks, forms]
---

# E-Signature Tags

> [!success] ✅ Normative
> A field that carries only an e-signature tag is unsigned and MUST be rendered as a blank, `[blank]`.
> A tag that prints a word — SIGN, INITIAL — MUST be rendered as that word, separately beside the
> field, and MUST NOT be rendered as a signature or as the field's value.

Electronic signing tools print a small coloured tab beside each field the signer must complete —
"SIGN", "INITIAL", an arrow. The tab is not a signature and not part of the form; it is an
instruction to a future signer, often left in the exported file.

```text
QUALIFYING DISABLED VETERAN'S   │ QUALIFYING DISABLED VETERAN'S   │ DATE
SIGNATURE                       │ PRINTED NAME                    │
▸SIGN                           │                                 │
```

## Requirements

- The field MUST be rendered as unsigned: `[blank]`, as for any blank field — see [[Fill-Ins]].
- A tag's printed word MUST be kept, verbatim, beside the field and outside the field's value. The
  samples below place it on its own line directly after the field.
- A tag that prints no word adds nothing to the text.
- A page on which the signature fields carry only tags is unsigned. `[signature]` MUST NOT appear
  for such a field — see [[Signatures]].

### ✅ **Sample** — signature cells with signing tabs

![[bag-esign-tags.png]]

Two signature blocks, each a three-cell row. A small red tab reading `SIGN▸` sits under "SIGNATURE"
in the first cell of each; every cell is otherwise empty.

<details>
<summary>Expected Markdown · excerpt, first block</summary>

```markdown
<!-- … -->

- **QUALIFYING DISABLED VETERAN’S SIGNATURE**: [blank]
  SIGN▸
- **QUALIFYING DISABLED VETERAN’S PRINTED NAME**: [blank]
- **DATE**: [blank]
```

</details>

### ✅ **Sample** — a tag beside a name line

![[bag-agency-esign.png]]

A small red tab sits at the start of the `Name**:` line in the signature block, ahead of an
otherwise blank ruled line. The tab prints no word, so nothing is added for it; every field in
the block is blank.

<details>
<summary>Expected Markdown · excerpt, signature block</summary>

```markdown
<!-- … -->

- **Name\*\***: [blank]
- **Title\*\***: [blank]
- **Signature**: [blank]
- **Date of Certification (mm/dd/yyyy)**: [blank]
- **Email\*\***: [blank]
- **Phone Number\*\***: [blank]

\*\*An individual executive or financial officer of the consultant’s or subconsultant’s organization at a level no lower than a Vice President, a Chief Financial Officer, or equivalent, who has authority to represent the financial information used to establish the indirect cost rate.

<!-- … -->
```

</details>

<!-- skill:generate
- A signature field that holds only a coloured e-signing tab ("SIGN", "INITIAL", an arrow) is unsigned: write its value as [blank].
- If the tab prints a word, write that word verbatim on its own line right after the field (e.g. "SIGN▸"), never as the field's value.
- A tab with no word adds nothing. Never write [signature] for a field that only carries a tab.
-->

<!-- skill:check
- FAIL (MUST) if a field that carries only an e-signing tab is given a value other than [blank], or is rendered as [signature].
- FAIL (MUST) if a tab's word (SIGN, INITIAL) appears as the field's value.
- FAIL (MUST) if the word printed on a visible e-signing tab is missing from the Markdown.
-->

## Related

- [[Signatures]] — the real thing
- [[Fill-Ins]] — an unsigned field is a blank field
- [[Iconography and Symbols]] — a mark that carries a meaning
