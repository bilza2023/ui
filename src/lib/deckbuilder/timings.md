# DeckBuilder Timings (v1)

This document defines the **timing model** for all `deck-v1` slide objects.

---

## ✅ Slide-Level Timing

Each slide has:

| Field    | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| `start`  | number | When the slide begins (seconds) |
| `end`    | number | When the slide ends (seconds)   |
| `data[]` | array  | Items shown during the slide    |

DeckBuilder fills `start` automatically using `currentTime`.

Example:

```ts
builder.s.titleSlide(10, [...]); // start: 0, end: 10
builder.s.bulletList(20, [...]); // start: 10, end: 20
```

---

## ✅ Item-Level Timing

Each object inside `data[]` must have:

* `showAt`: when the item appears (relative to slide start)

If missing, DeckBuilder assigns `showAt: 0` by default.

```json
{
  "type": "bulletList",
  "start": 20,
  "end": 30,
  "data": [
    { "name": "bullet", "content": "Item 1", "showAt": 21 },
    { "name": "bullet", "content": "Item 2", "showAt": 22 }
  ]
}
```

---

## ✅ Clock Model

DeckBuilder tracks `currentTime` and advances it after each slide.
This ensures sequential, non-overlapping slides.

```ts
builder.currentTime === 0;
builder.s.titleSlide(10, [...]); // end = 10
builder.s.imageSlide(15, [...]); // start = 10, end = 15
```

---

## 🔒 Timing Rules

| Rule                                   | Enforced by    |
| -------------------------------------- | -------------- |
| `start < end`                          | DeckBuilder    |
| `start` auto-filled from `currentTime` | DeckBuilder    |
| `showAt` filled if missing             | DeckBuilder    |
| All `showAt` within `[start, end]`     | Manual check ✅ |
| Slides must not overlap                | Manual check ✅ |

Use `checkDeckTimings(deck)` (optional helper) for custom validation.

---

## 🧠 Design Principles

* Simplifies narration sync
* Slide timing is predictable and strictly linear
* No slide can backtrack or break temporal flow

This model is frozen and powers all `deck-v1` decks.
