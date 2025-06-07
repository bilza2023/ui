
# Eq Deck Format

This document defines the structure and scripting API for creating equation-based educational slides using the `EqDeckBuilder`. Each deck is made of one or more `eqSlide` objects composed line-by-line with optional side panel content.

---

## 🧱 Core API

### eq.l(content, type)

Adds a new content line to the slide.

- `content`: string – the main content (equation, sentence, heading)
- `type`: `"math"` | `"string"` | `"title"`

#### Example:
```js
eq.l("F = ma", "math");
eq.l("This is Newton’s Second Law", "string");
````

---

### eq.sp(\[...])

Adds one or more side panel items to the **last added line**. This is optional and repeatable.

Each side panel entry is an object with:

* `type`: `"comment"` | `"math"` | `"image"` | `"table"` | `"tableCode"` | `"heading"`
* `content`: string (for all types except image)
* `src`: string (for `image` only)

#### Example:

```js
eq.sp([
  { type: "heading", content: "Force Formula" },
  { type: "comment", content: "Force equals mass times acceleration" },
  { type: "image", src: "rocket" },
  { type: "math", content: "a = Δv / t" }
]);
```

Side panel content is rendered beside the main content during playback.

---

### eq.setGlobalSidePanel(\[...])

Sets a **default side panel** for the entire slide. Each slide will use this unless it has custom `sp`.

#### Example:

```js
eq.setGlobalSidePanel([
  "Chapter 3: Dynamics",
  "Topic: Newton’s Laws",
  "Slide: Law 2 – F = ma"
]);
```

---

### eq.setTheme(nameOrConfig)

Optionally sets a visual theme for this slide.

* Use a string key (e.g. `"darkBlue"`) or a config object with color/font/etc.

---

## ✅ Final Structure Returned by `eq.buildSlide()`

```js
{
  type: "eqSlide",
  theme: "darkBlue",
  sidePanel: [...], // optional, from setGlobalSidePanel or override
  steps: [
    {
      content: "F = ma",
      type: "math",
      sp: [ ... ] // optional, added via eq.sp()
    },
    {
      content: "This is Newton's Second Law.",
      type: "string"
    },
    ...
  ]
}
```

---

## 🔁 Design Rules

* Each line is added with `eq.l()` and appears once in timeline.
* `eq.sp()` always applies to the **last line added**.
* No nested layout logic — structure is flat and declarative.
* Side panels are optional but enhance explanation.
* This format is **AI-friendly**, **human-writable**, and **ready for voice-narrated playback**.

---

## 🌟 Mission Fit

This format supports the Divine Plan — delivering structured, scalable, narratable math content for every student, without needing a UI or complex editor.

```

Let me know when you want to add this to your repo or version it.
```
