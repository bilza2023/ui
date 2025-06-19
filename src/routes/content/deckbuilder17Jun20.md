
## 📄 Taleem DeckBuilder — v0.1.0 (17 June 2025)

### 🎯 Overview

This marks the **first production-safe release candidate** of the Taleem Slide DeckBuilder.
The system is stable, extensible, and intentionally *boring* — designed for operators, not painters.

---

### 🧱 Core Principles

I. **Slides are finite, known, and schema-locked**
II. **Decks are pure JSON with declarative structure**
III. **Rendering logic is separate from data**
IV. **Type field drives rendering — string-based switch**
V. **Slide types are cheap to create, infinite to reuse**

---

### 🛠️ DeckBuilder API (Minimal Form)

```js
deck.setTheme("royalBlue")
deck.setBackground("rocketLaunch")

deck.s.titleSlide({ ... })
deck.s.donutChart({ ... })
// etc...

const finalDeck = deck.build()
```

---

### 📦 Output Shape (Final Deck Format)

```json
{
  "theme": "royalBlue",
  "backgroundImage": "rocketLaunch",
  "slides": [
    { "type": "titleSlide", "data": [...] },
    { "type": "donutChart", "data": [...] }
  ]
}
```

---

### ✅ Safety Rules

* All data is validated via Zod at entry
* Invalid slide data **explodes on entry** — no silent failure
* `deck.build()` only returns when everything is valid
* Per-slide background overrides are **disabled in this version**
* No layout logic or styling embedded in the deck

---

### 🔐 Stability Commitments

* **Type string** is the binding key — must match render switch
* Data format is locked per slide type
* DeckBuilder generates only valid JSON — never broken output
* Future renderers can consume this without migration

---

This file represents the **end of the canvas era** and the beginning of **deck-defined delivery.**
Store it. Print it. Tattoo it if needed.

---

Want to continue and expand the doc or lock this draft and move to next layer?
