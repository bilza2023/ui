# Instruction Guide for Presentation Builder GPT

This document provides a complete guide for Presentation Builder GPT on how to generate valid slides using supported components. Each component is described in terms of its purpose, `data[]` structure, configurable `config{}` options, and visual guidelines like font size, alignment, and character limits.

---

## 🧩 Component Groups

* **Header Components** – Used at the top of slides.
* **Full Components** – Occupy the full width of the body zone.
* **Half Components** – Used in left/right split slides.

---

## 🔹 Header Components

### 1. `header`

**Description**: A large, centered header line at the top of the slide.

* **data\[]**: `[{ text: string, showAt?: number }]` – Only the first entry is used.
* **config{}**:

  * `fontSize` (default: 64)
  * `y` (default: 40)
  * `stylePresetKey` (default: "text.heading")

**Guidelines**:

* Recommended max length: **35–50 characters**
* FontSize 64 can overflow on smaller screens – reduce to 48 if needed
* Centered horizontally, does not wrap

---

### 2. `leftHeaderRich`

**Description**: A subtle rich-text header aligned left, supports wrapping.

* **data\[]**: `[{ text: string, showAt?: number }]`
* **config{}**:

  * `fontSize` (default: 36)
  * `x`, `y`, `width`, `color`, `fontFamily`, `lineHeight`, `rotation`

**Guidelines**:

* Max safe width: **700px**
* Recommended max text: **2–3 lines, \~50–80 characters per line**
* Automatically wraps (richText)

---

## 🔷 Full Components

### 1. `quote`

**Description**: Multi-line quote, each line appears one by one. Author fades in last.

* **data\[]**: `[{ text: string, showAt: number }]`
* **config{}**:

  * `author`: `{ text, showAt }`
  * `fontSize` (default: 48)
  * `lineHeight`, `startY`, `xOffset`, `yOffset`

**Guidelines**:

* Use pyramid structure:

  * Line 1: long
  * Line 2: shorter
  * Line 3: shortest
* Ideal: 3 lines
* Width fixed to 820px, no wrapping – max **35–50 characters** per line

---

### 2. `bullets`

**Description**: Vertical list of bullet points centered on the slide.

* **data\[]**: `[{ text: string, showAt: number }]`
* **config{}**:

  * `fontSize` (default: 32)
  * `lineGap`, `fontFamily`, `color`, `textAlign`, `alignment`, `containerWidth`, `xOffset`, `yOffset`, `gapFromTop`, `padding`

**Guidelines**:

* Ideal: 3–5 bullets
* Max per line: **30–40 characters**
* Avoid long sentences; prefer concise phrases

---

### 3. `image`

**Description**: Full-width image displayed below the header.

* **data\[]**: unused
* **config{}**:

  * `src` (required)
  * `showAt`, `xOffset`, `yOffset`

**Guidelines**:

* Image will use `theme.assets[src]`
* Default height: 400px, width: full canvas - 20px padding
* Only 1 image per slide

---

### 4. `leftHeaderRich` (also usable in full layout)

See header section above.

---

### 5. `barchart`

**Status**: Under development. Skip for now.

---

## 🟪 Half Components

### 1. `halfBullets`

**Description**: Bullet list placed in the left or right half of slide.

* **data\[]**: `[{ text: string, showAt: number }]`
* **config{}**:

  * `fontSize` (default: 32)
  * `lineGap` (default: 80)
  * `gapFromTop`, `xOffset`, `yOffset`, `leftMargin`, `stylePresetKey`

**Guidelines**:

* Ideal: 3–4 bullets per half
* Max per line: **25–35 characters**
* Default textAlign is left

---

### 2. `halfImage`

**Description**: Places an image in half of the slide.

* **data\[]**: unused
* **config{}**:

  * `src` (required)
  * `width`, `height`, `xOffset`, `yOffset`, `margin`, `x`, `y`, `showAt`

**Guidelines**:

* Image is auto-centered within half
* Default width: halfCanvas - margin\*2
* Image must exist in `theme.assets`

---

## 🧠 Design Rules & Best Practices

* **Font Sizes**:

  * Large header: 64 (reduce if overflows)
  * Quotes: 48
  * Bullets: 32–36
  * Author/captions: 28

* **Character Limits (approx)**:

  * Header: 35–50 chars
  * Bullet: 25–40 chars
  * Quote lines: 35–45 chars

* **Text Wrapping**:

  * Only `richText` wraps lines
  * All others overflow silently if text too long

* **Use `showAt` properly**:

  * Every line or item must declare `showAt`
  * Default animation: fade-in (0.5s)

* **Visual Rhythm**:

  * For quotes and bullets: stagger `showAt` like 1s apart
  * For images: show after headers (e.g., `showAt: 2`)

---

This instruction file is for internal GPT use to guide automatic generation of valid, aesthetic slide content.
