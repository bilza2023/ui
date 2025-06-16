# slide-system-spec-v2.md

**Version**: `v2`  
**Status**: Locked  
**Scope**: Runtime Contract + Slide Data Format  
**Origin**: Rewritten from zero, with full knowledge of what came before — but no inheritance

---

## 🧭 Purpose

Version 2 defines the **complete contract for rendering slides** in the Taleem system.

It is designed to:

- Be self-contained and explicit
- Support declarative content
- Enable animation, narration, and interactivity
- Allow expansion without structural change

This version assumes **no legacy compatibility**.  
It is the only truth until `v3`.

---

## 🔁 Slide Runtime Interface

Every `.svelte` slide receives the following props at runtime:

```ts
export let data; // Array of structured fields (see SSD v2 below)
export let theme; // Optional styling token map
export let currentTime; // Optional timeline second marker (float)
```

No other props are supported.

---

## 📦 SSD v2 — Structured Slide Data

All slide content is passed as an **array of objects**, each defining a single field to render.

### Data Format:

```ts
data: Array<{
  name: string; // Logical field ID (e.g. "title", "quote", "bullet2")
  content: any; // Can be string, array, HTML, image path, etc.
  type?: string; // Optional hint (e.g. "text", "latex", "image")
  start?: number; // Optional: show from this second onward
  end?: number; // Optional: hide after this second
  position?: string; // Optional: layout hint like "top-left"
  style?: object; // Optional: inline CSS overrides
}>;
```

---

### Interpretation Rules:

- `name` and `content` are **required**
- `start` and `end` define visibility window (if `currentTime` is used)
- `type`, `position`, and `style` are available for per-slide logic
- Any field **not used by the slide component is ignored**

Slides are expected to `find()` the fields they need by `name`

---

## 🎨 Backgrounds

- Backgrounds are **managed outside the slide**
- The layout/player can apply `slide.background`, but slides never render backgrounds themselves
- If a slide defines `background`, it becomes the new global background from that slide forward

---

## 🧠 Slide Component Rules

Every slide must:

- Accept `data`, `theme`, `currentTime`
- Render based on the values inside `data`
- Use the `name` field to locate content fields
- Use `start`/`end` if time-based appearance is required

Slides must not:

- Access global state
- Control or query playback
- Change background
- Assume external layout rules

---

## 🧱 Valid Example Slide Data

### Quote Slide:

```ts
data: [
  {
    name: "quote",
    content: "Mathematics is the language of nature.",
    start: 0,
  },
  { name: "author", content: "Taleem AI", start: 1 },
];
```

### EQ Slide (with duration blocks):

```ts
data: [
  { name: "eq1", content: "F = ma", type: "latex", start: 0, end: 3 },
  { name: "eq2", content: "E = mc^2", type: "latex", start: 3, end: 6 },
];
```

---

## 📚 Slide Registry (Definition, not enforcement)

Slides are not registered globally — they self-declare their `type` in the deck.

```ts
{
  type: "quoteSlide",
  data: [ ... ],
  background: { backgroundColor: "#111" }
}
```

Each slide `.svelte` file exists in a predictable folder (e.g. `/slides`)
The player routes `slide.type` → matching component

---

## 📏 Reserved Field Reference

| Field      | Required | Meaning                         |
| ---------- | -------- | ------------------------------- |
| `name`     | ✅       | Unique field ID per slide       |
| `content`  | ✅       | Value to render                 |
| `type`     | ❌       | Hint to differentiate renderers |
| `start`    | ❌       | Appear from this second onward  |
| `end`      | ❌       | Disappear after this second     |
| `position` | ❌       | Layout hint                     |
| `style`    | ❌       | CSS override (inline object)    |

---

## 🔒 Final Rule

This version **defines the full runtime interface** between slide data and render logic.

- The player knows how to time, background, and swap
- The slide knows how to render its own `data[]` according to its logic

If a slide cannot be described using this spec — it is not a v2 slide.

This file will never be edited.
If the model expands — we publish `slide-system-spec-v3.md`.

## 🔒 Agreement Summary (v2 Finalization)

### ✅ “Rewritten from zero…”

This version is a clean slate.  
It carries the wisdom of v1 but **inherits nothing**.  
No back-compatibility. No dual logic paths.  
Only forward momentum.

---

### ✅ Slide Registry = Contract

This registry defines what the system supports.  
Each slide type declares its own data expectations, rendering logic, and visual structure.  
The player’s only job is to route `slide.type` to its matching `.svelte` component.

---

## 🔁 `showAt` → Removed

The `showAt` field from v1 is no longer valid.  
It has been completely replaced by the more expressive `start` (and optionally `end`) fields.

---

## 🧠 Visibility Timing Rules

Each `data[]` item in SSD v2 **may** define `start` and/or `end`:

```ts
{
  name: string;
  content: any;
  start?: number;  // When this item begins to appear
  end?: number;    // When this item should disappear
}
```

### Visibility Logic (default for all slides):

```ts
const visible = !item.start || currentTime >= item.start;
const expired = item.end && currentTime >= item.end;
if (visible && !expired) render(item);
```

### Behavioral Outcomes:

| Timing Fields   | What Happens                              |
| --------------- | ----------------------------------------- |
| Neither         | Item is always shown                      |
| `start` only    | Appears at `start`, never hides           |
| `start` + `end` | Appears from `start`, disappears at `end` |
| `end` only      | Shows from t=0, hides at `end`            |

---

## 🔏 Final Rule

- `start` is the canonical visibility trigger.
- `end` is optional — adds expiration window.
- `showAt` does not exist in this version.
- All slides are expected to interpret `start`/`end` using their own logic.

**This rule is permanent in v2.
If revised, it must be documented in `slide-system-spec-v3.md`.**

```

```
