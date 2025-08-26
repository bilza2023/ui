// /src/routes/admin/question_editor/+server.js
import { json, error } from "@sveltejs/kit";
import { taleemServices as svc } from "$lib/taleemServices";

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

    update[k] = v ?? null;
  }
  return update;
}

// ---- GET /admin/question_editor?filename=...
export async function GET({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) throw error(400, "Missing 'filename'.");

  const question = await svc.questions.getByFilename(filename);
  if (!question) throw error(404, "Not found");

  return json({ question });
}

// ---- PATCH /admin/question_editor?filename=...
export async function PATCH({ url, request }) {
  const filename = url.searchParams.get("filename");
  if (!filename) throw error(400, "Missing 'filename'.");

  const body = await request.json().catch(() => ({}));

  // never allow changing identity/payload/path here
  const forbidden = ["filename","type","tcode","chapter","exercise","deck","note"];
  for (const k of forbidden) {
    if (k in body) throw error(400, `Field '${k}' is not editable here.`);
  }

  const data = coerceUpdate(body);

  try {
    const updated = await svc.questions.patchMeta(filename, data);
    return json({ ok: true, question: updated });
  } catch (e) {
    throw error(500, String(e?.message || e));
  }
}
