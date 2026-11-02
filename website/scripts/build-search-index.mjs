/**
 * Builds a static Orama search index from all MDX documentation pages.
 * Run: node scripts/build-search-index.mjs
 * Output: public/search-index.json
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { frontmatter } from './frontmatter.mjs';

const DOCS_DIR = join(process.cwd(), 'content', 'docs');
const OUTPUT = join(process.cwd(), 'public', 'search-index.json');

function walkDir(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

function extractContent(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const fm = frontmatter(raw);
  // Strip frontmatter
  const content = raw.replace(/^---[\s\S]*?---\n/, '');
  // Strip markdown/MDX syntax for search
  const plain = content
    .replace(/```[\s\S]*?```/g, ' ')
    /`[^`]*`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_`~\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    title: fm.title || '',
    description: fm.description || '',
    content: plain,
    url: '/docs' + filePath
      .replace(DOCS_DIR, '')
      .replace('/index.mdx', '')
      .replace('.mdx', ''),
  };
}

const pages = walkDir(DOCS_DIR).map(extractContent);

const index = {
  createdAt: new Date().toISOString(),
  pageCount: pages.length,
  pages,
};

import { writeFileSync } from 'fs';
writeFileSync(OUTPUT, JSON.stringify(index, null, 2));
console.log(`[search-index] Built index with ${pages.length} pages -> ${OUTPUT}`);
