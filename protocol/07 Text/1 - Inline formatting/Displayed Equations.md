---
title: Displayed Equations
rule_id: text-displayed-equations
status: rule
scope: page
tags: [text, formatting, math]
---

# Displayed Equations

> [!success] ✅ Normative
> Displayed mathematics MUST be written as LaTeX inside `$$ … $$`. Its printed equation number
> MUST follow the closing delimiter as plain text in the same formula block: `$$ … $$ (1)`.

A displayed equation is set on its own line, usually centred, often with a number at the right
margin — `(1)`, `(2)` — that the prose cites.

```text
                 ΔE = ΔE⁰ − (RT / m·F) [ ln(θ / 1−θ) + fθ + gθ^(3/2) ]          (1)
```

## Requirements

- The delimiters are those of [[Inline Equations]]: `$$ … $$`, never single `$`.
- The equation number MUST be kept. It is content — "as shown in (1)" appears in the prose — and
  dropping it is the one option that loses something (**never drop**).
- The number MUST be written after the closing `$$`, as plain text, in the same block — not inside
  the LaTeX, and not as a separate paragraph. The Formula block includes its number; see
  [[Block Classes]].
- An unnumbered display MUST NOT be given a number.

### ✅ **Sample** — numbered equations in a two-column article

![[bag-journal-drop-cap-equations.png]]

Two display equations, numbered (1) and (2) at the right margin, each cited in the surrounding
text. Equation (2) spans the full column width and wraps after `⇒`; the wrap is typesetting, so the
LaTeX is one line. The symbol cited in the prose after (1) is itself maths and takes the inline
form.

<details>
<summary>Expected Markdown · excerpt, right column</summary>

```markdown
UPD represents a potential dependent adsorption with great sensitivity and selectivity towards the nature of the metal surface and its termination. The complexity of the voltammetry features arises from the existence of one or more UPD ML superstructures<sup>22,23</sup> and/or one or more UPD MLs formed.<sup>24,25</sup>

$$\Delta E = \Delta E^{0}_{\theta \to 0} - (RT / mF) \cdot [\ln(\theta/(1-\theta)) + f\theta + g\theta^{3/2}]$$ (1)

Here the $$\Delta E^{0}_{\theta \to 0}$$ term represents the underpotential of the most positive stripping peak of the UPD adlayer where its coverage approaches zero. The term f is the Temkin parameter describing the attractive UPD ML–substrate interactions, as given in Eq. (1).

<!-- … -->

The UPD ML coverage can be controlled effectively down to a fraction of a monolayer by proper choice of an underpotential. The amount of deposited P is controlled by the reaction stoichiometry and the coverage of the UPD ML of metal M. The most general formulation of the SLRR reaction is given by the following equation:<sup>16</sup>

$$(\theta_{M} \cdot \rho_{M}^{\mathrm{UPD}}) \cdot M^{0}_{\mathrm{UPD}}/S(h,k,l) + (\theta_{M} \cdot \rho_{M}^{\mathrm{UPD}}) \cdot (m/p)P^{p+}_{\mathrm{solv}} \Rightarrow (\theta_{M} \cdot \rho_{M}^{\mathrm{UPD}}) \cdot M^{m+}_{\mathrm{solv}} + (\theta_{M} \cdot \rho_{M}^{\mathrm{UPD}}) \cdot (m/p)P^{0}_{s}/S(h,k,l)$$ (2)

*(continued on next page)*
```

</details>

### ✅ **Sample** — a typewritten paper

![[bag-typewritten-equations.png]]

Equation `V = pu_y` numbered `(2)` at the right margin, then an unnumbered display `½ mV²`, in a
scanned typewritten proceedings page. Run-in underlined headings, also set in italic, open two
paragraphs.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

*<u>Velocity Spectra.</u>* Another method of presenting the same data is of interest here. This method involves the concept of a spectral velocity for the elasto-plastic system. The definition which is most convenient is to define the spectral velocity V by the relationship

$$V = pu_{y}$$ (2)

where p denotes the undamped circular natural frequency of the system. Then the quantity

$$\frac{1}{2} mV^{2}$$

represents the maximum recoverable strain energy of the system. It should be noted that this definition of the spectral velocity for the elasto-plastic system is consistent with that used for elastic systems, since in an elastic system the yield deformation may be taken equal to the maximum elastic deformation.

*<u>Relation Between Input Motion and Response Values.</u>* It is convenient to plot velocity spectra on a four-way logarithmic grid, so that displacement, velocity, acceleration and period may all be read from a single chart.
```

</details>

## Formulas drawn as boxes

A formula laid out as boxes joined by operators is still an equation.

- A boxed arithmetic formula MUST be written in `$$ … $$`, keeping every printed operand, operator
  and label; the box labels become the operands.
- Where the boxes express a process rather than an equation, the region is a diagram and MUST be
  rendered as a diagram block instead — see [[Images and Figures]].

### ✅ **Sample** — a formula drawn as boxes

![[bag-boxed-formula.png]]

A growth-rate calculation laid out as black boxes: two boxes joined by `-` over a rule, a third box
beneath, each box holding a labelled sum in bold white type. It is a fraction with no LaTeX on the
page. The grouping the boxes print becomes parentheses in the numerator.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
**Calculation:**

$$\frac{\left(\textbf{Inventory and Related Property (current year)} + \textbf{General Property, Plant and Equipment (current year)}\right) - \left(\textbf{Inventory and Related Property (prior year)} + \textbf{General Property, Plant and Equipment (prior year)}\right)}{\textbf{Inventory and Related Property (prior year)} + \textbf{General Property, Plant and Equipment (prior year)}}$$

<!-- … -->
```

</details>

<!-- skill:generate
- Write a displayed equation as LaTeX inside $$…$$ on its own line, and put its printed number after the closing delimiter as plain text: $$V = pu_{y}$$ (2)
- Never drop the equation number, never move it inside the LaTeX or into its own paragraph, and never add a number the page does not print.
- Write the equation as one line of LaTeX even when the page wraps it.
- A formula drawn as boxes joined by operators is still an equation: write it in $$…$$ with each box's printed label as an operand (\text{…} or \textbf{…}), keeping every operator. If the boxes show a process, not arithmetic, render a diagram instead.
-->

<!-- skill:check
- FAIL (MUST) if a displayed equation is not in $$…$$.
- FAIL (MUST) if a printed equation number is missing, or is not plain text directly after the closing $$ of its equation.
- FAIL (MUST) if an equation carries a number the page does not print.
- FAIL (MUST) if a formula drawn as boxes loses a printed operand label or operator, or is rendered as prose instead of $$…$$.
-->

## Related

- [[Inline Equations]] — the delimiters
- [[Block Classes]] — the Formula block carries its number
- [[Images and Figures]] — where boxes describe a process, the region is a diagram
- [[Drop Caps]] — the article sample opens with one
