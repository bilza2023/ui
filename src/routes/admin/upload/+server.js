// File: src/routes/admin/upload/+server.js
import { json } from '@sveltejs/kit';
import DeckDoctor   from '../../../lib/deckdoctor/DeckDoctor.js';
import DeckBuilder  from '../../../lib/deckbuilder/Deckbuilder.js';
import { insertFullQuestionFromDeck } from '../../../lib/services/questionServices.js';
import { Buffer } from 'buffer';

/** POST /admin/upload — accepts .js (DeckBuilder DSL) or .json (raw deck-v1) */
export async function POST({ request }) {
  const form  = await request.formData();
  const files = form.getAll('files');
  if (!files.length) {
    return json({ error: 'No files uploaded' }, { status: 400 });
  }

  const failed = [];

  for (const file of /** @type {File[]} */ (files)) {
    const name     = file.name;
    const filename = name.replace(/\.(json|js)$/i, '');

    try {
      /* ─────────────────────── Parse / Build Deck ─────────────────────── */
      let deckRaw;

      if (/\.js$/i.test(name)) {
        // ── DeckBuilder DSL file ──────────────────────────────────────────
        const rawCode = await file.text();
        const base64  = Buffer.from(rawCode, 'utf8').toString('base64');
        const mod     = await import(`data:application/javascript;base64,${base64}`);
        const define  = mod.defineDeck ?? mod.default;
        if (typeof define !== 'function') {
          throw new Error('No defineDeck() export found');
        }

        const builder = new DeckBuilder();
        define(builder);
        deckRaw = builder.build();          // already deck-v1
      } else {
        // ── Raw JSON upload ───────────────────────────────────────────────
        const rawJson = await file.text();
        deckRaw = JSON.parse(rawJson);      // may or may not be deck-v1
      }

      /* ───────────────────── Normalise / Validate ─────────────────────── */
      const deckNorm = DeckDoctor.isDeckV1(deckRaw)
        ? deckRaw                       // DeckBuilder output → already v1
        : DeckDoctor.build(deckRaw);    // raw JSON → inject defaults, expand EQ

      const validation = DeckDoctor.validate(deckNorm);
      if (!validation.ok) {
        const msgs = validation.errors.map(e => e.message).join('; ');
        throw new Error(`Validation failed: ${msgs}`);
      }
      const deck = validation.value;

      /* ───────────────────── Insert into DB ───────────────────────────── */
      const { name: qName, description, tags, status } = deck;
      const timed = DeckDoctor.getTotalDuration(deck) > 0;

      await insertFullQuestionFromDeck({
        filename,
        name:        qName,
        description,
        tags,
        status,
        timed,
        deck
      });

    } catch (err) {
      console.error(`Upload error for ${name}:`, err);

      if (err.code === 'P2002') {
        failed.push(`${name} (question already exists)`);
      } else {
        failed.push(`${name} (${err.message})`);
      }
    }
  }

  if (failed.length) {
    return json({ error: `Failed uploads: ${failed.join(', ')}` }, { status: 400 });
  }

  return json({ success: true });
}
