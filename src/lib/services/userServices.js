// src/lib/services/userServices.js
// ------------------------------------------------------------
// Public-facing service layer for learners / UI pages.
// Only exposes safe READ methods (no admin mutations).
// ------------------------------------------------------------

import prisma from '$lib/server/prisma.js';

/* -------------------- Tcodes -------------------- */
export async function listTcodes() {
  return prisma.syllabusTcode.findMany({
    orderBy: [{ name: 'asc' }],
    select: { id: true, tcode: true, name: true, description: true, image: true }
  });
}

export async function getNested(tcode = null) {
  async function _getTcodeOrThrow(tcode) {
    const row = await prisma.syllabusTcode.findUnique({ where: { tcode } });
    if (!row) {
      const err = new Error(`Unknown tcode: ${tcode}`);
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
      select: { id: true, filename: true, name: true, sortOrder: true }
    });

    const result = {
      tcodeName: tc.tcode,
      name: tc.name,
      description: tc.description ?? null,
      image: tc.image ?? null,
      chapters: []
    };

    for (const ch of chapters) {
      const exercises = await prisma.syllabusExercise.findMany({
        where: { chapterId: ch.id },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        select: { filename: true, name: true, sortOrder: true }
      });
      result.chapters.push({
        name: ch.name,
        filename: ch.filename,
        sortOrder: ch.sortOrder,
        exercises: exercises.map((e) => ({
          name: e.name,
          filename: e.filename,
          sortOrder: e.sortOrder
        }))
      });
    }
    return result;
  }

  const tcodes = await listTcodes();
  const out = [];
  for (const tc of tcodes) out.push(await getNested(tc.tcode));
  return out;
}

/* -------------------- Questions -------------------- */
export async function listQuestionsByTcode({
  tcode,
  chapter,
  exercise,
  type,                  // optional: 'deck' | 'note'
  selectPayload = false, // false = omit deck/note blobs
  limit = 500
} = {}) {
  if (!tcode) throw new Error('listQuestionsByTcode: tcode required');

  /** @type {import('@prisma/client').Prisma.QuestionWhereInput} */
  const where = { tcode };
  if (chapter)  where.chapter  = chapter;
  if (exercise) where.exercise = exercise;
  if (type)     where.type     = type;

  /** @type {import('@prisma/client').Prisma.QuestionSelect} */
  const select = {
    filename: true,
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

  return prisma.question.findMany({
    where,
    select,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    take: limit
  });
}

export async function getQuestionByFilename(filename, opts = {}) {
  if (!filename) throw new Error('getQuestionByFilename: filename required');
  const { selectPayload = true } = opts;

  /** @type {import('@prisma/client').Prisma.QuestionSelect} */
  const select = {
    filename: true,
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

  return prisma.question.findUnique({ where: { filename }, select });
}

/* -------------------- Unified surface -------------------- */
export const userServices = {
  listTcodes,
  getNested,
  listQuestionsByTcode,
  getQuestionByFilename
};

// Named exports already provided above
