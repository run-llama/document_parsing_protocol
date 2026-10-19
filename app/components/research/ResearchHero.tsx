"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Source-image coordinates (IRS Form 1040, 2020, page 1, margins trimmed). Provenance lives beside the asset.
const W = 1320;
const H = 1330;

type Output = { lines: string[] } | { table: { head: string[]; rows: number } };
type Option = { title: string; means: string; output: Output };

// Each option shows the output that reading would produce, using the form's own words.
const regions: { x: number; y: number; w: number; h: number; short: string; category: string; question: string; options: Option[]; preferred: number; evidence: string; consequence: string }[] = [
  {
    x: 40, y: 118, w: 1229, h: 80, short: "Grouped boxes", category: "GROUPED BOXES",
    question: "How should the filing-status options be represented?",
    options: [
      { title: "One group of five options", means: "Five answers to a single question.", output: { lines: ["Filing Status (check only one)", "  [ ] Single", "  [ ] Married filing jointly", "  [ ] Married filing separately (MFS)", "  [ ] Head of household (HOH)", "  [ ] Qualifying widow(er) (QW)"] } },
      { title: "Five independent fields", means: "Five checkboxes with nothing linking them.", output: { lines: ["Single: [ ]", "Married filing jointly: [ ]", "Married filing separately (MFS): [ ]", "Head of household (HOH): [ ]", "Qualifying widow(er) (QW): [ ]"] } },
    ], preferred: 0,
    evidence: "The shared label \u201cFiling Status\u201d and the instruction \u201cCheck only one box\u201d connect all five options. Keep that relationship, along with every unchecked state.",
    consequence: "Without the group, downstream systems cannot tell that these options answer the same question.",
  },
  {
    x: 40, y: 475, w: 1229, h: 40, short: "Empty boxes", category: "EMPTY BOXES",
    question: "Do two empty boxes mean the answer is \u201cNo\u201d?",
    options: [
      { title: "Record the answer as No", means: "Two empty boxes are read as a \u201cNo\u201d.", output: { lines: ["At any time during 2020, did you receive, sell, send, exchange, or otherwise acquire any financial interest in any virtual currency?", "Answer: No"] } },
      { title: "Keep both boxes unchecked", means: "Both boxes are transcribed as printed: unchecked.", output: { lines: ["At any time during 2020, did you receive, sell, send, exchange, or otherwise acquire any financial interest in any virtual currency?", "[ ] Yes   [ ] No"] } },
    ], preferred: 1,
    evidence: "The page prints Yes and No, and neither box is checked. Preserve two unchecked options. An unanswered question is not a negative answer.",
    consequence: "Inferring \u201cNo\u201d would introduce a claim the source never made.",
  },
  {
    x: 167, y: 610, w: 1103, h: 164, short: "Table in a form", category: "TABLE IN A FORM",
    question: "Keep a table inside the form, or flatten its contents?",
    options: [
      { title: "Preserve the table", means: "Column headers and four empty rows, as printed.", output: { table: { head: ["First name", "Last name", "SSN", "Relation\u00adship", "Child tax credit", "Other credit"], rows: 4 } } },
      { title: "Extract a list of labels", means: "The headings survive; the rows and empty cells do not.", output: { lines: ["Dependents: First name, Last name,", "Social security number, Relationship to you,", "Child tax credit, Credit for other dependents"] } },
    ], preferred: 0,
    evidence: "The Dependents section has column headers and four entry rows. Preserve the table within the surrounding form, including its empty cells and unchecked boxes.",
    consequence: "A flat list loses which cells belong to the same dependent.",
  },
  {
    x: 167, y: 801, w: 1103, h: 29, short: "Line numbers", category: "LINE NUMBERS",
    question: "Are \u201c2a\u201d and \u201c2b\u201d part of the data?",
    options: [
      { title: "Keep the labels only", means: "The printed line numbers are dropped.", output: { lines: ["Tax-exempt interest: ________", "Taxable interest: ________"] } },
      { title: "Keep identifiers and labels", means: "Each line keeps its printed number.", output: { lines: ["2a  Tax-exempt interest: ________", "2b  Taxable interest: ________"] } },
    ], preferred: 1,
    evidence: "2a identifies Tax-exempt interest; 2b identifies Taxable interest. Keep each printed identifier with its own label and blank value.",
    consequence: "Dropping identifiers removes the anchors used to reference these fields elsewhere.",
  },
  {
    x: 25, y: 912, w: 134, h: 342, short: "Margin note", category: "MARGIN NOTE",
    question: "Is the margin box content, or page furniture?",
    options: [
      { title: "Keep it as a note on line 12", means: "The margin text stays, as its own block after the line it explains.", output: { lines: ["12  Standard deduction or itemized deductions: ____", "", "Margin note: Standard Deduction for\u2014", "\u2022 Single or Married filing separately, $12,400", "\u2022 Married filing jointly or Qualifying widow(er), $24,800", "\u2022 Head of household, $18,650", "\u2022 If you checked any box under Standard Deduction, see instructions."] } },
      { title: "Drop it as page furniture", means: "Only the numbered line survives; the margin text is left out.", output: { lines: ["12  Standard deduction or itemized deductions: ____"] } },
    ], preferred: 0,
    evidence: "The box prints three deduction amounts and an instruction, beside the line they apply to. That is content, not decoration. Keep it as a separate block after line 12, and say it came from the margin.",
    consequence: "Dropping it loses the only place on the page where the standard deduction amounts appear.",
  },
];

const N = regions.length;
const STEPS = N + 2; // landing, one per decision, outro

// The camera frames the active region: a mild zoom, a vertical pan, never a crop of the region itself.
function camera(phase: number) {
  if (phase < 1 || phase > N) return "translate(0px, 0px) scale(1)";
  const r = regions[phase - 1];
  const s = Math.min(1.4, Math.max(1.04, (W - 40) / r.w));
  const halfW = W / s / 2;
  const halfH = H / s / 2;
  const cx = Math.min(Math.max(r.x + r.w / 2, halfW), W - halfW);
  const cy = Math.min(Math.max(r.y + r.h / 2, halfH), H - halfH);
  return `translate(${(W / 2 - cx * s).toFixed(1)}px, ${(H / 2 - cy * s).toFixed(1)}px) scale(${s.toFixed(3)})`;
}

// The spotlight cut-out and its outline share one transform so they move together.
function hole(phase: number) {
  if (phase < 1 || phase > N) return `translate(${W / 2}px, ${H / 2}px) scale(0.001, 0.001)`;
  const r = regions[phase - 1];
  const p = 10;
  return `translate(${r.x - p}px, ${r.y - p}px) scale(${r.w + p * 2}, ${r.h + p * 2})`;
}

// The output each reading produces. Not a proposed interchange schema; plain text keeps the difference readable.
function ParsedOutput({ output }: { output: Output }) {
  if ("table" in output) return <div className="rs-op-output" aria-hidden="true"><table><thead><tr>{output.table.head.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{Array.from({ length: output.table.rows }, (_, r) => <tr key={r}>{output.table.head.map(h => <td key={h} />)}</tr>)}</tbody></table></div>;
  return <div className="rs-op-output" aria-hidden="true">{output.lines.map((line, i) => <span key={i}>{line}</span>)}</div>;
}

export default function ResearchHero() {
  const [phase, setPhase] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const root = useRef<HTMLElement>(null);

  // Scroll owns the sequence: the spacer under the viewport centre decides the phase.
  useEffect(() => {
    const steps = Array.from(root.current?.querySelectorAll<HTMLElement>(".rs-op-step") ?? []);
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setPhase(Number(e.target.getAttribute("data-step")));
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
    steps.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = useCallback((step: number) => {
    const el = root.current?.querySelector<HTMLElement>(`.rs-op-step[data-step="${step}"]`);
    el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, []);

  const kind = phase === 0 ? "landing" : phase > N ? "outro" : "step";
  const active = kind === "step" ? regions[phase - 1] : null;
  const activeIndex = phase - 1;
  const answered = active ? answers[activeIndex] !== undefined : false;
  const answeredCount = Object.keys(answers).length;
  const matched = regions.filter((r, i) => answers[i] === r.preferred).length;

  return (
    <section className="rs-op" ref={root} aria-label="Opening sequence: five parsing choices on one page">
      <div className="rs-op-stage rs-width" data-kind={kind} data-phase={phase}>
        <div className="rs-op-title">
          <h1>Document<br />Parsing<br />Protocol <span className="rs-op-abbr">(DPP)</span></h1>
          <p className="rs-op-deck">A protocol for how to make truthful and AI‑friendly interpretation of documents</p>
          <button className="rs-op-begin" onClick={() => go(1)}>Five choices on one page <span aria-hidden="true">↓</span></button>
        </div>

        <nav className="rs-op-ladder" aria-label="Parsing choices">
          {regions.map((r, i) => (
            <button key={r.category} data-active={phase === i + 1} data-answered={answers[i] !== undefined} onClick={() => go(i + 1)} aria-current={phase === i + 1 ? "step" : undefined}>
              <span className="rs-op-ladder-n">0{i + 1}</span>
              <span className="rs-op-ladder-label">{r.short}</span>
            </button>
          ))}
          <span className="rs-op-ladder-track" aria-hidden="true"><i style={{ transform: `scaleY(${kind === "outro" ? 1 : Math.max(0, phase - 1) / (N - 1)})` }} /></span>
        </nav>

        <figure className="rs-op-figure">
          <div className="rs-op-figure-head"><span>{kind === "step" ? `0${phase} / 0${N} · ${active!.category}` : "ONE PAGE. FIVE PARSING CHOICES."}</span><span>IRS / 1040 / 2020</span></div>
          <svg className="rs-op-svg" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="IRS Form 1040, 2020, page 1. The highlighted region is the current parsing choice.">
            <defs>
              <mask id="rs-op-hole" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <rect width={W} height={H} fill="#fff" />
                <rect className="rs-op-cut" width="1" height="1" fill="#000" style={{ transform: hole(phase) }} />
              </mask>
              <clipPath id="rs-op-clip"><rect width={W} height={H} /></clipPath>
            </defs>
            <g clipPath="url(#rs-op-clip)">
              <g className="rs-op-camera" style={{ transform: camera(phase) }}>
                <image className="rs-op-page" href="/documents/irs-form-1040-2020-page-1.png" x="0" y="0" width={W} height={H} />
                <rect className="rs-op-veil" width={W} height={H} mask="url(#rs-op-hole)" />
                <rect className="rs-op-focus" width="1" height="1" style={{ transform: hole(phase) }} vectorEffect="non-scaling-stroke" />
              </g>
            </g>
            <g className="rs-op-marks">
                {regions.map((r, i) => (
                  <g key={r.category} className="rs-op-mark" data-answered={answers[i] !== undefined} role="button" tabIndex={kind === "landing" ? 0 : -1} aria-label={`Choice ${i + 1}: ${r.short}`} onClick={() => go(i + 1)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(i + 1); } }}>
                    <rect x={r.x} y={r.y} width={r.w} height={r.h} className="rs-op-mark-box" vectorEffect="non-scaling-stroke" />
                    <line x1={r.x + r.w} y1={r.y + r.h / 2} x2={W + 28} y2={r.y + r.h / 2} className="rs-op-mark-lead" vectorEffect="non-scaling-stroke" />
                    <circle cx={W + 52} cy={r.y + r.h / 2} r="24" className="rs-op-mark-dot" />
                    <text x={W + 52} y={r.y + r.h / 2 + 7} className="rs-op-mark-n">{i + 1}</text>
                  </g>
                ))}
            </g>
          </svg>
          <figcaption className="rs-op-credit"><span>IRS Form 1040 (2020) · Page 1 · Public domain</span><a href="/documents/irs-form-1040-2020.pdf" target="_blank" rel="noreferrer">View original PDF <span aria-hidden="true">↗</span></a></figcaption>
        </figure>

        <aside className="rs-op-panel" aria-hidden={kind !== "step"}>
          {active && (
            <div className="rs-op-card" key={phase}>
              <span className="rs-op-kicker">0{phase} / 0{N} <i /> {active.category}</span>
              <h2>{active.question}</h2>
              <div className="rs-op-choices" role="group" aria-label={active.question}>
                {active.options.map((option, i) => (
                  <button key={i} aria-pressed={answers[activeIndex] === i} data-recommended={answered && active.preferred === i} data-chosen={answers[activeIndex] === i} onClick={() => setAnswers(prev => ({ ...prev, [activeIndex]: i }))}>
                    <span className="rs-op-choice-title"><b>{i === 0 ? "A" : "B"}</b><span>{option.title}</span>{answered && active.preferred === i && <small>DPP</small>}</span>
                    <span className="rs-op-choice-means">{option.means}</span>
                    <ParsedOutput output={option.output} />
                  </button>
                ))}
              </div>
              <div className="rs-op-response" aria-live="polite" aria-atomic="true">
                {answered ? (
                  <>
                    <span className="rs-op-response-label">DPP convention · {active.preferred === 0 ? "A" : "B"}{answers[activeIndex] === active.preferred ? " · you agree" : " · you chose " + (answers[activeIndex] === 0 ? "A" : "B")}</span>
                    <p className="rs-op-evidence">{active.evidence}</p>
                    <p className="rs-op-consequence">{active.consequence}</p>
                  </>
                ) : (
                  <p className="rs-op-prompt">Each card shows what a parser would write down for the highlighted region. Choose the output you would want.</p>
                )}
              </div>
              <div className="rs-op-next">
                <span>{answeredCount} of {N} chosen</span>
                <button onClick={() => go(phase + 1)}>{phase < N ? (answered ? "Next choice" : "Skip") : "See where this leads"} <span aria-hidden="true">→</span></button>
              </div>
            </div>
          )}
        </aside>

        <div className="rs-op-outro" aria-hidden={kind !== "outro"}>
          <span className="rs-op-kicker">Five choices on one page</span>
          <p className="rs-op-outro-line">Thousands across a corpus. Every parser makes them. Almost none write them down.</p>
          <p className="rs-op-outro-score">{answeredCount === 0 ? "You skipped the choices. The protocol has an answer for each." : `You agreed with the protocol on ${matched} of ${answeredCount} you chose.`}</p>
          <p className="rs-op-outro-why">DPP writes those choices down, so every parser, annotator, and evaluator reads the page the same way.</p>
          <ol className="rs-principles" aria-label="Three principles"><li><span>01</span>Preserve what is printed.</li><li><span>02</span>Encode the structure it supports.</li><li><span>03</span>Make uncertainty explicit.</li></ol>
          <div className="rs-op-outro-actions">
            <a className="rs-primary-link" href="#guide">Read the guide <span aria-hidden="true">↓</span></a>
            <button className="rs-text-link" onClick={() => { setAnswers({}); go(1); }}>Start again</button>
          </div>
        </div>

        <span className="rs-op-scrollhint" aria-hidden="true">Scroll</span>
      </div>

      <div className="rs-op-steps" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => <div key={i} className="rs-op-step" data-step={i} />)}
      </div>
    </section>
  );
}
