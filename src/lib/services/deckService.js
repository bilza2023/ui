
// services/deckServices.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createDeck({ filename, content }) {
  return await prisma.deck.create({
    data: { filename, content }
  });
}
export async function getDeckByFilename(filename) {
  return await prisma.deck.findUnique({
    where: { filename }
  });
}
export async function upsertDeck({ filename, content }) {
  return await prisma.deck.upsert({
    where: { filename },
    update: { content },
    create: { filename, content }
  });
}

export async function getAllDecks() {
  return await prisma.deck.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getDeckById(id) {
  return await prisma.deck.findUnique({
    where: { id }
  });
}

export async function deleteDeck(id) {
  return await prisma.deck.delete({
    where: { id }
  });
}
export async function deleteDeckByFilename(filename) {
  return await prisma.deck.delete({
    where: { filename }
  });
}

