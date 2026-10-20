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
    </div>
  </nav>;
}

export function SiteFooter() {
  return <footer className="rs-footer rs-width">
    <Link className="rs-wordmark" href="/">DPP</Link>
    <span>Document Parsing Protocol · Working draft 0.1</span>
    <div className="rs-footer-links"><Link href="/guide">Guide</Link><Link href="/practice">Practice</Link><Link href="/example">Worked page</Link><Link href="/#methods">About this draft</Link></div>
  </footer>;
}
