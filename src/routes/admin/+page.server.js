// src/routes/decks/+page.server.js
import * as deckService from '../../lib/services/deckService';  // ← note the correct file name


/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const decks = await deckService.getAllDecks();
  // console.log('⏳ fetched decks:', decks);  // you should see your 4 decks here in the terminal
  return { decks };
}


