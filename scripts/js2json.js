
// ui/scripts/js2json.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import Deckbuilder from "../src/lib/deckbuilder/Deckbuilder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI args
const srcFile = process.argv[2];
if (!srcFile) {
  console.error("Usage: node scripts/js2json.js path/to/deck.js");
  process.exit(1);
}

// 1️⃣ Resolve path and ensure file exists
const absPath = path.resolve(srcFile);
if (!fs.existsSync(absPath)) {
  console.error("File not found:", absPath);
  process.exit(1);
}

// 2️⃣ Import deck module dynamically
const mod = await import(pathToFileURL(absPath));
if (typeof mod.defineDeck !== "function") {
  console.error("No defineDeck() found in", srcFile);
  process.exit(1);
}

// 3️⃣ Build the deck
const b = new Deckbuilder();
mod.defineDeck(b);
const built = b.build();

// 4️⃣ Write .json file next to original
const outFile = absPath.replace(/\.js$/, ".json");
fs.writeFileSync(outFile, JSON.stringify(built, null, 2), "utf8");

console.log(`✅ Converted to ${outFile}`);
