// services/questionService.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Create or replace a full AQuestion in the DB:
 *  • writes to questions table (metadata + compiled JSON)
 *  • explodes deck.slides → slides table
 *  • explodes each slide.data[] → slide_items table
 */
export async function insertFullQuestionFromDeck({
  filename,
  name,
  description,
  tags,
  status,
  timed,
  deck,          // full AQuestion JSON object
}) {
  return await prisma.$transaction(async (tx) => {
    // 1️⃣ Upsert question metadata + compiled deck JSON
    await tx.question.upsert({
      where: { filename },
      update: { name, description, tags, status, timed, deck },
      create: { filename, name, description, tags, status, timed, deck }
    });

    // 2️⃣ Remove any existing slides + items for this question
    await tx.slideItem.deleteMany({ where: { slide: { questionFilename: filename } } });
    await tx.slide.deleteMany({ where: { questionFilename: filename } });

    // 3️⃣ Insert slides & slide_items
    for (let i = 0; i < deck.deck.length; i++) {
      const slide = deck.deck[i];
      const slideRec = await tx.slide.create({
        data: {
          questionFilename: filename,
          index: i,
          type: slide.type,
          start: slide.start,
          end: slide.end
        }
      });

      for (let j = 0; j < slide.data.length; j++) {
        const item = slide.data[j];
        const {
          name: itemName,
          showAt = 0,
          content,
          label,
          value,
          color,
          type: typeHint,
          spItems,
          ...rest
        } = item;

        // map content → textContent or numValue
        let textContent = null;
        let numValue = null;
        if (typeof content === 'string') {
          textContent = content;
        } else if (typeof content === 'number') {
          numValue = content;
        } else {
          // arrays, objects → keep in extraJson
        }

        await tx.slideItem.create({
          data: {
            slideId:   slideRec.id,
            index:     j,
            name:      itemName,
            showAt,
            textContent,
            numValue,
            label:     label ?? null,
            imageUrl:  item.image ?? null,
            colorHex:  color ?? null,
            typeHint:  typeHint ?? null,
            extraJson: {
              ...(spItems ? { spItems } : {}),
              ...rest
            }
          }
        });
      }
    }

    return { success: true };
  });
}

/**
 * Rebuild a full AQuestion JSON object from the DB tables.
 * Reads question.deck for metadata & background,
 * then reconstructs deck.deck[] from slides + slide_items.
 */
export async function buildQuestionFromTables(filename) {
  // 1️⃣ Load question record (includes compiled deck JSON for metadata & background)
  const q = await prisma.question.findUnique({
    where: { filename }
  });
  if (!q) throw new Error(`Question '${filename}' not found`);

  // 2️⃣ Load slides and items
  const slides = await prisma.slide.findMany({
    where: { questionFilename: filename },
    orderBy: { index: 'asc' }
  });
  const itemsBySlide = await prisma.slideItem.findMany({
    where: { slideId: { in: slides.map(s => s.id) } },
    orderBy: [{ slideId: 'asc' }, { index: 'asc' }]
  });

  // 3️⃣ Group items by slideId
  const grouped = {};
  itemsBySlide.forEach(item => {
    if (!grouped[item.slideId]) grouped[item.slideId] = [];
    grouped[item.slideId].push(item);
  });

  // 4️⃣ Reconstruct slides array
  const rebuiltSlides = slides.map(slide => ({
    type:  slide.type,
    start: slide.start,
    end:   slide.end,
    data:  (grouped[slide.id] || []).map(si => {
      // rebuild content & extras
      const obj = { name: si.name, showAt: si.showAt ?? 0 };
      if (si.textContent != null) obj.content = si.textContent;
      else if (si.numValue != null) obj.content = si.numValue;
      if (si.label)       obj.label     = si.label;
      if (si.imageUrl)    obj.image     = si.imageUrl;
      if (si.colorHex)    obj.color     = si.colorHex;
      if (si.typeHint)    obj.type      = si.typeHint;
      // merge back any extra fields
      Object.assign(obj, si.extraJson ?? {});
      return obj;
    })
  }));

  // 5️⃣ Return full AQuestion JSON
  const { deck: _, ...meta } = q; // preserve metadata but ignore old deck
  return {
    ...meta,
    deck: rebuiltSlides
  };
}

/**
 * Other existing helpers (metadata-only operations)
 */
export async function getQuestionByFilename(filename) {
  return prisma.question.findUnique({ where: { filename } });
}
export async function getAllQuestions() {
  return prisma.question.findMany({ orderBy: { createdAt: 'desc' } });
}
export async function deleteQuestion(filename) {
  return prisma.$transaction(async (tx) => {
    // 1. remove items → slides
    await tx.slideItem.deleteMany({
      where: { slide: { questionFilename: filename } }
    });
    await tx.slide.deleteMany({
      where: { questionFilename: filename }
    });

    // 2. finally remove the question row
    return tx.question.delete({ where: { filename } });
  });
}


export async function updateDeckJson(filename, newDeckJson) {
  return prisma.question.update({
    where: { filename },
    data:  { deck: newDeckJson }
  });
}


export default {
  insertFullQuestionFromDeck,
  buildQuestionFromTables,
  getQuestionByFilename,
  getAllQuestions,
  deleteQuestion
};
