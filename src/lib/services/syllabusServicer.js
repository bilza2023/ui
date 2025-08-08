// src/lib/services/syllabusService.js

/**
 * Fetch the index of all subjects (tcodeName, description, image).
 * Reads: /static/data/syllabus/subjects.json
 */
export async function getSubjectsIndex() {
  const res = await fetch('/data/syllabus/subjects.json');
  if (!res.ok) throw new Error(`Failed to load subjects index`);
  return await res.json();
}

/**
 * Fetch the syllabus for a specific tcode.
 * Reads: /static/data/syllabus/<tcode>.json
 * @param {string} tcodeName - e.g. "fbise9mathold"
 */
export async function getSyllabusByTcode(tcodeName) {
  const res = await fetch(`/data/syllabus/${tcodeName}.json`);
  if (!res.ok) throw new Error(`Failed to load syllabus for ${tcodeName}`);
  return await res.json();
}

/**
 * Legacy: Fetch all syllabus objects in one file.
 * Reads: /static/data/syllabus.json
 * Only needed for backwards compatibility — can be removed later.
 */
export async function getAllSyllabusLegacy() {
  const res = await fetch('/data/syllabus.json');
  if (!res.ok) throw new Error(`Failed to load combined syllabus`);
  return await res.json();
}
