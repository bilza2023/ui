
Here’s the documentation for the `barGraph` component:

---

## 📄 `barGraph` Component

### 🔹 What It Does

The `barGraph` component renders a horizontal set of vertical bars, proportionally scaled to each value. Labels are shown below the bars.

**Type:** `full`

---

### 🔹 Data Format

Each bar is defined like this:

```js
[
  { value: 80, label: "Math", color: "#e67e22" },
  { value: 65, label: "Physics", color: "#2980b9" },
  { value: 95, label: "Biology", color: "#27ae60" }
]
```

* `value`: (number) Height of the bar
* `label`: (string) Label shown under the bar
* `color`: (string) Optional hex color override
* `showAt`: (number) Optional future support for animation

---

### 🔹 Config Options

```js
{
  maxValue: 100,           // max height normalization
  height: 240,             // bar area height
  barPadding: 16,
  barColor: "#00ffaa",     // fallback color
  fontSize: 22,            // label font size
  maxBarWidth: 28,         // limits bar width
  labelFontSize: 20        // spacing control
}
```

---

### 🔹 Where to Use

* Comparing performance metrics
* Visualizing scores or marks
* Grouped data comparisons

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Normalize scales with `maxValue`
* Keep labels short
* Align color with your theme or use per-bar color

#### ❌ Don’t:

* Use more than 8 bars (will cramp)
* Use long labels—they may wrap
* Forget contrast—bars should stand out from background

---

### 🔹 Design Guidance

* **Font size:** 18–24px
* **Bar width:** 16–28px depending on spacing
* **Max characters per label:** 6–10
* **Best use case:** 3–6 categories with clear value gaps

---

You're now fully documented across the core chart and text components. Want to create a master index, or continue with half variants like `halfImage` or `halfBullets`?
