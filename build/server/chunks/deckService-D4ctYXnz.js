import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function createDeck({ filename, content }) {
  return await prisma.deck.create({
    data: { filename, content }
  });
}
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
async function getAllDecks() {
  return await prisma.deck.findMany({
    orderBy: { createdAt: "desc" }
  });
}
async function deleteDeckByFilename(filename) {
  return await prisma.deck.delete({
    where: { filename }
  });
}

export { getDeckByFilename as a, createDeck as c, deleteDeckByFilename as d, getAllDecks as g, upsertDeck as u };
//# sourceMappingURL=deckService-D4ctYXnz.js.map
