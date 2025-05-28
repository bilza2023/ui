# Template Interface Contracts

Every template in our slide system (whether `full`, `half`, or `header`) must adhere to a strict contract to maintain consistency, simplify testing, and enable AI-based generation and validation.

---

## 1. Function Signature

```js
function template(theme, data = [], config = {}) => SlideItem[]
```

### Parameters:

* **theme**: An object containing theme-wide visual defaults, such as style presets and layout constants.
* **data**: An array of content entries. Examples:

  * Quote lines, bullet points, image list.
* **config**: A plain object with positioning or styling overrides. Common keys:

  * `x`, `y`, `xOffset`, `yOffset`
  * `fontSize`, `lineGap`, `stylePresetKey`
  * `showAt` for individual entries or overrides.

### Returns:

* An array of `SlideItem` objects ready for rendering.

---

## 2. Positioning System

* All templates **must respect `xOffset` and `yOffset`** from the config. This enables dynamic layout adjustments such as header offset or half-slide positioning.
* Default starting positions like `x = 100` or `y = 120` should be adjusted like:

```js
y: config.yOffset + yourOffset
```

---

## 3. Animation Contract

* Templates **must not hardcode animation logic**.
* Use `T.AniHelpers.fadeIn(item, showAt, duration)` or similar preset utilities.
* Each item from `data[]` should support its own `showAt` time.

---

## 4. Style Application

* Style must be applied using:

```js
T.applyPreset(T.stylePresets[key], overrideProps)
```

* Never hardcode styles into the template — rely on style presets and config overrides.

---

## 5. Header Awareness

Templates do not check for headers. Instead, the DeckBuilder injects `yOffset` automatically if a header is present. Templates simply respect it.

---

## 6. Single Responsibility Rule

Each template must:

* Focus on one visual layout idea.
* Avoid conditional logic (like `if full then... else if half...`).
* Compose behavior via clear external config, not internal branching.

If a new variant is needed (e.g., `halfBullets` vs `bullets`), **create a new template.**

---

## 7. Template Types

* **full**: One visual layout, uses `deck.full()`
* **half**: Two visual layouts, uses `deck.half()` (left/right split)
* **header**: Top-fixed visual layer, uses `deck.addHeader()`

Each type must still follow the same function signature contract.

---

## 8. Export Format

Each template must be exported as:

```js
export default function templateName(theme, data = [], config = {}) { ... }
```

---

## 9. Naming Conventions

* Template files: `quoteComponent.js`, `imageComponent.js`, `halfBullets.js`, etc.
* Template keys: Used as registry keys in `fullComponents`, `halfComponents`, `headerComponents`

---

## 10. Example Compliance

```js
export default function bullets(theme, data = [], config = {}) {
  const { x = 100, y = 120, lineGap = 80 } = config;
  return data.map((entry, i) => {
    const item = T.ItemBuilders.text(
      theme,
      T.applyPreset(T.stylePresets.text.bullet, {
        text: entry.text,
        x,
        y: y + i * lineGap,
        width: 400,
        fontSize: 32
      })
    );
    T.AniHelpers.fadeIn(item, entry.showAt || 0, 0.5);
    return item;
  });
}
```

---

This strict structure allows the entire system to:

* Remain flexible and testable
* Be extended without breaking old slides
* Allow AI-based generation and validation of templates
