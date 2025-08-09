// scripts/fixNfakeDeck.js
// Usage: node scripts/fixNfakeDeck.js input.json [output.json] [--per=5]
// Sets sequential slide timings (per seconds) and all showAt=0.

import fs from "node:fs";
import path from "node:path";
import { setDefaultTimings, checkTopLevelTimings } from "../src/lib/taleemDoctor/timings.js";

function normalizeQuestion(input, inFile) {
  if (Array.isArray(input)) {
    const name = path.parse(inFile).name;
    return { version: "deck-v1", name, deck: input };
  }
  if (input && Array.isArray(input.slides) && !Array.isArray(input.deck)) {
    return { ...input, deck: input.slides };
  }
  return input;
}

const inFile = process.argv[2];
if (!inFile) {
  console.error("Usage: node scripts/fixNfakeDeck.js input.json [output.json] [--per=5]");
  process.exit(2);
}

// parse args
let per = 5;
let outFile = null;
for (const a of process.argv.slice(3)) {
  if (a.startsWith("--per=")) per = Number(a.split("=")[1]) || 5;
  else if (a.endsWith(".json")) outFile = a;
}
if (!outFile) {
  const { dir, name, ext } = path.parse(inFile);
  outFile = path.join(dir, `${name}.fake${ext || ".json"}`);
}

try {
  const raw = JSON.parse(fs.readFileSync(inFile, "utf8"));
  const q0 = normalizeQuestion(raw, inFile);

  const before = checkTopLevelTimings(q0);
  const q1 = setDefaultTimings(q0, per);
  const after = checkTopLevelTimings(q1);

  fs.writeFileSync(outFile, JSON.stringify(q1, null, 2));
  console.log(`✔ Wrote ${outFile} (per-slide = ${per}s)`);
  if (before.length || after.length) {
    console.log(`Top-level timing diagnostics (before→after): ${before.length} → ${after.length}`);
  }
  process.exit(0);
} catch (e) {
  console.error("Failed:", e.message || e);
  process.exit(2);
}
