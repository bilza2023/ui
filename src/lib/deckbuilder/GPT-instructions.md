# DeckBuilder GPT Instructions (v1)

This document defines how to instruct GPT to generate slide decks that follow the `deck-v1` format.

---

## ✅ Objective

GPT should output valid deck JSON that:

* Uses only canonical slide types
* Assigns correct `name`, `content`, `showAt` fields
* Composes valid `data[]` for each slide
* Sequences timing correctly via `start`, `end`

---

## ✅ Top-Level Format

GPT must wrap the result in:

```ts
{
  version: "deck-v1",
  slides: [ { ... }, { ... }, ... ]
}
```

---

## ✅ Slide Construction Rules

Each slide must include:

* `type`: one of 20 known slide types (see `deckbuilder-api.md`)
* `start`, `end`: slide timing in seconds
* `data[]`: array of items with the following fields:

  * `name`: semantic slot name
  * `content`: string (text, image path, etc.)
  * `showAt`: number (relative to slide start)

If `showAt` is missing, `DeckBuilder` will default it to `0`.

---

## ✅ Equation Slides

`eq` slides must be generated via builder pattern only:

```ts
const eq = builder.eq(30);
eq.addLine({ type: "math", content: "x^2 + y^2 = z^2", showAt: 0 });
eq.addSp({ type: "text", content: "Pythagorean" });
```

GPT should never output raw nested JSON for `eq` — use builder calls.

---

## ✅ Strict Validation

All GPT output will be validated against the frozen Zod schema:

```ts
deckV1Schema.parse(deck)
```

This enforces:

* Correct field names
* Allowed values for `type`, `name`
* Proper array and object shapes

---

## ✅ Style Rules for GPT

* Prefer natural phrases over labels (e.g., "What is Algebra?" instead of "Slide 1")
* No decorative output — only valid JSON or `.eq()` calls
* GPT must obey the ordering of slides

---

## 🔒 Freeze Notice

These instructions match `deck-v1` and will remain stable.
Updates (e.g. plugins, custom slide types) will only arrive in `deck-v2` or via external tool wrappers.
