
import { json } from '@sveltejs/kit';
import * as deckService from '../../lib/services/deckService';


export async function POST({ request }) {
  const form = await request.formData();
  const files = form.getAll('files');

  if (!files.length) {
    return json({ error: 'No files uploaded' }, { status: 400 });
  }

  const failed = [];

  for (const file of /** @type {File[]} */ (files)) {
    try {
      const raw = await file.text();
      const data = JSON.parse(raw);
      const filename = file.name.replace(/\.json$/i, '');

      // Try to create; Prisma will throw on duplicate filename
      await deckService.createDeck({ filename, content: data });
    } catch (err) {
      console.error(`Upload error for ${file.name}:`, err);

      // Prisma unique constraint error code
      if (err.code === 'P2002') {
        failed.push(`${file.name} (deck already exists)`);
      } else {
        failed.push(`${file.name} (failed to process)`);
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
