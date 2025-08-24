// src/routes/notes2/[filename]/+page.js
import { error } from '@sveltejs/kit';

// Eagerly bundle every HTML note as a raw string at build time.
// src/routes/notes2/[filename]/+page.js
const files = import.meta.glob('/src/routes/notes/*.html', { as: 'raw', eager: true });


// Build a slug → html map once.
const bySlug = Object.fromEntries(
  Object.entries(files).map(([path, html]) => {
    const slug = path.split('/').pop().replace('.html', '');
    return [slug, html];
  })
);

export function load({ params }) {
  const html = bySlug[params.filename];
  if (!html) throw error(404, `Note not found: ${params.filename}`);
  return { html, filename: params.filename };
}
