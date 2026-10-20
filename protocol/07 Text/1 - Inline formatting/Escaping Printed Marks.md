---
title: Escaping Printed Marks
rule_id: text-escaping-printed-marks
status: rule
scope: page
tags: [text, formatting, inline]
---

# Escaping Printed Marks

> [!success] ✅ Normative
> A character the page prints is content, even when Markdown would read it as syntax. It MUST be
> escaped so that it cannot open a span — `\*\*`, `\_`, `\|` — and it MUST NOT be deleted to avoid
> the collision.

Some marks a document prints are also Markdown's own punctuation: a menu that flags allergens with
`**`, a form that labels a field `_____`, a legal citation using `|`. The mark is transcribed, and
kept from being read as markup.

```text
Melt-in-the-Middle Fish Pie Fishcake**      ← ** is a printed allergen marker
Beer-Battered Haddock & Chips§**               pointing at a legend elsewhere
```

Written unescaped, that `**` opens a bold span that never closes and swallows the rest of the
block.

## What to escape

| Printed | Output | Would otherwise |
| --- | --- | --- |
| `*` `**` | `\*` `\*\*` | Open emphasis or bold |
| `_` `__` | `\_` `\__` | Open emphasis, or vanish inside a word |
| `#` at line start | `\#` | Become a heading |
| `|` inside a table cell | `\|` | Split the cell |
| `` ` `` | `` \` `` | Open a code span |
| `~~` | `\~\~` | Strike the text through |
| `---` at line start | `\-\-\-` | Become a horizontal rule, or collide with the page separator |
| A literal bracketed number or word — `[1]`, `[date]` | `\[1\]`, `\[date\]` | Read as a marker (`[x]`, `[blank]`) or a form id |
| A literal angle-bracket placeholder — `<NAME>` | `&lt;NAME&gt;` | Be read as an HTML tag and vanish |

- Escaping SHOULD be applied only where the collision is real. A `*` in the middle of a word, or a
  `#` mid-sentence, needs nothing.
- A printed character MUST NOT be replaced by a different mark to avoid the collision: rewriting
  `**` as `<sup>2</sup>` or as a word is the **never invent** failure, and dropping it is the
  **never drop** one. The marker is the only thing tying an item to its legend; a legend entry
  with nothing pointing at it is unusable.

## A raised marker is still a superscript

Escaping decides how the character survives; it does not decide its position. A marker printed
above the baseline MUST be written `<sup>\*\*</sup>` — both rules apply, and neither substitutes
for the other. See [[Superscript and Subscript]].

## Dashes, literal brackets and angle brackets

### ✅ **Sample** — lines that open with three dashes

![[bag-games-deck-dashes.png]]

Every sub-point on the slide begins with `---` as its marker, printed bold. Left as printed, each
line becomes a horizontal rule and its text vanishes into the rule above. The `---` in the middle
of *New Strategy---Fund* is not at line start and needs no escape.

<details>
<summary>Expected Markdown · slide body</summary>

```markdown
# Financial Highlights of the Games 1/2

**I. State Govt./Local Govt./Games Committees** (Bid & Organ.)

**\-\-\-Decades of Effort** with IWGC to Bid on Games

**\-\-\-New Strategy**---Fund, Plan, and Build Facilities

**II.** 1990-Halvana Citizens Approve Games

**Earmarking** Sales Tax

**\-\-\-$ 60 Million** over 10 years-years 1991 to 2000

<strong>---</strong>To be **Repaid** from HGOC Games Revenues

**III.** 1991-**Halvana Sports Authority** Created by Law

**\-\-\-Games Sites** Identified with Local Govt's

<strong>---</strong>Local Partnership **Contracts** and Construction Begins

**\-\-\-Halv. Sports Auth.-** Commissions Halvana Financial Model

<!-- … -->
```

</details>

### ✅ **Sample** — bracketed numbers that are not form ids

![[bag-kessan-ids.png]]

`[1]`, `[2]`, `[3]` number the sub-items of a note; the value `None` sits at the right. The same
page carries `(1)`, `(2)`, `(3)` for the items above them, which need no escape. The bold heading
`*Notes` opens with a printed asterisk.

<details>
<summary>Expected Markdown · excerpt, the notes</summary>

```markdown
**\*Notes**

(1) Important changes in the scope of the consolidation during period: None

(2) Changes in accounting policies; changes in accounting estimates

\[1\] Changes in accounting policies required by IFRS None

\[2\] Changes in accounting policies other than those in \[1\] None

\[3\] Changes in accounting estimates None

(3) Number of outstanding shares (common shares)

\[1\] Number of outstanding shares (including treasury shares)

March 2026 186,420,500

March 2025 186,420,500

\[2\] Number of treasury shares

March 2026 1,905,220

March 2025 1,942,810

\[3\] Average number of common shares outstanding during the fiscal year (shares)

March 2026 184,551,020

March 2025 184,498,610
```

</details>

### ✅ **Sample** — bracketed template placeholders

![[bag-interpreter-affidavit-placeholders.png]]

`[#say on oath #affirm]`, `[date]`, `[name]`, `[specify language]` printed on grey highlights
inside the sentences of a court template. Every one would read as a form id or a checkbox, and the
grey is a highlight — see [[Highlighted Text]]. The italic notice `[on separate page]` under the
page number is bracketed too.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
3

*\[on separate page\]*

<!-- … -->

I <mark style="background-color: lightgray">\[#say on oath #affirm\]</mark>:

1. I am an accredited interpreter as defined in the *Court Interpreter Standards Code 2019* in the following languages <mark style="background-color: lightgray">\[provide details of the languages\]</mark>.

2. My <mark style="background-color: lightgray">\[#accreditation #registration #recognition\]</mark> to interpret the languages set out in paragraph 1 has been issued by <mark style="background-color: lightgray">\[provide details of the recognised agency\]</mark>.

3. On <mark style="background-color: lightgray">\[date\]</mark> I sight translated the above affidavit of <mark style="background-color: lightgray">\[name\]</mark> dated <mark style="background-color: lightgray">\[date\]</mark> (the **Affidavit**) to <mark style="background-color: lightgray">\[name\]</mark> (the **Deponent**) in the <mark style="background-color: lightgray">\[specify language\]</mark> language.

4. Before translating the Affidavit, I:

   a. read the code of conduct contained in Schedule 4B to the *Court Interpreter Standards Code 2019* and agreed to be bound by it; and

   b. was given adequate opportunity to prepare to sight translate the Affidavit.

5. After I sight translated the entire Affidavit to the Deponent, the Deponent then:

   a. informed the person responsible for the preparation of the Affidavit through me that the Deponent understood my interpretation and agreed with the entire contents of the Affidavit; and

   b. <mark style="background-color: lightgray">\[#swore #affirmed\]</mark> the Affidavit in my presence.
```

</details>

### ✅ **Sample** — angle-bracket placeholders

![[bag-heirship-angle-placeholders.png]]

`<LEGAL DESCRIPTION OF PROPERTY>`, `<AFFIANT SIGNATURE>`, `<TYPE NAME OF AFFIANT>` on grey
highlights. Left as printed, each is an HTML tag and vanishes from a rendered page. The first line
is the tail of a placeholder that began on the previous page, so only its closing `>` is printed.
The ruled lines are empty fields — see [[Blanks Inside Sentences]].

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<mark style="background-color: gainsboro">EXPENSES AND DEBTS OF DECEDENT OR STATE “NONE”&gt;</mark>

13. There are no unpaid estate or inheritance taxes, except: <mark style="background-color: gainsboro">&lt;LIST UNPAID ESTATE OR INHERITANCE TAXES OR STATE “NONE”&gt;</mark>

14. To the best of my knowledge, Decedent owned an interest in the following real property:

    <mark style="background-color: gainsboro">&lt;LEGAL DESCRIPTION OF PROPERTY&gt;</mark>

15. <mark style="background-color: gainsboro">(Optional)</mark> The following were the heirs of Decedent: <mark style="background-color: gainsboro">&lt;LIST ALL DESCENDANTS OF DECEDENT&gt;</mark>

    a. [blank]

    b. [blank]

    c. [blank]

<mark style="background-color: gainsboro">&lt;AFFIANT SIGNATURE&gt;</mark>

[blank]

<mark style="background-color: gainsboro">&lt;TYPE NAME OF AFFIANT&gt;</mark>

SUBSCRIBED AND SWORN TO before me on [blank], 20[blank], by [blank].

<!-- … -->
```

</details>

<!-- skill:generate
- Transcribe every printed character, including ones that are Markdown syntax, and escape them with a backslash where they would change the rendering: \*\* for a printed **, \_ for _, \# for a # at line start, \| inside a table cell, \` for a backtick, \~\~ for ~~.
- A line that opens with printed --- becomes \-\-\- so it is not read as a rule or a page separator.
- A printed bracketed number or word such as [1] or [date] becomes \[1\] or \[date\]; a printed angle-bracket placeholder such as <NAME> becomes &lt;NAME&gt;.
- Never delete the mark and never replace it with a different one (a word, a number, a footnote tag). A raised marker is both tagged and escaped: <sup>\*\*</sup>.
- Do not escape where there is no collision (a * inside a word, a # mid-sentence).
-->

<!-- skill:check
- FAIL (MUST) if a printed *, **, _, #, |, `, ~~, ---, bracketed number/word or angle-bracket placeholder visible on the page is missing from the Markdown.
- FAIL (MUST) if a printed mark is left unescaped so that it changes the rendering: opens bold or italics, becomes a heading, a rule or a page separator, splits a table cell, or is read as an HTML tag.
- FAIL (MUST) if a printed mark is replaced by a different mark (a word, a number, <sup>2</sup> for **).
- FAIL (MUST) if a printed bracketed number or word ([1], [date]) appears unescaped where it can be read as a checkbox, blank or form-id marker.
-->

## Related

- [[Superscript and Subscript]] — a raised marker is tagged as well as escaped
- [[Text Formatting Conventions]] — the full inline-markup table
- [[Marks and Symbols in Cells]] — where a printed marker belongs inside a table
- [[Markdown Rendering]] — why `---` is reserved for page boundaries
