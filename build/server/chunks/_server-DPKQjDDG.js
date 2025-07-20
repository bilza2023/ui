import { j as json } from './index-BOFtHmOi.js';
import { a as getDeckByFilename, u as upsertDeck } from './deckService-D4ctYXnz.js';
import '@prisma/client';

async function GET({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return json({ error: "filename required" }, { status: 400 });
  }
  const record = await getDeckByFilename(filename);
  console.log("record", record);
  if (!record) {
    return json({ error: "Deck not found" }, { status: 404 });
  }
  return json(record.content);
}
async function POST({ request, url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return json({ error: "filename required" }, { status: 400 });
  }
  const content = await request.json();
  await upsertDeck({ filename, content });
  return json({ success: true });
}

export { GET, POST };
//# sourceMappingURL=_server-DPKQjDDG.js.map
