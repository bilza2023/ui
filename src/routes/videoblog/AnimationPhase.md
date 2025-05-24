Here is your `AnimationPhase.md` capturing this breakthrough:

---

### 📄 AnimationPhase.md

## 🌀 Transition: From Overlays to Native Animation Modules

---

### ✅ The Core Insight

We **no longer need animated overlays.** All visual and animated elements now live directly inside the slide’s `items[]` array. Animation is not a separate layer — it’s a timed transformation of any item field.

---

### 🧠 Animation = (field, fn, time, props)

Animations are just timed functions applied to specific fields of an item:

```js
item.animate({
  field: "x",
  fn: "slideIn",
  start: 1,
  end: 3,
  props: { from: 100, to: 500 }
});
```

This attaches a behavior to an item without changing the core item structure.

---

### 🧩 Uniform Engine: `runAnimations(item, currentTime)`

Every item can declare animations. The animation engine is universal:

1. Iterates over item.animations\[]
2. Checks if `currentTime` is within \[start, end]
3. Applies `fn(currentTime, props)` to update `item[field]`

Example use:

```js
visibleItems.forEach(item => {
  runAnimations(item, currentTime); // modifies item in-place
});
```

---

### 🎛️ Presets, Not Layers

We replace overlays with **animation presets** like:

* `"fadeIn"`
* `"blink"`
* `"slideIn"`
* `"pulse"`
* `"zoomBounce"`

Each preset is defined once and reused by any item.

---

### 📐 Visual Ordering via `zIndex`

Use `zIndex` to control draw order. No separate overlay is needed for above/below logic.

---

### 🧹 Benefits

* ✅ Clean and unified render pipeline
* ✅ All animation logic stays reusable and centralized
* ✅ Reduced code complexity (no overlay layering)
* ✅ Easier debugging, saving, AI authoring
* ✅ Perfect alignment with `items[]` contract

---

### 🛠️ Next Steps

* [ ] Define standard animation function format
* [ ] Build `animationPresets.js`
* [ ] Add `animate()` method to all items
* [ ] Add `runAnimations()` inside `DrawEngine`

---

Let me know when to lock this in or start implementing.
