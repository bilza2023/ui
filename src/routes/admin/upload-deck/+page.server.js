// /src/routes/upload-deck/+page.server.js
export const prerender = false;

import { makeAction } from "$lib/formKit/actionFactory.js";
import { R } from "$lib/formKit/readers.js";
import { createQuestion } from "$lib/services/questionServices.js";
import { syllabusService } from "$lib/services/syllabusService.js";

const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export async function load({ url }) {
  const tcode = (url.searchParams.get("tcode") || "").trim();

  if (!tcode) {
    return { tcode: "", chapters: [], exercisesByChapter: {} };
  }

  const chaptersRows = await syllabusService.getChaptersByTcode(tcode, { includeExercises: true });

  const chapters = chaptersRows
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((c, i) => ({
      value: (c.sortOrder ?? i) + 1,   // numeric for action
      label: c.name,
      slug: c.slug
    }));

  const exercisesByChapter = {};
  for (const c of chaptersRows) {
    exercisesByChapter[c.slug] = (c.exercises ?? [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((e) => ({ value: e.slug, label: e.name })); // label=name, value=slug
  }

  return { tcode, chapters, exercisesByChapter };
}

// ---------- form action ----------
const spec = {
  name: R.str("name", { required: true }),
  tcode: R.str("tcode", { required: true }),
  chapter: R.num("chapter", { required: true, gte: 1 }),
  exercise: R.str("exercise", { required: true }),
  description: R.str("description"),
  status: R.$enum("status", ["draft", "ready", "published", "archived"], { optional: true }),
  deckJson: R.str("deckJson", { required: true })
};

function prepare(v) {
  // parse deck JSON (throw to route failure)
  let parsed;
  try {
    parsed = JSON.parse(v.deckJson);
  } catch {
    throw new Error("Invalid JSON in Deck field.");
  }

  // timed? (any slide with numeric end > 0)
  const slides = Array.isArray(parsed?.deck)
    ? parsed.deck
    : (Array.isArray(parsed?.slides) ? parsed.slides : []);
  const totalEnd = slides.reduce((mx, s) => (typeof s?.end === "number" ? Math.max(mx, s.end) : mx), 0);
  const timed = totalEnd > 0;

  const name = v.name.trim();
  const slug = slugify(name);

  return {
    payload: {
      slug,
      tcode: v.tcode,
      chapter: Number(v.chapter),
      exercise: v.exercise,
      type: "deck",
      name,
      description: v.description || null,
      status: v.status || null,
      timed,
      deck: parsed
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
      // keep anchors sticky
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      // clear authoring inputs
      name: "",
      description: "",
      deckJson: ""
    }
  };
}

function failure(err, v) {
  return {
    ok: false,
    message: err?.message || "Could not save the deck.",
    values: {
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      name: v.name,
      description: v.description ?? "",
      deckJson: v.deckJson ?? ""
    }
  };
}

export const actions = {
  save: makeAction({ spec, prepare, service, success, failure })
};
