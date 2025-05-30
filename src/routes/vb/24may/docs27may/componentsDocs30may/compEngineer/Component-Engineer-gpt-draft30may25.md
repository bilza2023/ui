

## 📘 `components.md` — Component Architecture & Philosophy

### 🧠 Core Philosophy

Every component is just a **function returning an array of styled and layouted items**. Components differ only by their intent and layout purpose—**not by architecture**.

```js
function componentName(theme, data = [], config = {})
```

### 🧩 What Makes a Good Component?

A good component **should render a meaningful visual even when:**

* No `data` is provided.
* No `config` overrides are given.
* Only `theme` is injected.

This ensures that:

* The Editor can preview components instantly.
* Default rendering is predictable and purposeful.
* Components degrade gracefully.

---

### 🛠 Defaults: Who Decides Them?

**→ The component’s purpose determines its defaults.**

| Component Type | Purpose                     | Default Style Examples                                     |
| -------------- | --------------------------- | ---------------------------------------------------------- |
| `header`       | Display top-level text      | `fontSize: 64`, `color: theme.headingColor`, `center`      |
| `bullets`      | Full-slide text bullets     | `lineGap: 48`, `textAlign: center`, `fontFamilyBase`       |
| `halfBullets`  | Side-by-side bullet section | `fontSize: 28`, `textAlign: left`, `gapFromTop: 60`        |
| `image`        | Showcase visual asset       | `width: 100%`, `y: getBodyY('top')`, centered horizontally |

⚠️ Don't overgeneralize defaults—**tune them per component type.**

---

### 📐 Design Consistency

* All components receive:

  * `theme` (style source)
  * `data` (user-provided, time-aware)
  * `config` (author-provided override options)
* All components **must return** an array of `items`, nothing more.

---

### 🔁 Interoperability Principle

> Because all components follow the same signature, they are interchangeable across contexts.

**Examples**:

* A `header` component can be rendered inside `deck.full(...)`.
* A `halfBullets` component could be tested alone in a `full` context.

This enables:

* **Higher composability**
* **Live testing and iteration**
* **Shared infrastructure (animations, layouts, themes)**

---

Would you like this written into a formal Markdown doc now? It would be great for onboarding and consistency enforcement.
