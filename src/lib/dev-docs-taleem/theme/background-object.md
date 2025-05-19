

# 🖼️ Background Object Model

The `background` object defines optional slide background layers: **images** and **patterns**. It is separate from the `theme.bgColor`, which acts as the base fill color.

---

## 1. Background vs. Theme

| Source        | Controls                         |
|---------------|----------------------------------|
| `theme.bgColor` | Background color (drawn first)   |
| `background`    | Image and/or pattern overlay     |

The background object **does not contain** a color. Only images and patterns are represented here. The color layer is sourced from the theme and rendered underneath.

---

## 2. Structure of Background Object

The `background` object has the following schema:

```ts
{
  backgroundImage: string | null,
  backgroundImageOpacity: number (0.0 to 1.0),
  pattern: Pattern | null
}
````

* `backgroundImage`: Name of the image to render
* `backgroundImageOpacity`: Optional alpha value
* `pattern`: Grid, dots, or lines (see below)

Either `backgroundImage` or `pattern` must be present — both can also coexist.

---

## 3. Pattern Types

The `pattern` field is a discriminated union, accepting these types:

### `grid`

```ts
{
  type: "grid",
  cellWidth: number,
  cellHeight: number,
  lineColor: string,
  lineWidth: number
}
```

### `dots`

```ts
{
  type: "dots",
  dotRadius: number,
  spacingX: number,
  spacingY: number,
  color: string
}
```

### `lines`

```ts
{
  type: "lines",
  direction: "horizontal" | "vertical",
  spacing: number,
  lineColor: string,
  lineWidth: number
}
```

---

## 4. Setting a Background in Templates

Templates must use the provided API methods from `BaseTemplate` to define a background:

```js
this.setBackground(BaseTemplate.createBackground({
  backgroundImage: "photo1.jpg",
  backgroundImageOpacity: 0.8,
  pattern: null
}));
```

This ensures validation and safe injection.

---

## 5. Rendering Layer Order

When a slide is rendered, background layers are drawn in this order:

1. `theme.bgColor` — base fill color
2. `backgroundImage` — if present
3. `pattern` — if present

This sequence guarantees visual separation and clarity between design elements.

---

## 6. Developer Guidelines

* **Do not hardcode backgrounds inside templates.**
* Always validate the background using template helpers.
* Respect the `opacity` field to blend background images subtly.
* Use patterns for texture or thematic styling only.

---

The background system is purposefully decoupled from color theming to preserve semantic clarity and rendering discipline across templates.

