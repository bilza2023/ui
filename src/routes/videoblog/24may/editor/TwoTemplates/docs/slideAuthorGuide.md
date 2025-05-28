# User Slide Guidebook

Welcome to the **User Slide Authoring Guide** — your definitive manual for creating stunning slide-based presentations using our component system.

---

## 🧠 What is a Slide?

A **slide** is a timed visual layout composed of:

* A **header** (optional)
* A **body** (mandatory)
* A **footer** (optional — coming soon)

It is built by combining pre-made **components** using a strict interface:

```js
full(endTime, templateKey, data = [], config = {});
```

or

```js
half(endTime, rightKey, rightData, rightConfig, leftKey, leftData, leftConfig);
```

---

## 📋 Basic Commands

### Set Theme + Background

```js
deck.setGlobalTheme(GlobalThemes.royalBlue);
deck.setGlobalBackground(getDefaultBackground(theme));
```

### Add a Header

```js
deck.addHeader("header", [{ text: "Chapter 1", showAt: 0 }]);
```

### Remove Header for a Slide

```js
deck.clearHeader();
```

---

## 🎨 Slide Types

### 1. Quote Slide

```js
deck.full(10, "quote", [
  { text: "Line 1", showAt: 1 },
  { text: "Line 2", showAt: 2 }
], {
  author: { text: "— Author", showAt: 4 }
});
```

> Animated quote lines followed by an author caption.

---

### 2. Bullets Slide

```js
deck.full(10, "bullets", [
  { text: "Point A", showAt: 1 },
  { text: "Point B", showAt: 2 }
], {
  x: 100, y: 80, lineGap: 60,
  stylePresetKey: "text.bulletSmall"
});
```

> Simple bullet list with animations.

---

### 3. Image Slide

```js
deck.full(10, "image", [], {
  src: "chalkboard",
  showAt: 1,
  layoutMode: "center",
  stylePresetKey: "fullWidth"
});
```

> Full-width image with optional layout styling.

---

### 4. Half Slide (Image + Bullets)

```js
deck.half(10,
  "image", [], { src: "chalkboard", showAt: 1 },
  "bullets", [
    { text: "Fact 1", showAt: 2 },
    { text: "Fact 2", showAt: 3 }
  ], { x: 60, y: 80 }
);
```

> Side-by-side layout — image on right, bullets on left.

---

## 📂 Component Reference

Each component has its own dedicated reference page:

* [quoteComponent.md](#) — layout, config, examples
* [bulletsComponent.md](#)
* [imageComponent.md](#)
* [headerComponent.md](#)
* [halfBulletsComponent.md](#)
* [halfImageComponent.md](#)

---

## 🧱 Adding a New Slide

1. Pick your **component key** from `fullComponents` or `halfComponents`
2. Use `.full()` or `.half()` to add it to the deck
3. Optionally override the header with `.addHeader()` or remove it via `.clearHeader()`

---

## 🛠️ Advanced: Custom Headers

You can style headers with:

```js
{ fontSize, y, stylePresetKey }
```

Example:

```js
deck.addHeader("header", [{ text: "Intro", showAt: 0 }], {
  fontSize: 48,
  y: 30,
  stylePresetKey: "text.heading"
});
```

---

## 📘 Editing Component APIs

To modify or improve a component:

* Open its `.js` file under `components/`
* Update layout or animation logic
* Validate it still matches the interface: `(theme, data = [], config = {})`

---

## ✅ Summary

* Slides are made from components.
* Components are used via `.full()` or `.half()`.
* Headers are global but overridable per slide.
* Every component has a clear API.

You're ready to create beautiful, structured educational slides with complete confidence!
