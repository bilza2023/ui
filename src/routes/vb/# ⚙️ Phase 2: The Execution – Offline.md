# ⚙️ Phase 2: The Execution – Offline Factory

## 🏗️ Goal

Set up a **dedicated offline environment** for content production — separate from your live/online app. This is your **workshop**, not your showroom.

---

## 🎯 Philosophy

- Your **online app is the final printout**, not the studio.
- The **offline factory** is where decks are built, fixed, versioned, and validated manually.
- Keep it manual-first: shell scripts, folders, named narration, etc.
- Automation comes _after_ the manual process is solid and understood.

---

## 📦 Offline Factory Components

### 1. 🔁 Player (Preview Engine)

- Pure frontend deck runner
- Loads local `index.js`, plays narration, shows slides
- No backend dependency

### 2. 🧱 DeckBuilder (CLI / Script-driven)

- Scripts for:

  - Creating new decks
  - Validating slide timing
  - Linking audio files (per slide or whole narration)
  - Outputting final `index.js` per deck

### 3. 📁 Project Folder Structure

```
/workshop
├── player/            # Pure viewer, reads deck builds
├── decks/
│   ├── Unit1_Motion/
│   │   ├── index.js
│   │   ├── narration.opus
│   │   ├── images/
│   │   └── script.md
│   ├── Unit2_Force/
│   └── ...
├── builder-scripts/
│   ├── generate.js
│   ├── validate.js
│   └── tools/
```

### 4. 📜 Manual Scripts

- `generate.js`: Compile folder contents into `index.js`
- `validate.js`: Run assertions on `showAt`, endTimes, durations, gaps
- `preview`: Launches local player for visual check

---

## 🧠 Principles for Offline Factory

- All decks start here before publishing
- Everything is editable
- Nothing is auto-uploaded
- Logs + previews ensure clean quality
- Work in folders, not in databases

---

## 🪛 Why This Works

- Offline = safe space to break, fix, and experiment
- No risk to users or app uptime
- Encourages deep version control, testing, feedback loops
- Your **publishing pipeline becomes separate** from your **authoring pipeline**

---

## ✅ Summary

> Your **online app = final output**
> Your **offline workshop = real studio**

This separation gives you:

- Creative speed
- Mistake safety
- Asset reusability
- Controlled publishing

Next: We can design the exact shell commands, naming conventions, and minimal scripts to begin workshop operations.
