// src/lib/syllabus.js
import { syllabusMap } from './syllabusMap.js';

/**
 * @returns {Array} Array of all syllabus objects
 */
export function getAllTcodes() {
  return Object.values(syllabusMap);
}

/**
 * @param {string} tcodeName
 * @returns {object|undefined} single syllabus by tcodeName
 */
export function getSyllabus(tcodeName) {
  return syllabusMap[tcodeName];
}

/**
 * @param {string} tcodeName
 * @returns {Array} chapters array (empty if not found)
 */
export function getChapters(tcodeName) {
  const s = getSyllabus(tcodeName);
  return s ? s.chapters : [];
}

/**
 * @param {string} tcodeName
 * @param {string} chapterFilename
 * @returns {Array} exercises array (empty if not found)
 */
export function getExercises(tcodeName, chapterFilename) {
  const ch = getChapters(tcodeName).find(c => c.filename === chapterFilename);
  return ch ? ch.exercises : [];
}

/**
 * @param {string} tcodeName
 * @param {string} chapterFilename
 * @param {string} exerciseFilename
 * @returns {Array} questions array (empty if not found)
 */
export function getQuestions(tcodeName, chapterFilename, exerciseFilename) {
  return (
    getSyllabus(tcodeName)?.questions.filter(
      q => q.chapterFilename === chapterFilename && q.exerciseFilename === exerciseFilename
    ) || []
  );
}
