Here's the documentation for the `bullets` component:

---

## 📄 `bullets` Component

### 🔹 What It Does

The `bullets` component renders a vertical list of animated bullet points, centered horizontally, with smooth fade-ins based on a `showAt` time.

**Type:** `full`

---

### 🔹 Data Format

Each bullet is defined by:

```js
[
  { text: "Gravity is a force", showAt: 2 },
  { text: "Friction slows motion", showAt: 4 },
  { text: "Inertia resists change", showAt: 6 }
]
```

* `text`: (string) Bullet text
* `showAt`: (number) Time in seconds when the bullet fades in

---

### 🔹 Config Options

You can customize layout, font, and spacing:

```js
{
  fontSize: 32,
  lineGap: 44,
  containerWidth: 820,
  textAlign: "center",  // or "left"
  alignment: "top",     // or "center"
  gapFromTop: 40,
  xOffset: 0,
  yOffset: 0,
  padding: 10,
  fontFamily: "Inter",
  color: "#ffffff"
}
```

---

### 🔹 Where to Use

* Teaching concepts step-by-step
* Presenting key ideas with timing
* Summary or takeaways at the end

---

### 🔹 Do's and Don'ts

#### ✅ Do:

* Time `showAt` values logically with narration or animation
* Use consistent font size and spacing
* Keep line count within 3–6 bullets for readability

#### ❌ Don’t:

* Overcrowd with too many lines or long sentences
* Use low contrast colors
* Skip animation timing—it adds clarity and pacing

---

### 🔹 Design Guidance

* **Font size:** 28–36px
* **Character length:** 40–60 chars max per bullet
* **Best alignment:** `top` for staggered entry, `center` for static reveal

---

Next up? `barGraph`, `table`, `image` or a half variant like `halfBullets`?
