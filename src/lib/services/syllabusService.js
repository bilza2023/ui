// /src/lib/services/syllabusService.js
// ID-first syllabus service on top of crudl().
// Enforces delete restrictions when dependents exist.

import crudl from '../crudl/crudl.js';

// ---------- helpers ----------
const toInt = (v) => (v == null || v === '' ? null : Number.parseInt(v, 10));
const byOrderThenName = (a, b) => {
  const soA = a?.sortOrder ?? 0, soB = b?.sortOrder ?? 0;
  if (soA !== soB) return soA - soB;
  const na = (a?.name || '').toLowerCase();
  const nb = (b?.name || '').toLowerCase();
  return na.localeCompare(nb);
};
const fkError = (msg) => { const e = new Error(msg); e.code = 'FK_RESTRICT'; return e; };

// ---------- table adapters ----------
const tcodes    = crudl('syllabusTcode',   { defaultOrderBy: [{ createdAt: 'asc' }] });
const chapters  = crudl('syllabusChapter', { defaultOrderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
const exercises = crudl('syllabusExercise',{ defaultOrderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
const questions = crudl('question');

// ---------- Tcodes ----------
export async function listTcodes() {
  const rows = await tcodes.list({});
  return rows.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}
export async function getTcode(id) {
  const i = toInt(id);
  if (!i) return null;
  try { return await tcodes.read(i); } catch { return null; }
}
export async function getTcodeBySlug(slug) {
  if (!slug) return null;
  try { return await tcodes.read({ slug: slug.trim() }); } catch { return null; }
}
export async function createTcode(data) {
  return tcodes.create({
    slug: data.slug?.trim(),
    name: data.name?.trim(),
    description: data.description ?? '',
    image: data.image ?? ''
  });
}
export async function updateTcode(id, data) {
  return tcodes.update(toInt(id), {
    slug: data.slug?.trim(),
    name: data.name?.trim(),
    description: data.description ?? '',
    image: data.image ?? ''
  });
}
export async function deleteTcode(id) {
  const i = toInt(id);
  const [chs, qs] = await Promise.all([
    chapters.list({ filters: { tcodeId: i } }),
    questions.list({ filters: { tcodeId: i }, limit: 1 })
  ]);
  if (chs.length) throw fkError('Tcode has chapters');
  if (qs.length)  throw fkError('Tcode has questions');
  return tcodes.delete(i);
}

// ---------- Chapters ----------
export async function listChapters(tcodeId) {
  const rows = await chapters.list({ filters: { tcodeId: toInt(tcodeId) } });
  return rows.sort(byOrderThenName);
}
export async function getChapter(id) {
  const i = toInt(id);
  if (!i) return null;
  try { return await chapters.read(i); } catch { return null; }
}
export async function getChapterBySlug(tcodeId, slug) {
  const rows = await chapters.list({ filters: { tcodeId: toInt(tcodeId), slug: slug?.trim() } });
  return rows?.[0] || null;
}
export async function createChapter(data) {
  const tcodeId = toInt(data.tcodeId);
  if (!tcodeId) throw new Error('tcodeId required');
  return chapters.create({
    tcodeId,
    slug: data.slug?.trim(),
    name: data.name?.trim(),
    sortOrder: toInt(data.sortOrder) ?? 0
  });
}
export async function updateChapter(id, data) {
  return chapters.update(toInt(id), {
    slug: data.slug?.trim(),
    name: data.name?.trim(),
    sortOrder: toInt(data.sortOrder) ?? 0
  });
}
export async function deleteChapter(id) {
  const i = toInt(id);
  const [exs, qs] = await Promise.all([
    exercises.list({ filters: { chapterId: i } }),
    questions.list({ filters: { chapterId: i }, limit: 1 })
  ]);
  if (exs.length) throw fkError('Chapter has exercises');
  if (qs.length)  throw fkError('Chapter has questions');
  return chapters.delete(i);
}

// ---------- Exercises ----------
export async function listExercises(chapterId) {
  const rows = await exercises.list({ filters: { chapterId: toInt(chapterId) } });
  return rows.sort(byOrderThenName);
}
export async function getExercise(id) {
  const i = toInt(id);
  if (!i) return null;
  try { return await exercises.read(i); } catch { return null; }
}
export async function getExerciseBySlug(chapterId, slug) {
  const rows = await exercises.list({ filters: { chapterId: toInt(chapterId), slug: slug?.trim() } });
  return rows?.[0] || null;
}
export async function createExercise(data) {
  const chapterId = toInt(data.chapterId);
  if (!chapterId) throw new Error('chapterId required');
  return exercises.create({
    chapterId,
    slug: data.slug?.trim(),
    name: data.name?.trim(),
    sortOrder: toInt(data.sortOrder) ?? 0
  });
}
export async function updateExercise(id, data) {
  return exercises.update(toInt(id), {
    slug: data.slug?.trim(),
    name: data.name?.trim(),
    sortOrder: toInt(data.sortOrder) ?? 0
  });
}
export async function deleteExercise(id) {
  const i = toInt(id);
  const qs = await questions.list({ filters: { exerciseId: i }, limit: 1 });
  if (qs.length) throw fkError('Exercise has questions');
  return exercises.delete(i);
}

// ---------- Domain reads ----------
export async function getSyllabusForTcode(tcodeId) {
  const tId = toInt(tcodeId);
  const [tcode, chs] = await Promise.all([getTcode(tId), listChapters(tId)]);
  const exByChapter = Object.fromEntries(
    await Promise.all(chs.map(async (c) => [c.id, await listExercises(c.id)]))
  );
  return { tcode, chapters: chs, exercisesByChapter: exByChapter };
}

export async function getSynopsis(tcodeId) {
  const tId = toInt(tcodeId);
  const tcode = await getTcode(tId);
  const chs = await listChapters(tId);
  return {
    id: tcode?.id,
    slug: tcode?.slug,
    name: tcode?.name,
    description: tcode?.description ?? '',
    image: tcode?.image ?? '',
    chapters: await Promise.all(
      chs.map(async (c) => ({
        id: c.id,
        tcodeId: c.tcodeId,
        slug: c.slug,
        name: c.name,
        sortOrder: c.sortOrder ?? 0,
        exercises: (await listExercises(c.id)).map((e) => ({
          id: e.id,
          chapterId: e.chapterId,
          slug: e.slug,
          name: e.name,
          sortOrder: e.sortOrder ?? 0
        }))
      }))
    )
  };
}

export async function getFormOptions(tcodeId) {
  const tId = toInt(tcodeId);
  const chs = await listChapters(tId);
  const chaptersOpts = chs.map((c) => ({ value: c.id, label: c.name }));
  const exercisesByChapter = {};
  for (const c of chs) {
    const exs = await listExercises(c.id);
    exercisesByChapter[c.id] = exs.map((e) => ({ value: e.id, label: e.name }));
  }
  return { chapters: chaptersOpts, exercisesByChapter };
}
