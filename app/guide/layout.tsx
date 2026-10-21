import type React from "react";
import Shell from "../_site/Shell";
import ConventionIndex from "../components/research/ConventionIndex";
import { indexEntries } from "../_site/rfc";

// The rail persists while readers move between conventions.
export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <Shell>
    <div className="rs-guide rs-width">
      <aside className="rs-guide-rail" aria-label="All rules"><ConventionIndex variant="rail" entries={indexEntries} /></aside>
      <div className="rs-guide-main">{children}</div>
    </div>
  </Shell>;
}
