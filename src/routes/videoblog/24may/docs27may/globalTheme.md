
# globalTheme.md

## What is a Global Theme?

The `globalTheme` object defines the **visual language** for a presentation.  
It standardizes all colors, fonts, and stylistic choices across slides, ensuring consistency and ease of use for template authors.

A theme is passed into every slide template automatically by the `DeckBuilder`.

---

## Structure of a Theme Object

Every `globalTheme` must define the following keys:

| Key                | Type   | Description |
|--------------------|--------|-------------|
| `backgroundColor`  | string | The default slide background. This is the color seen when no `background` override is used on a slide. |
| `baseTextColor`    | string | Used for normal paragraph text and body content. |
| `headingColor`     | string | Applied to all heading elements. |
| `bulletColor`      | string | Used for bullet points or numbered lists. |
| `primaryColor`     | string | First accent color (icons, borders, highlights). |
| `secondaryColor`   | string | Secondary accent (e.g., underline, side stripe). |
| `borderColor`      | string | Used to outline elements or boxes. |
| `shadowColor`      | string | Controls drop shadow appearance. Often an `rgba()` value. |
| `fontFamilyHeading`| string | Font used for headings (e.g., titles, subtitles). |
| `fontFamilyBase`   | string | Font used for paragraphs and body text. |

---

## Rules & Conventions

1. ✅ **All keys are required.**  
   Future additions are allowed, but existing keys must never be removed.

2. 🚫 **Do not delete or rename keys.**  
   If a field becomes obsolete, mark it as deprecated in the schema and docs.

3. 🎨 **Use HEX or RGBA strings** for colors.  
   These are safe across Pixi and HTML rendering.

4. ✍️ **Fonts should be web-safe** or available in the app's asset pipeline.

---

## Example: Dark Theme

```js
{
  backgroundColor: "#1a1a1a",
  baseTextColor: "#eeeeee",
  headingColor: "#ffffff",
  bulletColor: "#bbbbbb",
  primaryColor: "#00ffaa",
  secondaryColor: "#ffaa00",
  borderColor: "#444444",
  shadowColor: "rgba(0, 0, 0, 0.4)",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial"
}
````

---

## Usage

Every template receives the `globalTheme` as its first argument:

```js
templateFn(globalTheme, data) => items[]
```

This ensures full design control can be achieved using just the theme + data.

---

## Versioning Note

This theme structure is **frozen in Version Zero**.
Future additions can extend the theme, but no fields may be removed.
Validation is enforced via `globalThemeSchema`.

---
