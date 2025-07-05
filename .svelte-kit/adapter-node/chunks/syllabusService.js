import path from "path";
import Database from "better-sqlite3";
function getDb() {
  const dbPath = path.resolve(process.cwd(), "db/dev.db");
  console.log("Opening SQLite DB at:", dbPath);
  return new Database(dbPath, { readonly: true });
}
function getAllTcodes() {
  const db = getDb();
  return db.prepare("SELECT tcodeName, title, description, image FROM Tcode ORDER BY id").all().map((row) => ({
    tcodeName: row.tcodeName,
    filename: row.tcodeName,
    name: row.title,
    description: row.description || "",
    image: row.image || ""
  }));
}
function getQuestionByFilename(_, filename) {
  const db = getDb();
  return db.prepare(
    `SELECT content FROM Question WHERE filename = ?`
  ).get(filename);
}
function getFullSyllabus(tcodeName) {
  const db = getDb();
  const tcode = db.prepare(
    "SELECT * FROM Tcode WHERE tcodeName = ?"
  ).get(tcodeName);
  if (!tcode)
    throw new Error("Tcode not found");
  const chapters = db.prepare(
    `SELECT id, filename, name FROM Chapter WHERE tcodeId = ? ORDER BY id`
  ).all(tcode.id).map((ch) => ({
    filename: ch.filename,
    name: ch.name,
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
  ).all(tcode.id).map((q) => ({ ...q, tcodeName }));
  return {
    tcodeName,
    filename: tcodeName,
    description: tcode.description || "",
    image: tcode.image || "",
    chapters,
    questions
  };
}
export {
  getQuestionByFilename as a,
  getFullSyllabus as b,
  getAllTcodes as g
};
