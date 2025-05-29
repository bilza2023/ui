

# background

## ✅ One Unified Background Object

Every slide has a single `background` object that defines how its visual backdrop is rendered.  
This object contains **three independent visual layers**:

```js
{
  backgroundColor: "#467ae2",              // (required)
  backgroundImage: "blue-gradient.png",    // (optional)
  backgroundImageOpacity: 0.5,             // (optional, 0.0 to 1.0)
  pattern: "dots"                          // (optional, enum-based)
}
````

* These layers **do not compete**. They stack:

  1. `backgroundColor` — solid fill
  2. `backgroundImage` — rendered over color with opacity
  3. `pattern` — rendered last, on top

---

## 🎨 backgroundColor Rules

* `backgroundColor` is always **required**.
* It is copied from the `globalTheme.backgroundColor` unless overridden.
* It can be **overridden** using a helper method:

```js
deck.overrideLastSlideBackgroundColor("#ceef10");
```

---

## 🧠 Background vs Theme

While `globalTheme` defines **design-wide visual rules**,
each slide can override just one part of it: `backgroundColor`.

* The background object does **not inherit** the full theme — just the background color.
* This is intentional — slides should not define their own "themes".

---

## 🧱 Data Consistency

The `DeckBuilder` ensures that:

* Every slide gets a valid `background` object with at least `backgroundColor`.
* The rest (`backgroundImage`, `opacity`, `pattern`) are optional and only used if specified.

---

## 💡 Implementation Notes

* The rendering logic in `Player` draws these three layers in order.
* The `backgroundImage` must come from a validated enum list.
* The `pattern` (e.g. `"dots"`) must also be validated as a known preset.

---

## 📌 Final Structure Contract

> This background object shape is **locked for Version Zero**:

```ts
{
  backgroundColor: string,
  backgroundImage?: string | null,
  backgroundImageOpacity?: number,
  pattern?: string | null
}
```

Do not remove fields. Future additions should extend this shape, not replace it.

```

---
