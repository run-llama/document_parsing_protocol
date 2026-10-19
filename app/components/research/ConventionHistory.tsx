import records from "../../data/amb.json";
import links from "../../data/decision-conventions.json";
import DecisionRecord from "./DecisionRecord";
const byRecord: Record<string, string[]> = links;

export default function ConventionHistory({ slug, openFirst = false }: { slug: string; openFirst?: boolean }) {
  const related = records.filter(record => byRecord[record.id]?.includes(slug));
  if (!related.length) return null;
  const open = related.filter(record => !record.resolved);
  const resolved = related.filter(record => record.resolved);
  return <>
    {open.length > 0 && <details className="rs-why-rule rs-open-history" open={openFirst}>
      <summary>Open questions<span>{open.length} {open.length === 1 ? "record" : "records"} <i aria-hidden="true">+</i></span></summary>
      {open.map(record => <DecisionRecord key={record.id} record={record} inline />)}
    </details>}
    {resolved.length > 0 && <details className="rs-why-rule">
      <summary>Why this rule?<span>{resolved.length} {resolved.length === 1 ? "record" : "records"} <i aria-hidden="true">+</i></span></summary>
      <p className="rs-history-intro">The decision history behind this convention. Earlier defaults may differ from the recorded answer.</p>
      {resolved.map(record => <DecisionRecord key={record.id} record={record} inline />)}
    </details>}
  </>;
}
