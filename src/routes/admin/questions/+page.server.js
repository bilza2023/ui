// Admin: Questions (simple list, no ListView)
import { listQuestions, deleteQuestion } from '$lib/services/questionServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load() {
  // Lightweight list (no deck/note payloads)
  const items = await listQuestions({ includePayload: false, limit: 500 });
  return { items };
}

export const actions = {
  delete: makeAction({
    spec: { slug: R.str('slug', { required: true }) },
    service: ({ slug }) => deleteQuestion(slug),
    success: () => ({ ok: true })
  })
};
