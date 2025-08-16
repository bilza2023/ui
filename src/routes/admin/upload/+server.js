// src/routes/admin/upload/+server.js
import { json } from '@sveltejs/kit';
import DeckDoctor   from '../../../lib/deckdoctor/DeckDoctor.js';
import DeckBuilder  from '../../../lib/deckbuilder/Deckbuilder.js';
import { createDeck, exists } from '../../../lib/services/uploadServices.js'; // ✅ use upload services
import { Buffer } from 'buffer';

export async function POST({ request }) {
  const form = await request.formData();

  const tcode    = (form.get('tcode') ?? '').toString().trim();
  const chapStr  = (form.get('chapter') ?? '').toString().trim();
  const exercise = (form.get('exercise') ?? '').toString().trim();
  if (!tcode || !chapStr || !exercise) return json({ error: 'Missing required path fields' }, { status: 400 });

  const chapter = Number.parseInt(chapStr, 10);
  if (Number.isNaN(chapter)) return json({ error: 'Chapter must be integer' }, { status: 400 });

  const statusOverride      = (form.get('status') ?? '').toString().trim() || undefined;
  const descriptionOverride = (form.get('description') ?? '').toString().trim() || undefined;
  const tagsCsv             = (form.get('tags') ?? '').toString();
  const tagsOverride        = tagsCsv ? tagsCsv.split(',').map(s=>s.trim()).filter(Boolean) : undefined;

  const file = form.get('file');
  if (!file) return json({ error: 'No file uploaded' }, { status: 400 });

  const originalName = file.name;
  const baseName = (form.get('filename')?.toString().trim())
                || originalName.replace(/\.(json|js)$/i, '');
  if (!baseName) return json({ error: 'Unable to determine filename' }, { status: 400 });

  // ✅ hard fail on duplicate (no upsert)
  if (await exists(baseName)) {
    return json({ error: 'Filename already exists. Delete it first or choose a new filename.' }, { status: 409 });
  }

  try {
    // Parse / build
    let deckRaw;
    if (/\.js$/i.test(originalName)) {
      const rawCode = await file.text();
      const mod     = await import(`data:application/javascript;base64,${Buffer.from(rawCode,'utf8').toString('base64')}`);
      const define  = mod.defineDeck ?? mod.default;
      if (typeof define !== 'function') throw new Error('No defineDeck() export found');
      const builder = new DeckBuilder();
      define(builder);
      deckRaw = builder.build();
    } else {
      deckRaw = JSON.parse(await file.text());
    }

    // Validate
    const deckNorm = DeckDoctor.isDeckV1(deckRaw) ? deckRaw : DeckDoctor.build(deckRaw);
    const validation = DeckDoctor.validate(deckNorm);
    if (!validation.ok) {
      const msgs = validation.errors.map(e => e.message).join('; ');
      return json({ error: `Validation failed: ${msgs}` }, { status: 400 });
    }
    const deck = validation.value;

    // Metadata precedence
    const qName       = deck?.name || baseName;
    const description = descriptionOverride ?? deck?.description ?? null;
    const tags        = tagsOverride ?? deck?.tags ?? [];
    const status      = statusOverride ?? deck?.status ?? null;
    const timed       = (DeckDoctor.getTotalDuration?.(deck) ?? 0) > 0;

    // ✅ create-only (will throw P2002 if race)
    await createDeck({
      filename: baseName,
      tcode, chapter, exercise,
      name: qName, description, tags, status, timed, deck
    });

    return json({ success: true, uploaded: 1 });
  } catch (err) {
    if (err?.code === 'P2002') {
      // unique constraint safety net
      return json({ error: 'Filename already exists. Delete it first or choose a new filename.' }, { status: 409 });
    }
    console.error('Deck upload error:', err);
    return json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
