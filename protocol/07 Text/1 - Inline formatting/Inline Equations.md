---
title: Inline Equations
rule_id: text-inline-equations
status: rule
scope: page
tags: [text, formatting, math]
---

# Inline Equations

> [!success] ✅ Normative
> Every equation MUST be written as LaTeX inside `$$ … $$`, inline ones included. Single-`$`
> delimiters MUST NOT be used.

```text
the coefficient $$\alpha$$ is fixed
```

The same delimiters apply whether the equation sits in the middle of a sentence or on a line of
its own; there is no separate inline form. Displayed equations and their numbers are covered in
[[Displayed Equations]].

## Why double delimiters

A lone `$` is ambiguous. Notebook and Markdown renderers treat an unrelated currency sign further
down the page as the closing delimiter, open an unterminated maths span and swallow everything
after it. Doubling the delimiter removes the ambiguity. It is non-standard for inline maths, and
that cost is accepted.

<!-- skill:generate
- Write every mathematical expression, including a single symbol or variable set as maths in running text, as LaTeX inside $$…$$: the coefficient $$\alpha$$ is fixed.
- Never use single $…$ delimiters, even for inline maths.
-->

<!-- skill:check
- FAIL (MUST) if a mathematical expression is delimited with single $…$, or with \( … \) or \[ … \], instead of $$…$$.
- WARN (SHOULD) if printed maths (Greek letters, operators, raised or lowered indices inside a formula) is written as plain text instead of $$…$$ LaTeX.
-->

## Related

- [[Displayed Equations]] — equations on their own line, with their printed number
- [[Text Formatting Conventions]] — the full inline-markup table
- [[Chemical Molecules]] — LaTeX packages for chemistry
