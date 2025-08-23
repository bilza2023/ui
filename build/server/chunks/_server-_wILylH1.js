import { j as json } from './index-BcL6zcUs.js';
import { v as verify } from './loginServices-Bq3E1A-x.js';
import 'bcryptjs';
import 'jsonwebtoken';
import './prisma-CbVrW2fI.js';
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
//# sourceMappingURL=_server-_wILylH1.js.map
