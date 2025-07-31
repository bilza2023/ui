import { j as json } from './index-BOFtHmOi.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function getDeckByFilename(filename) {
  return await prisma.deck.findUnique({
    where: { filename }
  });
}
async function upsertDeck({ filename, content }) {
  return await prisma.deck.upsert({
    where: { filename },
    update: { content },
    create: { filename, content }
  });
}
async function POST({ request, url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return json({ error: "filename is required" }, { status: 400 });
  }
  const newSlides = await request.json();
  const record = await getDeckByFilename(filename);
  if (!record) {
    return json({ error: "deck not found" }, { status: 404 });
  }
  const updatedContent = {
    ...record.content,
    deck: newSlides
  };
  await upsertDeck({ filename, content: updatedContent });
  return json({ success: true });
}

export { POST };
//# sourceMappingURL=_server-BSZH74E5.js.map
