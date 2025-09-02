// // src/lib/services/syllabusServices.js
// // Canonical ID-based client for /api/syllabus/*

// const BASE = '/api/syllabus';

// async function fetchJSON(path, params = null) {
//   const url = params ? `${path}?${new URLSearchParams(params)}` : path;
//   const res = await fetch(url, { method: 'GET' });
//   if (!res.ok) {
//     let msg = `HTTP ${res.status}`;
//     try {
//       const j = await res.json();
//       if (j?.code || j?.message) msg += ` ${j.code ?? ''} ${j.message ?? ''}`;
//     } catch {}
//     throw new Error(`[syllabusServices] GET ${url} → ${msg}`);
//   }
//   return res.json();
// }

// /* -------- Picker -------- */
// export async function listTcodes() {
//   return fetchJSON(`${BASE}/tcodes`);
// }

// /* -------- Synopsis / taxonomy (by ID) -------- */
// export async function getSynopsisById(tcodeId) {
//   if (!tcodeId) throw new Error('tcodeId required');
//   return fetchJSON(`${BASE}/tcodes/${encodeURIComponent(tcodeId)}`);
// }

// export async function getChaptersByTcodeId(tcodeId) {
//   if (!tcodeId) throw new Error('tcodeId required');
//   return fetchJSON(`${BASE}/tcodes/${encodeURIComponent(tcodeId)}/chapters`);
// }

// export async function getChapterById(tcodeId, chapterId) {
//   if (!tcodeId) throw new Error('tcodeId required');
//   if (!chapterId) throw new Error('chapterId required');
//   return fetchJSON(`${BASE}/tcodes/${encodeURIComponent(tcodeId)}/chapters/${encodeURIComponent(chapterId)}`);
// }

// export async function getExercisesByChapterId(tcodeId, chapterId) {
//   if (!tcodeId) throw new Error('tcodeId required');
//   if (!chapterId) throw new Error('chapterId required');
//   return fetchJSON(`${BASE}/tcodes/${encodeURIComponent(tcodeId)}/exercises`, { chapterId });
// }

// /* -------- Questions (by ID) -------- */
// export async function listQuestionsByIds(tcodeId, opts = {}) {
//   if (!tcodeId) throw new Error('tcodeId required');
//   const { chapterId, exerciseId, fields, limit, page } = opts;
//   const params = {};
//   if (chapterId) params.chapterId = chapterId;
//   if (exerciseId) params.exerciseId = exerciseId;
//   if (fields) params.fields = Array.isArray(fields) ? fields.join(',') : String(fields);
//   if (limit != null) params.limit = String(limit);
//   if (page != null) params.page = String(page);
//   return fetchJSON(`${BASE}/tcodes/${encodeURIComponent(tcodeId)}/questions`, params);
// }

// /* -------- Optional: slug convenience (resolve once, then use by-ID) -------- */
// export async function getSynopsisBySlug(tcodeSlug) {
//   const tcodes = await listTcodes();
//   const row = tcodes.find(t => String(t.tcode) === String(tcodeSlug) || String(t.slug) === String(tcodeSlug));
//   if (!row) throw new Error(`tcode slug not found: ${tcodeSlug}`);
//   return getSynopsisById(row.id);
// }
