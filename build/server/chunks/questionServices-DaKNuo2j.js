import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function insertFullQuestionFromDeck({
  filename,
  name,
  description,
  tags,
  status,
  timed,
  deck
  // full AQuestion JSON object
}) {
  return await prisma.$transaction(async (tx) => {
    await tx.question.upsert({
      where: { filename },
      update: { name, description, tags, status, timed, deck },
      create: { filename, name, description, tags, status, timed, deck }
    });
    await tx.slideItem.deleteMany({ where: { slide: { questionFilename: filename } } });
    await tx.slide.deleteMany({ where: { questionFilename: filename } });
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
        let textContent = null;
        let numValue = null;
        if (typeof content === "string") {
          textContent = content;
        } else if (typeof content === "number") {
          numValue = content;
        } else ;
        await tx.slideItem.create({
          data: {
            slideId: slideRec.id,
            index: j,
            name: itemName,
            showAt,
            textContent,
            numValue,
            label: label ?? null,
            imageUrl: item.image ?? null,
            colorHex: color ?? null,
            typeHint: typeHint ?? null,
            extraJson: {
              ...spItems ? { spItems } : {},
              ...rest
            }
          }
        });
      }
    }
    return { success: true };
  });
}
async function getQuestionByFilename(filename) {
  return prisma.question.findUnique({ where: { filename } });
}
async function getAllQuestions() {
  return prisma.question.findMany({ orderBy: { createdAt: "desc" } });
}
async function deleteQuestion(filename) {
  return prisma.$transaction(async (tx) => {
    await tx.slideItem.deleteMany({
      where: { slide: { questionFilename: filename } }
    });
    await tx.slide.deleteMany({
      where: { questionFilename: filename }
    });
    return tx.question.delete({ where: { filename } });
  });
}
async function updateDeckJson(filename, newDeckJson) {
  return prisma.question.update({
    where: { filename },
    data: { deck: newDeckJson }
  });
}

export { getQuestionByFilename as a, deleteQuestion as d, getAllQuestions as g, insertFullQuestionFromDeck as i, updateDeckJson as u };
//# sourceMappingURL=questionServices-DaKNuo2j.js.map
