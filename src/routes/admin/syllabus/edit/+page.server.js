export const prerender = false;

import { getTcode, updateTcode, deleteTcode } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load({ url, setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=0' });
  const id = url.searchParams.get('tcodeId') || '';
  const tcode = await getTcode(id);
  return { id, tcode };
}

export const actions = {
  // Update/save
  save: makeAction({
    spec: {
      id:          R.intId('id', { required: true }),
      slug:        R.str('slug', { required: true, trim: true }), // preserved, not user-edited
      name:        R.str('name', { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      image:       R.str('image', { trim: true })
    },
    prepare: (v) => ({
      id: v.id,
      slug: v.slug,
      name: v.name.trim(),
      description: v.description?.trim() || undefined,
      image: v.image?.trim() || undefined
    }),
    service: ({ id, ...data }) => updateTcode(id, data),
    success: (_r, v) => ({ ok: true, message: `Updated ${v.name}`, id: v.id, slug: v.slug })
  }),

  // Delete
  del: makeAction({
    spec: { id: R.intId('id', { required: true }) },
    service: ({ id }) => deleteTcode(id),
    success: (_r, v) => ({ ok: true, deleted: true, id: v.id })
  })
};
