import { zodAQuestionV1 } from "./schema/ZodAQuestionV1.js";

/**
 * DeckDoctor: centralized validation, normalization, analysis, transformation, and diffing
 * for deck-v1 objects.
 */
export default class DeckDoctor {
  /**
   * Validate against Zod schema without throwing.
   * @param {unknown} deck
   * @returns {{ok: true, value: any} | {ok: false, errors: import("zod").ZodIssue[]}}
   */
  static validate(deck) {
    const result = zodAQuestionV1.safeParse(deck);
    if (result.success) {
      return { ok: true, value: result.data };
    }
    return { ok: false, errors: result.error.issues };
  }

  /**
   * Normalize known format drift and inject defaults.
   * @param {any} deck
   * @returns {any}
   */
  static normalise(deck) {
    let d = { ...deck };
    d = this._fixLegacyWrap(d);
    d = this._injectDefaults(d);
    // drop deprecated fields
    delete d.audio;
    return d;
  }

  /**
   * Ensure deck.deck.deck → deck.deck
   * @private
   */
  static _fixLegacyWrap(obj) {
    if (obj.deck && obj.deck.deck) {
      return { ...obj, deck: obj.deck.deck };
    }
    return obj;
  }

  /**
   * Inject default background if missing.
   * @private
   */
  static _injectDefaults(obj) {
    const defaultBg = {
      backgroundColor: "#F3E5AB",
      backgroundImage: "/images/taleem.webp",
      backgroundImageOpacity: 0.07
    };
    return {
      ...obj,
      background: obj.background || defaultBg
    };
  }

  /**
   * Check slide and item timing rules.
   * @param {any} deck
   * @returns {{ok: true} | {ok: false, errors: any[]}}
   */
  static checkTimings(deck) {
    const errors = [];
    const slides = Array.isArray(deck.deck) ? deck.deck : [];
    slides.forEach((slide, i) => {
      if (slide.start >= slide.end) {
        errors.push({ slideIndex: i, message: `start (${slide.start}) >= end (${slide.end})` });
      }
      if (i < slides.length - 1) {
        const next = slides[i + 1];
        if (slide.end > next.start) {
          errors.push({ slideIndex: i, message: `end (${slide.end}) > next.start (${next.start})` });
        }
      }
      // items timing
      slide.data.forEach((item, j) => {
        const showAt = item.showAt !== undefined ? item.showAt : slide.start;
        if (showAt < slide.start || showAt > slide.end) {
          errors.push({ slideIndex: i, dataIndex: j, message: `showAt (${showAt}) out of bounds [${slide.start},${slide.end}]` });
        }
      });
    });
    return errors.length ? { ok: false, errors } : { ok: true };
  }

  /**
   * Total duration (seconds) of deck playback.
   * @param {any} deck
   * @returns {number}
   */
  static getTotalDuration(deck) {
    const slides = Array.isArray(deck.deck) ? deck.deck : [];
    if (!slides.length) return 0;
    return slides[slides.length - 1].end;
  }

  /**
   * Find slide active at given time.
   * @param {any} deck
   * @param {number} time
   * @returns {any | null}
   */
  static slideAtTime(deck, time) {
    const slides = Array.isArray(deck.deck) ? deck.deck : [];
    return slides.find(s => time >= s.start && time < s.end) || null;
  }

  /**
   * Strip audio and interactive metadata, keep visuals.
   * @param {any} deck
   * @returns {object}
   */
  static toStaticBackground(deck) {
    const { version, name, description, tags, status, createdAt, editedAt, background, deck: slides } = deck;
    return { version, name, description, tags, status, createdAt, editedAt, background, deck: slides };
  }

  /**
   * Remove any sound-related fields from deck.
   * @param {any} deck
   * @returns {object}
   */
  static withoutSound(deck) {
    // here we treat toStaticBackground as removal of interactive/sound
    return this.toStaticBackground(deck);
  }

  /**
   * Reverse `eq` slides to flat input array.
   * @param {any} deck
   * @returns {Array<object>}
   */
  static flattenEQ(deck) {
    const flat = [];
    const slides = Array.isArray(deck.deck) ? deck.deck : [];
    slides.forEach(slide => {
      if (slide.type === "eq") {
        slide.data.forEach(line => {
          flat.push({ type: line.type, content: line.content, showAt: line.showAt });
          if (Array.isArray(line.spItems)) {
            line.spItems.forEach(sp => flat.push({ type: sp.type, content: sp.content }));
          }
        });
      }
    });
    return flat;
  }

  /**
   * Compare two decks at slide-level.
   * @param {any} deckA
   * @param {any} deckB
   * @returns {Array<object>}
   */
  static diff(deckA, deckB) {
    const diffs = [];
    const a = Array.isArray(deckA.deck) ? deckA.deck : [];
    const b = Array.isArray(deckB.deck) ? deckB.deck : [];
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      if (!a[i]) {
        diffs.push({ type: "added", index: i, slide: b[i] });
      } else if (!b[i]) {
        diffs.push({ type: "removed", index: i, slide: a[i] });
      } else if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
        diffs.push({ type: "changed", index: i, from: a[i], to: b[i] });
      }
    }
    return diffs;
  }

  /**
   * Quick check for deck-v1 shape.
   * @param {any} obj
   * @returns {boolean}
   */
  static isDeckV1(obj) {
    return obj && obj.version === "deck-v1" && Array.isArray(obj.deck);
  }
}
