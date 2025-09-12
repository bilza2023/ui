// Create Question — server loader + formKit action
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import crudl from '$lib/crudl/crudl.js';


const questions = crudl('question');

export async function load({ url }) {
  const tcodeId = url.searchParams.get('tcodeId') || '';
  const chapterId = url.searchParams.get('chapterId') || '';
  const exerciseId = url.searchParams.get('exerciseId') || '';
  return { tcodeId, chapterId, exerciseId };
}
export const actions = {
  add: makeAction({
    spec: {
      tcodeId:    R.intId('tcodeId', { required: true }),
      chapterId:  R.intId('chapterId', { required: true }),
      exerciseId: R.intId('exerciseId', { required: true }),
      name:       R.str('name', { required: true }),
      description:R.str('description', { required: false }),
      thumbnail:  R.str('thumbnail', { required: false }),
      status:     R.$enum('status', ['draft','ready','published','archived'], { required: true }),
      type:       R.$enum('type', ['note','deck'], { required: true }),
      noteOrDeck: R.str('noteOrDeck', { required: false }) // textarea
    },
    prepare: (v) => {
      const base = {
        tcodeId: v.tcodeId,
        chapterId: v.chapterId,
        exerciseId: v.exerciseId,
        name: v.name.trim(),
        description: v.description ?? '',
        thumbnail: v.thumbnail ?? '',
        status: v.status,
        type: v.type
      };
      const raw = v.noteOrDeck?.trim() ?? '';

      if (v.type === 'note') {
        return { ...base, note: raw || null, deck: null };
      }

      // type === 'deck'
      if (!raw) return { ...base, note: null, deck: null };
      try {
        return { ...base, note: null, deck: JSON.parse(raw) };
      } catch {
        throw new Error('Invalid deck JSON');
      }
    },
    service: (v) => questions.create(v),
    success: (saved) => ({ ok: true, id: saved?.id })
  })
};