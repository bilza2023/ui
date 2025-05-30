Here's a concise `.md` document that encapsulates this principle:

---

````markdown
# Layout Alignment Philosophy

## Principle

**Let components describe layout intent, and let draw functions execute layout logic.**

---

## What This Means

- **Components** should specify:
  - Where things go (`x`, `y`)
  - How things align (`textAlign`)
  - How much space they have (`width`, `height`)
  - What they look like (`color`, `fontSize`, etc.)

- **Draw functions** should interpret those values:
  - Apply anchor points (`anchor.set(...)`)
  - Calculate actual `x` positions based on alignment
  - Render accurately with no surprises

---

## Why This Matters

- Avoids double alignment (manual offsets + anchor)
- Keeps components clean and focused on layout description
- Centralizes rendering behavior for easier debugging and consistency

---

## Example

```js
// In a component
T.ItemBuilders.text(theme, {
  text: "Hello",
  x: 100,
  width: 200,
  textAlign: "center",
});
````

```js
// In drawText()
if (textAlign === "center") {
  anchor.set(0.5, 0);
  x = merged.x + merged.width / 2;
}
```

---

## TL;DR

🔧 **Component** = declares *what* to show and *where*

🖌️ **Draw function** = figures out *how* to render it correctly

```

--- 

Let me know if you'd like to include visuals or a diagram as well.
```
