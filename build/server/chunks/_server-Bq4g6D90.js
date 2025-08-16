import { j as json } from './index-DIHiwsVu.js';

async function POST({ cookies }) {
  cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return json({ ok: true });
}

export { POST };
//# sourceMappingURL=_server-Bq4g6D90.js.map
