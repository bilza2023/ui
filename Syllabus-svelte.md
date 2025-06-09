# Frontend Plan: `syllabus.svelte` and Syllabus UI System

This plan defines the structure, flow, and component breakdown for implementing the full syllabus navigation UI in the Taleem.Help frontend.

---

## 🎯 Objective

To create a protocol-driven, state-aware UI system that allows users to:

* Browse any tcode syllabus
* View chapter and exercise metadata
* Navigate linearly through chapters/exercises
* Respect subscription locks visually
* Route to proper slide players (`/eq`, `/canvas`, `/md`)

---

## 📦 State Management (inside `syllabus.svelte`)

```ts
let selectedChapter = null;      // chapter object
let selectedExercise = null;     // exercise object
let user = null;                 // from session or API
let isSubscribed = false;        // computed from user.subscribed.includes(tcode)
```

These states power all dynamic views and breadcrumb/nav visibility.

---

## 🧩 Component Breakdown

### ✅ `NavBar.svelte`

* Always visible
* Shows: Taleem logo, tcode, selected chapter/exercise as breadcrumb
* Auth-aware: shows login/subscribe/my-courses buttons

### ✅ `ChaptersPage.svelte`

* Inputs: `chapters[]`, `selectedChapter`, `isSubscribed`
* Renders:

  * Chapter cards with title, description
  * Forward/back buttons `< >` to switch chapters
  * Emits `selectChapter(chapter)` event

### ✅ `ExercisePage.svelte`

* Inputs: `chapter`, `selectedExercise`, `isSubscribed`
* Renders:

  * List of exercises with question count, lock icon
  * `< >` buttons to navigate within chapter
  * Emits `selectExercise(exercise)` event

### ✅ `QuestionCard.svelte`

* Input: question object
* Shows question type, number, preview icon or title
* Links to `/eq`, `/canvas`, `/md` based on question type
* Visually locked if unsubscribed

---

## 🔁 Navigation Flow

1. **User lands on `/syllabus/[tcode]`**

   * Hero section: tcode intro + overview
   * Chapter cards shown

2. **User clicks chapter**

   * `selectedChapter` is set
   * Exercises for that chapter shown
   * NavBar updated to show: `Tcode › Chapter`
   * `< >` to move through chapters directly

3. **User clicks exercise**

   * `selectedExercise` is set
   * NavBar shows: `Tcode › Chapter › Exercise`
   * List of questions shown via `QuestionCard`s
   * Click → routes to appropriate slide player

---

## 🔒 Subscription Handling

* `isSubscribed = user?.subscribed.includes(tcode)`
* Passed to child components to determine dimming/locking
* All actual content (slides) validated by backend at load time

---

## 🧠 UX Rules

* Never hide locked items — always show them dimmed
* Breadcrumb always reflects position
* Back buttons and linear `< >` let user move forward/back without going “home”

---

## ✅ Success Criteria

* User can explore all content via syllabus tree
* Subscribed students flow naturally through exercises
* Unsubscribed students see what they’re missing — and can subscribe to unlock
* Every state (Tcode, Chapter, Exercise) is clear from NavBar + UI

---

This system becomes the front-end **spine of Taleem.Help**. Once complete, it unlocks full user-driven navigation.
