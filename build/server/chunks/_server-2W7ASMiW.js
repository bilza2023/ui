import { j as json } from './index-BIDRY2MQ.js';
import { e as exists, c as createQuestion } from './questionServices-CHZd5-Cj.js';
import './prisma-CbVrW2fI.js';
import '@prisma/client';

const STATUS = /* @__PURE__ */ new Set(["draft", "ready", "published", "archived"]);
const toSafeName = (s) => (s || "").replace(/\.json$/i, "").trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
async function POST({ request }) {
  const form = await request.formData();
  const tcode = (form.get("tcode") ?? "").toString().trim();
  const chapStr = (form.get("chapter") ?? "").toString().trim();
  const exercise = (form.get("exercise") ?? "").toString().trim();
  if (!tcode || !chapStr || !exercise) {
    return json({ error: "Missing required fields: tcode, chapter, exercise" }, { status: 400 });
  }
  const chapter = Number.parseInt(chapStr, 10);
  if (Number.isNaN(chapter)) {
    return json({ error: "chapter must be an integer" }, { status: 400 });
  }
  const description = (form.get("description") ?? "").toString().trim() || null;
  const tagsCsv = (form.get("tags") ?? "").toString();
  const tags = tagsCsv ? tagsCsv.split(",").map((s) => s.trim()).filter(Boolean) : [];
  let status = (form.get("status") ?? "").toString().trim();
  if (status && !STATUS.has(status)) status = "";
  const file = form.get("file");
  if (!file) return json({ error: "No file uploaded" }, { status: 400 });
  if (!/\.json$/i.test(file.name || "")) {
    return json({ error: "Only .json files are allowed" }, { status: 400 });
  }
  const provided = (form.get("filename") ?? "").toString().trim();
  const baseName = toSafeName(provided || file.name);
  if (!baseName) return json({ error: "Unable to determine filename" }, { status: 400 });
  if (await exists(baseName)) {
    return json({ error: "Filename already exists" }, { status: 409 });
  }
  let deck;
  try {
    const text = await file.text();
    deck = JSON.parse(text);
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const qName = deck?.name || baseName;
  const timed = false;
  try {
    await createQuestion({
      filename: baseName,
      tcode,
      chapter,
      exercise,
      type: "deck",
      name: qName,
      description,
      tags,
      status: status || null,
      timed,
      deck
    });
    return json({ success: true, filename: baseName });
  } catch (e) {
    const msg = e?.message || "Server error";
    if (/P2002/.test(msg)) {
      return json({ error: "Filename already exists" }, { status: 409 });
    }
    console.error("upload_json error:", e);
    return json({ error: msg }, { status: 500 });
  }
}

export { POST };
//# sourceMappingURL=_server-2W7ASMiW.js.map
