export const prerender = false;

import { getChapter, getTcode, createExercise } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import { error } from '@sveltejs/kit';

export async function load({ url, setHeaders }) {
  const chapterId = Number.parseInt(url.searchParams.get('chapterId') || '', 10);
  if (!chapterId) throw error(400, 'chapterId required');

  const chapter = await getChapter(chapterId);
  if (!chapter) throw error(404, 'chapter not found');

  const tcode = await getTcode(chapter.tcodeId);

  setHeaders({ 'cache-control': 'public, max-age=0' });
  return { chapter, tcode };
}

export const actions = {
  add: makeAction({
    spec: {
      chapterId: R.intId('chapterId', { required: true }),
      name:      R.str('name',        { required: true, trim: true }),
      sortOrder: R.num('sortOrder')
    },
    prepare: (v) => {
      const out = { chapterId: v.chapterId, slug: SLUG(v.name), name: v.name };
      if (Number.isFinite(v.sortOrder)) out.sortOrder = v.sortOrder;
      return out;
    },
    service: (v) => createExercise(v),
    success: (_r, v) => ({ ok:true, message:`Added exercise "${v.name}"`, chapterId: v.chapterId })
  })
};
