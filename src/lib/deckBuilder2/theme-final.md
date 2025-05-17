# 🎨 Theme System – Final Specification

This document defines the complete theming system used in the slide template architecture, focusing on clarity, predictability, and long-term scalability.

---

## ✅ 1. `template.theme`

Each template defines its own `.theme` — an explicit list of visual fields that the template author exposes for customization.

* Only props in `.theme` can be controlled by users or global themes.
* These props map to specific item styles or layout configurations within the template.
* Templates are fully in control of what they expose and how it's applied.

**Example Exposed Keys (per template):**

* `titleColor`
* `fontSize`
* `backgroundColor`

Templates should not allow undeclared props to affect rendering.

---

## ✅ 2. Global Theme – Token-Based

The global theme is a flat object of **design tokens**, not layout-specific keys. It serves as a centralized design language.

**Example Structure:**

```js
const globalTheme = {
  primaryColor: "#1a73e8",
  secondaryColor: "#fbbc05",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  fontSizeBase: 60,
  fontFamily: "Georgia",
  shadowColor: "rgba(0,0,0,0.3)",
  paddingBase: 20
};
```

**Why Token-Based?**

* Keeps the global theme general and reusable across all templates.
* Allows brand-level consistency (e.g., using `primaryColor` for multiple roles).
* Delegates final visual decisions to templates.

---

## ✅ 3. Theme Integration Logic

Templates may choose to integrate global theme values when building items. This is **not automatic**.

### Rule:

> Global theme tokens may only be used **for props declared in `.theme`**.

* Template authors are responsible for mapping tokens (like `primaryColor`) to their internal fields (like `titleColor`).
* User-supplied values always take priority over global theme tokens.

---

## ✅ 4. Duties of the Template Author

1. Only expose style props that are meaningful and safe to edit via `.theme`.
2. Map those props cleanly to item fields or layout values.
3. If using the global theme, pull values **only** for exposed props.
4. Never apply global values to internal props that are not part of `.theme`.
5. Respect theme priority: **user > global > template default**.

---

## ✅ 5. Theme Preference Chain

When resolving theme values for a template:

```plaintext
1. User theme (passed directly)
2. Global theme token (mapped manually by the template author)
3. Template default value (fallback)
```

This ensures predictability, control, and design safety.

---

## ✅ Summary

The theme system is strictly **template-controlled** and **token-fed**. Templates decide what is editable. Global themes provide brand tokens. Users can override both. This layered, explicit system ensures a scalable and conflict-free design approach.
