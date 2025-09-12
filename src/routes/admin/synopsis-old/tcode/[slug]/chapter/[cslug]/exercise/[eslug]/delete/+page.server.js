
export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import {
  getExerciseBySlug,
  deleteExercise
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
  deleteExercise: makeAction({
    spec: {
      tcodeSlug:   R.str('tcodeSlug',   { required: true }),
      chapterSlug: R.str('chapterSlug', { required: true }),
      exerciseSlug:R.str('exerciseSlug',{ required: true })
    },
    prepare: (v) => ({
      tcodeSlug: v.tcodeSlug,
      chapterSlug: v.chapterSlug,
      exerciseSlug: v.exerciseSlug
    }),
    service: async ({ tcodeSlug, chapterSlug, exerciseSlug }) => {
      await deleteExercise(tcodeSlug, chapterSlug, exerciseSlug);
      return { tcodeSlug, chapterSlug, exerciseSlug };
    },
    success: (r) => ({
      message: 'Deleted exercise',
      ...r
    })
  })
};
