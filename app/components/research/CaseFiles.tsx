"use client";
import { useState, useSyncExternalStore } from "react";
import raw from "../../data/amb.json";
import notes from "../../data/atlas.json";
import links from "../../data/decision-conventions.json";
import DecisionRecord from "./DecisionRecord";
const categories = Array.from(new Set(raw.map(record => record.category)));
const byRecord: Record<string, string[]> = links;
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = () => window.location.hash.slice(1);

export default function CaseFiles() {
  const [mode, setMode] = useState<"all" | "open" | "resolved">("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const selected = useSyncExternalStore(subscribe, getHash, () => "");
  const list = raw.filter(record => (mode === "all" || record.resolved === (mode === "resolved")) && (category === "all" || record.category === category) && `${record.id} ${record.title} ${record.description} ${record.answer}`.toLowerCase().includes(query.trim().toLowerCase()));
  const item = list.find(record => record.id === selected) ?? list[0];
  const related = item ? notes.filter(note => byRecord[item.id]?.includes(note.slug)) : [];
  return <div className="rs-cases rs-register">
    <label className="rs-register-search"><span>Find a decision</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by topic, question, or AMB number" /></label>
    <div className="rs-case-tools"><div className="rs-segments" role="group" aria-label="Decision status">
      {(["all", "open", "resolved"] as const).map(status => <button key={status} aria-pressed={mode === status} onClick={() => setMode(status)}>{status === "all" ? "All" : status === "open" ? "Open" : "Resolved"}<span>{raw.filter(record => status === "all" || record.resolved === (status === "resolved")).length}</span></button>)}
    </div><select value={category} onChange={event => setCategory(event.target.value)} aria-label="Decision category"><option value="all">All subjects</option>{categories.map(value => <option key={value}>{value}</option>)}</select></div>
    <div className="rs-case-grid"><nav className="rs-case-list" aria-label="Decision records">{list.map(record => <a key={record.id} href={`#${record.id}`} aria-current={item?.id === record.id ? "true" : undefined}><span>{record.id}</span><span>{record.title}</span><i aria-hidden="true">↗</i></a>)}</nav>
      {item ? <div className="rs-dossier" key={item.id}><DecisionRecord record={item} />{related.length > 0 && <div className="rs-record-conventions"><span>Current conventions</span>{related.map(note => <a key={note.slug} href={`/guide/${note.slug}`}>{note.title} ↗</a>)}</div>}</div> : <div className="rs-empty"><h3>No matching records.</h3><button className="rs-text-link" onClick={() => { setQuery(""); setCategory("all"); setMode("all"); }}>Clear filters ↗</button></div>}
    </div>
  </div>;
}
