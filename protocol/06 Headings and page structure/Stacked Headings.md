---
title: Stacked Headings
rule_id: headings-stacked-headings
status: rule
scope: page
tags: [rule, structure, headings]
---

# Stacked Headings

> [!success] ✅ Normative
> The wrapped lines of one title MUST be joined with spaces into one heading. An article number
> MUST stay with its title. A company name printed above a statement or document title, exhibit
> labels, units lines and other furniture MUST be kept separate from the title; a title and subtitle MAY be split only where the document establishes
> distinct roles for them.

A stacked heading is printed over two or three centred lines: an article number over its title, a
note number over a title that wraps. A company name printed over a statement name looks the same
but is not part of the title.

```text
                ARTICLE 11
     ECONOMIC INCLUSION REQUIREMENTS

21 Total equity
   reconciliation
```

The question is whether the break is a wrap or a hierarchy. `21 Total equity / reconciliation` is a
wrap. `ARTICLE 11 / ECONOMIC INCLUSION REQUIREMENTS` reads as a number and a title — and the number
stays with the title.

## Requirements

- The lines of one title MUST be joined with a single space, in printed order, into one heading.
- Its lines MUST NOT become two headings at the same level, nor a parent heading with a child.
- An article or note number printed above its title MUST be the start of that title's heading.
- A subtitle MAY be a separate element only where the document gives title and subtitle distinct
  roles; otherwise the lines are one heading.

### ✅ **Sample** — an article number over its title

![[bag-run-in-sections.png]]

`ARTICLE 11` and `ECONOMIC INCLUSION REQUIREMENTS` are centred on two lines, both bold and
underlined, at the same size. They form one heading. Its depth is relative: the page does not show
the outline above the article.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
## ARTICLE 11 ECONOMIC INCLUSION REQUIREMENTS

### Section 11.1 Definitions

<!-- … -->
```

</details>

### ✅ **Sample** — a note title that wraps

![[bag-notes-shared-header.png]]

`21 Total equity` breaks to `reconciliation` on a second line in the same green face; the earlier
`20 Reserves` fits on one. Both note titles are printed inside the grid, under one shared header,
so each is a full-width band row of a single table (see [[Split Tables Sharing a Header]]); the
wrapped title is joined with a space in its cell.

<details>
<summary>Expected Markdown · table</summary>

```markdown
<table>
  <tr> <th></th> <th colspan="2">Consolidated</th> <th colspan="2">Merevald Retail Ltd</th> </tr>
  <tr> <th></th> <th>As at<br/>29 June 25<br/>$m</th> <th>As at<br/>23 June 24<br/>$m</th> <th>As at<br/>29 June 25<br/>$m</th> <th>As at<br/>23 June 24<br/>$m</th> </tr>
  <tr> <th colspan="5">20 Reserves</th> </tr>
  <tr> <td><strong>Reserves</strong></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Capital profits reserve</td> <td>58.4</td> <td>56.2</td> <td>2.4</td> <td>2.4</td> </tr>
  <tr> <td>Asset revaluation reserve</td> <td>64.1</td> <td>65.9</td> <td>0.5</td> <td>0.5</td> </tr>
  <tr> <td>General reserve</td> <td>41.3</td> <td>41.3</td> <td>40.2</td> <td>40.2</td> </tr>
  <tr> <td>Foreign currency translation reserve</td> <td>(0.8)</td> <td>(1.9)</td> <td>–</td> <td>–</td> </tr>
  <tr> <td></td> <td><strong>162.9</strong></td> <td><strong>161.5</strong></td> <td><strong>43.1</strong></td> <td><strong>43.1</strong></td> </tr>
  <tr> <th colspan="5">21 Total equity reconciliation</th> </tr>
  <tr> <td>Total equity at beginning of period</td> <td>1,348.9</td> <td>1,441.6</td> <td>982.2</td> <td>1,061.3</td> </tr>
  <tr> <td>Total changes in equity recognised in the statement of financial performance</td> <td>498.6</td> <td>421.1</td> <td>344.0</td> <td>436.5</td> </tr>
  <tr> <td><strong>Transactions with owners as owners:</strong></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>– Issue of shares as per note 16</td> <td>104.0</td> <td>87.3</td> <td>104.0</td> <td>87.3</td> </tr>
  <tr> <td>– Dividends paid or provided</td> <td>(305.4)</td> <td>(251.0)</td> <td>(305.4)</td> <td>(251.0)</td> </tr>
  <tr> <td><strong>Total equity at end of period</strong></td> <td><strong>1,610.7</strong></td> <td><strong>1,348.9</strong></td> <td><strong>1,088.5</strong></td> <td><strong>982.2</strong></td> </tr>
</table>
```

</details>

## Company name over a statement title

A company or entity name set directly above a statement, report or agreement title is **not** part
of the title. It MUST be rendered as its own paragraph above the heading, keeping its printed
emphasis, and the heading is the title alone:

```markdown
**CORVANE MEDIA CORPORATION**

# CONDENSED CONSOLIDATED BALANCE SHEETS

(unaudited; $ in millions)
```

The heading then names the document, so an outline reads "Condensed Consolidated Balance Sheets"
rather than repeating the company in every statement title. The same holds for financial
statements, agreements and reports alike. The units or date line beneath MUST also stay a separate
paragraph. A company name with no title beneath
it — only a grid, or a running stack repeated on every page — is furniture; the repetition is
judged across the document, see [[Recurring Page Furniture]].

## Furniture is separated before a title is joined

Exhibit labels, units lines and other furniture MUST be separated from the title before its lines
are joined; only the lines of the title itself are joined. See [[Recognising Ambiguous Headings]]
for the distinction between titles and furniture.

<!-- skill:generate
- When one title is printed over two or three lines, output one heading with the lines joined by single spaces: "## ARTICLE 11 ECONOMIC INCLUSION REQUIREMENTS".
- Never make the lines of one title into two headings, or a heading plus a sub-heading, unless the document clearly gives the second line a subtitle role.
- A company name printed above a statement or document title is its own paragraph above the heading (bold if printed bold), never part of the heading; keep a units or date line beneath as a separate paragraph too.
- Keep exhibit labels ("Exhibit D") and other furniture out of the joined title.
- A title that wraps inside a table cell is joined with a space in that cell.
-->

<!-- skill:check
- FAIL (MUST) if consecutive printed lines of one title are rendered as two headings or a heading plus a separate paragraph.
- FAIL (MUST) if an article or note number printed above its title is separated from that title's heading.
- FAIL (MUST) if a company name, exhibit label or units line is joined into a title heading.
-->

## Related

- [[Run-In Headings]] — the heading that shares a line with its paragraph
- [[Numbered Section Headings]] — the level a printed number implies
- [[Header Wrap vs Real Tier]] — the same wrap-or-tier question inside a table header
- [[Line Breaks Inside a Block]] — one block over several lines outside headings
