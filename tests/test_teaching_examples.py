"""Publication and display contracts for the packaged example collection."""
import hashlib
import json
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]

class TeachingExamplesTests(unittest.TestCase):
    def test_teaching_references_resolve_to_local_unchanged_images_without_active_or_remote_content(self):
        data=json.loads((ROOT/'resources/convention-library/teaching-examples.json').read_text())
        notes={n['slug'] for n in json.loads((ROOT/'app/data/atlas.json').read_text())}
        self.assertTrue(set(data['conventions']) <= notes)
        for section in data['conventions'].values():
            for key in section['examples']:
                example=data['examples'][key]
                self.assertTrue(example['constructed'])
                self.assertTrue(example['snippets'])
                for image in example['sourceImages']:
                    self.assertTrue(image['src'].startswith('/teaching-examples/'))
                    raw=(ROOT/'public'/image['src'].lstrip('/')).read_bytes()
                    self.assertEqual(hashlib.sha256(raw).hexdigest(),image['sha256'])
                    if image['src'].endswith('.png'):
                        self.assertTrue(raw.startswith(b'\x89PNG\r\n\x1a\n'))
                        continue
                    self.assertTrue(image['src'].endswith('.svg'))
                    for element in ET.fromstring(raw).iter():
                        self.assertNotIn(element.tag.split('}')[-1],{'script','foreignObject','image','use'})
                        self.assertFalse(any(k.lower().startswith('on') or 'href' in k.lower() for k in element.attrib))

    def test_grounding_anchors_and_character_ranges_cannot_drift_from_the_sidecar(self):
        data=json.loads((ROOT/'resources/convention-library/teaching-examples.json').read_text())
        for example in data['examples'].values():
            geometry=example.get('geometry')
            if not geometry:continue
            page=geometry['sidecar']['pages'][0]
            expected=[]
            for item in page['items']:
                box=item['bBox']
                expected.append('<!-- el p=1 '+ ' '.join(f'{k}={v}' for k,v in box.items())+' -->\n'+item['md'])
                self.assertLessEqual(box['x']+box['w'],page['width'])
                self.assertLessEqual(box['y']+box['h'],page['height'])
                ranges=item.get('layoutAwareBbox',[])
                if geometry['level']=='element':self.assertFalse(ranges)
                else:self.assertTrue(ranges)
                previous=0
                for fine in ranges:
                    start,end=fine['startIndex'],fine['endIndex']
                    self.assertGreaterEqual(start,previous)
                    self.assertLess(start,end)
                    self.assertLessEqual(end,len(item['md']))
                    span=item['md'][start:end]
                    self.assertNotIn('\n',span)
                    self.assertFalse(span.startswith('#'))
                    if geometry['level']=='word':self.assertNotIn(' ',span)
                    self.assertGreaterEqual(fine['x'],box['x'])
                    self.assertGreaterEqual(fine['y'],box['y'])
                    self.assertLessEqual(fine['x']+fine['w'],box['x']+box['w']+1)
                    self.assertLessEqual(fine['y']+fine['h'],box['y']+box['h']+1)
                    previous=end
            self.assertEqual('\n\n'.join(expected),geometry['markdown'])
            self.assertEqual(example['snippets'][0]['text'],geometry['markdown'])
            self.assertEqual(json.loads(example['snippets'][1]['text']),geometry['sidecar'])

    def test_conventions_without_source_illustrations_do_not_regress_to_no_example(self):
        data=json.loads((ROOT/'resources/convention-library/teaching-examples.json').read_text())
        for note in json.loads((ROOT/'app/data/atlas.json').read_text()):
            slug=note['slug'];file=ROOT/'public/convention-examples'/f'{slug}.json'
            bundle=json.loads(file.read_text()) if file.exists() else {}
            content=json.loads((ROOT/'resources/convention-library/content'/f'{slug}.json').read_text())['html']
            has_image=any(e.get('sourceImages') for e in bundle.get('examples',[])) or '<img ' in content
            self.assertTrue(has_image or data['conventions'].get(slug,{}).get('examples'),slug)

    def test_every_packaged_convention_image_matches_its_cleared_publication_record(self):
        data=json.loads((ROOT/'resources/convention-library/publication-provenance.json').read_text())
        paths=set()
        for image in data['images']:
            self.assertIn(image['sourceKind'],{'constructed','us_federal'})
            self.assertIn(image['decision'],{'keep','keep_attrib'})
            if image['sourceKind']=='us_federal':self.assertTrue(image['attribution'])
            file=ROOT/'public'/image['src'].lstrip('/');paths.add(file)
            self.assertEqual(hashlib.sha256(file.read_bytes()).hexdigest(),image['sha256'])
        self.assertEqual(paths,set((ROOT/'public/documents/conventions').iterdir()))

if __name__=='__main__':unittest.main()
