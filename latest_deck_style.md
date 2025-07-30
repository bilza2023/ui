# ✅ Taleem Deck Style Guide — EQ Slide Edition (v1)

## 🎯 Objective

Define the best practices for building high-quality **`eq` slides** that deliver complete conceptual or theorem explanations with calm pacing, strong visuals, and perfect readability.

---

## 🧱 Default Deck Structure

1. **Slide 1 → `titleSlide` or `imageWithTitle`**

   * Always start with a strong, clean title
   * If a diagram is central to the topic, include it here using `imageWithTitle`

2. **Slide 2 onward → `eq` slides**

   * Use 1–3 images via `spImage`
   * Explain everything with structured, timed content (`heading`, `text`, `math`)

3. **Other slide types (e.g., `imageLeftBulletsRight`, `quoteSlide`)**

   * Use only if absolutely necessary
   * Only for section breaks or special transitions

---

## ✅ EQ Slide Rules

### 1. Sidebar Visuals (spImage)

* Use **1–3 `spImage` items at the top** of the slide
* Load all at once (no `showAt`)
* Do **not** update/change images mid-slide
* Sidebar provides visual stability throughout the proof

### 2. Line Types

| Type      | Use                                       |
| --------- | ----------------------------------------- |
| `heading` | Title for a phase or proof section        |
| `text`    | Explanation or commentary (teacher voice) |
| `math`    | Final results or boxed conclusions        |

### 3. Timing Rules

* Use `showAt` for **every line** (`heading`, `text`, `math`)
* Space out timings for natural pace (no jump cuts)
* Typical slide duration: **60 seconds**

### 4. Max Lines Per Slide

* Hard cap: **50 lines per `eq` slide**
* If more are needed, create a new `eq` slide and reuse sidebar images

### 5. Structural Layout

Each EQ slide should:

* Begin with `spImage[]`
* Group logic under `heading` blocks
* Use `text` to clarify what each step means
* End with a boxed `math` line like:

  ```
  { type: "math", content: "\\boxed{\\text{Hence, proved.}}", showAt: 57 }
  ```

---

## 🔒 Frozen Visual Principles

* **Never animate the side panel** — it's a visual anchor
* **Always use `heading` to break up sections**
* **No more than 3 images per EQ slide**
* **No nested slides or sub-slide tricks** — just linear clarity

---

## 🧠 Why This Works

* 1–3 images = total visual coverage
* 10–50 timed lines = complete logical story
* No transitions = no reset for the brain
* Reader scrolls naturally through a single story

This is now the **canonical Taleem format for visual math instruction and theorem decks.**
