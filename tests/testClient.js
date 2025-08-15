// Small helper client used by all tests
const BASE = process.env.TEST_BASE_URL || 'http://localhost:5173';

export async function apiPost(path, body, token = null) {
  const headers = { 'content-type': 'application/json' };
  if (token) headers['authorization'] = `Bearer ${token}`;
  const res = await fetch(BASE + path, { method: 'POST', headers, body: JSON.stringify(body) });
  let data = {};
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

export async function apiGet(path, token = null) {
  const headers = {};
  if (token) headers['authorization'] = `Bearer ${token}`;
  const res = await fetch(BASE + path, { headers });
  let data = {};
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

export function uniqId(prefix = 't') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}
