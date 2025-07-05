Understood. Listening and documenting. Here are your setup notes exactly as described, clarified where necessary:

---

## 📒 Node-Hero + UI App: Finalized Setup Flow

### 1. **Syllabus Creation Happens in Node-Hero**

* You define the syllabus in the admin dashboard.
* This includes creating:

  * **Tcodes** (top-level syllabus)
  * **Chapters** under each Tcode
  * **Exercises** under each Chapter
  * **Questions** under each Exercise
* At this stage, **question content is empty**.

---

### 2. **Question Content Is Uploaded Separately as Files**

* Content files are stored manually under the `files/` directory in Node-Hero.
* Each file contains one question’s content.
* The file format is `deckbuilder` format — i.e. JavaScript arrays of `name/content` items, not raw JSON.

---

### 3. **`load-content` Script Loads Files into SQLite DB**

* This script reads each content file.
* It parses the deckbuilder-style format.
* It converts it to clean JSON and stores it in the `content` field of the corresponding `Question` in SQLite.

---

### 4. **Deck Format is Transformed to JSON**

* DeckBuilder input (JavaScript-style files) → parsed → stored in DB as pure JSON.
* This enables the player to consume the data as static JSON slides.

---

### 5. **SQLite DB Is Copied to UI App**

* Once the DB is ready and populated, you manually or via script:

  * Move `dev.db` from Node-Hero (admin backend)
  * Into the `db/` folder of the SvelteKit-based UI app
* The UI app reads directly from SQLite.
* It has no logic or transformation — it is a **pure shell**:

  * Reads from DB
  * Renders what exists

---
Here’s the clean, final version:

---

## 🧩 UI App = Pure Shell

The UI is a **static shell** that reads from a local SQLite database and renders content. It does not generate, transform, or sync anything.

### ✅ To update the content:

1. **Upload DB file:**
   Use FileZilla to replace `ui/db/dev.db`

2. **Upload assets:**
   Place images and sounds in the appropriate `static/` folders inside `ui/`

3. **Restart the app:**

   ```bash
   pm2 restart all
   ```

That’s it.
No deploy scripts. No build steps. Just update files + restart = system updated.

---
Here’s your rule, clean and ready to paste into your docs:

---

### 📛 **Universal Filename Convention**

> All content files follow this format:

```
<tcode>__<chapter>__<exercise>__<question>
```

This single filename is used across:

| Type    | Example File Path                                |
| ------- | ------------------------------------------------ |
| Content | `content/electricity__basics__ohmslaw__q01.js`   |
| Sound   | `sounds/electricity__basics__ohmslaw__q01.opus`  |
| Image   | `images/electricity__basics__ohmslaw__birds.png` |

Each file name is:

* Globally unique
* Matches its question key in the DB
* Requires no folders
* Carries full identity (`tcode → ch → ex → q`)

This naming is the core of a flat, automatable content system.

---
Here’s your official naming policy for images:

---

## 📛 Image Naming Rule (Finalized)

All image filenames must follow this structure:

```
<tcode>__<chapter>__<short-description>.ext
```

### ✅ Examples:

* `bio9__cells__membrane-zoom.png`
* `math9__algebra__table-example.jpg`
* `chem10__bonds__structure1.webp`

---

### ✅ Rationale:

I. **Traceable** — Each image clearly links to a syllabus section
II. **Reusable** — Can be used across multiple questions
III. **Stable** — Filenames are short, meaningful, and don’t break when content is reorganized
IV. **Immutable** — Once an image filename is referenced, it must never change

---
You're proposing a critical shift — from **user-supplied identifiers** to **system-owned identity generation** — and this is the right move.

---

## ✅ Principle: Identity is System-Owned, Not User-Controlled

Once a content item (tcode, chapter, exercise, question) is created:

> Its `filename` becomes its **permanent, canonical ID**, created once and never changed.

---

## ✅ Rationale

### I. **Filenames Are Contracts**

They are used to:

* Lookup DB content
* Link image/audio assets
* Connect deck files

If a filename changes, **everything breaks**.
So it must be system-controlled from day one.

---

### II. **Name ≠ Filename**

* `name` = user-facing, editable, can contain spaces or formatting
* `filename` = system key, must remain stable and machine-safe

---

## 🔒 Enforced Behavior

| Action                       | Outcome                                     |
| ---------------------------- | ------------------------------------------- |
| User enters name             | System generates `slugified` filename       |
| User edits name later        | `name` changes, but `filename` stays locked |
| Attempt to reuse filename    | System rejects — "filename already exists"  |
| Admin tries to edit filename | Not allowed — it's immutable                |

---

## ✅ DB-Level Implication

Each entity (`Tcode`, `Chapter`, `Exercise`, `Question`) must:

* Store `filename` as a unique, non-editable field
* Enforce uniqueness at creation
* Reject updates to that field explicitly in update logic

---

## 🔁 Summary Statement for Docs

> Filenames are system-assigned at creation and **never change**.
> They act as permanent, globally unique keys used across the database, file system, and frontend.
> Display names are editable, but filenames are **immutable by design**.

---

This decision brings full stability, traceability, and eliminates identity drift — the biggest hidden risk in content systems. Ready to enforce.
