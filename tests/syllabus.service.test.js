
// ui/tests/syllabus.service.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// Import the service directly (match the style from auth.test.js)
import {
  // tcodes
  createTcode, getAllTcodes, getTcodeBySlug, updateTcode, deleteTcode,
  // chapters
  createChapter, getChaptersByTcode, getChapterBySlug, updateChapter, deleteChapter,
  // exercises
  createExercise, getExercisesByChapter, getExerciseBySlug, updateExercise, deleteExercise,
  // bulk
  getCompleteSyllabus, getSyllabusForTcode, reorderChapters, reorderExercises
} from '../src/lib/services/syllabusService';

const uniq = (p='t') => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;

describe.sequential('syllabus.service: tcodes → chapters → exercises', () => {
  const tcodeSlug = uniq('tcode');
  const chapterA  = { slug: uniq('chA'), name: 'Chapter A' };
  const chapterB  = { slug: uniq('chB'), name: 'Chapter B' };
  const exA1      = { slug: uniq('exA1'), name: 'Exercise A1' };
  const exA2      = { slug: uniq('exA2'), name: 'Exercise A2' };
  const exB1      = { slug: uniq('exB1'), name: 'Exercise B1' };

  afterAll(async () => {
    // Cleanup: try delete tcode (cascades). Ignore if already removed.
    try { await deleteTcode(tcodeSlug); } catch {}
  });

  describe('Tcodes CRUD', () => {
    it('creates a tcode', async () => {
      const t = await createTcode({ slug: tcodeSlug, name: `Name ${tcodeSlug}`, description: 'desc' });
      expect(t.slug).toBe(tcodeSlug);
      expect(Array.isArray(t.chapters)).toBe(true);
    });

    it('rejects duplicate tcode slug', async () => {
      await expect(createTcode({ slug: tcodeSlug, name: 'dup' }))
        .rejects.toThrow(/already exists/i);
    });

    it('lists tcodes (without chapters by default) and fetches by slug', async () => {
      const list = await getAllTcodes();
      expect(list.some(x => x.slug === tcodeSlug)).toBe(true);

      const one = await getTcodeBySlug(tcodeSlug);
      expect(one.slug).toBe(tcodeSlug);
      expect(one.chapters).toBeUndefined();
    });

    it('updates a tcode', async () => {
      const up = await updateTcode(tcodeSlug, { description: 'updated' });
      expect(up.description).toBe('updated');
    });
  });

  describe('Chapters CRUD + read patterns', () => {
    it('creates chapters under the tcode', async () => {
      const a = await createChapter({ tcodeSlug, ...chapterA, sortOrder: 1 });
      const b = await createChapter({ tcodeSlug, ...chapterB, sortOrder: 2 });
      expect(a.slug).toBe(chapterA.slug);
      expect(b.slug).toBe(chapterB.slug);
    });

    it('rejects duplicate chapter slug within the same tcode', async () => {
      await expect(createChapter({ tcodeSlug, ...chapterA }))
        .rejects.toThrow(/already exists/i);
    });

    it('gets chapters by tcode (with/without exercises) and by slug', async () => {
      const plain = await getChaptersByTcode(tcodeSlug);
      expect(plain.map(c => c.slug)).toEqual(expect.arrayContaining([chapterA.slug, chapterB.slug]));
      expect(plain[0]).not.toHaveProperty('exercises');

      const withEx = await getChaptersByTcode(tcodeSlug, { includeExercises: true });
      expect(withEx[0]).toHaveProperty('exercises');

      const single = await getChapterBySlug(tcodeSlug, chapterA.slug, { includeExercises: true });
      expect(single.slug).toBe(chapterA.slug);
    });

    it('updates a chapter', async () => {
      const up = await updateChapter(tcodeSlug, chapterA.slug, { name: 'Chapter A+' });
      expect(up.name).toMatch(/A\+/);
    });
  });

  describe('Exercises CRUD + read patterns', () => {
    it('creates exercises under chapters', async () => {
      const a1 = await createExercise({ tcodeSlug, chapterSlug: chapterA.slug, ...exA1, sortOrder: 1 });
      const a2 = await createExercise({ tcodeSlug, chapterSlug: chapterA.slug, ...exA2, sortOrder: 2 });
      const b1 = await createExercise({ tcodeSlug, chapterSlug: chapterB.slug, ...exB1, sortOrder: 1 });
      expect(a1.slug).toBe(exA1.slug);
      expect(a2.slug).toBe(exA2.slug);
      expect(b1.slug).toBe(exB1.slug);
    });

    it('rejects duplicate exercise slug within a chapter', async () => {
      await expect(createExercise({ tcodeSlug, chapterSlug: chapterA.slug, ...exA1 }))
        .rejects.toThrow(/already exists/i);
    });

    it('reads exercises by chapter and by slug', async () => {
      const listA = await getExercisesByChapter(tcodeSlug, chapterA.slug);
      expect(listA.map(e => e.slug).sort()).toEqual([exA1.slug, exA2.slug].sort());

      const ex = await getExerciseBySlug(tcodeSlug, chapterA.slug, exA1.slug);
      expect(ex.slug).toBe(exA1.slug);
      expect(ex.chapter?.tcode?.slug).toBe(tcodeSlug);
    });

    it('updates an exercise', async () => {
      const up = await updateExercise(tcodeSlug, chapterA.slug, exA1.slug, { name: 'Exercise A1+' });
      expect(up.name).toMatch(/A1\+/);
    });
  });

  describe('Bulk ops: reordering + full retrieval', () => {
    it('reorders chapters within tcode', async () => {
      const res = await reorderChapters(tcodeSlug, [{ slug: chapterB.slug }, { slug: chapterA.slug }]);
      expect(Array.isArray(res)).toBe(true);
      // Ensure the order is applied by re-reading with includeChapters
      const t = await getTcodeBySlug(tcodeSlug, { includeChapters: true });
      const order = t.chapters.map(c => c.slug);
      expect(order[0]).toBe(chapterB.slug);
      expect(order[1]).toBe(chapterA.slug);
    });

    it('reorders exercises within a chapter', async () => {
      const res = await reorderExercises(tcodeSlug, chapterA.slug, [{ slug: exA2.slug }, { slug: exA1.slug }]);
      expect(Array.isArray(res)).toBe(true);
      const list = await getExercisesByChapter(tcodeSlug, chapterA.slug);
      const order = list.map(e => e.slug);
      expect(order[0]).toBe(exA2.slug);
      expect(order[1]).toBe(exA1.slug);
    });

    it('retrieves complete syllabus (all tcodes) and for a specific tcode', async () => {
      const all = await getCompleteSyllabus();
      expect(all.length).toBeGreaterThan(0);
      const one = await getSyllabusForTcode(tcodeSlug);
      expect(one.slug).toBe(tcodeSlug);
      expect(one.chapters?.length).toBeGreaterThan(0);
    });
  });

  describe('Deletion + cascading', () => {
    it('deletes a chapter and then an exercise (should remove individually)', async () => {
      // delete a single exercise first
      await deleteExercise(tcodeSlug, chapterA.slug, exA2.slug);
      await expect(getExerciseBySlug(tcodeSlug, chapterA.slug, exA2.slug))
        .rejects.toThrow(/not found/i);

      // delete a chapter (removes its exercises)
      await deleteChapter(tcodeSlug, chapterA.slug);
      await expect(getChapterBySlug(tcodeSlug, chapterA.slug)).rejects.toThrow(/not found/i);
    });

    it('deletes the tcode (cascades chapters+exercises)', async () => {
      await deleteTcode(tcodeSlug);
      await expect(getTcodeBySlug(tcodeSlug)).rejects.toThrow(/not found/i);
    });
  });
});
