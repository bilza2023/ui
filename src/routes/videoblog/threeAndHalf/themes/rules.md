Yes — you're absolutely right, and here's the simplified logic clarified in plain language:

---

### ✅ AGREED: Simpler Protocol

> **Whatever is in `item.data` should be used — but only if it's truly intentional.**
> Otherwise, fallback to `globalTheme`.

---

### 🔁 So the rules become:

1. `item.data.color` is optional, but **if present, it is absolute** — a direct override.
2. If `item.data.color` is missing, resolve color using:

   * `themeRole` (which **must exist** on every item)
   * from the `globalTheme`

---

### ✅ AGREED OUTCOME

* **Yes**, you should remove `color` from `textItem()` defaults.
  It should only be added when someone **explicitly** wants to override the theme.

* **Yes**, every item must have a valid `themeRole`.
  That makes them theme-aware and predictable.

---

### 🌱 Result

* Editor only sees themes and high-level choices
* No accidental overrides from leftover default `color`
* Rendering is predictable, centralized, and fully theme-driven

Perfectly aligned. Ready for the final `textItem()` edit or want to move to another item?
