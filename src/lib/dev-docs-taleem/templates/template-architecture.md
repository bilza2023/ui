

# 🧱 Template Architecture

Templates in this system are modular logic units that generate slide visuals. Each template is built to return a structured list of renderable items using standardized layout, theming, and data mechanisms. Templates do not render directly; they define what should be rendered.

---

## 1. Base Structure

All templates are instances of `BaseTemplate`, which provides common behavior and validation.

### Core Properties

| Property         | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `name`           | Required. Acts as the template's unique identifier.                         |
| `data`           | Input content. Defined by the template author, editable by end users.       |
| `theme`          | Optional overrides. Allows authors to expose theme hooks to end users.      |
| `globalTheme`    | Read-only styling context injected by the deck.                             |
| `_background`    | Set internally via `setBackground()`. Passed along with output.             |

---

## 2. Required Method: `getItems()`

This is the central method of a template. It must return:

```js
{
  items: [...],       // List of visual items (text, emoji, shapes, etc.)
  background: {...}   // Optional background object (if set)
}
````

The method should pull visual styling from `this.globalTheme`, optionally influenced by `this.theme`.

---

## 3. Template Initialization Flow

1. Template is constructed: `new BaseTemplate("uniqueName")`
2. Author defines:

   * `template.data`
   * `template.theme` (optional)
   * `template.getItems()`
3. When added to a slide:

   * `globalTheme` and `globalBackground` are injected (if not overridden)
   * `getItems()` is called to produce the slide layout

---

## 4. Layout Helpers

Each template inherits:

* `centerHorizontally(item)` — centers an item horizontally within the canvas
* `placeBelow(item, refItem, gap)` — vertical positioning relative to another item

---

## 5. Background Assignment

Use `this.setBackground(...)` to assign a background. Must call with a valid structure (image or pattern).

Helper methods from `BaseTemplate`:

* `backgroundWithImage(name, opacity)`
* `backgroundWithPattern(patternObject)`
* `createBackground({ backgroundImage, pattern, backgroundImageOpacity })`

---

## 6. Immutable Design

Templates are **not** responsible for storing IDs, timing, or metadata. They only output content layout. Timing and validation are handled by the deck.

---

Templates are the backbone of the drawing app’s composition model. They are logic-structured, declarative, and visually driven — focused solely on producing renderable instructions.
