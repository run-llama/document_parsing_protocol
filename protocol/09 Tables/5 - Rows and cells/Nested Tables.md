---
title: Nested Tables
rule_id: tables-nested-tables
status: rule
scope: page
tags: [tables, encoding, rare]
---

# Nested Tables

> [!success] ✅ Normative
> A small grid printed inside one cell of a table MUST be rendered by subdividing that cell into the
> outer table's own grid: the inner grid's cells become rows and columns of the outer table, and the
> neighbouring cells span them. The output MUST NOT contain a nested `<table>` element, and MUST NOT
> flatten the inner grid into text.

A cell that itself contains a small grid: a fee schedule inside a plan-comparison cell, a
mini-table of components inside one row of a summary.

```text
| Plan | Fees                          |
| A    | ┌ admin │ 0.25% ┐            |
|      | └ fund  │ 0.10% ┘   ← a table inside the cell
```

## Recognising a nested table

The inner grid has its own alignment: two or more columns of its own, sometimes its own header row,
and its own row boundaries that do not line up with the outer table's rows. That is what separates
it from a cell that merely holds several lines of text, which is governed by
[[Record Groups and Multi-Line Cells]].

## Rendering

The inner grid's cells MUST become **real cells of the outer table**, and every cell alongside it
MUST span the rows it now occupies:

```html
<tr>
  <td rowspan="2">A</td>
  <td>admin</td><td>0.25%</td>
</tr>
<tr>
  <td>fund</td><td>0.10%</td>
</tr>
```

`A` is printed once and genuinely covers both fee rows, so `rowspan="2"` is a true statement about
the page — the same test [[Repeated Identical Values]] applies everywhere else.

- **No nested `<table>`.** A nested table makes the inner grid invisible to anything that walks the
  outer one: cell counts, column arithmetic and per-cell boxes all stop at the `<td>` boundary.
  Subdividing keeps every value addressable at the same level as the rest of the table, and the
  outer grid still reconciles — see the leaf-track check in [[Multi-Row Header Tiers]].
- **Pairs MUST survive.** The pairing inside the inner grid is the data: `admin` goes with `0.25%`
  and `fund` with `0.10%`. An encoding that lists all the labels and then all the values has
  destroyed the table; so has flattening the cell to `<br/>`-separated text.

This is one of several cases that need HTML tables rather than pipe tables, which cannot express the
spans this rule depends on (see [[Markdown Rendering]]). The others are spans in
[[Multi-Row Header Tiers]], full-width band rows in [[Bands Inside the Grid]], and level markers on
the stub in [[Row-Label Hierarchy]].

### ✅ **Sample** — `en`

![[zoo-en.png]]

The left two columns form an embedded *Section / Marks* mini-table, with its own
*Summative Assessment II / 30%* heading row, while a single ruled cell on the right spans all five
of its rows and prints nothing. The *TOTAL* row is bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th colspan="2">Division of Syllabus for Term II (October-March)</th> <th>Total Weightage Assigned</th> </tr>
  <tr> <th>Summative Assessment II</th> <th>30%</th> <td> </td> </tr>
  <tr> <th>Section</th> <th>Marks</th> <td rowspan="5"> </td> </tr>
  <tr> <td data-level="0">Reading</td> <td>20</td> </tr>
  <tr> <td data-level="0">Writing</td> <td>20</td> </tr>
  <tr> <td data-level="0">Grammar</td> <td>15</td> </tr>
  <tr> <td data-level="0">Literature</td> <td>35</td> </tr>
  <tr> <td data-level="0">Formative Assessment</td> <td> </td> <td>20%</td> </tr>
  <tr> <th data-level="0"><strong>TOTAL</strong></th> <td><strong>90</strong></td> <td><strong>50%</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `korean-curriculum`

![[zoo-korean-curriculum.png]]

A rowspan-6 *단 원 별 교 육 내 용* stub encloses its own mini-grid — complete with a shaded header
row *단원(제목) / 시수 / 교육내용* — inside the outer table. The shaded label cells on the left are
bold; the two bulleted cells print `•` bullets.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>교 육 과 정</th> <th colspan="3">실무에 바로 쓰는 엑셀 입문: 보고서 &amp; 데이터 정리</th> </tr>
  <tr> <td><strong>교 육 시 수</strong></td> <td>총 10시간</td> <td><strong>교 육 난 이 도</strong></td> <td>초중급</td> </tr>
  <tr> <td><strong>교육대상자</strong></td> <td colspan="3"><ul><li>엑셀을 처음 접하거나 기초 지식이 부족하여 어려움을 겪는 분.</li><li>실무에서 바로 적용할 수 있는 엑셀 보고서 작성 및 데이터 정리 스킬이 필요한 분.</li><li>데이터 입력 시 오류를 줄이고 싶으신 분.</li></ul></td> </tr>
  <tr> <td><strong>선 수 과 목</strong></td> <td> </td> <td><strong>차 수 과 목</strong></td> <td>데이터, 엑셀로 똑똑하게 분석하기<br/>(피벗 테이블 &amp; 함수 활용)</td> </tr>
  <tr> <td><strong>교 육 목 표</strong></td> <td colspan="3"><ul><li>보기 좋고 전문적인 실무 보고서 및 대장 양식을 만들 수 있습니다.</li><li>복잡한 데이터를 효율적으로 정리하고 원하는 정보를 추출할 수 있습니다.</li><li>데이터 정확성을 높이고, 간단한 계산 및 오류 처리를 할 수 있습니다.</li></ul></td> </tr>
  <tr> <td rowspan="6"><strong>단 원 별<br/>교 육 내 용</strong></td> <th>단원(제목)</th> <th>시수</th> <th>교육내용</th> </tr>
  <tr> <td>엑셀 기본 익히기 및<br/>데이터 입력 기초</td> <td>1.5h</td> <td>1. 엑셀 화면 구성과 효율적인 옵션 설정<br/>2. 업무 시간을 줄이는 필수 단축키<br/>3. 셀 편집 및 워크시트 관리<br/>4. 데이터 입력 규칙과 효율적인 입력 방법</td> </tr>
  <tr> <td>서식과 표 꾸미기</td> <td>1.5h</td> <td>1. 셀 서식과 조건부 서식 활용<br/>2. 표 스타일 지정 및 인쇄 영역 설정</td> </tr>
  <tr> <td>기초 함수 활용</td> <td>2h</td> <td>1. 합계·평균·개수 함수<br/>2. 논리 함수(IF)의 기본 사용법</td> </tr>
  <tr> <td>데이터 정리와 필터링</td> <td>2h</td> <td>1. 정렬과 필터<br/>2. 중복 데이터 제거</td> </tr>
  <tr> <td>실무 보고서 실습</td> <td>3h</td> <td>1. 주간 업무 보고서 양식 작성<br/>2. 완성 파일 저장 및 공유 방법</td> </tr>
</table>
```

</details>

<!-- skill:generate
- When a cell contains a small grid of its own (its own columns, sometimes its own header row), do not write a <table> inside a <td>. Instead add the inner grid's rows and columns to the outer table and give the neighbouring cells rowspan/colspan across them.
- Keep each inner label on the same row as its value; never list all labels and then all values, and never flatten the inner grid into <br/>-separated text.
-->

<!-- skill:check
- FAIL (MUST) if a <table> element appears inside a table cell.
- FAIL (MUST) if a grid printed inside a cell is flattened into one cell's text, or its labels are separated from their values.
- FAIL (MUST) if a cell beside a subdivided region carries a rowspan or colspan that does not match the region it covers on the page.
-->

## Related

- [[Record Groups and Multi-Line Cells]] — a cell holding several lines of text, not a grid
- [[Multi-Row Header Tiers]] — the leaf-track check that a subdivided grid still passes
- [[Repeated Identical Values]] — the same "printed once, spans several rows" test
