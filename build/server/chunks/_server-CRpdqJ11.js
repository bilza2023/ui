import { j as json } from './index-BIDRY2MQ.js';
import { g as getQuestionByFilename, u as updateDeckJson } from './questionServices-CHZd5-Cj.js';
import './prisma-CbVrW2fI.js';
import '@prisma/client';

async function GET({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) return json({ error: "filename required" }, { status: 400 });
  const record = await getQuestionByFilename(filename);
  if (!record) return json({ error: "Question not found" }, { status: 404 });
  return json(record);
}
async function POST({ request, url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) return json({ error: "filename required" }, { status: 400 });
  const payload = await request.json();
  const newDeck = payload?.question?.deck ?? payload?.deck ?? payload;
  await updateDeckJson(filename, newDeck);
  return json({ success: true });
}

export { GET, POST };
//# sourceMappingURL=_server-CRpdqJ11.js.map
