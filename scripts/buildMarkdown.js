#!/usr/bin/env node
// Build all .md in /static/md → /static/html_content/*.html

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC_DIR  = path.resolve(__dirname, '../static/md');
const OUT_DIR  = path.resolve(__dirname, '../static/html_content');

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter(f => f.endsWith('.md'));

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const outPath = path.join(OUT_DIR, file.replace(/\.md$/, '.html'));

  const md  = await readFile(srcPath, 'utf8');
  const htmlBody = marked.parse(md);

  // simple HTML wrapper – tweak or remove as you like
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${path.basename(file, '.md')}</title>
  <link rel="stylesheet" href="/data/global-blog.css">
</head>
<body>
<main>
${htmlBody}
</main>
</body>
</html>`;

  await writeFile(outPath, fullHtml, 'utf8');
  console.log(`✓ ${file} → ${path.relative('.', outPath)}`);
}

console.log('Markdown build complete.');
