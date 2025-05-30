Here’s the documentation for the `table` component:

---

## 📄 `table` Component

### 🔹 What It Does

The `table` component renders a structured grid of text cells. It supports both plain row arrays and rows with animation timing and can optionally draw cell borders and backgrounds.

**Type:** `full`

---

### 🔹 Data Format

Accepts either of the following formats:

#### Array of arrays:

```js
[
  ["Name", "Subject", "Marks"],
  ["Ali", "Math", "92"],
  ["Sara", "Physics", "88"]
]
```

#### Array of objects:

```js
[
  { cells: ["Name", "Subject", "Marks"] },
  { cells: ["Ali", "Math", "92"], showAt: 2 },
  { cells: ["Sara", "Physics", "88"], showAt: 4 }
]
```

---

### 🔹 Config Options

```js
{
  fontSize: 28,
  fontFamily: "Arial",
  textAlign: "center",
  textColor: "#ffffff",
  drawBorders: true,
  bgColor: "#333333",
  bgOpacity: 0.3,
  borderWidth: 2,
  cellPadding: 12,
  x: 100,
  y: 100,
  width: 820,
  rowHeight: 60
}
```

* Customize font, layout, background, borders
* Use `drawBorders: true` to show cell rectangles

---

### 🔹 Where to Use

* Subject comparisons
* Score or result breakdowns
* Structured facts or key figures

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Use `drawBorders: true` for clarity
* Align text based on data (e.g. left for names)
* Highlight key rows with config overrides

#### ❌ Don’t:

* Use too many columns—4–5 max for readability
* Use dark backgrounds without adjusting text color
* Forget `cellPadding`—text will be cramped

---

### 🔹 Design Guidance

* **Font size:** 24–32px
* **Ideal column count:** 2–5
* **Max characters per cell:** 20–30
* **Row spacing:** use `rowHeight` around 2.2× `fontSize`

---

Want to wrap with `barGraph`, `halfBullets`, or `halfImage` next?
