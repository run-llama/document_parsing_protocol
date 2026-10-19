export const studyDocument = {
  image: "/documents/apple-fy2024-q4-page-1.png",
  pdf: "/documents/apple-fy2024-q4-financial-statements.pdf#page=1",
  source: "https://www.apple.com/newsroom/pdfs/fy2024-q4/FY24_Q4_Consolidated_Financial_Statements.pdf",
  label: "Apple · FY2024 · Page 1",
};

// Coordinates use the original PDF's 612 × 792 point page, without cropping.
export type StudyRegion = {
  id: string;
  title: string;
  question: string;
  rule: string;
  write: string;
  convention: string;
  boxes: { x: number; y: number; width: number; height: number }[];
};

export const studyRegions: StudyRegion[] = [
  {
    id: "caption", title: "The statement title",
    question: "A title above the table—or its first row?",
    rule: "The statement title sits above the table, outside its rules and fills. Keep it once as caption text; do not manufacture a spanning table row for it.",
    write: "<p>CONDENSED CONSOLIDATED STATEMENTS OF OPERATIONS (Unaudited)</p>",
    convention: "tables-7-titles-and-edges-titles-banners-captions",
    boxes: [{ x: 112, y: 63, width: 388, height: 12 }],
  },
  {
    id: "tiers", title: "Grouped period headers",
    question: "Four independent dates—or two groups of two?",
    rule: "Keep the period groups above their date columns. “Three Months Ended” and “Twelve Months Ended” each span two columns. Flattening the headers would lose the distinction between quarterly and annual figures.",
    write: '<tr>\n  <th rowspan="2"></th>\n  <th colspan="2">Three Months Ended</th>\n  <th colspan="2">Twelve Months Ended</th>\n</tr>',
    convention: "tables-3-headers-multi-row-header-tiers",
    boxes: [{ x: 300, y: 96, width: 263, height: 40 }],
  },
  {
    id: "wrap", title: "A date on two lines",
    question: "Two header tiers—or one wrapped date?",
    rule: "“September 28,” and “2024” label one column. Join the line break into a space in a single header cell. A new printed line does not automatically create a new tier.",
    write: "<th>September 28, 2024</th>",
    convention: "tables-3-headers-header-wrap-vs-real-tier",
    boxes: [{ x: 304, y: 112, width: 61, height: 23 }],
  },
  {
    id: "currency", title: "Detached dollar signs",
    question: "A separate currency column—or part of the value?",
    rule: "The dollar sign is set apart for alignment, but belongs to 69,958. Keep them in one cell. Do not add dollar signs to other rows where the page does not print them.",
    write: "<td>$ 69,958</td>",
    convention: "tables-4-columns-gutter-columns",
    boxes: [{ x: 301, y: 149, width: 64, height: 13 }],
  },
  {
    id: "repeat", title: "Two identical values",
    question: "One shared value—or two separate cells?",
    rule: "Services cost 6,485 in both quarterly columns. Preserve both cells: they refer to different reporting periods. Identical text is not evidence of a merged cell.",
    write: '<tr>\n  <td data-level="1">Services</td>\n  <td>6,485</td><td>6,485</td>\n  <td>25,119</td><td>24,855</td>\n</tr>',
    convention: "tables-5-rows-and-cells-repeated-identical-values",
    boxes: [{ x: 302, y: 221, width: 63, height: 13 }, { x: 368, y: 221, width: 63, height: 13 }],
  },
  {
    id: "total", title: "A subtotal row",
    question: "A new heading—or a row in the same table?",
    rule: "“Total cost of sales” is a subtotal within the table. Use a header cell for its label and ordinary data cells for its values. Preserve the label’s printed indentation; do not add bold formatting that is absent from the page.",
    write: '<tr>\n  <th data-level="2">Total cost of sales</th>\n  <td>51,051</td><td>49,071</td>\n  <td>210,352</td><td>214,137</td>\n</tr>',
    convention: "tables-5-rows-and-cells-total-and-subtotal-rows",
    boxes: [{ x: 67, y: 235, width: 496, height: 13 }],
  },
  {
    id: "indent", title: "Indented row labels",
    question: "Just spacing—or a relationship to preserve?",
    rule: "“Operating expenses:” begins at the left edge of the stub. The expense labels beneath it are indented. Record the absolute indentation levels: 0 at the left edge, 1 for labels such as Products, and 2 for these expense labels. Do not reset the level at each section.",
    write: '<td data-level="0">Operating expenses:</td>\n<td data-level="2">Research and development</td>\n<td data-level="2">Selling, general and administrative</td>',
    convention: "tables-5-rows-and-cells-row-label-hierarchy",
    boxes: [{ x: 50, y: 277, width: 160, height: 43 }],
  },
  {
    id: "parentheses", title: "A number in parentheses",
    question: "Keep “(565)”—or rewrite it as “−565”?",
    rule: "Transcribe (565) exactly as printed. The parsing representation preserves the source; converting accounting notation to a signed number belongs in a later processing step.",
    write: "<td>(565)</td>",
    convention: "tables-6-cell-values-accounting-number-formats",
    boxes: [{ x: 535, y: 363, width: 28, height: 13 }],
  },
];
