import { describe, it, expect } from 'vitest';
import { apiPost, apiGet, uniqId } from './testClient';

describe('Like API: GET/POST toggle', () => {
  const email = `like_${uniqId()}@example.com`;
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

  it('initially not liked', async () => {
    const r = await apiGet(`/api/like?content_id=${contentId}`, token);
    expect(r.status).toBe(200);
    expect(r.data?.ok).toBe(true);
    expect(r.data?.liked).toBe(false);
  });

  it('likes and verifies', async () => {
    let r = await apiPost('/api/like', { content_id: contentId }, token);
    expect(r.status).toBe(200);
    expect(r.data?.ok).toBe(true);
    expect(r.data?.liked).toBe(true);

    r = await apiGet(`/api/like?content_id=${contentId}`, token);
    expect(r.status).toBe(200);
    expect(r.data?.liked).toBe(true);
  });

  it('unlikes and verifies', async () => {
    let r = await apiPost('/api/like', { content_id: contentId }, token);
    expect(r.status).toBe(200);
    expect(r.data?.ok).toBe(true);
    expect(r.data?.liked).toBe(false);

    r = await apiGet(`/api/like?content_id=${contentId}`, token);
    expect(r.status).toBe(200);
    expect(r.data?.liked).toBe(false);
  });
});
