

// File: src/routes/admin/syllabus/+server.js
import { redirect } from '@sveltejs/kit';
import {
  createTcode,
  createChapter,
  createExercise
} from '../../../lib/services/syllabusServices.js';

export async function POST({ request }) {
  const form = await request.formData();
  const action = form.get('action');

  switch (action) {
    case 'createTcode':
      await createTcode({
        tcodeName: form.get('tcodeName'),
        title: form.get('title'),
        description: form.get('description'),
        image: form.get('image')
      });
      break;

    case 'createChapter':
      await createChapter({
        filename: form.get('filename'),
        name: form.get('name'),
        description: form.get('description'),
        image: form.get('image'),
        order: parseInt(form.get('order'), 10) || 0,
        tcodeId: form.get('tcodeId') ? parseInt(form.get('tcodeId'), 10) : null
      });
      break;

    case 'createExercise':
      await createExercise({
        filename: form.get('filename'),
        name: form.get('name'),
        description: form.get('description'),
        image: form.get('image'),
        order: parseInt(form.get('order'), 10) || 0,
        chapterId: form.get('chapterId') ? parseInt(form.get('chapterId'), 10) : null
      });
      break;

    default:
      // unknown action
      break;
  }

  // Redirect back to the form
  throw redirect(303, '/admin/syllabus');
}
