export type Cell =
  | string
  | {
      t: string;
      hl?: boolean;
      th?: boolean;
      span?: number;
      band?: boolean;
      tier?: boolean;
      strike?: string;
      indent?: boolean;
      right?: boolean;
      muted?: boolean;
    };

export type Block =
  | { kind: "table"; title?: string; boxed?: boolean; rows: Cell[][]; noHead?: boolean }
  | { kind: "prose"; lines: string[]; watermark?: string; banner?: string }
  | { kind: "kv"; lines: string[]; boxed?: boolean }
  | {
      kind: "bars";
      bars: { l: string; h: number; v?: string; hl?: boolean }[];
      ref?: { at: number; label: string };
    };

export type Side = {
  title: string;
  verdict: string;
  note: string;
  blocks: Block[];
  badge?: "rule" | "either" | "open";
};

export type Pair = {
  id: string;
  area: "Tables" | "Charts" | "Forms" | "Text" | "Page structure";
  label: string;
  question: string;
  left: Side;
  right: Side;
  discriminator: string;
  sources: string[];
  /** Convention slugs this comparison illustrates; shown on those convention pages. */
  conventions: string[];
};

export const areas: Pair["area"][] = ["Tables", "Charts", "Forms", "Text", "Page structure"];

export const pairs: Pair[] = [
  {
    id: "continuation",
    area: "Tables",
    label: "Side-by-side blocks",
    question: "Two blocks, same header, sitting next to each other. One table or two?",
    left: {
      title: "Column continuation",
      verdict: "One table per printed block, headers copied.",
      note: "The key runs onward, AL to MT. Zipping row i of each block pairs AL with MT and asserts a relationship the page never made.",
      blocks: [
        { kind: "table", rows: [["State", "Rate"], ["AL", "1.10"], ["AK", "1.04"], [{ t: "AR", hl: true }, "0.98"]] },
        { kind: "table", rows: [["State", "Rate"], [{ t: "MT", hl: true }, "0.95"], ["NE", "1.01"], ["NV", "1.12"]] },
      ],
    },
    right: {
      title: "Independent mini tables",
      verdict: "Separate tables. Ignore row alignment entirely.",
      note: "Each box declares its own title and schema. Boxes are top-aligned for looks, so rows land at the same height by accident.",
      blocks: [
        { kind: "table", title: "Mastercard cards", boxed: true, rows: [["Period", "Mil."], ["2026Q1", "3,408"], ["2025Q4", "3,377"]] },
        { kind: "table", title: "Maestro cards", boxed: true, rows: [["Period", "Mil."], ["2026Q1", "412"], ["2025Q4", "418"]] },
      ],
    },
    discriminator: "Own title and own schema means its own table. A continuing key means one series.",
    sources: ["Column Continuation", "Side-by-Side Mini Tables"],
    conventions: ["tables-2-boundaries-column-continuation", "tables-2-boundaries-side-by-side-mini-tables"],
  },
  {
    id: "slicing",
    area: "Tables",
    label: "Stacked blocks",
    question: "The same row labels repeat under a second block of columns. Re-widen it, or keep the blocks?",
    left: {
      title: "Horizontal slicing",
      verdict: "One table per printed block. Never re-widen.",
      note: "A table too wide for the page, printed as column blocks with the stub repeated. The repeated key makes the join look obvious, and it is still not yours to make.",
      blocks: [
        { kind: "table", rows: [["State", "Jan", "Feb"], [{ t: "AL", hl: true }, "1.1", "1.2"], [{ t: "AK", hl: true }, "0.9", "1.0"]] },
        { kind: "table", rows: [["State", "Mar", "Apr"], [{ t: "AL", hl: true }, "1.2", "1.3"], [{ t: "AK", hl: true }, "1.0", "1.1"]] },
      ],
    },
    right: {
      title: "A genuinely wide table",
      verdict: "One table, the super-headers spanning their columns.",
      note: "Different super-headers over the same rows are not a continuation. They are different columns describing one record.",
      blocks: [
        {
          kind: "table",
          rows: [
            [{ t: "", th: true }, { t: "Non-Tobacco", tier: true, span: 2, hl: true }, { t: "Tobacco", tier: true, span: 2, hl: true }],
            ["Age", "M", "F", "M", "F"],
            ["35", "1.02", "0.98", "1.61", "1.44"],
            ["45", "1.31", "1.20", "2.08", "1.83"],
          ],
        },
      ],
    },
    discriminator: "Blocks that share rows and differ in columns are slices. Blocks with different super-headers over the same rows are one wide table.",
    sources: ["Horizontal Slicing", "Column Continuation"],
    conventions: ["tables-2-boundaries-horizontal-slicing", "tables-2-boundaries-column-continuation"],
  },
  {
    id: "wrap",
    area: "Tables",
    label: "Header wrap vs tier",
    question: "A header label on two lines. One wrapped label, or a parent tier over leaves?",
    left: {
      title: "Wrapped label",
      verdict: "Join with a space into one header cell.",
      note: "Capital in Excess of Par Value is one heading broken to fit. No rule beneath it, and it sits over exactly one column.",
      blocks: [
        { kind: "table", rows: [[{ t: "Capital in Excess\nof Par Value", hl: true }, "Retained\nEarnings"], ["12,404", "98,112"], ["12,001", "91,730"]] },
      ],
    },
    right: {
      title: "Real tier",
      verdict: "Keep the tier with its exact colspan.",
      note: "Common Stock has a rule beneath it and spans two self-standing leaves, Shares and Amount.",
      blocks: [
        { kind: "table", rows: [[{ t: "Common Stock", tier: true, span: 2, hl: true }], ["Shares", "Amount"], ["15,943", "$16"], ["15,908", "$16"]] },
      ],
    },
    discriminator: "The border test: a rule beneath, standing over two or more self-standing leaves, is a tier. A wrap inside a word joins with nothing.",
    sources: ["Header Wrap vs Real Tier", "Multi-Row Header Tiers"],
    conventions: ["tables-3-headers-header-wrap-vs-real-tier", "tables-3-headers-multi-row-header-tiers"],
  },
  {
    id: "band",
    area: "Tables",
    label: "Band or boundary",
    question: "A bold line inside a grid. Divider row, or the start of a new table?",
    left: {
      title: "Band inside the grid",
      verdict: "One table. The band is a full-width row.",
      note: "As of December 2024 sits inside the grid and the column headers are not repeated under it. Splitting here can cost most of the page.",
      blocks: [
        {
          kind: "table",
          rows: [
            ["Product", "Premium"],
            [{ t: "As of December 2024", band: true, span: 2, hl: true }],
            ["Term Life", "1,204"],
            [{ t: "As of December 2023", band: true, span: 2, hl: true }],
            ["Term Life", "1,150"],
          ],
        },
      ],
    },
    right: {
      title: "Repeated header",
      verdict: "Close the table, start a new one at the repeat.",
      note: "State | Rate printed again after data rows. Within one page, header repetition is the single boundary signal.",
      blocks: [
        { kind: "table", rows: [["State", "Rate"], ["AL", "1.10"], [{ t: "State", th: true, hl: true }, { t: "Rate", th: true, hl: true }], ["MT", "0.95"]] },
      ],
    },
    discriminator: "Read the column headers. Re-declared means a new table. Not re-declared means the table never closed.",
    sources: ["Bands Inside the Grid", "Repeated Headers and Title Bands"],
    conventions: ["tables-2-boundaries-bands-inside-the-grid", "tables-2-boundaries-repeated-headers-and-title-bands"],
  },
  {
    id: "cohort",
    area: "Tables",
    label: "Cohort bands",
    question: "Same-shaped grids stacked under bands. One table, or one per band?",
    left: {
      title: "Shared row spine",
      verdict: "One table. Bands become spanning rows.",
      note: "One header, one continuous label column. Revenues and Operating margin band the same segments, and a numbered tier proves every column describes one row.",
      blocks: [
        {
          kind: "table",
          rows: [
            ["", "2024", "2023"],
            [{ t: "Revenues", band: true, span: 3, hl: true }],
            ["Optum Health", "105,358", "95,319"],
            ["Optum Rx", "133,231", "116,087"],
            [{ t: "Operating margin", band: true, span: 3, hl: true }],
            ["Optum Health", "6.2%", "7.0%"],
          ],
        },
      ],
    },
    right: {
      title: "No column headers anywhere",
      verdict: "One table per cohort. The band is its header row.",
      note: "FEMALE and MALE are the only thing naming what the rows below them are. Fuse them and nothing says which block is which.",
      blocks: [
        { kind: "table", noHead: true, rows: [[{ t: "FEMALE", band: true, span: 3, hl: true }], ["25", "1.02", "1.10"], ["35", "1.08", "1.15"]] },
        { kind: "table", noHead: true, rows: [[{ t: "MALE", band: true, span: 3, hl: true }], ["25", "1.08", "1.15"], ["35", "1.14", "1.22"]] },
      ],
    },
    discriminator: "Check the row spine first, then the column headers. The bands themselves look identical in both cases.",
    sources: ["Group and Cohort Bands"],
    conventions: ["tables-2-boundaries-group-and-cohort-bands"],
  },
  {
    id: "rowspan",
    area: "Tables",
    label: "Rowspan or not",
    question: "One value against several rows. A merged cell, or repeated cells?",
    left: {
      title: "Repeated identical values",
      verdict: "Printed k times is k cells. No rowspan.",
      note: "523 printed on nine separate lines is nine cells. A rowspan claims the page merged them, and anyone counting records downstream gets one where the page has nine.",
      blocks: [
        { kind: "table", rows: [["Zip", "Zone"], ["85716", { t: "523", hl: true }], ["85717", { t: "523", hl: true }], ["85718", { t: "523", hl: true }]] },
      ],
    },
    right: {
      title: "Record group",
      verdict: "Rowspan on the genuinely shared cell.",
      note: "Plan A is printed once and covers both fee rows, so rowspan=2 is a true statement about the page. One tr per printed line.",
      blocks: [
        { kind: "table", rows: [["Plan", "Fee", "Rate"], [{ t: "A", hl: true, span: 1 }, "admin", "0.25%"], [{ t: "", muted: true }, "fund", "0.10%"], ["B", "admin", "0.30%"]] },
      ],
    },
    discriminator: "Do not eyeball it. One printed occurrence spanning rows is a rowspan. Distinct vertical positions are separate cells.",
    sources: ["Repeated Identical Values", "Record Groups and Multi-Line Cells"],
    conventions: ["tables-5-rows-and-cells-repeated-identical-values", "tables-5-rows-and-cells-record-groups-and-multi-line-cells"],
  },
  {
    id: "units",
    area: "Tables",
    label: "Units lines",
    question: "A line of ($000) and (%) tokens. Header, body row, or a split?",
    left: {
      title: "Units row under the header",
      verdict: "A second header row, or folded into the labels. Never a body row.",
      note: "Both encodings are accepted. If it becomes the first body row, a reader gets ($000) as a premium value.",
      badge: "either",
      blocks: [
        { kind: "table", rows: [["Premium", "Losses", "Ratio"], [{ t: "($000)", th: true, hl: true }, { t: "($000)", th: true, hl: true }, { t: "(%)", th: true, hl: true }], ["1,204", "887", "73.6"]] },
      ],
    },
    right: {
      title: "Units line in the middle of the body",
      verdict: "A band row, every cell a th. Never a split.",
      note: "S$ printed in every column between two blocks of body. The table did not close, and the line reports nothing.",
      blocks: [
        { kind: "table", rows: [["", "2024", "2023"], ["Net profit", "10,286", "9,384"], [{ t: "S$", th: true, hl: true }, { t: "S$", th: true, hl: true }, { t: "S$", th: true, hl: true }], ["Per share", "3.62", "3.29"]] },
      ],
    },
    discriminator: "A units line describes how to read the column beneath it. It is header content wherever it sits.",
    sources: ["Units Row"],
    conventions: ["tables-3-headers-units-row"],
  },
  {
    id: "dash",
    area: "Tables",
    label: "Dash or blank",
    question: "A cell with no number in it. Is there a value, or nothing?",
    left: {
      title: "An em-dash alone",
      verdict: "A value. Record the dash.",
      note: "Preserve the printed dash verbatim. It is visible content, unlike an empty cell; do not infer that it means zero.",
      blocks: [{ kind: "table", rows: [["", "5-yr", "15-yr"], ["Timber", "2.66", "3.82"], ["Real estate", "-0.87", { t: "—", hl: true }]] }],
    },
    right: {
      title: "A genuinely blank cell",
      verdict: "Empty. Never supply a dash.",
      note: "The page prints nothing, however many neighbours print a dash. The distinction only survives if you record it both ways.",
      blocks: [{ kind: "table", rows: [["", "2005", "2004"], ["Ertragssteuern", "-50.009", "-50.009"], ["Unrealisierte", { t: "", hl: true }, { t: "", hl: true }]] }],
    },
    discriminator: "A non-value that is printed is a value. A cell that prints nothing stays empty. Both directions matter.",
    sources: ["Marks and Symbols in Cells", "Cell Text Fidelity"],
    conventions: ["tables-6-cell-values-marks-and-symbols-in-cells", "tables-6-cell-values-cell-text-fidelity"],
  },
  {
    id: "frame",
    area: "Tables",
    label: "Inside the frame",
    question: "Two lines printed inside the ruled border, neither of them data. Rows or not?",
    left: {
      title: "A title band sharing the border",
      verdict: "A header row inside the table, full width.",
      note: "APPLICABILITY CHART runs to the table's own edges. A single full-width th, never the title padded with empty cells beside it.",
      blocks: [{ kind: "table", rows: [[{ t: "APPLICABILITY CHART", band: true, span: 3, hl: true }], ["State", "Version", "Effective"], ["Alabama", "*", "*"]] }],
    },
    right: {
      title: "A footnote inside the frame",
      verdict: "Outside the table, as caption text after it.",
      note: "The line names no columns and carries no values. Calling it a row adds a record the table does not have. A deliberate carve-out from the frame test.",
      blocks: [{ kind: "table", rows: [["Rate", "Factor"], ["A", "1.10¹"], ["B", "1.25"], [{ t: "¹ Excludes riders", band: true, span: 2, hl: true, muted: true }]] }],
    },
    discriminator: "The frame decides titles and banners. It does not decide footnotes.",
    sources: ["Titles Banners Captions", "Footnotes Inside the Frame"],
    conventions: ["tables-7-titles-and-edges-titles-banners-captions", "tables-7-titles-and-edges-footnotes-inside-the-frame"],
  },
  {
    id: "headeronly",
    area: "Tables",
    label: "Headers with no body",
    question: "A header row and nothing under it. Is there a table here?",
    left: {
      title: "A stray header line",
      verdict: "Not a table. Find the body or annotate it as text.",
      note: "A header-only table plus loose numbers as prose is the degenerate output. Merge only when the body is adjacent, the columns line up, and nothing sits between.",
      blocks: [
        { kind: "table", rows: [[{ t: "Duration", hl: true }, { t: "Factor", hl: true }]] },
        { kind: "prose", lines: ["Rates apply from inception.", "1   0.94", "2   0.91"] },
      ],
    },
    right: {
      title: "A blank pre-printed grid",
      verdict: "A table. Keep every printed empty row.",
      note: "Someone parsing a blank form is asking what it asks for. The structure is the content, and trimming forty empty rows is a judgement nobody can undo.",
      blocks: [{ kind: "table", rows: [["Name", "Date", "Amount"], [{ t: "", hl: true }, { t: "", hl: true }, { t: "", hl: true }], [{ t: "", hl: true }, { t: "", hl: true }, { t: "", hl: true }]] }],
    },
    discriminator: "Printed empty rows are a body. A header standing alone is not.",
    sources: ["Header-Only Tables", "Empty Pre-Printed Grids"],
    conventions: ["tables-1-what-counts-as-a-table-header-only-tables", "tables-1-what-counts-as-a-table-empty-pre-printed-grids"],
  },
  {
    id: "kv",
    area: "Forms",
    label: "Label and value stacks",
    question: "Labels with values beside them, lined up in two columns. Table or not?",
    left: {
      title: "Ungridded key-value fields",
      verdict: "A key-value list. Never invent a two-column table.",
      note: "Fillable fields and checkbox rows line up because of typesetting, not structure. Inventing a table creates a record that exists nowhere on the page.",
      blocks: [{ kind: "kv", lines: ["Insurer: [blank]", "NAIC #: 12345", "[x] Renewal   [ ] New business"] }],
    },
    right: {
      title: "A ruled label-value grid",
      verdict: "A table. Missing it is a defect.",
      note: "The Column | Description box explaining what (1) to (11) mean genuinely maps one thing to another, and a mapping is a relation.",
      blocks: [{ kind: "table", boxed: true, rows: [["Column", "Description"], ["(1)", "Earned premium"], ["(2)", "Incurred claims"]] }],
    },
    discriminator: "Do shared rows and columns encode a relation, or are these independent form fields? Borders support the decision but are not required for a table.",
    sources: ["Forms and Key-Value Regions", "The Key-Value List"],
    conventions: ["forms-forms-and-key-value-regions", "forms-1-the-output-format-the-key-value-list"],
  },
  {
    id: "checkbox",
    area: "Forms",
    label: "Marks beside items",
    question: "A short line or box before each item. A checkbox, or a blank to write in?",
    left: {
      title: "A blank line used as a check mark",
      verdict: "[ ] or [x]. It is a checkbox by function.",
      note: "Every item in the filing checklist is led by ___ where a box would be. The line asks for a tick, not a written value.",
      blocks: [{ kind: "kv", lines: ["⟦___⟧ Transmittal information", "⟦___⟧ Certification (EC-1)", "⟦___⟧ Rate filing checklist"] }],
    },
    right: {
      title: "A blank that takes a value",
      verdict: "[blank]. One per answer field, however many ruled lines.",
      note: "Four ruled lines under one item number are one field. Separate blanks only for separately labelled or independently answerable fields.",
      blocks: [{ kind: "kv", lines: ["24. Describe the incident:", "⟦______________________⟧", "⟦______________________⟧"] }],
    },
    discriminator: "Ask what the mark is for. A control that gets ticked is a checkbox. A space that gets written in is a blank.",
    sources: ["Checklists", "Fill-Ins"],
    conventions: ["forms-2-fields-checklists", "forms-2-fields-fill-ins"],
  },
  {
    id: "printed-vs-estimated",
    area: "Charts",
    label: "Printed or estimated",
    question: "Two bars in one chart. One prints its number, one does not. Same treatment?",
    left: {
      title: "A printed value",
      verdict: "Copy it character for character. No tolerance.",
      note: "Doctors stays 5 even though the bar top measures a touch lower. Printed beats geometry, and 25 (13.0%) stays whole.",
      blocks: [{ kind: "bars", bars: [{ l: "Nurses", h: 44, v: "22", hl: true }, { l: "Doctors", h: 10, v: "5", hl: true }, { l: "Cleaners", h: 94 }] }],
    },
    right: {
      title: "An estimated value",
      verdict: "Read the mark against its axis; write the estimate as a bare number.",
      note: "Cleaners prints no value, so read it against the 10-unit grid and write 47. Do not add an approximation marker or need_estimate tag to the Markdown; readability tolerance belongs to checking.",
      blocks: [{ kind: "bars", bars: [{ l: "Nurses", h: 44, v: "22" }, { l: "Doctors", h: 10, v: "5" }, { l: "Cleaners", h: 94, hl: true }] }],
    },
    discriminator: "Sweep for printed values first. A printed value you missed becomes a wrong estimate.",
    sources: ["Values and Tolerances"],
    conventions: ["charts-1-the-annotation-values-and-tolerances"],
  },
  {
    id: "reference-ink",
    area: "Charts",
    label: "Data or reference ink",
    question: "A highlighted average bar and a dashed average line. Which one gets a rule?",
    left: {
      title: "An average drawn as a bar",
      verdict: "An ordinary rule. Highlighting is styling.",
      note: "The red EU average bar is a data point like any other in the series. Its colour never enters the label.",
      blocks: [{ kind: "bars", bars: [{ l: "Italy", h: 70 }, { l: "EU average", h: 52, hl: true }, { l: "Germany", h: 30 }] }],
    },
    right: {
      title: "An average drawn as a line",
      verdict: "Reference ink. No rule.",
      note: "A labelled average, a trend line, a shaded band or an event callout is commentary. Writing rules for them is invented content.",
      blocks: [{ kind: "bars", bars: [{ l: "Italy", h: 70 }, { l: "France", h: 48 }, { l: "Germany", h: 30 }], ref: { at: 52, label: "10-yr avg" } }],
    },
    discriminator: "Does the mark draw a data point at an axis position? A bar does. A line across the canvas does not.",
    sources: ["Multiple Charts and Reference Ink", "Bars and Histograms"],
    conventions: ["charts-1-the-annotation-multiple-charts-and-reference-ink", "charts-2-chart-types-bars-and-histograms"],
  },
  {
    id: "hyphen",
    area: "Text",
    label: "Line-end hyphens",
    question: "A word broken at a line end with a hyphen. Join it, or keep the hyphen?",
    left: {
      title: "A typesetting hyphen",
      verdict: "Join the fragments and drop the hyphen.",
      note: "Co-lumbia is one word broken to justify the line. Government, prosecutorial and Hotel break the same way in the same opinion.",
      blocks: [{ kind: "prose", lines: ["…for the District of ⟦Co-⟧", "⟦lumbia⟧ Circuit concluded…"] }],
    },
    right: {
      title: "A lexical hyphen",
      verdict: "Keep it. The word carries the hyphen anyway.",
      note: "air- / conditioning breaks exactly at a hyphen it already has. Joining without it produces airconditioning.",
      blocks: [{ kind: "prose", lines: ["…and sales of ⟦air-⟧", "⟦conditioning⟧, industrial and…"] }],
    },
    discriminator: "A judgement per word. When you cannot tell, keep the visible hyphen and flag the word.",
    sources: ["Line-End Hyphenation"],
    conventions: ["text-1-inline-formatting-line-end-hyphenation"],
  },
  {
    id: "colour",
    area: "Text",
    label: "Colour in a cell",
    question: "Two coloured cells. In one the colour is the value, in the other it is not.",
    left: {
      title: "Fill with no text",
      verdict: "An empty mark tag carrying the colour name.",
      note: "A risk matrix square holds no text. Write the nearest HTML colour name, never the legend's meaning, and never leave the cell blank.",
      blocks: [{ kind: "table", rows: [["", "Low", "High"], ["Rare", { t: "", hl: true }, { t: "", hl: true }], ["Likely", { t: "", hl: true }, { t: "", hl: true }]] }],
    },
    right: {
      title: "Fill behind printed text",
      verdict: "The text is the value. The fill is decoration.",
      note: "Yellow cells with numbers in them, or a whole body rendered green as revision tracking. Transcribe the text and let the colour go.",
      blocks: [{ kind: "table", rows: [["", "[1]", "[2]"], ["(A) Short", { t: "34,614", hl: true }, { t: "0.13%", hl: true }], ["(B) Long", { t: "37,128", hl: true }, { t: "4.32%", hl: true }]] }],
    },
    discriminator: "Ask whether the cell has printed content. If the fill is its only content, the fill is the value.",
    sources: ["Color as the Value", "Text Colors"],
    conventions: ["tables-6-cell-values-color-as-the-value", "text-2-marks-on-the-page-text-colors"],
  },
  {
    id: "margin",
    area: "Text",
    label: "Text along the edge",
    question: "Words printed sideways or diagonally that are not body text. Where do they go?",
    left: {
      title: "A margin banner",
      verdict: "A separate furniture block. Not a watermark.",
      note: "US EPA ARCHIVE DOCUMENT runs down the left edge outside the content. It is a fact about the document that appears nowhere else.",
      blocks: [{ kind: "prose", banner: "US EPA ARCHIVE DOCUMENT", lines: ["Overview of Risk Ranking Symbols", "One way to rank environmental impacts is…"] }],
    },
    right: {
      title: "A watermark",
      verdict: "Recorded once, out of the flow, in a watermark tag.",
      note: "Redline Version crosses the body. Transcribed in place it splits a sentence; dropped it loses the most important fact on the page.",
      blocks: [{ kind: "prose", watermark: "DRAFT", lines: ["The parties agree that the term", "shall commence on the effective date", "and continue for twelve months."] }],
    },
    discriminator: "Does the text overlay the content? Across the body is a watermark. Outside it is furniture.",
    sources: ["Margin Banners", "Watermarks"],
    conventions: ["text-2-marks-on-the-page-margin-banners", "text-2-marks-on-the-page-watermarks"],
  },
  {
    id: "runin",
    area: "Page structure",
    label: "Bold at the start of a line",
    question: "A bold label opens a line. Heading, or part of the paragraph?",
    left: {
      title: "A run-in heading",
      verdict: "One paragraph, the label bold inline.",
      note: "Section 11.1.1 continues on the same line into its sentence. Promoting it creates a false outline entry.",
      blocks: [{ kind: "prose", lines: ["⟦Section 11.1.1⟧ The Department requires that", "business enterprises so certified by…"] }],
    },
    right: {
      title: "A standalone heading",
      verdict: "A heading, at its document-relative depth.",
      note: "Section 11.1 sits on its own line with body text under it. Same document, both shapes on one page.",
      blocks: [{ kind: "prose", lines: ["⟦Section 11.1 Certification⟧", "", "The Department requires that business", "enterprises so certified by…"] }],
    },
    discriminator: "Ask what the line does. A label followed by its sentence stays inline. A title that organises what follows is a heading.",
    sources: ["Run-In Headings", "Recognising Ambiguous Headings"],
    conventions: ["page-structure-run-in-headings", "page-structure-recognising-ambiguous-headings"],
  },
  {
    id: "caption",
    area: "Page structure",
    label: "Title above a table",
    question: "A prominent line above a table. Heading, caption, or a row inside it?",
    left: {
      title: "A caption",
      verdict: "Caption text, attached to the table, never a heading.",
      note: "Table 1: Milestones achieved names an object. A heading opens a section the page never printed, and it survives into every outline derived from the document.",
      blocks: [{ kind: "prose", lines: ["⟦Table 1: Milestones achieved since the⟧", "⟦prior results announcement⟧"] }, { kind: "table", rows: [["Milestone", "Date"], ["Phase 3 start", "Mar 2026"]] }],
    },
    right: {
      title: "A standalone section title",
      verdict: "A heading. It organises the block beneath it.",
      note: "Results highlights introduces the paragraphs and the table that follow. Weight and colour support the reading; none decides it alone.",
      blocks: [{ kind: "prose", lines: ["⟦Results highlights⟧", "", "Revenue grew 12% on the prior period,", "led by the diagnostics segment."] }],
    },
    discriminator: "A caption names an object. A heading opens a section. Never use font size alone.",
    sources: ["Recognising Ambiguous Headings", "Titles Banners Captions"],
    conventions: ["page-structure-recognising-ambiguous-headings", "tables-7-titles-and-edges-titles-banners-captions"],
  },
];
