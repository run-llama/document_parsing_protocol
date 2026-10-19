"use client";

import { useMemo, useState } from "react";
import { pairs, type Side } from "../../data/pairs";
import Mini from "./Mini";

type Item = {
  id: string;
  area: string;
  question: string;
  shown: Side;
  other: Side;
  options: string[];
  discriminator: string;
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967295;
}

function build(): Item[] {
  const items: Item[] = [];
  for (const p of pairs) {
    for (const side of ["left", "right"] as const) {
      const shown = p[side];
      const other = side === "left" ? p.right : p.left;
      const flip = hash(p.id + side) > 0.5;
      const options = flip ? [other.verdict, shown.verdict] : [shown.verdict, other.verdict];
      items.push({ id: `${p.id}-${side}`, area: p.area, question: p.question, shown, other, options, discriminator: p.discriminator });
    }
  }
  return items.sort((a, b) => hash(a.id) - hash(b.id));
}

export default function Calibration() {
  const items = useMemo(() => build(), []);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [log, setLog] = useState<boolean[]>([]);
  const it = items[i];
  const done = i >= items.length;
  const agree = log.filter(Boolean).length;

  const choose = (o: string) => {
    if (pick) return;
    setPick(o);
    setLog((l) => [...l, o === it.shown.verdict]);
  };
  const next = () => {
    setPick(null);
    setI((x) => x + 1);
  };
  const restart = () => {
    setI(0);
    setPick(null);
    setLog([]);
  };

  if (done) {
    return (
      <div className="cal">
        <div className="cal-done">
          <span className="eyebrow">Calibration complete</span>
          <h3>
            You agreed with the guide on {agree} of {items.length}.
          </h3>
          <p className="hint">
            Disagreement is data. Every call you would have made differently is a candidate for the open list.
          </p>
          <button className="btn btn-primary" id="cal-restart" onClick={restart}>
            Run it again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cal">
      <div className="cal-status">
        <span className="mono">
          {String(i + 1).padStart(2, "0")} / {items.length} · {it.area}
        </span>
        <span className="cal-track" aria-label={`${agree} agreed of ${log.length} answered`}>
          {items.map((x, k) => (
            <span key={x.id} className="cal-tick" data-state={k < log.length ? (log[k] ? "yes" : "no") : k === i ? "cur" : ""} />
          ))}
        </span>
        <span className="mono">agree {agree} / {log.length}</span>
      </div>

      <div className="cal-grid" key={it.id}>
        <div className="cal-specimen">
          <span className="eyebrow">The page prints</span>
          <Mini blocks={it.shown.blocks} />
        </div>
        <div className="cal-ask">
          <p className="pair-q">{it.question}</p>
          <div className="cal-opts" role="group" aria-label="Pick the encoding">
            {it.options.map((o) => {
              const state = !pick ? "" : o === it.shown.verdict ? "right" : o === pick ? "wrong" : "muted";
              return (
                <button key={o} id={`cal-${it.id}-${o.length}`} className="cal-opt" data-state={state} onClick={() => choose(o)} disabled={!!pick}>
                  {o}
                </button>
              );
            })}
          </div>
          {pick ? (
            <div className="cal-reveal">
              <div className="cal-verdict" data-ok={pick === it.shown.verdict ? "true" : "false"}>
                <span className="mono">{pick === it.shown.verdict ? "Agrees with the guide" : "The guide reads it differently"}</span>
                <h3>{it.shown.title}</h3>
                <p>{it.shown.note}</p>
              </div>
              <div className="cal-other">
                <span className="eyebrow">Its look-alike</span>
                <div className="cal-other-row">
                  <Mini blocks={it.other.blocks} />
                  <div>
                    <h4>{it.other.title}</h4>
                    <p className="verdict">{it.other.verdict}</p>
                  </div>
                </div>
              </div>
              <p className="discriminator">
                <b>The discriminator.</b> {it.discriminator}
              </p>
              <button className="btn btn-primary" id="cal-next" onClick={next}>
                {i + 1 < items.length ? "Next page →" : "See the score"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
