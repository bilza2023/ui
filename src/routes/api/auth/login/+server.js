// /src/routes/api/auth/login/+server.js
import { json } from '@sveltejs/kit';
import { taleemServices as svc } from '$lib/taleemServices';

export async function POST({ request, cookies }) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return json({ error: 'email and password required' }, { status: 400 });
    }

    const { token, user } = await svc.auth.login(email, password);

    cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return json({ ok: true, token, user });
  } catch (err) {
    return json({ error: 'login failed', detail: String(err?.message ?? err) }, { status: 401 });
  }
}
