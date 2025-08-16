import { j as json } from './index-DIHiwsVu.js';
import { v as verify, p as prisma } from './loginServices-D_o7Pg46.js';
import 'bcryptjs';
import 'jsonwebtoken';
import '@prisma/client';

function getBearer(request, cookies, url) {
  const h = request.headers.get("authorization") || request.headers.get("Authorization");
  if (h?.startsWith("Bearer ")) return h.slice(7).trim();
  return cookies.get("token") || url.searchParams.get("token") || null;
}
async function GET({ request, cookies, url }) {
  try {
    const token = getBearer(request, cookies, url);
    if (!token) return json({ ok: true, user: null, messages: [] });
    const { user } = await verify(token);
    if (!user) return json({ ok: true, user: null, messages: [] });
    const messages = await prisma.studentMessage.findMany({
      where: { user_id: user.id, read: false },
      orderBy: { created_at: "desc" },
      select: { id: true, category: true, message: true, created_at: true, read: true }
    });
    return json({ ok: true, user: { id: user.id, email: user.email }, messages });
  } catch {
    return json({ ok: true, user: null, messages: [] });
  }
}

export { GET };
//# sourceMappingURL=_server-CeObqerC.js.map
