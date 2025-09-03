
export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { getTcodeBySlug, updateTcode } from '../../../../../../lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const slug = params.slug;
  const t = await getTcodeBySlug(slug, { includeChapters: true });
  if (!t) throw error(404, 'Tcode not found');

  const tcode = {
    slug: t.slug,
    name: t.name,
    description: t.description ?? '',
    image: t.image ?? '',
    chapterCount: Array.isArray(t.chapters) ? t.chapters.length : 0
  };

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode };
}

export const actions = {
  updateTcode: makeAction({
    spec: {
      slug:        R.str('slug',        { required: true }),
      name:        R.str('name',        { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      image:       R.str('image',       { trim: true })
    },
    prepare: (v) => {
      const updates = {
        name: v.name.trim(),
        ...(v.description ? { description: v.description.trim() } : {}),
        ...(v.image ? { image: v.image.trim() } : {})
      };
      return { slug: v.slug, updates };
    },
    service: async ({ slug, updates }) => {
      const existing = await getTcodeBySlug(slug);
      if (!existing) throw error(404, 'Tcode not found');
      const saved = await updateTcode(slug, updates);
      return { saved, slug, updates };
    },
    success: (_r, v) => ({
      message: `Updated ${v.updates.name}`,
      tcode: { slug: v.slug, ...v.updates }
    })
  })
};
