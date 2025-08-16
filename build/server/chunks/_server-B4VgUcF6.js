import { j as json } from './index-DIHiwsVu.js';
import { v as verify } from './loginServices-D_o7Pg46.js';
import 'bcryptjs';
import 'jsonwebtoken';
import '@prisma/client';

function getTokenFrom(req, cookies, url) {
  const h = req.headers.get("authorization") || req.headers.get("Authorization");
  if (h?.startsWith("Bearer ")) return h.slice(7).trim();
  const fromCookie = cookies.get("token");
  if (fromCookie) return fromCookie;
  const fromQuery = url.searchParams.get("token");
  if (fromQuery) return fromQuery;
  return null;
}
async function GET({ request, cookies, url }) {
  try {
    const token = getTokenFrom(request, cookies, url);
    if (!token) return json({ error: "missing token" }, { status: 401 });
    const { payload, user } = await verify(token);
    return json({ ok: true, user, payload });
  } catch (err) {
    return json({ error: "invalid token", detail: String(err?.message ?? err) }, { status: 401 });
  }
}

export { GET };
//# sourceMappingURL=_server-B4VgUcF6.js.map
