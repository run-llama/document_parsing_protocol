"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/guide", label: "Guide", match: (path: string) => path.startsWith("/guide") },
  { href: "/protocol/rfc.html", label: "Full RFC", match: () => false },
  { href: "/#adopt", label: "Try it", match: () => false },
];

export default function SiteNav() {
  const pathname = usePathname();
  return <nav className="rs-nav" aria-label="Site">
    <div className="rs-width rs-nav-inner">
      <Link className="rs-nav-title" href="/" aria-label="DPP home">DPP<span>Working draft 0.1</span></Link>
      <div className="rs-site-links">{links.map(link => <Link key={link.href} href={link.href} aria-current={link.match(pathname) ? "page" : undefined}>{link.label}</Link>)}</div>
      <LlamaIndexMark className="rs-nav-brand" />
    </div>
  </nav>;
}

export function SiteFooter() {
  return <footer className="rs-footer rs-width">
    <Link className="rs-wordmark" href="/">DPP</Link>
    <span>Document Parsing Protocol · Working draft 0.1</span>
    <LlamaIndexMark className="rs-footer-brand" label="An open protocol from" />
    <div className="rs-footer-links"><Link href="/guide">Guide</Link><Link href="/practice">Practice</Link><Link href="/example">Walkthrough</Link><Link href="/#methods">About this draft</Link><a href="https://github.com/run-llama/document_parsing_protocol">Contribute on GitHub ↗</a></div>
  </footer>;
}

// The LlamaIndex wordmark, as supplied on llamaindex.ai/brand. Scale it whole; never recolour it.
export function LlamaIndexMark({ className, label }: { className: string; label?: string }) {
  return <a className={className} href="https://www.llamaindex.ai" aria-label={label ? `${label} LlamaIndex` : "LlamaIndex"}>
    {label && <span aria-hidden="true">{label}</span>}
    {/* eslint-disable-next-line @next/next/no-img-element -- a fixed-size brand SVG needs no optimisation */}
    <img src="/brand/llamaindex-wordmark-black.svg" alt="" width={236} height={40} />
  </a>;
}
