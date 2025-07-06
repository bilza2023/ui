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
export {
  getQuestionByFilename as a,
  getAllTcodes as g
};
