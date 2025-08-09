// src/lib/taleemDoctor/taleemDoctor.js

import { zodAQuestionV1 } from "./ZodAQuestionV1.js";
import { checkTimings } from "./timings.js";
/** Public constant */
export const SCHEMA_VERSION = "deck-v1";

const SLIDE_TYPES = new Set([
    "titleAndPara",
    "svgPointer",
    "eq",
    "fillImage",
    "titleSlide",
    "titleAndSubtitle",
    "bulletList",
    "twoColumnText",
    "imageSlide",
    "imageWithTitle",
    "imageWithCaption",
    "imageLeftBulletsRight",
    "imageRightBulletsLeft",
    "table",
    "statistic",
    "donutChart",
    "bigNumber",
    "barChart",
    "quoteSlide",
    "quoteWithImage",
    "cornerWordsSlide",
    "contactSlide"
  ]);
  
/** Helpers */
const makeDiag = (level, code, message, path, details) =>
  ({ level, code, message, ...(path ? { path } : {}), ...(details ? { details } : {}) });

const jsonPath = (i, j) =>
  typeof i === "number"
    ? (typeof j === "number" ? `deck[${i}].data[${j}]` : `deck[${i}]`)
    : "";

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

/** Info-only stats */
export function getStats(question) {
  const slides = Array.isArray(question?.deck) ? question.deck : [];
  const slideCount = slides.length;

  let duration = 0;
  let items = 0;
  const types = new Set();

  for (const s of slides) {
    if (typeof s?.end === "number" && s.end > duration) duration = s.end;
    if (Array.isArray(s?.data)) items += s.data.length;
    if (typeof s?.type === "string") types.add(s.type);
  }

  return { slideCount, duration, items, typesUsed: Array.from(types).sort() };
}

/* ---------- private helpers (pure, read-only) ---------- */

function checkBackgroundShape(question, warnings) {
  const bg = question?.background;
  if (!bg || typeof bg !== "object") return;
  const allowed = new Set(["backgroundColor", "backgroundImage", "backgroundImageOpacity"]);
  const extra = Object.keys(bg).filter((k) => !allowed.has(k));
  if (extra.length) {
    warnings.push(
      makeDiag("warning", "BACKGROUND_SHAPE", `Background has unknown keys: ${extra.join(", ")}`, undefined, { extraKeys: extra })
    );
  }
}

function checkSlidesStructure(slides, errors, warnings) {
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];

    // type
    const t = s?.type;
    if (typeof t !== "string" || !SLIDE_TYPES.has(t)) {
      errors.push(makeDiag("error", "UNKNOWN_SLIDE_TYPE", `Unknown slide type "${t}".`, jsonPath(i), { type: t }));
    }

    // start/end
    const start = num(s?.start);
    const end = num(s?.end);
    if (typeof start === "number" && typeof end === "number" && start >= end) {
      errors.push(makeDiag("error", "END_BEFORE_START", `Slide has start >= end (${start} >= ${end}).`, jsonPath(i), { start, end }));
    }

    // data presence
    const data = Array.isArray(s?.data) ? s.data : [];
    if (data.length === 0) {
      warnings.push(makeDiag("warning", "EMPTY_DATA", "Slide has no data items.", jsonPath(i)));
    }
  }
}

function checkSvgPointerRules(slides, errors) {
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    if (s?.type !== "svgPointer") continue;
    const data = Array.isArray(s?.data) ? s.data : [];
    const imgCount = data.filter((d) => d?.type === "image").length;
    if (imgCount !== 1) {
      errors.push(
        makeDiag(
          "error",
          "SVGPOINTER_IMAGE_COUNT",
          `svgPointer slide must contain exactly 1 base image (found ${imgCount}).`,
          jsonPath(i),
          { imageCount: imgCount }
        )
      );
    }
  }
}

/* ---------- Main: validator (read-only) ---------- */
export function validate(question, { strict = true, maxDiagnostics = 200 } = {}) {
  const errors = [];
  const warnings = [];

  // 1) Schema (non-throwing)
  const parsed = zodAQuestionV1.safeParse(question);
  if (!parsed.success) {
    const issues = Array.isArray(parsed.error?.issues) ? parsed.error.issues : [];
    for (const iss of issues) {
      const path = Array.isArray(iss.path) && iss.path.length ? "question." + iss.path.map(String).join(".") : undefined;
      (strict ? errors : warnings).push(
        makeDiag(strict ? "error" : "warning", "SCHEMA_INVALID", iss.message || "Schema error.", path, { pathArray: iss.path })
      );
    }
  }

  // 2) Use parsed data if available, else raw question (read-only)
  const q = parsed.success ? parsed.data : question;

  // 3) Version (warning only) — version lives on Question
  if (!q || q.version !== SCHEMA_VERSION) {
    warnings.push(makeDiag("warning", "MISSING_DECK_VERSION", "Top-level 'version' is missing or not 'deck-v1'."));
  }

  // 4) Background shape (warning only) — background lives on Question
  checkBackgroundShape(q, warnings);

  // 5) Slides & lints (structure → timings → type-specific) — slides at question.deck
  const slides = Array.isArray(q?.deck) ? q.deck : [];
  checkSlidesStructure(slides, errors, warnings);
  checkTimings(slides, warnings);
  checkSvgPointerRules(slides, errors);

  // 6) Stats
  const stats = getStats(q);

  // 7) Cap + ok
  const cap = (arr) => (arr.length > maxDiagnostics ? arr.slice(0, maxDiagnostics) : arr);
  const errorsC = cap(errors);
  const warningsC = cap(warnings);
  const ok = errorsC.length === 0;

  return {
    ok,
    errors: errorsC,
    warnings: warningsC,
    stats,
    meta: { schemaVersion: SCHEMA_VERSION }
  };
}
