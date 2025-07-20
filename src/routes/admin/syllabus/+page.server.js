

// File: src/routes/admin/syllabus/+page.server.js
import { getAllTcodes, getAllChapters, getAllExercises } from '../../../lib/services/syllabusServices.js';

export async function load() {
  const tcodes = await getAllTcodes();
  const chapters = await getAllChapters();
  const exercises = await getAllExercises();
  return { tcodes, chapters, exercises };
}