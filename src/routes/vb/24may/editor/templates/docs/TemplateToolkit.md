
Here is your finalized `TemplateToolkit.md`:

---

# TemplateToolkit.md

25 May 2025

## 🎯 Purpose

The `TemplateToolkit` is a **minimal utility object** designed to help template authors build slide templates quickly, correctly, and declaratively — without hand-coding JSON or animations manually.

It exposes only what matters:

* ✅ Animation presets
* ✅ Theme-aware item builders
* ✅ Valid animation function names (optional)

---

## ✅ What It Includes

### 1. `Anim` – Animation Presets

A collection of **ready-made animation configs**. Each preset returns a full animation object.

```js
Anim.fadeIn(delay = 0, dur = 1)
Anim.slideUp(delay = 0.5, dur = 0.8, dist = 40, easing = "easeOut")
Anim.pulse(delay = 1, dur = 1.2)
```

Each one returns:

```js
{
  fn: "fadeIn",      // or moveY, scale, etc.
  start: <start time>,
  end: <end time>,
  props: { ... }
}
```

Presets **hide complexity** of timelines, easing, and value selection — you just plug them into `item.animate`.

---

### 2. `ItemBuilders` – Theme-Aware Item Creators

Standardized functions to create common items with correct layout, colors, and font choices from `globalTheme`.

```js
ItemBuilders.heading(theme, {
  text: "Welcome",
  x: 100,
  y: 80,
  size: 54
})

ItemBuilders.bullets(theme, {
  list: ["Point A", "Point B", "Point C"],
  x: 150,
  y: 220,
  size: 32,
  lineHeight: 60
})

ItemBuilders.icon(theme, {
  iconName: "ROCKET",
  x: 100,
  y: 100,
  width: 200
})
```

No hand-written JSON. Just generate, customize position if needed, and return the items array.

---

### 3. `AnimationNames` (Optional)

A list of **valid animation function names** for validation, autocomplete, or advanced logic:

```js
AnimationNames.fadeIn
AnimationNames.move
AnimationNames.scale
AnimationNames.showAt
```

---

## 📦 How to Use

Import it once in your slide template:

```js
import { TemplateToolkit as T } from "../templateKit.js";

const heading = T.ItemBuilders.heading(theme, { text: "Hello" });
heading[0].animate = [ T.Anim.fadeIn() ];

return [...heading];
```

---

## ❌ What It Does Not Include

To maintain purity and simplicity, `TemplateToolkit` does **not** expose:

* Raw easing functions
* Tween math functions
* Rendering or drawing logic
* Deck or Player components

---

## 🧠 Philosophy

> Template authors define the *what* — not the *how*.

They should describe layout + animation declaratively.
The system handles drawing, timing, background, and behavior.

---

This toolkit enables scalable, testable, visually consistent templates — without touching the engine.

Ready to build your template library. 🚀
