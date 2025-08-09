// src/lib/taleemDoctor/taleemDoctor.util.js

// ----- constants -----
export const VERSION = "deckdoctor-1.0.0";
export const SCHEMA_VERSION = "deck-v1";
export const SLIDE_TYPES = [
  "titleSlide",
  "imageLeftBulletsRight",
  "bulletList",
  "bigNumber",
  "barChart",
  "eq",
  "svgPointer"
];

const BG_KEYS = new Set(["backgroundColor", "backgroundImage", "backgroundImageOpacity"]);

// ----- small helpers -----
export function makeDiag(level, code, message, path, details) {
  return { level, code, message, ...(path ? { path } : {}), ...(details ? { details } : {}) };
}

export function jsonPath(slideIndex, itemIndex) {
  if (typeof slideIndex === "number" && typeof itemIndex === "number") {
    return `slides[${slideIndex}].data[${itemIndex}]`;
  }
  if (typeof slideIndex === "number") {
    return `slides[${slideIndex}]`;
  }
  return "";
}

function toNumber(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

// ----- A) Stats -----
export function getStats(deck) {
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  const slideCount = slides.length;

  let duration = 0;
  let items = 0;
  const types = new Set();

  slides.forEach((s) => {
    if (typeof s?.end === "number" && s.end > duration) duration = s.end;
    if (Array.isArray(s?.data)) items += s.data.length;
    if (typeof s?.type === "string") types.add(s.type);
  });

  return {
    slideCount,
    duration,
    items,
    typesUsed: Array.from(types).sort()
  };
}

// ----- B) Timing checks -----
export function findOutOfWindow(deck) {
  const diags = [];
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  slides.forEach((s, i) => {
    const start = toNumber(s?.start);
    const end = toNumber(s?.end);
    if (!Array.isArray(s?.data)) return;
    s.data.forEach((it, j) => {
      const showAt = toNumber(it?.showAt);
      if (typeof showAt !== "number") return;
      if (typeof start === "number" && typeof end === "number") {
        if (showAt < start || showAt > end) {
          diags.push(
            makeDiag(
              "warning",
              "TIME_OUT_OF_WINDOW",
              `Item showAt=${showAt} falls outside slide window [${start}, ${end}].`,
              jsonPath(i, j),
              { showAt, start, end }
            )
          );
        }
      }
    });
  });
  return diags;
}

export function findDuplicateShowAt(deck) {
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  const results = [];
  slides.forEach((s, i) => {
    if (!Array.isArray(s?.data)) return;
    const map = new Map();
    s.data.forEach((it) => {
      const t = toNumber(it?.showAt);
      if (typeof t !== "number") return;
      map.set(t, (map.get(t) || 0) + 1);
    });
    for (const [showAt, count] of map.entries()) {
      if (count > 1) results.push({ slideIndex: i, showAt, count });
    }
  });
  return results;
}

// ----- C) Background sanity -----
export function backgroundReport(deck) {
  const bg = deck?.background;
  if (!bg || typeof bg !== "object") {
    return { hasBg: false, keys: [], valid: true, extraKeys: [] };
  }
  const keys = Object.keys(bg);
  const extraKeys = keys.filter((k) => !BG_KEYS.has(k));
  return {
    hasBg: true,
    keys,
    valid: extraKeys.length === 0,
    extraKeys
  };
}

// ----- D) Rhythm -----
export function densityHistogram(deck, bucket = 5) {
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  const times = [];
  slides.forEach((s) => {
    if (!Array.isArray(s?.data)) return;
    s.data.forEach((it) => {
      const t = toNumber(it?.showAt);
      if (typeof t === "number" && t >= 0) times.push(t);
    });
  });
  if (times.length === 0) return [];

  const map = new Map(); // bucketStart -> count
  times.forEach((t) => {
    const start = Math.floor(t / bucket) * bucket;
    map.set(start, (map.get(start) || 0) + 1);
  });

  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([bucketStart, count]) => ({ bucketStart, count }));
}

// ----- E) Lints (pure) -----
export function lint_endBeforeStart(deck) {
  const diags = [];
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  slides.forEach((s, i) => {
    const start = toNumber(s?.start);
    const end = toNumber(s?.end);
    if (typeof start === "number" && typeof end === "number" && start >= end) {
      diags.push(
        makeDiag(
          "error",
          "END_BEFORE_START",
          `Slide has start >= end (${start} >= ${end}).`,
          jsonPath(i),
          { start, end }
        )
      );
    }
  });
  return diags;
}

export function lint_unknownSlideType(deck, registry = SLIDE_TYPES) {
  const diags = [];
  const set = new Set(registry);
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  slides.forEach((s, i) => {
    const t = s?.type;
    if (typeof t !== "string" || !set.has(t)) {
      diags.push(
        makeDiag(
          "error",
          "UNKNOWN_SLIDE_TYPE",
          `Unknown slide type "${t}".`,
          jsonPath(i),
          { type: t }
        )
      );
    }
  });
  return diags;
}

export function lint_missingDeckVersion(deck) {
  if (deck && typeof deck.version === "string") return [];
  return [makeDiag("warning", "MISSING_DECK_VERSION", "Top-level 'version' is missing.")];
}

export function lint_backgroundShape(deck) {
  const rep = backgroundReport(deck);
  if (rep.hasBg && !rep.valid) {
    return [
      makeDiag(
        "warning",
        "BACKGROUND_SHAPE",
        `Background has unknown keys: ${rep.extraKeys.join(", ")}`,
        undefined,
        { extraKeys: rep.extraKeys }
      )
    ];
  }
  return [];
}

export function lint_svgPointerImageCount(deck) {
  const diags = [];
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  slides.forEach((s, i) => {
    if (s?.type !== "svgPointer") return;
    const data = Array.isArray(s?.data) ? s.data : [];
    const imgCount = data.filter((d) => d?.type === "image").length;
    if (imgCount !== 1) {
      diags.push(
        makeDiag(
          "error",
          "SVGPOINTER_IMAGE_COUNT",
          `svgPointer slide must contain exactly 1 base image (found ${imgCount}).`,
          jsonPath(i),
          { imageCount: imgCount }
        )
      );
    }
  });
  return diags;
}

export function lint_emptyData(deck) {
  const diags = [];
  const slides = Array.isArray(deck?.slides) ? deck.slides : [];
  slides.forEach((s, i) => {
    const len = Array.isArray(s?.data) ? s.data.length : 0;
    if (len === 0) {
      diags.push(
        makeDiag("warning", "EMPTY_DATA", "Slide has no data items.", jsonPath(i), {})
      );
    }
  });
  return diags;
}

export function lint_timeOutOfWindow(deck) {
  return findOutOfWindow(deck);
}

export function lint_dupShowAtInSlide(deck) {
  const groups = findDuplicateShowAt(deck);
  return groups.map(({ slideIndex, showAt, count }) =>
    makeDiag(
      "warning",
      "DUP_SHOWAT_IN_SLIDE",
      `Multiple items share showAt=${showAt} (count=${count}).`,
      jsonPath(slideIndex),
      { slideIndex, showAt, count }
    )
  );
}
