// /src/routes/admin/timings/+server.js
import { json } from '@sveltejs/kit';
import { taleemServices as svc } from '$lib/taleemServices';

export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  const record = await svc.questions.getByFilename(filename);
  if (!record) return json({ error: 'Question not found' }, { status: 404 });

  // Return the full question so the client can use question.deck
  return json(record);
}

export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  let payload;
  try { payload = await request.json(); } catch { payload = null; }

  // Accept either:
  // - { question: { deck } }   ← new shape
  // - { deck }                 ← transitional
  // - deck (raw)               ← legacy
  const newDeck =
    payload?.question?.deck ??
    payload?.deck ??
    payload;

  await svc.questions.updateDeck(filename, newDeck);
  return json({ success: true });
}
