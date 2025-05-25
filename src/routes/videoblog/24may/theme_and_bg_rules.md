

## 🎯 Unified Theming & Background Rules

---

### 1. **Global Setup**

The deck defines two global objects:

* A **global theme** for fonts, text colors, and background color.
* A **global background** for background image and pattern only.

---

### 2. **Slide Initialization**

Each slide starts with `theme = null` and `background = null`.
If either is null, the deck injects the global version using `applyTheme` and `applyBackground`.
If the slide has already defined them, they are not overridden.

---

### 3. **Background Content Rules**

The background object contains only two optional layers:

* A background image
* A pattern
  The background **color** is **not** part of this object — it comes from the theme.

---

### 4. **Rendering Order**

When rendering a slide:

1. The theme’s background color is drawn first (as a full-rect fill).
2. Then the background image is drawn (if any).
3. Then the pattern is drawn on top (if any).

---

### 5. **Template Responsibility**

Templates do not define or modify theme or background.
They only apply the theme and background provided to them at render time.


