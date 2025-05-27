
# DeckBuilder.md

## Overview

The `DeckBuilder` class is the **central utility** for assembling a timed presentation deck from slide templates.

It enforces structural and timing rules, and provides clean hooks for injecting or validating slide data. The resulting deck is always safe, consistent, and compatible with the Player.

---

## Responsibilities

- Maintains a strictly increasing timeline for slides.
- Ensures every slide is valid and well-formed.
- Allows pre- and post-processing via user-defined hooks.
- Returns a clean `deck` object via `.build()`.

---

## Constructor

```ts
new DeckBuilder({
  preprocess?: (items, data, ctx) => items[],
  postValidate?: (slide, data, ctx) => void
})
````

* `preprocess(items, data, ctx)`: Called **before** wrapping items into a slide.

  * Use it to inject zIndex, narration, animation presets, etc.
* `postValidate(slide, data, ctx)`: Called **after** a slide is built but before it’s stored.

  * Ideal place to run Zod schema validation or metadata tagging.

Both hooks are optional and default to identity/no-op.

---

## Core Methods

### `.add(templateFn, endTime, data = {})`

Adds a new slide to the deck:

```ts
deck.add(templateFn, endTime, data);
```

* `templateFn(globalTheme, data) => items[]`
* `endTime` is an absolute time in seconds
* Duration must be ≥ 2 seconds
* Throws error if timing is invalid

The slide will receive:

```ts
{
  background: data.background || {},
  items,
  startTime,
  endTime
}
```

---

### `.overrideLastSlideBackground(backgroundObj)`

This is the **only sanctioned way** to override a slide's `background` after it has been added.

```ts
deck.overrideLastSlideBackground({
  backgroundColor: "#ffcc00",
  backgroundImage: "bg2.jpg",
  backgroundImageOpacity: 0.4,
  pattern: "dots"
});
```

* Modifies the `background` of the most recently added slide
* Merges with any existing values
* Keeps template code clean by allowing controlled user overrides

---

### `.setDesignWidth(width)` / `.setDesignHeight(height)`

Optional utility methods to update canvas layout dimensions:

```ts
deck.setDesignWidth(1280);
deck.setDesignHeight(720);
```

These are included for completeness and are used in `.build()` output.

---

### `.build()`

Returns the finalized deck object:

```ts
{
  designWidth,
  designHeight,
  totalDuration,
  slidesData: [ { background, items, startTime, endTime }, ... ]
}
```

---

## Slide Structure

Every slide created by `DeckBuilder` follows this format:

```ts
{
  background: {
    backgroundColor: "#xxxxxx",
    backgroundImage?: string,
    backgroundImageOpacity?: number,
    pattern?: string
  },
  items: Item[],
  startTime: number,
  endTime: number
}
```

---

## Design Philosophy

* Templates control layout and logic.
* Builder controls order, integrity, and output format.
* All mutation is controlled via API — no external patching or edits.
* The builder never assumes or enforces theme logic — that is the template’s job.

---

## Version Zero Guarantee

This class is **frozen for Version Zero**. Future features must:

* Preserve the current method names and signatures.
* Extend via new hooks or optional arguments — not breaking changes.
* Never mutate slides after `.add()` except via official override methods.

---
