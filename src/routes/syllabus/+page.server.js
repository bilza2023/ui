// /src/routes/syllabus/+page.server.js
import prisma from '$lib/server/prisma.js';
import { listTcodes, getNested } from '$lib/services/synopisisServices2.js';

export const prerender = false;

// safe string helper
const S = (v) => (typeof v === 'string' ? v : '');

export async function load({ url, setHeaders }) {
  // 0) pick tcode
  const tcodes = await listTcodes();
  if (!tcodes?.length) {
    console.log('[SYL] No tcodes in DB.');
    return { tcode: '', selected: { chapter: '', exercise: '' }, synopsis: null, questions: [] };
  }
  const reqTcode = S((url.searchParams.get('tcode') || '').trim());
  const tcode = tcodes.some((t) => t.tcode === reqTcode) ? reqTcode : tcodes[0].tcode;

  // 1) one-tcode synopsis (DB-backed)
  const synopsis = await getNested(tcode);
  const chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
  const exerciseCount = chapters.reduce(
    (n, c) => n + (Array.isArray(c?.exercises) ? c.exercises.length : 0),
    0
  );
  console.log('[SYL]', { tcode, chapters: chapters.length, exercises: exerciseCount });

  // 2) selection (SSR-safe)
  const chapterParam = S(url.searchParams.get('chapter') || '');
  const exerciseParam = S(url.searchParams.get('exercise') || '');
  let selectedChapter = '';
  let selectedExercise = '';

  if (chapters.length) {
    selectedChapter =
      chapterParam && chapters.some((c) => c.filename === chapterParam)
        ? chapterParam
        : chapters[0].filename;

    const exList = chapters.find((c) => c.filename === selectedChapter)?.exercises ?? [];
    selectedExercise =
      exList.length
        ? (exerciseParam && exList.some((e) => e.filename === exerciseParam)
            ? exerciseParam
            : exList[0].filename)
        : '';
  }
  console.log('[SYL_SELECTED]', { chapter: selectedChapter, exercise: selectedExercise });

  // 3) questions for this tcode (flat) — NOTE: no 'id' (your model likely doesn't have it)
  let questions = [];
  try {
    questions = await prisma.question.findMany({
      where: { tcode },
      select: {
        filename: true,
        title: true,
        tcode: true,
        chapterSlug: true,
        exerciseSlug: true
      },
      orderBy: { filename: 'asc' }
    });
  } catch (err) {
    console.log('[QUESTIONS] DB fetch error:', err?.message || err);
    questions = [];
  }

  console.log('[QUESTIONS]', { tcode, count: questions.length });
  if (questions[0]) {
    const { filename, title, chapterSlug, exerciseSlug } = questions[0];
    console.log('[QUESTIONS_SAMPLE]', { filename, title, chapterSlug, exerciseSlug });
  }

  setHeaders({ 'cache-control': 'public, max-age=30' });

  return {
    tcode,
    selected: { chapter: selectedChapter, exercise: selectedExercise },
    synopsis,
    questions
  };
}
