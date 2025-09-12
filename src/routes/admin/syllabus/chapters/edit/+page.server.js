
export const prerender = false;

import { getChapter, getTcode, updateChapter } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import { error } from '@sveltejs/kit';

export async function load({ url, setHeaders }) {
  const id = Number.parseInt(url.searchParams.get('id') || '', 10);
  if (!id) throw error(400, 'id required');

  const chapter = await getChapter(id);
  if (!chapter) throw error(404, 'chapter not found');

  const tcode = await getTcode(chapter.tcodeId);

  setHeaders({ 'cache-control': 'public, max-age=0' });
  return { chapter, tcode };
}

export const actions = {
  save: makeAction({
    spec: {
      id:        R.intId('id', { required: true }),
      name:      R.str('name', { required: true, trim: true }),
      sortOrder: R.num('sortOrder')
    },
    prepare: (v) => {
      const data = { slug: SLUG(v.name), name: v.name };
      if (Number.isFinite(v.sortOrder)) data.sortOrder = v.sortOrder;
      return { id: v.id, data };
    },
    service: ({ id, data }) => updateChapter(id, data),
    success: (_r, v) => ({ ok:true, message:`Updated chapter`, id:v.id })
  })
};
