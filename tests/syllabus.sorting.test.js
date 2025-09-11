import { describe, it, expect } from 'vitest';
import {
  createTcode, createChapter, createExercise,
  listChapters, listExercises
} from '../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;

describe('syllabus: sorting', () => {
  it('chapters: sort by sortOrder then name asc', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'SortCourse' });

    await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Gamma',  sortOrder: 2 });
    await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Alpha',  sortOrder: 1 });
    await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Beta',   sortOrder: 1 });
    await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Intro',  sortOrder: 0 });

    const chs = await listChapters(t.id);
    expect(chs.map(c => `${c.sortOrder}:${c.name}`)).toEqual([
      '0:Intro', '1:Alpha', '1:Beta', '2:Gamma'
    ]);
  });

  it('exercises: sort by sortOrder then name asc', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'SortCourse2' });
    const c = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Only', sortOrder: 0 });

    await createExercise({ chapterId: c.id, slug: uniq('e'), name: 'Zebra',  sortOrder: 3 });
    await createExercise({ chapterId: c.id, slug: uniq('e'), name: 'Apple',  sortOrder: 1 });
    await createExercise({ chapterId: c.id, slug: uniq('e'), name: 'Banana', sortOrder: 1 });
    await createExercise({ chapterId: c.id, slug: uniq('e'), name: 'Core',   sortOrder: 0 });

    const exs = await listExercises(c.id);
    expect(exs.map(e => `${e.sortOrder}:${e.name}`)).toEqual([
      '0:Core', '1:Apple', '1:Banana', '3:Zebra'
    ]);
  });
});
