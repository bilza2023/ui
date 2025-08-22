import { fail } from '@sveltejs/kit';
import { setSetting } from '$lib/services/AppServices.js';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
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

    if (!Array.isArray(json)) {
      return fail(400, { ok: false, error: 'Expected a JSON array' });
    }

    await setSetting('index_data', json);
    return { ok: true, count: json.length };
  }
};
