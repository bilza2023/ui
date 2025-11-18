// /scripts/importAyatIcons.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ------------------------------------------------------
// DATA FORMAT (YOU WILL PASTE YOUR ARRAY HERE)
// ------------------------------------------------------
// Example:
// const items = [
//   { surah: 2, ayah: 15, ayatIcon: "اللّٰه⚡", ayatIconDescription: "..." },
//   { surah: 2, ayah: 16, ayatIcon: "🧭🔦🎁", ayatIconDescription: "..." },
// ];
//
// Replace this array completely with your real data.
// ------------------------------------------------------
const items = [
  {
    surah: 2,
    ayah: 2,
    ayatIcon: "📘🔦🛡️",
    ayatIconDescription: "📘 Book without doubt; 🔦 guidance; 🛡️ protection for the God-conscious."
  },
  {
    surah: 2,
    ayah: 3,
    ayatIcon: "🌀🕋🍞",
    ayatIconDescription: "🌀 belief in the unseen; 🕋 establish prayer; 🍞 spend from what Allah gave."
  },
  {
    surah: 2,
    ayah: 4,
    ayatIcon: "📜📘🌈",
    ayatIconDescription: "📜 Qur’an revealed to you; 📘 previous scriptures; 🌈 certainty in the Hereafter."
  },
  {
    surah: 2,
    ayah: 5,
    ayatIcon: "🔦👑🏆",
    ayatIconDescription: "🔦 guidance; 👑 from their Lord; 🏆 final success."
  },
  {
    surah: 2,
    ayah: 6,
    ayatIcon: "🚫🕯️",
    ayatIconDescription: "🚫 denial blocks all warning; 🕯️ faith-light sealed off."
  },
  {
    surah: 2,
    ayah: 7,
    ayatIcon: "❤️🌑⚡",
    ayatIconDescription: "❤️ hearts sealed; 🌑 sight/hearing covered; ⚡ severe punishment."
  }
];


// ------------------------------------------------------
// MAIN EXECUTION
// ------------------------------------------------------
async function main() {
  if (!Array.isArray(items) || items.length === 0) {
    console.error("❌ No items provided. Please paste your data into `items` array.");
    return;
  }

  for (const row of items) {
    const { surah, ayah, ayatIcon, ayatIconDescription } = row;

    if (!surah || !ayah) {
      console.warn(`⚠️ Skipped item without valid surah/ayah:`, row);
      continue;
    }

    try {
      await prisma.hifz.update({
        where: { surah_ayah: { surah, ayah } }, // must have @@unique([surah, ayah]) in schema
        data: {
          ayatIcon: ayatIcon ?? "",
          ayatIconDescription: ayatIconDescription ?? ""
        }
      });

      console.log(`✔ Updated Surah ${surah}, Ayah ${ayah}`);
    } catch (err) {
      console.error(`❌ Failed for Surah ${surah}, Ayah ${ayah}:`, err.message);
    }
  }

  console.log("🎉 Import complete!");
}

main()
  .catch((err) => console.error("❌ Import failed:", err))
  .finally(() => prisma.$disconnect());
