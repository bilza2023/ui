// /src/routes/admin/upload_json/+server.js
import { json } from '@sveltejs/kit';
import DeckDoctor   from '../../../lib/deckdoctor/DeckDoctor.js';
import DeckBuilder  from '../../../lib/deckbuilder/Deckbuilder.js';
import { taleemServices as svc } from '$lib/taleemServices';
import { Buffer } from 'buffer';

export async function POST({ request }) {
  const form = await request.formData();

  // Required path fields
  const tcode    = (form.get('tcode') ?? '').toString().trim();
  const chapStr  = (form.get('chapter') ?? '').toString().trim();
  const exercise = (form.get('exercise') ?? '').toString().trim();
  if (!tcode || !chapStr || !exercise) {
    return json({ error: 'Missing required path fields' }, { status: 400 });
  }

  const chapter = Number.parseInt(chapStr, 10);
  if (Number.isNaN(chapter)) {
    return json({ error: 'Chapter must be integer' }, { status: 400 });
  }

  // Optional meta overrides
  const statusOverride      = (form.get('status') ?? '').toString().trim() || undefined;
  const descriptionOverride = (form.get('description') ?? '').toString().trim() || undefined;
  const tagsCsv             = (form.get('tags') ?? '').toString();
  const tagsOverride        = tagsCsv ? tagsCsv.split(',').map(s => s.trim()).filter(Boolean) : undefined;

  // File
  const file = form.get('file');
  if (!file) return json({ error: 'No file uploaded' }, { status: 400 });

  // Use the ACTUAL uploaded filename (strip .json/.js) as identity
  const uploadedNameWithExt = file.name || '';
  const filename = uploadedNameWithExt.replace(/\.(json|js)$/i, '').trim();
  if (!filename) return json({ error: 'Unable to determine filename' }, { status: 400 });

  // Hard fail on duplicate (no upsert)
  if (await svc.questions.exists(filename)) {
    return json({ error: 'Filename already exists. Delete it first.' }, { status: 409 });
  }

  try {
    // Parse/build raw deck/question
    let deckRaw;

    if (/\.js$/i.test(uploadedNameWithExt)) {
      // JS module upload that exports defineDeck(builder) or default(builder)
      const rawCode = await file.text();
      const dataUrl = `data:application/javascript;base64,${Buffer.from(rawCode, 'utf8').toString('base64')}`;

      // Suppress Vite analysis warning for dynamic import:
      const mod    = await import(/* @vite-ignore */ dataUrl);
      const define = mod.defineDeck ?? mod.default;
      if (typeof define !== 'function') throw new Error('No defineDeck() export found');

      const builder = new DeckBuilder();
      define(builder);
      deckRaw = builder.build({ validate: false }); // build first; validate below
    } else {
      // JSON upload
      deckRaw = JSON.parse(await file.text());
    }

    // Normalize & validate
    const deckNorm   = DeckDoctor.build(deckRaw);
    const validation = DeckDoctor.validate(deckNorm);
    if (!validation.ok) {
      const msgs = validation.errors.map(e => e.message).join('; ');
      return json({ error: `Validation failed: ${msgs}` }, { status: 400 });
    }
    const deck = validation.value; // { version, background, deck: [...slides], ... }

    // Metadata precedence
    const qName       = deck?.name || filename;
    const description = descriptionOverride ?? deck?.description ?? null;
    const tags        = tagsOverride ?? deck?.tags ?? [];
    const status      = statusOverride ?? deck?.status ?? null;

    // Determine if timed (any slide end > 0)
    const slides        = Array.isArray(deck?.deck) ? deck.deck : [];
    const totalDuration = slides.reduce(
      (mx, s) => (typeof s?.end === 'number' && s.end > mx ? s.end : mx),
      0
    );
    const timed = totalDuration > 0;

    // Persist as a Question (type: 'deck')
    await svc.questions.create({
      filename,
      tcode,
      chapter,
      exercise,
      type: 'deck',
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
    console.error('Deck upload error:', err);
    return json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
