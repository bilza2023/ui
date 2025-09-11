// tests/syllabus.restrictions.test.js
import { describe, it, expect } from 'vitest';
import {
  createTcode, createChapter, createExercise,
  deleteTcode, deleteChapter, deleteExercise
} from '../src/lib/services/syllabusService.js';
import crudl from '../src/lib/crudl/crudl.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;
const questions = crudl('question');

describe('syllabus: delete restrictions', () => {
  it('rejects deleteExercise when questions exist; then allows after cleanup', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'Course' });
    const ch = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Chap', sortOrder: 0 });
    const ex = await createExercise({ chapterId: ch.id, slug: uniq('e'), name: 'Ex', sortOrder: 0 });

    const q = await questions.create({
      slug: uniq('q'),
      name: 'Q1',
      type: 'note',
      status: 'draft',
      tcodeId: t.id,
      chapterId: ch.id,
      exerciseId: ex.id
    });

    await expect(deleteExercise(ex.id)).rejects.toThrow();

    await questions.delete({ slug: q.slug });
    await expect(deleteExercise(ex.id)).resolves.toBeTruthy();
  });

  it('rejects deleteChapter when exercises exist; rejects also when questions exist; then allows', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'Course2' });
    const ch = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Chap2', sortOrder: 0 });
    const ex = await createExercise({ chapterId: ch.id, slug: uniq('e'), name: 'Ex2', sortOrder: 0 });
    await expect(deleteChapter(ch.id)).rejects.toThrow(); // blocked by exercises

    const q = await questions.create({
      slug: uniq('q'),
      name: 'Q2',
      type: 'note',
      status: 'draft',
      tcodeId: t.id,
      chapterId: ch.id,
      exerciseId: ex.id
    });

    await expect(deleteChapter(ch.id)).rejects.toThrow(); // still blocked by questions
    await questions.delete({ slug: q.slug });
    await expect(deleteExercise(ex.id)).resolves.toBeTruthy();
    await expect(deleteChapter(ch.id)).resolves.toBeTruthy();
  });

  it('rejects deleteTcode when chapters or questions exist; then allows', async () => {
    const t = await createTcode({ slug: uniq('t'), name: 'Course3' });
    const ch = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Chap3', sortOrder: 0 });
    await expect(deleteTcode(t.id)).rejects.toThrow(); // blocked by chapters

    const ex = await createExercise({ chapterId: ch.id, slug: uniq('e'), name: 'Ex3', sortOrder: 0 });
    const q = await questions.create({
      slug: uniq('q'),
      name: 'Q3',
      type: 'note',
      status: 'draft',
      tcodeId: t.id,
      chapterId: ch.id,
      exerciseId: ex.id
    });
    await expect(deleteTcode(t.id)).rejects.toThrow(); // blocked by questions too

    await questions.delete({ slug: q.slug });
    await deleteExercise(ex.id);
    await deleteChapter(ch.id);
    await expect(deleteTcode(t.id)).resolves.toBeTruthy();
  });
});
