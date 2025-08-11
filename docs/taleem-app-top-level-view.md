Here’s your **light, top-level documentation snapshot** for the Taleem App as of **11-Aug-2025** — just names, paths, and roles so we keep AI from “inventing” missing pieces later.

---

## **Taleem App – Top Level Overview**

Repository: `ui` (Svelte app, many small modules and static assets)

---

### **I. Important Routes / Pages**

I. `admin/workdesk` — File upload + deck test area (uses precompiled TaleemSlides CE, no sound).
II. `admin/timings` — Add timings to decks.
III. `player` — Main deck player (intended to use precompiled TaleemSlides).

---

### **II. Scripts**

I. `scripts/validateDeck.js` — Validates deck JSON.
II. `scripts/js2json.js` — Converts `.js` deck to `.json`.
III. `scripts/fixDeck.js` — Fixes deck structure errors.
IV. `scripts/fixNfakeDeck.js` — Fixes deck + generates fake/default timings.

---

### **III. Core Modules**

I. `src/lib/taleemDoctor` — Deck doctor utilities.
II. `src/lib/deckbuilder` — Deck building API/tools.
III. `src/lib/notes` — Notes as Svelte components (instead of plain `.html`).
IV. `src/lib/taleemSlides` — **Main slide system** (current focus of modularization).
V. `src/lib/taleemPlayer` — Legacy player wrapper (may be deprecated).

---

### **IV. Syllabus System**

(Separate from Svelte UI, but inside `ui/`)
I. `syllabus/genSyllabus.js` — Generates final syllabus JSON.
II. `syllabus/fbise9mathold.js` — Example syllabus source file.
III. Output → `static/data/syllabus` — Final syllabus JSON files.

---

### **V. Static Folder Layout**

I. `static/components` — Precompiled components.
II. `static/components/taleem-slides/taleem-slides.js` — Precompiled TaleemSlides.
III. `static/data` — All app-generated JSON data.
IV. `static/svg-picker` — SVG assets for selection.
V. `static/sounds` — Audio files for decks.
VI. `static/images` — Image assets.
VII. `static/decks_workdesk` — Decks for testing in Workdesk.
VIII. `static/decks` — **Final decks** (kept separate from `static/data`).
IX. `static/videoBlog` — Video blog content.
X. `static/blog` — Blog content.

---
