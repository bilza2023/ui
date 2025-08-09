// scripts/fixDeck.js
// Usage: node scripts/fixDeck.js input.json [output.json]
// Fix cues only: any out-of-window/invalid showAt -> 0. Keeps slide start/end.

import fs from "node:fs";
import path from "node:path";
import { setWrongShowAtToZero, checkTopLevelTimings } from "../src/lib/taleemDoctor/timings.js";

function normalizeQuestion(input, inFile) {
  if (Array.isArray(input)) {
    const name = path.parse(inFile).name;
    return { version: "deck-v1", name, deck: input };
  }
  // if legacy shape {slides: [...]}, lift to deck
  if (input && Array.isArray(input.slides) && !Array.isArray(input.deck)) {
    return { ...input, deck: input.slides };
  }
  return input;
}

const inFile = process.argv[2];
if (!inFile) {
  console.error("Usage: node scripts/fixDeck.js input.json [output.json]");
  process.exit(2);
}
const outArg = process.argv[3];
const outFile = outArg
  ? outArg
  : (() => {
      const { dir, name, ext } = path.parse(inFile);
      return path.join(dir, `${name}.fixed${ext || ".json"}`);
    })();

try {
  const raw = JSON.parse(fs.readFileSync(inFile, "utf8"));
  const q0 = normalizeQuestion(raw, inFile);

  const before = checkTopLevelTimings(q0);
  const q1 = setWrongShowAtToZero(q0);
  const after = checkTopLevelTimings(q1);

  fs.writeFileSync(outFile, JSON.stringify(q1, null, 2));
  console.log(`✔ Wrote ${outFile}`);
  if (before.length || after.length) {
    console.log(`Top-level timing diagnostics (before→after): ${before.length} → ${after.length}`);
  }
  process.exit(0);
} catch (e) {
  console.error("Failed:", e.message || e);
  process.exit(2);
}
