import { describe, it, expect } from 'vitest';
import { questions } from '../../src/lib/services/questionServices.js';
import {
  createTcode, createChapter, createExercise
} from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;
const mkDeck = (ends = [0]) => ({ deck: ends.map((end) => ({ end })) });

async function seed() {
  const t1 = await createTcode({ slug: uniq('tc'), name: 'Course 1' });
  const t2 = await createTcode({ slug: uniq('tc'), name: 'Course 2' });
  const c11 = await createChapter({ tcodeId: t1.id, slug: uniq('ch'), name: 'Ch 1', sortOrder: 1 });
  const c12 = await createChapter({ tcodeId: t1.id, slug: uniq('ch'), name: 'Ch 2', sortOrder: 2 });
  const c21 = await createChapter({ tcodeId: t2.id, slug: uniq('ch'), name: 'Ch 1', sortOrder: 1 });
  const e11 = await createExercise({ chapterId: c11.id, slug: uniq('ex'), name: 'Ex 1', sortOrder: 1 });
  const e12 = await createExercise({ chapterId: c11.id, slug: uniq('ex'), name: 'Ex 2', sortOrder: 2 });
  const e21 = await createExercise({ chapterId: c21.id, slug: uniq('ex'), name: 'Ex 1', sortOrder: 1 });
  return { t1, t2, c11, c12, c21, e11, e12, e21 };
}

describe('questions: filters', () => {
  it('filters by tcodeId, chapterId, exerciseId, type, status', async () => {
    const { t1, t2, c11, c12, c21, e11, e12, e21 } = await seed();

    // t1 set
    const q11a = await questions.create({
      tcodeId: t1.id, chapterId: c11.id, exerciseId: e11.id,
      type: 'note', name: 'N-A', note: 'ok', status: 'draft',
      sortOrder: 2
    });
    const q11b = await questions.create({
      tcodeId: t1.id, chapterId: c11.id, exerciseId: e12.id,
      type: 'deck', name: 'D-B', deck: mkDeck([0]), status: 'published',
      sortOrder: 1
    });
    const q12 = await questions.create({
      tcodeId: t1.id, chapterId: c12.id, exerciseId: e11.id,
      type: 'deck', name: 'D-C', deck: mkDeck([5]), status: 'ready',
      sortOrder: 3
    });

    // t2 set
    const q21 = await questions.create({
      tcodeId: t2.id, chapterId: c21.id, exerciseId: e21.id,
      type: 'note', name: 'N-D', note: 'ok', status: 'draft',
      sortOrder: 1
    });

    // tcode filter
    const listT1 = await questions.getByTcodeId(t1.id, { includePayload: false });
    expect(listT1.map(q => q.name).sort()).toEqual(['D-B','D-C','N-A']);

    // chapter filter
    const listCh11 = await questions.getByChapter(t1.id, c11.id, { includePayload: false });
    expect(listCh11.map(q => q.exerciseId).sort()).toEqual([e11.id, e12.id]);

    // exercise filter
    const listEx21 = await questions.getByExercise(t2.id, c21.id, e21.id, { includePayload: false });
    expect(listEx21.length).toBe(1);
    expect(listEx21[0].name).toBe('N-D');

    // type filter
    const onlyDecks = await questions.list({ includePayload: false, filters: { type: 'deck' } });
    expect(onlyDecks.every(q => q.type === 'deck')).toBe(true);

    // status filter
    const published = await questions.list({ includePayload: false, filters: { status: 'published' } });
    expect(published.map(q => q.name)).toEqual(['D-B']);
  });
});
