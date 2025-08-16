// src/routes/player/+page.js
import { getDeck } from '../../lib/services/deckService';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const filename = url.searchParams.get('filename');

  // Guard: query param is mandatory
  if (!filename) {
    return {
      deck:       null,
      background: null,
      timed:      false,
      error:      'Filename parameter is required.'
    };
  }

  try {
    // ⬇ fetch from /static/decks/ via deckService
    const fullDeck = await getDeck(filename, { fetch });

    // simple timed flag: true if ANY slide-item has showAt > 0
    const timed = fullDeck.deck.some(slide =>
      slide.data.some(item => item.showAt && item.showAt > 0)
    );

    return {
      deck:       fullDeck.deck,
      background: fullDeck.background ?? null,
      timed,
      error:      null
    };
  } catch (err) {
    return {
      deck:       null,
      background: null,
      timed:      false,
      error:      err.message
    };
  }
}
