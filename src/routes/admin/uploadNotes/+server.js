// src/routes/admin/uploadNotes/+server.js
import { json } from '@sveltejs/kit';
import { createQuestion, exists } from '../../../lib/services/questionServices.js'; // ✅ unified service

export async function POST({ request }) {
  const form = await request.formData();

  const tcode    = (form.get('tcode') ?? '').toString().trim();
  const chapStr  = (form.get('chapter') ?? '').toString().trim();
  const exercise = (form.get('exercise') ?? '').toString().trim();
  if (!tcode || !chapStr || !exercise) {
    return json({ error: 'Missing required path fields' }, { status: 400 });
  }

  const chapter = Number.parseInt(chapStr, 10);
  if (Number.isNaN(chapter)) return json({ error: 'Chapter must be integer' }, { status: 400 });

  const statusOverride      = (form.get('status') ?? '').toString().trim() || undefined;
  const descriptionOverride = (form.get('description') ?? '').toString().trim() || undefined;
  const tagsCsv             = (form.get('tags') ?? '').toString();
  const tagsOverride        = tagsCsv ? tagsCsv.split(',').map(s=>s.trim()).filter(Boolean) : undefined;

  const file = form.get('file');
  if (!file) return json({ error: 'No file uploaded' }, { status: 400 });

  const originalName = file.name;
  const baseName = (form.get('filename')?.toString().trim())
                || originalName.replace(/\.(html|htm)$/i, '');
  if (!baseName) return json({ error: 'Unable to determine filename' }, { status: 400 });

  // ✅ hard fail on duplicate (no upsert)
  if (await exists(baseName)) {
    return json({ error: 'Filename already exists. Delete it first or choose a new filename.' }, { status: 409 });
  }

  try {
    // Read note text
    const noteText = await file.text();
    if (!noteText.trim()) {
      return json({ error: 'Note file is empty' }, { status: 400 });
    }

    // ✅ Use createQuestion for notes
    await createQuestion({
      filename: baseName,
      type: 'note',                        // <-- important: mark it as a note
      tcode, chapter, exercise,
      name: descriptionOverride || baseName,
      description: descriptionOverride ?? null,
      tags: tagsOverride ?? [],
      status: statusOverride ?? 'ready',
      note: noteText
    });

    return json({ success: true, uploaded: 1 });
  } catch (err) {
    if (err?.code === 'P2002') {
      return json({ error: 'Filename already exists. Delete it first or choose a new filename.' }, { status: 409 });
    }
    console.error('Note upload error:', err);
    return json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
