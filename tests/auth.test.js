// ui/tests/auth.test.js
import { describe, it, expect } from 'vitest';
// ✅ Import the service directly (no barrels, no $lib)
import { register, login, verify } from '../src/lib/services/loginServices.js';

// Ensure JWT can sign/verify in test runs
process.env.JWT_SECRET ??= 'test-secret';

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
    const user = await register(email, pass);
    expect(user).toMatchObject({ email });
    expect(user.id).toBeTruthy();
  });

  it('prevents duplicate registration for the same email', async () => {
    const { email, pass } = makeUser();
    await register(email, pass);
    await expect(register(email, pass)).rejects.toThrow(/already registered/i);
  });

  it('logs in with correct credentials and returns a JWT + user', async () => {
    const { email, pass } = makeUser();
    await register(email, pass);
    const { token, user } = await login(email, pass);
    expect(typeof token).toBe('string');
    expect(user.email).toBe(email);
  });

  it('rejects invalid credentials', async () => {
    const { email, pass } = makeUser();
    await register(email, pass);
    await expect(login(email, 'wrong-pass')).rejects.toThrow(/invalid credentials/i);
  });

  it('verifies a valid token and returns the user', async () => {
    const { email, pass } = makeUser();
    await register(email, pass);
    const { token } = await login(email, pass);
    const { user, payload } = await verify(token);
    expect(user.email).toBe(email);
    expect(payload.sub).toBe(user.id);
  });
});
