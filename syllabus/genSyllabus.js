// scripts/genSyllabus.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { syllabus } from './syllabus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../static/data/syllabus');
await fs.mkdir(outputDir, { recursive: true });

// write per-tcode files
for (const tcode of syllabus) {
  const filePath = path.join(outputDir, `${tcode.tcodeName}.json`);
  await fs.writeFile(filePath, JSON.stringify(tcode, null, 2), 'utf8');
  console.log(`✅ Wrote ${filePath}`);
}

// write subjects.json (tcodeName, description, image)
const subjects = syllabus.map(({ tcodeName, description, image }) => ({
  tcodeName, description, image
}));
await fs.writeFile(path.join(outputDir, 'subjects.json'), JSON.stringify(subjects, null, 2), 'utf8');
console.log(`✅ Wrote subjects.json`);

// optional: write combined syllabus.json for compatibility
const allFile = path.resolve(__dirname, '../static/data/syllabus.json');
await fs.writeFile(allFile, JSON.stringify(syllabus, null, 2), 'utf8');
console.log(`✅ Wrote combined syllabus.json`);
