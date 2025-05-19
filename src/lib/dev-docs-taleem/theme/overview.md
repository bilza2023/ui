# 🎨 Unified Theming & Background Rules

This system introduces a consistent mechanism for applying visual styling across all slides and templates. It ensures that templates can be composed in a modular, override-friendly way without direct dependencies on styling logic.

---

## 1. Global Context

Each slide deck defines two global styling objects:

- **`globalTheme`**: Controls visual aspects like text color, heading color, and fonts.
- **`globalBackground`**: Controls background imagery and pattern (not color).

These are set at the `DeckBuilder` level and injected into templates during slide composition.

---

## 2. Slide Initialization

When a template is added to the deck:

- The slide begins with `theme = null` and `background = null` (maynot be implemented in code but is checked before injecting in deckBuilder.add).
- If either is `null`, the deck injects the corresponding global object.
- If the template defines its own `theme` or `background`, the global versions are **not** injected.

This ensures default behavior while allowing localized customization.

---
## 3. Theme Usage Model

Templates may expose a `template.theme` object to allow selective escape from the global theme context.

- **`template.theme` is not an override.** It is an optional object provided by the template author to allow customization.
- Fields defined in both `template.theme` and `globalTheme` do not conflict — the template explicitly chooses which to use.

### 🛠️ Template Author Intent

When a template author wants to give **template users** the authority to escape specific global theme behaviors, they can:

1. Declare those fields inside `template.theme`.
2. Reference those values conditionally inside the `getItems()` method.

For example:
```js
title.color = this.theme.titleColor ?? this.globalTheme.primaryColor;
```
---

## 4. Immutability and Cloning

Global objects (`globalTheme`, `globalBackground`) are **cloned** before being assigned to templates to prevent accidental mutation. Templates should treat them as read-only.

---

## 5. Template Responsibility

Templates are designed to be **styling-agnostic**:

- They do **not** define or mutate theme/background.
- They consume `this.globalTheme` and `this._background` as read-only sources.
- All visual decisions (font, color, layout) derive from these inputs.

---

## 6. Summary of Control Flow

1. **Deck** creates global styling.
2. **Templates** receive and consume global styling at creation.
3. **Slides** are composed with these style contexts embedded.

This promotes reusability, predictable overrides, and scalable design across template variants.
