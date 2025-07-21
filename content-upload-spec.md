
# ✅ Taleem Content Pipeline — Final Spec

---

## 1️⃣ WHAT IS OUR NEW PLAN?

### 🔒 Core Principle:

> **SQLite is the single source of truth** for all content (decks, timings, assets).
> DeckBuilder-format is temporary — used only for initial upload, then discarded.

---

### ✅ Finalized Upload & Content Management Pipeline:

**Step 1: Upload Deck**

* Drop DeckBuilder `.js` files into `ui/static/deckbuilderContent/`
* Upload via UI upload page
* System converts to `deck-v1 JSON` and inserts into SQLite
* **Overwrite is blocked** — no risk to timed decks
* DeckBuilder file is deleted post-upload

**Step 2: Validate Images**

* Run image check script to ensure all image paths in deck are present in `/static/images`
* Add missing images manually or via optional image upload page

**Step 3: Index Images**

* Maintain a central `images` table in SQLite

  * `filename`, `prompt`, `uploadedAt`
* AI tools use this index to avoid duplicate generations

**Step 4: Validate Narration**

* Ensure `static/sounds/filename.opus` exists
* No duplication — one file per deck

**Step 5: Timing (Optional, Anytime)**

* UI timing tool updates the deck’s timings
* Marks `isTimed = true` in SQLite
* Deck is now "ready to play"

---

## 2️⃣ WHY THESE DECISIONS WERE TAKEN

**I. Prevent Timing Loss**

* Re-uploading DeckBuilder could overwrite carefully timed decks
  → Solution: discard DeckBuilder after upload

**II. Simplify State Management**

* Managing files (`*.json`, `03deckTimed/`, backups) added confusion
  → Solution: SQLite holds everything centrally

**III. Centralize Asset Intelligence**

* Image + prompt info was floating in JSON files
  → Solution: move to SQLite table (`images`)

**IV. Embrace SQLite’s Strengths**

* A single file handles queries, filtering, versioning, download
  → Perfect for this scale and structure

---

## 3️⃣ THINGS TO DO NEXT

### 🔧 Implementation To-Dos:

I. \[ ] **Move** `deckbuilderContent/` into `ui/static/`
II. \[ ] **Block overwrite** in upload page
III. \[ ] **Add `isTimed` column** to `decks` table
IV. \[ ] **Create `images` table** in SQLite
V. \[ ] **Build optional image upload UI** (phase 2)
VI. \[ ] \[Optional] Add `timedAt` datetime column to track last timing update
VII. \[ ] Write scripts:

* `validate-images.js`
* `validate-sounds.js`
* `image-index-sync.js`

---

This system is now clean, scalable, and production-ready.

Ready to write this to a formal markdown spec file?
