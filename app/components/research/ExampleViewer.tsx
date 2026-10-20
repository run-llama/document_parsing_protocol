"use client";
import { useRef, useState } from "react";

type Run = { text: string; styles: string[] };
type Cell = { runs?: Run[]; text: string; header: boolean; colSpan: number; rowSpan: number };
type Table = { label: string; rows: Cell[][] };
export type Snippet = { language: string; text: string };
type SourceImage = { src: string; sha256: string; bytes: number };
export type Output = { tables: Table[]; snippets: Snippet[]; rendered?: string };
export type Example = Output & { sourceImages?: SourceImage[]; id: string; name: string; kind: "sample" | "counter"; constructed: boolean; paragraphs: string[]; bad?: Output | null };
export type Bundle = { retrievedAt?: string; examples: Example[]; worked: (Snippet & { title: string })[] };

export const exampleName = (name: string) => name.replace(/^(?:Counter-sample|Sample)(?: \(constructed\))?\s*—\s*/i, "");
// Half the guide's examples are named after their source file ("wat", "3tables2"). Those get a title
// from the first sentence of their scenario, with the file name kept as a small tag.
const isStub = (name: string) => !/\s/.test(name.trim()) || name.trim().length < 8;
export function exampleTitle(example: Example): { title: string; file: string | null; rest: string } {
  const name = exampleName(example.name);
  const scenario = example.paragraphs[0] ?? "";
  if (!isStub(name) || !scenario) return { title: name, file: null, rest: scenario };
  const sentence = scenario.split(/(?<=[.;:!?])\s+/)[0];
  // A long first sentence is cut at its first dash or comma clause instead, and the full scenario stays below.
  const clause = sentence.length > 80 ? sentence.split(/\s+[—–]\s+|,\s+/)[0] : sentence;
  if (clause.length > 80) return { title: clause.slice(0, 76).replace(/\s+\S*$/, "") + "…", file: name, rest: scenario };
  if (clause !== sentence) return { title: clause, file: name, rest: scenario };
  return { title: sentence.replace(/[.;:]$/, ""), file: name, rest: scenario.slice(sentence.length).trim() };
}
const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function encodeText(cell: Cell) {
  const tags: Record<string, string> = { bold: "strong", italic: "em", strike: "s", underline: "u", sub: "sub", sup: "sup" };
  return cell.runs ? cell.runs.map(run => run.styles.reduce((text, style) => tags[style] ? `<${tags[style]}>${text}</${tags[style]}>` : text, escape(run.text))).join("") : escape(cell.text);
}
function encode(table: Table) {
  return `<table>\n${table.rows.map(row => `  <tr>${row.map(cell => {
    const tag = cell.header ? "th" : "td";
    return `<${tag}${cell.rowSpan > 1 ? ` rowspan="${cell.rowSpan}"` : ""}${cell.colSpan > 1 ? ` colspan="${cell.colSpan}"` : ""}>${encodeText(cell)}</${tag}>`;
  }).join("")}</tr>`).join("\n")}\n</table>`;
}
function Extract({ tables, spans, code }: { tables: Table[]; spans: boolean; code: boolean }) {
  return <div className="rs-example-extracts">{tables.map((table, i) => <figure key={i} className="rs-example-extract">
    <figcaption className="rs-sr-only">{table.label}</figcaption>
    {code ? <pre tabIndex={0} aria-label="Table encoding"><code>{encode(table)}</code></pre> : <div className="rs-example-table-scroll" tabIndex={0} role="region" aria-label={`${table.label}. Scroll horizontally for all columns.`} data-spans={spans}><table><tbody>{table.rows.map((row, r) => <tr key={r}>{row.map((cell, c) => {
      const Tag = cell.header ? "th" : "td";
      return <Tag key={c} rowSpan={cell.rowSpan} colSpan={cell.colSpan} data-spanning={cell.colSpan > 1 || cell.rowSpan > 1}><span>{cell.runs ? cell.runs.map((run, i) => <span key={i} className={run.styles.map(style => `rs-cell-${style}`).join(" ")}>{run.text}</span>) : cell.text || " "}</span>{spans && cell.header && (cell.colSpan > 1 || cell.rowSpan > 1) && <small>{[cell.rowSpan > 1 && `${cell.rowSpan} rows`, cell.colSpan > 1 && `${cell.colSpan} columns`].filter(Boolean).join(" · ")}</small>}</Tag>;
    })}</tr>)}</tbody></table></div>}
  </figure>)}</div>;
}
export function Snippets({ snippets }: { snippets: Snippet[] }) {
  return <div className="rs-example-snippets">{snippets.map((snippet, i) => <div key={i}><span className="rs-sr-only">{snippet.language} · source excerpt</span><pre tabIndex={0} data-wrap={snippet.language === "markdown"}><code>{snippet.text}</code></pre></div>)}</div>;
}

// The output the guide specifies: tables as tables, otherwise the guide's own rendering with its Markdown behind a toggle.
// `rendered` is produced at import time from an allowlist of tags; nothing else from the library reaches the page.
function OutputBody({ output, spans, code }: { output: Output; spans: boolean; code: boolean }) {
  if (code && output.snippets.length) return <Snippets snippets={output.snippets} />;
  if (output.rendered && !code) return <div className="rs-rendered" dangerouslySetInnerHTML={{ __html: output.rendered }} />;
  if (output.tables.length) return <Extract tables={output.tables} spans={spans} code={code} />;
  return <Snippets snippets={output.snippets} />;
}

// One example at a time: the source page beside the output it should produce.
export default function ExampleViewer({ examples, title, kind }: { examples: Example[]; title: string; kind: "sample" | "counter" }) {
  const [index, setIndex] = useState(0);
  const [spans, setSpans] = useState(true);
  const [code, setCode] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [expandedView, setExpandedView] = useState<"source" | "output">("source");
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const total = examples.length;
  const current = examples[Math.min(index, total - 1)];
  const { title: label, file, rest: scenario } = exampleTitle(current);
  const sourceImages = current.sourceImages ?? [];
  const hasTables = current.tables.length > 0;
  const hasRendered = Boolean(current.rendered);
  const hasOutput = hasTables || hasRendered || current.snippets.length > 0;
  const hasSpans = current.tables.some(table => table.rows.some(row => row.some(cell => cell.header && (cell.colSpan > 1 || cell.rowSpan > 1))));
  const bad = current.bad ?? null;
  const hasBad = Boolean(bad && (bad.tables.length || bad.snippets.length || bad.rendered));
  const outputLabel = hasBad ? "Non-conforming vs. expected" : "Expected output";
  function go(next: number) { setIndex(next); setCode(false); setZoomed(false); }
  function expand(view: "source" | "output") { setExpandedView(view); dialog.current?.showModal(); }

  const source = <div className="rs-example-stage" data-view="source" data-zoom={zoomed}>
    {sourceImages.map((asset, i) => <figure className="rs-example-source" key={asset.src}>
      {failedImages.includes(asset.src) ? <p role="status">This image could not be loaded.</p> :
        // Local document images keep their native aspect ratio; dimensions vary.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset.src} alt={`${title}: ${label}${sourceImages.length > 1 ? `, image ${i + 1}` : ""}. Source document image.`} loading="lazy" onError={() => setFailedImages(previous => [...previous, asset.src])} />}
    </figure>)}
  </div>;
  const output = <div className="rs-example-stage rs-output-stage" data-view="annotation">
    {hasBad && <div className="rs-bad-output"><span className="rs-bad-label">Non-conforming output · what a parser must not do</span><OutputBody output={bad!} spans={spans} code={code} /><span className="rs-bad-label rs-good-label">Expected output</span></div>}
    <OutputBody output={current} spans={spans} code={code} />
  </div>;
  const outputTools = (hasTables || hasRendered) && <div className="rs-example-tools">
    {hasSpans && <button className="rs-span-toggle" aria-pressed={spans} onClick={() => setSpans(!spans)}>Highlight spans</button>}
    <button aria-pressed={code} onClick={() => setCode(!code)}>{hasTables ? (code ? "Rendered table" : "View HTML") : (code ? "Rendered" : "View source")}</button>
  </div>;

  return <div className="rs-viewer" data-kind={kind}>
    <div className="rs-viewer-head">
      <div>
        {kind === "counter" && <p className="rs-example-caution">Counter-example · a reading that looks right and is not</p>}
        {current.constructed && <p className="rs-example-caution">Constructed example</p>}
        <h3>{label}{file && <code className="rs-example-file" title="Source file in the guide">{file}</code>}</h3>
      </div>
      {total > 1 && <div className="rs-example-nav">
        <label><span className="rs-sr-only">Choose an example</span><select aria-label="Choose an example" value={index} onChange={event => go(Number(event.target.value))}>{examples.map((item, i) => <option key={i} value={i}>{String(i + 1).padStart(2, "0")} · {exampleTitle(item).title}</option>)}</select></label>
        <div><span className="rs-example-position">{index + 1} / {total}</span><button aria-label="Previous example" disabled={index === 0} onClick={() => go(index - 1)}>←</button><button aria-label="Next example" disabled={index === total - 1} onClick={() => go(index + 1)}>→</button></div>
      </div>}
    </div>
    {scenario && <p className="rs-example-scenario">{scenario}</p>}
    <div className="rs-viewer-pair" key={index} data-single={!sourceImages.length || !hasOutput}>
      <section aria-label="Source document">
        <header className="rs-output-heading"><h4>Source</h4>{sourceImages.length > 0 && <div className="rs-viewer-tools"><button aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? "Fit" : "Zoom"}</button><button aria-label="Expand source document" onClick={() => expand("source")}>Expand ↗</button></div>}</header>
        {sourceImages.length > 0 ? source : <p className="rs-output-missing">No source image is attached to this example.</p>}
      </section>
      <section aria-label={outputLabel}>
        <header className="rs-output-heading"><h4>{outputLabel}</h4>{hasOutput && <div className="rs-viewer-tools">{outputTools}<button aria-label="Expand output" onClick={() => expand("output")}>Expand ↗</button></div>}</header>
        {hasOutput ? output : <p className="rs-output-missing">No expected output is recorded for this example yet.</p>}
      </section>
    </div>
    {current.paragraphs.length > 1 && <details className="rs-example-details"><summary>Notes on this example <span>+</span></summary><div>{current.paragraphs.slice(1).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div></details>}
    <dialog ref={dialog} className="rs-example-dialog" aria-label={`${title}: ${expandedView === "source" ? "Source document" : outputLabel}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="rs-example-dialog-inner">
        <header><div><span className="rs-kicker">{title} · {expandedView === "source" ? "Source document" : outputLabel}</span><h3>{label}</h3></div><button aria-label="Close example" onClick={() => dialog.current?.close()}>Close ×</button></header>
        {expandedView === "source" ? source : <>{output}{outputTools}</>}
        <footer><span>{kind === "counter" ? "Counter-example" : "Example"} · {index + 1} / {total}</span></footer>
      </div>
    </dialog>
  </div>;
}
