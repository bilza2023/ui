export const prerender = false;

import {
  getExercise,
  getChapter,
  getTcode,
  updateExercise,
  deleteExercise
} from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { error } from '@sveltejs/kit';

export async function load({ url, setHeaders }) {
  const exerciseId = Number.parseInt(url.searchParams.get('exerciseId') || '', 10);
  if (!exerciseId) throw error(400, 'exerciseId required');

  const exercise = await getExercise(exerciseId);
  if (!exercise) throw error(404, 'exercise not found');

  const chapter = await getChapter(exercise.chapterId);
  const tcode   = chapter ? await getTcode(chapter.tcodeId) : null;

  setHeaders({ 'cache-control': 'public, max-age=0' });
  return { exercise, chapter, tcode };
}

export const actions = {
  save: makeAction({
    spec: {
      id:        R.intId('id', { required: true }),         // exerciseId
      chapterId: R.intId('chapterId', { required: true }),
      slug:      R.str('slug', { trim: true }),             // preserved, hidden
      name:      R.str('name', { required: true, trim: true }),
      sortOrder: R.num('sortOrder')
    },
    prepare: (v) => ({
      id: v.id,
      data: {
        chapterId: v.chapterId,
        slug: v.slug || undefined,
        name: v.name.trim(),
        sortOrder: Number.isFinite(v.sortOrder) ? v.sortOrder : 0
      }
    }),
    service: ({ id, data }) => updateExercise(id, data),
    success: (_r, v) => ({ ok: true, message: `Updated ${v.name}`, id: v.id })
  }),

  del: makeAction({
    spec: { id: R.intId('id', { required: true }) },
    service: ({ id }) => deleteExercise(id),
    success: (_r, v) => ({ ok: true, deleted: true, id: v.id })
  })
};
