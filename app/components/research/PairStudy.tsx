"use client";
import { useState } from "react";
import { type Pair } from "../../data/pairs";
import Mini from "./Mini";

// A look-alike: two similar pages that call for different decisions.
export default function PairStudy({ pair }: { pair: Pair }) {
  const [revealed, setRevealed] = useState(false);
  return <div className="rs-pair-study">
    <div className="rs-pair-heading"><h3>{pair.question}</h3></div>
    <div className="rs-pair-grid">{[pair.left, pair.right].map((s, i) => <div className="rs-pair-pane" key={i}>
      <div className="rs-pair-label"><span>{i === 0 ? "A" : "B"}</span><h4>{s.title}</h4></div>
      <div className="rs-pair-illustration"><Mini blocks={s.blocks} /></div>
      <div className="rs-pair-verdict" data-revealed={revealed}><span className="rs-kicker">The convention</span><p>{s.verdict}</p>{revealed && <p className="rs-pair-reason">{s.note}</p>}</div>
    </div>)}</div>
    <div className="rs-pair-answer" aria-live="polite">{revealed
      ? <div className="rs-discriminator"><span className="rs-kicker">The deciding observation</span><p>{pair.discriminator}</p></div>
      : <><p>Look at the structure. What evidence changes the answer?</p><button className="rs-primary-link" onClick={() => setRevealed(true)}>Reveal the distinction <span>↗</span></button></>}
    </div>
  </div>;
}
