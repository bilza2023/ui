
export const prerender = false;

import { getChapter, updateChapter, deleteChapter } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load({ url, setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=0' });
  const tcodeId = url.searchParams.get('tcodeId') || '';
  const chapterId = url.searchParams.get('chapterId') || '';
  const chapter = chapterId ? await getChapter(chapterId) : null;
  return { tcodeId, chapterId, chapter };
}

export const actions = {
  save: makeAction({
    spec: {
      id:          R.intId('id', { required: true }),           // chapterId
      tcodeId:     R.intId('tcodeId', { required: true }),
      slug:        R.str('slug', { trim: true }),               // preserved, not user-edited
      name:        R.str('name', { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      sortOrder:   R.int('sortOrder')
    },
    prepare: (v) => ({
      id: v.id,
      data: {
        tcodeId: v.tcodeId,
        slug: v.slug || undefined,
        name: v.name.trim(),
        description: v.description?.trim() || undefined,
        sortOrder: Number.isFinite(v.sortOrder) ? v.sortOrder : 0
      }
    }),
    service: ({ id, data }) => updateChapter(id, data),
    success: (_r, v) => ({ ok: true, message: `Updated ${v.name}`, id: v.id })
  }),

  del: makeAction({
    spec: { id: R.intId('id', { required: true }) },
    service: ({ id }) => deleteChapter(id),
    success: (_r, v) => ({ ok: true, deleted: true, id: v.id })
  })
};
