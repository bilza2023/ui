export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { getTcodeBySlug, deleteTcode } from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const slug = params.slug;
  const t = await getTcodeBySlug(slug, { includeChapters: true });
  if (!t) throw error(404, 'Tcode not found');

  const chapterCount = Array.isArray(t.chapters) ? t.chapters.length : 0;

  const tcode = {
    slug: t.slug,
    name: t.name,
    description: t.description ?? '',
    image: t.image ?? '',
    chapterCount
  };
  const hasChapters = chapterCount > 0;

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, hasChapters };
}

export const actions = {
  deleteTcode: makeAction({
    spec: { slug: R.str('slug', { required: true }) },
    prepare: (v) => ({ slug: v.slug }),
    service: async ({ slug }) => {
      const t = await getTcodeBySlug(slug, { includeChapters: true });
      if (!t) throw error(404, 'Tcode not found');

      const count = Array.isArray(t.chapters) ? t.chapters.length : 0;
      if (count > 0) {
        const e = new Error(`Cannot delete "${t.name}" — it has ${count} chapter(s).`);
        e.code = 'VALIDATION';
        throw e; // let makeAction turn this into a failure instead of a 500
      }

      await deleteTcode(slug);
      return { slug, name: t.name };
    },
    success: (r) => ({
      message: `Deleted ${r.name}`,
      slug: r.slug
    })
  })
};
