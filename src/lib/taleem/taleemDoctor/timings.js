
// src/lib/taleemDoctor/timingFixes.js

// src/lib/taleemDoctor/timings.js
// Read-only timing lints for a slides array (question.deck)

const makeDiag = (level, code, message, path, details) =>
  ({ level, code, message, ...(path ? { path } : {}), ...(details ? { details } : {}) });

const jsonPath = (i, j) =>
  typeof i === "number"
    ? (typeof j === "number" ? `deck[${i}].data[${j}]` : `deck[${i}]`)
    : "";

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

/**
 * checkTimings(slides, warnings)
 * - Flags TIME_OUT_OF_WINDOW and DUP_SHOWAT_IN_SLIDE
 * - Pure read-only; pushes diagnostics into the provided warnings[]
 */
export function checkTimings(slides, warnings) {
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const start = num(s?.start);
    const end = num(s?.end);
    const data = Array.isArray(s?.data) ? s.data : [];

    const showAtCounts = new Map();

    for (let j = 0; j < data.length; j++) {
      const showAt = num(data[j]?.showAt);
      if (typeof showAt !== "number") continue;

      if (typeof start === "number" && typeof end === "number" && (showAt < start || showAt > end)) {
        warnings.push(
          makeDiag(
            "warning",
            "TIME_OUT_OF_WINDOW",
            `Item showAt=${showAt} outside slide window [${start}, ${end}].`,
            jsonPath(i, j),
            { showAt, start, end }
          )
        );
      }
      showAtCounts.set(showAt, (showAtCounts.get(showAt) || 0) + 1);
    }

    for (const [t, count] of showAtCounts.entries()) {
      if (count > 1) {
        warnings.push(
          makeDiag(
            "warning",
            "DUP_SHOWAT_IN_SLIDE",
            `Multiple items share showAt=${t} (count=${count}).`,
            jsonPath(i),
            { slideIndex: i, showAt: t, count }
          )
        );
      }
    }
  }
}

/** 1) Check top-level slide timings (order, overlaps, gaps). Read-only. */
export function checkTopLevelTimings(question) {
    const slides = Array.isArray(question?.deck) ? question.deck : [];
    const diags = [];
  
    for (let i = 0; i < slides.length; i++) {
      const s = slides[i];
      const start = s?.start;
      const end = s?.end;
  
      if (typeof start !== "number" || typeof end !== "number") {
        diags.push({ code: "MISSING_START_END", i, message: `slide[${i}] missing start/end` });
        continue;
      }
      if (start >= end) {
        diags.push({ code: "END_BEFORE_START", i, message: `slide[${i}] start>=end (${start}>=${end})` });
      }
      if (i > 0) {
        const prev = slides[i - 1];
        if (start > prev.end) {
          diags.push({ code: "GAP", i, message: `gap between slide[${i-1}](${prev.end}) → slide[${i}](${start})` });
        }
        if (start < prev.end) {
          diags.push({ code: "OVERLAP", i, message: `overlap slide[${i-1}](${prev.end}) ↔ slide[${i}](${start})` });
        }
      }
    }
    return diags;
  }
  
  /** 2) Set default timings: each slide = perSlide seconds, sequential; all showAt=0. Returns NEW question. */
  export function setDefaultTimings(question, perSlide = 5) {
    const q = structuredClone(question);
    const slides = Array.isArray(q?.deck) ? q.deck : [];
  
    for (let i = 0; i < slides.length; i++) {
      const start = i * perSlide;
      const end = start + perSlide;
      slides[i].start = start;
      slides[i].end = end;
  
      const data = Array.isArray(slides[i].data) ? slides[i].data : [];
      for (let j = 0; j < data.length; j++) {
        if (typeof data[j] !== "object" || data[j] === null) continue;
        data[j].showAt = 0;
      }
    }
    return q;
  }
  
  /** 3) Force visibility quickly: any item outside its slide window → showAt=0. Returns NEW question. */
  export function setWrongShowAtToZero(question) {
    const q = structuredClone(question);
    const slides = Array.isArray(q?.deck) ? q.deck : [];
  
    for (let i = 0; i < slides.length; i++) {
      const s = slides[i];
      const start = s?.start;
      const end = s?.end;
      const data = Array.isArray(s?.data) ? s.data : [];
  
      for (let j = 0; j < data.length; j++) {
        const it = data[j];
        if (!it || typeof it !== "object") continue;
  
        const t = it.showAt;
        const bad =
          typeof t !== "number" ||
          !Number.isFinite(t) ||
          typeof start !== "number" ||
          typeof end !== "number" ||
          t < start ||
          t > end;
  
        if (bad) it.showAt = 0;
      }
    }
    return q;
  }
  