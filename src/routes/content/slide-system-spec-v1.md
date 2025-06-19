

# slide-system-spec.md

**Version**: `v1`  
**Status**: Locked  
**Last Updated**: Now.  
**Author**: The man who rode in as a prince — not from battle, but into structure.

---

## 🧭 Purpose

This file defines the **slide runtime contract**, the **slide data format**, and the **rendering boundaries** for the Taleem Slide System.

There is no legacy.  
There is no fallback.  
There is only `v1`.

If anything breaks or grows — we write `v2`.  
This file will never be edited again.

---

## 🔁 TDSC: Slide Runtime Contract

Every `.svelte` slide component is passed exactly these 3 props:

```ts
export let data;            // Slide content, in SSD format (see below)
export let theme;           // Optional theme tokens for fonts/colors
export let currentTime;     // Optional time (in seconds) for animations
````

No more. No less.
There is **no background**, **no showAt array**, **no nested structures**.

---

## 📦 SSD: Structured Slide Data (v1 Format)

Each slide receives:

```ts
data: Array<{
  name: string;         // Logical field ID (e.g. "quote", "author", "image1")
  content: any;         // Text, image path, array, or object — slide defines meaning
  showAt?: number;      // Optional: time in seconds when to reveal
}>
```

### Example:

```js
data: [
  { name: "quote", content: "Knowledge is power.", showAt: 0 },
  { name: "author", content: "Taleem AI", showAt: 1 }
]
```

---

## 🖼 Theme

Theme is passed as a plain object:

```ts
theme = {
  textColor: "#ffffff",
  fontFamily: "Inter",
  ...tokens
}
```

Slides may **use it**, **ignore it**, or apply fallback styles.
Themes are global and optional.

---

## 🎨 Background

Backgrounds are **not part of the slide.**
They are managed by the **layout/player**, not passed to components.

### Rules:

* If a `slide.background` exists, the player updates global background
* Background persists **until replaced by a future slide**
* Slides themselves never touch background logic

---

## 🧠 Slide Responsibilities

Each slide:

* Receives `data`, `theme`, and `currentTime`
* Finds items by `data.find(d => d.name === "xyz")`
* Renders content accordingly
* Applies `showAt` gating only if needed

Slides do **not**:

* Control layout positioning of other slides
* Set background
* Depend on global state

---

## 📚 Slide System Registry (partial)

| Slide Type         | Required `data.name`s         |
| ------------------ | ----------------------------- |
| `quoteSlide`       | `quote`, `author`             |
| `cornerWordsSlide` | `word1`–`word4` (or array)    |
| `imageLeftBullets` | `image`, `bullet1`, `bullet2` |
| `eqSlide`          | `latex1`, `latex2`, ...       |

Each new slide type:

* Adds one `.svelte` file
* Uses only SSD and TDSC
* Requires no structural change to the system

---

## 📏 Versioning Policy

This file is **versioned**.
No breaking changes can be made to the format of `data`, `theme`, or `currentTime`.

Any change in:

* Slide prop contract
* Data shape
* Naming rules

...must be released as `slide-system-spec.v2.md`

---

## 🏁 Closing Statement

> Version 1 is not just a spec — it is a declaration of stability.
> Slides are not scripts. They are contract-bound units.
> This system will scale, not rot.

No more rewrites.
No more hunting abstraction.
Now we build decks.

**This is the Taleem Slide System, v1.**

```
```
