import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Tcode (Course) services
export async function createTcode({ tcodeName, title, description, image }) {
  return prisma.tcode.create({
    data: { tcodeName, title, description, image }
  });
}

export async function getAllTcodes() {
  return prisma.tcode.findMany();
}

export async function getTcodeById(id) {
  return prisma.tcode.findUnique({ where: { id } });
}

export async function updateTcode(id, data) {
  return prisma.tcode.update({ where: { id }, data });
}

export async function deleteTcode(id) {
  return prisma.tcode.delete({ where: { id } });
}

export async function attachChapterToTcode(tcodeId, chapterId) {
  return prisma.chapter.update({
    where: { id: chapterId },
    data: { tcodeId }
  });
}

export async function detachChapterFromTcode(chapterId) {
  return prisma.chapter.update({
    where: { id: chapterId },
    data: { tcodeId: null }
  });
}

// Chapter services
export async function createChapter({ filename, name, description, image, order = 0, tcodeId = null }) {
  return prisma.chapter.create({
    data: { filename, name, description, image, order, tcodeId }
  });
}

export async function getAllChapters() {
  return prisma.chapter.findMany();
}

export async function getChapterById(id) {
  return prisma.chapter.findUnique({ where: { id } });
}

export async function updateChapter(id, data) {
  return prisma.chapter.update({ where: { id }, data });
}

export async function deleteChapter(id) {
  return prisma.chapter.delete({ where: { id } });
}

export async function attachExerciseToChapter(chapterId, exerciseId) {
  return prisma.exercise.update({
    where: { id: exerciseId },
    data: { chapterId }
  });
}

export async function detachExerciseFromChapter(exerciseId) {
  return prisma.exercise.update({
    where: { id: exerciseId },
    data: { chapterId: null }
  });
}

// Exercise services
export async function createExercise({ filename, name, description, image, order = 0, chapterId = null }) {
  return prisma.exercise.create({
    data: { filename, name, description, image, order, chapterId }
  });
}

export async function getAllExercises() {
  return prisma.exercise.findMany();
}

export async function getExerciseById(id) {
  return prisma.exercise.findUnique({ where: { id } });
}

export async function updateExercise(id, data) {
  return prisma.exercise.update({ where: { id }, data });
}

export async function deleteExercise(id) {
  return prisma.exercise.delete({ where: { id } });
}

export async function attachDeckToExercise(exerciseId, deckFilename) {
  return prisma.exercise.update({
    where: { id: exerciseId },
    data: { deckFilename }
  });
}

export async function detachDeckFromExercise(exerciseId) {
  return prisma.exercise.update({
    where: { id: exerciseId },
    data: { deckFilename: null }
  });
}

// Build nested syllabus JSON
export async function buildNestedSyllabus() {
  const tcodes = await prisma.tcode.findMany({
    include: {
      chapters: {
        include: {
          exercises: true
        }
      }
    }
  });

  return tcodes.map(tcode => ({
    tcodeName: tcode.tcodeName,
    filename: tcode.tcodeName,
    title: tcode.title,
    description: tcode.description,
    image: tcode.image,
    chapters: tcode.chapters.map(chapter => ({
      name: chapter.name,
      filename: chapter.filename,
      description: chapter.description,
      image: chapter.image,
      order: chapter.order,
      exercises: chapter.exercises.map(ex => ({
        name: ex.name,
        filename: ex.filename,
        description: ex.description,
        image: ex.image,
        order: ex.order,
        deckFilename: ex.deckFilename
      }))
    }))
  }));
}
