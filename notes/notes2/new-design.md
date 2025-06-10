# 📘 Taleem Frontend Setup Guide

This document outlines how the **Taleem Frontend** interacts with the backend and how it's structured around the system’s immutable data principles.

---

## 🎯 Purpose

The frontend:

* Renders static course structure using local `tcodeObject`s
* Fetches actual content (e.g., question text) via API on demand
* Tracks and logs user interactions (e.g., viewed, answered)
* Manages UI preferences, themes, and progress state

---

## 🧩 System Connection

### Content Lookup

* All **course structure** (chapters, exercises, metadata) comes from `tcodeObject`.
* The frontend does **not** ask the backend for chapter/exercise listings.

### Content Fetch

* Each question or slide is stored in the database with an `id`
* The frontend loads it via:

  ```http
  GET /tcodes/:id
  ```

### Subscriptions

* The frontend may (optionally) check access via:

  ```http
  GET /me/subscription?tcode=fbise9math
  → { access: true }
  ```

### Messages / Logging

* Interactions, feedback, or runtime logs are sent via:

  ```http
  POST /messages
  ```

---

## 🗂 Folder Structure (Suggested)

```
frontend/
│
├── public/             # Static assets
├── src/
│   ├── lib/            # Shared logic (fetch, auth, tcodeObject loader)
│   ├── components/     # UI components
│   ├── routes/         # Pages
│   ├── styles/         # Themes, global styles
│   └── main.js         # App entry point
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔐 Auth Pattern

* After login, store JWT in memory or `localStorage`
* Attach to all protected API calls via:

  ```js
  fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  ```

---

## ✅ Summary

* Structure from `tcodeObject`
* Content from `/tcodes/:id`
* Logs via `/messages`
* Optional access check via `/me/subscription`

This frontend is **lean, opinionated, and runtime-focused**.
Let the Workshop handle the structure — you render and react.

---

Let me know if you want this wired into Vite + Svelte next.
