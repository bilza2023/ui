import path from 'path';
import Database from 'better-sqlite3';

/**
 * Lazy-load the SQLite DB at runtime.
 * Prevents build/SSR from trying to open it too early.
 */
function getDb() {
  // Resolve the DB file relative to the UI project root (parent directory)
  const dbPath = path.resolve(process.cwd(), 'db/dev.db');
  console.log('Opening SQLite DB at:', dbPath);
  return new Database(dbPath, { readonly: true });
}

/**
 * Return all tcodes
 */
export function getAllTcodes() {
  const db = getDb();
  return db
    .prepare('SELECT tcodeName, title, description, image FROM Tcode ORDER BY id')
    .all()
    .map(row => ({
      tcodeName:   row.tcodeName,
      filename:    row.tcodeName,
      name:        row.title,
      description: row.description || '',
      image:       row.image       || ''
    }));
}

/**
 * Return question content by filename
 */
export function getQuestionByFilename(_, filename) {
  const db = getDb();
  return db.prepare(
    `SELECT content FROM Question WHERE filename = ?`
  ).get(filename);
}

/**
 * Return full syllabus object: tcode → chapters → exercises → questions
 */
export function getFullSyllabus(tcodeName) {
  const db = getDb();

  const tcode = db.prepare(
    'SELECT * FROM Tcode WHERE tcodeName = ?'
  ).get(tcodeName);
  if (!tcode) throw new Error('Tcode not found');

  const chapters = db.prepare(
    `SELECT id, filename, name FROM Chapter WHERE tcodeId = ? ORDER BY id`
  ).all(tcode.id).map(ch => ({
    filename: ch.filename,
    name:     ch.name,
    exercises: db.prepare(
      `SELECT filename, name FROM Exercise WHERE chapterId = ? ORDER BY id`
    ).all(ch.id)
  }));

  const questions = db.prepare(
    `SELECT q.filename, q.name, q.type,
            c.filename AS chapterFilename,
            e.filename AS exerciseFilename
     FROM Question q
       JOIN Exercise e ON e.id = q.exerciseId
       JOIN Chapter  c ON c.id = e.chapterId
     WHERE c.tcodeId = ?
     ORDER BY q.id`
  ).all(tcode.id).map(q => ({ ...q, tcodeName }));

  return {
    tcodeName,
    filename:    tcodeName,
    description: tcode.description || '',
    image:       tcode.image       || '',
    chapters,
    questions
  };
}
