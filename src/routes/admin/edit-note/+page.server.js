// Minimal, surgical
import { getQuestionBySlug, updateQuestion } from '$lib/services/questionServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load({ url }) {
  const slug = url.searchParams.get('slug');
  if (!slug) {
    // Don't hammer the DB if slug is missing; show a friendly message on the page
    return {
      slug: null,
      question: null,
      form: { message: 'Missing ?slug=… in URL', values: {} }
    };
  }

  // includePayload:true so we get `note`
  const q = await getQuestionBySlug(slug, { includePayload: true });

  return {
    slug,
    question: q,
    // Pre-fill textarea with existing note; field name remains "noteHtml" to match your UI
    form: { values: { slug, noteHtml: q?.note ?? '' } }
  };
}

export const actions = {
  // POST to: /admin/edit-note?/_action=save
  save: makeAction({
    spec: {
      slug: R.str('slug', { required: true }),
      noteHtml: R.str('noteHtml', { required: true })
    },
    // Persist into the DB field named "note"
    service: async (v) => updateQuestion(v.slug, { note: v.noteHtml }),
    success: (_saved, v) => ({ ok: true, slug: v.slug })
  })
};
