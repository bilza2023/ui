



 import { describe, it, expect, beforeAll } from 'vitest';
 import { apiPost, apiGet, uniqId } from './testClient';

describe('Auth: register → login → verify', () => {
  const email = `user_${uniqId()}@example.com`;
  const password = 'Passw0rd!';
  let token = null;
  let userId = null;

  it('registers a new user', async () => {
    const { status, data } = await apiPost('/api/auth/register', { email, password });
    expect([200,201]).toContain(status);
    expect(data?.ok).toBe(true);
    expect(data?.user?.id).toBeTruthy();
    expect(data?.user?.email).toBe(email);
    userId = data.user.id;
  });

  it('logs in and returns a token', async () => {
    const { status, data } = await apiPost('/api/auth/login', { email, password });
    expect(status).toBe(200);
    expect(data?.ok).toBe(true);
    expect(data?.token).toBeTruthy();
    token = data.token;
  });

  it('verifies the token', async () => {
    const { status, data } = await apiGet('/api/auth/verify', token);
    expect(status).toBe(200);
    expect(data?.ok).toBe(true);
    expect(data?.user?.id).toBe(userId);
    expect(data?.user?.email).toBe(email);
  });
  
});
