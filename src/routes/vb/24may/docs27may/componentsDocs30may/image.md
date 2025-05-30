Here’s the documentation for the `image` component:

---

## 📄 `image` Component

### 🔹 What It Does

The `image` component displays a full-slide image centered in the body area (excluding the header), with optional fade-in animation.

**Type:** `full`

---

### 🔹 Data Format

This component does **not** use the `data` array. It relies entirely on the `config` object.

---

### 🔹 Config Options

```js
{
  src: "whatisforce.webp", // required
  showAt: 2,               // optional fade-in start time (default: 0)
  xOffset: 0,              // optional horizontal shift
  yOffset: 0               // optional vertical shift
}
```

* `src`: (string) Key from `theme.assets` referencing the image texture
* `showAt`: (number) Time in seconds when image fades in
* `xOffset`: (number) Shift image horizontally
* `yOffset`: (number) Shift image vertically

---

### 🔹 Where to Use

* Visual explanation slides
* Full-screen concept illustrations
* Diagram or reference material

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Use high-resolution assets in `theme.assets`
* Combine with bullets or titles for explanation
* Time `showAt` with narration for clarity

#### ❌ Don’t:

* Rely on external URLs—only use preloaded assets
* Stretch images outside default bounds
* Use images with poor contrast against the background

---

### 🔹 Design Guidance

* **Default width:** full design width minus padding (10px)
* **Height:** Based on original asset, defaults to 400px
* **Fade timing:** 1s smooth in by default

---

Ready for `barGraph`, `table`, or `halfImage` next?
