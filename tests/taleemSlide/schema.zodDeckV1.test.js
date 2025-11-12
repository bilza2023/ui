
// /home/bilal-tariq/00--TALEEM===>Project/ui/tests/taleemSlide/schema.zodDeckV1.test.js
import { describe, it, expect } from 'vitest';

// If you have $lib alias in vitest, use:
// import { zodDeckV1 } from '$lib/taleemSlides';
import { zodDeckV1 } from '../../src/lib/taleemSlides/index.js';

describe('zodDeckV1 (schema)', () => {
  const minimal = {
    version: 'deck-v1',
    deck: [
      { type: 'titleSlide', start: 0, end: 5, data: [{ showAt: 0, title: 'Hello' }] }
    ]
  };

  it('accepts a minimal valid deck', () => {
    const res = zodDeckV1.safeParse(minimal);
    expect(res.success).toBe(true);
  });

  it('rejects unknown slide type', () => {
    const bad = {
      version: 'deck-v1',
      deck: [{ type: 'notASlide', start: 0, end: 1, data: [] }]
    };
    const res = zodDeckV1.safeParse(bad);
    expect(res.success).toBe(false);
    expect(res.error.issues.map(i => i.message).join(' ')).toMatch(/invalid/i);
  });

  it('enforces svgPointer rule (exactly one base image)', () => {
    const bad = {
      version: 'deck-v1',
      deck: [{
        type: 'svgPointer', start: 0, end: 5,
        data: [{ showAt: 0, type: 'image', src: 'a.webp' }, { showAt: 0, type: 'image', src: 'b.webp' }]
      }]
    };
    const res = zodDeckV1.safeParse(bad);
    expect(res.success).toBe(false);
  });
});
