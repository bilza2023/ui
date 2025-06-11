# Video API Reference

This file documents the full API for the `DeckBuilder` class, exported as `video` in the Taleem.Video.DeckBuilder system.

---

## 🎬 DeckBuilder Class

### `new DeckBuilder()`
Creates a fresh slide deck. Internally tracks slides, headers, global theme, and background.

---

## 🌐 Global Setup

### `.setGlobalTheme(theme)`
Sets a global theme object (usually from `GlobalThemes`).

### `.setGlobalBackground(background)`
Sets a global background. Can be derived from theme via `getDefaultBackground()`.

---

## 🏷️ Headers

### `.addHeader(key, items, config?)`
Adds a header to all slides until removed.

```js
deck.addHeader("header", [{ text: "Ch 1", showAt: 0 }], {
  fontSize: 48,
  y: 30
});
```

### `.clearHeader()`
Removes the currently active global header.

---

## 📦 Slide API

### `.full(endTime, templateKey, data = [], config = {})`
Adds a full-slide layout.

```js
deck.full(10, "quote", [...], {...});
```

### `.half(endTime, rightKey, rightData, rightConfig, leftKey, leftData, leftConfig)`
Creates a half-slide with two components.

```js
deck.half(10, "image", [], { src: "chalkboard" }, "bullets", [...], {...});
```

---

## ⚡ Quick Slide Builder (Experimental)

### `.startQuickHalf(endTime)`
Starts buffered half-slide mode.

### `.setLeftHalf(templateKey, data, config)`
Sets left half.

### `.setRightHalf(templateKey, data, config)`
Sets right half.

### `.commitHalf()`
Finalizes and adds the buffered half-slide.

---

## 🧾 Output

### `.build()`
Returns an object:

```js
{
  designWidth: 1020,
  designHeight: 576,
  totalDuration: Number,
  slidesData: [
    {
      startTime,
      endTime,
      background,
      items: [SlideItem, SlideItem, ...]
    },
    ...
  ]
}
```

---

## 🎨 Slide Types

Each type supports different config fields:

### `quote`
```js
{
  author: { text, showAt },
  fontSize, lineHeight, startY, xOffset, yOffset
}
```

### `bullets`
```js
{
  fontSize, lineGap, fontFamily, textAlign, alignment, gapFromTop,
  xOffset, yOffset, containerWidth, color
}
```

### `image`
```js
{
  src, showAt, xOffset, yOffset
}
```

### `table`
```js
{
  fontSize, textAlign, drawBorders, bgColor, cellPadding, x, y
}
```

### `donutChart`, `pieChart`, `barchart`
```js
{
  data: [{ label, value, color }],
  outerRadius, innerRadius
}
```

---

## 🎞️ Animation Behavior

- All components support automatic animation via `showAt`
- Animations are embedded into the `animations[]` array in each item
- Typical default: `alpha` from `0 → 1` over 0.5–1s with `"easeOut"` easing
- You can override or append custom animations by mutating `animations[]` on returned items if needed (advanced use)

---

## 🛠 Notes
- Components follow the shape: `(theme, data = [], config = {}) → SlideItem[]`
- Works best with Pixi.js or similar canvas/WebGL renderers
- Output is serializable and portable

---

MIT © Taleem.Help
