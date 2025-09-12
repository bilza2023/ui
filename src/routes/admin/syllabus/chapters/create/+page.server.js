export const prerender = false;

import { listTcodes, createChapter } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';

export async function load({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=0' });
  const tcodes = await listTcodes();
  return {
    tcodeOptions: tcodes.map(t => ({ value: t.id, label: t.name || t.slug }))
  };
}

export const actions = {
  add: makeAction({
    spec: {
      tcodeId:   R.intId('tcodeId', { required: true }),
      name:      R.str('name', { required: true, trim: true }),
      sortOrder: R.num('sortOrder', { gte: 0 })
    },
    prepare: (v) => ({
      tcodeId: v.tcodeId,
      slug: SLUG(v.name),
      name: v.name.trim(),
      sortOrder: Number.isFinite(v.sortOrder) ? v.sortOrder : 0
    }),
    service: (v) => createChapter(v),
    success: (row, v) => ({
      ok: true,
      id: row?.id,
      slug: row?.slug || v.slug,
      tcodeId: v.tcodeId,
      message: `Added ${v.name}`
    })
  })
};
