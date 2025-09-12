// /src/lib/services/questionServices.js
// CRUD via crudl only. No prisma import.

import crudl from '$lib/crudl/crudl.js';

/* selects */
const SELECT_META = {
  id: true, tcodeId: true, chapterId: true, exerciseId: true,
  type: true, name: true, description: true, tags: true,
  status: true, thumbnail: true, sortOrder: true, timed: true,
  homeCategory: true, homeSort: true, homePinned: true,
  createdAt: true, editedAt: true
};
const SELECT_WITH_PAYLOAD = { ...SELECT_META, deck: true, note: true };

/* helpers */
const toInt = (v) => (v == null || v === '' ? null : Number(v));
const ensureType = (t) => { if (!['note','deck'].includes(t)) throw new Error('type must be "note" or "deck"'); };
const exclusivePayload = (v) => (v.type === 'note' ? { ...v, deck:null } : { ...v, note:null });
const computeTimed = (deckObj) => {
  try {
    const slides = Array.isArray(deckObj?.deck) ? deckObj.deck
      : Array.isArray(deckObj?.slides) ? deckObj.slides : [];
    return slides.some(s => typeof s?.end === 'number' && s.end > 0);
  } catch { return false; }
};
const whereFilter = (f = {}) => {
  const w = {};
  if (f.tcodeId) w.tcodeId = toInt(f.tcodeId);
  if (f.chapterId != null) w.chapterId = toInt(f.chapterId);
  if (f.exerciseId) w.exerciseId = toInt(f.exerciseId);
  if (f.type) w.type = f.type;
  if (f.status) w.status = f.status;
  if (f.homeCategory !== undefined) w.homeCategory = f.homeCategory;
  return w;
};

/* base crudl with hooks */
const base = crudl('question', {
  unique: ['id'],
  select: SELECT_WITH_PAYLOAD,
  defaultOrderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  whereFilter,
  hooks: {
    async beforeCreate(data) {
      const tcodeId = toInt(data.tcodeId);
      const chapterId = toInt(data.chapterId);
      const exerciseId = toInt(data.exerciseId);
      if (!tcodeId || !chapterId || !exerciseId) throw new Error('tcodeId, chapterId, exerciseId are required');

      ensureType(data.type);

      const payload = exclusivePayload({
        ...data,
        tcodeId, chapterId, exerciseId,
        name: String(data.name || '').trim(),
        description: data.description ?? '',
        thumbnail: data.thumbnail ?? '',
        status: data.status || 'draft',
        sortOrder: Number(data.sortOrder ?? 0)
      });

      if (payload.type === 'note') {
        if (!payload.note) throw new Error('note required for type "note"');
        payload.timed = false;
      } else {
        if (!payload.deck) throw new Error('deck required for type "deck"');
        payload.timed = computeTimed(payload.deck);
      }
      return payload;
    },
    async beforeUpdate(data) {
      const u = { ...data };
      if (u.tcodeId !== undefined) u.tcodeId = toInt(u.tcodeId);
      if (u.chapterId !== undefined) u.chapterId = toInt(u.chapterId);
      if (u.exerciseId !== undefined) u.exerciseId = toInt(u.exerciseId);
      if (u.name !== undefined) u.name = String(u.name || '').trim();
      if (u.type !== undefined) ensureType(u.type);

      const u1 = exclusivePayload(u);
      if (u1.type === 'deck' && u1.deck) u1.timed = computeTimed(u1.deck);
      if (u1.type === 'note' && u1.note !== undefined) u1.timed = false;
      return u1;
    }
  }
});

/* API (lean) */
const create    = (data)                 => base.create(data, { select: SELECT_WITH_PAYLOAD });
const getById   = (id, { includePayload = true } = {}) =>
  base.read(toInt(id), { select: includePayload ? SELECT_WITH_PAYLOAD : SELECT_META });
const update    = (id, updates)          => base.update(toInt(id), updates, { select: SELECT_WITH_PAYLOAD });
const remove    = (id)                   => base.delete(toInt(id), { select: { id: true } });
const list      = (opts = {})            => base.list({ ...opts, select: opts.includePayload ? SELECT_WITH_PAYLOAD : SELECT_META });
const getByTcodeId  = (tcodeId, opt={})  => list({ ...opt, filters:{ ...(opt.filters||{}), tcodeId } });
const getByChapter  = (tcodeId, chapterId, opt={}) =>
  list({ ...opt, filters:{ ...(opt.filters||{}), tcodeId, chapterId } });
const getByExercise = (tcodeId, chapterId, exerciseId, opt={}) =>
  list({ ...opt, filters:{ ...(opt.filters||{}), tcodeId, chapterId, exerciseId } });

export const questions = {
  create, getById, update, delete: remove, list,
  getByTcodeId, getByChapter, getByExercise
};
