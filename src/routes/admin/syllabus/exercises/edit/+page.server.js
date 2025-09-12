
export const prerender = false;

import { getExercise, getChapter, getTcode, updateExercise } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import { error } from '@sveltejs/kit';

export async function load({ url, setHeaders }) {
  const id = Number.parseInt(url.searchParams.get('id') || '', 10);
  if (!id) throw error(400, 'id required');

  const exercise = await getExercise(id);
  if (!exercise) throw error(404, 'exercise not found');

  const chapter = await getChapter(exercise.chapterId);
  const tcode = await getTcode(chapter.tcodeId);

  setHeaders({ 'cache-control': 'public, max-age=0' });
  return { exercise, chapter, tcode };
}

export const actions = {
  save: makeAction({
    spec: {
      id:        R.intId('id',   { required: true }),
      name:      R.str('name',   { required: true, trim: true }),
      sortOrder: R.num('sortOrder')
    },
    prepare: (v) => {
      const data = { slug: SLUG(v.name), name: v.name };
      if (Number.isFinite(v.sortOrder)) data.sortOrder = v.sortOrder;
      return { id: v.id, data };
    },
    service: ({ id, data }) => updateExercise(id, data),
    success: (_r, v) => ({ ok:true, message:'Updated exercise', id:v.id })
  })
};
