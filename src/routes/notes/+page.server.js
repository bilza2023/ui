
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

export const prerender = false;

export async function load({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) throw error(400, 'filename is required');

  const row = await prisma.question.findUnique({
    where: { filename },
    select: {
      type: true,
      note: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      tcode: true,
      chapter: true,
      exercise: true,
      editedAt: true,
      createdAt: true
    }
  });

  if (!row) throw error(404, `Note "${filename}" not found`);
  if (row.type !== 'note' || !row.note) throw error(415, `Item "${filename}" is not a note`);

  return {
    meta: {
      filename,
      title: row.name ?? filename,
      description: row.description ?? '',
      status: row.status ?? null,
      tags: row.tags ?? [],
      tcode: row.tcode,
      chapter: row.chapter,
      exercise: row.exercise,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    html: row.note // trusted HTML you uploaded
  };
}
