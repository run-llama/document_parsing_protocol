#!/usr/bin/env python3
"""Import example data from an existing export of the convention library.

Usage: python3 scripts/import-convention-examples.py /path/to/export/pages
Exact Markdown source and a sanitised rendering are retained for every expected output. Remote HTML is
never executed or embedded. An optional --assets manifest attaches local source
images previously downloaded by sync-convention-library.py.
"""
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path

BASE = 'protocol-source/'
ROOT = Path(__file__).resolve().parents[1]

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def walk(self, tag):
        for child in self.children:
            if isinstance(child, Node):
                if child.tag == tag:
                    yield child
                yield from child.walk(tag)
    def text(self):
        return ''.join(c.text() if isinstance(c, Node) else c for c in self.children)
    def plain(self):
        return re.sub(r'\s+', ' ', self.text()).strip()

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('root')
        self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in {'img', 'br', 'hr', 'meta', 'link', 'input', 'source', 'wbr'}:
            self.stack.append(node)
        elif tag == 'br':
            node.children.append('\n')
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def rich_runs(node, flags=()):
    tags = {'strong':'bold', 'b':'bold', 'em':'italic', 'i':'italic', 'del':'strike', 's':'strike', 'u':'underline', 'sub':'sub', 'sup':'sup'}
    styles = tuple(dict.fromkeys((*flags, *([tags[node.tag]] if node.tag in tags else []))))
    runs = []
    for child in node.children:
        if isinstance(child, Node):
            runs.extend(rich_runs(child, styles))
        else:
            runs.append({'text':child, 'styles':list(styles)})
    return runs

def table_data(table):
    rows = []
    for row in table.walk('tr'):
        if {'gt-el', 'el'} & set(row.attrs.get('class', '').split()):
            continue
        cells = []
        for cell in row.children:
            if not isinstance(cell, Node) or cell.tag not in {'td', 'th'}:
                continue
            spans = {name: max(1, min(99, int(cell.attrs.get(attr, '1')))) for name, attr in [('colSpan','colspan'), ('rowSpan','rowspan')]}
            value = {'text': cell.text().strip(), 'header': cell.tag == 'th', **spans}
            runs = rich_runs(cell)
            if any(run['styles'] for run in runs):
                value['runs'] = runs
            cells.append(value)
        if cells:
            rows.append(cells)
    return rows

def snippet(pre):
    code = next(pre.walk('code'), pre)
    language = code.attrs.get('class', '').removeprefix('language-') or 'text'
    return {'language': language, 'text': code.text()}

ALLOWED = {'p','ul','ol','li','strong','em','u','sup','sub','del','s','mark','br','hr','table','caption','thead','tbody','tr','th','td','h1','h2','h3','h4','pre','code','blockquote','font','details','summary'}
ALLOWED_ATTRS = {'colspan','rowspan','data-level','data-source','data-color','start','class','color'}
HEADING_SHIFT = {'h1':'h3','h2':'h3','h3':'h4','h4':'h4'}

def escape(text):
    return text.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')

def sanitized(node, assets=None, links=None):
    """Rendered output as HTML limited to an allowlist of tags and attributes. Text is re-escaped;
    links, images, scripts, styles and unknown tags are dropped (their text is kept)."""
    out = []
    for child in node.children:
        if not isinstance(child, Node):
            out.append(escape(child)); continue
        tag = HEADING_SHIFT.get(child.tag, child.tag)
        if tag in {'script', 'style', 'iframe', 'object'}:
            continue
        if tag == 'img' and assets is not None:
            src = assets.get(child.attrs.get('src', ''))
            if src:
                out.append(f'<img src="{escape(src)}" alt="{escape(child.attrs.get("alt", ""))}" loading="lazy">')
            continue
        if tag == 'a' and links is not None:
            href = links.get(child.attrs.get('href', ''))
            if href:
                out.append(f'<a href="{escape(href)}">{sanitized(child, assets, links)}</a>')
                continue
        if tag not in ALLOWED:
            out.append(sanitized(child, assets, links)); continue
        attrs = ''.join(f' {k}="{escape(v)}"' for k, v in child.attrs.items() if k in ALLOWED_ATTRS and re.fullmatch(r'[\w #.,-]*', v or ''))
        style = child.attrs.get('style', '')
        if tag == 'mark' and re.fullmatch(r'background-color:\s*(?:[a-zA-Z]+|#[0-9a-fA-F]{3,8})\s*;?', style):
            attrs += f' style="{escape(style)}"'
        if tag in {'br','hr'}:
            out.append(f'<{tag}>'); continue
        out.append(f'<{tag}{attrs}>{sanitized(child, assets, links)}</{tag}>')
    return ''.join(out)

def output_from(figure):
    """Retain exact source even for table-only examples; never reconstruct normative markup."""
    wrap = next((c for c in figure.children if isinstance(c, Node) and c.tag == 'div'), figure)
    source = next((pre for details in figure.walk('details') for pre in details.walk('pre')), None)
    snippets = [] if source is None else [{**snippet(source), 'language': 'markdown'}]
    rendered = sanitized(wrap).strip()
    return {'tables': [], 'snippets': snippets, 'rendered': rendered}

def example_from(nodes, heading, index):
    paragraphs, images, tables, snippets, rendered, bad = [], [], [], [], [], None
    for node in nodes:
        if node.tag == 'p' and not list(node.walk('img')) and node.plain():
            paragraphs.append(node.plain())
        for img in node.walk('img'):
            src = img.attrs.get('src', '')
            if re.fullmatch(r'assets/[\w. -]+\.(png|jpg|jpeg|svg|webp)', src):
                images.append(BASE + src)
        classes = node.attrs.get('class', '').split() if node.tag == 'figure' else []
        if 'exp' in classes:
            # "Expected Markdown" is the conforming output; "Non-conforming output" shows the mistake.
            output = output_from(node)
            if 'bad' in classes:
                bad = output
            else:
                tables.extend(output['tables']); snippets.extend(output['snippets'])
                if output['rendered']:
                    rendered.append(output['rendered'])
        elif 'gt' in classes:
            for table in node.walk('table'):
                rows = table_data(table)
                if rows:
                    tables.append({'label': next(node.walk('figcaption'), Node()).plain().replace('Ground truth', 'Recorded annotation'), 'rows': rows})
        if node.tag == 'pre':
            snippets.append(snippet(node))
    return {
        'id': str(index), 'name': re.sub(r'^[✅❌⚖️]\s*', '', heading).strip(),
        'kind': 'counter' if 'counter' in heading.lower() else 'sample',
        'constructed': 'constructed' in heading.lower(),
        'paragraphs': paragraphs, 'images': images, 'tables': tables, 'snippets': snippets, 'rendered': ' '.join(rendered), 'bad': bad,
    }

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pages', type=Path)
    parser.add_argument('--merge', action='store_true', help='Retain entries absent from this export')
    parser.add_argument('--assets', type=Path, help='Manifest from sync-convention-library.py')
    args = parser.parse_args()
    manifest = json.loads(args.assets.read_text()) if args.assets else None
    notes = json.loads((ROOT/'app/data/atlas.json').read_text())
    result = {}
    for note in notes:
        path = args.pages/(note['slug']+'.html')
        if not path.exists():
            continue
        html = path.read_text()
        parsed = Parser(); parsed.feed(html)
        main = next(parsed.root.walk('main'), None)
        if main is None:
            continue
        nodes = [n for n in main.children if isinstance(n, Node)]
        examples, worked = [], []
        i = 0
        while i < len(nodes):
            node = nodes[i]
            if node.tag in {'h2','h3','h4'} and re.search(r'\b(?:Sample|Counter-sample)\b', node.plain(), re.I):
                end = i + 1
                while end < len(nodes) and nodes[end].tag not in {'h2','h3','h4'}:
                    end += 1
                examples.append(example_from(nodes[i+1:end], node.plain(), len(examples)))
                i = end
                continue
            if node.tag == 'pre' and len(node.text().strip()) > 0:
                previous_heading = next((n.plain() for n in reversed(nodes[:i]) if n.tag in {'h2','h3'}), 'Worked encoding')
                worked.append({'title': previous_heading, **snippet(node)})
            i += 1
        # Two source pages append their final extract after the Related section.
        # Map these explicitly; proximity alone would attach 3t to the wrong image.
        trailing_targets = {
            'tables-3-headers-multi-row-header-tiers': 'sssa',
            'tables-3-headers-header-wrap-vs-real-tier': '3t',
        }
        if note['slug'] in trailing_targets:
            figure = next((n for n in reversed(nodes) if n.tag == 'figure'), None)
            target = next((e for e in examples if e['name'].endswith('— '+trailing_targets[note['slug']])), None)
            if figure and target and not target['tables']:
                target['tables'] = example_from([figure], target['name'], 0)['tables']
        if manifest:
            for example in examples:
                example['sourceImages'] = [dict(manifest['images'][url], sourceUrl=url) for url in example['images'] if url in manifest['images']]
        if examples or worked:
            result[note['slug']] = {'sourceUrl': BASE+path.name, 'sourceSha256': hashlib.sha256(html.encode()).hexdigest(), 'examples': examples, 'worked': worked}
    # Published bundles are served publicly, so internal library URLs stay out of them.
    def public_bundle(bundle):
        examples = [{k: v for k, v in e.items() if k != 'images'} | {'sourceImages': [{k: v for k, v in i.items() if k != 'sourceUrl'} for i in e.get('sourceImages', [])]} for e in bundle['examples']]
        return {k: v for k, v in bundle.items() if k != 'sourceUrl'} | {'examples': examples}
    output = ROOT/'public/convention-examples'
    output.mkdir(exist_ok=True)
    index_path = ROOT/'app/data/convention-examples-index.json'
    index = json.loads(index_path.read_text()) if args.merge and index_path.exists() else {}
    for slug, bundle in result.items():
        if manifest:
            bundle['sourceRevision'] = manifest.get('sourceRevision', '')
            if 'retrievedAt' in manifest:
                bundle['retrievedAt'] = manifest['retrievedAt']
        (output/(slug+'.json')).write_text(json.dumps(public_bundle(bundle), ensure_ascii=False, separators=(',',':'))+'\n')
        index[slug] = {'samples':sum(e['kind']=='sample' for e in bundle['examples']), 'counters':sum(e['kind']=='counter' for e in bundle['examples']), 'tables':sum(len(e['tables']) for e in bundle['examples']), 'encodings':len(bundle['worked'])}
    (ROOT/'app/data/convention-examples-index.json').write_text(json.dumps(index, indent=2)+'\n')
    examples = [e for n in result.values() for e in n['examples']]
    print(json.dumps({'notes':len(result),'cases':len(examples),'casesWithTables':sum(bool(e['tables']) for e in examples),'tables':sum(len(e['tables']) for e in examples),'workedEncodings':sum(len(n['worked']) for n in result.values())}, indent=2))

if __name__ == '__main__':
    main()
