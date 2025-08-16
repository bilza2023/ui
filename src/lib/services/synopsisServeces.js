
// /src/lib/services/synopsisServeces.js
// Synopsis loader & helpers (no mutations of name/filename).
// - For upload pages: listTcodes, getChapters, getExercises, chapterNo
// - For syllabus pages: resolvePath, getExerciseCounts, getExerciseContent
// Notes:
//   • Loads /src/lib/synopsis/*.js eagerly.
//   • DB reads are server-only (dynamic import of prisma).

const synModules = import.meta.glob('../synopsis/*.js', { eager: true });

/** @typedef {{ name:string, filename:string, order:number }} Exercise */
/** @typedef {{ name:string, filename:string, number:number, order:number, exercises:Exercise[] }} Chapter */
/** @typedef {{ tcodeName:string, description?:string, image?:string, chapters:Chapter[] }} TcodeSynopsis */
/** @typedef {{ tcodeName:string, description?:string, image?:string }} TcodeMeta */

const _cache = {
  loaded: false,
  tcodes /** @type TcodeMeta[] */: [],
  synopsisByTcode /** @type Record<string, TcodeSynopsis> */: {},
  chapterNoByTcode /** @type Record<string, Record<string, number>> */: {}, // tcode -> chapterSlug -> number
  chaptersByTcode /** @type Record<string, Chapter[]> */: {},
  exercisesByKey /** @type Record<string, Exercise[]> */: {}               // `${tcode}::${chapterSlug}` -> exercises
};

// ---------- internal utils (non-destructive) ----------
function deriveChapterNumber(chapterName, chapterSlug, fallback) {
  // Try "Ch-01 ..." within the name (does not modify)
  let m = /ch[\s-]*0*([0-9]+)/i.exec(chapterName || '');
  if (m) return parseInt(m[1], 10);
  // Try slug like "ch01-..." (does not modify)
  m = /^ch0*([0-9]+)/i.exec(chapterSlug || '');
  if (m) return parseInt(m[1], 10);
  // Fallback to position
  return fallback;
}

function validateSynopsis(s /** @type any */) {
  const errs = [];
  if (!s || !s.tcodeName) errs.push('tcodeName missing');

  const seenChapterIds = new Set();
  (s.chapters ?? []).forEach((ch, i) => {
    if (!ch?.name) errs.push(`chapter[${i}].name missing`);
    if (!ch?.filename) errs.push(`chapter[${i}].filename missing`);
    if (seenChapterIds.has(ch.filename)) errs.push(`duplicate chapter filename: ${ch.filename}`);
    seenChapterIds.add(ch.filename);

    const seenExerciseIds = new Set();
    (ch.exercises ?? []).forEach((ex, j) => {
      if (!ex?.name) errs.push(`exercise[${i}.${j}].name missing`);
      if (!ex?.filename) errs.push(`exercise[${i}.${j}].filename missing`);
      if (seenExerciseIds.has(ex.filename)) errs.push(`duplicate exercise filename in chapter "${ch.filename}": ${ex.filename}`);
      seenExerciseIds.add(ex.filename);
    });
  });

  return { ok: errs.length === 0, errors: errs };
}

function prepareOnce() {
  if (_cache.loaded) return;

  const tcodes = [];
  for (const [, mod] of Object.entries(synModules)) {
    const raw = mod?.default;
    if (!raw?.tcodeName) continue;

    const v = validateSynopsis(raw);
    if (!v.ok) console.warn('[synopsisServeces] Validation issues:', raw.tcodeName, v.errors);

    // Build immutable-shaped caches (preserve names/filenames exactly)
    const chapters = (raw.chapters ?? []).map((ch, idx) => {
      const number = deriveChapterNumber(ch.name, ch.filename, idx + 1);
      const exercises = (ch.exercises ?? []).map((ex, jdx) => ({
        name: ex.name,
        filename: ex.filename,
        order: jdx
      }));
      return {
        name: ch.name,
        filename: ch.filename,
        number,
        order: idx,
        exercises
      };
    });

    const synopsis = {
      tcodeName: raw.tcodeName,
      description: raw.description ?? '',
      image: raw.image ?? '',
      chapters
    };

    _cache.synopsisByTcode[synopsis.tcodeName] = synopsis;
    _cache.chaptersByTcode[synopsis.tcodeName] = chapters;

    const chNoMap = {};
    for (const ch of chapters) chNoMap[ch.filename] = ch.number;
    _cache.chapterNoByTcode[synopsis.tcodeName] = chNoMap;

    for (const ch of chapters) {
      _cache.exercisesByKey[`${synopsis.tcodeName}::${ch.filename}`] = ch.exercises;
    }

    tcodes.push({ tcodeName: synopsis.tcodeName, description: synopsis.description, image: synopsis.image });
  }

  tcodes.sort((a, b) => a.tcodeName.localeCompare(b.tcodeName));
  _cache.tcodes = tcodes;
  _cache.loaded = true;
}

// ---------- PUBLIC: discovery / dropdowns ----------
export function listTcodes() {
  prepareOnce();
  return _cache.tcodes.slice();
}

export function getSynopsis(tcode /** @type string */) {
  prepareOnce();
  const syn = _cache.synopsisByTcode[tcode];
  if (!syn) throw new Error(`Unknown tcode: ${tcode}`);
  return syn;
}

export function getChapters(tcode /** @type string */) {
  prepareOnce();
  const list = _cache.chaptersByTcode[tcode] || [];
  return list.slice().sort((a, b) => a.order - b.order);
}

export function getExercises(tcode /** @type string */, chapterSlug /** @type string */) {
  prepareOnce();
  const list = _cache.exercisesByKey[`${tcode}::${chapterSlug}`] || [];
  return list.slice().sort((a, b) => a.order - b.order);
}

export function chapterNo(tcode /** @type string */, chapterSlug /** @type string */) {
  prepareOnce();
  const map = _cache.chapterNoByTcode[tcode] || {};
  const n = map[chapterSlug];
  if (!n) throw new Error(`Unknown chapter slug for tcode "${tcode}": ${chapterSlug}`);
  return n;
}

export function resolvePath(tcode, chapterSlug, exerciseSlug) {
  prepareOnce();
  const syn = _cache.synopsisByTcode[tcode];
  if (!syn) return { ok: false, status: 404, error: `Unknown tcode: ${tcode}` };

  if (!chapterSlug) return { ok: true, tcode: syn.tcodeName, chapter: null, exercise: null };

  const chapter = syn.chapters.find(c => c.filename === chapterSlug);
  if (!chapter) return { ok: false, status: 404, error: `Unknown chapter: ${chapterSlug}` };

  if (!exerciseSlug) return { ok: true, tcode: syn.tcodeName, chapter, exercise: null };

  const exercise = chapter.exercises.find(e => e.filename === exerciseSlug);
  if (!exercise) return { ok: false, status: 404, error: `Unknown exercise: ${exerciseSlug}` };

  return { ok: true, tcode: syn.tcodeName, chapter, exercise };
}

// ---------- SERVER-ONLY: DB merge helpers ----------
async function getPrisma() {
  if (typeof window !== 'undefined') {
    throw new Error('DB access from synopsisServeces: server-only function invoked on client.');
  }
  const { default: prisma } = await import('$lib/server/prisma.js');
  return prisma;
}

/**
 * Count items for each exercise in a chapter.
 * Returns: { [exerciseSlug]: { total, deck, note, latestEditedAt } }
 */
export async function getExerciseCounts(tcode, chapterSlug) {
  prepareOnce();
  const chNumber = chapterNo(tcode, chapterSlug);
  const exercises = getExercises(tcode, chapterSlug);
  const exerciseSlugs = exercises.map(e => e.filename);
  if (exerciseSlugs.length === 0) return {};

  const prisma = await getPrisma();
  const rows = await prisma.question.findMany({
    where: { tcode, chapter: chNumber, exercise: { in: exerciseSlugs } },
    select: { exercise: true, type: true, editedAt: true }
  });

  const acc = {};
  for (const slug of exerciseSlugs) {
    acc[slug] = { total: 0, deck: 0, note: 0, latestEditedAt: null };
  }
  for (const r of rows) {
    const b = acc[r.exercise];
    if (!b) continue;
    b.total += 1;
    if (r.type === 'deck') b.deck += 1;
    if (r.type === 'note') b.note += 1;
    if (!b.latestEditedAt || new Date(r.editedAt) > new Date(b.latestEditedAt)) {
      b.latestEditedAt = r.editedAt;
    }
  }
  return acc;
}

/**
 * List items in an exercise (for drill-in pages).
 * Options: { typeFilter?, statusFilter?, limit?, offset? }
 */
export async function getExerciseContent(tcode, chapterSlug, exerciseSlug, opts = {}) {
  prepareOnce();
  const chNumber = chapterNo(tcode, chapterSlug);

  const prisma = await getPrisma();
  const where = {
    tcode,
    chapter: chNumber,
    exercise: exerciseSlug
  };
  if (opts.typeFilter) where.type = opts.typeFilter;
  if (opts.statusFilter) where.status = opts.statusFilter;

  const rows = await prisma.question.findMany({
    where,
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'asc' }
    ],
    skip: opts.offset ?? 0,
    take: opts.limit ?? 200,
    select: {
      filename: true, type: true, name: true, description: true, status: true, tags: true,
      sortOrder: true, timed: true, createdAt: true, editedAt: true
    }
  });

  return rows;
}
