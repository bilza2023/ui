#!/usr/bin/env node
/**
 * scripts/md2json.js
 *
 * Convert all Markdown files in `static/md/` into JSON note files in `static/data/notes/`.
 * Each output JSON will have top-level fields:
 *   filename, name, description, tags, status, createdAt, editedAt, blocks[]
 *
 * Run this before your SvelteKit build:
 *   npm run gen:notes      # assuming you add this script to package.json
 */

import { readdir, readFile, stat, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Source Markdown folder
const SRC_DIR = path.resolve(__dirname, '../static/md');

// Output JSON folder
const OUT_DIR = path.resolve(__dirname, '../static/data/notes');

await mkdir(OUT_DIR, { recursive: true });

/**
 * Map marked tokens to our simple "blocks" schema:
 *  - h1 → { type: 'title', content: text }
 *  - paragraph → { type: 'p', content: text }
 *  - code → { type: 'code', content: text }
 *  - math (lang='math') → { type: 'math', content: text }
 */
const mdTokensToBlocks = tokens =>
  tokens.flatMap(tok => {
    if (tok.type === 'heading' && tok.depth === 1) {
      return [{ type: 'title', content: tok.text }];
    }
    if (tok.type === 'paragraph') {
      return [{ type: 'p', content: tok.text }];
    }
    if (tok.type === 'code' || tok.type === 'codespan') {
      return [{ type: 'code', content: tok.text }];
    }
    if ((tok.type === 'code' && tok.lang === 'math') || tok.type === 'math') {
      return [{ type: 'math', content: tok.text }];
    }
    // ignore other token types (lists, blockquotes, etc.) for now
    return [];
  });

async function buildNotes() {
  const files = (await readdir(SRC_DIR)).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const absPath = path.join(SRC_DIR, file);
    const { ctime, mtime } = await stat(absPath);

    // Read raw markdown
    const raw = await readFile(absPath, 'utf8');

    // Extract YAML front-matter (title, description, tags, status)
    const { data: fm = {}, content: md } = matter(raw);

    // Tokenize and convert to blocks
    const tokens = marked.lexer(md, { gfm: true });
    const blocks = mdTokensToBlocks(tokens);

    // Derive metadata
    const filename    = file.replace(/\.md$/, '');
    const name        = fm.title       ?? (blocks[0]?.content ?? filename);
    const description = fm.description ?? '';
    const tags        = fm.tags        ?? ['notes'];
    const status      = fm.status      ?? 'draft';
    const createdAt   = ctime.toISOString();
    const editedAt    = mtime.toISOString();

    // Assemble JSON note
    const noteJson = {
      filename,
      name,
      description,
      tags,
      status,
      createdAt,
      editedAt,
      blocks         // <<— top-level blocks array, no deck wrapper
    };

    // Write to output folder
    const outPath = path.join(OUT_DIR, `${filename}.json`);
    await writeFile(outPath, JSON.stringify(noteJson, null, 2));
    console.log(`✓ Converted ${file} → ${path.relative(process.cwd(), outPath)}`);
  }

  console.log('Notes build complete.');
}

// Execute
buildNotes().catch(err => {
  console.error('Error building notes:', err);
  process.exit(1);
});
