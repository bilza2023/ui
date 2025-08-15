import { describe, it, expect } from 'vitest';
import { apiPost, apiGet, uniqId } from './testClient';

describe('Comment API: POST add & GET list', () => {
  const email = `comment_${uniqId()}@example.com`;
  const password = 'Passw0rd!';
  let token = null;
  const contentId = `content_${uniqId()}`;

  it('registers and logs in (setup)', async () => {
    let r = await apiPost('/api/auth/register', { email, password });
    expect([200,201]).toContain(r.status);
    expect(r.data?.ok).toBe(true);

    r = await apiPost('/api/auth/login', { email, password });
    expect(r.status).toBe(200);
    expect(r.data?.ok).toBe(true);
    token = r.data.token;
    expect(token).toBeTruthy();
  });

  it('starts with empty list', async () => {
    const r = await apiGet(`/api/comment?content_id=${contentId}`);
    expect(r.status).toBe(200);
    expect(r.data?.ok).toBe(true);
    expect(Array.isArray(r.data?.comments)).toBe(true);
    expect(r.data.comments.length).toBe(0);
  });

  it('posts a comment', async () => {
    const text = `Nice note! ${uniqId()}`;
    const r = await apiPost('/api/comment', { content_id: contentId, text }, token);
    expect([200,201]).toContain(r.status);
    expect(r.data?.ok).toBe(true);
    expect(r.data?.comment?.id).toBeTruthy();
    expect(r.data?.comment?.text).toBe(text);
  });

  it('lists comments and includes the posted one', async () => {
    const r = await apiGet(`/api/comment?content_id=${contentId}`);
    expect(r.status).toBe(200);
    expect(r.data?.ok).toBe(true);
    const list = r.data.comments || [];
    expect(list.length).toBeGreaterThan(0);
    const found = list.some(c => typeof c.id === 'string' && typeof c.text === 'string');
    expect(found).toBe(true);
  });
});
