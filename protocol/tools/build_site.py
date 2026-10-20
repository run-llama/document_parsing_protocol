#!/usr/bin/env python3
"""Build the Document Representation Protocol website from the vault.

    python3 tools/build_site.py [--out site] [--public]

One page per note, numbered from tools/protocol.py, plus the generated artifacts:
  rfc.html / rfc.md     the whole protocol as one document   (tools/build_rfc.py)
  skills/               the generator and checker skills      (tools/build_skills.py)
  legacy/               the previous annotation guide, frozen (internal builds only)
  review.html           the open-points review page           (internal builds only)

--public builds the internet-facing site: it refuses to run unless every embedded image is
cleared in tools/provenance/manifest.json, ships only images a page embeds, and leaves out the
internal appendix (open points), the repo docs, the review page, the legacy guide and the skill
text shown under each rule.

Only dependency is mistune (pip install mistune).
"""
import argparse
import html
import json
import os
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    import mistune  # noqa: F401
except ImportError:
    raise SystemExit("need mistune:  pip install mistune")
import protocol as P  # noqa: E402
import render_md as R  # noqa: E402

VAULT = P.VAULT
HOME = 'Document Representation Protocol'
STATUS_BADGE = {'rule': '✅', 'either': '⚖️', 'open': '❓'}
SCOPE_CHIP = {
    'page': '<p class="scope">📄 <strong>Page rule</strong> — applied from the page alone</p>',
    'document': '<p class="scope doc">📚 <strong>Document rule</strong> — needs other pages of the '
                'document; decided once and applied on every page</p>',
}


def slug(note):
    return re.sub(r'[^a-z0-9]+', '-', note.rel[:-3].lower()).strip('-') + '.html'


def image_assets(public):
    assets = []
    for root, _, files in os.walk(os.path.join(VAULT, '_attachments')):
        for f in files:
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')):
                assets.append(os.path.relpath(os.path.join(root, f), VAULT))
    if not public:
        return assets
    sys.path.insert(0, os.path.join(VAULT, 'tools', 'provenance'))
    import build_manifest  # noqa: E402
    entries, missing = build_manifest.build()
    blocked = [e['path'] for e in entries if e['used_in'] and e['decision'] not in build_manifest.PASSING]
    if blocked or missing:
        raise SystemExit(f'--public: {len(blocked)} embedded image(s) not cleared, '
                         f'{len(missing)} missing; run tools/provenance/build_manifest.py --check')
    embedded = {e['file'] for e in entries if e['used_in']}
    return [a for a in assets if os.path.basename(a) in embedded]


def publishable(public):
    notes = P.load()
    P.validate_metadata(notes)
    if public:
        notes = [n for n in notes if not n.internal]
    return notes


def link_fn(notes_by_base, href_of, withheld=frozenset()):
    """withheld: notes left out of this build (internal ones in the public build) -- a link to
    one renders as plain text rather than as a dead link."""
    def link(target, label):
        n = notes_by_base.get(target)
        text = label or target
        if not n and target in withheld:
            return html.escape(text)
        if not n:
            return f'<span class="dead">{html.escape(text)}</span>'
        sec = f'<span class="sec">§{n.number}</span>' if n.number else ''
        return f'[{text}]({href_of(n)}){sec}'
    return link


def quick_reference(notes, href_of):
    """Appendix D: every rule's requirement, from its status callout, grouped by chapter."""
    out = []
    for ch, title in P.chapters(notes):
        rows = [n for n in notes if n.chapter == ch and n.status]
        if not rows:
            continue
        out.append(f'<h2>§{ch} {html.escape(title)}</h2><table class="qr">')
        for n in rows:
            summary = R.MD(re.sub(r'\[\[([^\]|#]+)(\|([^\]]+))?\]\]', lambda m: m.group(3) or m.group(1),
                                  n.summary()))
            out.append(f'<tr><td class="qn">{n.number}</td><td class="qb">{STATUS_BADGE[n.status]}</td>'
                       f'<td><a href="{href_of(n)}">{html.escape(n.title)}</a>{summary}</td></tr>')
        out.append('</table>')
    return '\n'.join(out)


def toc(notes, href_of):
    """The home page's table of contents: chapters with their rules."""
    out = ['<div class="toc">']
    for ch, title in P.chapters(notes):
        members = [n for n in notes if n.chapter == ch]
        out.append(f'<details><summary><span class="sec">§{ch}</span> {html.escape(title)} '
                   f'<small>{len(members)}</small></summary><ul>')
        for n in members:
            badge = STATUS_BADGE.get(n.status, '')
            out.append(f'<li><span class="sec">{n.number}</span> {badge} '
                       f'<a href="{href_of(n)}">{html.escape(n.title)}</a></li>')
        out.append('</ul></details>')
    out.append('</div>')
    return '\n'.join(out)


def nav(notes, cur, public):
    out = ['<nav>']
    top = [('index.html', '🏠', 'Home'), ('rfc.html', '📜', 'Whole protocol (one page)'),
           ('skills/index.html', '🧩', 'Generated skills')]
    if not public:
        top += [('review.html', '❓', 'Review open points'),
                ('legacy/index.html', '🗄', 'Previous annotation guide')]
    for href, icon, label in top:
        on = ' class="on"' if href == cur else ''
        out.append(f'<a class="toplink"{on} href="{href}"><span class="b">{icon}</span>{label}</a>')

    def item(n):
        badge = STATUS_BADGE.get(n.status, '') or ('📚' if n.scope == 'document' else '')
        on = ' class="on"' if slug(n) == cur else ''
        return (f'<li{on}><a href="{slug(n)}"><span class="b">{badge}</span>'
                f'<span class="num">{n.number}</span>{html.escape(n.title)}</a></li>')

    for ch, title in P.chapters(notes):
        members = [n for n in notes if n.chapter == ch]
        here = any(slug(n) == cur for n in members)
        out.append(f'<details class="grp" data-k="{ch}"{" open" if here else ""}>'
                   f'<summary><span class="num">§{ch}</span>{html.escape(title)}</summary><ul>')
        open_sub = None
        for n in members:
            sub = n.section_titles[0] if n.section_titles else None
            if sub != open_sub:
                if open_sub is not None:
                    out.append('</ul></details>')
                if sub is not None:
                    subnum = '.'.join(n.number.split('.')[:2])
                    subhere = any(slug(m) == cur for m in members
                                  if m.section_titles and m.section_titles[0] == sub)
                    out.append(f'<details class="sub" data-k="{ch}/{html.escape(sub)}"'
                               f'{" open" if subhere else ""}><summary><span class="num">{subnum}</span>'
                               f'{html.escape(sub)}</summary><ul>')
                open_sub = sub
            out.append(item(n))
        if open_sub is not None:
            out.append('</ul></details>')
        out.append('</ul></details>')
    out.append('</nav>')
    return '\n'.join(out)


def build_review(out, notes):
    """site/review.html: the open-points list as a one-at-a-time review page (internal only)."""
    sys.path.insert(0, os.path.join(VAULT, 'tools', 'ambiguity_review'))
    from parse import parse_ambiguities  # noqa: E402
    from proposals import load_proposals  # noqa: E402
    by = P.by_base(notes)
    amb = os.path.join(VAULT, 'B Open points', 'Ambiguity List.md')
    items = parse_ambiguities(open(amb, encoding='utf-8').read())
    for it in items:
        it['slugs'] = {n: slug(by[n]) for n in it['samples'] + it.get('related', []) if n in by}
    data = load_proposals()
    data['items'] = items
    data['notes'] = {b: slug(n) for b, n in by.items()}
    tpl = open(os.path.join(VAULT, 'tools', 'ambiguity_review', 'decisions.html'), encoding='utf-8').read()
    page = tpl.replace('<script id="embedded" type="application/json">null</script>',
                       '<script id="embedded" type="application/json">' +
                       json.dumps(data, ensure_ascii=False).replace('<', '\\u003c') + '</script>')
    open(os.path.join(out, 'review.html'), 'w', encoding='utf-8').write(page)


def build(outdir='site', public=True):
    if not public:
        raise ValueError("Only public builds are supported in this repository")
    notes = publishable(public)
    by = P.by_base(notes)
    out = outdir if os.path.isabs(outdir) else os.path.join(VAULT, outdir)
    shutil.rmtree(out, ignore_errors=True)
    os.makedirs(os.path.join(out, 'assets'), exist_ok=True)
    asset_map = {}
    for a in image_assets(public):
        name = os.path.basename(a)
        shutil.copy2(os.path.join(VAULT, a), os.path.join(out, 'assets', name))
        asset_map[name] = 'assets/' + name
    credits = R.credits_map()
    link = link_fn(by, slug, withheld=frozenset(n.base for n in P.load()) - set(by))

    index, home_slug = [], None
    for n in notes:
        heading = f'§{n.number} {n.title}' if n.number else n.title
        body = R.render_note(n, link, asset_map, credits, show_skills=not public, heading=heading)
        if n.scope in SCOPE_CHIP:
            body = body.replace('</h1>', '</h1>' + SCOPE_CHIP[n.scope], 1)
        body = body.replace('<!-- quickref -->', quick_reference(notes, slug))
        body = body.replace('<!-- toc -->', toc(notes, slug))
        page = SHELL.format(title=html.escape(heading), nav=nav(notes, slug(n), public), body=body)
        open(os.path.join(out, slug(n)), 'w', encoding='utf-8').write(page)
        index.append(dict(u=slug(n), t=heading, s=n.chapter_title or 'Home',
                          rule_id=n.rule_id, tags=n.tags,
                          x=re.sub(r'<[^>]+>', ' ', body)[:1800]))
        if n.title == HOME or n.base == HOME:
            home_slug = slug(n)
    if home_slug:
        shutil.copy2(os.path.join(out, home_slug), os.path.join(out, 'index.html'))
    open(os.path.join(out, 'search.json'), 'w').write(json.dumps(index))
    catalog = [dict(rule_id=n.rule_id, title=n.title, tags=n.tags, status=n.status,
                    scope=n.scope, section=n.number, url=slug(n), source=n.rel,
                    requirement=n.summary()) for n in notes if n.rule_id]
    open(os.path.join(out, 'rules.json'), 'w').write(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
    open(os.path.join(out, 'style.css'), 'w').write(CSS)
    print(f'{len(notes)} pages, {len(asset_map)} assets -> {out}')

    import build_rfc  # noqa: E402
    import build_skills  # noqa: E402
    build_rfc.build(out, public, notes=notes, asset_map=asset_map)
    build_skills.build(os.path.join(out, 'skills'), public, notes=notes, page_shell=(SHELL, nav, notes))
    if not public:
        build_review(out, notes)
        import build_legacy_site  # noqa: E402
        build_legacy_site.build(os.path.join(out, 'legacy'))


CSS = """
:root{--bg:#fff;--fg:#1c1c1e;--mut:#6b6b70;--line:#e3e3e6;--acc:#c2410c;--code:#f5f5f7;--ok:#31a06a;--bad:#d1495b}
@media(prefers-color-scheme:dark){:root{--bg:#151517;--fg:#e8e8ea;--mut:#9a9aa0;--line:#2c2c30;--acc:#fb923c;--code:#1e1e21}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex}
aside{width:330px;flex:none;height:100vh;overflow-y:auto;border-right:1px solid var(--line);padding:20px 16px;position:sticky;top:0}
main{flex:1;min-width:0;max-width:940px;padding:36px 44px}
nav{font-size:13.5px;line-height:1.4}
nav a{color:var(--fg);text-decoration:none;display:flex;gap:6px;padding:4px 8px;border-radius:5px}
nav a:hover{background:var(--code)}
nav li.on>a,nav a.toplink.on{background:var(--acc);color:#fff}
nav a.toplink{font-weight:600;margin-bottom:2px}
nav ul{list-style:none;margin:2px 0 6px;padding:0 0 0 6px}
nav summary{cursor:pointer;padding:5px 4px;font-weight:650;font-size:12.5px;letter-spacing:.02em}
nav details.grp{margin-top:6px}
nav details.sub summary{font-weight:600;color:var(--mut)}
nav .b{flex:none;width:16px;font-size:11px}
nav .num{flex:none;color:var(--mut);font-variant-numeric:tabular-nums;margin-right:6px;min-width:34px}
nav li.on .num{color:#fff}
a{color:var(--acc)}
h1{font-size:30px;line-height:1.25;margin:0 0 18px}
h2{font-size:21px;margin:34px 0 10px;padding-bottom:5px;border-bottom:1px solid var(--line)}
h3{font-size:17px;margin:26px 0 8px}
table{border-collapse:collapse;margin:14px 0;font-size:14px;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:7px 10px;text-align:left;vertical-align:top}
th{background:var(--code)}
code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:.9em}
pre{background:var(--code);padding:12px 14px;border-radius:7px;overflow-x:auto;font-size:13px;line-height:1.5}
pre code{background:none;padding:0}
img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:6px;margin:10px 0;background:#fff}
blockquote{border-left:3px solid var(--line);margin:14px 0;padding:2px 16px;color:var(--mut)}
.co{border-left:3px solid var(--co);background:color-mix(in srgb,var(--co) 7%,transparent);padding:12px 16px;border-radius:0 7px 7px 0;margin:16px 0}
.co>p{margin:6px 0}
.co-t{font-weight:650;color:var(--co);margin-top:0!important}
.credit{color:var(--mut);font-size:12px}
.scope{display:inline-block;margin:-6px 0 16px;padding:3px 10px;border:1px solid var(--line);border-radius:999px;color:var(--mut);font-size:13px}
.scope.doc{border-color:var(--acc);color:var(--fg)}
.rule-meta{font-size:13px;overflow-wrap:anywhere}
.rule-tag{display:inline-block;border:1px solid var(--line);border-radius:4px;padding:0 5px;margin:2px}
.sec{color:var(--mut);font-size:.8em;margin-left:4px;font-variant-numeric:tabular-nums}
.dead{color:var(--mut);border-bottom:1px dotted var(--mut)}
figure.exp{margin:16px 0;border:1px solid color-mix(in srgb,var(--ok) 45%,var(--line));border-radius:8px;overflow:hidden}
figure.exp.bad{border-color:color-mix(in srgb,var(--bad) 55%,var(--line))}
figure.exp figcaption{font-size:12.5px;font-weight:650;color:var(--ok);padding:7px 12px;background:var(--code);border-bottom:1px solid var(--line)}
figure.exp.bad figcaption{color:var(--bad)}
.exp-wrap{padding:4px 14px;overflow-x:auto;font-size:14.5px}
.exp-wrap table{font-size:13px}
.exp-src>summary{font-size:12px;color:var(--mut);cursor:pointer;padding:6px 12px;border-top:1px solid var(--line)}
.exp-src pre{margin:0;border-radius:0}
.el td,p.el{color:var(--mut);text-align:center;font-style:italic}
details.skills{margin:28px 0 0;border:1px dashed var(--line);border-radius:8px;padding:6px 12px}
details.skills>summary{cursor:pointer;font-size:13px;color:var(--mut)}
details.skills h4{margin:12px 0 4px;font-size:13px}
.toc details{border-bottom:1px solid var(--line);padding:6px 0}
.toc summary{cursor:pointer;font-weight:600}
.toc ul{list-style:none;padding-left:14px;font-size:14.5px}
table.qr{display:table;width:100%}
table.qr td{border:0;border-bottom:1px solid var(--line)}
table.qr td p{margin:2px 0}
.qn{color:var(--mut);white-space:nowrap;font-variant-numeric:tabular-nums}
.qb{width:22px}
#q{width:100%;padding:8px 11px;border:1px solid var(--line);border-radius:7px;background:var(--bg);color:var(--fg);font-size:13.5px;margin-bottom:6px}
#res{list-style:none;padding:0;margin:0 0 10px;font-size:13px}
#res li{padding:5px 8px;border-radius:5px}
#res li:hover{background:var(--code)}
#res small{color:var(--mut);display:block}
@media(max-width:900px){body{flex-direction:column}aside{width:100%;height:auto;position:static;border-right:0;border-bottom:1px solid var(--line)}main{padding:22px 16px}}
"""

SHELL = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><link rel="stylesheet" href="style.css"></head>
<body><aside><input id="q" placeholder="Search rules, IDs, tags…" autocomplete="off"><ul id="res"></ul>
{nav}</aside>
<main>{body}</main>
<script>
(() => {{
  const KEY='drp_nav_open';
  let st={{}};
  try {{ st=JSON.parse(localStorage.getItem(KEY)||'{{}}'); }} catch {{}}
  for(const d of document.querySelectorAll('details[data-k]')){{
    const k=d.dataset.k;
    if(!d.open && st[k]===true) d.open=true;
    d.addEventListener('toggle',()=>{{ st[k]=d.open; try {{ localStorage.setItem(KEY,JSON.stringify(st)); }} catch {{}} }});
  }}
}})();
let IDX=[];fetch('search.json').then(r=>r.json()).then(d=>IDX=d).catch(()=>{{}});
const q=document.getElementById('q'),res=document.getElementById('res');
q.addEventListener('input',()=>{{const v=q.value.toLowerCase().trim();res.innerHTML='';
if(v.length<2)return;
const hits=IDX.map(p=>{{const t=p.t.toLowerCase(),x=p.x.toLowerCase();
let s=0;if(p.rule_id===v)s+=30;else if((p.rule_id||'').includes(v))s+=15;
if((p.tags||[]).some(tag=>tag.includes(v)))s+=5;
if(t.includes(v))s+=10;if(x.includes(v))s+=1;return {{p,s}};}})
.filter(h=>h.s>0).sort((a,b)=>b.s-a.s).slice(0,12);
for(const h of hits){{const li=document.createElement('li');
li.innerHTML=`<a href="${{h.p.u}}">${{h.p.t}}</a><small>${{h.p.s}}</small>`;res.appendChild(li);}}}});
</script></body></html>"""


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default='site')
    ap.add_argument('--public', action='store_true', default=True,
                    help='internet-facing build; requires cleared image provenance')
    a = ap.parse_args()
    build(a.out, a.public)
