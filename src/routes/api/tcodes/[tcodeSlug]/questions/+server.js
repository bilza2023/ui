// /src/routes/api/tcodes/[tcodeSlug]/questions/+server.js
import { json } from '@sveltejs/kit';
import { listQuestionsByTcode } from '$lib/services/questionServices.js';

const S = (v) => (typeof v === 'string' ? v.trim() : '');

export async function GET({ params, url, setHeaders }) {
  const tcodeSlug = S(params.tcodeSlug);
  if (!tcodeSlug) return json({ error: 'tcode required' }, { status: 400 });

  const chapter  = S(url.searchParams.get('chapter')) || undefined;   // e.g. "Ch-11 Parallelograms and Triangles"
  const exercise = S(url.searchParams.get('exercise')) || undefined; // e.g. "theorems"
  const type     = S(url.searchParams.get('type')) || undefined;     // optional: 'deck' | 'note'

  try {
    const items = await listQuestionsByTcode({
      tcode: tcodeSlug,
      chapter,
      exercise,
      type,
      selectPayload: false
    });

    setHeaders({ 'cache-control': 'public, max-age=15' });
    return json(items);
  } catch (err) {
    console.error('[API questions]', err?.message || err);
    return json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
