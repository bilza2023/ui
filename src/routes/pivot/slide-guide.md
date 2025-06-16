

# slide-guide.md

This document defines the Taleem Slide Library — a growing collection of tested, TDSC-compatible slide types.

Each entry includes:
- The slide's official `type`
- The expected `data` format using SSD v2
- Optional visual or layout hints
- A copy-paste-ready usage example
- Render notes for authors

---

## 🧾 Slide: `quoteSlide`

### 🔖 Type
```ts
type: "quoteSlide"
````

### 📦 Data Fields

| name   | type   | required | notes               |
| ------ | ------ | -------- | ------------------- |
| quote  | string | ✅        | The main quote text |
| author | string | ✅        | The person/source   |

### 🧠 Timing Support

You may add `start`/`end` to either item for sequential appearance.

### 🧪 Example

```js
{
  type: "quoteSlide",
  data: [
    { name: "quote", content: "Imagination is more important than knowledge." },
    { name: "author", content: "Albert Einstein" }
  ]
}
```

---

## 🧾 Slide: `cornerWordsSlide`

### 🔖 Type

```ts
type: "cornerWordsSlide"
```

### 📦 Data Fields

| name  | type   | required | notes        |
| ----- | ------ | -------- | ------------ |
| word1 | string | ✅        | Top-left     |
| word2 | string | ✅        | Top-right    |
| word3 | string | ✅        | Bottom-left  |
| word4 | string | ✅        | Bottom-right |

### 🧠 Timing Support

Each word can optionally use `start` or `end` for staggered entry.

### 🧪 Example

```js
{
  type: "cornerWordsSlide",
  data: [
    { name: "word1", content: "Explore" },
    { name: "word2", content: "Build" },
    { name: "word3", content: "Learn" },
    { name: "word4", content: "Share" }
  ]
}
```

---

> More slides will be added as they are built and finalized.
> You can copy any `type + data` block directly into `+page.svelte` to render the slide manually.

