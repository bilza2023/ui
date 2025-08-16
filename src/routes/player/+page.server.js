import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

export const prerender = false;

export async function load({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) throw error(400, 'filename is required');

  const row = await prisma.question.findUnique({
    where: { filename },
    select: {
      type: true,
      deck: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      timed: true,
      tcode: true,
      chapter: true,
      exercise: true,
      editedAt: true,
      createdAt: true
    }
  });

  if (!row) throw error(404, `Deck "${filename}" not found`);
  if (row.type !== 'deck' || !row.deck) throw error(415, `Item "${filename}" is not a deck`);

  // `row.deck` can be either a deck object {version, background, deck:[]} or an array of slides.
  const slides = Array.isArray(row.deck) ? row.deck : (row.deck.deck ?? []);
  if (!Array.isArray(slides) || slides.length === 0) {
    throw error(422, `Deck "${filename}" has no slides`);
  }

  return {
    meta: {
      filename,
      name: row.name ?? filename,
      description: row.description ?? '',
      status: row.status ?? null,
      tags: row.tags ?? [],
      timed: !!row.timed,
      tcode: row.tcode,
      chapter: row.chapter,
      exercise: row.exercise,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    deckRaw: row.deck
  };
}
