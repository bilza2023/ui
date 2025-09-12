
export const prerender = false;

import { getTcode, createChapter } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import { error } from '@sveltejs/kit';

export async function load({ url, setHeaders }) {
  const tcodeId = Number.parseInt(url.searchParams.get('tcodeId') || '', 10);
  if (!tcodeId) throw error(400, 'tcodeId required');

  const tcode = await getTcode(tcodeId);
  if (!tcode) throw error(404, 'tcode not found');

  setHeaders({ 'cache-control': 'public, max-age=0' });
  return { tcode };
}

export const actions = {
  add: makeAction({
    spec: {
      tcodeId:   R.intId('tcodeId',   { required: true }),
      name:      R.str('name',        { required: true, trim: true }),
      sortOrder: R.num('sortOrder')
    },
    prepare: (v) => {
      const out = { tcodeId: v.tcodeId, slug: SLUG(v.name), name: v.name };
      if (Number.isFinite(v.sortOrder)) out.sortOrder = v.sortOrder;
      return out;
    },
    service: (v) => createChapter(v),
    success: (_r, v) => ({ ok:true, message:`Added chapter "${v.name}"`, tcodeId: v.tcodeId })
  })
};
