import { f as fail, j as json } from './index-BcL6zcUs.js';
import { mkdir, writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import { join, basename } from 'path';
import { d as private_env } from './shared-server-DIsQ43MR.js';

const ASSETS_ROOT = private_env.ASSETS_DIR || join(process.cwd(), "assets");
const ALLOWED = {
  images: [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"],
  sounds: [".mp3", ".wav", ".ogg", ".opus"]
};
async function POST({ request }) {
  const form = await request.formData();
  const target = String(form.get("target") || "");
  if (!["images", "sounds"].includes(target)) {
    return fail(400, { ok: false, error: "Invalid target" });
  }
  const files = form.getAll("files").filter(Boolean);
  if (!files.length) return fail(400, { ok: false, error: "No files" });
  const dir = join(ASSETS_ROOT, target);
  await mkdir(dir, { recursive: true });
  const results = [];
  for (const file of files) {
    const name = sanitizeName(file.name || "upload");
    const ext = (name.match(/\.[^.]+$/)?.[0] || "").toLowerCase();
    if (!ALLOWED[target].includes(ext)) {
      results.push({ name, ok: false, error: `Disallowed extension ${ext}` });
      continue;
    }
    const finalName = await dedupe(dir, name);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, finalName), buf);
    results.push({
      ok: true,
      name: finalName,
      // public URL your app will use:
      url: `/media/${target}/${finalName}`
    });
  }
  return json({ ok: true, count: results.length, results });
}
function sanitizeName(n) {
  n = basename(n).trim().toLowerCase();
  n = n.replace(/\s+/g, "-").replace(/[^a-z0-9._-]/g, "");
  return n || "file";
}
async function dedupe(dir, name) {
  const [base, ext = ""] = splitExt(name);
  let attempt = name, i = 1;
  while (await exists(join(dir, attempt))) {
    attempt = `${base}-${i}${ext}`;
    i++;
  }
  return attempt;
}
function splitExt(n) {
  const i = n.lastIndexOf(".");
  return i === -1 ? [n, ""] : [n.slice(0, i), n.slice(i)];
}
async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export { POST };
//# sourceMappingURL=_server-IlCHyN2d.js.map
