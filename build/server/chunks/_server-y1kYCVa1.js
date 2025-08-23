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
async function GET({ url }) {
  try {
    const content_id = url.searchParams.get("content_id");
    if (!content_id) {
      return json({ ok: false, code: "E_MISSING_FIELD:content_id", message: "content_id required" }, { status: 400 });
    }
    const comments = await prisma.comments.findMany({
      where: { content_id },
      orderBy: { created_at: "asc" }
    });
    return json({ ok: true, comments }, { status: 200 });
  } catch (err) {
    console.error("[/api/comment GET] error:", err);
    return json({ ok: false, code: "E_INTERNAL", message: err?.message || "Internal error" }, { status: 500 });
  }
}
async function POST({ request }) {
  try {
    const { content_id, text } = await request.json().catch(() => ({}));
    if (!content_id || typeof content_id !== "string") {
      return json({ ok: false, code: "E_MISSING_FIELD:content_id", message: "content_id required" }, { status: 400 });
    }
    if (!text || typeof text !== "string") {
      return json({ ok: false, code: "E_MISSING_FIELD:text", message: "text required" }, { status: 400 });
    }
    const user_id = await getUserIdFromAuth(request);
    const comment = await prisma.comments.create({
      data: { user_id, content_id, text }
    });
    return json({ ok: true, comment }, { status: 201 });
  } catch (err) {
    console.error("[/api/comment POST] error:", err);
    const code = err?.message === "E_UNAUTHORIZED" || err?.code === "E_UNAUTHORIZED" ? "E_UNAUTHORIZED" : err?.code || "E_INTERNAL";
    const status = code === "E_UNAUTHORIZED" ? 401 : code?.startsWith?.("E_MISSING_FIELD") ? 400 : 500;
    return json({ ok: false, code, message: err?.message ?? "Internal error" }, { status });
  }
}

export { GET, POST };
//# sourceMappingURL=_server-y1kYCVa1.js.map
