---
title: Continued in the Title
rule_id: tables-continued-in-the-title
status: rule
scope: page
tags: [tables, continuation, captions]
---

# "(continued)" in the Title

> [!success] ✅ Normative
> A continuation marker — `(cont'd)`, `(continued)`, `Table 5 — … (cont.)` — is printed text and MUST
> be kept verbatim in the title. The fragment on this page MUST be rendered as a table in its own
> right.

```text
Table 5 — Lapse Rates (cont'd)     ← explicit continuation marker
| Duration | Rate |
```

## Requirements

- The title MUST be transcribed exactly as printed, marker included. The marker MUST NOT be
  stripped to tidy the title, nor rewritten into a fuller form.
- The table on this page MUST be rendered as a table in its own right. Its rows MUST NOT be fused
  with a fragment on a previous page (unless the join option of [[Output Options]] was requested).
- The kept marker is what records that the fragment continues an earlier table. It is the
  strongest continuation evidence a page can give — far stronger than the indirect signals other
  fragments offer.

## Why this is the easy end of a hard problem

Everywhere else in [[Cross-Page Tables]], continuation has to be inferred from weak signals: a
missing header, a first row that starts mid-key, rows running right to the page edge. Here the
document says it outright, so there is nothing to infer — only a statement not to throw away.

Keeping the marker settles the fidelity half of the question however the fragments are eventually
joined: the words are printed on the page, so they survive (**never drop**). The fragment stays on its
own page and is flagged as continued — see [[Cross-Page Tables]].

### ✅ **Sample** — a band that says `Cont'd`

![[bag-benefit-funds-contd.png]]

`SELF-INSURED / $1 MILLION TO $3 MILLION CATEGORY – Cont'd` as a band under the heading of a
scanned schedule. It is boxed on its own, apart from the table frame, so it is a title above the
table, kept with its marker. Each fund spans several printed lines, one benefit per line, with `X`
marks in the `INSURED`, `SELF-INSURED` and three `COVERAGE` columns; the fund-name cell is one merged
cell beside its benefit rows.

<details>
<summary>Expected Markdown</summary>

```markdown
# SCHEDULE OF EMPLOYEE BENEFIT PLANS

<table>
  <caption><strong>SELF-INSURED / $1 MILLION TO $3 MILLION CATEGORY – Cont'd</strong></caption>
  <tr> <th rowspan="2">FUND NAME</th> <th rowspan="2">BENEFIT</th> <th rowspan="2">INSURED</th> <th rowspan="2">SELF-INSURED</th> <th colspan="3">COVERAGE</th> </tr>
  <tr> <th>ADMIN</th> <th>DENTAL</th> <th>VISION</th> </tr>
  <tr> <td rowspan="3">Harrow Valley Employees Benefit Fund</td> <td>Life Insurance</td> <td>X</td> <td> </td> <td>X</td> <td> </td> <td> </td> </tr>
  <tr> <td>Long-Term Disability</td> <td> </td> <td>X</td> <td>X</td> <td> </td> <td> </td> </tr>
  <tr> <td>Medical</td> <td> </td> <td>X</td> <td>X</td> <td>X</td> <td>X</td> </tr>
  <tr> <td rowspan="2">Kettering District Trust Fund</td> <td>Life Insurance</td> <td>X</td> <td> </td> <td>X</td> <td> </td> <td> </td> </tr>
  <tr> <td>Medical</td> <td> </td> <td>X</td> <td>X</td> <td>X</td> <td>X</td> </tr>
  <tr> <td rowspan="3">Wrenfield Municipal Benefit Fund</td> <td>Life Insurance</td> <td>X</td> <td> </td> <td>X</td> <td> </td> <td> </td> </tr>
  <tr> <td>Long-Term Disability</td> <td>X</td> <td> </td> <td>X</td> <td> </td> <td> </td> </tr>
  <tr> <td>Dental</td> <td> </td> <td>X</td> <td>X</td> <td>X</td> <td> </td> </tr>
  <tr> <td rowspan="2">Ashcombe Regional Trust</td> <td>Medical</td> <td> </td> <td>X</td> <td>X</td> <td>X</td> <td>X</td> </tr>
  <tr> <td>Vision</td> <td> </td> <td>X</td> <td>X</td> <td> </td> <td>X</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `—Continued` in a table title

![[bag-nces-table-continued.png]]

`Table 7. Graduation rates … cohort years 2004 and 2007—Continued` over the last four rows of a
table, with the full header stack repeated and a `— Not available` legend below. Every column
header is one label wrapped over several lines; `Public` and the two private rows are indented under
the first row.

<details>
<summary>Expected Markdown · excerpt, the title and the table</summary>

```markdown
<table>
  <caption>Table 7. Graduation rates at Title IV institutions, by race/ethnicity, level and control of institution, gender, degree sought, and degree completed at the institution where the students started as full-time, first-time students: United States, cohort years 2004 and 2007—Continued</caption>
  <tr> <th>Level and control of institution, gender, degree sought, and degree completed</th> <th>Overall (%)</th> <th>American Indian or Alaska Native (%)</th> <th>Asian, Native Hawaiian or Other Pacific Islander (%)</th> <th>Black or African American (%)</th> <th>Hispanic or Latino (%)</th> <th>White (%)</th> <th>Two or more races<sup>1</sup> (%)</th> <th>Race/ethnicity unknown (%)</th> <th>Nonresident alien (%)</th> </tr>
  <tr> <td data-level="0">Less-than-2-year institutions (cohort year 2007)</td> <td>66.9</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> </tr>
  <tr> <td data-level="1">Public</td> <td>70.3</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> </tr>
  <tr> <td data-level="1">Private nonprofit</td> <td>75.3</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> </tr>
  <tr> <td data-level="1">Private for-profit</td> <td>66.0</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> </tr>
</table>

— Not available. Graduation rates data are not collected by race/ethnicity or gender for less-than-2-year institutions.

<!-- … -->
```

</details>

<!-- skill:generate
- Keep a continuation marker such as (cont'd), (continued), —Continued or Cont'd exactly as printed in the table's title or band; never drop or expand it.
- Render the fragment on this page as its own complete table; do not merge it with rows from another page.
-->

<!-- skill:check
- FAIL (MUST) if a continuation marker printed in a table title or band is missing or altered in the Markdown.
- FAIL (MUST) if, with no join option requested, a fragment titled as a continuation is merged with a table from another page.
-->

## Related

- [[Cross-Page Tables]] — continuation without a printed marker
- [[Repeated Headers and Title Bands]] — a header repeated on the same page is a boundary
- [[Titles Banners Captions]] — where a title sits relative to its table
- [[Output Options]] — the same fragment joins into one table under a wider setting
