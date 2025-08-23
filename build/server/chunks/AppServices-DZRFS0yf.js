import { p as prisma } from './prisma-CbVrW2fI.js';

async function getSetting(key, defaultValue = null) {
  const row = await prisma.appSetting.findUnique({ where: { key } });
  return row?.value ?? defaultValue;
}
async function setSetting(key, value) {
  const row = await prisma.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });
  return { key: row.key, value: row.value, updatedAt: row.updatedAt };
}

export { getSetting as g, setSetting as s };
//# sourceMappingURL=AppServices-DZRFS0yf.js.map
