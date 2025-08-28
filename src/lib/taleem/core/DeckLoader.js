// DeckDoctor.js
import { zodAQuestionV1 } from "./ZodAQuestionV1.js";

export default class DeckDoctor {
  /* ──────────────────────────────  PUBLIC API  ────────────────────────────── */

  /** Pure schema check (no mutation) */
  static validate(deck) {
    const r = zodAQuestionV1.safeParse(deck);
    return r.success ? { ok: true, value: r.data } : { ok: false, errors: r.error.issues };
  }

  /** 🔨  Build = inject defaults + expand EQ + apply sidebar-persistence  */
  static build(rawDeck) {
    let d = structuredClone(rawDeck);
    d = this.#injectDefaults(d);
    d = this.#expandFlatEQ(d);
    return d;
  }

  /* Convenience helpers (unchanged from original file) */
  static checkTimings(deck)  {/* … same as before … */}
  static getTotalDuration(deck){/* … */}
  static slideAtTime(deck,t){/* … */}
  static toStaticBackground(deck){/* … */}
  static withoutSound(deck){/* … */}
  static flattenEQ(deck){/* … */}
  static diff(a,b){/* … */}
  static isDeckV1(obj){ return obj && obj.version === "deck-v1" && Array.isArray(obj.deck); }

  /* ───────────────────────────── PRIVATE HELPERS ─────────────────────────── */

  /** Default background if author omitted it */
  static #injectDefaults(deck) {
    const bgDefault = {
      backgroundColor: "#F3E5AB",
      backgroundImage: "/images/taleem.webp",
      backgroundImageOpacity: 0.07
    };
    return { ...deck, background: deck.background || bgDefault };
  }

  /** Convert flat-EQ → nested-EQ & apply sidebar-memory (sp-persistence) */
  static #expandFlatEQ(deck) {
    const slides = Array.isArray(deck.deck) ? deck.deck : [];
    deck.deck = slides.map(slide => {
      if (slide.type !== "eq") return slide;          // untouched
      const lines      = [];
      let sidebarMem   = null;                        // current sidebar context

      slide.data.forEach(item => {
        // ── 1. Reset marker  ───────────────────────────────────────────────
        if (item.sp !== undefined && Object.keys(item.sp).length === 0) {
          sidebarMem = null;                          // cleared; nothing inherited
          return;                                     // no visible line produced
        }

        // ── 2. New sidebar item (spHeading / spImage / …)  ────────────────
        if (typeof item.type === "string" && item.type.startsWith("sp")) {
          sidebarMem ??= [];
          sidebarMem.push({ type: item.type, content: item.content });
          return;                                     // not a visible line
        }

        // ── 3. Regular visible line  ───────────────────────────────────────
        const line = {
          name:    "line",
          type:    item.type,
          content: item.content,
          showAt:  item.showAt,
          spItems: sidebarMem ? structuredClone(sidebarMem) : undefined
        };
        lines.push(line);
      });

      return { ...slide, data: lines };
    });
    return deck;
  }
}
