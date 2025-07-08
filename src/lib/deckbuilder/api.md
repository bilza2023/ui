# DeckBuilder API (v1)

This document defines the frozen v1 API for building slide decks using the DeckBuilder system.

---

## ✅ Overview

DeckBuilder is a hybrid API with:

* Declarative interface for 19 canonical slide types
* Procedural builder interface for `eq` slides
* Auto-timing, validation-safe, and designed for bulk generation

---

## ✅ Usage Summary

```ts
import { DeckBuilder } from "./DeckBuilder";

const builder = new DeckBuilder();

builder.s.titleSlide(10, [
  { name: "title", content: "Welcome", showAt: 0 }
]);

const eq = builder.eq(20);
eq.addLine({ type: "text", content: "x + y = z", showAt: 0 });
eq.addSp({ type: "math", content: "\\text{Explanation here}" });

const deck = builder.build();
```

---

## ✅ Output Structure

```ts
{
  version: "deck-v1",
  slides: [
    {
      type: "titleSlide",
      start: 0,
      end: 10,
      data: [ { name: "title", content: "Welcome", showAt: 0 } ]
    },
    {
      type: "eq",
      start: 10,
      end: 20,
      data: [
        {
          name: "line",
          type: "text",
          content: "x + y = z",
          showAt: 0,
          spItems: [
            { type: "math", content: "\\text{Explanation here}" }
          ]
        }
      ]
    }
  ]
}
```

---

## ✅ Interface

### 1. Declarative

```ts
builder.s.slideType(endTime, dataArray)
```

Valid slide types:

* `titleSlide`
* `bulletList`
* `imageSlide`
* ... (all 19 frozen types)
* `fillImage`

### 2. Procedural (EQ)

```ts
const eq = builder.eq(endTime);
eq.addLine({ type, content, showAt });
eq.addSp({ type, content });
```

Adds line-by-line with nested side panel (`spItems[]`).

### 3. Build Deck

```ts
const deck = builder.build();
```

Returns:

```ts
{ version: "deck-v1", slides: [...] }
```

---

## ✅ Internal Logic

* `start` is auto-filled using internal `currentTime`
* `showAt` is defaulted to 0 if not provided
* `slidesArray` holds final slide list

---

## ✅ Validation

Deck output is 100% compatible with `deckV1Schema` from Zod:

```ts
deckV1Schema.parse(deck)
```

---

## 🔒 Freeze Notice

This API is **frozen for v1**:

* 20 canonical slide types only
* Structure enforced by schema
* All logic forwards-compatible via version field

Future plugins and slide types will arrive in `v2` under a plugin system.
