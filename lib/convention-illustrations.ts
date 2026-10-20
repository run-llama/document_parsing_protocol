/** Extract sections from the packaged, already-sanitized convention HTML.
 * Keep surrounding explanations and outputs; never manufacture an expected answer.
 */
export function additionalIllustrations(html: string, displayedImages: string[]): string[] {
  const known = new Set(displayedImages);
  return html.split(/(?=<h[1-6](?:\s|>))/).filter(section =>
    [...section.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].some(match => !known.has(match[1]))
  );
}
