// /taleemSlides/doctor/taleemDoctor.util.js

export const VERSION = 'deckdoctor-1.0.0';
export const SCHEMA_VERSION = 'deck-v1';

const BG_KEYS = new Set(['backgroundColor', 'backgroundImage', 'backgroundImageOpacity']);

export function makeDiag(level, code, message, path, details) {
  return { level, code, message, ...(path ? { path } : {}), ...(details ? { details } : {}) };
}

export function jsonPath(slideIndex, itemIndex) {
  if (typeof slideIndex === 'number' && typeof itemIndex === 'number') {
    return `deck[${slideIndex}].data[${itemIndex}]`;
  }
  if (typeof slideIndex === 'number') {
    return `deck[${slideIndex}]`;
  }
  return '';
}

function toNumber(v) {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined;
}

/* A) Stats */
export function getStats(question) {
  const slides = Array.isArray(question?.deck) ? question.deck : [];
  const slideCount = slides.length;

  let duration = 0;
  let items = 0;
  const types = new Set();

  slides.forEach((s) => {
    if (typeof s?.end === 'number' && s.end > duration) duration = s.end;
    if (Array.isArray(s?.data)) items += s.data.length;
    if (typeof s?.type === 'string') types.add(s.type);
  });

  return { slideCount, duration, items, typesUsed: Array.from(types).sort() };
}

/* B) Timing checks */
export function findOutOfWindow(question) {
  const diags = [];
  const slides = Array.isArray(question?.deck) ? question.deck : [];
  slides.forEach((s, i) => {
    const start = toNumber(s?.start);
    const end = toNumber(s?.end);
    if (!Array.isArray(s?.data)) return;
    s.data.forEach((it, j) => {
      const showAt = toNumber(it?.showAt);
      if (typeof showAt !== 'number') return;
      if (typeof start === 'number' && typeof end === 'number') {
        if (showAt < start || showAt > end) {
          diags.push(
            makeDiag(
              'warning',
              'TIME_OUT_OF_WINDOW',
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

export function findDuplicateShowAt(question) {
  const slides = Array.isArray(question?.deck) ? question.deck : [];
  const results = [];
  slides.forEach((s, i) => {
    if (!Array.isArray(s?.data)) return;
    const map = new Map();
    s.data.forEach((it) => {
      const t = toNumber(it?.showAt);
      if (typeof t !== 'number') return;
      map.set(t, (map.get(t) || 0) + 1);
    });
    for (const [showAt, count] of map.entries()) {
      if (count > 1) results.push({ slideIndex: i, showAt, count });
    }
  });
  return results;
}

/* C) Background sanity */
export function backgroundReport(question) {
  const bg = question?.background;
  if (!bg || typeof bg !== 'object') {
    return { hasBg: false, keys: [], valid: true, extraKeys: [] };
  }
  const keys = Object.keys(bg);
  const extraKeys = keys.filter((k) => !BG_KEYS.has(k));
  return { hasBg: true, keys, valid: extraKeys.length === 0, extraKeys };
}

/* D) Rhythm */
export function densityHistogram(question, bucket = 5) {
  const slides = Array.isArray(question?.deck) ? question.deck : [];
  const times = [];
  slides.forEach((s) => {
    if (!Array.isArray(s?.data)) return;
    s.data.forEach((it) => {
      const t = toNumber(it?.showAt);
      if (typeof t === 'number' && t >= 0) times.push(t);
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

/* E) Lints (pure) */
export function lint_endBeforeStart(question) {
  const diags = [];
  const slides = Array.isArray(question?.deck) ? question.deck : [];
  slides.forEach((s, i) => {
    const start = toNumber(s?.start);
    const end = toNumber(s?.end);
    if (typeof start === 'number' && typeof end === 'number' && start >= end) {
      diags.push(
        makeDiag('error', 'END_BEFORE_START', `Slide has start >= end (${start} >= ${end}).`, jsonPath(i), { start, end })
      );
    }
  });
  return diags;
}
