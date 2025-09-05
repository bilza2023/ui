// /src/routes/syllabus/+page.server.js
export const prerender = false;

import { getSyllabusForTcode } from '$lib/services/syllabusService.js';
import {
  getQuestionsByTcode,
  getQuestionsByChapter,
  getQuestionsByExercise
} from '$lib/services/questionServices.js';

export async function load({ url, setHeaders }) {
  const tcodeSlug = url.searchParams.get('tcode')?.trim() || null;
  const chapterParam = url.searchParams.get('chapter');
  const exerciseParam = url.searchParams.get('exercise');

  // Normalize
  const chapter =
    chapterParam !== null && chapterParam !== ''
      ? Number(chapterParam)
      : undefined;

  const exercise =
    exerciseParam !== null && exerciseParam.trim() !== ''
      ? exerciseParam.trim()
      : undefined;

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
    const options = {
      includePayload: false,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    };

    let items;
    if (chapter !== undefined && exercise) {
      items = await getQuestionsByExercise(tcodeSlug, chapter, exercise, options);
    } else if (chapter !== undefined) {
      items = await getQuestionsByChapter(tcodeSlug, chapter, options);
    } else {
      items = await getQuestionsByTcode(tcodeSlug, options);
    }

    // Light caching
    setHeaders({ 'cache-control': 'public, max-age=30' });

    return {
      tcode: tcodeSlug,
      selected: { chapter: chapter ?? '', exercise: exercise ?? '' },
      synopsis,
      items
    };
  } catch (err) {
    console.error('[Syllabus SSR] failed:', err?.message || err);
    return {
      tcode: tcodeSlug,
      selected: { chapter: chapter ?? '', exercise: exercise ?? '' },
      synopsis: null,
      items: []
    };
  }
}
