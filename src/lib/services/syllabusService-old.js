// src/lib/services/syllabus.service.js
// ------------------------------------------------------------
// Service layer for managing syllabus structure (Tcodes, Chapters, Exercises)
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';

/* -------------------- SyllabusTcode Services -------------------- */

/**
 * Create a new tcode
 */
export async function createTcode({ slug, name, description, image }) {
  if (!slug || !name) {
    throw new Error('Slug and name are required for tcode creation');
  }

  try {
    return await prisma.syllabusTcode.create({
      data: { slug, name, description, image },
      include: { chapters: true }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Tcode with slug "${slug}" already exists`);
    }
    throw error;
  }
}

/**
 * Get all tcodes
 */
export async function getAllTcodes({ includeChapters = false } = {}) {
  return await prisma.syllabusTcode.findMany({
    orderBy: { name: 'asc' },
    include: {
      chapters: includeChapters ? {
        orderBy: { sortOrder: 'asc' },
        include: {
          exercises: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      } : false
    }
  });
}

/**
 * Get tcode by slug
 */
export async function getTcodeBySlug(slug, { includeChapters = false } = {}) {
  if (!slug) throw new Error('Slug is required');

  const tcode = await prisma.syllabusTcode.findUnique({
    where: { slug },
    include: {
      chapters: includeChapters ? {
        orderBy: { sortOrder: 'asc' },
        include: {
          exercises: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      } : false
    }
  });

  if (!tcode) {
    throw new Error(`Tcode with slug "${slug}" not found`);
  }

  return tcode;
}

/**
 * Update tcode
 */
export async function updateTcode(slug, updates) {
  if (!slug) throw new Error('Slug is required');

  try {
    return await prisma.syllabusTcode.update({
      where: { slug },
      data: updates,
      include: { chapters: true }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error(`Tcode with slug "${slug}" not found`);
    }
    throw error;
  }
}

/**
 * Delete tcode (will cascade delete chapters and exercises)
 */
export async function deleteTcode(slug) {
  if (!slug) throw new Error('Slug is required');

  try {
    return await prisma.syllabusTcode.delete({
      where: { slug }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error(`Tcode with slug "${slug}" not found`);
    }
    throw error;
  }
}

/* -------------------- SyllabusChapter Services -------------------- */

/**
 * Create a new chapter
 */
export async function createChapter({ tcodeSlug, slug, name, sortOrder = 0 }) {
  if (!tcodeSlug || !slug || !name) {
    throw new Error('TcodeSlug, slug, and name are required for chapter creation');
  }

  // First get the tcode to get its ID
  const tcode = await getTcodeBySlug(tcodeSlug);

  try {
    return await prisma.syllabusChapter.create({
      data: {
        tcodeId: tcode.id,
        slug,
        name,
        sortOrder
      },
      include: {
        tcode: true,
        exercises: true
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Chapter with slug "${slug}" already exists in tcode "${tcodeSlug}"`);
    }
    throw error;
  }
}

/**
 * Get chapters by tcode slug
 */
export async function getChaptersByTcode(tcodeSlug, { includeExercises = false } = {}) {
  if (!tcodeSlug) throw new Error('Tcode slug is required');

  const tcode = await getTcodeBySlug(tcodeSlug);

  return await prisma.syllabusChapter.findMany({
    where: { tcodeId: tcode.id },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
      tcode: true,
      exercises: includeExercises ? {
        orderBy: { sortOrder: 'asc' }
      } : false
    }
  });
}

/**
 * Get chapter by tcode slug and chapter slug
 */
export async function getChapterBySlug(tcodeSlug, chapterSlug, { includeExercises = false } = {}) {
  if (!tcodeSlug || !chapterSlug) {
    throw new Error('Tcode slug and chapter slug are required');
  }

  const tcode = await getTcodeBySlug(tcodeSlug);

  const chapter = await prisma.syllabusChapter.findFirst({
    where: {
      tcodeId: tcode.id,
      slug: chapterSlug
    },
    include: {
      tcode: true,
      exercises: includeExercises ? {
        orderBy: { sortOrder: 'asc' }
      } : false
    }
  });

  if (!chapter) {
    throw new Error(`Chapter "${chapterSlug}" not found in tcode "${tcodeSlug}"`);
  }

  return chapter;
}

/**
 * Update chapter
 */
export async function updateChapter(tcodeSlug, chapterSlug, updates) {
  if (!tcodeSlug || !chapterSlug) {
    throw new Error('Tcode slug and chapter slug are required');
  }

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug);

  try {
    return await prisma.syllabusChapter.update({
      where: { id: chapter.id },
      data: updates,
      include: {
        tcode: true,
        exercises: true
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Chapter slug "${updates.slug}" already exists in this tcode`);
    }
    throw error;
  }
}

/**
 * Delete chapter (will cascade delete exercises)
 */
export async function deleteChapter(tcodeSlug, chapterSlug) {
  if (!tcodeSlug || !chapterSlug) {
    throw new Error('Tcode slug and chapter slug are required');
  }

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug);

  return await prisma.syllabusChapter.delete({
    where: { id: chapter.id }
  });
}

/* -------------------- SyllabusExercise Services -------------------- */

/**
 * Create a new exercise
 */
export async function createExercise({ tcodeSlug, chapterSlug, slug, name, sortOrder = 0 }) {
  if (!tcodeSlug || !chapterSlug || !slug || !name) {
    throw new Error('TcodeSlug, chapterSlug, slug, and name are required for exercise creation');
  }

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug);

  try {
    return await prisma.syllabusExercise.create({
      data: {
        chapterId: chapter.id,
        slug,
        name,
        sortOrder
      },
      include: {
        chapter: {
          include: { tcode: true }
        }
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Exercise with slug "${slug}" already exists in chapter "${chapterSlug}"`);
    }
    throw error;
  }
}

/**
 * Get exercises by chapter
 */
export async function getExercisesByChapter(tcodeSlug, chapterSlug) {
  if (!tcodeSlug || !chapterSlug) {
    throw new Error('Tcode slug and chapter slug are required');
  }

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug);

  return await prisma.syllabusExercise.findMany({
    where: { chapterId: chapter.id },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
      chapter: {
        include: { tcode: true }
      }
    }
  });
}

/**
 * Get exercise by slug
 */
export async function getExerciseBySlug(tcodeSlug, chapterSlug, exerciseSlug) {
  if (!tcodeSlug || !chapterSlug || !exerciseSlug) {
    throw new Error('Tcode slug, chapter slug, and exercise slug are required');
  }

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug);

  const exercise = await prisma.syllabusExercise.findFirst({
    where: {
      chapterId: chapter.id,
      slug: exerciseSlug
    },
    include: {
      chapter: {
        include: { tcode: true }
      }
    }
  });

  if (!exercise) {
    throw new Error(`Exercise "${exerciseSlug}" not found in chapter "${chapterSlug}"`);
  }

  return exercise;
}

/**
 * Update exercise
 */
export async function updateExercise(tcodeSlug, chapterSlug, exerciseSlug, updates) {
  if (!tcodeSlug || !chapterSlug || !exerciseSlug) {
    throw new Error('Tcode slug, chapter slug, and exercise slug are required');
  }

  const exercise = await getExerciseBySlug(tcodeSlug, chapterSlug, exerciseSlug);

  try {
    return await prisma.syllabusExercise.update({
      where: { id: exercise.id },
      data: updates,
      include: {
        chapter: {
          include: { tcode: true }
        }
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Exercise slug "${updates.slug}" already exists in this chapter`);
    }
    throw error;
  }
}

/**
 * Delete exercise
 */
export async function deleteExercise(tcodeSlug, chapterSlug, exerciseSlug) {
  if (!tcodeSlug || !chapterSlug || !exerciseSlug) {
    throw new Error('Tcode slug, chapter slug, and exercise slug are required');
  }

  const exercise = await getExerciseBySlug(tcodeSlug, chapterSlug, exerciseSlug);

  return await prisma.syllabusExercise.delete({
    where: { id: exercise.id }
  });
}

/* -------------------- Bulk Operations -------------------- */

/**
 * Get complete syllabus structure
 */
export async function getCompleteSyllabus() {
  return await getAllTcodes({ includeChapters: true });
}

/**
 * Get syllabus structure for specific tcode
 */
export async function getSyllabusForTcode(tcodeSlug) {
  return await getTcodeBySlug(tcodeSlug, { includeChapters: true });
}

/**
 * Reorder chapters within a tcode
 */
export async function reorderChapters(tcodeSlug, chapterOrder) {
  if (!tcodeSlug || !Array.isArray(chapterOrder)) {
    throw new Error('Tcode slug and chapter order array are required');
  }

  const tcode = await getTcodeBySlug(tcodeSlug);

  // Use transaction to ensure all updates succeed or fail together
  return await prisma.$transaction(
    chapterOrder.map((item, index) =>
      prisma.syllabusChapter.update({
        where: {
          id: item.id || undefined,
          tcodeId_slug: item.id ? undefined : {
            tcodeId: tcode.id,
            slug: item.slug
          }
        },
        data: { sortOrder: index }
      })
    )
  );
}

/**
 * Reorder exercises within a chapter
 */
export async function reorderExercises(tcodeSlug, chapterSlug, exerciseOrder) {
  if (!tcodeSlug || !chapterSlug || !Array.isArray(exerciseOrder)) {
    throw new Error('Tcode slug, chapter slug, and exercise order array are required');
  }

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug);

  // Use transaction to ensure all updates succeed or fail together
  return await prisma.$transaction(
    exerciseOrder.map((item, index) =>
      prisma.syllabusExercise.update({
        where: {
          id: item.id || undefined,
          chapterId_slug: item.id ? undefined : {
            chapterId: chapter.id,
            slug: item.slug
          }
        },
        data: { sortOrder: index }
      })
    )
  );
}

// Home index: list all tcodes as "course" cards
export async function listCoursesAsCards() {
  const rows = await getAllTcodes(); // already ordered by name
  const thumb = (raw) => {
    const s = raw?.trim?.() || '';
    if (!s) return '/media/images/taleem.webp';
    return s.startsWith('/') || s.startsWith('http') ? s : `/media/images/${s}`;
  };

  return rows.map((t) => ({
    id: t.id,
    category: 'courses',
    type: 'course',
    title: t.name || t.slug,
    href: `/syllabus?tcode=${t.slug}`,
    description: t.description || null,
    thumbnail: thumb(t.image),
    pinned: false,
    sortOrder: 0,
    status: 'active',
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  }));
}

/* -------------------- Export -------------------- */
export const syllabusService = {
  // Tcode operations
  createTcode,
  getAllTcodes,
  getTcodeBySlug,
  updateTcode,
  deleteTcode,


  listCoursesAsCards,
  // Chapter operations
  createChapter,
  getChaptersByTcode,
  getChapterBySlug,
  updateChapter,
  deleteChapter,

  // Exercise operations
  createExercise,
  getExercisesByChapter,
  getExerciseBySlug,
  updateExercise,
  deleteExercise,

  // Bulk operations
  getCompleteSyllabus,
  getSyllabusForTcode,
  reorderChapters,
  reorderExercises
};