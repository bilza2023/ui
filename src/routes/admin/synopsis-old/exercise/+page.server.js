
export const prerender = false;

import * as admin from '$lib/services/adminServices.js';
import { fail } from '@sveltejs/kit';

const S = (v) => (typeof v === 'string' ? v.trim() : '');

export async function load({ url, setHeaders }) {
  const tcodes = await admin.listTcodes();
  const tcode = S(url.searchParams.get('tcode')) || tcodes[0]?.slug || '';

  // nested only for selected tcode → get chapters/exercises listing
  const nested = tcode ? await admin.getNested(tcode) : [];
  const chapters = (nested[0]?.chapters ?? []);

  const chapter = S(url.searchParams.get('chapter')) || chapters[0]?.slug || '';
  const exercises = (chapters.find(c => c.slug === chapter)?.exercises ?? []);

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes, tcode, chapters, chapter, exercises };
}

export const actions = {
  addExercise: async ({ request }) => {
    const fd = await request.formData();
    const tcodeSlug = S(fd.get('tcode'));
    const chapterSlug = S(fd.get('chapterSlug'));
    const name = S(fd.get('name'));
    if (!tcodeSlug || !chapterSlug || !name) return fail(400, { ok: false, message: 'tcode + chapterSlug + name required' });
    const slug = SLUG(name);
    await admin.addExercise({ tcodeSlug, chapterSlug, slug, name });
    return { ok: true };
  },
  renameExercise: async ({ request }) => {
    const fd = await request.formData();
    const tcodeSlug = S(fd.get('tcode'));
    const chapterSlug = S(fd.get('chapterSlug'));
    const exerciseSlug = S(fd.get('exerciseSlug'));
    const name = S(fd.get('name'));
    const newSlug = S(fd.get('newSlug'));
    if (!tcodeSlug || !chapterSlug || !exerciseSlug) return fail(400, { ok: false, message: 'tcode + chapterSlug + exerciseSlug required' });
    await admin.renameExercise({ tcodeSlug, chapterSlug, exerciseSlug, updates: { ...(name && { name }), ...(newSlug && { newSlug }) } });
    return { ok: true };
  },
  deleteExercise: async ({ request }) => {
    const fd = await request.formData();
    const tcodeSlug = S(fd.get('tcode'));
    const chapterSlug = S(fd.get('chapterSlug'));
    const exerciseSlug = S(fd.get('exerciseSlug'));
    if (!tcodeSlug || !chapterSlug || !exerciseSlug) return fail(400, { ok: false, message: 'tcode + chapterSlug + exerciseSlug required' });
    await admin.deleteExercise({ tcodeSlug, chapterSlug, exerciseSlug });
    return { ok: true };
  },
  reorderExercises: async ({ request }) => {
    const fd = await request.formData();
    const tcodeSlug = S(fd.get('tcode'));
    const chapterSlug = S(fd.get('chapterSlug'));
    const orderedSlugs = S(fd.get('ordered')).split(',').map(s => s.trim()).filter(Boolean);
    if (!tcodeSlug || !chapterSlug) return fail(400, { ok: false, message: 'tcode + chapterSlug required' });
    await admin.reorderExercises({ tcodeSlug, chapterSlug, orderedSlugs });
    return { ok: true };
  }
};
