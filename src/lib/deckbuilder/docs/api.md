````markdown
# DeckBuilder API (v1)

## ✅ Objective

Provide a programmatic interface for generating valid `deck-v1` objects. DeckBuilder calls should:

1. Use only the **20 canonical slide types**  
2. Assign correct `name`, `content`, and `showAt` fields  
3. Sequence timing via `start` (injected) and `end`  
4. Wrap the result in a `{ version: "deck-v1", slides: [...] }` object  

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
        /* and for eq only: spItems?: Array<{ type, content }> */
      }>
    },
    // …
  ]
}
````

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

## ✅ Slide Construction Rules

* **Timing**

  * `start` is set automatically from the previous slide’s `end`.
  * `end` is provided by your call (must be greater than the injected `start`).

* **Data Array**

  * Each entry in `data` must include:

    * `name`: the semantic slot name (e.g. `"title"`, `"bullet"`, `"line"`)
    * `content`: string, number, or array of strings (depending on type)
    * `showAt`: absolute timestamp (in seconds) when the item appears
  * **EQ slides only** (`type: "eq"`) may include an optional `spItems` array on each `"line"` object:

    ```ts
    {
      name: "line",
      type: "text" | "math" | "heading",
      content: string,
      showAt: number,
      spItems?: Array<{
        type: "text" | "math" | "heading" | "image",
        content: string
      }>
    }
    ```

## ✅ Builder API

Use the **declarative** registry or the **imperative** EQ helper:

```js
// Declarative (all non-eq)
deckbuilder.s.titleSlide(10, [ { name:"title", content:"Hello", showAt:0 } ]);
// …

// Imperative (eq slides)
const eq = deckbuilder.eq(50);
eq.addLine({ type:"math", content:"x^2+y^2=z^2", showAt:0 });
eq.addSp({ type:"text", content:"Pythagorean theorem" });
```

> Calling `deckbuilder.build()` returns the final `{ version, slides }` object.

## ✅ Validation

All decks must pass the strict Zod schema:

```ts
import { zodSchemaV1 } from 'deckbuild';
zodSchemaV1.parse(deck);
```

This enforces correct field names, allowed `type`/`name` values, array shapes, and the top-level `version` literal.

## 🔒 Freeze Notice

This `deck-v1` format is frozen.
Any additions (new slide types, fields, behaviors) will be released as `deck-v2`.
