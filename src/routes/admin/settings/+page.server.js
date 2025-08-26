// src/routes/admin/settings/+page.server.js
import { fail } from '@sveltejs/kit';
import { setSetting } from '$lib/services/AppServices.js';
// index_data will be converted into video_index at some proper time
const ALLOWED_KEYS = new Set(['index_data', 'blog_index']); // add more if needed

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const targetKeyRaw = data.get('target_key') ?? 'index_data';
    const target_key = String(targetKeyRaw);

    if (!ALLOWED_KEYS.has(target_key)) {
      return fail(400, { ok: false, error: `Key "${target_key}" is not allowed.` });
    }

    const file = data.get('index_json');
    if (!file || typeof file.text !== 'function') {
      return fail(400, { ok: false, error: 'No file received' });
    }

    let text;
    try {
      text = await file.text();
    } catch {
      return fail(400, { ok: false, error: 'Unable to read file' });
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return fail(400, { ok: false, error: 'Invalid JSON' });
    }

    // minimal guard: expect an array for these two indices
    if (!Array.isArray(json)) {
      return fail(400, {
        ok: false,
        error: 'Expected a JSON array (your file is not an array).'
      });
    }

    await setSetting(target_key, json);
    return { ok: true, key: target_key, count: json.length };
  }
};
