# 📘 Work Style for Note Creation (Theorem Project)

This document defines the operating rules and expectations for generating HTML-based notes using AI + SVG/image workflows. These apply across all theorems and conceptual math topics.

---

## ✅ Overall Objective

Create one `.html` file per topic (e.g. theorem, identity, definition), which:

* Presents the concept clearly
* Includes a meaningful image
* Uses only approved HTML tags
* Can be auto-converted into Taleem.Help JSON format

---

## 🔁 Workflow

### 1️⃣ Research & Explanation (AI)

* AI performs research, explanations, simplification
* You do not take notes manually — you trust the AI to **wrap up** each concept clearly
* The final `.html` is your permanent record

### 2️⃣ Visual (Image) Requirements

* Every `.html` must include **at least one image**
* The image must relate to the concept

#### Preferred Image Flow (Tiered)

I. **AI-generated SVG**

* Simple but colorful
* Can include arrows, shapes, text labels
* Editable in Inkscape if needed

II. **.webp AI image**

* Generated via prompt (e.g. using Sora)
* Should visually match concept (no generic photos)

III. **Hand-made SVG**

* Last resort
* Only used if concept is too complex for AI

#### Visual Style Notes

* **Icons are welcome** — for visual engagement (young audience)
* Diagrams can be part icon, part shape — hybrid is fine
* Images should be:

  * Precise
  * Fast to generate
  * Easy to edit/reuse

### 3️⃣ Final `.html` Output

* Must use **only** approved tags:

  * `<h1>`, `<p>`, `<img>`, `<math>` (LaTeX inside), `<code>`, `<table>`
* AI may suggest new tags **with clear comments**
* Each `.html` is parsed to JSON later — so keep structure clean
* **Presentation logic is forbidden**: no inline styles, no JS, no classes

---

## 🧩 Optional Extras

* You may ask AI to add **FAQs**, examples, sidebars — even if these are not part of the final JSON
* These will still render fine in the HTML view
* Think of `.html` as the teacher page — JSON is a runtime product

---

## ✅ Summary

> 1 concept = 1 `.html` = 1 clean note
>
> Every page has:
>
> * ✅ Crystal-clear explanation (by AI)
> * ✅ 1 image (SVG, .webp, or hand-drawn)
> * ✅ Only approved tags (or suggestions)
> * ✅ Extra content like FAQs allowed

This is your full-production, stable authoring format.

---

*Last updated — 03 Aug 2025.*
