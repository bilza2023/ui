// /src/routes/admin/edit-note/+page.server.js
import { error } from '@sveltejs/kit';
import { getQuestionBySlug, updateQuestion } from '$lib/services/questionServices.js';

import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load({ url }) {
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return { slug: '', question: null, form: { message: 'Missing ?slug=...' } };
  }
  try {
    const q = await getQuestionBySlug(slug, { includePayload: true });
    return {
      slug,
      question: q,
      form: {
        values: {
          slug,
          name:        q.name ?? '',
          description: q.description ?? '',
          status:      q.status ?? 'draft',
          thumbnail:   q.thumbnail ?? '',
          sortOrder:   q.sortOrder ?? 0,
          timed:       !!q.timed,
          noteHtml:    q.note ?? ''
        }
      }
    };
  } catch (e) {
    return { slug, question: null, form: { message: 'Not found' } };
  }
}

export const actions = {
  save: makeAction({
    spec: {
      slug:        R.str('slug', { required: true }),
      name:        R.str('name'),
      description: R.str('description'),
      status:      R.$enum('status', ['draft', 'ready', 'published', 'archived'], { optional: true }),
      thumbnail:   R.str('thumbnail'),
      sortOrder:   R.num('sortOrder', { gte: 0 }),
      timed:       R.str('timed'),          // 'on' | undefined (checkbox)
      noteHtml:    R.str('noteHtml', { required: true })
    },
    prepare: (v) => {
      const clean = { ...v };

      // normalize checkbox → boolean
      clean.timed = v.timed === 'on' || v.timed === true;

      // normalize optional strings
      clean.description = (v.description ?? '').trim() || null;
      clean.thumbnail   = (v.thumbnail   ?? '').trim() || null;

      // numeric coercion
      if (v.sortOrder !== undefined && v.sortOrder !== null) {
        const n = Number(v.sortOrder);
        clean.sortOrder = Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
      }

      return clean;
    },
    // run: async (v) => {
      service: async (v) => {
      // Persist meta + note body
      const updates = {
        ...(v.name !== undefined        ? { name: v.name } : {}),
        ...(v.description !== undefined ? { description: v.description } : {}),
        ...(v.status ? { status: v.status } : {}),
        ...(v.thumbnail !== undefined   ? { thumbnail: v.thumbnail } : {}),
        ...(v.sortOrder !== undefined   ? { sortOrder: v.sortOrder } : {}),
        ...(v.timed !== undefined       ? { timed: !!v.timed } : {}),
        note: v.noteHtml
      };

      await updateQuestion(v.slug, updates);

      return { ok: true, slug: v.slug };
    }
  })
};
