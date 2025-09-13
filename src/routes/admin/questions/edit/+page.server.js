// Edit Question — loader + formKit action (single-table)
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { questions } from '$lib/services/questionServices.js';

export async function load({ url }) {
  const questionId = url.searchParams.get('questionId') || '';
  const q = questionId ? await questions.getById(questionId) : null;

  // Build textarea seed
  const noteOrDeck =
    q?.type === 'note'
      ? (q?.note ?? '')
      : q?.deck
        ? JSON.stringify(q.deck, null, 2)
        : '';

  return {
    questionId,
    initial: q
      ? {
          questionId: q.id,
          name: q.name || '',
          description: q.description || '',
          thumbnail: q.thumbnail || '',
          status: q.status || 'draft',
          type: q.type || 'note',
          noteOrDeck
        }
      : {
          questionId: '',
          name: '',
          description: '',
          thumbnail: '',
          status: 'draft',
          type: 'note',
          noteOrDeck: ''
        }
  };
}

export const actions = {
  save: makeAction({
    spec: {
      questionId: R.intId('questionId', { required: true }),
      name:       R.str('name', { required: true }),
      description:R.str('description', { required: false }),
      thumbnail:  R.str('thumbnail', { required: false }),
      status:     R.$enum('status', ['draft','ready','published','archived'], { required: true }),
      type:       R.$enum('type', ['note','deck'], { required: true }),
      noteOrDeck: R.str('noteOrDeck', { required: false })
    },
    prepare: (v) => {
      const base = {
        name: (v.name || '').trim(),
        description: v.description ?? '',
        thumbnail: v.thumbnail ?? '',
        status: v.status,
        type: v.type
      };
      const raw = v.noteOrDeck?.trim() ?? '';

      if (v.type === 'note') {
        // set note, clear deck
        return { id: v.questionId, updates: { ...base, note: raw, deck: null } };
      }

      // type === 'deck'
      if (!raw) {
        return { id: v.questionId, updates: { ...base, deck: null, note: null } };
      }
      try {
        const deck = JSON.parse(raw);
        return { id: v.questionId, updates: { ...base, deck, note: null } };
      } catch {
        const e = new Error('Invalid deck JSON');
        e.code = 'VALIDATION';
        throw e;
      }
    },
    service: ({ id, updates }) => questions.update(id, updates),
    success: (saved) => ({ ok: true, id: saved?.id })
  })
};
