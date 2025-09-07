// /src/routes/admin/edit-note/+page.server.js
export const prerender = false;

import { error } from "@sveltejs/kit";
import { makeAction } from "$lib/formKit/actionFactory.js";
import { R } from "$lib/formKit/readers.js";
import { getQuestionBySlug, updateQuestion } from "$lib/services/questionServices.js";
import { syllabusService } from "$lib/services/syllabusService.js";

/** Build chapter/exercise lists exactly like upload-note does */
function buildChapterExerciseLists(chaptersRows) {
  const chapters = chaptersRows
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((c, i) => ({ value: i + 1, label: c.name, slug: c.slug }));

  const exercisesByChapter = {};
  for (const c of chaptersRows) {
    const list = (c.exercises ?? [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((e) => ({ value: e.slug, label: e.name }));
    exercisesByChapter[c.slug] = list;
  }
  return { chapters, exercisesByChapter };
}

/** Prefill by ?slug=... and return the SAME shape upload-note expects (plus slug) */
export async function load({ url }) {
  const slug = (url.searchParams.get("slug") || "").trim();
  if (!slug) throw error(404, "Missing note slug");

  const row = await getQuestionBySlug(slug, { includePayload: true });
  if (!row) throw error(404, "Note not found");
  if (row.type !== "note") throw error(400, "This item is not a note. Use the edit-deck route.");

  // Build chapter/exercise lists using the existing tcode (for consistent UI)
  let chapters = [];
  let exercisesByChapter = {};
  if (row.tcode) {
    const chaptersRows = await syllabusService.getChaptersByTcode(row.tcode, { includeExercises: true });
    const shaped = buildChapterExerciseLists(chaptersRows);
    chapters = shaped.chapters;
    exercisesByChapter = shaped.exercisesByChapter;
  }

  // Initial values (mirror upload-note field names, notably 'noteHtml')
  const initial = {
    name: row.name ?? "",
    tcode: row.tcode ?? "",
    chapter: Number(row.chapter ?? 1),
    exercise: row.exercise ?? "",
    description: row.description ?? "",
    status: row.status ?? "",
    noteHtml: row.note ?? ""
  };

  return {
    slug: row.slug,                // extra (hidden) field for targeting
    tcode: initial.tcode,
    chapters,
    exercisesByChapter,
    initial
  };
}

/* -------- form action (spec kept IDENTICAL to upload-note) -------- */
/* We only update name/description/note on the server, but we keep spec consistent
   so the client form renders/validates exactly like upload-note. */

const spec = {
  slug: R.str("slug", { required: true }),                           // hidden

  name: R.str("name", { required: true }),
  tcode: R.str("tcode", { required: true }),
  chapter: R.num("chapter", { required: true, gte: 1 }),
  exercise: R.str("exercise", { required: true }),
  description: R.str("description"),
  status: R.$enum("status", ["draft", "ready", "published", "archived"], { optional: true }),
  noteHtml: R.str("noteHtml", { required: true })                     // SAME as upload-note
};

function prepare(v) {
  // Ignore tcode/chapter/exercise/status (anchors) on update; we only edit the text fields
  const name = v.name.trim();
  return {
    key: v.slug,
    payload: {
      name,
      description: v.description || null,
      note: v.noteHtml
    },
    sticky: {
      // keep everything sticky to mirror the UX
      slug: v.slug,
      name,
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      description: v.description ?? "",
      noteHtml: v.noteHtml ?? ""
    }
  };
}

async function service({ key, payload }) {
  await updateQuestion(key, payload);
  return { slug: key };
}

function success(result, v) {
  const s = v.sticky || {};
  return {
    ok: true,
    message: "Updated successfully.",
    saved: result?.slug,
    values: {
      slug: s.slug,
      name: s.name,
      tcode: s.tcode,
      chapter: s.chapter,
      exercise: s.exercise,
      status: s.status,
      description: s.description,
      noteHtml: s.noteHtml
    }
  };
}

function failure(err, v) {
  const s = v.sticky || {};
  return {
    ok: false,
    message: err?.message || "Could not update the note.",
    values: {
      slug: s.slug ?? v.slug,
      name: s.name ?? v.name,
      tcode: s.tcode ?? v.tcode,
      chapter: s.chapter ?? v.chapter,
      exercise: s.exercise ?? v.exercise,
      status: s.status ?? v.status ?? "",
      description: s.description ?? v.description ?? "",
      noteHtml: s.noteHtml ?? v.noteHtml ?? ""
    }
  };
}

export const actions = {
  // keep action name 'save' (same as upload-note pattern)
  save: makeAction({ spec, prepare, service, success, failure })
};
