
# 🎨 GlobalTheme Object Specification

The `GlobalTheme` object defines a consistent token-based styling vocabulary used across all slides and templates. It is injected into each template as a **read-only** reference and must not be confused with `template.theme`.

---

## 1. Conceptual Separation

### 🔹 GlobalTheme vs Template.theme

| Object             | Role                                      | Writable? | Scope      |
|--------------------|-------------------------------------------|-----------|------------|
| `GlobalTheme`      | Shared design token set for all slides    | ❌ No      | Deck-wide  |
| `template.theme`   | Template-specific optional overrides      | ✅ Yes     | Template-local |

- `GlobalTheme` is the **central visual identity** of the deck.
- `template.theme` is defined by the **template author** to allow end-user overrides of specific fields.

---

## 2. Token-Based Styling Model

The GlobalTheme is a **token-based system**, meaning:

- Each field in the theme is a **semantic token** (e.g., `primaryColor`, `fontFamilyHeading`)
- Templates **never reference literal values** — only tokens
- This ensures that changing the theme modifies appearance **consistently** without editing logic

### ✳️ Example Tokens

- `bgColor` — used as the slide background fill
- `primaryColor` — used for accents, title color
- `fontFamilyHeading` — used for large or prominent text

---

## 3. Field Reference Table

| Field               | Description                              |
|---------------------|------------------------------------------|
| `bgColor`           | Slide background color                   |
| `baseTextColor`     | Default paragraph text color             |
| `headingColor`      | Primary heading text color               |
| `bulletColor`       | Color used for bullets                   |
| `primaryColor`      | Used for key accents (titles/buttons)    |
| `secondaryColor`    | Supporting accent color                  |
| `shadowColor`       | Drop shadow or outline usage             |
| `borderColor`       | Border outlines for components           |
| `fontFamilyBase`    | Default text font                        |
| `fontFamilyHeading` | Title and heading font                   |

---

## 4. Example Theme Object

```js
{
  bgColor: "#ffffff",
  baseTextColor: "#333333",
  headingColor: "#111111",
  bulletColor: "#555555",
  primaryColor: "#00bcd4",
  secondaryColor: "#ff9800",
  shadowColor: "rgba(0, 0, 0, 0.2)",
  borderColor: "#dddddd",
  fontFamilyBase: "Arial",
  fontFamilyHeading: "Georgia"
}
````

---

## 5. Template Author Responsibilities

Template authors must:

* Use only `this.globalTheme` for visual styling — no hardcoded values
* Use `template.theme` *only* when you want to offer users a controlled escape hatch
* Fallback to `globalTheme` using `??` syntax:

```js
title.color = this.theme.titleColor ?? this.globalTheme.primaryColor;
```

* Ensure the template renders cleanly with **at least the 5 main production themes** (e.g., darkTheme, lightTheme, educationSoft, techBlueMinimal, blueBusiness)

---

## 6. Extensibility Guidelines

Authors may extend `GlobalTheme` with additional fields if:

* They serve a visual or layout purpose
* They are optional and backward-compatible
* Their use is confined to templates that explicitly support them

Avoid adding logic-dependent fields inside the theme.

---

The `GlobalTheme` object enables centralized, scalable visual consistency while preserving per-template flexibility and design integrity.

```

---
