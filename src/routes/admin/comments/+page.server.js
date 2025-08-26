// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import {
  listCommentsByStatus,
  answerComment,
  markCommentBad,
  setCommentStatus
} from '../../../lib/services/studentMessageServices.js';

export async function load({ url }) {
  const status = url.searchParams.get('status') || 'new';
  const comments = await listCommentsByStatus(status, { limit: 100 });
  return { status, comments };
}

export const actions = {
  respond: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') || '');
    const response = String(fd.get('response') || '').trim();
    if (!id || !response) return fail(400, { ok: false, error: 'Missing id/response' });
    await answerComment(id, response);
    return { ok: true };
  },

  bad: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') || '');
    if (!id) return fail(400, { ok: false, error: 'Missing id' });
    await markCommentBad(id);
    return { ok: true };
  },

  setStatus: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') || '');
    const status = String(fd.get('status') || '');
    if (!id || !status) return fail(400, { ok: false, error: 'Missing id/status' });
    await setCommentStatus(id, status);
    return { ok: true };
  }
};
