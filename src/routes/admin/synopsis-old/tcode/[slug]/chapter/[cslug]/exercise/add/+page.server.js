// /src/routes/admin/synopsis/tcode/[slug]/chapter/[cslug]/exercise/add/+page.server.js
export const prerender = false;

import { error } from '@sveltejs/kit';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
import {
  getTcodeBySlug,
  getChapterBySlug,
  createExercise
} from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const tcode = await getTcodeBySlug(params.slug);
  if (!tcode) throw error(404, 'Tcode not found');

  const chapter = await getChapterBySlug(tcode.id, params.cslug);
  if (!chapter) throw error(404, 'Chapter not found');

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return {
    tcode:   { id: tcode.id, slug: tcode.slug, name: tcode.name },
    chapter: { id: chapter.id, slug: chapter.slug, name: chapter.name }
  };
}

export const actions = {
  addExercise: makeAction({
    spec: {
      tcodeId:   R.intId('tcodeId',   { required: true }),
      chapterId: R.intId('chapterId', { required: true }),
      name:      R.str('name',        { required: true, trim: true }),
      sortOrder: R.num('sortOrder') // optional
    },
    prepare: (v) => {
      const slug = SLUG(v.name);
      const out = { tcodeId: v.tcodeId, chapterId: v.chapterId, slug, name: v.name };
      if (Number.isFinite(v.sortOrder)) out.sortOrder = v.sortOrder;
      return out;
    },
    service: (v) => createExercise(v), // extra tcodeId is harmless if service ignores it
    success: (_r, v) => ({
      ok: true,
      message: `Added exercise "${v.name}"`,
      tcodeId: v.tcodeId,
      chapterId: v.chapterId,
      exercise: { slug: v.slug, name: v.name, sortOrder: v.sortOrder ?? 0 }
    })
  })
};

