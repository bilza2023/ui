import { describe, it, expect } from 'vitest';
import {
  createTcode, createChapter, createExercise,
  getSyllabusForTcode, getSynopsis, getFormOptions
} from '../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2,8)}`;

describe('syllabus: domain reads', () => {
  it('returns syllabus tree and form options keyed by IDs', async () => {
    const t = await createTcode({ slug: uniq('tc'), name: 'Physics 9' });
    const ch1 = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Kinematics', sortOrder: 1 });
    const ch2 = await createChapter({ tcodeId: t.id, slug: uniq('c'), name: 'Dynamics',   sortOrder: 2 });
    const ex11 = await createExercise({ chapterId: ch1.id, slug: uniq('e'), name: 'Concepts', sortOrder: 1 });
    const ex12 = await createExercise({ chapterId: ch1.id, slug: uniq('e'), name: 'Problems', sortOrder: 2 });
    const ex21 = await createExercise({ chapterId: ch2.id, slug: uniq('e'), name: 'Concepts', sortOrder: 1 });

    const syl = await getSyllabusForTcode(t.id);
    expect(syl.tcode.id).toBe(t.id);
    expect(syl.chapters.map(c => c.id)).toEqual([ch1.id, ch2.id]);
    expect(Object.keys(syl.exercisesByChapter).map(Number).sort()).toEqual([ch1.id, ch2.id]);
    expect(syl.exercisesByChapter[ch1.id].map(e => e.id)).toEqual([ex11.id, ex12.id]);
    expect(syl.exercisesByChapter[ch2.id].map(e => e.id)).toEqual([ex21.id]);

    const syn = await getSynopsis(t.id);
    expect(syn.slug).toBe(t.slug);
    expect(syn.chapters.length).toBe(2);
    expect(syn.chapters[0].exercises.length).toBe(2);

    const opts = await getFormOptions(t.id);
    expect(Array.isArray(opts.chapters)).toBe(true);
    expect(opts.chapters.find(o => o.value === ch1.id)?.label).toBe('Kinematics');
    expect(Array.isArray(opts.exercisesByChapter[ch1.id])).toBe(true);
  });
});
