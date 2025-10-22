
import { describe, it, expect } from 'vitest';
import { listHomeGroups, sortHomeItems, HOME_CATEGORY_ORDER } from '../../../src/lib/api/v1/user/homeApi.js';
import { questions } from '../../../src/lib/services/questionServices.js';
import {
  createTcode,
  createChapter,
  createExercise
} from '../../../src/lib/services/syllabusService.js';

const uniq = (p) => `${p}-${Math.random().toString(36).slice(2, 8)}`;
const mkDeck = (ends = [0]) => ({ deck: ends.map((end) => ({ end })) });

async function seed() {
  const t = await createTcode({ slug: uniq('tc'), name: 'Course Home' });
  const c = await createChapter({ tcodeId: t.id, slug: uniq('ch'), name: 'Chapter H', sortOrder: 1 });
  const e = await createExercise({ chapterId: c.id, slug: uniq('ex'), name: 'Exercise H', sortOrder: 1 });
  return { t, c, e };
}

describe('user/homeApi', () => {
  it('groups questions by homeCategory and sorts within each group deterministically', async () => {
    const { t, c, e } = await seed();

    // create a mix of questions across categories and sort orders
    const q1 = await questions.create({
      tcodeId: t.id,
      chapterId: c.id,
      exerciseId: e.id,
      type: 'deck',
      name: 'Video A',
      deck: mkDeck([0, 2]),
      status: 'published',
      homeCategory: 'videos',
      homeSort: 2,
      homePinned: false
    });

    const q2 = await questions.create({
      tcodeId: t.id,
      chapterId: c.id,
      exerciseId: e.id,
      type: 'note',
      name: 'Blog B',
      note: '<p>Blog</p>',
      status: 'published',
      homeCategory: 'blog',
      homeSort: 1,
      homePinned: true
    });

    const q3 = await questions.create({
      tcodeId: t.id,
      chapterId: c.id,
      exerciseId: e.id,
      type: 'deck',
      name: 'Video C',
      deck: mkDeck([0]),
      status: 'ready',
      homeCategory: 'videos',
      homeSort: 1,
      homePinned: true
    });

    const q4 = await questions.create({
      tcodeId: t.id,
      chapterId: c.id,
      exerciseId: e.id,
      type: 'note',
      name: 'Course D',
      note: 'content',
      status: 'ready',
      homeCategory: 'courses',
      homeSort: 3,
      homePinned: false
    });

    const { order, groups } = await listHomeGroups();

    // verify order includes known categories (only ones present)
    expect(order).toEqual(expect.arrayContaining(HOME_CATEGORY_ORDER));

    // videos group: pinned first (q3), then by homeSort (q1)
    const videoNames = groups.videos.map((x) => x.name);
    expect(videoNames).toEqual(['Video C', 'Video A']);

    // blog group: single pinned item
    expect(groups.blog.length).toBe(1);
    expect(groups.blog[0].name).toBe('Blog B');
    expect(groups.blog[0].pinned).toBe(true);

    // courses group: contains the course card
    expect(groups.courses[0].name).toBe('Course D');

    // verify sortHomeItems stability (pinned → sort → editedAt → name)
    const a = { pinned: false, sort: 1, editedAt: '2024-01-01', name: 'A' };
    const b = { pinned: true, sort: 5, editedAt: '2023-01-01', name: 'B' };
    const cItem = { pinned: true, sort: 1, editedAt: '2023-01-01', name: 'C' };
    const arr = [a, b, cItem];
    arr.sort(sortHomeItems);
    expect(arr[0]).toBe(cItem); // pinned true + lower sort
    expect(arr[1]).toBe(b);
  });
});
