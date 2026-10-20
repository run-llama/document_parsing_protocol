#!/usr/bin/env python3
"""Build and package the repository-local protocol sources, RFC, and skills."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / 'resources/convention-library'


def module(name, filename):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).with_name(filename))
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


IMPORTER = module('examples', 'import-convention-examples.py')


def frontmatter(text):
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).split('\n'):
        if ':' in line and not line.startswith(' '):
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip().strip('"')
    return meta, text[m.end():]



def slug(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def clean(text):
    text = re.sub(r'\[\[([^\]|]+)(?:\|([^\]]+))?\]\]', lambda m: m[2] or m[1], text)
    return re.sub(r'[*`]', '', text).strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Build, then fail if tracked generated artifacts changed')
    args = parser.parse_args()
    source = ROOT / 'protocol'
    for command in [('lint_protocol.py',), ('provenance/build_manifest.py', '--check'), ('build_site.py', '--public')]:
        subprocess.run([sys.executable, str(source / 'tools' / command[0]), *command[1:]], check=True)
    spec = importlib.util.spec_from_file_location('protocol_source', source / 'tools/protocol.py')
    model = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = model
    spec.loader.exec_module(model)
    revision = model.revision()
    site = source / 'site'
    if 'id="cB"' in (site / 'rfc.html').read_text():
        raise ValueError('Build the source site with --public: internal decision records must not ship')
    registry = {r['source']: r for r in json.loads((site / 'rules.json').read_text())}
    search = json.loads((site / 'search.json').read_text())
    aliases = json.loads((LIBRARY / 'slug-aliases.json').read_text())
    sources = {}
    for path in sorted(source.glob('[0-9A-D]* */**/*.md')):
        if path.relative_to(source).parts[0].startswith('B '):
            continue
        rel = path.relative_to(source).as_posix()
        meta, body = frontmatter(path.read_text())
        sources[slug(rel[:-3]) + '.html'] = (path, rel, meta, body)
    entries = []
    digest = hashlib.sha256()
    for item in search:
        if item['u'] not in sources:
            continue
        path, rel, meta, body = sources[item['u']]
        rule = registry.get(rel)
        if rule and rule['status'] != meta.get('status'):
            raise ValueError('Source site is stale: ' + rel)
        digest.update(rel.encode()); digest.update(path.read_bytes())
        area = re.sub(r'^[\dA-Z]+\s+', '', path.relative_to(source).parts[0])
        area = {'Headings and page structure':'Page structure', 'Producing ground truth':'Ground truth'}.get(area, area)
        if area == 'Images and diagrams':
            area = 'Diagrams' if '2 - Diagrams' in rel else 'Images'
        tag = aliases.get(rel, slug(rel[:-3]))
        requirement = rule['requirement'] if rule else next((line for line in body.splitlines() if line.strip() and not line.startswith(('#', '>'))), meta['title'])
        entries.append(dict(slug=tag, title=meta['title'], area=area, sub=None,
                            badge=meta.get('status', 'reference'), rule=clean(requirement),
                            situation='', samples=0, counters=0, related=[],
                            rule_id=meta.get('rule_id', ''), scope=meta.get('scope', ''),
                            tags=rule['tags'] if rule else [], source=rel,
                            _body=body, _url=item['u']))
    if set(registry) - {entry['source'] for entry in entries}:
        raise ValueError('Not every source rule was imported')
    by_name = {Path(e['source']).stem: e for e in entries}
    by_name.update({e['title']: e for e in entries})
    manifest = {'source':'protocol', 'images':{}}
    links = {e['_url']: '/guide/' + e['slug'] for e in entries}
    with tempfile.TemporaryDirectory(prefix='protocol-pages-') as temp:
        pages = Path(temp)
        for entry in entries:
            html = (site / entry['_url']).read_text()
            (pages / (entry['slug'] + '.html')).write_text(html)
            parsed = IMPORTER.Parser(); parsed.feed(html)
            main_node = next(parsed.root.walk('main'))
            if entry['rule_id']:
                callout = next(node for node in main_node.walk('div') if 'co' in node.attrs.get('class', '').split())
                entry['rule'] = ' '.join(node.plain() for node in callout.children if isinstance(node, IMPORTER.Node) and 'co-t' not in node.attrs.get('class', '').split())
            for image in main_node.walk('img'):
                src = image.attrs.get('src', '')
                if not src.startswith('assets/'):
                    continue
                asset = site / src
                if not asset.is_file() or asset.resolve().parent != (site / 'assets').resolve():
                    raise ValueError('Missing or invalid source asset: ' + src)
                data = asset.read_bytes(); sha = hashlib.sha256(data).hexdigest()
                filename = sha[:12] + '-' + asset.name.replace(' ', '-')
                dest = ROOT / 'public/documents/conventions' / filename
                dest.parent.mkdir(parents=True, exist_ok=True); dest.write_bytes(data)
                manifest['images'][IMPORTER.BASE + src] = {'src':'/documents/conventions/' + filename, 'sha256':sha, 'bytes':len(data)}
            assets = {url.removeprefix(IMPORTER.BASE): value['src'] for url, value in manifest['images'].items()}
            write_json(LIBRARY / 'content' / (entry['slug'] + '.json'), {'html': IMPORTER.sanitized(main_node, assets, {**links, **assets})})
            related_body = entry['_body'].split('## Related', 1)[-1] if '## Related' in entry['_body'] else ''
            entry['related'] = [{'title':by_name[name]['title'], 'slug':by_name[name]['slug']} for name in re.findall(r'\[\[([^\]|#]+)(?:[^\]]*)\]\]', related_body) if name in by_name]
        snapshot = {'sourceRepository':'run-llama/document_parsing_protocol', 'sourceDirectory':'protocol', 'sourceRevision':revision, 'sourceSha256':digest.hexdigest(), 'notes':len(entries), 'rules':len(registry)}
        manifest.update(sourceRevision=revision, sourceSha256=digest.hexdigest())
        write_json(LIBRARY / 'manifest.json', manifest)
        write_json(ROOT / 'app/data/atlas.json', [{k:v for k,v in entry.items() if not k.startswith('_')} for entry in entries])
        subprocess.run([sys.executable, str(ROOT/'scripts/import-convention-examples.py'), str(pages), '--assets', str(LIBRARY/'manifest.json')],check=True)
    index=json.loads((ROOT/'app/data/convention-examples-index.json').read_text())
    for entry in entries:
        entry.update(samples=index.get(entry['slug'],{}).get('samples',0), counters=index.get(entry['slug'],{}).get('counters',0))
    write_json(ROOT/'app/data/atlas.json',[{k:v for k,v in e.items() if not k.startswith('_')} for e in entries])
    write_json(ROOT/'app/data/protocol-snapshot.json',snapshot)
    # Preserve the complete source RFC, including images, section anchors and example toggles.
    protocol = ROOT / 'public/protocol'
    protocol.mkdir(exist_ok=True)
    assets = {url.removeprefix(IMPORTER.BASE): value['src'] for url, value in manifest['images'].items()}
    rfc_html = (site / 'rfc.html').read_text()
    rfc_md = (site / 'rfc.md').read_text()
    for src, target in assets.items():
        rfc_html = rfc_html.replace('src="' + src + '"', 'src="' + target + '"')
        rfc_html = rfc_html.replace('href="' + src + '"', 'href="' + target + '"')
        rfc_md = rfc_md.replace('](' + src + ')', '](' + target + ')')
    rfc_html = rfc_html.replace('href="index.html"', 'href="/guide"')
    rfc_html = rfc_html.replace('href="skills/index.html"', 'href="/#adopt"')
    rfc_md = rfc_md.replace('](skills/index.html)', '](/#adopt)')
    (protocol / 'rfc.html').write_text(rfc_html)
    (protocol / 'rfc.md').write_text(rfc_md)
    shutil.copyfile(site / 'style.css', protocol / 'style.css')
    # Exact current protocol and generated skills: no manually maintained starter rules.
    resources=ROOT/'resources/dpp-parse'
    reference = (site/'rfc.md').read_text()
    reference = re.sub(r'!\[([^\]]*)\]\(assets/[^)]*\)', r'*(Source image \1 is available in the guide; this download is a text-only reference.)*', reference)
    (resources/'references/conventions.md').write_text(reference)
    shutil.copyfile(site/'skills/document-protocol-check/SKILL.md',resources/'references/qa-checklist.md')
    generator=(site/'skills/document-protocol-generate/SKILL.md').read_text().replace('name: document-protocol-generate','name: dpp-parse',1)
    (resources/'SKILL.md').write_text(generator)
    subprocess.run([sys.executable,str(ROOT/'scripts/build-dpp-starter.py')],check=True)
    # Remove only obsolete generated content, never hand-authored assets or files.
    for path in (ROOT/'public/convention-examples').glob('*.json'):
        if path.stem not in index:path.unlink()
    for path in (LIBRARY/'content').glob('*.json'):
        if path.stem not in {e['slug'] for e in entries}:path.unlink()
    subprocess.run([sys.executable, str(ROOT/'scripts/audit-sample-provenance.py'), str(source)], check=True)
    print(json.dumps(snapshot,indent=2))
    if args.check:
        changes = subprocess.check_output(['git', 'status', '--porcelain', '--untracked-files=all', '--', 'app/data', 'resources', 'public'], cwd=ROOT, text=True)
        if changes:
            raise SystemExit('Generated artifacts are stale; rebuild and commit them:\n' + changes)


if __name__ == '__main__':
    main()
