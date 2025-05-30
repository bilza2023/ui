
## 📄 `pieChart` Component

### 🔹 What It Does

The `pieChart` component renders a full-slide circular pie chart. Each segment is proportionally sized based on value, with a matching color-coded label positioned around the circle.

**Type:** `full`

---

### 🔹 Data Format

This component expects an array of data points where each item includes:

```js
[
  { label: "Category A", value: 40, color: "#e74c3c" },
  { label: "Category B", value: 30, color: "#3498db" },
  { label: "Category C", value: 30, color: "#2ecc71" }
]
```

* `label`: (string) The name of the slice
* `value`: (number) Proportional quantity
* `color`: (string) Hex color for the slice and label

---

### 🔹 Config Options

Optional config object supports:

```js
{
  radius: 120 // (number) pie radius in pixels (default 120)
}
```

* Increasing radius makes the chart larger, but ensure label positions don't collide.

---

### 🔹 Where to Use

* Distribution breakdowns
* Survey results
* Budget or time splits

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Limit to **5–7 segments** for clarity
* Use **distinct colors** per slice
* Use short, recognizable labels

#### ❌ Don’t:

* Overcrowd with too many small slices
* Reuse similar shades for adjacent segments
* Display decimal-heavy percentages

---

### 🔹 Design Guidance

* **Font size:** 18–22px is ideal for slice labels
* **Label length:** 10–14 characters max
* **Best layout:** Centered with minimal padding around edges

---

Let me know which component to document next (e.g., `donutChart`, `barGraph`, etc.). Want this in markdown or HTML export format too?
