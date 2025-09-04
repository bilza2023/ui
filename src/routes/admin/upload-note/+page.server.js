// /src/routes/upload-note/+page.server.js
export const prerender = false;

import { makeAction } from "$lib/formKit/actionFactory.js";
import { R } from "$lib/formKit/readers.js";
import { createQuestion } from "$lib/services/questionServices.js";
import { syllabusService } from "$lib/services/syllabusService.js";

// deterministic slug from name
const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export async function load({ url }) {
  const tcode = (url.searchParams.get("tcode") || "").trim();

  if (!tcode) {
    return {
      tcode: "",
      chapters: [],            // [{ value:number, label:string, slug:string }]
      exercisesByChapter: {},  // { [chapterSlug]: [{ value:string, label:string }] }
    };
  }

  // Get chapters with exercises
  const chaptersRows = await syllabusService.getChaptersByTcode(tcode, { includeExercises: true });

  // Sort by sortOrder (if any), but ALWAYS set the option value by index (i+1)
  const chapters = chaptersRows
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((c, i) => ({
      value: i + 1,      // <-- FIX: was (c.sortOrder ?? i) + 1, which collapsed to 1 for all when sortOrder=0
      label: c.name,
      slug: c.slug
    }));

  const exercisesByChapter = {};
  for (const c of chaptersRows) {
    const list = (c.exercises ?? [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((e) => ({ value: e.slug, label: e.name }));
    exercisesByChapter[c.slug] = list;
  }

  return { tcode, chapters, exercisesByChapter };
}

// -------- form action ----------
const spec = {
  name: R.str("name", { required: true }),
  tcode: R.str("tcode", { required: true }),
  chapter: R.num("chapter", { required: true, gte: 1 }),
  exercise: R.str("exercise", { required: true }),
  description: R.str("description"),
  status: R.$enum("status", ["draft", "ready", "published", "archived"], { optional: true }),
  noteHtml: R.str("noteHtml", { required: true })
};

function prepare(v) {
  const name = v.name.trim();
  const slug = slugify(name);
  return {
    payload: {
      slug,
      tcode: v.tcode,
      chapter: Number(v.chapter),   // numeric, 1-based index aligned with chapters[] above
      exercise: v.exercise,
      type: "note",
      name,
      description: v.description || null,
      status: v.status || null,
      timed: false,
      note: v.noteHtml
    }
  };
}

async function service({ payload }) {
  const row = await createQuestion(payload);
  return { id: row?.id ?? null, slug: payload.slug };
}

function success(result, v) {
  return {
    ok: true,
    message: "Saved successfully.",
    saved: result?.slug,
    values: {
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      name: "",
      description: "",
      noteHtml: ""
    }
  };
}

function failure(err, v) {
  return {
    ok: false,
    message: err?.message || "Could not save the note.",
    values: {
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      name: v.name,
      description: v.description ?? "",
      noteHtml: v.noteHtml ?? ""
    }
  };
}

export const actions = {
  save: makeAction({ spec, prepare, service, success, failure })
};
