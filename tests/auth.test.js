
// ui/tests/auth.test.js
import { describe, it, expect } from 'vitest';
import { taleemServices as svc } from '../src/lib/taleemServices/index.js';

describe('auth: register → login → verify', () => {
  const makeUser = () => {
    const uniq = Math.random().toString(36).slice(2);
    return {
      email: `test+${uniq}@example.com`,
      pass:  'StrongPass123!' // ≥8 chars, no spaces
    };
  };

  it('registers a new user', async () => {
    const { email, pass } = makeUser();
    const user = await svc.auth.register(email, pass);
    expect(user).toMatchObject({ email });
    expect(user.id).toBeTruthy();
  });

  it('prevents duplicate registration for the same email', async () => {
    const { email, pass } = makeUser();
    await svc.auth.register(email, pass);
    await expect(svc.auth.register(email, pass)).rejects.toThrow(/already registered/i);
  });

  it('logs in with correct credentials and returns a JWT + user', async () => {
    const { email, pass } = makeUser();
    await svc.auth.register(email, pass);
    const { token, user } = await svc.auth.login(email, pass);
    expect(typeof token).toBe('string');
    expect(user.email).toBe(email);
  });

  it('rejects invalid credentials', async () => {
    const { email, pass } = makeUser();
    await svc.auth.register(email, pass);
    await expect(svc.auth.login(email, 'wrong-pass')).rejects.toThrow(/invalid credentials/i);
  });

  it('verifies a valid token and returns the user', async () => {
    const { email, pass } = makeUser();
    await svc.auth.register(email, pass);
    const { token } = await svc.auth.login(email, pass);
    const { user, payload } = await svc.auth.verify(token);
    expect(user.email).toBe(email);
    expect(payload.sub).toBe(user.id);
  });
});
