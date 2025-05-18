
# 🧱 Assets Architecture (SlimPlayer)

This document explains the architecture of the **Assets** system used in `SlimPlayer` — a minimal, offline-first canvas rendering engine.

---

## 🎯 Purpose

The `Assets` object provides all **visual resources** required for rendering slides — including:

* Background images
* Sprite sheets
* Icons
* (Optional) runtime-loaded user images

> All base assets are **precompiled and embedded as base64** to avoid async loading and external dependencies.

---

## 🧠 Runtime Behavior

* `Assets.getBackgroundImage(name)` → Returns a base64 image string
* `Assets.getSprite(name)` → Returns a full Sprite object (with base64 image + metadata)
* `Assets.images` → A `Map` of runtime-loaded images (used for `CanvasImage` items)

  * If a required image is missing → a fallback gray box + error text is drawn

---

## 📦 Components & Files

### ✅ Core Files

* `Assets.js` — main export
* `loadBackgroundImages.js` — loads base64 backgrounds into a Map
* `loadSprites.js` — loads Sprite objects into a Map
* `Icons.js` — icon dictionary

### ✅ Supporting Modules

#### Sprites

```
spriteObjects/
├── Sprite.js
├── students.js
├── people.js
├── alphabets.js
└── figs.js
```

Each file exports a new `Sprite(name, base64)` with `.addItem(...)` metadata

#### Background Images

```
bgImages/
├── black_mat.js
├── paper01.js
├── drywall.js
├── wood.js
└── ... (all base64 strings)
```

Each file exports a single `export default "data:image/png;base64,..."`

---

## ✅ Advantages

* No fetches, no async
* Works offline
* Works in `index.html` with just one import: `import Assets from './Assets.js'`
* Graceful handling of missing user images
* Clean separation of AI/user-provided content and static assets

---

## 📌 Summary

The Assets system is a **sealed visual dictionary** that ensures the SlimPlayer can run anywhere — locally or embedded — with full graphical fidelity.

> As long as a valid slide JSON is provided, and Assets is injected, rendering will always succeed.

This architecture turns your draw engine into a fully independent, testable visual runtime.

---

**Alhamdulillah. This structure is final.**
