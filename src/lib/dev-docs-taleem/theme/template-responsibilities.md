
# 🧱 Template Responsibilities for Theme & Background

Templates are the atomic units of slide layout and logic. To ensure styling consistency and reusability, all templates must follow strict rules when working with the `globalTheme` and `background`.

---

## 1. Do Not Define Styling

Templates **must not define** their own global theme or background. These are provided externally by the deck during initialization.

- `this.globalTheme`: Cloned and injected by the deck
- `this._background`: Set via the `setBackground()` method

These objects are read-only inside the template lifecycle.

---

## 2. Use theme and background correctly

Templates must:

- Pull all visual settings (fonts, colors) from `this.globalTheme`
- Use `this.setBackground()` to assign backgrounds
- Never mutate `this.globalTheme` or reassign it

---

## 3. Expose Optional Overrides

If a template author wants to allow customization, they can define a `template.theme` object. This object is:

- Defined statically by the template author
- Editable by the end-user of the template
- Used inside `getItems()` for controlled escape from global styling

```js
title.color = this.theme.customTitleColor ?? this.globalTheme.primaryColor;
````

---

## 4. Implement getItems Responsibly

The core logic of a template lives in its `getItems()` method. Here, the theme and background should be referenced safely:

* Always apply theme fields via `??` to allow fallbacks
* Set positions and fonts consistently based on theme tokens
* Return both `items` and the assigned `background` object:

```js
return {
  items,
  background: this._background
};
```

---

## 5. Validate Backgrounds

Use `BaseTemplate.createBackground()` to safely construct background objects. Avoid raw object literals.

```js
this.setBackground(BaseTemplate.createBackground({
  backgroundImage: "photo1.jpg",
  pattern: null
}));
```

---

## 6. Compatibility Requirement

All templates must visually work with the **main 5 production themes**. Template authors must test and adjust their layout, colors, and text spacing accordingly.

---

Templates are intended to be portable, predictable, and theme-driven. By following these rules, developers ensure composability and maintain a clean separation between logic and design.

