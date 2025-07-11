
# DeckBuilder API (v1)

## ✅ Objective

Provide a programmatic interface for generating valid `deck-v1` objects. DeckBuilder calls should:

1. Use only the **20 canonical slide types**  
2. Assign correct `name`, `content`, and `showAt` fields  
3. Sequence timing via `start` (injected) and `end`  
4. Wrap the result in a `{ version: "deck-v1", slides: [...] }` object  

---

## ✅ Top-Level Format

Every deck must be exactly:

```ts
{
  version: "deck-v1",
  slides: [
    {
      type: string,      // one of the 20 canonical types
      start: number,     // injected by DeckBuilder
      end: number,
      data: Array<{
        name: string,
        content: string | number | string[],
        showAt: number,
        // For eq only: spText, spMath, spImage, spHeading
      }>
    },
    // …
  ]
}
```

---

## ✅ 20 Canonical Slide Types

1. `titleSlide`  
2. `titleAndSubtitle`  
3. `bulletList`  
4. `twoColumnText`  
5. `imageSlide`  
6. `imageWithTitle`  
7. `imageWithCaption`  
8. `imageLeftBulletsRight`  
9. `imageRightBulletsLeft`  
10. `table`  
11. `statistic`  
12. `donutChart`  
13. `bigNumber`  
14. `barChart`  
15. `quoteSlide`  
16. `quoteWithImage`  
17. `cornerWordsSlide`  
18. `contactSlide`  
19. `eq`  
20. `fillImage`

---

## ✅ Slide Construction Rules

### Timing

* `start`: injected from the previous slide’s `end`
* `end`: required when defining the slide  
* `showAt`: must satisfy `start ≤ showAt ≤ end`  
* Omitted `showAt` defaults to `start`

### Data Array

Each entry must include:

```ts
{
  name: "title" | "bullet" | "line" | "bar" | ...,
  content: string | string[] | number,
  showAt: number
}
```

---

## ✅ EQ Slides (flat format)

Use flat `data[]` entries with special `sp*` types for sidebar items.

```ts
deckbuilder.s.eq(50, [
  { type: "math", content: "E = mc^2", showAt: 10 },
  { type: "spHeading", content: "Einstein's Law" },
  { type: "spText", content: "Energy-mass equivalence" },
  { type: "spImage", content: "/img/box.webp" }
]);
```

This will be transformed into:

```ts
{
  type: "eq",
  start: 0,
  end: 50,
  data: [
    {
      name: "line",
      type: "math",
      content: "E = mc^2",
      showAt: 10,
      spItems: [
        { type: "spHeading", content: "Einstein's Law" },
        { type: "spText", content: "Energy-mass equivalence" },
        { type: "spImage", content: "/img/box.webp" }
      ]
    }
  ]
}
```

---

## ✅ Builder API

All slides:

```ts
deckbuilder.s.titleSlide(10, [
  { name: "title", content: "Hello", showAt: 0 }
]);

deckbuilder.s.eq(30, [
  { type: "text", content: "Definition", showAt: 10 },
  { type: "spText", content: "Context or notes" }
]);
```

Call `deckbuilder.build()` to output the final deck object.

---

## ✅ Validation

```ts
import { zodSchemaV1 } from 'deckbuild';
zodSchemaV1.parse(deck); // top-level validation
```

---

## 🔒 Freeze Notice

This `deck-v1` format is locked. Any changes will be published under `deck-v2`.
````
