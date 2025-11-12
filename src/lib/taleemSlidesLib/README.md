
# **TaleemSlides JS Core — Technical Overview**

## 1. Purpose

**TaleemSlides** is the pure-JavaScript core of the Taleem platform.
It defines, validates, and normalizes all Taleem “deck-v1” slide data — fully independent of any UI, player, or Svelte code.

Everything that concerns *structure, schema, timing, and consistency* lives here.
Anything that concerns *display, playback, or audio* belongs in the UI or player packages.

---

## 2. Folder Structure

```
taleemSlides/
│
├── schema/                 # Single Zod schema (deck-v1)
│   └── zodDeckV1.js
│
├── doctor/                 # DeckDoctor and helpers (validation + diagnostics)
│   ├── taleemDoctor.js
│   └── taleemDoctor.util.js
│
├── timings/                # Time logic (start/end/showAt)
│   └── timings.js
│
├── registry/               # Schema-derived catalog of slide types
│   └── registry.js
│
├── eq/                     # EQ slide data transformers (flat ↔ expanded)
│   ├── eq.js
│   └── index.js
│
└── index.js                # Public barrel + validate() entry point
```

---

## 3. Core Concepts

### Deck (deck-v1)

A **deck** is the atomic content unit of Taleem — an ordered list of slides with timings and background.

```js
{
  version: "deck-v1",
  background: {
    backgroundColor: "#000",
    backgroundImage: "/img/bg.webp",
    backgroundImageOpacity: 0.3
  },
  deck: [
    { type: "titleSlide", start: 0, end: 5, data: [...] },
    { type: "eq", start: 5, end: 20, data: [...] },
    ...
  ]
}
```

Each slide’s `data[]` items contain the visual or textual content to render, each with its own `showAt` offset.

---

## 4. Public API

Import everything from the root:

```js
import { DeckDoctor, validate, timings, registry, eq, zodDeckV1 } from '$lib/taleemSlides';
```

### 4.1 `zodDeckV1`

The canonical Zod schema for all Taleem decks.
Used internally by `validate()` and `DeckDoctor`, and available for tooling or strict parsing.

---

### 4.2 `validate(deck)`

Final validation gate.

```js
const result = validate(deck);

if (!result.ok) {
  console.log(result.errors);
}
```

* Runs Zod parse (`zodDeckV1.safeParse`)
* Then runs timing checks (`timings.check`)
* Returns `{ ok, errors: string[] }`

---

### 4.3 `DeckDoctor`

A deep diagnostic and normalization tool.

```js
const report = DeckDoctor.validate(deck);

console.log(report.ok);         // true or false
console.log(report.errors);     // detailed diagnostics
console.log(report.warnings);   // non-critical issues
console.log(report.stats);      // slide count, duration, etc.
```

Responsibilities:

* Applies schema and structural checks
* Validates background shape
* Flags bad timings or missing fields
* Reports unknown slide types via `registry`
* Detects malformed SVGPointer slides

---

### 4.4 `timings`

Pure utilities for managing slide timing consistency.

| Function               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `check(deck)`          | Returns warnings for inconsistent timing or overlaps |
| `total(deck)`          | Computes total deck duration                         |
| `shift(deck, seconds)` | Moves all timings forward/backward                   |
| `scale(deck, factor)`  | Rescales durations (e.g. for slower narration)       |
| `generate(deck)`       | Fills in missing start/end/showAt values safely      |

All functions are pure — they never mutate the input deck.

---

### 4.5 `registry`

Runtime catalog derived from the schema.
Lets the system query available slide types without hard-coded constants.

| Function                  | Returns / Use                               |
| ------------------------- | ------------------------------------------- |
| `getTypes()`              | Array of supported type strings             |
| `hasType(type)`           | Boolean (for DeckDoctor checks)             |
| `getContract(type)`       | References to zod nodes for that slide type |
| `getDefaults(type)`       | Safe minimal defaults for slide creation    |
| `register(type, payload)` | Dev-only way to add experimental slides     |

---

### 4.6 `eq`

Converters for **EQ slides** between “flat” authoring form and “expanded” runtime form.

```js
const expanded = eq.expand(flat);
const flat = eq.flatten(expanded);
```

* **Flat input**: easy to write or AI-generate
  `["a² + b² = c²", { math:"x+y"}, { heading:"Important" }]`
* **Expanded output**: matches schema
  `{ name:'line', type:'math', content:'a² + b² = c²', spItems:[...] }`

This ensures EQ content always follows the canonical structure used by the player and schema.

---

## 5. Data Flow Summary

```
[ author / generator ]
        ↓
   DeckBuilder (later)
        ↓
 DeckDoctor.apply()   ←  normalization
        ↓
   validate(deck)     ←  final strict check
        ↓
   timings utilities   ←  adjustments / totals
        ↓
   Player / UI render  ←  outside this library
```

---

## 6. What’s Not in This Library

* No Svelte or visual components (`SlideMap`, `Player`, etc.)
* No Howler audio or playback logic
* No file I/O or database operations
* No network code

This package is **pure, deterministic, testable JS**.

---

## 7. Testing Plan (summary)

We’ll add a `tests/` folder with Vitest and cover:

1. **Schema** — valid decks pass, invalid fail with expected errors
2. **Doctor** — invalid fields produce specific diagnostics
3. **Timings** — edge cases for start/end boundaries
4. **EQ** — flat↔expanded roundtrip equality
5. **Registry** — all types in schema are reported by `getTypes()`

---

## 8. License & Maintenance

* This module should be versioned independently (e.g. `@taleem/core`).
* Semantic version bump when schema or timing logic changes.
* Keep one schema copy only — everything else imports from it.

---

### TL;DR

> The **TaleemSlides** core library is the backbone of all Taleem content.
> It ensures every deck is valid, consistent, and ready for playback — while staying framework-agnostic, lightweight, and fully testable.
