import { describe, it, expect } from 'vitest';
import { questions } from '../../src/lib/services/questionServices.js';
import { createTcode, createChapter, createExercise } from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;
const mkDeck = () => ({ deck: [] });

async function seed() {
  const t = await createTcode({ slug: uniq('tc'), name: 'Course S' });
  const c = await createChapter({ tcodeId: t.id, slug: uniq('ch'), name: 'Chapter S', sortOrder: 1 });
  const e = await createExercise({ chapterId: c.id, slug: uniq('ex'), name: 'Exercise S', sortOrder: 1 });
  return { t, c, e };
}

describe('questions: default sort (sortOrder asc, then createdAt asc)', () => {
  it('orders by sortOrder then createdAt', async () => {
    const { t, c, e } = await seed();

    const q2 = await questions.create({
      tcodeId: t.id, chapterId: c.id, exerciseId: e.id,
      type: 'deck', name: 'B', deck: mkDeck(), sortOrder: 2
    });
    const q1a = await questions.create({
      tcodeId: t.id, chapterId: c.id, exerciseId: e.id,
      type: 'deck', name: 'A1', deck: mkDeck(), sortOrder: 1
    });
    // tiny delay naturally comes from creation order; createdAt asc = earlier first
    const q1b = await questions.create({
      tcodeId: t.id, chapterId: c.id, exerciseId: e.id,
      type: 'deck', name: 'A2', deck: mkDeck(), sortOrder: 1
    });

    const list = await questions.getByTcodeId(t.id, { includePayload: false });
    const names = list.map(x => x.name);
    // sortOrder=1 group keeps creation order (createdAt asc → q1a before q1b), then sortOrder=2
    expect(names).toEqual(['A1','A2','B']);
  });
});
