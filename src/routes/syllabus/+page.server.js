// Server-only loader for the syllabus page.
// Uses static tcode registry for the top picker,
// and synopsis services for chapters/exercises + DB-backed counts/content.

import tcodesRegistry from '$lib/synopsis/index.js';
// import {
//   getChapters,
//   getExercises,
//   resolvePath,
//   getExerciseCounts,
//   getExerciseContent
// } from '$lib/services/synopsisServeces.js';
import { getChapters, getExercises, resolvePath } from '$lib/services/synopsisServices.js';
import { getExerciseCounts, getExerciseContent } from '$lib/services/synopsisServices.server.js';

export const prerender = false;

export async function load({ url }) {
  const tcodes = tcodesRegistry; // [{ tcodeName, description, image }]
  const q = url.searchParams;

  const reqTcode   = q.get('tcode')    || '';
  const reqChapter = q.get('chapter')  || '';
  const reqEx      = q.get('exercise') || '';
  const typeParam  = q.get('type'); // 'deck' | 'note' | null

  // If no tcodes registered, return a safe empty state
  if (!tcodes || tcodes.length === 0) {
    return {
      tcodeList: [],
      tcode: null,
      chapters: [],
      chapter: null,
      exercises: [],
      exercise: null,
      counts: {},
      items: [],
      typeFilter: null
    };
  }

  const fallbackTcode = tcodes[0].tcodeName;
  let tcode = reqTcode && tcodes.find(t => t.tcodeName === reqTcode) ? reqTcode : fallbackTcode;

  // Prepare chapter/exercise lists for chosen tcode
  let chapters  = getChapters(tcode);
  let chapter   = reqChapter && chapters.find(c => c.filename === reqChapter) ? reqChapter : (chapters[0]?.filename ?? null);
  let exercises = (tcode && chapter) ? getExercises(tcode, chapter) : [];
  let exercise  = reqEx && exercises.find(e => e.filename === reqEx) ? reqEx : (exercises[0]?.filename ?? null);

  // Validate against synopsis, else soft-reset
  const pathCheck = resolvePath(tcode, chapter, exercise);
  if (!pathCheck.ok) {
    tcode    = fallbackTcode;
    chapters = getChapters(tcode);
    chapter  = chapters[0]?.filename ?? null;
    exercises= (tcode && chapter) ? getExercises(tcode, chapter) : [];
    exercise = exercises[0]?.filename ?? null;
  }

  // Optional type filter
  const typeFilter = (typeParam === 'deck' || typeParam === 'note') ? typeParam : null;

  // Counts + items (server-only because they hit Prisma)
  let counts = {};
  let items  = [];
  if (tcode && chapter) {
    try {
      counts = await getExerciseCounts(tcode, chapter);
    } catch (e) {
      console.error('[syllabus] getExerciseCounts failed:', e);
      counts = {};
    }
  }
  if (tcode && chapter && exercise) {
    try {
      items = await getExerciseContent(tcode, chapter, exercise, {
        typeFilter,
        limit: 500,
        offset: 0
      });
    } catch (e) {
      console.error('[syllabus] getExerciseContent failed:', e);
      items = [];
    }
  }

  return {
    tcodeList: tcodes,
    tcode,
    chapters,
    chapter,
    exercises,
    exercise,
    counts,
    items,
    typeFilter
  };
}
