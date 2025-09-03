// src/lib/services/adminServices.js
// ------------------------------------------------------------
// Admin-facing façade over checked syllabus & question services
// Slug-first API, minimal shaping, no timings/doctor logic here.
// ------------------------------------------------------------

import * as syllabusSvc from './contentServices/syllabusService.js';
import * as questionSvc from './contentServices/questionServices.js';

/* ------------------------ Tcodes / Chapters / Exercises ------------------------ */

// 1) Subjects/Tcodes
export async function listTcodes() {
  return syllabusSvc.getAllTcodes();
}

export async function getNested(tcodeSlug = '') {
  return tcodeSlug
    ? syllabusSvc.getSyllabusForTcode(tcodeSlug)
    : syllabusSvc.getCompleteSyllabus();
}

export async function addTcode({ slug, name, description = '', image = '' }) {
  return syllabusSvc.createTcode({ slug, name, description, image });
}

export async function deleteTcode(slug) {
  return syllabusSvc.deleteTcode(slug);
}

export async function renameTcode(slug, updates = {}) {
  // supports { name?, newSlug?, description?, image? }
  return syllabusSvc.updateTcode(slug, updates);
}

// 2) Chapters
export async function addChapter({ tcodeSlug, slug, name, description = '' }) {
  return syllabusSvc.createChapter({ tcodeSlug, slug, name, description });
}

export async function deleteChapter({ tcodeSlug, chapterSlug }) {
  return syllabusSvc.deleteChapter({ tcodeSlug, chapterSlug });
}

export async function renameChapter({ tcodeSlug, chapterSlug, updates = {} }) {
  // supports { name?, newSlug?, description? }
  return syllabusSvc.updateChapter({ tcodeSlug, chapterSlug, updates });
}

export async function reorderChapters(tcodeSlug, orderedSlugs = []) {
  return syllabusSvc.reorderChapters(tcodeSlug, orderedSlugs);
}

// 3) Exercises
export async function addExercise({ tcodeSlug, chapterSlug, slug, name }) {
  return syllabusSvc.createExercise({ tcodeSlug, chapterSlug, slug, name });
}

export async function deleteExercise({ tcodeSlug, chapterSlug, exerciseSlug }) {
  return syllabusSvc.deleteExercise({ tcodeSlug, chapterSlug, exerciseSlug });
}

export async function renameExercise({ tcodeSlug, chapterSlug, exerciseSlug, updates = {} }) {
  // supports { name?, newSlug? }
  return syllabusSvc.updateExercise({ tcodeSlug, chapterSlug, exerciseSlug, updates });
}

export async function reorderExercises({ tcodeSlug, chapterSlug, orderedSlugs = [] }) {
  return syllabusSvc.reorderExercises({ tcodeSlug, chapterSlug, orderedSlugs });
}

/* --------------------------------- Questions ---------------------------------- */

// 4) Create/Upload
export async function uploadDeckText({
  slug,
  tcode,
  chapter,
  exercise,
  text,                 // deck JSON as string
  status = 'draft',     // 'draft' | 'ready' | 'published' | 'archived'
  type = 'deck'         // 'deck' | 'note' (kept for future)
}) {
  // If question exists → update; else → create
  const exists = await questionExists(slug);
  if (exists) {
    return questionSvc.updateQuestion(slug, { tcode, chapter, exercise, type, status, payload: text });
  }
  return questionSvc.createQuestion({ slug, tcode, chapter, exercise, type, status, payload: text });
}

export async function uploadDeckFile({
  slug, tcode, chapter, exercise, file, status = 'draft', type = 'deck'
}) {
  // Accepts a File/Blob or Node Buffer+toString. Convert to text and forward.
  const text = typeof file === 'string'
    ? file
    : (typeof file?.text === 'function' ? await file.text() : String(file ?? ''));
  return uploadDeckText({ slug, tcode, chapter, exercise, text, status, type });
}

// 5) Existence & deletes
export async function questionExists(slug) {
  try {
    const q = await questionSvc.getQuestionBySlug(slug, { includePayload: false });
    return !!q;
  } catch {
    return false;
  }
}

export async function deleteQuestion(slug) {
  return questionSvc.deleteQuestion(slug);
}

// 6) Move & reorder
export async function moveQuestion(slug, { tcode, chapter, exercise }) {
  return questionSvc.updateQuestion(slug, { tcode, chapter, exercise });
}

export async function reorderQuestions({ tcode, chapter, exercise, orderedSlugs = [] }) {
  return questionSvc.reorderQuestions({ tcode, chapter, exercise, orderedSlugs });
}

// 7) Duplicate & publish toggles
export async function duplicateQuestion(originalSlug, newSlug) {
  const src = await questionSvc.getQuestionBySlug(originalSlug, { includePayload: true });
  if (!src) throw new Error(`Question "${originalSlug}" not found`);
  const { tcode, chapter, exercise, type = 'deck', status = 'draft', payload = '' } = src;
  return questionSvc.createQuestion({
    slug: newSlug, tcode, chapter, exercise, type, status, payload
  });
}

export async function publishQuestion(slug) {
  return questionSvc.updateQuestion(slug, { status: 'published' });
}

export async function unpublishQuestion(slug) {
  // Convention: move back to 'draft'; adjust if your flow prefers 'ready'
  return questionSvc.updateQuestion(slug, { status: 'draft' });
}

/* --------------------------- Import / Export / Orphans ------------------------- */

export async function exportTcode(tcodeSlug) {
  // Pure syllabus export (nested)
  return syllabusSvc.getSyllabusForTcode(tcodeSlug);
}

export async function importTcode(syllabusJson) {
  // Expecting shape: { slug, name, description?, image?, chapters:[{ slug, name, exercises:[{ slug, name }] }]}
  const { slug: tcodeSlug, name, description = '', image = '', chapters = [] } = syllabusJson || {};
  if (!tcodeSlug || !name) throw new Error('importTcode: missing slug/name');

  await addTcode({ slug: tcodeSlug, name, description, image });

  for (const ch of chapters) {
    await addChapter({ tcodeSlug, slug: ch.slug, name: ch.name, description: ch.description ?? '' });
    for (const ex of (ch.exercises || [])) {
      await addExercise({ tcodeSlug, chapterSlug: ch.slug, slug: ex.slug, name: ex.name });
    }
  }
  // Returns nested just created
  return exportTcode(tcodeSlug);
}

export async function listOrphanQuestions() {
  // Orphan = question referencing (tcode/chapter/exercise) that doesn't exist in syllabus
  const all = await questionSvc.listQuestions({ limit: 100000 });
  const nested = await syllabusSvc.getCompleteSyllabus();

  const valid = new Set();
  for (const tc of nested) {
    for (const ch of (tc.chapters || [])) {
      for (const ex of (ch.exercises || [])) {
        valid.add(`${tc.slug}::${ch.slug}::${ex.slug}`);
      }
    }
  }

  return all.filter(q => !valid.has(`${q.tcode}::${String(q.chapter)}::${q.exercise}`));
}

/* ----------------------------------- Counts ----------------------------------- */

export async function getCounts({ tcodeSlug } = {}) {
  // Fast path if backend supports aggregated counts:
  if (questionSvc.getQuestionCount) {
    const total = await questionSvc.getQuestionCount({ tcode: tcodeSlug });
    return { total };
  }

  // Fallback: local reduce
  const rows = await questionSvc.listQuestions({ tcode: tcodeSlug, limit: 100000 });
  const byChapter = {};
  let total = 0;

  for (const q of rows) {
    total++;
    const ch = String(q.chapter ?? '');
    const ex = String(q.exercise ?? '');
    byChapter[ch] ??= { total: 0, byExercise: {} };
    byChapter[ch].total++;
    byChapter[ch].byExercise[ex] = (byChapter[ch].byExercise[ex] ?? 0) + 1;
  }

  return { total, byChapter };
}

/* ------------------------------ Named Exports List ----------------------------- */
/*
Exposed (26):

listTcodes, getNested,
addTcode, addChapter, addExercise,
uploadDeckFile, uploadDeckText,
questionExists, deleteQuestion,
deleteTcode, deleteChapter, deleteExercise,
renameTcode, renameChapter, renameExercise,
moveQuestion,
reorderChapters, reorderExercises, reorderQuestions,
duplicateQuestion,
publishQuestion, unpublishQuestion,
importTcode, exportTcode,
listOrphanQuestions,
getCounts
*/
