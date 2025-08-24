// src/routes/media/[...path]/+server.js
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../../../../assets'); // adjust ../ as needed

// const ROOT = '/home/bilal-tariq/00--TALEEM===>Project/ui/assets'; // contains images/, sounds/

export async function GET({ params }) {
  try {
    const filePath = safeJoin(ROOT, params.path); // e.g. "images/box.webp"
    const info = await stat(filePath);
    if (!info.isFile()) return new Response('Not found', { status: 404 });

    return new Response(createReadStream(filePath), {
      headers: {
        'Content-Type': mime(filePath),
        'Content-Length': String(info.size),
        'Accept-Ranges': 'bytes',           // basic seek support
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

function safeJoin(root, reqPath) {
  const full = resolve(join(root, reqPath));
  if (!full.startsWith(resolve(root))) throw new Error('bad path');
  return full;
}
function mime(p) {
  const ext = p.split('.').pop()?.toLowerCase() || '';
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'svg') return 'image/svg+xml';
  if (ext === 'mp3') return 'audio/mpeg';
  if (ext === 'wav') return 'audio/wav';
  if (ext === 'ogg' || ext === 'oga' || ext === 'opus') return 'audio/ogg';
  return 'application/octet-stream';
}
