
# Content Studio — Draft Specification (v1)

---

## ✅ Objective

Build a web-based slide deck editor for the Taleem.Help `deck-v1` format.

This tool allows:
- Human authors to create and edit decks manually
- AI-generated decks to be imported and refined
- Real-time visual preview without runtime playback
- Deck saving to SQLite and/or file export

The goal is a static, stable editing environment — not a playback player.

---

## ✅ Core Layout Plan

### Page: `/editor`

I. **Top Navigation Bar**
- Existing component reused
- Buttons: Save, Load, Paste Deck, Export

II. **Main Two-Column Layout**
- Left Panel (10%): Slide list
- Right Panel (90%): Slide editor

---

## ✅ Left Panel: Slide List

- Shows all slides as cards
- Each card shows:
  - Slide index
  - Slide type
  - First content item (if easy)
- Clicking a card selects that slide for editing
- Add Slide button at top
- Delete Slide button per card

---

## ✅ Right Panel: Slide Editor

### I. Toggle View
- View Mode: Static visual layout preview
- Data Mode: Flat form editing of data[]

### II. Data Form
- One universal flat form
- Each row = { name, content, showAt }
- `name` = dropdown (valid types for current slide type)
- `content` = string (or string[] if array type)
- `showAt` = number input

### III. View Mode
- Renders slide statically
- No timing logic, no animation
- Uses known layout per slide type

---

## ✅ Deck Features

### ✅ Load Deck
- Upload `.json` file
- Parse and validate using `zodDeckV1`
- Replace editor state

### ✅ Paste Deck
- "Paste Deck" button opens modal
- Paste `deck-v1` JSON
- Validate + load on success
- Show error on failure

### ✅ Save Deck
- Save current deck to:
  - SQLite (structured save)
  - File export (`.json` or `.js`)

---

## ✅ Deck Format

- Matches frozen `deck-v1` structure
- Includes:
  - `name`, `description`, `tags`, etc.
  - `version: "deck-v1"`
  - `deck: [ { type, start, end, data: [...] }, ... ]`

---

## ✅ What Has Been Decided

- Editor and Player are **strictly separated**
- Form model is flat, not nested
- No dynamic slide-specific editors
- Only one preview mode — static render
- Slide data editing is unified and canonical
- Only `.json` format is accepted in UI

---

## ⏳ Still To Design

- Slide type → allowed names map for dropdown
- Minimal preview layout per slide type
- Database schema (if SQLite is used)
- Export options: JSON vs JS
- Image asset management UI

---

## 🔜 Future Plans

- Slide reorder UI (drag/drop)
- Multi-slide batch editing
- Meta builder integration
- AI tools for auto-summarizing slides
- File management dashboard

---

# 🔒 Summary

**Content Studio** will be the official visual authoring tool for `deck-v1` decks.  
It provides structured editing, safe import/export, and static preview — optimized for AI-human collaboration.
```
