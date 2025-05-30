Here’s the documentation for the `quote` component:

---

## 📄 `quote` Component

### 🔹 What It Does

The `quote` component displays a multi-line centered quotation with optional fade-in timing for each line and a separate author attribution below the quote.

**Type:** `full`

---

### 🔹 Data Format

An array of lines in the quote, each with an optional animation time:

```js
[
  { text: "Education is the most powerful weapon", showAt: 1 },
  { text: "which you can use to change the world.", showAt: 2 }
]
```

* `text`: (string) Line of the quote
* `showAt`: (number) Time in seconds to fade in this line

---

### 🔹 Config Options

Supports layout and style customization:

```js
{
  author: { text: "- Nelson Mandela", showAt: 3 },
  fontSize: 48,
  lineHeight: 1.4,
  startY: 140,
  xOffset: 0,
  yOffset: 0
}
```

* `author.text`: Author or attribution caption
* `fontSize`: Font size for quote lines (default: 48)
* `lineHeight`: Line spacing multiplier (default: 1.4)
* `startY`: Vertical starting point for first line
* `xOffset`/`yOffset`: Shifts the layout position

---

### 🔹 Where to Use

* Inspirational or thematic slides
* Emphasizing expert opinions or key ideas
* End-of-section messages

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Use 1–3 lines for impactful delivery
* Include the author to build credibility
* Time `showAt` values for a progressive reveal

#### ❌ Don’t:

* Use very long lines (they’ll wrap unpredictably)
* Display author too soon or without quote
* Change font size without checking vertical alignment

---

### 🔹 Design Guidance

* **Font size:** 36–54px for quote lines
* **Line count:** 2–3 is optimal
* **Author font size:** 24–30px, right-aligned

---

Let me know if you want to wrap these into docs or continue with more like `table`, `barGraph`, or `halfBullets`.
