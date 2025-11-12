
// Public barrel for the pure-JS Taleem core

// 1) Canonical schema (single source of truth)
export { zodDeckV1 } from './schema/zodDeckV1.js';

// 2) DeckDoctor namespace (whatever functions you expose there, e.g. apply())
import * as DeckDoctor from './doctor/taleemDoctor.js';
export { DeckDoctor };

// 3) Timings namespace (check/total/shift/scale/generate…)
import * as timings from './timings/timings.js';
export { timings };

// 4) Registry (data-level, derived from schema)
export * as registry from './registry/registry.js';

// 5) EQ transformers (kept inside the same API, still pure JS)
export * as eq from './eq/index.js';

// 6) validate(): strict final gate (schema + timing checks; no mutation)
import { zodDeckV1 as _schema } from './schema/zodDeckV1.js';

export function validate(deck) {
  const errors = [];

  // Schema validation (Zod)
  const parsed = _schema.safeParse(deck);
  if (!parsed.success) {
    // Collect zod issues in a flat, readable form
    for (const issue of parsed.error.issues ?? []) {
      const path = issue.path?.length ? issue.path.join('.') : '(root)';
      errors.push(`[schema] ${path}: ${issue.message}`);
    }
  }

  // Timing checks (best-effort: support either return-array or throw)
  try {
    const t = timings?.check?.(deck);
    if (Array.isArray(t) && t.length) {
      for (const msg of t) errors.push(`[timings] ${msg}`);
    }
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    errors.push(`[timings] ${msg}`);
  }

  return { ok: errors.length === 0, errors };
}
