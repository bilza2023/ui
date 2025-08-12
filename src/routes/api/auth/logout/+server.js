
import { json } from '@sveltejs/kit';
export async function POST({ cookies }) {
  cookies.set('token', '', {
    httpOnly: true, sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/', maxAge: 0
  });
  return json({ ok: true });
}
