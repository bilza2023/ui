
# ✍️ Template Authoring Guide

This guide outlines how to create, structure, and maintain new templates within the Drawing App. Templates define layout logic and visuals, not rendering behavior. They are declarative instructions for how a slide should appear.

---

## 1. Getting Started

Create a new template file and instantiate a base:

```js
const MyTemplate = new BaseTemplate("myTemplateName");
````

> The name must be unique. It acts as the template’s ID in the registry.

---

## 2. Define Content (`data`)

The `data` object holds user-editable inputs:

```js
MyTemplate.data = {
  title: "Hello",
  subtitle: "World",
  fontSize: 50
};
```

All values in `data` can be freely edited by the slide author or generated from external logic.

---

## 3. Optional: Theme Escape Points

If you want to allow theme overrides, expose a `theme` object:

```js
MyTemplate.theme = {
  titleFontSize: 80
};
```

Use fallback logic in your layout:

```js
title.fontSize = this.theme.titleFontSize ?? this.globalTheme.fontFamilyHeading;
```

> Do not define complete styling logic in `theme`. It is only for escape hooks.

---

## 4. Implement `getItems()`

This method returns the layout and content of the slide:

```js
MyTemplate.getItems = function () {
  const items = [];

  const title = this.items.text(this.data.title);
  title.fontSize = this.data.fontSize;
  title.color = this.globalTheme.primaryColor;

  this.centerHorizontally(title);
  items.push(title);

  return {
    items,
    background: this._background
  };
};
```

---

## 5. Use Layout Helpers

* `centerHorizontally(item)` — aligns horizontally
* `placeBelow(item, refItem, gap)` — vertical spacing

These ensure consistent alignment across slides.

---

## 6. Set Background (Optional)

Use helper methods to define a background:

```js
this.setBackground(BaseTemplate.createBackground({
  backgroundImage: "sky.jpg",
  backgroundImageOpacity: 0.6
}));
```

Avoid raw object literals; use factory methods for safety and clarity.

---

## 7. Compatibility Testing

Ensure your template:

* Works with at least 5 major global themes
* Has no hardcoded fonts or colors
* Fails gracefully if a field is missing or null
* Returns a valid `items` array and background (if applicable)

---

Templates must be resilient, readable, and visually flexible. They are authored once, used everywhere.


