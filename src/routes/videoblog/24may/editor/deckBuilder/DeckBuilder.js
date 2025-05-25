// lib/deckBuilder/DeckBuilder.js

/**
DeckBuilder – single source of truth for assembling a deck.

Fixed behaviour
---------------
1. Inject `globalTheme` into every template call.
2. Maintain a monotonic timeline via absolute `endTime`.
3. Enforce a 2‑second minimum duration and strictly increasing end times.

Extension hooks (future‑proof)
-----------------------------
* **preprocess(items, data)** – runs before items are wrapped into a slide.  Use it to
  auto‑assign zIndex, merge theme presets, or inject narrations.  Must return a (possibly
  mutated) items array.  Defaults to identity.
* **postValidate(slide)** – runs after the slide object is built but before it is stored.
  Perfect spot for a Zod schema check or metadata tagging.  Throw an error to block saving.
*/

export class DeckBuilder {
  constructor({
    globalTheme,
    globalBackground = {},
    designWidth = 1020, // This is where design Resolution live
    designHeight = 576, // This is where design Resolution live
    preprocess = null,
    postValidate = null,
  } = {}) {
    this.globalTheme = globalTheme;
    this.globalBackground = globalBackground;
    this.designWidth = designWidth;
    this.designHeight = designHeight;

    // Hook defaults
    this.preprocess = typeof preprocess === "function" ? preprocess : (items => items);
    this.postValidate = typeof postValidate === "function" ? postValidate : (() => {});

    this.slides = [];
    this.currentStartTime = 0;
  }

  /**
   * @param {Function} templateFn – templateFn(globalTheme, data) => items[]
   * @param {number}   endTime    – absolute end time in seconds
   * @param {object}   data       – optional data object passed to the template
   */
  add(templateFn, endTime, data = {}) {
    const startTime = this.currentStartTime;
    const duration = endTime - startTime;

    if (endTime <= startTime) {
      throw new Error(`Slide endTime (${endTime}) must be after previous slide endTime (${startTime})`);
    }
    if (duration < 2) {
      throw new Error(`Slide duration must be at least 2 seconds (got ${duration})`);
    }

    // Fetch items from template and run pre‑processor hook
    let items = templateFn(this.globalTheme, data) || [];
    items = this.preprocess(items, data, { templateFn }) || [];

    const slide = {
      background: data.background || this.globalBackground || {},
      items,
      startTime,
      endTime,
    };

    // Run post‑validation hook (may throw)
    this.postValidate(slide, data, { templateFn });

    this.slides.push(slide);
    this.currentStartTime = endTime;
  }

  build() {
    const totalDuration = this.slides.length
      ? Math.max(...this.slides.map(s => s.endTime))
      : 0;

    return {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      totalDuration,
      slidesData: this.slides,
    };
  }
}
