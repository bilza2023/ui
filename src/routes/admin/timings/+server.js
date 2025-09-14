
import { json } from '@sveltejs/kit';
import { questions } from '$lib/services/questionServices.js';

export async function GET({ url }) {
  const id = Number(url.searchParams.get('id'));
  if (!id) return json({ error: 'id required' }, { status: 400 });
  const row = await questions.getById(id);
  if (!row?.deck) return json({ error: 'Deck not found' }, { status: 404 });
  return json(row.deck);
}

export async function POST({ request, url }) {
  const id = Number(url.searchParams.get('id'));
  if (!id) return json({ error: 'id required' }, { status: 400 });
  const payload = await request.json();
  const deck = payload?.deck ?? payload; // supports both client shapes
  await questions.update(id, { deck });
  return json({ success: true });
}
