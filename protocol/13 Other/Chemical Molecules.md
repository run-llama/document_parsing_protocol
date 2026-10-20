---
title: Chemical Molecules
rule_id: other-chemical-molecules
status: rule
scope: page
tags: [other, rule, images, diagrams, math]
---

# Chemical Molecules

> [!success] ✅ Normative
> Linear formulae, ions and reactions MUST be written with `\ce{...}`, and drawn structures, rings
> and branches with `\chemfig{...}`. Standalone chemical markup MUST be placed in a fenced `latex`
> block. Legible structure MUST be preserved; an unreadable portion MUST be described rather than
> guessed.

Structural formulae and reaction equations printed as figures.

![[chemical-molecule.png]]

A structural formula printed as a figure — exactly the case a prose description cannot reconstruct.

## Which markup

The markup follows what is printed:

| Printed | Markup | Examples |
| --- | --- | --- |
| A formula, ion or reaction written on a line | `mhchem` — `\ce{...}` | `\ce{SO4^2-}`, `\ce{2H2 + O2 -> 2H2O}` |
| A 2D molecular structure: rings, branches, drawn bonds | `chemfig` — `\chemfig{...}` | a ring with its substituents |

## Why a code representation rather than a description

A structural formula is exactly reconstructable — unlike a photograph, it has a canonical textual
encoding that a chemist or a downstream tool can render back to the same picture. A prose
description ("a benzene ring with a hydroxyl group") is lossy and unverifiable, and it silently
discards stereochemistry, charges and substituent positions. A legible structure therefore MUST
NOT be rendered as prose.

The same reasoning governs [[Electrical Schematics]] and [[Blueprints]]: a domain-specific code
block is preferred wherever a faithful one exists.

## Placement and unreadable structures

- A formula standing on its own — a displayed structure or reaction — MUST be in a fenced `latex`
  block.
- Every legible atom, bond, charge and substituent MUST be kept (**never drop**).
- Where part of a structure cannot be read, that part MUST be described in words, and the output
  MUST NOT fill it in with a plausible guess (**never invent**).

<!-- skill:generate
- Write formulae, ions and reactions printed on a line with mhchem: \ce{SO4^2-}, \ce{2H2 + O2 -> 2H2O}.
- Write drawn structures (rings, branches, drawn bonds) with \chemfig{...}; never replace a legible structure with a prose description.
- Put a standalone formula, reaction or structure in a fenced ```latex block.
- If part of a structure is unreadable, describe that part in words; never guess atoms, bonds or charges.
-->

<!-- skill:check
- FAIL (MUST) if a legible structural formula on the page is rendered only as a prose description.
- FAIL (MUST) if a printed formula, ion or reaction uses a notation other than \ce{...}, or a drawn structure one other than \chemfig{...}.
- FAIL (MUST) if a standalone chemical formula or structure is not inside a fenced latex block.
- FAIL (MUST) if an atom, charge, bond or substituent in the Markdown is not printed on the page.
-->

## Related

- [[Electrical Schematics]] — the same preference for a domain notation, still open for circuits
- [[Inline Equations]] — the `$$` delimiters used for mathematics
- [[Music Notation]] — the notation that would follow this pattern if settled
