// /src/routes/admin/note_editor/+server.js
import { json } from '@sveltejs/kit';
import { taleemServices as svc } from '$lib/taleemServices';

// GET /admin/note_editor?filename=...
export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  const record = await svc.questions.getByFilename(filename);
  if (!record) return json({ error: 'Question not found' }, { status: 404 });

  // Return full question; client will use question.note
  return json(record);
}

// POST /admin/note_editor?filename=...
export async function POST({ request, url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) return json({ error: 'filename required' }, { status: 400 });

  let payload;
  try { payload = await request.json(); } catch { payload = null; }

  // Accept any of:
  // - { question: { note } }
  // - { note }
  // - raw string (legacy)
  const newNote =
    (payload?.question && typeof payload.question.note === 'string' && payload.question.note) ??
    (typeof payload?.note === 'string' ? payload.note : undefined) ??
    (typeof payload === 'string' ? payload : undefined);

  if (typeof newNote !== 'string') {
    return json({ error: 'note (string) required' }, { status: 400 });
  }

  // Update only the note payload; never touch deck/identity/path here
  await svc.questions.updateNoteString(filename, newNote);

  return json({ success: true });
}
