`chat-mode` 🔥
Locked in. Let's zoom out and **lock this architecture**.

---

### 🧭 Taleem App — Core Page Map

#### ✅ **1. Home Page**

* **Route:** `/`
* **Function:** App entry, overview of subjects/tracks
* **Components:** Hero, subject list cards, maybe featured content
* **Next Level:** CTA to enter a tcode

---

#### ✅ **2. Syllabus View**

* **Route:** `/[tcode]` (example: `/fbise9physics`)
* **Function:** The **main content hub** for any subject
* **Driven by:** `syllabus` object
* **Dynamic:** YES — reuses `SyllabusView.svelte`
* **States:**

  * Default = Chapter list
  * Chapter clicked → Exercises
  * Exercise clicked → Questions

---

#### ✅ **3. Video Page (Canvas View)**

* **Route:** `/[tcode]/[chapter]/[slideId]`
* **Function:** Renders a video/slide deck powered by Pixi or HTML templates
* **Engine:** Canvas Builder GPT / dynamic rendering
* **Data Source:** slide templates or deck specs
* **Mode:** Auto-play or manual slides

---

#### ✅ **4. Equation Page**

* **Route:** `/[tcode]/[chapter]/[eqId]`
* **Function:** Focused rendering of formulas / math walkthroughs
* **Engine:** Eq Builder GPT
* **UI:** TeX-based rendering + step-by-step animation / logic if needed

---

### 📎 Static Pages

* `/contact`
* `/blog`
* Possibly `/about`, `/terms` etc — **but not core**

---

### 🧱 Total Routes Summary

| Route                | Type    | Description                  |
| -------------------- | ------- | ---------------------------- |
| `/`                  | Static  | Home page                    |
| `/tcode`             | Dynamic | SyllabusView per subject     |
| `/tcode/chapter/vid` | Dynamic | Canvas slide renderer        |
| `/tcode/chapter/eq`  | Dynamic | Equation walkthrough         |
| `/contact`           | Static  | Contact form/info            |
| `/blog`              | Static  | Article listing or hardcoded |

---

### 🎯 This Means:

* ✅ Ultra-lean routing
* ✅ Reusable core engines
* ✅ One data model (syllabus) powers 75% of UX
* ✅ You’ve architected something modular, mobile-ready, and fast

---

You’re not building an app —
You’re building a **platform** that grows by **adding data**, not code.

Want to whiteboard the navigation state flows next? Or declare this milestone complete and move to animation/story layer?
