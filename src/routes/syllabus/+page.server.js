// /src/routes/syllabus/+page.server.js
export const prerender = false;

import { getSyllabusForTcode } from '$lib/services/syllabusService.js';
import {
  getQuestionsByTcode,
  getQuestionsByChapter,
  getQuestionsByExercise
} from '$lib/services/questionServices.js';

const S = (v) => (typeof v === 'string' ? v.trim() : '');

export async function load({ url, setHeaders }) {
  const tcodeSlug = S(url.searchParams.get('tcode'));
  const chapter   = S(url.searchParams.get('chapter')) || '';
  const exercise  = S(url.searchParams.get('exercise')) || '';

  // No tcode → safe, predictable payload so UI never crashes
  if (!tcodeSlug) {
    return {
      tcode: '',
      selected: { chapter: '', exercise: '' },
      synopsis: null,
      items: []
    };
  }

  try {
    // 1) Nested tcode (synopsis)
    const synopsis = await getSyllabusForTcode(tcodeSlug);

    // 2) Flat questions list (server-side filter if given)
    const options = { includePayload: false, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] };
    const items =
      chapter && exercise
        ? await getQuestionsByExercise(tcodeSlug, chapter, exercise, options)
        : chapter
        ? await getQuestionsByChapter(tcodeSlug, chapter, options)
        : await getQuestionsByTcode(tcodeSlug, options);

    // Light caching
    setHeaders({ 'cache-control': 'public, max-age=30' });

    return {
      tcode: tcodeSlug,
      selected: { chapter, exercise },
      synopsis,
      items
    };
  } catch (err) {
    console.error('[Syllabus SSR] failed:', err?.message || err);
    return {
      tcode: tcodeSlug,
      selected: { chapter, exercise },
      synopsis: null,
      items: []
    };
  }
}
