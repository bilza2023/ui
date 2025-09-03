export const prerender = false;

import * as admin from '$lib/services/adminServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';

export async function load({ setHeaders }) {
  const rows = await admin.listTcodes();
  const tcodes = (rows ?? []).map(r => ({
    slug: r.slug,
    name: r.name,
    description: r.description ?? null,
    image: r.image ?? null,
    chapterCount: Number(r.chapterCount ?? r._count?.chapters ?? 0)
  }));

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes };
}

export const actions = {
  addTcode: makeAction({
    spec: {
      name:        R.str('name',        { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      image:       R.str('image',       { trim: true })
    },
    prepare: (v) => {
      const slug = SLUG(v.name);
      const description = v.description?.trim() || undefined;
      const image       = v.image?.trim() || undefined;
      return { slug, name: v.name.trim(), description, image };
    },
    service: (v) => admin.addTcode(v),
    success: (_result, v) => ({
      message: `Added ${v.name}`,
      tcode: {
        slug: v.slug,
        name: v.name,
        description: v.description ?? null,
        image: v.image ?? null,
        chapterCount: 0
      }
    })
  })
};
