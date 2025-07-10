Here is:

---

## ✅ FILE 3 — `GPT-instructions.md` (Aligned with flat EQ format and meta rules)

````markdown
# DeckBuilder + Meta GPT Instructions (v1)

This document defines how to prompt GPT to generate complete slide packages—**`deck-v1`** with accompanying **`meta-v1`**—ready for immediate playback.

---

## ✅ Objective

GPT should output an object with both a **deck** and its **meta**:

```ts
{
  version: "deck-v1",
  slides: [ /* slide objects… */ ],
  meta: {
    version: "meta-v1",
    entries: [ /* timing & item/label entries… */ ]
  }
}
```

All generated slides and metadata must pass the strict Zod schemas.

---

## ✅ Top-Level Format

GPT’s final return must look exactly like:

```ts
{
  version: "deck-v1",
  slides: [ /* … */ ],
  meta: {
    version: "meta-v1",
    entries: [ /* … */ ]
  }
}
```

No extra wrappers or commentary.

---

## ✅ Slide Construction Rules

1. **Slide types**
   Use only the **20 canonical types** (see API spec).

2. **Timing**

   * `start`: injected from previous slide’s `end`
   * `end`: provided by the call, in seconds
   * `showAt`: absolute timestamp (in seconds, ≥ `start` and ≤ `end`)
   * If `showAt` is omitted, DeckBuilder will assign `start`

3. **Data items**

   Each item in `data[]` must have:

   * `name`: semantic slot (e.g. `"title"`, `"bullet"`, `"line"`)
   * `content`: string, number, or string array
   * `showAt`: number (omit only if using DeckBuilder default)

4. **EQ Slides (`type: "eq"`)**

   EQ slides are now flat arrays. Use this structure:

   ```ts
   deckbuilder.s.eq(30, [
     { type: "math", content: "x²+y²=z²", showAt: 5 },
     { type: "spText", content: "This is the Pythagorean theorem" },
     { type: "spImage", content: "/images/triangle.png" }
   ]);
   ```

   - Only main lines (`type: "math" | "text" | "heading"`) use `showAt`
   - All following `sp*` items attach to the most recent line
   - No imperative API (`addLine`, `addSp`) is allowed in GPT output

---

## ✅ Meta Construction Rules

1. **Entries**

   One entry per slide:

   ```ts
   {
     label: "introduction",
     end: 12,
     items: [0, 2, 5],
     images: ["/images/chart.png"]
   }
   ```

2. **Label inference**
   Infer from slide title or fallback to `"slide_001"`, `"slide_002"`, etc.

3. **Fields**

   | Field   | Type     | Description                        |
   |---------|----------|------------------------------------|
   | label   | string   | Short identifier for the slide     |
   | end     | number   | Slide end time                     |
   | items   | number[] | All `showAt` values in `slide.data`|
   | images? | string[] | Optional image URLs                |

---

## ✅ Validation

```ts
import { zodSchemaV1, metaV1Schema } from "deckbuild";
zodSchemaV1.parse({ version:"deck-v1", slides });      // Deck only
metaV1Schema.parse(meta);                              // Meta only
```

Or validate combined:

```ts
fullDeck = { version: "deck-v1", slides, meta };
zodSchemaV1.parse(fullDeck); // If schema allows
```

---

## ✅ Style Guidelines

* Use natural, well-written content
* No extra keys — use only defined fields
* Keep slides strictly in timeline order
* No explanations, comments, or wrapper text — raw object only

---

## 🔒 Freeze Notice

This `deck-v1` + `meta-v1` format is locked. Any enhancements will be published under a new version.
````

