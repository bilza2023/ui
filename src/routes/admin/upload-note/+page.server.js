// Actions MUST live in +page.server.js (not +server.js)
export const prerender = false;

import { makeAction } from "$lib/formKit/actionFactory.js";
import { R } from "$lib/formKit/readers.js";
import { createQuestion } from "$lib/services/questionServices.js";

// deterministic slug from name
const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const spec = {
  // slug is generated from name (no slug field in the form)
  name: R.str("name", { required: true }),
  tcode: R.str("tcode", { required: true }),
  chapter: R.num("chapter", { required: true, gte: 1 }),
  exercise: R.str("exercise", { required: true }),
  description: R.str("description"),
  status: R.$enum("status", ["draft", "ready", "published", "archived"], { optional: true }),
  // tags REMOVED
  noteHtml: R.str("noteHtml", { required: true })
};

function prepare(v) {
  const name = v.name.trim();
  const slug = slugify(name);

  return {
    payload: {
      slug,
      tcode: v.tcode,
      chapter: Number(v.chapter),
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
  // Keep anchors sticky; clear text fields
  return {
    ok: true,
    saved: result?.slug,
    values: {
      // sticky anchors
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      // cleared fields
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
      // keep anchors sticky
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      // keep user inputs so they can fix and resubmit
      name: v.name,
      description: v.description ?? "",
      noteHtml: v.noteHtml ?? ""
    }
  };
}
export const actions = {
  save: makeAction({ spec, prepare, service, success, failure })
};