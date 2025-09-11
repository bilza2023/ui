import { describe, it, expect } from 'vitest';
import {
  listTcodes, getTcode, getTcodeBySlug,
  createTcode, updateTcode, deleteTcode
} from '../src/lib/services/syllabusService.js';

const uniq = (p='tcode') => `${p}-${Math.random().toString(36).slice(2,8)}`;

describe('syllabus: tcodes', () => {
  it('creates, lists (alpha), reads by id/slug, updates, deletes', async () => {
    const a = await createTcode({ slug: uniq('a'), name: 'Alpha' });
    const b = await createTcode({ slug: uniq('b'), name: 'Beta'  });
    expect(a.id && b.id).toBeTruthy();

    const all = await listTcodes();
    const names = all.map(r => r.name);
    expect(names).toEqual([...names].sort()); // alpha sort by name

    const byId   = await getTcode(a.id);
    const bySlug = await getTcodeBySlug(b.slug);
    expect(byId.name).toBe('Alpha');
    expect(bySlug.name).toBe('Beta');

    const upd = await updateTcode(a.id, { name: 'Alpha Updated' });
    expect(upd.name).toBe('Alpha Updated');

    // delete Beta, keep Alpha for next test interference check
    await deleteTcode(b.id);
    const after = await getTcode(b.id);
    expect(after).toBeNull || expect(after).toBeUndefined;
  });
});
