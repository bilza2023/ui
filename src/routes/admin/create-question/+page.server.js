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
  const questionType = (url.searchParams.get("questionType") || "").trim();

  if (!tcode) {
    return { tcode: "", questionType, chapters: [], exercisesByChapter: {} };
  }

  const chaptersRows = await syllabusService.getChaptersByTcode(tcode, { includeExercises: true });

  const chapters = chaptersRows
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((c, i) => ({
      value: i + 1,
      label: c.name,
      slug: c.slug
    }));

  const exercisesByChapter = {};
  for (const c of chaptersRows) {
    exercisesByChapter[c.slug] = (c.exercises ?? [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((e) => ({ value: e.slug, label: e.name }));
  }

  return { tcode, questionType, chapters, exercisesByChapter };
}

// -------- form action ----------
const baseSpec = {
  name: R.str("name", { required: true }),
  chapter: R.num("chapter", { required: true, gte: 1 }),
  exercise: R.str("exercise", { required: true }),
  description: R.str("description"),
  status: R.$enum("status", ["draft", "ready", "published", "archived"], { required: false }),

  // home-index
  homeCategory: R.str("homeCategory"),
  homeSort: R.num("homeSort", { gte: 0 }),
  homePinned: R.str("homePinned") // 'on' | undefined
};

function buildSpec(questionType) {
  if (questionType === "deck") {
    return { ...baseSpec, deckJson: R.str("deckJson", { required: true }) };
  }
  return { ...baseSpec, noteHtml: R.str("noteHtml", { required: true }) };
}

function prepareFactory(questionType, tcode) {
  return (v) => {
    const name = v.name.trim();
    const slug = slugify(name);

    // normalize home-index
    const homeCategory = tcode === "blog" ? (v.homeCategory || null) : null;
    const homeSort = tcode === "blog" ? Number(v.homeSort) || 0 : 0;
    const homePinned = tcode === "blog" && v.homePinned === "on";

    if (questionType === "deck") {
      let parsed;
      try {
        parsed = JSON.parse(v.deckJson);
      } catch {
        throw new Error("Invalid JSON in Deck field.");
      }
      const slides = Array.isArray(parsed?.deck)
        ? parsed.deck
        : (Array.isArray(parsed?.slides) ? parsed.slides : []);
      const totalEnd = slides.reduce(
        (mx, s) => (typeof s?.end === "number" ? Math.max(mx, s.end) : mx),
        0
      );
      const timed = totalEnd > 0;

      return {
        payload: {
          slug,
          tcode,
          chapter: Number(v.chapter),
          exercise: v.exercise,
          type: "deck",
          name,
          description: v.description || null,
          status: v.status || null,
          timed,
          deck: parsed,
          note: null,
          homeCategory,
          homeSort,
          homePinned
        }
      };
    } else {
      return {
        payload: {
          slug,
          tcode,
          chapter: Number(v.chapter),
          exercise: v.exercise,
          type: "note",
          name,
          description: v.description || null,
          status: v.status || null,
          timed: false,
          note: v.noteHtml,
          deck: null,
          homeCategory,
          homeSort,
          homePinned
        }
      };
    }
  };
}

async function service({ payload }) {
  const row = await createQuestion(payload);
  return { id: row?.id ?? null, slug: payload.slug };
}

function success(result) {
  return {
    ok: true,
    message: "Saved successfully.",
    saved: result?.slug
  };
}

function failure(err, v) {
  return {
    ok: false,
    message: err?.message || "Could not save.",
    values: v
  };
}

export const actions = {
  save: async (event) => {
    const questionType = event.url.searchParams.get("questionType") || "note";
    const tcode = (event.url.searchParams.get("tcode") || "").trim();
    return makeAction({
      spec: buildSpec(questionType),
      prepare: prepareFactory(questionType, tcode),
      service,
      success,
      failure
    })(event);
  }
};
