// /src/lib/quran/quranHelpers.js

// Normalize number-like values
export const toNum = (v) => (v == null ? null : Number(v));

// Extract surah list from any quran.json variant
export function getAllSurahs(quran) {
  if (Array.isArray(quran)) return quran;
  if (Array.isArray(quran?.surahs)) return quran.surahs;
  if (Array.isArray(quran?.data)) return quran.data;
  throw new Error("Unexpected Quran JSON structure: could not find surahs array");
}

// Surah number
export function getSurahNumber(s) {
  return toNum(s?.number ?? s?.id ?? s?.surah_number ?? s?.surah);
}

// Surah Arabic name
export function getSurahName(s) {
  return s?.name ?? s?.arabicName ?? s?.title ?? "";
}

// Ayah array inside a surah
export function getAyahsArray(s) {
  return s?.ayahs ?? s?.verses ?? s?.ayah ?? [];
}

// Ayah Arabic text
export function getAyahText(v) {
  return (
    v?.text ??
    v?.arabic ??
    v?.ar ??
    v?.content ??
    ""
  );
}

// Total ayahs in surah
export function totalAyahs(s) {
  const arr = getAyahsArray(s);
  return Array.isArray(arr) ? arr.length : 0;
}

// Get one ayah by index
export function ayahAt(s, idx) {
  const arr = getAyahsArray(s);
  return Array.isArray(arr) && arr[idx] ? arr[idx] : null;
}

// Find surah by number
export function findSurahByNumber(quran, num) {
  const all = getAllSurahs(quran);
  return all.find((s) => getSurahNumber(s) === toNum(num)) || null;
}

// Build translation index (Map: "surah:ayah" => text)
export function buildTranslationIndex(translationArray) {
  const map = new Map();
  if (!Array.isArray(translationArray)) return map;

  for (const row of translationArray) {
    const s = toNum(row.surah ?? row.Surah);
    const a = toNum(row.ayah ?? row.aya ?? row.verse ?? row.id);
    if (!Number.isFinite(s) || !Number.isFinite(a)) continue;

    const text =
      row.text ??
      row.translation ??
      row.en ??
      row.ur ??
      row.tr ??
      row.content ??
      "";

    map.set(`${s}:${a}`, text);
  }
  return map;
}
