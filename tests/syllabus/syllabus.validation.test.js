import { describe, it, expect } from 'vitest';
import {
  createTcode, createChapter, createExercise
} from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;

describe('syllabus: validation', () => {
  it('createChapter requires tcodeId', async () => {
    await expect(createChapter({ slug: uniq('c'), name: 'NoTcode' }))
      .rejects.toThrow();
  });

  it('createExercise requires chapterId', async () => {
    await expect(createExercise({ slug: uniq('e'), name: 'NoChapter' }))
      .rejects.toThrow();
  });

  it('happy path still works', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'OK' });
    const c = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'OK-C', sortOrder: 0 });
    const e = await createExercise({ chapterId: c.id, slug: uniq('e'), name: 'OK-E', sortOrder: 0 });
    expect(t.id && c.id && e.id).toBeTruthy();
  });
});
