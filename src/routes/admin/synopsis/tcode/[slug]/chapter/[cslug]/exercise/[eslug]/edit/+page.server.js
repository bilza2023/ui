export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import {
  getExerciseBySlug,
  updateExercise
} from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const tcodeSlug = params.slug;
  const chapterSlug = params.cslug;
  const exerciseSlug = params.eslug;

  let exercise;
  try {
    exercise = await getExerciseBySlug(tcodeSlug, chapterSlug, exerciseSlug);
  } catch {
    throw error(404, 'Exercise not found');
  }

  const tcode = { slug: exercise.chapter.tcode.slug, name: exercise.chapter.tcode.name };
  const chapter = { slug: exercise.chapter.slug, name: exercise.chapter.name };
  const ex = {
    slug: exercise.slug,
    name: exercise.name,
    sortOrder: Number(exercise.sortOrder ?? 0)
  };

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, chapter, exercise: ex };
}

export const actions = {
  updateExercise: makeAction({
    spec: {
      tcodeSlug:    R.str('tcodeSlug',    { required: true }),
      chapterSlug:  R.str('chapterSlug',  { required: true }),
      exerciseSlug: R.str('exerciseSlug', { required: true }),
      name:         R.str('name',         { required: true, trim: true }),
      sortOrder:    R.str('sortOrder',    { trim: true }) // optional, comes as string
    },
    prepare: (v) => {
      const name = v.name.trim();
      const so = v.sortOrder?.trim();
      const parsed = so === '' || so === undefined ? undefined : Number.parseInt(so, 10);
      const sortOrder = Number.isNaN(parsed) ? undefined : parsed;

      const updates = { name, ...(sortOrder !== undefined ? { sortOrder } : {}) };
      return {
        tcodeSlug: v.tcodeSlug,
        chapterSlug: v.chapterSlug,
        exerciseSlug: v.exerciseSlug,
        updates
      };
    },
    service: async ({ tcodeSlug, chapterSlug, exerciseSlug, updates }) => {
      // slug is immutable — only updating name/sortOrder
      const saved = await updateExercise(tcodeSlug, chapterSlug, exerciseSlug, updates);
      return { saved, tcodeSlug, chapterSlug, exerciseSlug, updates };
    },
    success: (_r, v) => ({
      ok: true,
      message: `Updated exercise "${v.updates.name}"`,
      tcodeSlug: v.tcodeSlug,
      chapterSlug: v.chapterSlug,
      exerciseSlug: v.exerciseSlug,
      updates: v.updates
    })
  })
};
