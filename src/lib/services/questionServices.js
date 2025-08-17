// src/lib/services/questionServices.js
// ------------------------------------------------------------
// Single source of truth for Questions (deck | note)
// Create, Read, Update, Delete using Prisma
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';

const ALLOWED_TYPES = ['deck', 'note'];

/** Internal: validate payload pairing rules */
function _assertTypeAndPayload({ type, deck, note }) {
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error(`Invalid type "${type}" (allowed: ${ALLOWED_TYPES.join(', ')})`);
  }
  if (type === 'deck' && !deck) throw new Error('Deck payload missing for type="deck"');
  if (type === 'note' && !note) throw new Error('Note payload missing for type="note"');
}

/** Internal: normalize common fields */
function _normalizeCommonFields(input = {}) {
  const {
    filename,
    tcode = null,
    chapter = null,
    exercise = null,
    type, // required
    name = null,
    description = null,
    tags = [],
    status = null,
    sortOrder = null,
    timed = false,
    deck = null,
    note = null
  } = input;

  if (!filename) throw new Error('filename is required');
  _assertTypeAndPayload({ type, deck, note });

  return {
    filename,
    tcode,
    chapter,
    exercise,
    type,
    name,
    description,
    tags: Array.isArray(tags) ? tags : [],
    status,
    sortOrder: typeof sortOrder === 'number' ? sortOrder : null,
    timed: Boolean(timed),
    deck: type === 'deck' ? deck : null,
    note: type === 'note' ? note : null
  };
}

/** READ — does a question exist? (returns row or null) */
export async function exists(filename) {
  if (!filename) throw new Error('exists: filename required');
  return prisma.question.findUnique({ where: { filename } });
}

/**
 * READ — get one by filename.
 * @param {string} filename
 * @param {{ selectPayload?: boolean }} [opts] selectPayload=false to exclude large deck/note
 */
export async function getQuestionByFilename(filename, opts = {}) {
  if (!filename) throw new Error('getQuestionByFilename: filename required');
  const { selectPayload = true } = opts;

  /** @type {import('@prisma/client').Prisma.QuestionSelect} */
  const select = {
    filename: true,
    type: true,
    name: true,
    description: true,
    tags: true,
    status: true,
    sortOrder: true,
    timed: true,
    tcode: true,
    chapter: true,
    exercise: true,
    createdAt: true,
    editedAt: true
  };

  if (selectPayload) {
    select.deck = true;
    select.note = true;
  }

  return prisma.question.findUnique({ where: { filename }, select });
}

/**
 * CREATE — strict create (no upsert).
 * Provide type="deck" with `deck` OR type="note" with `note`.
 */
export async function createQuestion(input) {
  const data = _normalizeCommonFields(input);
  return prisma.question.create({ data });
}

/**
 * UPSERT — create or replace whole record by filename.
 * Useful for idempotent imports/CLI sync.
 */
export async function upsertQuestion(input) {
  const data = _normalizeCommonFields(input);
  return prisma.question.upsert({
    where: { filename: data.filename },
    create: data,
    update: data
  });
}

/** UPDATE — replace deck JSON and bump editedAt */
export async function updateDeckJson(filename, deckJson) {
  if (!filename) throw new Error('updateDeckJson: filename required');
  if (!deckJson) throw new Error('updateDeckJson: deck JSON required');
  return prisma.question.update({
    where: { filename },
    data: { deck: deckJson, editedAt: new Date(), type: 'deck', note: null }
  });
}

/** UPDATE — replace note HTML/string and bump editedAt */
export async function updateNoteHtml(filename, noteStr) {
  if (!filename) throw new Error('updateNoteHtml: filename required');
  if (typeof noteStr !== 'string' || noteStr.length === 0) {
    throw new Error('updateNoteHtml: note string required');
  }
  return prisma.question.update({
    where: { filename },
    data: { note: noteStr, editedAt: new Date(), type: 'note', deck: null, timed: false }
  });
}

/**
 * UPDATE — partial metadata patch (no deck/note here).
 * Fields allowed: name, description, tags, status, sortOrder, timed, tcode, chapter, exercise
 */
export async function patchQuestionMeta(filename, patch = {}) {
  if (!filename) throw new Error('patchQuestionMeta: filename required');

  const allowed = ['name', 'description', 'tags', 'status', 'sortOrder', 'timed', 'tcode', 'chapter', 'exercise'];
  /** @type {Record<string, any>} */
  const data = {};
  for (const k of allowed) {
    if (patch[k] !== undefined) data[k] = patch[k];
  }
  if ('tags' in data && !Array.isArray(data.tags)) data.tags = [];

  if (Object.keys(data).length === 0) return prisma.question.findUnique({ where: { filename } });
  data.editedAt = new Date();

  return prisma.question.update({ where: { filename }, data });
}

/** DELETE — remove by filename */
export async function deleteByFilename(filename) {
  if (!filename) throw new Error('deleteByFilename: filename required');
  return prisma.question.delete({ where: { filename } });
}
