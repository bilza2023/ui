// Admin · Synopsis (server)
// Uses ONLY v2 service:
//   $lib/services/synopisisServices2.server.js

import { fail } from '@sveltejs/kit';
import {
  addTcode,
  addChapter,
  addExercise,
  listTcodes,
  getNested
} from '../../../lib/services/synopisisServices2.js';

export const prerender = false;

export async function load() {
  const [tcodes, nested] = await Promise.all([
    listTcodes(),
    getNested(null) // all tcodes → used to cascade chapter dropdown client-side
  ]);
  return { tcodes, nested };
}

export const actions = {
  addTcode: async ({ request }) => {
    const fd = await request.formData();
    const tcode = (fd.get('tcode') || '').trim();
    const name = (fd.get('name') || '').trim();
    const description = (fd.get('description') || '').trim() || null;
    const image = (fd.get('image') || '').trim() || null;

    if (!tcode || !name) {
      return fail(400, { action: 'addTcode', ok: false, message: 'tcode and name are required' });
    }
    await addTcode({ tcode, name, description, image });
    return { action: 'addTcode', ok: true, message: `Added tcode “${tcode}”` };
  },

  addChapter: async ({ request }) => {
    const fd = await request.formData();
    const tcode = (fd.get('tcode') || '').trim();
    const filename = (fd.get('filename') || '').trim();   // chapter slug
    const name = (fd.get('name') || '').trim();
    const sortRaw = (fd.get('number') || '').trim();       // optional (number = sortOrder)
    const sortOrder = sortRaw ? Number.parseInt(sortRaw, 10) : null;

    if (!tcode || !filename || !name) {
      return fail(400, { action: 'addChapter', ok: false, message: 'tcode, filename, name are required' });
    }
    await addChapter({ tcode, filename, name, sortOrder });
    return { action: 'addChapter', ok: true, message: `Added chapter “${filename}” to ${tcode}` };
  },

  addExercise: async ({ request }) => {
    const fd = await request.formData();
    const tcode = (fd.get('tcode') || '').trim();
    const chapterFilename = (fd.get('chapterFilename') || '').trim();
    const filename = (fd.get('filename') || '').trim();   // exercise slug
    const name = (fd.get('name') || '').trim();

    if (!tcode || !chapterFilename || !filename || !name) {
      return fail(400, { action: 'addExercise', ok: false, message: 'tcode, chapterFilename, filename, name are required' });
    }
    await addExercise({ tcode, chapterFilename, filename, name, sortOrder: null });
    return { action: 'addExercise', ok: true, message: `Added exercise “${filename}” under ${tcode}/${chapterFilename}` };
  }
};
