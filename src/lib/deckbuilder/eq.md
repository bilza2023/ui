

# DeckBuilder EQ Slide (v1)

This document defines the `eq` slide format in `deck-v1`, including its procedural builder interface and JSON structure.

---

## ✅ Purpose

The `eq` slide is used for math-style content:

* Multi-line equations or steps
* Optional side panel items (`spItems[]`) for each line
* Designed to be precise, readable, and narratable

---

## ✅ Usage

```ts
const eq = builder.eq(40); // ends at 40s

// Add main lines
eq.addLine({
  type: "text",         // or "math"
  content: "x + y = z",
  showAt: 0
});

// Add side panel item
eq.addSp({
  type: "math",         // or "text" | "image"
  content: "\\text{This explains the equation}"
});
```

You must call `addLine()` first before `addSp()` — side panel items are attached to the last added line.

---

## ✅ Output JSON Structure

```ts
{
  type: "eq",
  start: 30,
  end: 40,
  data: [
    {
      name: "line",
      type: "text",
      content: "x + y = z",
      showAt: 0,
      spItems: [
        { type: "math", content: "\\text{Explanation}" },
        { type: "image", content: "/images/example.webp" }
      ]
    },
    {
      name: "line",
      type: "math",
      content: "\\frac{a}{b} = c",
      showAt: 5
    }
  ]
}
```

---

## ✅ Schema

Each slide has:

* `type: "eq"`
* `start`, `end`
* `data[]` of line objects

Each line object:

* `name: "line"`
* `type`: "text" | "math"
* `content`: string
* `showAt`: number
* `spItems[]` (optional): array of `{ type, content }`

---

## 🧠 Notes

* Side panel (`spItems[]`) is fully optional
* `addSp()` is always attached to the last added line
* All EQ logic is encapsulated inside the procedural `.eq()` builder

---

## 🔒 Freeze Notice

The `eq` format is finalized for `deck-v1`. No changes to its structure will occur in v1.
All generation, validation, and rendering are stable.
