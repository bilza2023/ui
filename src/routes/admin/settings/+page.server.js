// /src/routes/admin/settings/+page.server.js
import { fail } from '@sveltejs/kit';
import {
  listTcodes,
  getNested,
  addTcode,
  addChapter,
  addExercise
} from '$lib/services/synopisisServices2.js';

export const prerender = false;

export async function load() {
  const tcodes = await listTcodes();
  return { tcodes };
}

export const actions = {
  // POST ?/importSynopsis
  importSynopsis: async ({ request }) => {
    const fd = await request.formData();
    const file = fd.get('synopsis_file');
    const asTcode = (fd.get('as_tcode') || '').trim();
    const mode = ((fd.get('mode') || 'merge') + '').trim().toLowerCase(); // reserved

    if (!file || typeof file.text !== 'function') {
      return fail(400, { ok: false, code: 'E_NO_FILE', message: 'Please choose a JSON file.' });
    }

    let payload;
    try {
      payload = JSON.parse(await file.text());
    } catch {
      return fail(400, { ok: false, code: 'E_BAD_JSON', message: 'Invalid JSON file.' });
    }

    // Accept exactly ONE tcode object (same shape as getNested single-tcode)
    let tcodeObj = null;
    if (payload && typeof payload === 'object' && payload.tcodeName && Array.isArray(payload.chapters)) {
      tcodeObj = payload;
    } else if (payload && Array.isArray(payload.tcodes)) {
      if (payload.tcodes.length !== 1) {
        return fail(400, { ok: false, code: 'E_MULTI_TCODE_NOT_SUPPORTED', message: 'Upload exactly one tcode JSON.' });
      }
      tcodeObj = payload.tcodes[0];
    } else {
      return fail(400, { ok: false, code: 'E_BAD_SHAPE', message: 'Unexpected JSON shape for tcode snapshot.' });
    }

    const tcodeName = asTcode || tcodeObj.tcodeName;
    if (!tcodeName) {
      return fail(400, { ok: false, code: 'E_NO_TCODE', message: 'tcodeName missing.' });
    }

    // Ensure tcode exists (idempotent)
    const tcodes = await listTcodes();
    const exists =
      Array.isArray(tcodes) &&
      tcodes.some((t) =>
        typeof t === 'string'
          ? t === tcodeName
          : (t.tcode && t.tcode === tcodeName) || (t.tcodeName && t.tcodeName === tcodeName)
      );

    if (!exists) {
      await addTcode({
        tcode: tcodeName,
        name: tcodeName, // minimal; can be edited later
        description: tcodeObj.description ?? null,
        image: tcodeObj.image ?? null
      });
    }

    // Merge by filename (no deletions)
    let existing = null;
    try { existing = await getNested(tcodeName); } catch { existing = null; }

    const chapterMap = new Map();
    if (existing && Array.isArray(existing.chapters)) {
      for (const ch of existing.chapters) chapterMap.set(ch.filename, ch);
    }

    let addedChapters = 0;
    let addedExercises = 0;

    for (const ch of tcodeObj.chapters || []) {
      const chFilename = ch.filename;
      const chName = ch.name ?? chFilename;
      const already = chapterMap.get(chFilename);

      if (!already) {
        await addChapter({ tcode: tcodeName, filename: chFilename, name: chName, sortOrder: ch.sortOrder ?? null });
        addedChapters++;
      }

      const exSet =
        already && Array.isArray(already.exercises)
          ? new Set(already.exercises.map((e) => e.filename))
          : new Set();

      for (const ex of ch.exercises || []) {
        if (!exSet.has(ex.filename)) {
          await addExercise({
            tcode: tcodeName,
            chapterFilename: chFilename,
            filename: ex.filename,
            name: ex.name ?? ex.filename,
            sortOrder: null
          });
          addedExercises++;
        }
      }
    }

    return {
      ok: true,
      action: 'importSynopsis',
      tcode: tcodeName,
      added: { chapters: addedChapters, exercises: addedExercises },
      mode
    };
  }
};
