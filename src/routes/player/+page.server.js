// src/routes/timings/+page.server.js
import * as deckService from '../../lib/services/deckService';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return { deck: null, error: 'Filename parameter is required.' };
  }

  const record = await deckService.getDeckByFilename(filename);
  if (!record) {
    return { deck: null, error: 'Deck not found.' };
  }

  // unwrap the JSON content column
  return {
    deck: record.content.deck,
    background: record.content.background,
    error: null
  };
}
