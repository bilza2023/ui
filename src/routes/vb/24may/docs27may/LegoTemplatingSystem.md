Below is the cleaned-up, up-to-date **`LegoTemplatingSystem.md`** exactly as we agreed.

---

# 🧱 LegoTemplatingSystem.md

*A minimal, reusable system for building animated slides from composable item-templates. Designed for simplicity, performance, and AI-generation friendliness.*

---

## 1. Core Principles

| Principle                             | Meaning                                                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Templates return only items**       | Internally every template (item-template or slide-template) is just a function that returns `items[]` and a `duration`.          |
| **Flat list, no layers**              | All visuals live in one flat `items[]` array; no groups or containers (Version 2 feature if ever needed).                        |
| **DeckBuilder is the sole assembler** | It stitches templates into slides, assigns start / end times, converts relative animation times to absolute, and enforces rules. |
| **Player is dumb**                    | It receives fully resolved data and simply renders—no calculations, no logic.                                                    |
| **Animations stay subtle**            | This is a learning tool, not a video game; use gentle presets only.                                                              |

---

## 2. Template Contract

### Signature

```ts
template(globalTheme, data = {}) => { items: [...]}
```

* `globalTheme` – colors, fonts, spacing defaults.
* `data` – **optional**; template must work if `{}`.
* `duration` – template’s natural length, **minimum 2 seconds**.

### Simple Example

```js
export function headingFlyIn(theme, data = {}) {
  return {
    items: [{
      id: "headingFlyIn:title",
      type: "text",
      text: data.text ?? "Default Heading",
      x: 100, y: 100,
      animate: [{ name: "fadeIn", start: 0, end: 0.8 }]
    }],
    duration: 2
  };
}
```

---

## 3. Composition Rules

* **Slide-templates** are just collections of item-templates plus optional `shiftTimes()` to stagger elements.
* All item IDs must be namespaced (`templateName:localId`) to avoid clashes.
* `shiftTimes(items, offset)` shifts relative timings before DeckBuilder converts to absolute.

---

## 4. Timing Pipeline

| Layer          | Time Format it Holds                     |
| -------------- | ---------------------------------------- |
| Item-template  | Relative `0 → duration`                  |
| Slide-template | Still relative (after any shifts)        |
| DeckBuilder    | Converts to absolute (adds `startTime`)  |
| Player         | Reads absolute times, renders, that’s it |

DeckBuilder guarantees:

* Sequential slides, no gaps / overlaps.
* All per-item `animate.start` / `end` converted to absolute by adding `slide.startTime`.
* `duration ≥ 2 s`; if template returns `<2`, DeckBuilder upgrades it to 2.

---

## 5. Folder Layout & Exports

```
templates/
  items/
    headingFlyIn.js
    bulletFadeIn.js
    ...
  slides/
    TitleAndBullets.js
    QuoteSlide.js
    ...
  index.js          // exports two collections
utils/
  timing.js         // shiftTimes, scopedId, etc.
```

```js
// templates/index.js
import * as itemTemplates  from './items/index.js';
import * as slideTemplates from './slides/index.js';

export const Templates = {
  items:  itemTemplates,
  slides: slideTemplates
};
```

---

## 6. Animation Philosophy

> **Calm · Focused · Purposeful · Lightweight**

| ✔ Use                                            | ❌ Avoid                                            |
| ------------------------------------------------ | -------------------------------------------------- |
| `fadeIn`, `moveFromLeft`, `scaleIn`, `pulseOnce` | Bounces, spins, fireworks, or anything distracting |
| 1–2 subtle motions per slide                     | Layer storms or complex overlapping keyframes      |

---

## 7. Bottom-Line Guardrails

| Guardrail                                                                                                                         | Rationale |
| --------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **Performance** – keep typical slide under **≈ 10 visible items**; sprite-batch when possible.                                    |           |
| **Complexity** – resist nested containers until a real use-case forces Version 2.                                                 |           |
| **Flexibility** – all build logic stays in DeckBuilder so a future “re-time” pass is trivial.                                     |           |
| **Extensibility** – new abilities arrive as **new item types** or **new animation presets**, **never** by modifying Player logic. |           |

---

## 8. Known Limitations (v1)

* No interactivity (click / hover / branching).
* No nested Z-compositing or masks (reserved for v2).
* Video / GIF embeddings not yet supported.
* Re-ordering slides after build requires running DeckBuilder again (acceptable because slides are fixed to narration like movie scenes).

---

That’s the entire **LEGO-style templating system**—theme + items + animations, nothing more.
You're ready to scale to hundreds of clean, animated slides with confidence.
