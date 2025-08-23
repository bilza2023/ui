import { j as json } from './index-BcL6zcUs.js';
import { g as getQuestionByFilename, u as updateDeckJson } from './questionServices-CHZd5-Cj.js';
import './prisma-CbVrW2fI.js';
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
//# sourceMappingURL=_server-B22220Lw.js.map
