// src/routes/timings/+server.js
import { json } from '@sveltejs/kit';
import * as questionService from '../../../lib/services/questionServices';

export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return json({ error: 'filename required' }, { status: 400 });
  }

  const record = await questionService.getQuestionByFilename(filename);
  if (!record) {
    return json({ error: 'Deck not found' }, { status: 404 });
  }

  // return the deck JSON as-is (already stored as validated DeckBuilder format)
  return json(record.deck);
}

export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return json({ error: 'filename required' }, { status: 400 });
  }

  const newContent = await request.json();
  await questionService.updateDeckJson(filename, newContent);

  return json({ success: true });
}
