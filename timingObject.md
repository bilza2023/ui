# Meta Object Format (metaObject.md)

This document defines the **canonical format** for the `meta` object used in Taleem decks. It is designed to make slide timing, media references (images), and related metadata **centralized, editable, AI-friendly, and durable**. A well-structured `meta` object enables GPT models to inject precise timing and media metadata into slide decks without modifying slide content directly.

---

## ✅ Purpose

The `meta` object centralizes all non-content data for a slide deck:

* **Slide end times**
* **ShowAt timings** for items within each slide
* **Image references** for slides with media
* **Optional labels** for debugging or human readability

It allows for:

* Easy syncing with narration, voiceover, or pacing
* Deferring image assignment until media is ready
* Updating timing or image metadata independently of slide content
* AI-assisted editing or audit of deck tempo and media

---

## ✅ Canonical Format

```js
const meta = {
  slides: {
    slide_name_1: {
      end: <Number>,              // Absolute end time of this slide in seconds
      items: [<Number>, ...],     // ShowAt timings for each item (bullet, label, etc.)
      images?: [<String>, ...],   // Optional array of image URLs in usage order
      label?: <String>            // Optional human-readable descriptor
    },

    slide_name_2: {
      end: 20,
      items: [0, 1],
      label: "Welcome to Physics"
    },

    slide_name_3: {
      end: 30,
      items: [21, 22, 23],
      images: ["/images/chart.png"]
    },

    ...
  }
};
```

> **Note:** The `images` and `label` properties are optional.

---

## ✅ Naming Rules

* Slide names must be **unique, lowercase, underscore-separated**.
* Slide names must **not include numeric prefixes**; use meaningful labels instead (e.g. `welcome_physics`, `branches`, `analysis_chart`).
* Declaration order within `meta.slides` preserves slide sequence.

---

## ✅ Generation Guidelines for GPT

When generating or updating a Taleem deck with a `meta` object:

1. Place the `meta` object **at the top** of the deck file.
2. For each slide:
   - Use `meta.slides.<slide_id>.end` instead of a hardcoded end time.
   - Use `meta.slides.<slide_id>.items[n]` for each `showAt` value.
   - If the slide uses images, reference `meta.slides.<slide_id>.images[k]`.
3. Ensure keys in `meta.slides` match slide identifiers exactly.
4. Optionally include a `label` for clarity in logs or audits.

---

## ✅ Example

```js
const meta = {
  slides: {
    goldstart: {
      end: 10,
      items: [0],
      label: "GoldStart Deck"
    },
    welcome_physics: {
      end: 20,
      items: [0, 1],
      label: "Welcome to Physics"
    },
    analysis_chart: {
      end: 30,
      items: [0, 1, 2],
      images: ["/images/chart.png"]
    }
  }
};

// Usage:
deckbuilder.s.titleSlide(meta.slides.goldstart.end, [
  { name: "title", content: "GoldStart Deck", showAt: meta.slides.goldstart.items[0] }
]);

deckbuilder.s.bulletList(meta.slides.welcome_physics.end, [
  { name: "bullet", content: "Point One", showAt: meta.slides.welcome_physics.items[0] },
  { name: "bullet", content: "Point Two", showAt: meta.slides.welcome_physics.items[1] }
]);

deckbuilder.s.imageSlide(meta.slides.analysis_chart.end, [
  { name: "image", content: meta.slides.analysis_chart.images[0], showAt: meta.slides.analysis_chart.items[0] }
]);
```

---

## 🛑 Anti-Patterns (Do NOT do this)

* ❌ Hardcode `showAt` or `end` values inline once `meta` is declared.
* ❌ Use numeric or positional keys (e.g., `slide01`, `slide02`).
* ❌ Reuse the same slide identifier twice.
* ❌ Omit the `items` array (even if it has one entry).
* ❌ Scatter image URLs throughout slide calls—keep them centralized in `meta`.

---

## ✅ Best Practices

* Keep slide IDs **short and descriptive**.
* Keep `items` in **visual order**.
* Add an `images` array only for slides that render images.
* Use `label` to document non-obvious slide content (quotes, code snippets).

---

## ✅ When to Use `images`

Include `images` when:

* A slide renders one or more `<img>` elements.
* You need to defer image assignment until after deck layout is confirmed.
* You want a preflight check for missing or broken media links.

---

## ✅ Process Context

The `meta` object is created only after the full slide deck is finalized— all content, layout, and audio narration are set. This final step injects synchronization and media metadata without altering the core deck structure.

---

## ✅ Summary

The `meta` object is the single source of truth for slide pacing and media references in Taleem decks. It should be declared at the top of each deck file and used consistently in all `deckbuilder` calls.
