import { describe, it, expect } from 'vitest';
import { questions } from '../../src/lib/services/questionServices.js';
import { createTcode, createChapter, createExercise } from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;
const mkDeck = (ends = [0]) => ({ deck: ends.map((end) => ({ end })) });

async function seed() {
  const t = await createTcode({ slug: uniq('tc'), name: 'Course T' });
  const c = await createChapter({ tcodeId: t.id, slug: uniq('ch'), name: 'Chapter T', sortOrder: 1 });
  const e = await createExercise({ chapterId: c.id, slug: uniq('ex'), name: 'Exercise T', sortOrder: 1 });
  return { t, c, e };
}

describe('questions: timed computation', () => {
  it('sets timed=true if any slide has end>0 and recomputes on update', async () => {
    const { t, c, e } = await seed();

    const q = await questions.create({
      tcodeId: t.id, chapterId: c.id, exerciseId: e.id,
      type: 'deck', name: 'Timed Deck', deck: mkDeck([0, 0, 2])
    });
    expect(q.timed).toBe(true);

    // include type:'deck' so the hook recomputes timed
    const upd1 = await questions.update(q.id, { type: 'deck', deck: mkDeck([0, 0, 0]) });
    expect(upd1.timed).toBe(false);

    // Switching to note forces timed=false
    const upd2 = await questions.update(q.id, { type: 'note', note: 'text', deck: null });
    expect(upd2.type).toBe('note');
    expect(upd2.timed).toBe(false);
  });
});
