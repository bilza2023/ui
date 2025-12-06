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
    "surah": 67,
    "ayah": 1,
    "ayatIcon": "Hook 1 - door top left corner",
    "ayatIconDescription": "At the entrance, a giant glowing Kingly Hand (بِيَدِهِ) above the door holds a tiny shimmering kingdom (ٱلْمُلْك) in its palm; blessing-light pours down (تَبَارَكَ) and the hand pulses with absolute power (قَدِيرٌ)."
  },
  {
    "surah": 67,
    "ayah": 2,
    "ayatIcon": "Hook 2 - door top wood panel between left hook and right bolt",
    "ayatIconDescription": "On the wooden panel, a dark shadow for ٱلْمَوْتَ and a bright golden glow for ٱلْحَيَوٰة face each other; an examiner points between them saying لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا while the titles ٱلْعَزِيزُ and ٱلْغَفُورُ shine at the edge."
  },
  {
    "surah": 67,
    "ayah": 3,
    "ayatIcon": "Hook 3 - door right top corner above bolt",
    "ayatIconDescription": "A stacked cupboard with seven perfect shelves (سَبْعَ سَمَاوَاتٍ طِبَاقًا) sits above the bolt; a wide eye (مَا تَرَىٰ) inspects every layer, searching for any crack or mismatch, but finds no تَفَاوُت and no فُطُور in the creation of ٱلرَّحْمَٰن."
  },
  {
    "surah": 67,
    "ayah": 4,
    "ayatIcon": "Hook 4 - door top left side under bolt",
    "ayatIconDescription": "A single straining eye on the left wood leans across toward the same cupboard, sent back again and again (فَٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ); finally it droops, returning humiliated and tired (يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ)."
  },
  {
    "surah": 67,
    "ayah": 5,
    "ayatIcon": "Hook 5 - door left first hinge top",
    "ayatIconDescription": "Above the first hinge, the nearest sky is painted and studded with blazing lamps (مَصَابِيحَ); one lamp suddenly shoots like a fiery dart (رُجُومًا لِّلشَّيَاطِينِ) at a sneaking shadow, with a note of عَذَابُ ٱلسَّعِيرِ beneath."
  },
  {
    "surah": 67,
    "ayah": 6,
    "ayatIcon": "Hook 6 - door left first hinge bottom",
    "ayatIconDescription": "Below the hinge, a carved pit labelled جَهَنَّم glows red; figures who كَفَرُوا بِرَبِّهِم fall toward it, and the words وَبِئْسَ ٱلْمَصِيرُ mark this as a wretched destination."
  },
  {
    "surah": 67,
    "ayah": 7,
    "ayatIcon": "Hook 7 - door left second hinge top",
    "ayatIconDescription": "Through a slit above the second hinge you see inside جَهَنَّم; as a group is thrown in (إِذَا أُلْقُوا فِيهَا), the fire heaves and boils up, letting out a choking roar (سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ) that meets them."
  },
  {
    "surah": 67,
    "ayah": 8,
    "ayatIcon": "Hook 8 - door left second hinge bottom",
    "ayatIconDescription": "Below, the flames almost burst apart from rage (تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ); each time a group is hurled in, stern keepers (خَزَنَتُهَا) call out: أَلَمْ يَأْتِكُمْ نَذِيرٌ؟"
  },
  {
    "surah": 67,
    "ayah": 9,
    "ayatIcon": "Hook 9 - door left third hinge top",
    "ayatIconDescription": "On this hinge the condemned raise their hands and confess: بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا, and they recall their arrogant claim مَا نَزَّلَ ٱللَّهُ مِن شَيْءٍ while hearing the reply إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ."
  },
  {
    "surah": 67,
    "ayah": 10,
    "ayatIcon": "Hook 10 - door left third hinge bottom",
    "ayatIconDescription": "Below, the same people clutch their heads in regret, crying لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ, and admitting that otherwise مَا كُنَّا فِي أَصْحَابِ ٱلسَّعِيرِ."
  },
  {
    "surah": 67,
    "ayah": 11,
    "ayatIcon": "Hook 11 - door left fourth hinge top",
    "ayatIconDescription": "Above the fourth hinge a verdict-stamp reads فَٱعْتَرَفُوا بِذَنبِهِمْ; beneath it an arrow pushes them away with the words فَسُحْقًا لِأَصْحَابِ ٱلسَّعِيرِ — kept far from mercy."
  },
  {
    "surah": 67,
    "ayah": 12,
    "ayatIcon": "Hook 12 - door left fourth hinge bottom",
    "ayatIconDescription": "Below, a humble figure stands in a soft unseen glow, representing ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ; around him are written the gifts مَغْفِرَةٌ and أَجْرٌ كَبِيرٌ."
  },
  {
    "surah": 67,
    "ayah": 13,
    "ayatIcon": "Hook 13 - door right bottom stopper left side",
    "ayatIconDescription": "On the left side of the stopper, a small ear and tiny whispering mouth are drawn: أَسِرُّوا قَوْلَكُمْ أَوِ ٱجْهَرُوا بِهِ; a faint glow over the wood reminds that He is عَلِيمٌ بِذَاتِ ٱلصُّدُورِ, knowing what is in the chests."
  },
  {
    "surah": 67,
    "ayah": 14,
    "ayatIcon": "Hook 14 - door right bottom stopper top side",
    "ayatIconDescription": "On the top edge of the stopper a hand-print marks the Creator (مَنْ خَلَقَ) with the question أَلَا يَعْلَمُ مَنْ خَلَقَ; above it the names ٱللَّطِيفُ ٱلْخَبِيرُ shine as a thin, subtle light of perfect knowledge."
  },
  {
    "surah": 67,
    "ayah": 15,
    "ayatIcon": "Hook 15 - door right bottom stopper right side",
    "ayatIconDescription": "On the right side is a small patch of earth made ذَلُولًا, easy and low; a tiny foot walks along its ridges (فَٱمْشُوا فِي مَنَاكِبِهَا), ending at a basket labelled مِن رِّزْقِهِ with an arrow pointing back إِلَيْهِ ٱلنُّشُورُ."
  },
  {
    "surah": 67,
    "ayah": 16,
    "ayatIcon": "Hook 16 - door right bottom stopper bottom side",
    "ayatIconDescription": "On the bottom side a sky-window above shows مَن فِي ٱلسَّمَاءِ while the wood below cracks and tilts as if the ground might be swallowed (أَن يَخْسِفَ بِكُمُ ٱلْأَرْضَ), then shake violently (فَإِذَا هِيَ تَمُورُ)."
  },
  {
    "surah": 67,
    "ayah": 17,
    "ayatIcon": "Hook 17 - door handle left side",
    "ayatIconDescription": "On the left side of the door handle, stones whip through the air from a dark sky (أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا); a warning voice says فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ — you will soon know how My warning was."
  },
  {
    "surah": 67,
    "ayah": 18,
    "ayatIcon": "Hook 18 - door handle top side",
    "ayatIconDescription": "On the top of the handle, ghostly ruins of earlier nations who كَذَّبُوا مِن قَبْلُ are sketched; above them the words فَكَيْفَ كَانَ نَكِيرِ show how terrible Allah’s response and rejection was."
  },
  {
    "surah": 67,
    "ayah": 19,
    "ayatIcon": "Hook 19 - door handle right side",
    "ayatIconDescription": "On the right side of the handle, birds (طَيْر) are drawn high above, wings outstretched then folded (صَافَّاتٍ وَيَقْبِضْنَ); no visible support holds them — only ٱلرَّحْمَٰن keeps them up, with the reminder إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ."
  },
  {
    "surah": 67,
    "ayah": 20,
    "ayatIcon": "Hook 20 - door handle bottom side",
    "ayatIconDescription": "Below the handle, a tiny toy army (جُندٌ) boasts of protecting the door, but a vast unseen shade labelled ٱلرَّحْمَٰن hovers above; the line إِنِ ٱلْكَافِرُونَ إِلَّا فِي غُرُورٍ shows their imagined help is only self-delusion."
  },
  {
    "surah": 67,
    "ayah": 21,
    "ayatIcon": "Hook 21 - door middle dead center on wood",
    "ayatIconDescription": "In the center of the door an empty bowl and withered field show what happens if He holds back His provision (إِنْ أَمْسَكَ رِزْقَهُ); the question مَن يَرْزُقُكُم مِّن دُونِهِ hangs there while people persist in عُتُوٍّ وَنُفُورٍ."
  },
  {
    "surah": 67,
    "ayah": 22,
    "ayatIcon": "Hook 22 - floor in front of door left corner",
    "ayatIconDescription": "On the left corner of the floor, one man is drawn stumbling on his face, walking مُكِبًّا عَلَىٰ وَجْهِهِ, while beside him another figure stands upright on a bright straight line (يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ); the contrast asks who is better guided."
  },
  {
    "surah": 67,
    "ayah": 23,
    "ayatIcon": "Hook 23 - floor in front of door middle",
    "ayatIconDescription": "In front of the middle, figures have clear ears, eyes, and hearts labeled سَمْعًا, أَبْصَارًا, أَفْئِدَةً, with a caption هُوَ ٱلَّذِي أَنشَأَكُمْ; beneath it, in small writing, قَلِيلًا مَّا تَشْكُرُونَ shows how little thanks is given."
  },
  {
    "surah": 67,
    "ayah": 24,
    "ayatIcon": "Hook 24 - floor in front of door right corner",
    "ayatIconDescription": "On the right corner tile, tiny people are scattered across a map of earth, picturing هُوَ ٱلَّذِي ذَرَأَكُمْ فِي ٱلْأَرْضِ; an arrow gathers them back toward a single point marked إِلَيْهِ تُحْشَرُونَ."
  },
  {
    "surah": 67,
    "ayah": 25,
    "ayatIcon": "Hook 25 - floor in front of door left tile",
    "ayatIconDescription": "On the first left tile, mockers point at the door and ask مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَادِقِينَ; their speech bubble hangs casually as if nothing is serious."
  },
  {
    "surah": 67,
    "ayah": 26,
    "ayatIcon": "Hook 26 - floor in front of door middle tile",
    "ayatIconDescription": "On the middle tile, a scroll states إِنَّمَا ٱلْعِلْمُ عِندَ ٱللَّهِ, while a clear warner stands beside it saying إِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ — only a clear warner."
  },
  {
    "surah": 67,
    "ayah": 27,
    "ayatIcon": "Hook 27 - floor in front of door right tile",
    "ayatIconDescription": "On the right tile, faces of disbelievers twist in fear as something approaches from the distance; above them appears the line هَٰذَا ٱلَّذِي كُنتُم بِهِ تَدَّعُونَ — this is what you used to call for."
  },
  {
    "surah": 67,
    "ayah": 28,
    "ayatIcon": "Hook 28 - floor in front of door 2nd left tile",
    "ayatIconDescription": "On the second left tile, a Prophet figure and his group are shown fading out on one side (إِنْ أَهْلَكَنِيَ ٱللَّهُ وَمَن مَّعِيَ) and being wrapped in mercy on the other (أَوْ رَحِمَنَا); underneath burns a fire marked عَذَابٍ أَلِيمٍ with the question فَمَن يُجِيرُ ٱلْكَافِرِينَ؟"
  },
  {
    "surah": 67,
    "ayah": 29,
    "ayatIcon": "Hook 29 - floor in front of door 2nd middle tile",
    "ayatIconDescription": "On the second middle tile, a banner reads هُوَ ٱلرَّحْمَٰنُ; a group says آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا standing firm, while an arrow points forward with وَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ — soon you will know who is in clear error."
  },
  {
    "surah": 67,
    "ayah": 30,
    "ayatIcon": "Hook 30 - floor in front of door 2nd right tile",
    "ayatIconDescription": "On the second right tile, a deep dry well with an arrow sinking down shows إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا; beside it an empty bucket with a question mark asks فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ — who could bring you flowing water?"
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
