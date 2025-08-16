// genManifest.js — generate ./manifest.json from ./svgs/**
// Works with Node (ESM). Puts relative paths (e.g., "ai.svg" or "triangles/isosceles.svg").

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const SVGS_DIR = path.join(__dirname, "svgs");
const OUT_FILE = path.join(__dirname, "manifest.json");

async function walk(dir, base = dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...await walk(full, base));
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".svg")) {
      // relative path under svgs/, use forward slashes for web
      out.push(path.relative(base, full).split(path.sep).join("/"));
    }
  }
  return out;
}

try {
  const files = await walk(SVGS_DIR);
  files.sort((a,b) => a.localeCompare(b));
  await fs.writeFile(OUT_FILE, JSON.stringify(files, null, 2), "utf8");
  console.log(`✅ Wrote ${OUT_FILE} with ${files.length} item(s).`);
} catch (err) {
  console.error("❌ Failed to generate manifest:", err.message);
  process.exit(1);
}
