// /src/routes/admin/upload_json/+server.js
import { json } from '@sveltejs/kit';
import { validate } from '$lib/taleem/core/validate.js';
import { taleemServices as svc } from '$lib/taleemServices';

export async function POST({ request }) {
  const form = await request.formData();

  // Required path fields
  const tcode    = (form.get('tcode') ?? '').toString().trim();
  const chapStr  = (form.get('chapter') ?? '').toString().trim();
  const exercise = (form.get('exercise') ?? '').toString().trim();
  const filename = (form.get('filename') ?? '').toString().trim();

  if (!tcode || !chapStr || !exercise || !filename) {
    return json({ error: 'tcode, chapter, exercise, filename are required' }, { status: 400 });
  }

  const chapter = Number.parseInt(chapStr, 10);
  if (Number.isNaN(chapter)) {
    return json({ error: 'Chapter must be an integer' }, { status: 400 });
  }

  // Optional meta
  const statusOverride      = (form.get('status') ?? '').toString().trim() || undefined;
  const descriptionOverride = (form.get('description') ?? '').toString().trim() || undefined;
  const tagsCsv             = (form.get('tags') ?? '').toString();
  const tagsOverride        = tagsCsv ? tagsCsv.split(',').map(s => s.trim()).filter(Boolean) : undefined;

  // Deck JSON comes from textarea
  const deckJsonText = (form.get('deckJson') ?? '').toString().trim();
  if (!deckJsonText) {
    return json({ error: 'Deck JSON is required' }, { status: 400 });
  }

  // No upsert: prevent duplicates
  if (await svc.questions.exists(filename)) {
    return json({ error: 'Filename already exists. Delete it first.' }, { status: 409 });
  }

  try {
    // Parse raw JSON
    let deckRaw;
    try {
      deckRaw = JSON.parse(deckJsonText);
    } catch {
      return json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Validate (preserve structure exactly as uploaded)
    const validation = validate(deckRaw);
    if (!validation.ok) {
      const msgs = validation.errors.map(e => e.message).join('; ');
      return json({ error: `Validation failed: ${msgs}` }, { status: 400 });
    }
    const deck = validation.value;

    // Metadata precedence
    const qName       = deck?.name || filename;
    const description = descriptionOverride ?? deck?.description ?? null;
    const tags        = tagsOverride ?? deck?.tags ?? [];
    const status      = statusOverride ?? deck?.status ?? null;

    // Determine if timed
    const slides        = Array.isArray(deck?.deck) ? deck.deck : [];
    const totalDuration = slides.reduce(
      (mx, s) => (typeof s?.end === 'number' && s.end > mx ? s.end : mx),
      0
    );
    const timed = totalDuration > 0;

    // Persist as a Question (type: 'deck')
    await svc.questions.create({
      filename,
      type: 'deck',
      tcode,
      chapter,
      exercise,
      name: qName,
      description,
      tags,
      status,
      timed,
      deck
    });

    return json({ success: true, uploaded: 1 });
  } catch (err) {
    if (err?.code === 'P2002') {
      return json({ error: 'Filename already exists. Delete it first.' }, { status: 409 });
    }
    console.error('Deck paste error:', err);
    return json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
