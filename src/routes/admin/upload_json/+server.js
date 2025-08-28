
// /src/routes/admin/upload_json/+server.js
import { json } from '@sveltejs/kit';
import {validate} from '../../../lib/taleem/core/validate.js';
import { taleemServices as svc } from '$lib/taleemServices';

export async function POST({ request }) {
  const form = await request.formData();

  // ── Required path fields ────────────────────────────────────────────────
  const tcode    = (form.get('tcode') ?? '').toString().trim();
  const chapStr  = (form.get('chapter') ?? '').toString().trim();
  const exercise = (form.get('exercise') ?? '').toString().trim();

  if (!tcode || !chapStr || !exercise) {
    return json({ error: 'Missing required path fields' }, { status: 400 });
  }

  const chapter = Number.parseInt(chapStr, 10);
  if (Number.isNaN(chapter)) {
    return json({ error: 'Chapter must be integer' }, { status: 400 });
  }

  // ── Optional meta overrides ─────────────────────────────────────────────
  const statusOverride      = (form.get('status') ?? '').toString().trim() || undefined;
  const descriptionOverride = (form.get('description') ?? '').toString().trim() || undefined;
  const tagsCsv             = (form.get('tags') ?? '').toString();
  const tagsOverride        = tagsCsv ? tagsCsv.split(',').map(s => s.trim()).filter(Boolean) : undefined;

  // ── File presence ───────────────────────────────────────────────────────
  const file = form.get('file');
  if (!file) return json({ error: 'No file uploaded' }, { status: 400 });

  const uploadedNameWithExt = file.name || '';
  if (!/\.json$/i.test(uploadedNameWithExt)) {
    return json({ error: 'Only .json uploads are supported here' }, { status: 400 });
  }

  // Identity = filename (strip extension)
  const filename = uploadedNameWithExt.replace(/\.json$/i, '').trim();
  if (!filename) return json({ error: 'Unable to determine filename' }, { status: 400 });

  // No upsert: prevent duplicates
  if (await svc.questions.exists(filename)) {
    return json({ error: 'Filename already exists. Delete it first.' }, { status: 409 });
  }

  try {
    // ── Parse raw JSON (NO build here) ─────────────────────────────────────
    let deckRaw;
    try {
      deckRaw = JSON.parse(await file.text());
      // console.log("deckRaw" ,deckRaw);
    } catch (e) {
      return json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // ── VALIDATE ONLY on upload (do NOT build/normalize here) ─────────────
    const validation = validate(deckRaw);
    if (!validation.ok) {
      const msgs = validation.errors.map(e => e.message).join('; ');
      return json({ error: `Validation failed: ${msgs}` }, { status: 400 });
    }
    const deck = validation.value; // ← preserves spItems exactly as uploaded

    // TEMP sanity log (remove after confirming spItems are stored)
    try {
      const firstEq = deck?.deck?.find(s => s?.type === 'eq');
      const firstVisible = firstEq?.data?.find(l => typeof l?.showAt === 'number' && l.showAt > 0);
      console.log('[upload_json] first visible eq line before insert:', firstVisible);
    } catch (_) {}

    // ── Metadata precedence ───────────────────────────────────────────────
    const qName       = deck?.name || filename;
    const description = descriptionOverride ?? deck?.description ?? null;
    const tags        = tagsOverride ?? deck?.tags ?? [];
    const status      = statusOverride ?? deck?.status ?? null;

    // Determine if timed (any slide end > 0)
    const slides        = Array.isArray(deck?.deck) ? deck.deck : [];
    const totalDuration = slides.reduce(
      (mx, s) => (typeof s?.end === 'number' && s.end > mx ? s.end : mx),
      0
    );
    const timed = totalDuration > 0;

    // console.log("deck" , deck);
    // ── Persist as a Question (type: 'deck') ──────────────────
    await svc.questions.create({
      filename,
      tcode,
      chapter,
      exercise,
      type: 'deck',
      name: qName,
      description,
      tags,
      status,
      timed,
      deck
    });

    return json({ success: true, uploaded: 1 });
  } catch (err) {
    if (err?.code === 'P2002') {
      return json({ error: 'Filename already exists. Delete it first.' }, { status: 409 });
    }
    console.error('Deck upload error:', err);
    return json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
