// src/routes/admin/pointer/+server.js

import { json } from '@sveltejs/kit';
import { getDeckByFilename, upsertDeck } from '$lib/services/deckService';

export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return json({ error: 'filename is required' }, { status: 400 });
  }

  // 1. read the updated slides array from the request body
  const newSlides = await request.json();

  // 2. fetch the existing deck
  const record = await getDeckByFilename(filename);
  if (!record) {
    return json({ error: 'deck not found' }, { status: 404 });
  }

  // 3. overwrite just the deck array
  const updatedContent = {
    ...record.content,
    deck: newSlides
  };

  // 4. persist using your service (mirror createDeck API) 
//   await deckService.updateDeck({ filename, content: updatedContent });
await upsertDeck({ filename, content: updatedContent });

  return json({ success: true });
}
