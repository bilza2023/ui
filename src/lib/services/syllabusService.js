import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.resolve(__dirname, '../syllabus/dev.db'));

// Return all tcodes
export function getAllTcodes() {
    return db
      .prepare('SELECT tcodeName, title, description, image FROM Tcode ORDER BY id')
      .all()
      .map(row => ({
        tcodeName:   row.tcodeName,
        filename:    row.tcodeName,      // derive filename
        name:        row.title,          // if you used title elsewhere
        description: row.description || '',
        image:       row.image       || ''
      }));
  }
  

// Return full syllabus object
export function getFullSyllabus(tcodeName) {
  const tcode = db.prepare('SELECT * FROM Tcode WHERE tcodeName = ?').get(tcodeName);
  if (!tcode) throw new Error('Not found');

  const chapters = db.prepare(`
    SELECT id, filename, name FROM Chapter
    WHERE tcodeId = ? ORDER BY id
  `).all(tcode.id).map(ch => ({
    filename: ch.filename,
    name:     ch.name,
    exercises: db.prepare(`
      SELECT filename, name FROM Exercise
      WHERE chapterId = ? ORDER BY id
    `).all(ch.id)
  }));

  const questions = db.prepare(`
    SELECT q.filename, q.name, q.type,
           c.filename AS chapterFilename,
           e.filename AS exerciseFilename
    FROM Question q
      JOIN Exercise e ON e.id = q.exerciseId
      JOIN Chapter  c ON c.id = e.chapterId
    WHERE c.tcodeId = ?
    ORDER BY q.id
  `).all(tcode.id).map(q => ({ ...q, tcodeName }));

  return {
    tcodeName,
    filename:    tcodeName,
    description: tcode.description || '',
    image:       tcode.image       || '',
    chapters,
    questions
  };
}
