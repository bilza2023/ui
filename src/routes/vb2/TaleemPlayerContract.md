## 📄 `deckbuilder-contract.md`

**Taleem Player Slide Format Contract (v1.0)**
*This document defines the locked input/output contract for creating slides for the Taleem Player system.*

---

### 🧱 Overview

This contract allows:

* Slide creation via `DeckBuilder`
* Template-based slide reuse
* AI-generated slide authoring
* Long-term backward compatibility

This **does not freeze implementation** — it freezes **external expectations**.

---

## 🧹 Slide Contract

Each slide returned by `DeckBuilder.build()` must follow:

### 🔹 Required Top-Level Fields:

```js
{
  startTime: number,     // e.g., 0
  endTime: number,       // e.g., 5
  background: object,    // see background contract
  items: array           // see items contract
}
```

---

### 🔹 `background` Contract

```js
{
  backgroundColor: string or number   // required
  // (e.g., "#000000" or 0x000000)
  // optional fields (if supported later): backgroundImage, pattern, opacity
}
```

---

### 🔹 `items` Contract

Each item must be an object:

```js
{
  data: {
    type: string     // required (e.g., "text", "icon", "rect", etc.)
    x: number        // required
    y: number        // required
    ...other fields based on item type
  }
}
```

#### 🔺 Required Fields in `data` (for all items):

* `type`: `"text"`, `"icon"`, `"rect"`, etc.
* `x`, `y`: pixel positions

#### 🔺 Optional Universal Fields:

* `rotation`, `visible`, `zIndex`
* `showAt`: time-based visibility

#### 🔺 Type-Specific Fields:

These vary by `type` and follow the drawItem() contracts.
(e.g., `text` requires `text`, `fontSize`, `color`, etc.)

---

## 🧹 Template Function Contract

A template function must have the signature:

```js
function templateFn(globalTheme, data = {}, config = {}, background = {}) => slideObject
```

It must return an object with:

```js
{
  items: [ { data: {...} }, ... ]
}
```

The template should **not** return Pixi objects. It must only return data.

### 🔍 Who Needs This?

* ❌ **Slide authors**: do not need to know or care about this function
* ✅ **Template developers**: must follow this contract
* ✅ **DeckBuilder**: must invoke all template functions using this shape

This contract guarantees that template functions will work in all environments, regardless of internal changes.

---

## 🧹 DeckBuilder API Contract

```js
const deck = new DeckBuilder({ globalTheme });

deck.addSlide(templateFn, {
  data: { ... },        // optional
  config: { ... },      // optional
  duration: number      // required (in seconds)
});

const slidesData = deck.build();
```

---

### 🚫 What Is NOT Allowed

* `items` as raw Pixi objects
* Missing `startTime` / `endTime`
* `drawText()` or `drawX()` calls inside templates
* Using deprecated fields like `startAt` / `endAt`

---

### ✅ What Can Change Internally (Safe to Evolve)

* How `DeckBuilder` injects theme/background
* How defaults are handled inside templates
* How `drawItem()` maps to `drawX()` functions
* How `SlideBuilder` assembles the slide

---

## 🔐 Versioning Notes

This is **v1.0** of the slide contract.
Any future additions:

* Must be optional
* Must not break existing slides

This document is the first file any contributor or AI system should read before working with the Taleem Player architecture.
