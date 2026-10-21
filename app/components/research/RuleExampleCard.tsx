"use client";
import { useRef, useState } from "react";
import type { Output, RuleExample } from "../../_site/rfc-parse";

// Example names are often source-file stubs ("wat", "3tables2"). Those get a title from the first
// sentence of their description, with the stub kept as a small tag.
const plain = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const isStub = (name: string) => !name || !/\s/.test(name.trim()) || name.trim().length < 8;
// Drop the first `count` visible characters of an HTML fragment, keeping its tags balanced enough to render.
function dropText(html: string, count: number) {
  let seen = 0, i = 0;
  while (i < html.length && seen < count) {
    if (html[i] === "<") { i = html.indexOf(">", i) + 1 || html.length; continue; }
    if (html[i] === "&") { const end = html.indexOf(";", i); i = end > i && end - i < 8 ? end + 1 : i + 1; seen++; continue; }
    if (!/\s/.test(html[i]) || !/\s/.test(html[i - 1] ?? "")) seen++;
    i++;
  }
  const rest = html.slice(i).replace(/^\s+/, "");
  const opening = html.slice(0, i).match(/<(p|div)\b[^>]*>/)?.[0] ?? "";
  return opening && !rest.startsWith("<") ? opening + rest : rest;
}
function titleFor(example: RuleExample) {
  if (!isStub(example.name)) return { title: example.name, file: null, description: example.description };
  const text = plain(example.description);
  const sentence = text.split(/(?<=[.;:!?])\s+/)[0] ?? "";
  const clause = sentence.length > 90 ? sentence.split(/\s+[—–]\s+|,\s+|;\s+/)[0] : sentence;
  const title = (clause.length > 90 ? clause.slice(0, 86).replace(/\s+\S*$/, "") + "…" : clause).replace(/[.;:]$/, "");
  // When the title is the whole first sentence, don't print that sentence again underneath.
  const description = title && clause === sentence && text.length > sentence.length ? dropText(example.description, sentence.length) : example.description;
  return { title: title || example.name || "Example", file: example.name || null, description };
}

const KIND = {
  sample: { tag: "Sample", note: "The rule applies" },
  counter: { tag: "Counter-sample", note: "Looks like it applies and does not — or a rendering got it wrong" },
  either: { tag: "Equivalent forms", note: "Either rendering conforms" },
} as const;

// One output block: the rendered result and the exact Markdown that produces it.
// Short outputs show both, so the markup itself is visible; long ones show the result with a toggle.
function OutputBlock({ output, expand }: { output: Output; expand: (o: Output) => void }) {
  const short = output.source.length <= 700;
  const [source, setSource] = useState(false);
  const both = short && output.html && output.source;
  const label = output.bad ? "Non-conforming output" : "Expected output";
  return <section className="rs-rx-output" data-bad={output.bad}>
    <header>
      <h5>{label}{output.label && <small> · {output.label}</small>}</h5>
      <div className="rs-viewer-tools">
        {!both && output.html && output.source && <button aria-pressed={source} onClick={() => setSource(!source)}>{source ? "Rendered" : "Markdown"}</button>}
        <button aria-label={`Expand ${label.toLowerCase()}`} onClick={() => expand(output)}>Expand ↗</button>
      </div>
    </header>
    {output.bad && <p className="rs-rx-why-bad">What the rule rules out.</p>}
    {(both || !source) && output.html && <div className="rs-rendered" dangerouslySetInnerHTML={{ __html: output.html }} />}
    {(both || source || !output.html) && output.source && <figure className="rs-rx-source"><figcaption>Markdown</figcaption><pre tabIndex={0}><code dangerouslySetInnerHTML={{ __html: output.source }} /></pre></figure>}
  </section>;
}

export default function RuleExampleCard({ example, number, rule }: { example: RuleExample; number: number; rule: string }) {
  const [zoomed, setZoomed] = useState(false);
  const [expanded, setExpanded] = useState<"source" | Output>("source");
  const [failed, setFailed] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const { title, file, description } = titleFor(example);
  const kind = KIND[example.kind];
  function open(what: "source" | Output) { setExpanded(what); dialog.current?.showModal(); }

  const images = <div className="rs-example-stage" data-view="source" data-zoom={zoomed}>
    {example.images.map((src, i) => <figure className="rs-example-source" key={src}>
      {failed.includes(src) ? <p role="status">This image could not be loaded.</p> :
        // Source page images keep their native aspect ratio; dimensions vary.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`${rule} — ${title}${example.images.length > 1 ? `, image ${i + 1}` : ""}. Source page.`} loading="lazy" onClick={() => open("source")} onError={() => setFailed(previous => [...previous, src])} />}
    </figure>)}
  </div>;

  return <article className="rs-rx" data-kind={example.kind} id={`example-${number}`}>
    <header className="rs-card-head">
      <span className="rs-card-n">{String(number).padStart(2, "0")}</span>
      <div>
        <p className="rs-card-tags"><span className={`rs-tag rs-tag-${example.kind}`} title={kind.note}>{example.kind === "sample" ? "✅" : example.kind === "counter" ? "❌" : "⚖️"} {kind.tag}</span>{example.constructed && <span className="rs-tag" title="Made up to isolate the rule; not a real document">Constructed</span>}<span className="rs-card-kind-note">{kind.note}</span></p>
        <h4>{title}{file && file !== title && <code className="rs-example-file" title="Example name in the RFC">{file}</code>}</h4>
        {description && <div className="rs-rx-desc" dangerouslySetInnerHTML={{ __html: description }} />}
      </div>
    </header>
    <div className="rs-viewer-pair" data-single={!example.images.length}>
      {example.images.length > 0 && <section aria-label="Source page">
        <header className="rs-output-heading"><h5>Source page</h5><div className="rs-viewer-tools"><button aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? "Fit" : "Zoom"}</button><button aria-label="Expand source page" onClick={() => open("source")}>Expand ↗</button></div></header>
        {images}
        {example.credit && <p className="rs-rx-credit">{example.credit}</p>}
      </section>}
      <div className="rs-rx-outputs">{example.outputs.map((output, i) => <OutputBlock key={i} output={output} expand={open} />)}</div>
    </div>
    {example.notes && <div className="rs-rx-notes" dangerouslySetInnerHTML={{ __html: example.notes }} />}
    <dialog ref={dialog} className="rs-example-dialog" aria-label={`${rule}: ${title}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="rs-example-dialog-inner">
        <header><div><span className="rs-kicker">{rule} · {expanded === "source" ? "Source page" : expanded.bad ? "Non-conforming output" : "Expected output"}</span><h3>{title}</h3></div><button aria-label="Close" onClick={() => dialog.current?.close()}>Close ×</button></header>
        {expanded === "source" ? images : <>
          {expanded.html && <div className="rs-rendered" dangerouslySetInnerHTML={{ __html: expanded.html }} />}
          {expanded.source && <figure className="rs-rx-source"><figcaption>Markdown</figcaption><pre tabIndex={0}><code dangerouslySetInnerHTML={{ __html: expanded.source }} /></pre></figure>}
        </>}
      </div>
    </dialog>
  </article>;
}
