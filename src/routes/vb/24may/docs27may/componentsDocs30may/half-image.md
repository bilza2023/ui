Here’s the documentation for the `halfImage` component:

---

## 📄 `halfImage` Component

### 🔹 What It Does

The `halfImage` component displays an image in the **left or right half** of a slide layout, with optional sizing, margin, and animation control.

**Type:** `half`

---

### 🔹 Data Format

The component does **not** use `data`. All configuration is passed via `config`.

---

### 🔹 Config Options

```js
{
  src: "drops.png",      // required
  showAt: 0,             // optional fade-in time
  width: 340,            // optional fixed width
  height: 280,           // optional fixed height
  xOffset: 0,            // shifts image horizontally
  yOffset: 0,            // shifts image vertically
  margin: 20,            // padding inside half area
  x: 0,                  // fine control over base x
  y: 0                   // fine control over base y
}
```

* `src`: Key from `theme.assets`
* `width` & `height`: Custom sizing (else defaults to best fit)
* `xOffset`/`yOffset`: Offset positioning
* `showAt`: Animation entry time

---

### 🔹 Where to Use

* Right/left image alongside `halfBullets`
* Show visual aids with synchronized points
* Illustrate processes, results, or highlights

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Use consistent `margin` to avoid layout imbalance
* Pair with a `half` text component like `halfBullets`
* Respect image aspect ratio if manually setting `width` or `height`

#### ❌ Don’t:

* Use large images that overflow half layout
* Forget to preload images via `theme.assets`
* Position content without testing both halves

---

### 🔹 Design Guidance

* **Recommended width:** 320–400px
* **Max height:** Keep below 300px if paired with text
* **Margin spacing:** 16–24px to avoid edge collisions
* **Fade timing:** Default 1s ease-in

---

With this, you’ve now got clean documentation for both full and half layout components.

Want to generate a markdown documentation folder from all of these?
