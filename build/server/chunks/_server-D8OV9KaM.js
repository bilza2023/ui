import { j as json } from './index-BcL6zcUs.js';

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
//# sourceMappingURL=_server-D8OV9KaM.js.map
