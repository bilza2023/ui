// DeckDoctor.js
import { zodAQuestionV1 } from "./ZodAQuestionV1.js";


  /** Pure schema check (no mutation) */
  export function validate(deck) {
    const r = zodAQuestionV1.safeParse(deck);
    return r.success ? { ok: true, value: r.data } : { ok: false, errors: r.error.issues };
  }
