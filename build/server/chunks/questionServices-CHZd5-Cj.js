import { p as prisma } from './prisma-CbVrW2fI.js';

const ALLOWED_TYPES = ["deck", "note"];
function _assertTypeAndPayload({ type, deck, note }) {
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error(`Invalid type "${type}" (allowed: ${ALLOWED_TYPES.join(", ")})`);
  }
  if (type === "deck" && !deck) throw new Error('Deck payload missing for type="deck"');
  if (type === "note" && !note) throw new Error('Note payload missing for type="note"');
}
function _normalizeCommonFields(input = {}) {
  const {
    filename,
    tcode = null,
    chapter = null,
    exercise = null,
    type,
    // required
    name = null,
    description = null,
    tags = [],
    status = null,
    sortOrder = null,
    timed = false,
    deck = null,
    note = null
  } = input;
  if (!filename) throw new Error("filename is required");
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
    sortOrder: typeof sortOrder === "number" ? sortOrder : null,
    timed: Boolean(timed),
    deck: type === "deck" ? deck : null,
    note: type === "note" ? note : null
  };
}
async function exists(filename) {
  if (!filename) throw new Error("exists: filename required");
  return prisma.question.findUnique({ where: { filename } });
}
async function getQuestionByFilename(filename, opts = {}) {
  if (!filename) throw new Error("getQuestionByFilename: filename required");
  const { selectPayload = true } = opts;
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
async function createQuestion(input) {
  const data = _normalizeCommonFields(input);
  return prisma.question.create({ data });
}
async function updateDeckJson(filename, deckJson) {
  if (!filename) throw new Error("updateDeckJson: filename required");
  if (!deckJson) throw new Error("updateDeckJson: deck JSON required");
  return prisma.question.update({
    where: { filename },
    data: { deck: deckJson, editedAt: /* @__PURE__ */ new Date(), type: "deck", note: null }
  });
}
async function deleteByFilename(filename) {
  if (!filename) throw new Error("deleteByFilename: filename required");
  return prisma.question.delete({ where: { filename } });
}

export { createQuestion as c, deleteByFilename as d, exists as e, getQuestionByFilename as g, updateDeckJson as u };
//# sourceMappingURL=questionServices-CHZd5-Cj.js.map
