// src/lib/services/question.service.js
// ------------------------------------------------------------
// Service layer for managing questions
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';

/* -------------------- Question CRUD Operations -------------------- */

/**
 * Create a new question
 */
export async function createQuestion({
  slug,
  tcode,
  chapter,
  exercise,
  type,
  name,
  description,
  tags,
  status = 'draft',
  thumbnail,
  sortOrder,
  timed = false,
  deck,
  note
}) {
  if (!slug || !tcode || chapter === undefined || !exercise || !type) {
    throw new Error('slug, tcode, chapter, exercise, and type are required');
  }

  if (!['deck', 'note'].includes(type)) {
    throw new Error('Type must be either "deck" or "note"');
  }

  // Validate payload based on type
  if (type === 'deck' && !deck) {
    throw new Error('Deck payload is required for deck type questions');
  }
  if (type === 'note' && !note) {
    throw new Error('Note payload is required for note type questions');
  }

  try {
    return await prisma.question.create({
      data: {
        slug,
        tcode,
        chapter: Number(chapter),
        exercise,
        type,
        name,
        description,
        tags,
        status,
        thumbnail,
        sortOrder,
        timed,
        deck: type === 'deck' ? deck : null,
        note: type === 'note' ? note : null
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Question with slug "${slug}" already exists`);
    }
    throw error;
  }
}

/**
 * Get question by slug
 */
export async function getQuestionBySlug(slug, { includePayload = true } = {}) {
  if (!slug) throw new Error('Slug is required');

  const select = {
    slug: true,
    tcode: true,
    chapter: true,
    exercise: true,
    type: true,
    name: true,
    description: true,
    tags: true,
    status: true,
    thumbnail: true,
    sortOrder: true,
    timed: true,
    createdAt: true,
    editedAt: true
  };

  if (includePayload) {
    select.deck = true;
    select.note = true;
  }

  const question = await prisma.question.findUnique({
    where: { slug },
    select
  });

  if (!question) {
    throw new Error(`Question with slug "${slug}" not found`);
  }

  return question;
}

/**
 * Update question
 */
export async function updateQuestion(slug, updates) {
  if (!slug) throw new Error('Slug is required');

  // If type is being changed, validate payload
  if (updates.type) {
    if (!['deck', 'note'].includes(updates.type)) {
      throw new Error('Type must be either "deck" or "note"');
    }
  }

  // Convert chapter to number if provided
  if (updates.chapter !== undefined) {
    updates.chapter = Number(updates.chapter);
  }

  try {
    return await prisma.question.update({
      where: { slug },
      data: updates
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error(`Question with slug "${slug}" not found`);
    }
    if (error.code === 'P2002') {
      throw new Error(`Question slug "${updates.slug}" already exists`);
    }
    throw error;
  }
}

/**
 * Delete question
 */
export async function deleteQuestion(slug) {
  if (!slug) throw new Error('Slug is required');

  try {
    return await prisma.question.delete({
      where: { slug }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error(`Question with slug "${slug}" not found`);
    }
    throw error;
  }
}

/* -------------------- Question Listing and Filtering -------------------- */

/**
 * List questions with various filters
 */
export async function listQuestions({
  tcode,
  chapter,
  exercise,
  type,
  status,
  includePayload = false,
  limit = 100,
  offset = 0,
  orderBy = [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
} = {}) {
  const where = {};
  
  if (tcode) where.tcode = tcode;
  if (chapter !== undefined) where.chapter = Number(chapter);
  if (exercise) where.exercise = exercise;
  if (type) where.type = type;
  if (status) where.status = status;

  const select = {
    slug: true,
    tcode: true,
    chapter: true,
    exercise: true,
    type: true,
    name: true,
    description: true,
    tags: true,
    status: true,
    thumbnail: true,
    sortOrder: true,
    timed: true,
    createdAt: true,
    editedAt: true
  };

  if (includePayload) {
    select.deck = true;
    select.note = true;
  }

  return await prisma.question.findMany({
    where,
    select,
    orderBy,
    take: limit,
    skip: offset
  });
}

/**
 * Get questions by tcode
 */
export async function getQuestionsByTcode(tcode, options = {}) {
  if (!tcode) throw new Error('Tcode is required');
  
  return await listQuestions({
    tcode,
    ...options
  });
}

/**
 * Get questions by tcode and chapter
 */
export async function getQuestionsByChapter(tcode, chapter, options = {}) {
  if (!tcode || chapter === undefined) {
    throw new Error('Tcode and chapter are required');
  }
  
  return await listQuestions({
    tcode,
    chapter,
    ...options
  });
}

/**
 * Get questions by tcode, chapter, and exercise
 */
export async function getQuestionsByExercise(tcode, chapter, exercise, options = {}) {
  if (!tcode || chapter === undefined || !exercise) {
    throw new Error('Tcode, chapter, and exercise are required');
  }
  
  return await listQuestions({
    tcode,
    chapter,
    exercise,
    ...options
  });
}

/* -------------------- Question Statistics and Analytics -------------------- */

/**
 * Get question count by filters
 */
export async function getQuestionCount({
  tcode,
  chapter,
  exercise,
  type,
  status
} = {}) {
  const where = {};
  
  if (tcode) where.tcode = tcode;
  if (chapter !== undefined) where.chapter = Number(chapter);
  if (exercise) where.exercise = exercise;
  if (type) where.type = type;
  if (status) where.status = status;

  return await prisma.question.count({ where });
}

/**
 * Get questions statistics by tcode
 */
export async function getQuestionStatsByTcode(tcode) {
  if (!tcode) throw new Error('Tcode is required');

  const [total, byType, byStatus, byChapter] = await Promise.all([
    // Total count
    prisma.question.count({ where: { tcode } }),
    
    // Count by type
    prisma.question.groupBy({
      by: ['type'],
      where: { tcode },
      _count: { _all: true }
    }),
    
    // Count by status
    prisma.question.groupBy({
      by: ['status'],
      where: { tcode },
      _count: { _all: true }
    }),
    
    // Count by chapter
    prisma.question.groupBy({
      by: ['chapter'],
      where: { tcode },
      _count: { _all: true },
      orderBy: { chapter: 'asc' }
    })
  ]);

  return {
    total,
    byType: byType.reduce((acc, item) => {
      acc[item.type] = item._count._all;
      return acc;
    }, {}),
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status || 'unknown'] = item._count._all;
      return acc;
    }, {}),
    byChapter: byChapter.reduce((acc, item) => {
      acc[item.chapter] = item._count._all;
      return acc;
    }, {})
  };
}

/* -------------------- Bulk Operations -------------------- */

/**
 * Bulk update question status
 */
export async function bulkUpdateQuestionStatus(slugs, status) {
  if (!Array.isArray(slugs) || slugs.length === 0) {
    throw new Error('Slugs array is required and cannot be empty');
  }
  if (!status) throw new Error('Status is required');

  return await prisma.question.updateMany({
    where: {
      slug: { in: slugs }
    },
    data: { status }
  });
}

/**
 * Bulk delete questions
 */
export async function bulkDeleteQuestions(slugs) {
  if (!Array.isArray(slugs) || slugs.length === 0) {
    throw new Error('Slugs array is required and cannot be empty');
  }

  return await prisma.question.deleteMany({
    where: {
      slug: { in: slugs }
    }
  });
}

/**
 * Reorder questions within an exercise
 */
export async function reorderQuestions(tcode, chapter, exercise, questionOrder) {
  if (!tcode || chapter === undefined || !exercise || !Array.isArray(questionOrder)) {
    throw new Error('Tcode, chapter, exercise, and question order array are required');
  }

  // Use transaction to ensure all updates succeed or fail together
  return await prisma.$transaction(
    questionOrder.map((item, index) =>
      prisma.question.update({
        where: { slug: item.slug },
        data: { sortOrder: index }
      })
    )
  );
}

/* -------------------- Search and Advanced Queries -------------------- */

/**
 * Search questions by name or description
 */
export async function searchQuestions(searchTerm, {
  tcode,
  type,
  status,
  limit = 50,
  includePayload = false
} = {}) {
  if (!searchTerm) throw new Error('Search term is required');

  const where = {
    OR: [
      { name: { contains: searchTerm } },
      { description: { contains: searchTerm } }
    ]
  };

  if (tcode) where.tcode = tcode;
  if (type) where.type = type;
  if (status) where.status = status;

  const select = {
    slug: true,
    tcode: true,
    chapter: true,
    exercise: true,
    type: true,
    name: true,
    description: true,
    tags: true,
    status: true,
    thumbnail: true,
    sortOrder: true,
    timed: true,
    createdAt: true,
    editedAt: true
  };

  if (includePayload) {
    select.deck = true;
    select.note = true;
  }

  return await prisma.question.findMany({
    where,
    select,
    orderBy: [{ name: 'asc' }],
    take: limit
  });
}

/**
 * Get questions by tags
 */
export async function getQuestionsByTags(tags, options = {}) {
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error('Tags array is required and cannot be empty');
  }

  // This assumes tags are stored as JSON array in the database
  const where = {
    tags: {
      array_contains: tags
    }
  };

  if (options.tcode) where.tcode = options.tcode;
  if (options.type) where.type = options.type;
  if (options.status) where.status = options.status;

  return await listQuestions({
    ...options,
    ...where
  });
}

/* -------------------- Export -------------------- */
export const questionService = {
  // CRUD operations
  createQuestion,
  getQuestionBySlug,
  updateQuestion,
  deleteQuestion,

  // Listing and filtering
  listQuestions,
  getQuestionsByTcode,
  getQuestionsByChapter,
  getQuestionsByExercise,

  // Statistics
  getQuestionCount,
  getQuestionStatsByTcode,

  // Bulk operations
  bulkUpdateQuestionStatus,
  bulkDeleteQuestions,
  reorderQuestions,

  // Search and advanced queries
  searchQuestions,
  getQuestionsByTags
};