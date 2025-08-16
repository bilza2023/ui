import { j as json } from './index-DIHiwsVu.js';
import { l as login } from './loginServices-D_o7Pg46.js';
import 'bcryptjs';
import 'jsonwebtoken';
import '@prisma/client';

async function POST({ request, cookies }) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return json({ error: "email and password required" }, { status: 400 });
    const { token, user } = await login(email, password);
    cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });
    return json({ ok: true, token, user });
  } catch (err) {
    return json({ error: "login failed", detail: String(err?.message ?? err) }, { status: 401 });
  }
}

export { POST };
//# sourceMappingURL=_server-kc6jzMHp.js.map
