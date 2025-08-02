#!/usr/bin/env node
/**
 * scripts/html2json.js
 *
 * Convert every HTML file in /static/md/ → /static/data/notes/  as JSON notes.
 *
 * Usage:
 *   node scripts/html2json.js
 * or add to package.json scripts:
 *   "gen:notes": "node scripts/html2json.js"
 */

import { readdir, readFile, stat, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC_DIR = path.resolve(__dirname, '../static/md');
const OUT_DIR = path.resolve(__dirname, '../static/data/notes');

await mkdir(OUT_DIR, { recursive: true });

/**
 * Utility: extract plain-text (with inner text) for a cheerio element
 */
const textOf = el => cheerio(el).text().trim();

/**
 * Parse a single HTML string → blocks[]
 * Handles: h1, p, img, pre>code, table
 */
function htmlToBlocks(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const blocks = [];

  $('body').children().each((_, elem) => {
    const $el = $(elem);
    const tag = $el.prop('tagName')?.toLowerCase();

    // <h1> → title block
    if (tag === 'h1') {
      blocks.push({ type: 'title', content: textOf(elem) });
    }

    // <p> → paragraph block
    else if (tag === 'p') {
      blocks.push({ type: 'p', content: $el.html().trim() });
    }

    // stand-alone <img>
    else if (tag === 'img') {
      blocks.push({
        type: 'image',
        src:  $el.attr('src'),
        alt:  $el.attr('alt') ?? ''
      });
    }

    // <pre><code> → code block
    else if (tag === 'pre' && $el.children('code').length) {
      const codeEl = $el.children('code').first();
      blocks.push({
        type: 'code',
        lang: codeEl.attr('class')?.replace('language-', '') ?? '',
        content: codeEl.text()
      });
    }

    // <table> → table block
    else if (tag === 'table') {
      const header = [];
      $el.find('thead th').each((_, th) => header.push(textOf(th)));

      const rows = [];
      $el.find('tbody tr').each((_, tr) => {
        const tds = [];
        cheerio(tr).find('td').each((__, td) => tds.push(textOf(td)));
        rows.push(tds);
      });

      blocks.push({ type: 'table', header, rows });
    }

    // TODO: add more tag handlers (blockquote, lists, etc.) as needed
  });

  return blocks;
}

async function buildHtmlNotes() {
  const files = (await readdir(SRC_DIR)).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const absPath = path.join(SRC_DIR, file);
    const { ctime, mtime } = await stat(absPath);
    const html = await readFile(absPath, 'utf8');

    const blocks = htmlToBlocks(html);
    if (!blocks.length) {
      console.warn(`⚠︎  ${file} produced 0 blocks; skipping`);
      continue;
    }

    const filename = file.replace(/\.html$/, '');
    const noteJson = {
      filename,
      name:        blocks[0]?.content ?? filename,
      description: '',
      tags:        ['notes'],
      status:      'draft',
      createdAt:   ctime.toISOString(),
      editedAt:    mtime.toISOString(),
      blocks
    };

    const outPath = path.join(OUT_DIR, `${filename}.json`);
    await writeFile(outPath, JSON.stringify(noteJson, null, 2));
    console.log(`✓ Converted ${file} → ${path.relative(process.cwd(), outPath)}`);
  }

  console.log('HTML notes build complete.');
}

buildHtmlNotes().catch(err => {
  console.error('Error building HTML notes:', err);
  process.exit(1);
});
