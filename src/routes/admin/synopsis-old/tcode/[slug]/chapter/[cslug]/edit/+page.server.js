export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { getChapterBySlug, updateChapter } from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const { slug: tcodeSlug, cslug: chapterSlug } = params;

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug, { includeExercises: true }).catch(() => null);
  if (!chapter) throw error(404, 'Chapter not found');

  const tcode = { slug: chapter.tcode.slug, name: chapter.tcode.name };
  const chap = {
    slug: chapter.slug,
    name: chapter.name,
    sortOrder: Number(chapter.sortOrder ?? 0),
    exerciseCount: Array.isArray(chapter.exercises) ? chapter.exercises.length : 0
  };

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, chapter: chap };
}

export const actions = {
  updateChapter: makeAction({
    spec: {
      tcodeSlug:   R.str('tcodeSlug',   { required: true }),
      chapterSlug: R.str('chapterSlug', { required: true }),
      name:        R.str('name',        { required: true, trim: true }),
      sortOrder:   R.str('sortOrder',   { trim: true }) // optional string from form
    },
    prepare: (v) => {
      const name = v.name.trim();
      const so = v.sortOrder?.trim();
      const parsed = so === '' || so === undefined ? undefined : Number.parseInt(so, 10);
      const sortOrder = Number.isNaN(parsed) ? undefined : parsed;

      const updates = { name, ...(sortOrder !== undefined ? { sortOrder } : {}) };
      return { tcodeSlug: v.tcodeSlug, chapterSlug: v.chapterSlug, updates };
    },
    service: async ({ tcodeSlug, chapterSlug, updates }) => {
      const saved = await updateChapter(tcodeSlug, chapterSlug, updates);
      return { saved, tcodeSlug, chapterSlug, updates };
    },
    success: (_r, v) => ({
      ok: true,
      message: `Updated chapter "${v.updates.name}"`,
      tcodeSlug: v.tcodeSlug,
      chapterSlug: v.chapterSlug,
      updates: v.updates
    })
  })
};
