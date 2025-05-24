## 📦 Taleem Player Input Contract (v1)

This document defines the expected input format for the Taleem Player system. All template authors, slide builders, and editors must generate slide data that conforms to this structure.

---

### 🔹 Top-Level Structure

```js
{
  designWidth: number,        // e.g., 1020
  designHeight: number,       // e.g., 576
  slidesData: Slide[]         // array of slides (see below)
}
```

---

### 🔹 Slide Object Format

```js
{
  startTime: number,          // when this slide starts (e.g., 0)
  endTime: number,            // when this slide ends (e.g., 5)
  background: {
    backgroundColor?: string | number   // optional, default is black
  },
  items: Item[]               // array of visual items to draw
}
```

* All fields are required except `backgroundColor`
* `items[]` must be a flat array (no nesting)

---

### 🔹 Item Format (Minimum Required Fields)

Each item must be a flat object containing at least:

```js
{
  type: string,               // e.g., "text", "icon", "rect"
  x: number,                  // horizontal position
  y: number                   // vertical position
  // ...plus other type-specific fields
}
```

Optional common fields:

```js
{
  width?: number,
  height?: number,
  rotation?: number,
  visible?: boolean,
  zIndex?: number,
  animate?: Animation[]       // optional animation array
}
```

---

### 🔹 Animation Entry Format

```js
{
  field: string,              // e.g., "x", "y", "alpha"
  fn: string,                 // e.g., "moveTo", "fadeIn"
  start: number,              // start time (in seconds)
  end: number,                // end time (in seconds)
  props: object               // custom data for the animation
}
```

* If `animate` is missing, item is treated as static
* `alpha` is applied to the display object (not part of item JSON)

---

### ✅ Summary

* Player reads: `presentationData = { designWidth, designHeight, slidesData }`
* Each slide must define `startTime`, `endTime`, `items[]`
* Items must include at minimum: `type`, `x`, `y`
* Animations are optional but must follow the format if present

This contract is frozen at **v1** and will be respected forever by the Player. Breaking changes, if needed, will only apply to future versions.
