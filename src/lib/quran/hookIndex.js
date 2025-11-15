
// /src/lib/quran/hookIndex.js
// Hard-coded Quran hook index
// hookId = absolute ayah index from 1 → 6236

export const MAX_HOOK = 6236;

// Once-calculated, never-changing surah metadata.
// Each entry tells you where a surah starts in hook space and how many ayahs it has.
export const surahMeta = [
  null, // index 0 unused; surahs are 1-based
  { surah: 1, startHook: 1, ayahs: 7 },
  { surah: 2, startHook: 8, ayahs: 286 },
  { surah: 3, startHook: 294, ayahs: 200 },
  { surah: 4, startHook: 494, ayahs: 176 },
  { surah: 5, startHook: 670, ayahs: 120 },
  { surah: 6, startHook: 790, ayahs: 165 },
  { surah: 7, startHook: 955, ayahs: 206 },
  { surah: 8, startHook: 1161, ayahs: 75 },
  { surah: 9, startHook: 1236, ayahs: 129 },
  { surah: 10, startHook: 1365, ayahs: 109 },
  { surah: 11, startHook: 1474, ayahs: 123 },
  { surah: 12, startHook: 1597, ayahs: 111 },
  { surah: 13, startHook: 1708, ayahs: 43 },
  { surah: 14, startHook: 1751, ayahs: 52 },
  { surah: 15, startHook: 1803, ayahs: 99 },
  { surah: 16, startHook: 1902, ayahs: 128 },
  { surah: 17, startHook: 2030, ayahs: 111 },
  { surah: 18, startHook: 2141, ayahs: 110 },
  { surah: 19, startHook: 2251, ayahs: 98 },
  { surah: 20, startHook: 2349, ayahs: 135 },
  { surah: 21, startHook: 2484, ayahs: 112 },
  { surah: 22, startHook: 2596, ayahs: 78 },
  { surah: 23, startHook: 2674, ayahs: 118 },
  { surah: 24, startHook: 2792, ayahs: 64 },
  { surah: 25, startHook: 2856, ayahs: 77 },
  { surah: 26, startHook: 2933, ayahs: 227 },
  { surah: 27, startHook: 3160, ayahs: 93 },
  { surah: 28, startHook: 3253, ayahs: 88 },
  { surah: 29, startHook: 3341, ayahs: 69 },
  { surah: 30, startHook: 3410, ayahs: 60 },
  { surah: 31, startHook: 3470, ayahs: 34 },
  { surah: 32, startHook: 3504, ayahs: 30 },
  { surah: 33, startHook: 3534, ayahs: 73 },
  { surah: 34, startHook: 3607, ayahs: 54 },
  { surah: 35, startHook: 3661, ayahs: 45 },
  { surah: 36, startHook: 3706, ayahs: 83 },
  { surah: 37, startHook: 3789, ayahs: 182 },
  { surah: 38, startHook: 3971, ayahs: 88 },
  { surah: 39, startHook: 4059, ayahs: 75 },
  { surah: 40, startHook: 4134, ayahs: 85 },
  { surah: 41, startHook: 4219, ayahs: 54 },
  { surah: 42, startHook: 4273, ayahs: 53 },
  { surah: 43, startHook: 4326, ayahs: 89 },
  { surah: 44, startHook: 4415, ayahs: 59 },
  { surah: 45, startHook: 4474, ayahs: 37 },
  { surah: 46, startHook: 4511, ayahs: 35 },
  { surah: 47, startHook: 4546, ayahs: 38 },
  { surah: 48, startHook: 4584, ayahs: 29 },
  { surah: 49, startHook: 4613, ayahs: 18 },
  { surah: 50, startHook: 4631, ayahs: 45 },
  { surah: 51, startHook: 4676, ayahs: 60 },
  { surah: 52, startHook: 4736, ayahs: 49 },
  { surah: 53, startHook: 4785, ayahs: 62 },
  { surah: 54, startHook: 4847, ayahs: 55 },
  { surah: 55, startHook: 4902, ayahs: 78 },
  { surah: 56, startHook: 4980, ayahs: 96 },
  { surah: 57, startHook: 5076, ayahs: 29 },
  { surah: 58, startHook: 5105, ayahs: 22 },
  { surah: 59, startHook: 5127, ayahs: 24 },
  { surah: 60, startHook: 5151, ayahs: 13 },
  { surah: 61, startHook: 5164, ayahs: 14 },
  { surah: 62, startHook: 5178, ayahs: 11 },
  { surah: 63, startHook: 5189, ayahs: 11 },
  { surah: 64, startHook: 5200, ayahs: 18 },
  { surah: 65, startHook: 5218, ayahs: 12 },
  { surah: 66, startHook: 5230, ayahs: 12 },
  { surah: 67, startHook: 5242, ayahs: 30 },
  { surah: 68, startHook: 5272, ayahs: 52 },
  { surah: 69, startHook: 5324, ayahs: 52 },
  { surah: 70, startHook: 5376, ayahs: 44 },
  { surah: 71, startHook: 5420, ayahs: 28 },
  { surah: 72, startHook: 5448, ayahs: 28 },
  { surah: 73, startHook: 5476, ayahs: 20 },
  { surah: 74, startHook: 5496, ayahs: 56 },
  { surah: 75, startHook: 5552, ayahs: 40 },
  { surah: 76, startHook: 5592, ayahs: 31 },
  { surah: 77, startHook: 5623, ayahs: 50 },
  { surah: 78, startHook: 5673, ayahs: 40 },
  { surah: 79, startHook: 5713, ayahs: 46 },
  { surah: 80, startHook: 5759, ayahs: 42 },
  { surah: 81, startHook: 5801, ayahs: 29 },
  { surah: 82, startHook: 5830, ayahs: 19 },
  { surah: 83, startHook: 5849, ayahs: 36 },
  { surah: 84, startHook: 5885, ayahs: 25 },
  { surah: 85, startHook: 5910, ayahs: 22 },
  { surah: 86, startHook: 5932, ayahs: 17 },
  { surah: 87, startHook: 5949, ayahs: 19 },
  { surah: 88, startHook: 5968, ayahs: 26 },
  { surah: 89, startHook: 5994, ayahs: 30 },
  { surah: 90, startHook: 6024, ayahs: 20 },
  { surah: 91, startHook: 6044, ayahs: 15 },
  { surah: 92, startHook: 6059, ayahs: 21 },
  { surah: 93, startHook: 6080, ayahs: 11 },
  { surah: 94, startHook: 6091, ayahs: 8 },
  { surah: 95, startHook: 6099, ayahs: 8 },
  { surah: 96, startHook: 6107, ayahs: 19 },
  { surah: 97, startHook: 6126, ayahs: 5 },
  { surah: 98, startHook: 6131, ayahs: 8 },
  { surah: 99, startHook: 6139, ayahs: 8 },
  { surah: 100, startHook: 6147, ayahs: 11 },
  { surah: 101, startHook: 6158, ayahs: 11 },
  { surah: 102, startHook: 6169, ayahs: 8 },
  { surah: 103, startHook: 6177, ayahs: 3 },
  { surah: 104, startHook: 6180, ayahs: 9 },
  { surah: 105, startHook: 6189, ayahs: 5 },
  { surah: 106, startHook: 6194, ayahs: 4 },
  { surah: 107, startHook: 6198, ayahs: 7 },
  { surah: 108, startHook: 6205, ayahs: 3 },
  { surah: 109, startHook: 6208, ayahs: 6 },
  { surah: 110, startHook: 6214, ayahs: 3 },
  { surah: 111, startHook: 6217, ayahs: 5 },
  { surah: 112, startHook: 6222, ayahs: 4 },
  { surah: 113, startHook: 6226, ayahs: 5 },
  { surah: 114, startHook: 6231, ayahs: 6 },
];

// Convenience: get start and end hooks for a surah
export function getSurahStartHook(surah) {
  const s = Number(surah);
  const meta = surahMeta[s];
  if (!meta) return null;
  return meta.startHook;
}

export function getSurahEndHook(surah) {
  const s = Number(surah);
  const meta = surahMeta[s];
  if (!meta) return null;
  return meta.startHook + meta.ayahs - 1;
}

// ref → hook
// Accepts (surah, ayah) OR "surah:ayah" string.
export function refToHook(surahOrRef, maybeAyah) {
  let surah, ayah;

  if (typeof surahOrRef === 'string' && surahOrRef.includes(':')) {
    const [s, a] = surahOrRef.split(':');
    surah = Number(s);
    ayah = Number(a);
  } else {
    surah = Number(surahOrRef);
    ayah = Number(maybeAyah);
  }

  if (!Number.isFinite(surah) || !Number.isFinite(ayah)) return null;

  const meta = surahMeta[surah];
  if (!meta) return null;
  if (ayah < 1 || ayah > meta.ayahs) return null;

  return meta.startHook + (ayah - 1);
}

// hook → ref
// Returns an object: { surah, ayah, ref }
export function hookToRef(hookId) {
  const h = Number(hookId);
  if (!Number.isFinite(h) || h < 1 || h > MAX_HOOK) return null;

  // Linear scan over 114 surahs — tiny, effectively constant time
  for (let i = 1; i < surahMeta.length; i++) {
    const meta = surahMeta[i];
    if (!meta) continue;
    const start = meta.startHook;
    const end = meta.startHook + meta.ayahs - 1;
    if (h >= start && h <= end) {
      const ayah = h - start + 1;
      return {
        surah: meta.surah,
        ayah,
        ref: `${meta.surah}:${ayah}`,
      };
    }
  }

  return null;
}
