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
      // identity + relations
      // slug:       R.str('slug', { required: true }),
      tcodeId:    R.intId('tcodeId', { required: true }),
      chapterId:  R.intId('chapterId', { required: true }),
      exerciseId: R.intId('exerciseId', { required: true }),

      // metadata
      name:        R.str('name', { required: true }),
      description: R.str('description', { required: false }),
      thumbnail:   R.str('thumbnail', { required: false }),
      status:      R.$enum('status', ['draft','ready','published','archived'], { required: true }),
      type:        R.$enum('type', ['note','deck'], { required: true })
    },
    prepare: (v) => ({
      // slug: v.slug.trim(),
      tcodeId: v.tcodeId,
      chapterId: v.chapterId,
      exerciseId: v.exerciseId,
      name: v.name.trim(),
      description: v.description ?? '',
      thumbnail: v.thumbnail ?? '',
      status: v.status,
      type: v.type
    }),
    service: (v) => questions.create(v),
    success: (saved) => ({ ok: true, id: saved?.id })
  })
};
