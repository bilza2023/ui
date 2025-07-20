
// File: scripts/genSyllabus.js  (ESM version)

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// --- 1. Resolve __dirname in ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// --- 2. Import the syllabus data (must be an ES export) ---
import {syllabus} from './syllabus/syllabus.js';

// --- 3. Build output paths ---
const outputDir  = path.resolve(__dirname, '../static/data');
const outputFile = path.join(outputDir, 'syllabus.json');

// --- 4. Ensure the directory exists & write the file ---
await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputFile, JSON.stringify(syllabus, null, 2), 'utf8');

console.log(`✅ syllabus.json written to ${outputFile}`);
