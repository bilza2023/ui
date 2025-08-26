// src/routes/admin/timings/+server.js  (or your actual path)

import { json } from '@sveltejs/kit';
import * as questionService from '../../../lib/services/questionServices.js';

export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  const record = await questionService.getQuestionByFilename(filename);
  if (!record) return json({ error: 'Question not found' }, { status: 404 });

  // Return the full question so the client can use question.deck
  return json(record);
}

export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  const payload = await request.json();

  // Accept either:
  // - { question: { deck } }   ← new shape
  // - { deck }                  ← transitional
  // - deck (raw)                ← legacy
  const newDeck =
    payload?.question?.deck ??
    payload?.deck ??
    payload;

  await questionService.updateDeckJson(filename, newDeck);
  return json({ success: true });
}
