import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { join, resolve } from 'path';

const ROOT = join(process.cwd(), "assets");
async function GET({ params }) {
  try {
    const filePath = safeJoin(ROOT, params.path);
    const info = await stat(filePath);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    return new Response(createReadStream(filePath), {
      headers: {
        "Content-Type": mime(filePath),
        "Content-Length": String(info.size),
        "Accept-Ranges": "bytes",
        // basic seek support
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
function safeJoin(root, reqPath) {
  const full = resolve(join(root, reqPath));
  if (!full.startsWith(resolve(root))) throw new Error("bad path");
  return full;
}
function mime(p) {
  const ext = p.split(".").pop()?.toLowerCase() || "";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "svg") return "image/svg+xml";
  if (ext === "mp3") return "audio/mpeg";
  if (ext === "wav") return "audio/wav";
  if (ext === "ogg" || ext === "oga" || ext === "opus") return "audio/ogg";
  return "application/octet-stream";
}

export { GET };
//# sourceMappingURL=_server-DpomzEMW.js.map
