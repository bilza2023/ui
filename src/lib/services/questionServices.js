// Adjust prisma client import to your project path
import prisma from '$lib/server/prisma.js';

/**
 * Upsert a Question row that can be a deck or a note (single-table design).
 * Rules:
 *  - type === 'deck'  → requires `deck`, sets note=null
 *  - type === 'note'  → requires `note`, sets deck=null
 *  - exactly one payload is stored
 */
export async function insertFullQuestionFromDeck({
  filename,
  tcode,
  chapter,
  exercise,
  type,            // 'deck' | 'note'
  name,
  description,
  tags,
  status,
  sortOrder,       // optional
  timed,
  deck,            // Json? when type='deck'
  note             // String? when type='note'
}) {
  if (type !== 'deck' && type !== 'note') {
    throw new Error(`Invalid type: ${type}`);
  }
  if (type === 'deck' && !deck) {
    throw new Error('Deck payload missing for type=deck');
  }
  if (type === 'note' && !note) {
    throw new Error('Note payload missing for type=note');
  }

  const data = {
    filename,
    tcode,
    chapter,
    exercise,
    type,
    name:        name ?? null,
    description: description ?? null,
    tags:        tags ?? [],
    status:      status ?? null,
    sortOrder:   typeof sortOrder === 'number' ? sortOrder : null,
    timed:       Boolean(timed),
    deck:        type === 'deck' ? deck : null,
    note:        type === 'note' ? note : null
  };

  return prisma.question.upsert({
    where:  { filename },
    update: data,
    create: data
  });
}
