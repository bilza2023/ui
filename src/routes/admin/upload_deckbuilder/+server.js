// File: src/routes/…/upload/+server.js
import { json } from '@sveltejs/kit';
import * as deckService from '../../../lib/services/deckService';
import DeckBuilder from '../../../lib/deckbuilder/Deckbuilder.js';
import { zodDeckV1 } from '../../../lib/deckbuilder/schema/ZodDeckV1.js';
import { Buffer } from 'buffer';

export async function POST({ request }) {
  const form = await request.formData();
  const files = form.getAll('files');

  if (!files.length) {
    return json({ error: 'No files uploaded' }, { status: 400 });
  }

  const failed = [];

  for (const file of /** @type {File[]} */ (files)) {
    const name = file.name;
    const isJs = /\.js$/i.test(name);
    const filename = name.replace(/\.(json|js)$/i, '');

    try {
      if (isJs) {
        // --- DeckBuilder format (.js) ---
        const raw = await file.text();
        // Turn code into a data: URL so we can import it as an ESM module
        const base64 = Buffer.from(raw, 'utf8').toString('base64');
        const mod = await import(`data:application/javascript;base64,${base64}`);
        //This is where we get defineDeck 
        const defineDeck = mod.defineDeck ?? mod.default;

        if (typeof defineDeck !== 'function') {
          throw new Error('No defineDeck() export found');
        }

        // Build and validate
        const builder = new DeckBuilder();
        defineDeck(builder);
        const deckJson = builder.build();
        zodDeckV1.parse(deckJson);

        // Persist
        await deckService.createDeck({ filename, content: deckJson });

      } else {
        // --- Raw JSON format (.json) ---
        const raw = await file.text();
        const data = JSON.parse(raw);
        await deckService.createDeck({ filename, content: data });
      }

    } catch (err) {
      console.error(`Upload error for ${name}:`, err);

      // Handle duplicate‐filename error
      if (err.code === 'P2002') {
        failed.push(`${name} (deck already exists)`);
      } else {
        failed.push(`${name} (${isJs ? err.message : 'failed to process'})`);
      }
    }
  }

  if (failed.length) {
    return json(
      { error: `Failed uploads: ${failed.join(', ')}` },
      { status: 400 }
    );
  }

  return json({ success: true });
}
