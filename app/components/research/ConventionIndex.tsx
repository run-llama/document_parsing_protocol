"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { guideHref, hasExamples, notes, subjects } from "../../_site/conventions";

// The full guide as a scannable list: every title visible, grouped by subject.
// "page" lays the subjects out in columns; "rail" is the guide's sticky sidebar.
export default function ConventionIndex({ variant }: { variant: "page" | "rail" }) {
  const [q, setQ] = useState("");
  const pathname = usePathname();
  const active = pathname.startsWith("/guide/") ? pathname.slice(7) : null;
  const list = useRef<HTMLDivElement>(null);
  const term = q.toLowerCase().trim();
  const matches = notes.filter(n => `${n.title} ${n.rule} ${n.area} ${n.sub ?? ""} ${n.rule_id} ${n.tags.join(" ")}`.toLowerCase().includes(term));
  const clear = () => setQ("");

  // Keep the current convention in view when the rail first renders.
  useEffect(() => {
    if (variant !== "rail") return;
    list.current?.querySelector<HTMLElement>("[aria-current]")?.scrollIntoView({ block: "center" });
  }, [variant]);

  return <div className="rs-index" data-variant={variant}>
    <div className="rs-index-controls">
      <label className="rs-index-search"><span aria-hidden="true">⌕</span><input aria-label="Search conventions" placeholder={variant === "rail" ? "Search conventions…" : "Search a convention, a mark, a question…"} value={q} onChange={e => setQ(e.target.value)} /></label>
    </div>
    <div className="rs-index-meta"><span>{matches.length} of {notes.length} conventions</span>{q && <button onClick={clear}>Clear ×</button>}</div>
    <div className="rs-index-groups" ref={list}>
      {subjects.map(subject => {
        const items = matches.filter(n => n.area === subject);
        if (!items.length) return null;
        return <section className="rs-index-group" key={subject} aria-label={subject}>
          <h3>{subject}<span>{items.length}</span></h3>
          <ul>{items.map(n => <li key={n.slug}>
            <Link href={guideHref(n.slug)} aria-current={active === n.slug ? "page" : undefined}>
              <i className="rs-index-dot" aria-hidden="true" />
              <span>{n.title}</span>
              {!hasExamples(n.slug) && <small>No example yet</small>}
            </Link>
          </li>)}</ul>
        </section>;
      })}
      {!matches.length && <div className="rs-empty"><h3>No matching convention.</h3><p>Try a broader term, or clear the filters.</p><button className="rs-text-link" onClick={clear}>Clear filters ↗</button></div>}
    </div>
  </div>;
}
