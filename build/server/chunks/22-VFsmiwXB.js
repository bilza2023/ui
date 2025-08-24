import { t as tcodes } from './index2-DD8FmDw3.js';
import { g as getChapters, a as getExercises, r as resolvePath, c as chapterNo } from './synopsisServices-Cl9miXx7.js';
import { p as prisma } from './prisma-CbVrW2fI.js';
import '@prisma/client';

async function getExerciseCounts(tcode, chapterSlug) {
  const chNumber = chapterNo(tcode, chapterSlug);
  const exercises = getExercises(tcode, chapterSlug);
  const exerciseSlugs = exercises.map((e) => e.filename);
  if (exerciseSlugs.length === 0) return {};
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
    b.total++;
    if (r.type === "deck") b.deck++;
    if (r.type === "note") b.note++;
    if (!b.latestEditedAt || new Date(r.editedAt) > new Date(b.latestEditedAt)) {
      b.latestEditedAt = r.editedAt;
    }
  }
  return acc;
}
async function getExerciseContent(tcode, chapterSlug, exerciseSlug, opts = {}) {
  const chNumber = chapterNo(tcode, chapterSlug);
  const where = { tcode, chapter: chNumber, exercise: exerciseSlug };
  if (opts.typeFilter) where.type = opts.typeFilter;
  if (opts.statusFilter) where.status = opts.statusFilter;
  return prisma.question.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    skip: opts.offset ?? 0,
    take: opts.limit ?? 200,
    select: {
      filename: true,
      thumbnail: true,
      type: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      sortOrder: true,
      timed: true,
      createdAt: true,
      editedAt: true
    }
  });
}
const prerender = false;
async function load({ url }) {
  const tcodes$1 = tcodes;
  const q = url.searchParams;
  const reqTcode = q.get("tcode") || "";
  const reqChapter = q.get("chapter") || "";
  const reqEx = q.get("exercise") || "";
  const typeParam = q.get("type");
  if (!tcodes$1 || tcodes$1.length === 0) {
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
  const fallbackTcode = tcodes$1[0].tcodeName;
  let tcode = reqTcode && tcodes$1.find((t) => t.tcodeName === reqTcode) ? reqTcode : fallbackTcode;
  let chapters = getChapters(tcode);
  let chapter = reqChapter && chapters.find((c) => c.filename === reqChapter) ? reqChapter : chapters[0]?.filename ?? null;
  let exercises = tcode && chapter ? getExercises(tcode, chapter) : [];
  let exercise = reqEx && exercises.find((e) => e.filename === reqEx) ? reqEx : exercises[0]?.filename ?? null;
  const pathCheck = resolvePath(tcode, chapter, exercise);
  if (!pathCheck.ok) {
    tcode = fallbackTcode;
    chapters = getChapters(tcode);
    chapter = chapters[0]?.filename ?? null;
    exercises = tcode && chapter ? getExercises(tcode, chapter) : [];
    exercise = exercises[0]?.filename ?? null;
  }
  const typeFilter = typeParam === "deck" || typeParam === "note" ? typeParam : null;
  let counts = {};
  let items = [];
  if (tcode && chapter) {
    try {
      counts = await getExerciseCounts(tcode, chapter);
    } catch (e) {
      console.error("[syllabus] getExerciseCounts failed:", e);
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
      console.error("[syllabus] getExerciseContent failed:", e);
      items = [];
    }
  }
  return {
    tcodeList: tcodes$1,
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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 22;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-MLAGLlP6.js')).default;
const server_id = "src/routes/syllabus/+page.server.js";
const imports = ["_app/immutable/nodes/22.jPzU55n4.js","_app/immutable/chunks/C5V-7dkx.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/CqL6qkBr.js","_app/immutable/chunks/CXNmKXog.js","_app/immutable/chunks/DF3-wX0J.js","_app/immutable/chunks/D1FHg2ZF.js","_app/immutable/chunks/mOD5hCtY.js"];
const stylesheets = ["_app/immutable/assets/QuestionCards.Bi96CsV5.css","_app/immutable/assets/Nav.BS7ocfio.css","_app/immutable/assets/22.DzeWSahU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=22-VFsmiwXB.js.map
