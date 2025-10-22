import { describe, it, expect } from 'vitest';
import { questions } from '../../src/lib/services/questionServices.js';
import {
  createTcode, createChapter, createExercise
} from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;

// minimal deck shapes supported by computeTimed(): deck.deck[] or deck.slides[]
const mkDeck = (ends = [0]) => ({ deck: ends.map((end) => ({ end })) });

async function seed() {
  const t = await createTcode({ slug: uniq('tc'), name: 'Course Q' });
  const c = await createChapter({ tcodeId: t.id, slug: uniq('ch'), name: 'Chapter A', sortOrder: 1 });
  const e = await createExercise({ chapterId: c.id, slug: uniq('ex'), name: 'Exercise 1', sortOrder: 1 });
  return { t, c, e };
}

describe('questions: CRUD & payload invariants', () => {
  it('creates note and deck, enforces payloads, and reads meta vs payload', async () => {
    const { t, c, e } = await seed();

    // note requires "note" payload; sets timed=false
    const qNote = await questions.create({
      tcodeId: t.id, chapterId: c.id, exerciseId: e.id,
      type: 'note', name: 'Intro Note', note: '<p>hello</p>',
      status: 'draft', sortOrder: 5
    });
    expect(qNote.type).toBe('note');
    expect(qNote.note).toBeDefined();
    expect(qNote.deck).toBeNull();
    expect(qNote.timed).toBe(false);

    // deck requires "deck" payload; computes timed from slides
    const qDeck = await questions.create({
      tcodeId: t.id, chapterId: c.id, exerciseId: e.id,
      type: 'deck', name: 'Lesson 1', deck: mkDeck([0, 3]),
      status: 'ready', sortOrder: 2
    });
    expect(qDeck.type).toBe('deck');
    expect(qDeck.deck).toBeDefined();
    expect(qDeck.note).toBeNull();
    expect(qDeck.timed).toBe(true);

    // getById includePayload=false returns ONLY meta fields
    const metaOnly = await questions.getById(qDeck.id, { includePayload: false });
    expect(metaOnly.deck).toBeUndefined();
    expect(metaOnly.note).toBeUndefined();
    expect(metaOnly.name).toBe('Lesson 1');

    // update: switching/adjusting payload recomputes timed
    // IMPORTANT: include type:'deck' so beforeUpdate recomputes `timed`
    const upd = await questions.update(qDeck.id, { type: 'deck', deck: mkDeck([0, 0]) });
    expect(upd.timed).toBe(false);

    // delete returns { id } (lean)
    const del = await questions.delete(qNote.id);
    expect(del.id).toBe(qNote.id);
  });
});
