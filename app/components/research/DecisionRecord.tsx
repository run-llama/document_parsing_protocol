import type records from "../../data/amb.json";
export type Decision = (typeof records)[number];
const clean = (text: string) => text.replace(/`/g, "");

export default function DecisionRecord({ record, inline = false }: { record: Decision; inline?: boolean }) {
  const Heading = inline ? "h4" : "h3";
  const defaultOption = record.options.find(option => option.key === record.default);
  return <article className="rs-history-record">
    <div className="rs-history-meta"><a href={`/decisions#${record.id}`}>{record.id} ↗</a><span>{record.resolved ? "Resolved record" : "Open question"}</span></div>
    <Heading>{record.title}</Heading>
    {record.description && <p>{clean(record.description)}</p>}
    <div className="rs-history-answer">
      <span>{record.resolved ? "Recorded answer" : "Working default"}</span>
      <p>{record.resolved ? clean(record.answer).replace(/^Answer:\s*/, "") || "No final answer text is recorded." : clean(defaultOption?.text || record.default || "No working default is recorded. Preserve the evidence and flag the case for review.")}</p>
    </div>
    {!record.resolved && <p className="rs-history-caveat">This question remains open. The working default is provisional.</p>}
    {record.options.length > 0 && <details className="rs-history-alternatives">
      <summary>{record.resolved ? "Alternatives considered" : "Options under discussion"}<span aria-hidden="true">+</span></summary>
      <ol>{record.options.map(option => <li key={option.key}><span>{option.key.toUpperCase()}</span><div>{clean(option.text)}{option.key === record.default && <small>{record.resolved ? "Prior default · not necessarily the final answer" : "Working default"}</small>}</div></li>)}</ol>
    </details>}
  </article>;
}
