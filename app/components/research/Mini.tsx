import type { Block, Cell } from "../../data/pairs";

function cell(c: Cell, i: number, isHead: boolean) {
  const o = typeof c === "string" ? { t: c } : c;
  const cls = [
    o.hl ? "hl" : "",
    o.band ? "bandcell" : "",
    o.tier ? "tierline" : "",
    o.muted ? "mutedcell" : "",
    o.indent ? "indentcell" : "",
    o.right ? "rightcell" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const text = o.t.split("\n").map((line, k, arr) => (
    <span key={k}>
      {line}
      {k < arr.length - 1 ? <br /> : null}
    </span>
  ));
  const Tag = isHead || o.th || o.tier ? "th" : "td";
  return (
    <Tag key={i} className={cls} colSpan={o.span}>
      {text}
    </Tag>
  );
}

function Prose({ lines, watermark, banner }: { lines: string[]; watermark?: string; banner?: string }) {
  return (
    <div className={`mini-prose ${banner ? "has-banner" : ""}`}>
      {banner ? <span className="mini-banner">{banner}</span> : null}
      {watermark ? <span className="mini-watermark">{watermark}</span> : null}
      <div>
        {lines.map((l, i) => {
          if (l === "") return <div key={i} className="mini-gap" />;
          const parts = l.split(/(⟦[^⟧]*⟧)/g).filter(Boolean);
          return (
            <div key={i}>
              {parts.map((p, k) =>
                p.startsWith("⟦") ? (
                  <mark key={k} className="mini-hl">
                    {p.slice(1, -1)}
                  </mark>
                ) : (
                  <span key={k}>{p}</span>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type BarsBlock = Extract<Block, { kind: "bars" }>;

function Bars({ bars, referenceLine }: { bars: BarsBlock["bars"]; referenceLine?: BarsBlock["ref"] }) {
  return (
    <div className="mini-bars">
      <div className="mini-bars-canvas">
        {[0, 25, 50, 75, 100].map((g) => (
          <span key={g} className="mini-grid" style={{ bottom: `${g}%` }} />
        ))}
        {referenceLine ? (
          <span className="mini-ref" style={{ bottom: `${referenceLine.at}%` }}>
            <em>{referenceLine.label}</em>
          </span>
        ) : null}
        {bars.map((b) => (
          <div key={b.l} className="mini-bar-col">
            {b.v ? <span className="mini-bar-v">{b.v}</span> : null}
            <span className={`mini-bar ${b.hl ? "hl" : ""}`} style={{ height: `${b.h}%` }} />
          </div>
        ))}
      </div>
      <div className="mini-bars-labels">
        {bars.map((b) => (
          <span key={b.l}>{b.l}</span>
        ))}
      </div>
    </div>
  );
}

export default function Mini({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mini">
      {blocks.map((b, i) => {
        if (b.kind === "table") {
          const body = (
            <table>
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr key={ri}>{r.map((c, ci) => cell(c, ci, ri === 0 && !b.noHead))}</tr>
                ))}
              </tbody>
            </table>
          );
          return b.boxed || b.title ? (
            <div key={i} className={b.boxed ? "boxed" : ""}>
              {b.title ? <div className="cap">{b.title}</div> : null}
              {body}
            </div>
          ) : (
            <div key={i}>{body}</div>
          );
        }
        if (b.kind === "prose") return <Prose key={i} lines={b.lines} watermark={b.watermark} banner={b.banner} />;
        if (b.kind === "kv")
          return (
            <div key={i} className={`mini-kv ${b.boxed ? "boxed" : ""}`}>
              {b.lines.map((l, k) => {
                const parts = l.split(/(⟦[^⟧]*⟧)/g).filter(Boolean);
                return (
                  <div key={k}>
                    {parts.map((p, j) =>
                      p.startsWith("⟦") ? (
                        <mark key={j} className="mini-hl">
                          {p.slice(1, -1)}
                        </mark>
                      ) : (
                        <span key={j}>{p}</span>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          );
        return <Bars key={i} bars={b.bars} referenceLine={b.ref} />;
      })}
    </div>
  );
}
