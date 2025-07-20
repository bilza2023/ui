

// src/routes/admin/delete/+server.js
import { deleteDeckByFilename } from '../../../lib/services/deckService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const formData = await request.formData();
  const filename = formData.get('filename');

  if (typeof filename !== 'string' || !filename.trim()) {
    return json({ success: false, error: 'Invalid filename.' }, { status: 400 });
  }

  try {
    await deleteDeckByFilename(filename);
    return json({ success: true });
  } catch (err) {
    return json({
      success: false,
      error: err.message.includes('No record') ? 'Deck not found.' : err.message
    }, { status: 404 });
  }
}
