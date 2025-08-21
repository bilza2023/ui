import { _ as __vite_glob_0_2, a as __vite_glob_0_1, b as __vite_glob_0_0 } from './index2-CbmtHu8g.js';

const synModules = /* @__PURE__ */ Object.assign({ "../synopsis/fbise9mathold.js": __vite_glob_0_0, "../synopsis/fbise9physics.js": __vite_glob_0_1, "../synopsis/index.js": __vite_glob_0_2 });
const _cache = {
  loaded: false,
  tcodes: [],
  synopsisByTcode: {},
  chapterNoByTcode: {},
  // tcode -> chapterSlug -> number
  chaptersByTcode: {},
  exercisesByKey: {}
  // `${tcode}::${chapterSlug}` -> exercises
};
function deriveChapterNumber(chapterName, chapterSlug, fallback) {
  let m = /ch[\s-]*0*([0-9]+)/i.exec(chapterName || "");
  if (m) return parseInt(m[1], 10);
  m = /^ch0*([0-9]+)/i.exec(chapterSlug || "");
  if (m) return parseInt(m[1], 10);
  return fallback;
}
function validateSynopsis(s) {
  const errs = [];
  if (!s || !s.tcodeName) errs.push("tcodeName missing");
  const seenChapterIds = /* @__PURE__ */ new Set();
  (s.chapters ?? []).forEach((ch, i) => {
    if (!ch?.name) errs.push(`chapter[${i}].name missing`);
    if (!ch?.filename) errs.push(`chapter[${i}].filename missing`);
    if (seenChapterIds.has(ch.filename)) errs.push(`duplicate chapter filename: ${ch.filename}`);
    seenChapterIds.add(ch.filename);
    const seenExerciseIds = /* @__PURE__ */ new Set();
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
    if (!v.ok) console.warn("[synopsisServices] Validation issues:", raw.tcodeName, v.errors);
    const chapters = (raw.chapters ?? []).map((ch, idx) => {
      const number = deriveChapterNumber(ch.name, ch.filename, idx + 1);
      const exercises = (ch.exercises ?? []).map((ex, jdx) => ({
        name: ex.name,
        filename: ex.filename,
        order: jdx
      }));
      return { name: ch.name, filename: ch.filename, number, order: idx, exercises };
    });
    const synopsis = {
      tcodeName: raw.tcodeName,
      description: raw.description ?? "",
      image: raw.image ?? "",
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
function listTcodes() {
  prepareOnce();
  return _cache.tcodes.slice();
}
function getChapters(tcode) {
  prepareOnce();
  const list = _cache.chaptersByTcode[tcode] || [];
  return list.slice().sort((a, b) => a.order - b.order);
}
function getExercises(tcode, chapterSlug) {
  prepareOnce();
  const list = _cache.exercisesByKey[`${tcode}::${chapterSlug}`] || [];
  return list.slice().sort((a, b) => a.order - b.order);
}
function chapterNo(tcode, chapterSlug) {
  prepareOnce();
  const map = _cache.chapterNoByTcode[tcode] || {};
  const n = map[chapterSlug];
  if (!n) throw new Error(`Unknown chapter slug for tcode "${tcode}": ${chapterSlug}`);
  return n;
}
function resolvePath(tcode, chapterSlug, exerciseSlug) {
  prepareOnce();
  const syn = _cache.synopsisByTcode[tcode];
  if (!syn) return { ok: false, status: 404, error: `Unknown tcode: ${tcode}` };
  if (!chapterSlug) return { ok: true, tcode: syn.tcodeName, chapter: null, exercise: null };
  const chapter = syn.chapters.find((c) => c.filename === chapterSlug);
  if (!chapter) return { ok: false, status: 404, error: `Unknown chapter: ${chapterSlug}` };
  if (!exerciseSlug) return { ok: true, tcode: syn.tcodeName, chapter, exercise: null };
  const exercise = chapter.exercises.find((e) => e.filename === exerciseSlug);
  if (!exercise) return { ok: false, status: 404, error: `Unknown exercise: ${exerciseSlug}` };
  return { ok: true, tcode: syn.tcodeName, chapter, exercise };
}

export { getExercises as a, chapterNo as c, getChapters as g, listTcodes as l, resolvePath as r };
//# sourceMappingURL=synopsisServices-C-26dl2-.js.map
