
// src/routes/timings/+server.js
import { json } from '@sveltejs/kit';
import * as deckService from '../../../lib/services/deckService';

export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return json({ error: 'filename required' }, { status: 400 });
  }

  const record = await deckService.getDeckByFilename(filename);
  console.log("record" , record);
  if (!record) {
    return json({ error: 'Deck not found' }, { status: 404 });
  }

  // return the JSON content of the deck
  return json(record.content);
}

export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return json({ error: 'filename required' }, { status: 400 });
  }

  const content = await request.json();
  // use your existing upsertDeck({ filename, content }) from deckService.js
  await deckService.upsertDeck({ filename, content });

  return json({ success: true });
}