// POST /api/auth/register
import { json } from '@sveltejs/kit';
import { register as svcRegister, login as svcLogin } from '$lib/services/loginServices.js';

export async function POST({ request, cookies }) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return json({ error: 'email and password required' }, { status: 400 });

    await svcRegister(email, password);
    const { token, user } = await svcLogin(email, password);

    cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return json({ ok: true, token, user });
  } catch (err) {
    return json({ error: 'register failed', detail: String(err?.message ?? err) }, { status: 400 });
  }
}
