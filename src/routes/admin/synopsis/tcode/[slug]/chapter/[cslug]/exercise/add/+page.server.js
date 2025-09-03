
export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import {
  getChapterBySlug,
  createExercise
} from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const tcodeSlug = params.slug;
  const chapterSlug = params.cslug;

  let chapter;
  try {
    chapter = await getChapterBySlug(tcodeSlug, chapterSlug, { includeExercises: false });
  } catch {
    throw error(404, 'Chapter not found');
  }

  const tcode = { slug: chapter.tcode.slug, name: chapter.tcode.name };
  const chap  = { slug: chapter.slug, name: chapter.name };

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, chapter: chap };
}

export const actions = {
  addExercise: makeAction({
    spec: {
      tcodeSlug:   R.str('tcodeSlug',   { required: true }),
      chapterSlug: R.str('chapterSlug', { required: true }),
      name:        R.str('name',        { required: true, trim: true }),
      sortOrder:   R.str('sortOrder',   { trim: true }) // optional, from form as string
    },
    prepare: (v) => {
      const name = v.name.trim();
      const slug = SLUG(name);

      // parse optional sort order
      const so = v.sortOrder?.trim();
      const parsed = so === '' || so === undefined ? undefined : Number.parseInt(so, 10);
      const sortOrder = Number.isNaN(parsed) ? undefined : parsed;

      return { tcodeSlug: v.tcodeSlug, chapterSlug: v.chapterSlug, name, slug, sortOrder };
    },
    service: async (payload) => {
      // expects { tcodeSlug, chapterSlug, slug, name, sortOrder? }
      const saved = await createExercise(payload);
      return { saved };
    },
    success: (_result, v) => ({
      ok: true,
      message: `Added exercise "${v.name}"`,
      tcodeSlug: v.tcodeSlug,
      chapterSlug: v.chapterSlug,
      exercise: {
        slug: v.slug,
        name: v.name,
        sortOrder: v.sortOrder ?? 0
      }
    })
  })
};
