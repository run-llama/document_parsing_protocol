#!/usr/bin/env python3
"""Fetch the live guide and its referenced raster images, then import matching examples.

Usage: python3 scripts/sync-convention-library.py /tmp/dpp-live-pages
Downloads only same-origin guide pages and /assets/ PNG/JPEG files. HTML is
parsed as data, never executed. Missing pages retain cached entries; missing
images fall back to annotations. Other download failures stop the import.
"""
import concurrent.futures
import os
import datetime
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
# The guide is an internal site; point DPP_LIBRARY_URL at it (with a trailing slash) before syncing.
BASE = os.environ.get('DPP_LIBRARY_URL', '')
if not BASE.endswith('/'):
    sys.exit('Set DPP_LIBRARY_URL to the guide\'s base URL, ending in a slash.')

class Images(HTMLParser):
    def __init__(self):
        super().__init__(); self.urls = set()
    def handle_starttag(self, tag, attrs):
        if tag != 'img': return
        src = dict(attrs).get('src', '')
        # Some asset names contain spaces; keep the raw name as the key and quote it when fetching.
        if re.fullmatch(r'assets/[\w. -]+\.(?:png|jpg|jpeg|svg)', src):
            self.urls.add(urllib.parse.urljoin(BASE, src))

def fetch(url):
    with urllib.request.urlopen(url, timeout=25) as response:
        if not response.url.startswith(BASE):
            raise ValueError('Unexpected redirect: '+response.url)
        return response.read()

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.hrefs = set()
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.hrefs.add(dict(attrs).get('href', ''))

def live_pages():
    """Map each note slug to the guide's current page name. Pages carry a numeric chapter prefix
    and some chapters were renamed, so match on the slug, then on its last three words."""
    parser = Links(); parser.feed(fetch(BASE).decode('utf-8'))
    pages = {re.sub(r'^\d\d-', '', href[:-5]): href for href in parser.hrefs if re.fullmatch(r'\d\d-[\w-]+\.html', href)}
    def resolve(slug):
        if slug in pages:
            return pages[slug]
        tail = '-'.join(slug.split('-')[-3:])
        matches = [href for key, href in pages.items() if key.endswith(tail)]
        return matches[0] if len(matches) == 1 else None
    return resolve

def main():
    pages = Path(sys.argv[1]); pages.mkdir(parents=True, exist_ok=True)
    notes = json.loads((ROOT/'app/data/atlas.json').read_text())
    resolve = live_pages()
    def page(note):
        filename = note['slug']+'.html'
        live = resolve(note['slug'])
        if live is None:
            print('No live example page; retain cached entry: '+filename, flush=True)
            (pages/filename).unlink(missing_ok=True)
            return set()
        try:
            data = fetch(BASE+live)
        except urllib.error.HTTPError as error:
            if error.code == 404:
                print('No live example page; retain cached entry: '+filename, flush=True)
                (pages/filename).unlink(missing_ok=True)
                return set()
            raise RuntimeError('Could not refresh '+BASE+live) from error
        (pages/filename).write_bytes(data)
        parser = Images(); parser.feed(data.decode('utf-8'))
        return parser.urls
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        urls = set().union(*pool.map(page, notes))
    print(f'Checked {len(notes)} source pages; downloading {len(urls)} images.', flush=True)
    assets = ROOT/'public/documents/conventions'; assets.mkdir(parents=True, exist_ok=True)
    def asset(url):
        try:
            data = fetch(urllib.parse.quote(url, safe=':/'))
        except urllib.error.HTTPError as error:
            if error.code == 404:
                print('Missing image: '+url, flush=True)
                return None
            raise
        head = data.lstrip()[:200].lower()
        is_svg = url.endswith('.svg') and (head.startswith(b'<svg') or head.startswith(b'<?xml')) and b'<script' not in data.lower()
        if not (data.startswith(b'\x89PNG\r\n\x1a\n') or data.startswith(b'\xff\xd8\xff') or is_svg):
            raise ValueError('Not a PNG/JPEG/SVG: '+url)
        digest = hashlib.sha256(data).hexdigest()
        filename = digest[:12]+'-'+Path(url.rsplit('/', 1)[-1]).name.replace(' ', '-')
        (assets/filename).write_bytes(data)
        return url, {'src':'/documents/conventions/'+filename, 'sha256':digest, 'bytes':len(data)}
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        images = dict(item for item in pool.map(asset, sorted(urls)) if item)
    manifest = {'source':BASE, 'retrievedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(), 'images':images}
    # The manifest records the guide's URLs, so it stays outside public/ and out of git.
    manifest_path = ROOT/'resources/convention-library/manifest.json'
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2)+'\n')
    subprocess.run([sys.executable, str(ROOT/'scripts/import-convention-examples.py'),str(pages),'--assets',str(manifest_path),'--merge'],check=True)
    used = {asset['src'] for bundle in (ROOT/'public/convention-examples').glob('*.json') for example in json.loads(bundle.read_text())['examples'] for asset in example.get('sourceImages', [])}
    for asset_data in images.values():
        if asset_data['src'] not in used:
            (ROOT/'public'/asset_data['src'].lstrip('/')).unlink(missing_ok=True)
    images = {url: value for url, value in images.items() if value['src'] in used}
    manifest['images'] = images
    manifest_path.write_text(json.dumps(manifest, indent=2)+'\n')
    print(f'Saved {len(images)} source images ({sum(x["bytes"] for x in images.values())/1024/1024:.1f} MiB).',flush=True)

if __name__ == '__main__': main()
