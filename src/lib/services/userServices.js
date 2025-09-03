// src/lib/services/userServices.js
// ------------------------------------------------------------
// Public-facing service layer for learners / UI pages.
// Uses new slug-based schema internally, but returns legacy
// shapes so the UI/pages don't need to change.
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';

/* -------------------- Tcodes -------------------- */
// DB: SyllabusTcode { id, slug, name, description, image }
// UI expects: { id, tcode, name, description, image }
export async function listTcodes() {
  const rows = await prisma.syllabusTcode.findMany({
    orderBy: [{ name: 'asc' }],
    select: { id: true, slug: true, name: true, description: true, image: true }
  });
  return rows.map(r => ({
    id: r.id,
    tcode: r.slug,            // ← keep legacy field name for UI
    name: r.name,
    description: r.description,
    image: r.image
  }));
}

/* 
  getNested(tcode)
  - Keeps the same signature: param is the tcode string the UI sends (now = slug).
  - Returns chapters/exercises with legacy "filename" fields mapped from slug.
*/
export async function getNested(tcode = null) {
  async function _getTcodeOrThrow(slug) {
    const row = await prisma.syllabusTcode.findUnique({ where: { slug } });
    if (!row) {
      const err = new Error(`Unknown tcode: ${slug}`);
      err.code = 'E_NOT_FOUND';
      throw err;
    }
    return row;
  }

  if (tcode) {
    const tc = await _getTcodeOrThrow(tcode);

    const chapters = await prisma.syllabusChapter.findMany({
      where: { tcodeId: tc.id },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      select: { id: true, slug: true, name: true, sortOrder: true }
    });

    const result = {
      tcodeName: tc.slug,                // legacy field expected by UI
      name: tc.name,
      description: tc.description ?? null,
      image: tc.image ?? null,
      chapters: []
    };

    for (const ch of chapters) {
      const exercises = await prisma.syllabusExercise.findMany({
        where: { chapterId: ch.id },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        select: { slug: true, name: true, sortOrder: true }
      });

      result.chapters.push({
        name: ch.name,
        filename: ch.slug,               // ← legacy: map slug → filename
        sortOrder: ch.sortOrder,
        exercises: exercises.map(e => ({
          name: e.name,
          filename: e.slug,              // ← legacy: map slug → filename
          sortOrder: e.sortOrder
        }))
      });
    }
    return result;
  }

  // No param: return nested for all tcodes (keeps old behavior)
  const tcodes = await listTcodes(); // has { tcode: slug }
  const out = [];
  for (const tc of tcodes) out.push(await getNested(tc.tcode));
  return out;
}

/* -------------------- Questions -------------------- */
/*
  listQuestionsByTcode({ tcode, chapter, exercise, ... })
  - DB Question now uses { slug (PK), tcode, chapter, exercise, ... }
  - We return a legacy "filename" field mapped from slug to avoid UI changes.
*/
export async function listQuestionsByTcode({
  tcode,
  chapter,
  exercise,
  type,                  // 'deck' | 'note'
  selectPayload = false,
  limit = 500
} = {}) {
  if (!tcode) throw new Error('listQuestionsByTcode: tcode required');

  /** @type {import('@prisma/client').Prisma.QuestionWhereInput} */
  const where = { tcode };
  if (chapter)  where.chapter  = Number(chapter);
  if (exercise) where.exercise = exercise;
  if (type)     where.type     = type;

  /** @type {import('@prisma/client').Prisma.QuestionSelect} */
  const select = {
    slug: true,                 // ← new
    type: true,
    name: true,
    description: true,
    tags: true,
    status: true,
    sortOrder: true,
    timed: true,
    tcode: true,
    chapter: true,
    exercise: true,
    createdAt: true,
    editedAt: true
  };
  if (selectPayload) {
    select.deck = true;
    select.note = true;
  }

  const rows = await prisma.question.findMany({
    where,
    select,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    take: limit
  });

  // Map slug → filename to preserve existing UI expectations
  return rows.map(r => ({ ...r, filename: r.slug }));
}

/*
  getQuestionByFilename(filename)
  - Keep the function name for compatibility, but treat "filename" as the slug.
  - Return the same legacy shape with filename present.
*/
export async function getQuestionByFilename(filename, opts = {}) {
  if (!filename) throw new Error('getQuestionByFilename: filename required');
  const { selectPayload = true } = opts;

  /** @type {import('@prisma/client').Prisma.QuestionSelect} */
  const select = {
    slug: true,                 // ← new
    type: true,
    name: true,
    description: true,
    tags: true,
    status: true,
    sortOrder: true,
    timed: true,
    tcode: true,
    chapter: true,
    exercise: true,
    createdAt: true,
    editedAt: true
  };
  if (selectPayload) {
    select.deck = true;
    select.note = true;
  }

  const row = await prisma.question.findUnique({ where: { slug: filename }, select });
  return row ? { ...row, filename: row.slug } : null;
}

/* -------------------- Unified surface -------------------- */
export const userServices = {
  listTcodes,
  getNested,
  listQuestionsByTcode,
  getQuestionByFilename
};

// Named exports already provided above
