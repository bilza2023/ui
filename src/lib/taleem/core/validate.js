// DeckDoctor.js
import { zodDeckV1 } from "./zodDeckV1.js";


  /** Pure schema check (no mutation) */
  export function validate(deck) {
    const r = zodDeckV1.safeParse(deck);
    return r.success ? { ok: true, value: r.data } : { ok: false, errors: r.error.issues };
  }
