import { describe, it, expect } from 'vitest';
import {
  createTcode, createChapter, createExercise,
  listChapters, listExercises
} from '../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;

describe('syllabus: scoping', () => {
  it('listChapters returns only chapters for the given tcode', async () => {
    const t1 = await createTcode({ slug: uniq('t1'), name: 'T1' });
    const t2 = await createTcode({ slug: uniq('t2'), name: 'T2' });

    const c1a = await createChapter({ tcodeId: t1.id, slug: uniq('c'), name: 'T1-A', sortOrder: 1 });
    const c2a = await createChapter({ tcodeId: t2.id, slug: uniq('c'), name: 'T2-A', sortOrder: 1 });

    const chs1 = await listChapters(t1.id);
    const chs2 = await listChapters(t2.id);

    expect(chs1.map(c => c.id)).toEqual([c1a.id]);
    expect(chs2.map(c => c.id)).toEqual([c2a.id]);
  });

  it('listExercises returns only exercises for the given chapter', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'TX' });
    const c1 = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'C1', sortOrder: 1 });
    const c2 = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'C2', sortOrder: 2 });

    const e1 = await createExercise({ chapterId: c1.id, slug: uniq('e'), name: 'E1', sortOrder: 1 });
    const e2 = await createExercise({ chapterId: c2.id, slug: uniq('e'), name: 'E2', sortOrder: 1 });

    const ex1 = await listExercises(c1.id);
    const ex2 = await listExercises(c2.id);

    expect(ex1.map(e => e.id)).toEqual([e1.id]);
    expect(ex2.map(e => e.id)).toEqual([e2.id]);
  });
});
