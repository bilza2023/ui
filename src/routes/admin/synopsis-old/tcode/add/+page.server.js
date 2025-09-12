// /src/routes/admin/synopsis/tcode/add/+page.server.js
export const prerender = false;

import { listTcodes, listChapters, createTcode } from '$lib/services/syllabusService.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';

export async function load({ setHeaders }) {
  const rows = await listTcodes();

  const tcodes = await Promise.all(
    (rows ?? []).map(async (r) => {
      const chs = await listChapters(r.id);
      return {
        slug: r.slug,
        name: r.name,
        description: r.description ?? null,
        image: r.image ?? null,
        chapterCount: chs.length
      };
    })
  );

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
    service: (v) => createTcode(v),
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
