// Admin: Questions index — ListTable data + delete action (ID-based)
import { questions } from '$lib/services/questionServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load() {
  const rows = await questions.list({ includePayload: false, limit: 500 });
 
  ///-- This is reconcilation of incomming data with page format
  const items = rows.map((r) => ({
    id: r.id,
    name: r.name || '(untitled)',
    type: r.type,
    tcode: String(r.tcodeId ?? ''),
    chEx: `${r.chapterId ? `Ch ${r.chapterId}` : '—'}${r.exerciseId ? ` · Ex ${r.exerciseId}` : ''}`,
    status: r.status || 'draft',
    editedAt: r.editedAt || r.createdAt || null,
    editedAtIso: r.editedAt ? new Date(r.editedAt).toISOString().slice(0, 10) : '',
    thumbnail: r.thumbnail || ''
  }));
  

  return { items };
}

export const actions = {
  delete: makeAction({
    spec: { id: R.intId('id', { required: true }) },
    service: ({ id }) => questions.delete(id),
    success: () => ({ ok: true })
  })
};
