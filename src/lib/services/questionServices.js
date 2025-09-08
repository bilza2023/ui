
// /src/lib/services/questionServices.js
// ------------------------------------------------------------
// Service layer for managing questions — now backed by CRUDL,
// while preserving the exact API used by tests and the app.
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';
import { makeCrudl } from '$lib/crudl/crudl.js';

/* -------------------- CRUDL base (generic) -------------------- */

const SELECT_META = {
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

const SELECT_WITH_PAYLOAD = { ...SELECT_META, deck: true, note: true };

const whereFilter = (f = {}) => {
  const w = {};
  if (!f) return w;
  if (f.tcode) w.tcode = f.tcode;
  if (f.chapter !== undefined) w.chapter = Number(f.chapter);
  if (f.exercise) w.exercise = f.exercise;
  if (f.type) w.type = f.type;
  if (f.status) w.status = f.status;
  return w;
};

const crudl = makeCrudl('question', {
  unique: ['slug', 'id'],
  defaultOrderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  whereFilter,
  hooks: {
    beforeCreate: async (data) => {
      // Required fields check (align messages with existing tests)
      const { slug, tcode, chapter, exercise, type } = data ?? {};
      if (!slug || !tcode || chapter === undefined || !exercise || !type) {
        throw new Error('slug, tcode, chapter, exercise, and type are required');
      }
      if (!['deck', 'note'].includes(type)) {
        throw new Error('Type must be either "deck" or "note"');
      }

      // Type payload validation
      if (type === 'deck' && !data.deck) {
        throw new Error('Deck payload is required for deck type questions');
      }
      if (type === 'note' && !data.note) {
        throw new Error('Note payload is required for note type questions');
      }

      // Normalize & defaults
      return {
        status: 'draft',
        sortOrder: 0,
        timed: false,
        ...data,
        chapter: Number(data.chapter),
        deck: type === 'deck' ? data.deck : null,
        note: type === 'note' ? data.note : null
      };
    },
    beforeUpdate: async (updates /* , where */) => {
      const u = { ...updates };
      if (u.type && !['deck', 'note'].includes(u.type)) {
        throw new Error('Type must be either "deck" or "note"');
      }
      if (u.chapter !== undefined) u.chapter = Number(u.chapter);
      // We intentionally do not force payload switches here; legacy behavior allows partial updates.
      return u;
    }
  }
});

/* -------------------- Question CRUD Operations -------------------- */

export async function createQuestion(payload) {
  try {
    return await crudl.create(payload);
  } catch (e) {
    // Align duplicate message with existing tests: /already exists/i
    if (e?.code === 'DUPLICATE' && payload?.slug) {
      throw new Error(`Question with slug "${payload.slug}" already exists`);
    }
    throw e;
  }
}

export async function getQuestionBySlug(slug, { includePayload = true } = {}) {
  if (!slug) throw new Error('Slug is required');
  const select = includePayload ? SELECT_WITH_PAYLOAD : SELECT_META;
  // CRUDL will throw a "Not found" error if missing — matches tests
  return await crudl.read(slug, { select });
}

export async function updateQuestion(slug, updates) {
  if (!slug) throw new Error('Slug is required');
  try {
    return await crudl.update(slug, updates);
  } catch (e) {
    if (e?.code === 'DUPLICATE' && updates?.slug) {
      throw new Error(`Question slug "${updates.slug}" already exists`);
    }
    throw e; // "Not found" surfaces as-is and matches tests
  }
}

export async function deleteQuestion(slug) {
  if (!slug) throw new Error('Slug is required');
  // CRUDL delete throws "Not found" when appropriate — matches tests
  return await crudl.delete(slug);
}

/* -------------------- Question Listing and Filtering -------------------- */

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
  const filters = { tcode, chapter, exercise, type, status };
  const select = includePayload ? SELECT_WITH_PAYLOAD : SELECT_META;
  return await crudl.list({ filters, limit, offset, orderBy, select });
}

export async function getQuestionsByTcode(tcode, options = {}) {
  if (!tcode) throw new Error('Tcode is required');
  return await listQuestions({ tcode, ...options });
}

export async function getQuestionsByChapter(tcode, chapter, options = {}) {
  if (!tcode || chapter === undefined) {
    throw new Error('Tcode and chapter are required');
  }
  return await listQuestions({ tcode, chapter, ...options });
}

export async function getQuestionsByExercise(tcode, chapter, exercise, options = {}) {
  if (!tcode || chapter === undefined || !exercise) {
    throw new Error('Tcode, chapter, and exercise are required');
  }
  return await listQuestions({ tcode, chapter, exercise, ...options });
}

/* -------------------- Question Statistics and Analytics -------------------- */

export async function getQuestionCount({ tcode, chapter, exercise, type, status } = {}) {
  const where = whereFilter({ tcode, chapter, exercise, type, status });
  return await prisma.question.count({ where });
}

export async function getQuestionStatsByTcode(tcode) {
  if (!tcode) throw new Error('Tcode is required');

  const [total, byType, byStatus, byChapter] = await Promise.all([
    prisma.question.count({ where: { tcode } }),
    prisma.question.groupBy({
      by: ['type'],
      where: { tcode },
      _count: { _all: true }
    }),
    prisma.question.groupBy({
      by: ['status'],
      where: { tcode },
      _count: { _all: true }
    }),
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

export async function bulkUpdateQuestionStatus(slugs, status) {
  if (!Array.isArray(slugs) || slugs.length === 0) {
    throw new Error('Slugs array is required and cannot be empty');
  }
  if (!status) throw new Error('Status is required');
  return await prisma.question.updateMany({
    where: { slug: { in: slugs } },
    data: { status }
  });
}

export async function bulkDeleteQuestions(slugs) {
  if (!Array.isArray(slugs) || slugs.length === 0) {
    throw new Error('Slugs array is required and cannot be empty');
  }
  return await prisma.question.deleteMany({
    where: { slug: { in: slugs } }
  });
}

export async function reorderQuestions(tcode, chapter, exercise, questionOrder) {
  if (!tcode || chapter === undefined || !exercise || !Array.isArray(questionOrder)) {
    throw new Error('Tcode, chapter, exercise, and question order array are required');
  }
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

export async function searchQuestions(
  searchTerm,
  { tcode, type, status, limit = 50, includePayload = false } = {}
) {
  if (!searchTerm) throw new Error('Search term is required');

  const where = {
    OR: [
      { name: { contains: searchTerm } },
      { description: { contains: searchTerm } }
    ],
    ...(tcode ? { tcode } : {}),
    ...(type ? { type } : {}),
    ...(status ? { status } : {})
  };

  const select = includePayload ? SELECT_WITH_PAYLOAD : SELECT_META;

  return await prisma.question.findMany({
    where,
    select,
    orderBy: [{ name: 'asc' }],
    take: limit
  });
}

// NOTE: Tag querying is schema/adapter-dependent (JSON vs relation).
// The test for this is currently skipped; keep a conservative placeholder.
export async function getQuestionsByTags(tags, options = {}) {
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error('Tags array is required and cannot be empty');
  }

  // If tags are stored as JSON array (SQLite), robust filtering may need a custom adapter.
  // For now, approximate by fetching a superset and filtering in memory when possible.
  const rows = await listQuestions({ ...options, includePayload: false });
  const termSet = new Set(tags.map((t) => String(t).toLowerCase()));
  return rows.filter((q) =>
    Array.isArray(q.tags) && q.tags.some((t) => termSet.has(String(t).toLowerCase()))
  );
}

/* -------------------- Export (compat) -------------------- */

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
