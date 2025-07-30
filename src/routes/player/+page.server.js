// src/routes/player/+page.server.js
import * as questionService from '../../lib/services/questionServices';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const filename = url.searchParams.get('filename');

  // ── guard: query param is mandatory ───────────────────────────────
  if (!filename) {
    return {
      deck:        null,
      background:  null,
      timed:       false,
      error:       'Filename parameter is required.'
    };
  }

  // ── fetch from DB via new QuestionServices layer ─────────────────
  const record = await questionService.getQuestionByFilename(filename);

  if (!record) {
    return {
      deck:        null,
      background:  null,
      timed:       false,
      error:       'Deck not found.'
    };
  }

  // record.deck holds our canonical DeckBuilder JSON blob
  const meta = record.deck;

  return {
    deck:       meta.deck,        // slides array
    background: meta.background,  // { backgroundColor, backgroundImage, … }
    timed:      record.timed,     // boolean flag from Question row
    error:      null
  };
}
