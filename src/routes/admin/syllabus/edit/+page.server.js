
export const prerender = false;

import { getTcode, updateTcode } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import { error } from '@sveltejs/kit';

export async function load({ url, setHeaders }) {
  const id = Number.parseInt(url.searchParams.get('id') || '', 10);
  if (!id) throw error(400, 'id required');

  const tcode = await getTcode(id);
  if (!tcode) throw error(404, 'not found');

  setHeaders({ 'cache-control': 'public, max-age=0' });
  return { tcode };
}

export const actions = {
  save: makeAction({
    spec: {
      id:          R.intId('id',        { required: true }),
      name:        R.str('name',        { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      image:       R.str('image',       { trim: true })
    },
    prepare: (v) => ({
      id: v.id,
      data: {
        slug: SLUG(v.name),
        name: v.name.trim(),
        description: v.description?.trim() || undefined,
        image: v.image?.trim() || undefined
      }
    }),
    service: ({ id, data }) => updateTcode(id, data),
    success: (_r, v) => ({ ok:true, message:`Updated ${v.data.name}`, id:v.id })
  })
};
