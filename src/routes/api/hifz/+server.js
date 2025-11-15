
// /src/routes/api/hifz/+server.js
import { json } from '@sveltejs/kit';
import {
  getHifzBySurahAyah,
  updateHifzByHookId
} from '$lib/services/hifzServices.js';

// GET /api/hifz?surah=2&ayah=255
export async function GET({ url }) {
  const surah = url.searchParams.get('surah');
  const ayah = url.searchParams.get('ayah');

  if (!surah || !ayah) {
    return json({ error: 'surah and ayah are required' }, { status: 400 });
  }

  try {
    const hifz = await getHifzBySurahAyah(surah, ayah);
    return json({ hifz: hifz ?? null });
  } catch (err) {
    console.error('GET /api/hifz error:', err);
    return json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/hifz
// body: { surah, ayah, field, value }
export async function POST({ request }) {
  try {
    const { surah, ayah, field, value } = await request.json();

    if (!surah || !ayah || !field) {
      return json({ error: 'surah, ayah and field are required' }, { status: 400 });
    }

    const row = await getHifzBySurahAyah(surah, ayah);

    if (!row) {
      // assuming rows already exist for all ayat
      return json({ error: 'Hifz row not found for this surah/ayah' }, { status: 404 });
    }

    const updated = await updateHifzByHookId(row.hookId, { [field]: value });

    return json({ ok: true, hifz: updated });
  } catch (err) {
    console.error('POST /api/hifz error:', err);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
