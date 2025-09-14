// /src/routes/player/+page.server.js
export const prerender = false;

import { error } from '@sveltejs/kit';
import { questions } from '$lib/services/questionServices.js';

export async function load({ url, setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=30' });

  const idParam = (url.searchParams.get('id') || '').trim();
  const id = Number(idParam);
  if (!idParam || !Number.isInteger(id)) throw error(400, 'id must be an integer');

  const row = await questions.getById(id);
  if (!row) throw error(404, `Item ${id} not found`);
  if (row.type !== 'deck' || !row.deck) throw error(415, `Item ${id} is not a deck`);

  // Support deck-v1 object or raw slide array
  const slides = Array.isArray(row.deck) ? row.deck : (row.deck.deck ?? row.deck.slides ?? []);
  if (!Array.isArray(slides) || slides.length === 0) {
    throw error(422, `Deck ${id} has no slides`);
  }

  return {
    meta: {
      id: row.id,
      title: row.name ?? `Deck ${row.id}`,
      description: row.description ?? '',
      status: row.status ?? null,
      tags: row.tags ?? [],
      tcodeId: row.tcodeId ?? null,
      chapterId: row.chapterId ?? null,
      exerciseId: row.exerciseId ?? null,
      thumbnail: row.thumbnail ?? null,
      timed: !!row.timed,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    deckRaw: row.deck
  };
}
