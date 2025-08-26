// /src/routes/timings/+server.js
import { json } from '@sveltejs/kit';
import { taleemServices as svc } from '$lib/taleemServices';

export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  const record = await svc.questions.getByFilename(filename);
  if (!record || !record.deck) return json({ error: 'Deck not found' }, { status: 404 });

  // return the deck JSON as-is (validated DeckBuilder format)
  return json(record.deck);
}

export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  const newContent = await request.json();
  await svc.questions.updateDeck(filename, newContent);

  return json({ success: true });
}
