// /src/routes/admin/synopsis/+page.server.js
export const prerender = false;

import * as admin from '$lib/services/adminServices.js';
import { fail } from '@sveltejs/kit';

const S = (v) => (typeof v === 'string' ? v.trim() : '');

// Fallback if admin.slugify isn't present yet
const localSlugify = (s) =>
  (s ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-{2,}/g, '-');

const SLUG = (s) => (typeof admin.slugify === 'function' ? admin.slugify(s) : localSlugify(s));

export async function load({ setHeaders }) {
  const tcodes = await admin.listTcodes();
  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes };
}

export const actions = {
  addTcode: async ({ request }) => {
    const fd = await request.formData();
    const slug = S(fd.get('tcode'));        // tcode card stays slug-explicit
    const name = S(fd.get('name'));
    const description = S(fd.get('description')) || '';
    const image = S(fd.get('image')) || '';

    if (!slug || !name) {
      return fail(400, { action: 'addTcode', ok: false, message: 'tcode and name are required' });
    }
    await admin.addTcode({ slug, name, description, image });
    return { action: 'addTcode', ok: true, message: `Added tcode “${slug}”` };
  },

  addChapter: async ({ request }) => {
    const fd = await request.formData();
    const tcodeSlug = S(fd.get('tcode'));
    const name = S(fd.get('name'));
    const slug = SLUG(name);

    if (!tcodeSlug || !name) {
      return fail(400, { action: 'addChapter', ok: false, message: 'tcode and name are required' });
    }
    await admin.addChapter({ tcodeSlug, slug, name, description: '' });
    return { action: 'addChapter', ok: true, message: `Added chapter “${slug}” to ${tcodeSlug}` };
  },

  addExercise: async ({ request }) => {
    const fd = await request.formData();
    const tcodeSlug = S(fd.get('tcode'));
    const chapterSlug = S(fd.get('chapterSlug'));
    const name = S(fd.get('name'));
    const slug = SLUG(name);

    if (!tcodeSlug || !chapterSlug || !name) {
      return fail(400, { action: 'addExercise', ok: false, message: 'tcode, chapterSlug and name are required' });
    }
    await admin.addExercise({ tcodeSlug, chapterSlug, slug, name });
    return { action: 'addExercise', ok: true, message: `Added exercise “${slug}” under ${tcodeSlug}/${chapterSlug}` };
  }
};
