
// /scripts/seedHifz.js
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const prisma = new PrismaClient();

// ESM __dirname shim
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Load quran.json ----------
function loadQuranJson() {
  const quranPath = path.resolve(__dirname, '../src/lib/quran/quran.json');
  const raw = fs.readFileSync(quranPath, 'utf8');
  return JSON.parse(raw);
}

// Helpers (same spirit as +page.svelte)
const toNum = (v) => (v == null ? null : Number(v));

function getAllSurahs(quran) {
  if (Array.isArray(quran)) return quran;
  if (Array.isArray(quran?.surahs)) return quran.surahs;
  if (Array.isArray(quran?.data)) return quran.data;
  throw new Error('Could not determine surah array shape in quran.json');
}

function getSurahNumber(s) {
  return toNum(s?.number ?? s?.id ?? s?.surah_number ?? s?.surah);
}

function getAyahsArray(s) {
  return s?.ayahs ?? s?.verses ?? s?.ayah ?? [];
}

// ---------- Build seed data ----------
function buildHifzRows(quran) {
  const surahs = getAllSurahs(quran).slice(); // shallow copy
  surahs.sort((a, b) => getSurahNumber(a) - getSurahNumber(b));

  const rows = [];
  let hookId = 1;

  for (const s of surahs) {
    const surahNum = getSurahNumber(s);
    if (!Number.isFinite(surahNum)) {
      throw new Error('Surah without numeric number found');
    }
    const ayahs = getAyahsArray(s);
    if (!Array.isArray(ayahs)) continue;

    for (let i = 0; i < ayahs.length; i++) {
      const ayahNumber = i + 1;
      rows.push({
        hookId,
        surah: surahNum,
        ayah: ayahNumber,
        hookDescription: null,
        hookImageUrl: null,
        ayatIcon: null,
        ayatIconDescription: null
      });
      hookId++;
    }
  }

  console.log(`Prepared ${rows.length} Hifz rows (hookId 1..${rows.length}).`);
  return rows;
}

// ---------- Main ----------
async function main() {
  const quran = loadQuranJson();
  const rows = buildHifzRows(quran);

  // Optional sanity check: expect 6236 entries
  if (rows.length !== 6236) {
    console.warn(
      `WARNING: Expected 6236 ayat, but built ${rows.length}. Check quran.json structure.`
    );
  }

  console.log('Clearing existing Hifz table...');
  await prisma.hifz.deleteMany();

  console.log('Inserting Hifz seed data...');
  await prisma.hifz.createMany({
    data: rows
  });

  console.log('✅ Hifz seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
