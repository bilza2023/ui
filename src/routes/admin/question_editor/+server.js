// +server.js
import { json, error } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---- helpers
const ALLOWED_KEYS = new Set([
  "name",
  "description",
  "tags",       // CSV string or string[]
  "status",     // "draft" | "ready" | "hidden"
  "thumbnail",
  "sortOrder",  // number or null
  "timed"       // boolean
]);

function coerceUpdate(body) {
  const update = {};
  for (const [k, v] of Object.entries(body || {})) {
    if (!ALLOWED_KEYS.has(k)) continue;

    if (k === "tags") {
      // allow CSV string or array of strings
      if (typeof v === "string") {
        const arr = v.split(",").map(s => s.trim()).filter(Boolean);
        update.tags = arr.length ? arr : null;
      } else if (Array.isArray(v)) {
        const arr = v.map(s => String(s).trim()).filter(Boolean);
        update.tags = arr.length ? arr : null;
      } else if (v == null) {
        update.tags = null;
      }
      continue;
    }

    if (k === "sortOrder") {
      if (v === "" || v === null) { update.sortOrder = null; }
      else {
        const n = Number.parseInt(v, 10);
        update.sortOrder = Number.isFinite(n) ? n : null;
      }
      continue;
    }

    if (k === "timed") {
      update.timed = Boolean(v);
      continue;
    }

    // simple passthrough (strings)
    update[k] = v ?? null;
  }
  return update;
}

// ---- GET /admin/question_editor?filename=...
export async function GET({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) throw error(400, "Missing 'filename'.");

  const question = await prisma.question.findUnique({ where: { filename } });
  if (!question) throw error(404, "Not found");

  return json({ question });
}

// ---- PATCH /admin/question_editor?filename=...
export async function PATCH({ url, request }) {
  const filename = url.searchParams.get("filename");
  if (!filename) throw error(400, "Missing 'filename'.");

  // guard: never allow changing identity/payload/path here
  const body = await request.json().catch(() => ({}));

  // hard reject if someone tries to send forbidden keys
  const forbidden = ["filename","type","tcode","chapter","exercise","deck","note"];
  for (const k of forbidden) {
    if (k in body) throw error(400, `Field '${k}' is not editable here.`);
  }

  const data = coerceUpdate(body);

  try {
    const updated = await prisma.question.update({
      where: { filename },
      data
    });
    return json({ ok: true, question: updated });
  } catch (e) {
    // if not found / other errors
    throw error(500, String(e?.message || e));
  }
}
