/**
 * Minimal frontmatter parser for MDX files.
 * Extracts YAML frontmatter between --- delimiters.
 */

export function frontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fm = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^"|"$/g, '');
      fm[key] = value;
    }
  }
  return fm;
}
