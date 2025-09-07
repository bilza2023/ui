// /src/routes/admin/edit-deck/+page.server.js
export const prerender = false;

import { error } from "@sveltejs/kit";
import { makeAction } from "$lib/formKit/actionFactory.js";
import { R } from "$lib/formKit/readers.js";
import { getQuestionBySlug, updateQuestion } from "$lib/services/questionServices.js";
import { syllabusService } from "$lib/services/syllabusService.js";

/** Build chapter/exercise lists exactly like upload/edit-note does */
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

/** Prefill by ?slug=... (same as edit-note, but with deck pretty-printed) */
export async function load({ url }) {
  const slug = (url.searchParams.get("slug") || "").trim();
  if (!slug) throw error(404, "Missing slug");

  const row = await getQuestionBySlug(slug, { includePayload: true });
  if (!row) throw error(404, "Not found");

  // Build chapter/exercise lists using the tcode
  let chapters = [];
  let exercisesByChapter = {};
  if (row.tcode) {
    const chaptersRows = await syllabusService.getChaptersByTcode(row.tcode, { includeExercises: true });
    const shaped = buildChapterExerciseLists(chaptersRows);
    chapters = shaped.chapters;
    exercisesByChapter = shaped.exercisesByChapter;
  }

  // Initial values (deck shown as a string for the textarea)
  const initial = {
    name: row.name ?? "",
    tcode: row.tcode ?? "",
    chapter: Number(row.chapter ?? 1),
    exercise: row.exercise ?? "",
    description: row.description ?? "",
    status: row.status ?? "",
    deck: row.deck
      ? (typeof row.deck === "string" ? row.deck : JSON.stringify(row.deck, null, 2))
      : ""
  };

  return {
    slug: row.slug,
    tcode: initial.tcode,
    chapters,
    exercisesByChapter,
    initial
  };
}

/* -------- form action (spec identical except noteHtml -> deck) -------- */
const spec = {
  slug: R.str("slug", { required: true }),

  name: R.str("name", { required: true }),
  tcode: R.str("tcode", { required: true }),
  chapter: R.num("chapter", { required: true, gte: 1 }),
  exercise: R.str("exercise", { required: true }),
  description: R.str("description"),
  status: R.$enum("status", ["draft", "ready", "published", "archived"], { optional: true }),

  // THE FIELD WE'RE EDITING:
  deck: R.str("deck", { required: true })
};

function prepare(v) {
  const name = v.name.trim();

  // Convert textarea string -> JSON for DB
  let deckObj;
  try {
    deckObj = JSON.parse(v.deck);
  } catch {
    const err = new Error("Invalid Deck JSON. Please paste valid JSON.");
    err.code = "VALIDATION";
    throw err;
  }

  return {
    key: v.slug,
    payload: {
      name,
      description: v.description || null,
      deck: deckObj
    },
    // Keep original string sticky for the form on error/success
    sticky: {
      name,
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      description: v.description ?? "",
      deck: v.deck ?? ""
    }
  };
}

async function service({ key, payload }) {
  await updateQuestion(key, payload);
  return { slug: key };
}

function success(result, v) {
  return {
    ok: true,
    message: "Updated successfully.",
    saved: result?.slug,
    values: {
      name: v.sticky.name,
      tcode: v.sticky.tcode,
      chapter: v.sticky.chapter,
      exercise: v.sticky.exercise,
      status: v.sticky.status,
      description: v.sticky.description,
      deck: v.sticky.deck
    }
  };
}

function failure(err, v) {
  return {
    ok: false,
    message: err?.message || "Could not update.",
    values: {
      name: v.sticky?.name ?? v.name,
      tcode: v.sticky?.tcode ?? v.tcode,
      chapter: v.sticky?.chapter ?? v.chapter,
      exercise: v.sticky?.exercise ?? v.exercise,
      status: v.sticky?.status ?? v.status ?? "",
      description: v.sticky?.description ?? v.description ?? "",
      deck: v.sticky?.deck ?? v.deck ?? ""
    }
  };
}

export const actions = {
  save: makeAction({ spec, prepare, service, success, failure })
};
