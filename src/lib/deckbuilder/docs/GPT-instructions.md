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
````

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
     If `showAt` is omitted, DeckBuilder defaults it to the slide’s `start`.

3. **Data items**
   Each entry in `data[]` must include:

   * `name`: semantic slot (e.g. `"title"`, `"bullet"`, `"line"`)
   * `content`: string, number, or array of strings
   * `showAt`: number

4. **EQ slides (`type: "eq"`)**
   Must be built with the builder pattern:

   ```ts
   const eq = builder.eq(30);
   eq.addLine({ type:"math", content:"x²+y²=z²", showAt:0 });
   eq.addSp({ type:"text", content:"Explanation here" });
   ```

---

## ✅ Meta Construction Rules

1. **Entries**
   One entry per slide; each entry must include:

   * `label`: string (inferred or provided)
   * `end`: slide’s `end` time
   * `items`: array of that slide’s `showAt` times
   * `images?`: optional image URLs

2. **Label inference**
   Use slide titles or fallback to `"slide_XXX"`.

3. **Example entry**

   ```ts
   {
     label: "introduction",
     end: 12,
     items: [0, 2, 5],
     images: ["/images/chart.png"]
   }
   ```

---

## ✅ Validation

After generation, run:

```ts
import { zodSchemaV1, metaV1Schema } from "deckbuild";
zodSchemaV1.parse({ version:"deck-v1", slides, meta: undefined }); // deck only
metaV1Schema.parse(meta);                                         // meta only
```

Or validate the combined object with your integrated schema if available.

---

## ✅ Style Guidelines

* **Natural phrasing**: slide content should read like real text.
* **No extra keys**: only include fields defined by the schemas.
* **Ordering**: slides must be in chronological order; meta entries must match slides one-to-one.
* **No commentary**: output must be pure JSON/JS object.

---

## 🔒 Freeze Notice

This combined `deck-v1` + `meta-v1` format is locked.
Any future enhancements will be under a new version (e.g. `deck-v2`, `meta-v2`).

