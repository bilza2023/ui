# DeckBuilder API Documentation

This document explains how to use the `DeckBuilder` class to compose, time, and thematically style your slides in a DeckBuilder-based presentation. It reflects the updated `deck.full()` signature and provides detailed examples and clarifications.

---

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Global Configuration](#global-configuration)
4. [`deck.full()` Method](#deckfull-method)

   * Signature
   * Parameters Explained
   * Example Usage
5. [Background Overrides](#background-overrides)
6. [Global Background Patterns](#global-background-patterns)
7. [Internal Workflow](#internal-workflow)
8. [`build()` Method](#build-method)
9. [FAQ & Next Steps](#faq--next-steps)

---

## Overview

`DeckBuilder` serves as the orchestrator for:

* Managing **global theme** and **global background** settings.
* Accumulating slides with precise **timing** (`startTime`/`endTime`).
* Injecting **theme values** and **background layers** into each slide's JSON.

After adding slides, calling `build()` returns a ready-to-render presentation object.

---

## Setup

Import and instantiate:

```js
import { DeckBuilder } from './DeckBuilder.js';
const deck = new DeckBuilder();
```

Make sure you have registered your templates in your `fullComponents` registry and that you have utility modules:

* `backgroundUtils.js` (provides `cloneBackground`)
* `themeUtils.js` (provides `applyTheme`)

---

## Global Configuration

Before adding slides, configure your deck:

```js
// 1. Set a global theme (fonts, colors, spacings, etc.)
deck.setGlobalTheme(myTheme);

// 2. Derive or modify a default background
const defaultBg = getDefaultBackground(myTheme);
deck.setGlobalBackground(defaultBg);
```

* **`setGlobalTheme(theme)`** stores a reference to your theme object.
* **`setGlobalBackground(bg)`** stores the base background that every slide will clone.

---

## `deck.full()` Method

### Signature

```js
full(
  endTime,       // Number: absolute end time (in seconds) for the slide
  templateKey,   // String: key to look up a template function in fullComponents
  data = {},     // Object: template-specific data payload
  overrideBg = {}// Object: optional per-slide background overrides
)
```

> **Note:** The **first argument** is now `endTime`, not `templateKey`.

### Parameters Explained

1. **`endTime`** (`Number`)
   The absolute presentation time (in seconds) when this slide should end. Internally, `startTime` is the previous slide’s `endTime` (or `0` for the first slide).

2. **`templateKey`** (`String`)
   Lookup key in your `fullComponents` object. Must map to a function of signature `(globalTheme, data) => SlideItem[]`.

3. **`data`** (`Object`, optional)
   Passed directly to the template function. Contains slide-specific content (e.g., text lines, images, timings).

4. **`overrideBg`** (`Object`, optional)
   Shallow-merged onto the cloned global background. Use to override `pattern`, `backgroundColor`, `backgroundImageOpacity`, etc.

### Example Usage

```js
// Add a full-width quote slide that ends at 10s

deck.full(
  10,           // endTime (seconds)
  'quote',      // templateKey → quoteComponent in fullComponents
  {             // data
    lines: [
      { text: "“The ink of the scholar",        showAt: 1 },
      { text: "is more sacred",                 showAt: 2 },
      { text: "than the blood of the martyr.”",  showAt: 3 }
    ],
    author: { text: "— Prophetic Tradition",      showAt: 4 }
  }
);
```

If you need a background override:

```js
deck.full(
  20,
  'quote',
  quoteData,
  { pattern: 'stripes', backgroundColor: '#fafafa', backgroundImageOpacity: 0.3 }
);
```

---

## Background Overrides

Per-slide overrides merge onto a **deep clone** of the global background:

1. `cloneBackground(baseBackground, overrideBg)`
2. Returns a new object with all base properties plus your overrides.

Use this to tweak patterns, colors, or opacity on individual slides without altering the global setting.

---

## Global Background Patterns

To set a default pattern/color for all slides:

```js
const globalBg = getDefaultBackground(myTheme);
globalBg.pattern = 'dots';
deck.setGlobalBackground(globalBg);
```

Every slide you add will use `'dots'` unless overridden.

---

## Internal Workflow

When you call `deck.full()`:

1. **Template Lookup:** Retrieve your template function from `fullComponents`.
2. **Item Generation:** Call `compFn(globalTheme, data)` → raw items array.
3. **Theming:** Wrap items with theme metadata via `applyTheme(rawItems, globalTheme)`.
4. **Timing Allocation:** Compute `startTime` (previous end) → `endTime`; enforce minimum duration (default 2s).
5. **Background Cloning:** `cloneBackground(globalBackground, overrideBg)`.
6. **Slide Storage:** Push `{ background, items, startTime, endTime }` into `deck.slides`.

This ensures each slide JSON contains everything needed for render: theme, background layers, content items, and timing.

---

## `build()` Method

Once all slides are added:

```js
const presentation = deck.build();
```

Returns:

```js
{
  designWidth: 1020,
  designHeight: 576,
  totalDuration: Number,    // max endTime across slides
  slidesData: [             // Array of slide objects
    { background, items, startTime, endTime },
    ...
  ]
}
```

Pass this object directly into your player or rendering pipeline.

---

## FAQ & Next Steps

* **Q:** *Can I remove the theming step since my templates bake in styles?*
  **A:** Yes—if you prefer, skip calling `applyTheme` and have templates inline all needed style props.

* **Q:** *I want header + body separation. How?*
  **A:** Consider splitting `fullComponents` into separate `headerComponents` and `bodyComponents`, then create a `deck.slide(headerKey, bodyKey, endTime, data, overrideBg)` wrapper.

* **Q:** *Any other methods besides `full()`?*

  Currently only `full()` (full-width body). You can add `simple()`, `half()`, etc. following the same pattern.

---

*Feel free to ask if any section needs further clarification or if you'd like to cover additional use cases (e.g., multi-part slides, custom timing rules, or dynamic template registration).*
