// SSR loader for Home (Index) — DB-backed
export const prerender = false;

import { getSetting } from '$lib/services/AppServices.js';
import { listTcodesForIndex, listRecentForIndex } from '$lib/services/userServices.js';

export async function load({ setHeaders }) {
  // Sidebar blog module (independent of syllabus)
  const blog_index = await getSetting('blog_index', null);

  // Subjects grid (slug-first)
  const subjects = await listTcodesForIndex(); // [{ slug, name, description?, image? }]
  const syllabus = subjects.map(s => ({
    // new slug-first field
    slug: s.slug,
    name: s.name,
    description: s.description ?? null,
    image: s.image ?? '/media/images/taleem.webp',

    // legacy compatibility (if your +page.svelte still uses it)
    tcodeName: s.slug
  }));

  // Recent questions feed (metadata only). If you still keep a curated list in settings,
  // uncomment the override block below.
  let questions = await listRecentForIndex({ limit: 12 });

  // Optional curated override:
  // const curated = await getSetting('index_data', null);
  // if (Array.isArray(curated) && curated.length) questions = curated;

  setHeaders({ 'cache-control': 'public, max-age=60' });
  return { syllabus, questions, blog_index };
}
