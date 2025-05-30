Here's the documentation for the `donutChart` component:

---

## 📄 `donutChart` Component

### 🔹 What It Does

The `donutChart` component renders a full-slide **donut-style chart** with a **right-side legend**. Each segment represents a value proportionally, and the legend lists its label, color, and percentage.

**Type:** `full`

---

### 🔹 Data Format

Expected as an array of segments:

```js
[
  { label: "Operations", value: 40, color: "#e74c3c" },
  { label: "Research", value: 30, color: "#3498db" },
  { label: "Marketing", value: 30, color: "#2ecc71" }
]
```

* `label`: (string) Name of the segment
* `value`: (number) Numeric proportion
* `color`: (string) Hex color for both chart and legend entry

---

### 🔹 Config Options

Optional visual config:

```js
{
  outerRadius: 100, // default: 100
  innerRadius: 60   // default: 60
}
```

* `outerRadius`: Size of the donut from center to edge
* `innerRadius`: Size of the central hole

---

### 🔹 Where to Use

* Budget distribution
* Time allocation
* Survey breakdowns with more clarity via legend

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Use when you need to **explain categories**
* Provide **distinct and consistent colors**
* Keep segment count between 3–6 for readability

#### ❌ Don’t:

* Skip labels (legend becomes unclear)
* Use similar shades for different items
* Shrink chart too much—leave space for the legend

---

### 🔹 Design Guidance

* **Font size:** 20–22px for legend, avoid scaling down below 16px
* **Ideal label length:** 12–18 characters
* **Layout balance:** Ensure right legend area is not too cramped—leave minimum 40% space

---

Would you like to continue with `barGraph` next? Or focus on `table`, `image`, etc.?
