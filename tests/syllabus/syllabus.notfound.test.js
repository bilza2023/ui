import { describe, it, expect } from 'vitest';
import {
  getTcode, getTcodeBySlug,
  getChapter, getChapterBySlug,
  getExercise, getExerciseBySlug
} from '../../src/lib/services/syllabusService.js';

describe('syllabus: not-found returns null', () => {
  it('tcode not found', async () => {
    expect(await getTcode(999999)).toBeNull();
    expect(await getTcodeBySlug('no-such-slug')).toBeNull();
  });

  it('chapter not found', async () => {
    expect(await getChapter(999999)).toBeNull();
    expect(await getChapterBySlug(123456, 'nope')).toBeNull();
  });

  it('exercise not found', async () => {
    expect(await getExercise(999999)).toBeNull();
    expect(await getExerciseBySlug(123456, 'nope')).toBeNull();
  });
});
