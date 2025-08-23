import { j as json } from './index-BcL6zcUs.js';
import { p as prisma } from './prisma-CbVrW2fI.js';
import { v as verify } from './loginServices-Bq3E1A-x.js';
import '@prisma/client';
import 'bcryptjs';
import 'jsonwebtoken';

async function getUserIdFromAuth(request) {
  const auth = request.headers.get("authorization") || "";
  if (!auth.toLowerCase().startsWith("bearer ")) throw new Error("E_UNAUTHORIZED");
  const token = auth.slice(7).trim();
  const { user } = await verify(token);
  const user_id = user?.id ?? null;
  if (!user_id) throw new Error("E_UNAUTHORIZED");
  return user_id;
}
async function GET({ url, request }) {
  try {
    const content_id = url.searchParams.get("content_id");
    if (!content_id) {
      return json({ ok: false, code: "E_MISSING_FIELD:content_id", message: "content_id required" }, { status: 400 });
    }
    const user_id = await getUserIdFromAuth(request);
    const existing = await prisma.likes.findUnique({
      where: { uniq_user_content_reaction: { user_id, content_id } }
    });
    return json({
      ok: true,
      liked: !!existing,
      user_id
    }, { status: 200 });
  } catch (err) {
    console.error("[/api/like GET] error:", err);
    const status = err?.code === "E_UNAUTHORIZED" ? 401 : 500;
    return json({ ok: false, code: err?.code || "E_INTERNAL", message: err?.message || "Internal error" }, { status });
  }
}
async function POST({ request }) {
  try {
    const { content_id } = await request.json().catch(() => ({}));
    if (!content_id || typeof content_id !== "string") {
      return json({ ok: false, code: "E_MISSING_FIELD:content_id", message: "content_id required" }, { status: 400 });
    }
    const user_id = await getUserIdFromAuth(request);
    const whereUnique = { uniq_user_content_reaction: { user_id, content_id } };
    const existing = await prisma.likes.findUnique({ where: whereUnique });
    if (existing) {
      await prisma.likes.delete({ where: whereUnique });
      return json({ ok: true, liked: false, user_id }, { status: 200 });
    }
    try {
      await prisma.likes.create({ data: { user_id, content_id } });
      return json({ ok: true, liked: true, user_id }, { status: 200 });
    } catch (err) {
      if (err?.code === "P2002") {
        return json({ ok: true, liked: true, user_id }, { status: 200 });
      }
      throw err;
    }
  } catch (err) {
    console.error("[/api/like] error:", err?.code || err?.message || err);
    const code = err?.message === "E_UNAUTHORIZED" || err?.code === "E_UNAUTHORIZED" ? "E_UNAUTHORIZED" : err?.code || "E_INTERNAL";
    const status = code === "E_UNAUTHORIZED" ? 401 : code?.startsWith?.("E_MISSING_FIELD") ? 400 : 500;
    return json({ ok: false, code, message: err?.message ?? "Internal error" }, { status });
  }
}

export { GET, POST };
//# sourceMappingURL=_server-BwxyCArL.js.map
