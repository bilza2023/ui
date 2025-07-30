// src/routes/admin/delete/+server.js
import { json } from '@sveltejs/kit';
import { deleteQuestion } from '../../../lib/services/questionServices.js';  // ✅ correct name

export async function POST({ request }) {
  const formData = await request.formData();
  const filename = formData.get('filename');

  if (typeof filename !== 'string' || !filename.trim()) {
    return json({ success: false, error: 'Invalid filename.' }, { status: 400 });
  }

  try {
    await deleteQuestion(filename);          // ✅ delete from Question table
    return json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    return json(
      {
        success: false,
        error:
          err.code === 'P2025' || err.message.includes('Record') // Prisma “not found”
            ? 'Question not found.'
            : err.message
      },
      { status: 404 }
    );
  }
}
