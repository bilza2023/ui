
// src/lib/services/studentServices.js
import { browser } from '$app/environment';

/**
 * Send any interaction to the backend workflow for its category.
 * @param {Object} args
 * @param {string} args.category   - workflow name (e.g. "contentComment", "contentReaction", "forgotPassword")
 * @param {string} args.anchorId   - UI channel/component ID (required)
 * @param {string=} args.contentId - subject filename when content-bound (optional)
 * @param {Object=} args.payload   - category-specific JSON payload (optional)
 * @param {Object=} opts
 * @param {string=} opts.token     - override bearer token (optional)
 * @returns {Promise<{ok:true,id:string,created_at:string}>}
 */
export async function interaction(
  { category, anchorId, contentId = null, payload = {} },
  { token } = {}
) {
  if (!category || typeof category !== 'string') throw new Error('category required');
  if (!anchorId || typeof anchorId !== 'string') throw new Error('anchorId required');

  const url = `/api/interactions/${encodeURIComponent(category)}`;
  const body = { anchorId, ...(contentId ? { contentId } : {}), payload };

  const headers = { 'Content-Type': 'application/json' };
  const bearer = token ?? (browser ? localStorage.getItem('token') : null);
  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  let data = null;
  try { data = await res.json(); } catch (_) {}

  if (!res.ok || !data?.ok) {
    const msg = data?.reason || data?.error || `HTTP ${res.status}`;
    const err = new Error(`interaction failed: ${msg}`);
    err.status = res.status;
    err.details = data;
    throw err;
  }
  return data; // { ok:true, id, created_at }
}
