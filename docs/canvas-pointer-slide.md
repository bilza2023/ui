# Canvas Pointer Slide — Spec Layer

## 🎯 Mission

Design a new slide type that renders a **background image with pointer animations** over time. The goal is to guide attention during narration using one or more moving or animated pointer elements.

This slide must:

* Work with the existing deck schema (DeckBuilder-compatible)
* Store timing and position data in `slide_item`
* Allow multiple independent pointers
* Be playable via the existing Player system with no global assumptions

---

## 🔧 Slide Type

* **Slide type**: `canvas`
* **Rendered by**: `CanvasSlide.svelte` (or equivalent)
* **Background image**: comes from the slide-level background or image data item

---

## 🧩 Pointer Definition (One per `slide_item`)

Each pointer is an independent item in the slide’s `data[]` array. It defines:

```json
{
  "name": "pointer",
  "type": "arrow",      // optional visual style
  "showAt": 1,           // when pointer becomes visible
  "hideAt": 6,           // when pointer disappears
  "setAt": [             // timed positions
    { "time": 1, "x": 100, "y": 120 },
    { "time": 3, "x": 200, "y": 180 },
    { "time": 5, "x": 240, "y": 90 }
  ],
  "blink": true,         // optional visual effect
  "wiggle": false        // optional motion effect
}
```

### Required Fields:

* `showAt`: when to appear
* `setAt[]`: at least one timed position

### Optional Fields:

* `hideAt`: when to disappear
* `type`: arrow, circle, dot, crosshair, etc.
* `blink`, `wiggle`: optional flags for canvas animation hooks

---

## 🔄 Playback Behavior

* At each animation frame, Player checks `currentTime`.
* Each `pointer` item is active if `showAt <= currentTime < hideAt`
* The pointer’s position is interpolated from `setAt[]`
* Type controls how it’s drawn (e.g., arrowhead, blinking circle)

---

## 📦 Storage Model

* `slide.type = "canvas"`
* `slide.data[]` contains `pointer` items
* Data is stored in `slide_item.extraJson` → `setAt`, `blink`, `wiggle`, etc.

---

## ✅ Outcome

Once implemented:

* Pointers can be added via UI or manually to any canvas slide
* Editors can control appearance, timing, and movement
* Slide plays smoothly using core Player loop

This is now the **spec layer complete**. Structure and implementation to follow next.
