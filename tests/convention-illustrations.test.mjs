import assert from 'node:assert/strict';
import test from 'node:test';
import { additionalIllustrations } from '../lib/convention-illustrations.ts';

test('inline illustrations retain their caption and expected output without repeating existing sample sections', () => {
  const html = '<h3>Existing sample</h3><p><img src="/known.png"></p><h3>Inline example</h3><p>Read the dotted connection.</p><p><img src="/extra.png"></p><pre>Expected encoding</pre><h3>Related</h3><p>Other rules</p>';
  assert.deepEqual(additionalIllustrations(html, ['/known.png']), ['<h3>Inline example</h3><p>Read the dotted connection.</p><p><img src="/extra.png"></p><pre>Expected encoding</pre>']);
});

test('a convention with only already-displayed images adds no duplicate illustration panel', () => {
  assert.deepEqual(additionalIllustrations('<h3>Sample</h3><img src="/known.png">', ['/known.png']), []);
  assert.deepEqual(additionalIllustrations('<p>Text only</p>', []), []);
});
