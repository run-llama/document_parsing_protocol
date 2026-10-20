# DPP source document

- Document: IRS Form 1040, U.S. Individual Income Tax Return, 2020, page 1.
- Publisher: U.S. Department of the Treasury, Internal Revenue Service.
- Original: https://www.irs.gov/pub/irs-prior/f1040--2020.pdf
- Discovered through the credited digital-asset question example in the Option Groups convention.
- Public-domain U.S. federal government work. Downloaded September 17, 2026.
- This is a blank published form, not a completed taxpayer record.

The PDF is unchanged. The PNG is a Poppler rendering of page 1 with blank outer and bottom margins trimmed. It does not reconstruct or replace the source text. The site displays the image in grayscale with a CSS filter; the original PDF retains its published colors. Interactive SVG annotations are separate explanatory overlays.

Reproduce the image:

```sh
pdftoppm -f 1 -singlefile -scale-to 1800 -x 40 -y 30 -W 1320 -H 1330 -png public/documents/irs-form-1040-2020.pdf public/documents/irs-form-1040-2020-page-1
```

Region coordinates in `ResearchHero.tsx` refer to pixels in this 1320 x 1330 rendering. The hero explains document representation, not tax preparation.

## Apple FY2024 financial statements

- Document: FY2024 Q4 Consolidated Financial Statements, Apple Inc.
- Original publisher PDF: https://www.apple.com/newsroom/pdfs/fy2024-q4/FY24_Q4_Consolidated_Financial_Statements.pdf
- Retrieved September 17, 2026. The locally stored four-page PDF is unchanged.
- The interactive study reproduces PDF page 1: Condensed Consolidated Statements of Operations (Unaudited).
- The PNG preserves the whole page; no text is reconstructed, removed or replaced.
- SVG highlights are separate DPP explanations. The encoding excerpts are authored demonstrations of the conventions, not a parser run or annotations supplied by Apple. This source does not imply Apple’s endorsement of DPP.

Reproduce the image:

```sh
pdftoppm -f 1 -l 1 -singlefile -scale-to 1800 -png public/documents/apple-fy2024-q4-financial-statements.pdf public/documents/apple-fy2024-q4-page-1
```

Region coordinates in `app/data/document-study.ts` use the original PDF page dimensions (612 × 792 points). Eight cases were selected from what is actually printed; the synthetic specimen’s strikeouts and page-continuation markers are not carried over.
