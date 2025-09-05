// /src/lib/syllabusComp/syllabusUtils.js

/** Safe string key */
export function normalizeKey(v) {
    return v == null ? "" : String(v).trim();
  }
  
  /** Get exercises for a chapter (match by slug or filename or name or id) */
  export function getExercisesForChapter(synopsis, chapterKey) {
    const key = normalizeKey(chapterKey);
    const chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
    const c = chapters.find(
      (x) =>
        normalizeKey(x.slug) === key ||
        normalizeKey(x.filename) === key ||
        normalizeKey(x.name) === key ||
        normalizeKey(x.id) === key
    );
    return Array.isArray(c?.exercises) ? c.exercises : [];
  }
  
  /** Set of exercise slugs for fast membership checks */
  export function makeExerciseSet(exercises) {
    return new Set((Array.isArray(exercises) ? exercises : []).map((e) => e.slug));
  }
  
  /** Human-friendly chapter name (fallback to the key) */
  export function chapterDisplayName(synopsis, chapterKey) {
    const key = normalizeKey(chapterKey);
    const chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
    const c = chapters.find(
      (x) =>
        normalizeKey(x.slug) === key ||
        normalizeKey(x.filename) === key
    );
    return c?.name || key;
  }
  
  /**
   * Filter items for display:
   * - if activeExercise present → items where item.exercise === activeExercise
   * - else → items whose exercise is in exSet (i.e., belongs to the selected chapter)
   */
  export function filterItems(items, activeExercise, exSet) {
    const arr = Array.isArray(items) ? items : [];
    const exKey = normalizeKey(activeExercise);
    if (exKey) return arr.filter((q) => normalizeKey(q.exercise) === exKey);
    return arr.filter((q) => exSet.has(normalizeKey(q.exercise)));
  }
  
  /** Totals */
  export function countTcodeTotal(items) {
    return Array.isArray(items) ? items.length : 0;
  }
  
  export function countChapterTotal(items, exSet) {
    const arr = Array.isArray(items) ? items : [];
    return arr.filter((q) => exSet.has(normalizeKey(q.exercise))).length;
  }
  
  export function countExerciseTotal(items, activeExercise) {
    const arr = Array.isArray(items) ? items : [];
    const exKey = normalizeKey(activeExercise);
    return exKey ? arr.filter((q) => normalizeKey(q.exercise) === exKey).length : 0;
  }
  