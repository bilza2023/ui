
export const prerender = false;

import { createTcode } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';

export async function load({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=0' });
  return {};
}

export const actions = {
  add: makeAction({
    spec: {
      name:        R.str('name',        { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      image:       R.str('image',       { trim: true })
    },
    prepare: (v) => ({
      slug: SLUG(v.name),
      name: v.name.trim(),
      description: v.description?.trim() || undefined,
      image: v.image?.trim() || undefined
    }),
    service: (v) => createTcode(v),
    success: (_r, v) => ({ ok:true, message:`Added ${v.name}`, slug:v.slug })
  })
};
