import { fail } from '@sveltejs/kit';
import { setSetting } from '$lib/services/AppServices.js'; // uses your existing service

export const actions = {
  // default form action
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

    // Optional guard: require an array (your index_data is an array of items)
    if (!Array.isArray(json)) {
      return fail(400, { ok: false, error: 'Expected a JSON array' });
    }

    // Write to app_settings → key = 'index_data'
    await setSetting('index_data', json);

    return { ok: true, count: json.length };
  }
};
