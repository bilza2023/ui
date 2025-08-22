// src/lib/services/AppServices.js
import prisma  from '../server/prisma.js';

/** Get JSON setting by key; fallback to defaultValue when absent */
export async function getSetting(key, defaultValue = null) {
  const row = await prisma.appSetting.findUnique({ where: { key } });
  return row?.value ?? defaultValue;
}

/** Create or update JSON setting (idempotent) */
export async function setSetting(key, value) {
  const row = await prisma.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });
  return { key: row.key, value: row.value, updatedAt: row.updatedAt };
}

/** Remove a setting by key (no-throw convenience) */
export async function deleteSetting(key) {
  try {
    await prisma.appSetting.delete({ where: { key } });
    return true;
  } catch {
    return false;
  }
}

/** List all settings (safe select) */
export async function listSettings() {
  return prisma.appSetting.findMany({
    orderBy: { key: 'asc' },
    select: { key: true, value: true, updatedAt: true }
  });
}

/** Helpers for common keys (optional, keeps call-sites clean) */
export const AppKeys = {
  INDEX_DATA: 'index_data',
  THEME: 'theme',
  FEATURE_FLAGS: 'feature_flags'
};

export async function getIndexData(defaultValue = { totals: { all: 0, decks: 0, notes: 0 }, tcodes: [], latest: [] }) {
  return getSetting(AppKeys.INDEX_DATA, defaultValue);
}

export async function setIndexData(payload) {
  return setSetting(AppKeys.INDEX_DATA, payload);
}
