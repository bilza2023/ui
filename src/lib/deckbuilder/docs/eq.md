````markdown
# EQ Slide Format (v1)

## ✅ Objective

Define the structure and builder pattern for **equation slides** (`type: "eq"`) that include a main content line plus optional sidebar panels.

## ✅ Builder Pattern

Use the **imperative** API on your `DeckBuilder` instance:

```js
// Start an EQ slide ending at 50s
const eq = deckbuilder.eq(50);

// Add main line content with a “showAt” timestamp
eq.addLine({
  type: "heading" | "text" | "math",
  content: string,
  showAt: number
});

// (Optional) Add one or more sidebar items to the **last** line
eq.addSp({ 
  type: "heading" | "text" | "math" | "image", 
  content: string 
});

// Repeat addLine() / addSp() for multiple steps
````

> The `start` time is injected automatically from the previous slide’s `end`.

## ✅ Output JSON Structure

An EQ slide in the final deck looks like:

```json
{
  "type": "eq",
  "start": 0,
  "end": 50,
  "data": [
    {
      "name": "line",
      "type": "heading",
      "content": "Test Sidebar",
      "showAt": 0,
      "spItems": [
        { "type": "heading", "content": "SP Heading" },
        { "type": "text",    "content": "Note about step" },
        { "type": "math",    "content": "a^2 + b^2 = c^2" },
        { "type": "image",   "content": "/images/diagram.png" }
      ]
    },
    {
      "name": "line",
      "type": "math",
      "content": "E = mc^2",
      "showAt": 10
      /* spItems omitted when no sidebar content */
    }
  ]
}
```

* The **`spItems`** array is **optional**.
* If a line has no sidebar panels, simply omit `spItems` or set it to `[]`.

## ✅ Field Definitions

| Field            | Type                                             | Required | Description                                      |
| ---------------- | ------------------------------------------------ | -------- | ------------------------------------------------ |
| `type`           | `"eq"`                                           | ✅        | Indicates an equation slide                      |
| `start`          | number                                           | ✅        | Slide start time (in seconds, injected)          |
| `end`            | number                                           | ✅        | Slide end time (in seconds, provided)            |
| `data`           | Array of line objects                            | ✅        | Sequence of main lines with optional side panels |
| **Line object**  |                                                  |          |                                                  |
| `name`           | `"line"`                                         | ✅        | Fixed slot name for EQ line                      |
| `type`           | `"heading"` \| `"text"` \| `"math"`              | ✅        | Content type of the main line                    |
| `content`        | string                                           | ✅        | Main text or math expression                     |
| `showAt`         | number                                           | ✅        | Timestamp when the line appears                  |
| `spItems?`       | Array of sidebar items                           | ❌        | Optional sidebar panels attached to this line    |
| **Sidebar item** |                                                  |          |                                                  |
| `type`           | `"heading"` \| `"text"` \| `"math"` \| `"image"` | ✅        | Type of sidebar content                          |
| `content`        | string                                           | ✅        | Text, math, or image URL                         |

## ✅ Validation

Your `eq` slide must pass the `eqSlide` branch of the strict Zod schema:

```ts
import { zodSchemaV1 } from 'deckbuild';
zodSchemaV1.parse(deck); // deck including eq slides
```

## 🔒 Freeze Notice

This EQ slide pattern is locked in `deck-v1`.
Any future changes (e.g., additional sidebar types) will be part of a new version.

```
```
