

// ===============================
// File: src/routes/admin/editor/+page.server.js
// ===============================
import DeckDoctor from '../../../lib/deckdoctor/DeckDoctor.js';
import { insertFullQuestionFromDeck } from '../../../lib/services/questionServices.js';

/**
 * Provide static list of slide types to the client.
 */
export const load = () => {
  return {
    slideTypes: [
      'titleSlide',
      'titleAndSubtitle',
      'bulletList',
      'imageSlide',
      'imageWithTitle',
      'imageWithCaption',
      'imageLeftBulletsRight',
      'imageRightBulletsLeft',
      'twoColumnText',
      'table',
      'bigNumber',
      'statistic',
      'barChart',
      'donutChart',
      'quoteSlide',
      'quoteWithImage',
      'cornerWordsSlide',
      'contactSlide'
    ]
  };
};

export const actions = {
  /** Save a brand‑new deck (Question) coming from the UI */
  default: async ({ request }) => {
    const payload = await request.json();
    const { filename, deck } = payload;

    if (!filename || !deck) {
      return { success: false, error: 'filename and deck required' };
    }

    // Clean & validate via DeckDoctor
    const norm   = DeckDoctor.normalise(deck);
    const result = DeckDoctor.validate(norm);
    if (!result.ok) {
      return {
        success: false,
        error:   result.errors.map(e => e.message).join('; ')
      };
    }

    const fixed = result.value;
    const timed = DeckDoctor.getTotalDuration(fixed) > 0;

    await insertFullQuestionFromDeck({
      filename,
      name:        fixed.name,
      description: fixed.description,
      tags:        fixed.tags,
      status:      fixed.status,
      timed,
      deck:        fixed
    });

    return { success: true };
  }
};
