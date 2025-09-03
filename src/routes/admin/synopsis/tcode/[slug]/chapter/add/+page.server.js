export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import { getTcodeBySlug, createChapter } from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const tcodeSlug = params.slug;

  const t = await getTcodeBySlug(tcodeSlug, { includeChapters: true });
  if (!t) throw error(404, 'Tcode not found');

  const tcode = {
    slug: t.slug,
    name: t.name,
    description: t.description ?? '',
    image: t.image ?? '',
    chapterCount: Array.isArray(t.chapters) ? t.chapters.length : 0
  };

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode };
}

export const actions = {
  addChapter: makeAction({
    spec: {
      tcodeSlug: R.str('tcodeSlug', { required: true }),
      name:      R.str('name',      { required: true, trim: true }),
      sortOrder: R.str('sortOrder', { trim: true }) // optional, string from form
    },
    prepare: (v) => {
      const name = v.name.trim();
      const slug = SLUG(name);

      const so = v.sortOrder?.trim();
      const parsed = so === '' || so === undefined ? undefined : Number.parseInt(so, 10);
      const sortOrder = Number.isNaN(parsed) ? undefined : parsed;

      return { tcodeSlug: v.tcodeSlug, name, slug, sortOrder };
    },
    service: async (payload) => {
      // expects { tcodeSlug, name, slug, sortOrder? }
      const saved = await createChapter(payload);
      return { saved };
    },
    success: (_result, v) => ({
      ok: true,
      message: `Added chapter "${v.name}"`,
      tcodeSlug: v.tcodeSlug,
      chapter: {
        slug: v.slug,
        name: v.name,
        sortOrder: v.sortOrder ?? 0,
        exerciseCount: 0
      }
    })
  })
};
