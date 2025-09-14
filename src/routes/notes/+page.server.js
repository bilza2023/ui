// /src/routes/notes/+page.server.js
export const prerender = false;

import { error } from '@sveltejs/kit';
import { questions } from '$lib/services/questionServices.js';

export async function load({ url, setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=30' });

  const idParam = (url.searchParams.get('id') || '').trim();
  const id = Number(idParam);
  if (!idParam || !Number.isInteger(id)) throw error(400, 'id must be an integer');

  const row = await questions.getById(id);
  if (!row) throw error(404, `Note ${id} not found`);
  if (row.type !== 'note' || !row.note) throw error(415, `Item ${id} is not a note`);

  return {
    meta: {
      id: row.id,
      title: row.name ?? `Note ${row.id}`,
      description: row.description ?? '',
      status: row.status ?? null,
      tags: row.tags ?? [],
      tcodeId: row.tcodeId ?? null,
      chapterId: row.chapterId ?? null,
      exerciseId: row.exerciseId ?? null,
      thumbnail: row.thumbnail ?? null,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    html: row.note
  };
}
