Here’s the documentation for the `halfBullets` component:

---

## 📄 `halfBullets` Component

### 🔹 What It Does

The `halfBullets` component renders a vertical list of left-aligned bullet points, typically in the **left half** of a split slide layout.

**Type:** `half`

---

### 🔹 Data Format

Each bullet requires:

```js
[
  { text: "Balanced diet includes variety", showAt: 1 },
  { text: "Hydration is crucial", showAt: 2 },
  { text: "Exercise improves energy", showAt: 3 }
]
```

* `text`: (string) The content of each bullet point
* `showAt`: (number) Time (in seconds) when it fades in

---

### 🔹 Config Options

```js
{
  xOffset: 0,
  yOffset: 0,
  fontSize: 32,
  lineGap: 80,
  leftMargin: 40,
  gapFromTop: 60
}
```

* `xOffset`, `yOffset`: Adjusts bullet origin
* `fontSize`: Controls size of bullet text
* `lineGap`: Spacing between each bullet
* `leftMargin`: Starting X position
* `gapFromTop`: Padding from slide top

---

### 🔹 Where to Use

* Explanatory text paired with visuals
* Left-side narrative in image-text layouts
* Sequential content with optional animation

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Pair with `halfImage` or chart components on the right
* Keep text short for easy readability
* Sync `showAt` with visual reveal

#### ❌ Don’t:

* Use long lines—they may overflow the half layout
* Stack too many bullets (>6), or spacing will feel cramped

---

### 🔹 Design Guidance

* **Font size:** 28–36px
* **Max characters per bullet:** 50–60
* **Recommended lineGap:** 1.8–2.4× font size
* **Text alignment:** always left-aligned for readability

---

Want to follow up with `halfImage`, or build the index for documentation navigation?
