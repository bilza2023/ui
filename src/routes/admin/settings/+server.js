import { json, fail } from '@sveltejs/kit';
import { mkdir, writeFile, access } from 'fs/promises';
import { constants as FS } from 'fs';
import { join, basename } from 'path';

// assets root (project-relative by default; override via env if you want)
import { env } from '$env/dynamic/private';
const ASSETS_ROOT = env.ASSETS_DIR || join(process.cwd(), 'assets'); // expects assets/images & assets/sounds

const ALLOWED = {
  images: ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'],
  sounds: ['.mp3', '.wav', '.ogg', '.opus']
};

export async function POST({ request }) {
  const form = await request.formData();
  const target = String(form.get('target') || '');
  if (!['images', 'sounds'].includes(target)) {
    return fail(400, { ok: false, error: 'Invalid target' });
  }

  const files = form.getAll('files').filter(Boolean);
  if (!files.length) return fail(400, { ok: false, error: 'No files' });

  const dir = join(ASSETS_ROOT, target);
  await mkdir(dir, { recursive: true });

  const results = [];
  for (const file of files) {
    const name = sanitizeName(file.name || 'upload');
    const ext = (name.match(/\.[^.]+$/)?.[0] || '').toLowerCase();
    if (!ALLOWED[target].includes(ext)) {
      return fail(415, { ok: false, error: `Disallowed extension ${ext}`, name });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const dest = join(dir, name);
    try {
      // HARD-FAIL if a file with this exact name already exists
      await writeFile(dest, buf, { flag: 'wx' });
    } catch (e) {
      if (e?.code === 'EEXIST') {
        return fail(409, { ok: false, error: `File exists: ${name}`, name });
      }
      throw e;
    }

    results.push({
      ok: true,
      name,
      url: `/media/${target}/${name}`
    });
  }

  return json({ ok: true, count: results.length, results });
}


// helpers
function sanitizeName(n) {
  n = basename(n).trim().toLowerCase();
  n = n.replace(/\s+/g, '-').replace(/[^a-z0-9._-]/g, '');
  return n || 'file';
}

async function dedupe(dir, name) {
  const [base, ext = ''] = splitExt(name);
  let attempt = name, i = 1;
  while (await exists(join(dir, attempt))) {
    attempt = `${base}-${i}${ext}`;
    i++;
  }
  return attempt;
}
function splitExt(n) {
  const i = n.lastIndexOf('.');
  return i === -1 ? [n, ''] : [n.slice(0, i), n.slice(i)];
}
async function exists(p) {
  try { await access(p, FS.F_OK); return true; } catch { return false; }
}
