export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { getChapterBySlug, deleteChapter } from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const { slug: tcodeSlug, cslug: chapterSlug } = params;

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug, { includeExercises: true })
    .catch(() => null);
  if (!chapter) throw error(404, 'Chapter not found');

  const tcode = { slug: chapter.tcode.slug, name: chapter.tcode.name };
  const chap  = { slug: chapter.slug, name: chapter.name };

  const exerciseCount =
    Array.isArray(chapter.exercises)
      ? chapter.exercises.length
      : Number(chapter._count?.exercises ?? 0);

  const hasExercises = exerciseCount > 0;

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, chapter: chap, exerciseCount, hasExercises };
}

export const actions = {
  deleteChapter: makeAction({
    spec: {
      tcodeSlug:   R.str('tcodeSlug',   { required: true }),
      chapterSlug: R.str('chapterSlug', { required: true })
    },
    prepare: (v) => ({ tcodeSlug: v.tcodeSlug, chapterSlug: v.chapterSlug }),
    service: async ({ tcodeSlug, chapterSlug }) => {
      const c = await getChapterBySlug(tcodeSlug, chapterSlug, { includeExercises: true });
      if (!c) throw error(404, 'Chapter not found');

      const count =
        Array.isArray(c.exercises) ? c.exercises.length : Number(c._count?.exercises ?? 0);
      if (count > 0) {
        const e = new Error(`Cannot delete "${c.name}" — it has ${count} exercise(s).`);
        e.code = 'VALIDATION';
        throw e; // let makeAction return a failure instead of 500
      }

      await deleteChapter(tcodeSlug, chapterSlug);
      return { tcodeSlug, chapterSlug, name: c.name };
    },
    success: (r) => ({
      message: `Deleted chapter "${r.name}"`,
      ...r
    })
  })
};
