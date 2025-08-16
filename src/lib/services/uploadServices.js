
// src/lib/services/uploadServices.js
import prisma from '$lib/server/prisma.js';

// ----- READ-ONLY helpers -----
export async function exists(filename) {
  return prisma.question.findUnique({ where: { filename } });
}

// ----- CREATE-ONLY (no upserts) -----
export async function createDeck({
  filename, tcode, chapter, exercise,
  name, description, tags, status, sortOrder, timed, deck
}) {
  if (!deck) throw new Error('Deck payload missing');
  return prisma.question.create({
    data: {
      filename, tcode, chapter, exercise,
      type: 'deck',
      name: name ?? filename,
      description: description ?? null,
      tags: tags ?? [],
      status: status ?? null,
      sortOrder: typeof sortOrder === 'number' ? sortOrder : null,
      timed: Boolean(timed),
      deck,
      note: null
    }
  });
}

export async function createNote({
  filename, tcode, chapter, exercise,
  name, description, tags, status, sortOrder, note
}) {
  if (!note) throw new Error('Note payload missing');
  return prisma.question.create({
    data: {
      filename, tcode, chapter, exercise,
      type: 'note',
      name: name ?? filename,
      description: description ?? null,
      tags: tags ?? [],
      status: status ?? null,
      sortOrder: typeof sortOrder === 'number' ? sortOrder : null,
      timed: false,
      deck: null,
      note
    }
  });
}

// ----- ADMIN maintenance -----
export async function deleteByFilename(filename) {
  return prisma.question.delete({ where: { filename } });
}
