// Taxonomy (synopsis) services — v2
// DB-backed via Prisma, aligned with the NEW schema:
// SyllabusTcode → SyllabusChapter(filename, sortOrder) → SyllabusExercise(filename, sortOrder)
// NOTE: We use `filename` as the slug everywhere. `sortOrder` is the only number.
//
// Import in server code only (e.g., +page.server.js / +server.js):
//   import { listTcodes, addTcode, ... } from '$lib/services/synopisisServices2.server.js';

import prisma from '$lib/server/prisma.js';

/* -------------------- helpers -------------------- */
async function _getTcodeOrThrow(tcode) {
  const row = await prisma.syllabusTcode.findUnique({ where: { tcode } });
  if (!row) {
    const err = new Error(`Unknown tcode: ${tcode}`);
    err.code = 'E_NOT_FOUND';
    throw err;
  }
  return row;
}

async function _getChapterOrThrow(tcode, chapterFilename) {
  const tc = await _getTcodeOrThrow(tcode);
  const ch = await prisma.syllabusChapter.findFirst({
    where: { tcodeId: tc.id, filename: chapterFilename }
  });
  if (!ch) {
    const err = new Error(`Unknown chapter: ${tcode}/${chapterFilename}`);
    err.code = 'E_NOT_FOUND';
    throw err;
  }
  return { tc, ch };
}

async function _nextChapterSortOrder(tcodeId) {
  const max = await prisma.syllabusChapter.aggregate({
    _max: { sortOrder: true },
    where: { tcodeId }
  });
  return (max._max.sortOrder ?? 0) + 1;
}

async function _nextExerciseSortOrder(chapterId) {
  const max = await prisma.syllabusExercise.aggregate({
    _max: { sortOrder: true },
    where: { chapterId }
  });
  return (max._max.sortOrder ?? 0) + 1;
}

/* -------------------- create (admin) -------------------- */
export async function addTcode({ tcode, name, description = null, image = null }) {
  if (!tcode || !name) throw new Error('tcode and name are required');
  return prisma.syllabusTcode.create({ data: { tcode, name, description, image } });
}

export async function addChapter({ tcode, filename, name, sortOrder = null }) {
  if (!tcode || !filename || !name) throw new Error('tcode, filename, name are required');
  const tc = await _getTcodeOrThrow(tcode);
  const order = sortOrder ?? (await _nextChapterSortOrder(tc.id));
  return prisma.syllabusChapter.create({
    data: { tcodeId: tc.id, filename, name, sortOrder: order }
  });
}

export async function addExercise({ tcode, chapterFilename, filename, name, sortOrder = null }) {
  if (!tcode || !chapterFilename || !filename || !name)
    throw new Error('tcode, chapterFilename, filename, name are required');
  const { ch } = await _getChapterOrThrow(tcode, chapterFilename);
  const order = sortOrder ?? (await _nextExerciseSortOrder(ch.id));
  return prisma.syllabusExercise.create({
    data: { chapterId: ch.id, filename, name, sortOrder: order }
  });
}

/* -------------------- list (for UI) -------------------- */
export async function listTcodes() {
  return prisma.syllabusTcode.findMany({
    orderBy: [{ name: 'asc' }],
    select: { id: true, tcode: true, name: true, description: true, image: true }
  });
}

export async function listChapters(tcode) {
  const tc = await _getTcodeOrThrow(tcode);
  return prisma.syllabusChapter.findMany({
    where: { tcodeId: tc.id },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    select: { id: true, filename: true, name: true, sortOrder: true }
  });
}

export async function listExercises(tcode, chapterFilename) {
  const { ch } = await _getChapterOrThrow(tcode, chapterFilename);
  return prisma.syllabusExercise.findMany({
    where: { chapterId: ch.id },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    select: { id: true, filename: true, name: true, sortOrder: true }
  });
}

/* -------------------- resolve / mapping -------------------- */
/** Return chapter sortOrder (handy if legacy Question.chapter expects a number). */
export async function chapterSortOrder(tcode, chapterFilename) {
  const { ch } = await _getChapterOrThrow(tcode, chapterFilename);
  return ch.sortOrder;
}

/** Validate & resolve chain; returns found rows + chapterSortOrder for linkage. */
export async function resolve({ tcode, chapterFilename = null, exerciseFilename = null }) {
  const tc = await _getTcodeOrThrow(tcode);
  if (!chapterFilename) return { ok: true, tcode: tc, chapter: null, exercise: null };

  const ch = await prisma.syllabusChapter.findFirst({ where: { tcodeId: tc.id, filename: chapterFilename } });
  if (!ch) return { ok: false, status: 404, error: `Unknown chapter: ${chapterFilename}` };

  if (!exerciseFilename) {
    return { ok: true, tcode: tc, chapter: ch, exercise: null, chapterSortOrder: ch.sortOrder };
  }
  const ex = await prisma.syllabusExercise.findFirst({ where: { chapterId: ch.id, filename: exerciseFilename } });
  if (!ex) return { ok: false, status: 404, error: `Unknown exercise: ${exerciseFilename}` };

  return { ok: true, tcode: tc, chapter: ch, exercise: ex, chapterSortOrder: ch.sortOrder };
}

/* -------------------- nested (preview/export) -------------------- */
export async function getNested(tcode = null) {
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
        exercises: exercises.map((e) => ({ name: e.name, filename: e.filename, sortOrder: e.sortOrder }))
      });
    }
    return result;
  }

  const tcodes = await listTcodes();
  const out = [];
  for (const tc of tcodes) out.push(await getNested(tc.tcode));
  return out;
}

/* -------------------- import / export (admin) -------------------- */
export async function exportSnapshot({ tcode = null } = {}) {
  return getNested(tcode);
}

/**
 * Import a snapshot (one tcode object or an array).
 * Shape per tcode:
 * {
 *   tcodeName, name?, description?, image?,
 *   chapters: [
 *     { name, filename, sortOrder?, exercises: [{ name, filename, sortOrder? }] }
 *   ]
 * }
 * Behavior: replace rows for that tcode inside a transaction (cascade delete).
 */
export async function importSnapshot(payload) {
  const tcodes = Array.isArray(payload) ? payload : [payload];

  return prisma.$transaction(async (tx) => {
    const results = [];
    for (const item of tcodes) {
      const tcode = item.tcodeName;
      const name = item.name ?? tcode;
      const description = item.description ?? null;
      const image = item.image ?? null;

      // drop existing snapshot for this tcode (children removed via onDelete: Cascade)
      const existing = await tx.syllabusTcode.findUnique({ where: { tcode } });
      if (existing) await tx.syllabusTcode.delete({ where: { id: existing.id } });

      // create tcode
      const tc = await tx.syllabusTcode.create({ data: { tcode, name, description, image } });

      // upsert chapters & exercises with given sortOrder; auto-increment if missing
      let chOrder = 0;
      for (const ch of item.chapters ?? []) {
        const sortOrder = Number.isFinite(ch.sortOrder) ? ch.sortOrder : ++chOrder;
        const chRow = await tx.syllabusChapter.create({
          data: { tcodeId: tc.id, filename: ch.filename, name: ch.name, sortOrder }
        });

        let exOrder = 0;
        for (const ex of ch.exercises ?? []) {
          const exSort = Number.isFinite(ex.sortOrder) ? ex.sortOrder : ++exOrder;
          await tx.syllabusExercise.create({
            data: { chapterId: chRow.id, filename: ex.filename, name: ex.name, sortOrder: exSort }
          });
        }
      }

      results.push({ tcode, created: true });
    }
    return results;
  });
}
