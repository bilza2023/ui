import { describe, it, expect } from 'vitest';
import {
  createTcode, deleteTcode,
  listChapters, getChapter, getChapterBySlug, createChapter, updateChapter, deleteChapter,
  listExercises, getExercise, getExerciseBySlug, createExercise, updateExercise, deleteExercise
} from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;

describe('syllabus: chapters and exercises', () => {
  it('creates chapter(s) under a tcode and sorts by sortOrder then name', async () => {
    const t = await createTcode({ slug: uniq('tc'), name: 'Course X' });

    const c1 = await createChapter({ tcodeId: t.id, slug: uniq('c1'), name: 'B Chapter', sortOrder: 1 });
    const c2 = await createChapter({ tcodeId: t.id, slug: uniq('c2'), name: 'A Chapter', sortOrder: 1 });
    const c0 = await createChapter({ tcodeId: t.id, slug: uniq('c0'), name: 'Z Intro',  sortOrder: 0 });

    const chs = await listChapters(t.id);
    expect(chs.map(c => c.name)).toEqual(['Z Intro','A Chapter','B Chapter']); // 0 first, then alpha within 1

    const byId   = await getChapter(c1.id);
    const bySlug = await getChapterBySlug(t.id, c2.slug);
    expect(byId.name).toBe('B Chapter');
    expect(bySlug.name).toBe('A Chapter');

    const upd = await updateChapter(c0.id, { name: 'Intro' });
    expect(upd.name).toBe('Intro');

    // Exercises under c0
    const e1 = await createExercise({ chapterId: c0.id, slug: uniq('e1'), name: 'Exercises A', sortOrder: 5 });
    const e2 = await createExercise({ chapterId: c0.id, slug: uniq('e2'), name: 'Exercises B', sortOrder: 5 });
    const e0 = await createExercise({ chapterId: c0.id, slug: uniq('e0'), name: 'General',     sortOrder: 0 });

    const exs = await listExercises(c0.id);
    expect(exs.map(e => e.name)).toEqual(['General','Exercises A','Exercises B']);

    const exById   = await getExercise(e1.id);
    const exBySlug = await getExerciseBySlug(c0.id, e2.slug);
    expect(exById.name).toBe('Exercises A');
    expect(exBySlug.name).toBe('Exercises B');

    const exUpd = await updateExercise(e0.id, { name: 'Basics' });
    expect(exUpd.name).toBe('Basics');

    // Restrict deletes: cannot delete chapter while it has exercises
    await expect(deleteChapter(c0.id)).rejects.toThrow();

    // Clean in order
    await deleteExercise(e1.id);
    await deleteExercise(e2.id);
    await deleteExercise(e0.id);
    await deleteChapter(c0.id);
    await deleteChapter(c1.id);
    await deleteChapter(c2.id);
    await deleteTcode(t.id);
  });
});
