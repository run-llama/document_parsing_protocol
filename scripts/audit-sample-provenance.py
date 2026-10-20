#!/usr/bin/env python3
"""Package publication provenance only after matching each asset to cleared source bytes."""
import argparse
import hashlib
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def audit(source):
    records={row['file']:row for row in json.loads((source/'tools/provenance/manifest.json').read_text())}
    assets=json.loads((ROOT/'resources/convention-library/manifest.json').read_text())
    images=[]
    for url,asset in assets['images'].items():
        name=url.rsplit('/',1)[-1]; row=records.get(name)
        if not row or row['decision'] not in {'keep','keep_attrib'} or row['source_kind'] not in {'constructed','us_federal'}:
            raise ValueError('Sample lacks cleared publication provenance: '+name)
        if row['source_kind']=='us_federal' and not row.get('attribution'):
            raise ValueError('Federal source lacks attribution: '+name)
        data=(ROOT/'public'/asset['src'].lstrip('/')).read_bytes()
        digest=hashlib.sha256(data).hexdigest()
        if digest!=asset['sha256'] or data!=(source/row['path']).read_bytes():
            raise ValueError('Published sample differs from cleared source: '+name)
        images.append({'src':asset['src'],'sha256':digest,'sourceKind':row['source_kind'],'source':row['source'],'attribution':row.get('attribution'),'decision':row['decision']})
    actual={'/'+str(p.relative_to(ROOT/'public')) for p in (ROOT/'public/documents/conventions').iterdir() if p.is_file()}
    if actual!={i['src'] for i in images}:raise ValueError('Packaged convention images contain unreviewed or missing assets')
    return {'sourceRevision':assets['sourceRevision'],'images':images}

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('source',type=Path,nargs='?',default=ROOT/'protocol');args=p.parse_args()
    result=audit(args.source)
    (ROOT/'resources/convention-library/publication-provenance.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    from collections import Counter
    print(dict(Counter(row['sourceKind'] for row in result['images'])))
