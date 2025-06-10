## 🧭 Taleem.Help Dev-Path: June 2025

### 🔥 Current Phase Todos

* Add at least **20 presentations** (EQs, Canvas — seed the system with real/fake content)
* Standardize the **syllabus page** (make modular, reusable across subjects)
* Improve the **homepage** (clarity, CTA focus, visual upgrade)
* Add **subscriptions** logic (free vs paid access, no payment integration for now)
* Final check for **user login & registration** flow

### 🚀 Next Phase

1. **Tiny Student Studio**
   → MVP UI for selecting topics, seeing progress, possibly "done" marking

2. **Local Storage Save**
   → Playback progress, read status, completion tracking stored on device

3. **Messaging System** *(Core Dev-Path Focus)*
   → Two messages/day per student. Each message becomes potential content.

---

## ✉️ Student Messaging System — Strategic Blueprint

### 📌 Messaging Schema (Locked)

```json
{
  from: "studentId123",
  to: "admin",
  type: "question", // or "suggestion"
  content: "Why is kinetic energy half mv squared?",
  tags: ["physics", "chapter-3", "important"],
  origin: "syllabus/fbise9physics/ch3", // optional
  timestamp: "2025-06-10T00:22:00Z", // optional
  props: {
    // optional and schema-private
  }
}
```

* **No `student-message` type field** — table defines that.
* `type` field is **category**: `question` or `suggestion`
* `tags` are freeform and optional
* `props` is interpreter-owned; others treat as opaque
* If no interpreter exists, message can still be stored, sorted, and displayed

### 🔄 System Flow

* Students send **up to 2 messages/day** (limit = value, focus)
* Messages are saved per student as a **learning trail**
* Workshop downloads, interprets, answers — with interpreter-per-type logic
* **All replies are saved as static `.js` or `.json` files**
* These files **use the exact same message schema**
* Optional: may later upload to DB/table for frontend/API consumption

### 🧠 Strategic Power

* **Single schema powers everything**: MCQs, Q\&A, feedback
* **Workshop is the only place interpreters live** — frontend doesn’t parse props
* **No threads, no chat** — each message is atomic, standalone, complete
* **Future-proof**: just add a new interpreter and type when expanding system

### 🎯 Final Takeaway

> The messaging system is not a feature — it’s a **content creation loop**, a personalized learning log, and a feedback channel all rolled into one. This is where student voice becomes system evolution.

Locked and ready to roll. ✅
## 🧭 Taleem.Help Dev-Path: June 2025

### 🔥 Current Phase Todos

* Add at least **20 presentations** (EQs, Canvas — seed the system with real/fake content)
* Standardize the **syllabus page** (make modular, reusable across subjects)
* Improve the **homepage** (clarity, CTA focus, visual upgrade)
* Add **subscriptions** logic (free vs paid access, no payment integration for now)
* Final check for **user login & registration** flow

### 🚀 Next Phase

1. **Tiny Student Studio**
   → MVP UI for selecting topics, seeing progress, possibly "done" marking

2. **Local Storage Save**
   → Playback progress, read status, completion tracking stored on device

3. **Messaging System** *(Core Dev-Path Focus)*
   → Two messages/day per student. Each message becomes potential content.

---

## ✉️ Student Messaging System — Strategic Blueprint

### 📌 Messaging Schema (Locked)

```json
{
  from: "studentId123",
  to: "admin",
  type: "question", // or "suggestion"
  content: "Why is kinetic energy half mv squared?",
  tags: ["physics", "chapter-3", "important"],
  origin: "syllabus/fbise9physics/ch3", // optional
  timestamp: "2025-06-10T00:22:00Z", // optional
  editedAt: "2025-06-10T02:00:00Z", // required
  props: {
    // type-specific, interpreter-handled only
  }
}
```

* No global `type: student-message` needed — it's implied by table
* `props` is opaque: only interpreter understands it
* `editedAt` is the single source of truth for change tracking

---

## ⚙️ Runtime Logic: The Message Loop

* **Messages are pulled, not pushed** — nothing runs live
* **No sessions, no cache, no database required**
* All interpreters are **pure functions**: `input → output`
* Messages are **self-contained** — if a type is unknown, fallback displays type + content
* `editedAt` is the **recompile signal** — changes trigger reprocessing

Each message becomes a living unit — tasks, quizzes, images, announcements, feedback — without state leakage.

Deletion, completion, or system responses are handled by mutating the message → bumping `editedAt` → reprocessing.

---

## 🧠 Student Studio: The AbdulGPT UI

Student Studio is not a dashboard. It's a **stream of learning**, shaped by messages:

* Milestones (`system_milestone`)
* Result cards (`system_result_card`)
* Canvas snapshots (`canvas_snap`)
* Student questions (`type: question`)
* System replies
* Progress logs (`type: progress`)

All visible in one timeline. Messages are exportable (PDF, HTML, JSON). This is the student’s personal knowledge vault.

---

## 🏷️ Tag Protocol — Four Domains

### ✅ Tag Format: `tags: ["slug1", "slug2"]`

Every tag is part of **one of four domains**, determined by its prefix:

### 1. 🔒 `system_*`

* Added by backend (Workshop)
* Not user-visible or editable
* Examples: `system_hidden`, `system_result_card`, `system_archived`

### 2. 💻 `uiSystem_*`

* Added by frontend logic, triggered by user
* User-visible but not user-typed
* Examples: `uiSystem_delete`, `uiSystem_completed`, `uiSystem_starred`

### 3. 🎓 `user_*`

* Selected by user from a system-defined list
* Examples: `user_pinned`, `user_to_review`, `user_draft`

### 4. ✏️ Freeform (no prefix)

* User-typed
* Not tracked by system, not interpreted
* Examples: `myFav`, `confusing`, `reviseAgain`

These are **non-actionable** and purely for student organization.

### 🔒 Enforcement Rules:

* System uses **prefixes only**, not schema validation
* Interpreters ignore unknown tags safely
* UI restricts input to avoid collisions (i.e., no raw `delete`, no misuse of `system_`)
* Tag mutation always bumps `editedAt`

---

## 🧾 Tag Registry Files

We maintain **three lists**:

### `systemTags.json`

```json
[
  { "slug": "system_result_card", "label": "Result Card" },
  { "slug": "system_milestone", "label": "Milestone" }
]
```

### `uiSystemTags.json`

```json
[
  { "slug": "uiSystem_delete", "label": "Mark for Deletion" },
  { "slug": "uiSystem_starred", "label": "Starred" }
]
```

### `userTags.json`

```json
[
  { "slug": "user_pinned", "label": "Pinned" },
  { "slug": "user_to_review", "label": "To Review" }
]
```

Freeform tags (no prefix) are not listed — user can enter them freely.

---

## 🎯 Final Takeaway

> AbdulGPT Message Bus is not a messaging feature — it’s a **self-contained, pluggable protocol for storing and interpreting learning interactions**.

Every message is a file. Every file has a compiler. Every edit is a recompile.

This is not chat. This is **content + intent, wrapped in a unified envelope** — ready to display, revise, export, and evolve.
