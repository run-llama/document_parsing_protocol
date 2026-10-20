"""Regression checks for persistent guideline references and generated search artifacts.

Run: uv run --with mistune python tools/test_rule_metadata.py
"""
import json
import subprocess
import tempfile
import unittest
from dataclasses import replace
from pathlib import Path

import build_site
import protocol as P


class RuleMetadataTests(unittest.TestCase):
    def test_metadata_rejects_broken_references_but_survives_moves(self):
        note = P.Note('09 Tables/Example.md', 'Example', {
            'title': 'Example', 'status': 'rule', 'rule_id': 'tables-example',
            'tags': '[tables, whitespace]',
        }, '')
        P.validate_metadata([note])
        renamed = replace(note, rel='05 Layout/Renamed.md', number='5.99',
                          meta={**note.meta, 'title': 'Renamed'})
        self.assertEqual(note.rule_id, renamed.rule_id)
        P.validate_metadata([renamed])
        for changes in ({'rule_id': ''}, {'rule_id': 'Tables Example'},
                        {'tags': 'tables'}, {'tags': '[tables, tables]'}):
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                P.validate_metadata([replace(note, meta={**note.meta, **changes})])
        with self.assertRaisesRegex(ValueError, 'duplicate rule_id'):
            P.validate_metadata([note, renamed])

    def test_build_keeps_references_in_catalog_search_rfc_and_skills(self):
        """Catch dropped frontmatter metadata at every generated artifact boundary."""
        with tempfile.TemporaryDirectory() as scratch:
            output = Path(scratch)
            build_site.build(str(output), public=True)
            notes = [n for n in P.load() if n.rule_id and not n.internal]
            catalog = json.loads((output / 'rules.json').read_text())
            indexed = {n['rule_id']: n for n in json.loads((output / 'search.json').read_text())}
            self.assertEqual({n.rule_id for n in notes}, {n['rule_id'] for n in catalog})
            rfc = (output / 'rfc.md').read_text()
            checker = (output / 'skills/document-protocol-check/SKILL.md').read_text()
            for note in notes:
                entry = indexed[note.rule_id]
                self.assertEqual(note.tags, entry['tags'])
                self.assertIn(note.rule_id, (output / entry['u']).read_text())
                self.assertIn(note.rule_id, rfc)
                if note.chapter != '1' and note.skills():
                    self.assertIn(note.rule_id, checker)
            # Execute the shipped browser script against the built artifact only.
            # Tokens occur only in metadata, so title/body search cannot mask a failure.
            script = r'''
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const root = process.argv[1];
const html = fs.readFileSync(root + '/index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const entries = JSON.parse(fs.readFileSync(root + '/search.json', 'utf8'));
const entry = entries.find(p => p.rule_id);
entry.rule_id = 'test-metadata-only-identity'; entry.tags = ['catalog-only-sentinel'];
const q = {value: '', addEventListener: (_, f) => q.input = f};
const res = {children: [], appendChild: n => res.children.push(n)};
Object.defineProperty(res, 'innerHTML', {set: () => res.children = []});
vm.runInNewContext(script, {
  localStorage: {getItem: () => null},
  document: {querySelectorAll: () => [], getElementById: id => id === 'q' ? q : res,
             createElement: () => ({})},
  fetch: async () => ({json: async () => entries})
});
setImmediate(() => {
  for (const term of [entry.rule_id, entry.tags[0]]) {
    q.value = term; q.input();
    assert.equal(res.children.length, 1, term);
    assert.ok(res.children[0].innerHTML.includes(entry.u), term);
  }
});
'''
            subprocess.run(['node', '-e', script, str(output)], check=True)


if __name__ == '__main__':
    unittest.main()
