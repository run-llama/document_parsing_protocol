import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('examples', ROOT / 'scripts/import-convention-examples.py')
examples = importlib.util.module_from_spec(spec)
spec.loader.exec_module(examples)


class ProtocolImportTests(unittest.TestCase):
    def test_table_only_output_keeps_caption_chart_marker_indent_and_colour_in_exact_source(self):
        """The old table projection silently discarded normative markup and the source toggle."""
        source = '<table data-source="chart"><caption>Results</caption><tr><td data-level="2"><font color="red">Loss</font></td><td><mark style="background-color: red"></mark></td></tr></table>'
        parser = examples.Parser()
        parser.feed('<figure><figcaption>Expected Markdown</figcaption><div>' + source + '</div><details><pre><code>' + examples.escape(source) + '</code></pre></details></figure>')
        output = examples.output_from(next(parser.root.walk('figure')))
        self.assertEqual(output['snippets'][0]['text'], source)
        for markup in ['<caption>Results</caption>', 'data-source="chart"', 'data-level="2"', '<font color="red">', 'background-color: red']:
            self.assertIn(markup, output['rendered'])

    def test_colour_support_does_not_admit_scripts_event_handlers_or_css_urls(self):
        parser = examples.Parser()
        parser.feed('<div><script>alert(1)</script><font color="red" onclick="alert(2)">Safe</font><mark style="background-color: url(https://evil.example)">value</mark><img src=x onerror=alert(3)></div>')
        output = examples.sanitized(parser.root)
        self.assertIn('<font color="red">Safe</font>', output)
        for forbidden in ['script', 'alert(', 'onclick', 'onerror', 'evil.example', '<img']:
            self.assertNotIn(forbidden, output)

    def test_inline_illustrations_and_internal_links_survive_full_content_import(self):
        """Illustrations outside Sample headings used to disappear from full conventions."""
        parser = examples.Parser()
        parser.feed('<p><img src="assets/fine-print.png" alt="Fine print"><a href="principles.html">Principles</a><img src="https://outside.example/image.png"></p>')
        output = examples.sanitized(parser.root, {'assets/fine-print.png': '/documents/conventions/fine-print.png'}, {'principles.html': '/guide/principles'})
        self.assertIn('src="/documents/conventions/fine-print.png"', output)
        self.assertIn('href="/guide/principles"', output)
        self.assertNotIn('outside.example', output)

    def test_full_rfc_links_and_images_resolve_inside_the_deployed_artifact(self):
        """Copied RFCs must not retain source-checkout assets or broken section links."""
        parser = examples.Parser()
        parser.feed((ROOT / 'public/protocol/rfc.html').read_text())
        nodes = list(parser.root.walk('a'))
        def descendants(node):
            for child in node.children:
                if isinstance(child, examples.Node):
                    yield child
                    yield from descendants(child)
        ids = {node.attrs['id'] for node in descendants(parser.root) if 'id' in node.attrs}
        self.assertNotIn('cB', ids, 'Internal decision appendix must not ship in the public RFC')
        for link in nodes:
            href = link.attrs.get('href', '')
            if href.startswith('#'):
                self.assertIn(href[1:], ids, href)
            elif href and not href.startswith(('https:', 'http:', '/guide', '/#')):
                target = ROOT / 'public' / href.lstrip('/') if href.startswith('/') else ROOT / 'public/protocol' / href
                self.assertTrue(target.is_file(), href)
        for node in parser.root.walk('img'):
            src = node.attrs['src']
            self.assertTrue(src.startswith('/documents/conventions/'), src)
            self.assertTrue((ROOT / 'public' / src.lstrip('/')).is_file(), src)

    def test_imported_routes_have_packaged_content(self):
        """A new subject or stale link must not disappear from navigation or fail at runtime."""
        notes = json.loads((ROOT / 'app/data/atlas.json').read_text())
        slugs = {n['slug'] for n in notes}
        self.assertEqual(len(slugs), len(notes))
        aliases = json.loads((ROOT / 'resources/convention-library/slug-aliases.json').read_text())
        self.assertTrue(set(aliases.values()) <= slugs)
        for note in notes:
            self.assertTrue((ROOT / 'resources/convention-library/content' / (note['slug'] + '.json')).is_file(), note['slug'])
            self.assertTrue(all(link['slug'] in slugs for link in note['related']))
        snapshot = json.loads((ROOT / 'app/data/protocol-snapshot.json').read_text())
        index = json.loads((ROOT / 'app/data/convention-examples-index.json').read_text())
        self.assertTrue(set(index) <= slugs)
        for slug in index:
            bundle = json.loads((ROOT / 'public/convention-examples' / (slug + '.json')).read_text())
            self.assertEqual(bundle['sourceRevision'], snapshot['sourceRevision'])
            for example in bundle['examples']:
                for asset in example.get('sourceImages', []):
                    self.assertTrue((ROOT / 'public' / asset['src'].lstrip('/')).is_file(), asset['src'])
        self.assertEqual(snapshot['notes'], len(notes))
        self.assertEqual(snapshot['rules'], sum(bool(n['rule_id']) for n in notes))


if __name__ == '__main__':
    unittest.main()
