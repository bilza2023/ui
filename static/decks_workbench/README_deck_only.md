

# ✅ Taleem Deck Workflow (Deck-Only Edition)

This project is now focused **entirely** on building decks based on research + images. All coding, Svelte components, and anchor scripts are removed.

---

## 🎯 Objective

Build high-quality `deck-v1` presentations using:

- ✅ PDF-based math concept discussions
- ✅ 1–2 meaningful images per concept
- ✅ Clean slide structure using `DeckBuilder.js`

---

## ✅ Workflow (3 Simple Steps)

### Step 1: Discuss Concept  
Pick a topic from the PDF — theorem, definition, identity, etc.  
Focus on clarity + visual explanation (no narration).

### Step 2: Select/Generate Visuals  
Choose:
- A clean SVG or prompt image
- Optional sidebar notes/headings

### Step 3: Build Deck  
Use `DeckBuilder.js` and the flat API:
```js
deckbuilder.addDetails({...});
deckbuilder.setBackgroundImage(...); // optional
deckbuilder.s.titleSlide(...);
deckbuilder.s.eq(...); // or imageLeftBulletsRight, etc.
````

Export a `.js` file — done.

---

## ✅ Supported Slide Types

You may use only the clean **production-ready** slides:

* `titleSlide`
* `eq`
* `imageLeftBulletsRight`
* (others optional but deprioritized)

See `api.md` and `eq.md` for examples.

---

## ✅ Timing Rules (Optional)

If you want timed appearance:

* Use `showAt` on lines (not on `sp*`)
* Obey timeline rules from `timings.md`
* `deckbuilder.s.eq(endTime, [...])` — you must give `end` explicitly

---

## ✅ Files You Still Use

| File             | Purpose                             |
| ---------------- | ----------------------------------- |
| `Deckbuilder.js` | Main tool for defining deck layout  |
| `eq.md`          | EQ slide flat format guide          |
| `api.md`         | Slide type + metadata API reference |
| `timings.md`     | Optional: slide timing rules        |
| `PDF`            | Main research content               |

---

## ❌ Removed or Deprecated

* Anchor scripts
* Narration planning
* Svelte slide components
* File upload backend
* JSON transformations
* All boilerplate scripts

---

## 🧠 Rule: Filename = Identity

The deck filename is the **unique identity**:

* `/decks/what_is_algebra.js`
* `/images/what_is_algebra_1.svg`
* `/output/what_is_algebra.json`

---

## 🔒 Freeze Notice

This deck system is frozen as `deck-v1`. Future animation/timing enhancements will launch in `deck-v2`.

```
