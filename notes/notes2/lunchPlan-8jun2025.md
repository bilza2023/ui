# Taleem.Help — Full Launch Plan

This document outlines the 4 core steps required for a complete Taleem.Help platform launch. Each step builds on the previous to create a browsable, gated, content-rich learning system with personalized student support.

---

## 🚀 Step 1: Syllabus Spine + Slide Access (public UI layer)

**Goal:** Boot with `syllabus.svelte` + `tcodeSyllabus`

* [ ] Render syllabus tree (chapters + exercises)
* [ ] Dynamic routes to slide pages
* [ ] Uses `type: "eqs"` or `"canvas"` to choose renderer
* [ ] Anonymous users can browse but not enter full slides

**🔓 Outcome:** Browsable Taleem universe

---

## ✍️ Step 2: Adding Slide Content

**Goal:** Feed real content into `fbise9physics`, `eqs`, and `canvas` decks

* [ ] Populate syllabus with at least 2-3 full chapters
* [ ] Attach slide references to exercises
* [ ] Ensure slide JSONs are valid and match player expectations
* [ ] Start using `deckbuilder` and `eqbuilder` to generate

**📚 Outcome:** Real educational material in place

---

## 🧾 Step 3: Login + Subscription System

**Goal:** Secure access by user + tcode

* [ ] Full JWT login/register flow
* [ ] Backend `User` model: `subscribed: string[]`
* [ ] Slide routes check for `tcode` in `user.subscribed`
* [ ] Fallback view for unsubscribed users (blur/CTA)
* [ ] Admin way to assign subscriptions (manual or later Stripe)

**🔒 Outcome:** Controlled access, ready for monetization

---

## 🖥 Step 4: Student Studio (Optional)

**Goal:** Personal area for progress + support

* [ ] Subscribed `tcode`s listed
* [ ] Recent slides, attempts, progress
* [ ] Messages sent (via `/messages`)
* [ ] Feedback box (AbdulNet ready)
* [ ] Optional: Daily suggestion, stats

**🎒 Outcome:** Personalized learning + feedback loop

---
# Subscription Check Policy

This document defines how Taleem.Help handles user subscription checks across the frontend and backend.

---

## ✅ UI-Level (Frontend)

* On login, the user's `subscribed: string[]` list is returned
* Frontend uses this list to **dim or unlock** content in syllabus, slides, or decks
* This check is purely **cosmetic** — to inform the user experience

---

## 🔒 Access-Level (Backend)

* All gated content (slide decks, EQs, lessons) is validated server-side
* Routes like `GET /decks/:tcode/...` and `GET /eqs/:tcode/...` check if user has access
* If not subscribed, backend returns `403 Forbidden`

---

## 🧠 Why This Works

* UI feels responsive and personalized
* Backend remains fully secure and trustable
* Tampering with the UI does not bypass protection

---

This hybrid model ensures both **speed and security** in Taleem.Help's subscription system.

10-jun
Step 1: Browsable Learning Shell --done
Step 2: Actual Content Feeding - done mockSyllabus
Step 3: Lockdown + Monetization Hooks - login register hooked ---subs remain -- tomaroow or skip fpr now
Step 4: Student Studio (Bonus Layer)-> remains --- 