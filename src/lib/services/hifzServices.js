// /src/lib/services/hifzServices.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Only these fields are editable from the UI
const EDITABLE_FIELDS = [
  'hookDescription',
  'hookImageUrl',
  'ayatIcon',
  'ayatIconDescription'
];

/**
 * Get a single Hifz row by hookId (1–6236).
 */
export async function getHifzByHookId(hookId) {
  if (!hookId) return null;
  return prisma.hifz.findUnique({
    where: { hookId: Number(hookId) }
  });
}

/**
 * Get a single Hifz row by (surah, ayah).
 */
export async function getHifzBySurahAyah(surah, ayah) {
  if (!surah || !ayah) return null;
  return prisma.hifz.findUnique({
    where: {
      surah_ayah: {
        surah: Number(surah),
        ayah: Number(ayah)
      }
    }
  });
}

/**
 * List all Hifz rows for a surah, ordered by ayah.
 * Useful for future summary views.
 */
export async function listHifzForSurah(surah) {
  if (!surah) return [];
  return prisma.hifz.findMany({
    where: { surah: Number(surah) },
    orderBy: { ayah: 'asc' }
  });
}

/**
 * Update editable Hifz fields by hookId.
 * Ignores any keys outside EDITABLE_FIELDS.
 */
export async function updateHifzByHookId(hookId, payload = {}) {
  if (!hookId) throw new Error('hookId is required');

  const data = {};
  for (const key of EDITABLE_FIELDS) {
    if (payload[key] !== undefined) {
      data[key] = payload[key];
    }
  }

  // Nothing to update – just return current row
  if (Object.keys(data).length === 0) {
    return getHifzByHookId(hookId);
  }

  return prisma.hifz.update({
    where: { hookId: Number(hookId) },
    data
  });
}
