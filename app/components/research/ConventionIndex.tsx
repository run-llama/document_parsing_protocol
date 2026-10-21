"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { guideHref } from "../../_site/conventions";
import type { IndexEntry } from "../../_site/rfc";

const MARK: Record<string, { glyph: string; label: string }> = {
  either: { glyph: "⚖️", label: "Equivalent forms: two renderings conform" },
  open: { glyph: "❓", label: "Open point: not yet settled" },
};

// Every rule, in RFC order and numbering, grouped by chapter. "page" lays chapters out in columns;
// "rail" is the guide's sticky sidebar. Sections kept in the RFC only link straight to it.
export default function ConventionIndex({ variant, entries }: { variant: "page" | "rail"; entries: IndexEntry[] }) {
  const [q, setQ] = useState("");
  const pathname = usePathname();
  const active = pathname.startsWith("/guide/") ? pathname.slice(7) : null;
  const list = useRef<HTMLDivElement>(null);
  const term = q.toLowerCase().trim().replace(/^§/, "");
  const matches = entries.filter(e => !term || `${e.section ?? ""} §${e.section ?? ""} ${e.title} ${e.chapterTitle} ${e.group ?? ""}`.toLowerCase().includes(term));
  const chapters = [...new Map(entries.map(e => [e.chapter, e.chapterTitle])).entries()];
  const guidePages = entries.filter(e => !e.rfcOnly).length;

  useEffect(() => {
    if (variant !== "rail") return;
    list.current?.querySelector<HTMLElement>("[aria-current]")?.scrollIntoView({ block: "center" });
  }, [variant]);

  return <div className="rs-index" data-variant={variant}>
    <div className="rs-index-controls">
      <label className="rs-index-search"><span aria-hidden="true">⌕</span><input aria-label="Search rules by name or section number" placeholder={variant === "rail" ? "Search, or type 9.3…" : "Search a rule, or type a section number such as 9.3.2…"} value={q} onChange={e => setQ(e.target.value)} /></label>
      {variant === "page" && <p className="rs-index-legend"><span>📚 document rule — decided once for the whole document</span><span>⚖️ two renderings conform</span><span>❓ open point</span><span>RFC ↗ kept in the RFC only</span></p>}
    </div>
    <div className="rs-index-meta"><span>{q ? `${matches.length} matching` : `${guidePages} rules`}</span>{q && <button onClick={() => setQ("")}>Clear ×</button>}</div>
    <div className="rs-index-groups" ref={list}>
      {chapters.map(([chapter, title]) => {
        const items = matches.filter(e => e.chapter === chapter);
        if (!items.length) return null;
        return <section className="rs-index-group" key={chapter} aria-label={title}>
          <h3><span className="rs-index-ch">{/^\d+$/.test(chapter) ? `§${chapter}` : chapter}</span>{title}</h3>
          <ul>{items.map(e => {
            const mark = MARK[e.status];
            const body = <>
              <span className="rs-index-num">{e.section}</span>
              <span>{e.title}{mark && <i className="rs-index-mark" title={mark.label} aria-label={mark.label}>{mark.glyph}</i>}{e.scope === "document" && <i className="rs-index-mark" title="Document rule" aria-label="Document rule">📚</i>}</span>
              {e.rfcOnly && <small>RFC ↗</small>}
            </>;
            return <li key={e.slug}>{e.rfcOnly
              ? <a href={guideHref(e.slug)} data-rfc-only="true" title="Kept in the RFC only">{body}</a>
              : <Link href={guideHref(e.slug)} aria-current={active === e.slug ? "page" : undefined}>{body}</Link>}</li>;
          })}</ul>
        </section>;
      })}
      {!matches.length && <div className="rs-empty"><h3>No matching rule.</h3><p>Try a broader term or a shorter section number.</p><button className="rs-text-link" onClick={() => setQ("")}>Clear search ↗</button></div>}
    </div>
  </div>;
}
