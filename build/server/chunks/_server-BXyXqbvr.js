import { j as json } from './index-BOFtHmOi.js';
import { a as getQuestionByFilename, u as updateDeckJson } from './questionServices-DaKNuo2j.js';
import '@prisma/client';

async function GET({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return json({ error: "filename required" }, { status: 400 });
  }
  const record = await getQuestionByFilename(filename);
  if (!record) {
    return json({ error: "Deck not found" }, { status: 404 });
  }
  return json(record.deck);
}
async function POST({ request, url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return json({ error: "filename required" }, { status: 400 });
  }
  const newContent = await request.json();
  await updateDeckJson(filename, newContent);
  return json({ success: true });
}

export { GET, POST };
//# sourceMappingURL=_server-BXyXqbvr.js.map
