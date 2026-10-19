"use client";
import { useRef, useState } from "react";
import { studyDocument, studyRegions } from "../../data/document-study";

export default function DecisionLab() {
  const [index, setIndex] = useState(4);
  const [xray, setXray] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const enlargedPage = useRef<HTMLDivElement>(null);
  const inspector = useRef<HTMLDivElement>(null);
  const current = studyRegions[index];

  function selectRegion(next: number) {
    setIndex(next);
    requestAnimationFrame(() => {
      const panel = inspector.current;
      if (!panel) return;
      panel.scrollTop = 0;
      const bounds = panel.getBoundingClientRect();
      if (bounds.bottom > window.innerHeight - 16 || bounds.top < 64) {
        panel.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
    });
  }

  function enlarge() {
    dialog.current?.showModal();
    const scroller = enlargedPage.current;
    const page = scroller?.querySelector("svg");
    if (!scroller || !page) return;
    const scale = page.getBoundingClientRect().width / 612;
    const left = Math.min(...current.boxes.map(box => box.x));
    const right = Math.max(...current.boxes.map(box => box.x + box.width));
    const top = Math.min(...current.boxes.map(box => box.y));
    const bottom = Math.max(...current.boxes.map(box => box.y + box.height));
    scroller.scrollTo({ left: (left + right) / 2 * scale - scroller.clientWidth / 2, top: (top + bottom) / 2 * scale - scroller.clientHeight / 2, behavior: "instant" });
  }

  const left = Math.min(...current.boxes.map(box => box.x));
  const right = Math.max(...current.boxes.map(box => box.x + box.width));
  const top = Math.min(...current.boxes.map(box => box.y));
  const bottom = Math.max(...current.boxes.map(box => box.y + box.height));
  const cropWidth = Math.min(612, Math.max(180, right - left + 28));
  const cropX = Math.max(0, Math.min(612 - cropWidth, (left + right - cropWidth) / 2));
  const crop = `${cropX} ${Math.max(0, top - 16)} ${cropWidth} ${bottom - top + 32}`;

  function documentPage(interactive: boolean, detail = false) {
    return <svg viewBox={detail ? crop : "0 0 612 792"} className="rs-study-page" role={interactive ? "group" : "img"} aria-label="Apple's published FY2024 statement of operations, page 1">
      <image href={studyDocument.image} width="612" height="792" />
      {studyRegions.map((region, i) => <g key={region.id} className="rs-study-region" data-selected={i === index} data-visible={xray || i === index}
        role={interactive ? "button" : undefined} tabIndex={interactive ? 0 : undefined} aria-label={interactive ? `Inspect ${region.title.toLowerCase()}` : undefined} aria-pressed={interactive ? i === index : undefined}
        onClick={interactive ? () => selectRegion(i) : undefined}
        onKeyDown={interactive ? event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectRegion(i); } } : undefined}>
        <title>{region.title}</title>
        {region.boxes.map((box, b) => <rect key={b} {...box} />)}
      </g>)}
    </svg>;
  }

  return <div className="rs-decision-lab rs-source-study">
    <div className="rs-study-sidebar">
      <div ref={inspector} className="rs-study-inspector">
        <div className="rs-lab-index">
          <div className="rs-instrument-label">SELECT A REGION <span>{studyRegions.length}</span></div>
          <div className="rs-region-list" role="group" aria-label="Document regions">
            {studyRegions.map((region, i) => <button key={region.id} aria-pressed={i === index} onClick={() => selectRegion(i)}>
              <span className="rs-region-no">{String(i + 1).padStart(2, "0")}</span><span>{region.title}</span><i />
            </button>)}
          </div>
        </div>
        <div className="rs-study-compact-nav">
          <label className="rs-sr-only" htmlFor="study-region">Select a document region</label>
          <select id="study-region" value={index} onChange={event => selectRegion(Number(event.target.value))}>
            {studyRegions.map((region, i) => <option value={i} key={region.id}>{String(i + 1).padStart(2, "0")} · {region.title}</option>)}
          </select>
          <button aria-label="Previous document region" disabled={index === 0} onClick={() => selectRegion(index - 1)}>←</button>
          <button aria-label="Next document region" disabled={index === studyRegions.length - 1} onClick={() => selectRegion(index + 1)}>→</button>
        </div>
        <div className="rs-study-mobile-detail">
          <button onClick={enlarge} aria-label="Enlarge selected document detail">{documentPage(false, true)}<span>Selected detail <span aria-hidden="true">↗</span></span></button>
        </div>
        <div className="rs-decision-detail" aria-live="polite">
          <div className="rs-decision-text" key={current.id}><span className="rs-kicker">{String(index + 1).padStart(2, "0")} / {String(studyRegions.length).padStart(2, "0")} · How DPP handles it</span><h3>{current.question}</h3><p>{current.rule}</p><a className="rs-study-convention" href={`/research#convention=${current.convention}`}>Read the convention ↗</a></div>
          <div className="rs-code-sample"><span className="rs-kicker">DPP encoding · illustrative excerpt</span><pre tabIndex={0}>{current.write}</pre></div>
        </div>
      </div>
    </div>
    <div className="rs-specimen-stage">
      <div className="rs-instrument-label"><span>{studyDocument.label}</span><button className="rs-layer-toggle" aria-pressed={xray} onClick={() => setXray(!xray)}><span />All regions</button></div>
      <div className="rs-study-controls"><a href={studyDocument.pdf} target="_blank" rel="noreferrer">Original PDF ↗</a><button onClick={enlarge}>Enlarge page ↗</button></div>
      <div className="rs-specimen">{documentPage(true)}</div>
    </div>
    <dialog ref={dialog} className="rs-study-dialog" aria-labelledby="rs-study-dialog-title">
      <div className="rs-study-dialog-head"><h3 id="rs-study-dialog-title">Apple · Statement of operations</h3><button onClick={() => dialog.current?.close()} aria-label="Close enlarged document">Close ×</button></div>
      <p>{current.question}</p>
      <div ref={enlargedPage} className="rs-study-dialog-scroll" tabIndex={0} role="region" aria-label="Enlarged document. Scroll to inspect the full page.">{documentPage(false)}</div>
      <a href={studyDocument.pdf} target="_blank" rel="noreferrer">Open the original PDF ↗</a>
    </dialog>
  </div>;
}
