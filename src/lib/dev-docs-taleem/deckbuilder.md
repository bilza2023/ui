
# 📦 DeckBuilder System

The `DeckBuilder` class is the **central compiler** that collects templates into a structured and validated slide deck. It manages layout, theme propagation, background injection, and final schema validation before the deck is rendered or exported.

---

## 1. Purpose

`DeckBuilder` is not a UI component. It is a programmatic utility that:

- Accepts templates with timing metadata
- Injects global styling
- Composes valid slide objects
- Validates them using a Zod schema (`SlidesDataSchema`)
- Outputs a deck that conforms to the expected data contract

---

## 2. Constructor

```ts
new DeckBuilder({
  designWidth: number = 1020,
  designHeight: number = 576,
  globalTheme: object = null,
  globalBackground: object = null
})
````

These values are attached to the deck output and passed to templates during rendering. Themes and backgrounds are injected **once per template** when it is added.

---

## 3. Method: `add(endAt, template)`

This is how a slide is added to the deck.

### 🔁 Flow

1. `timeCheck(endAt)` — ensures `endAt` is a valid number > 0

2. `injectGlobalTheme(template, globalTheme)`

3. `injectGlobalBackground(template, globalBackground)`

4. `template.getItems()` is called → must return `{ items, background }`

5. A slide object is constructed:

   * `id`: Auto-generated UUID
   * `backgroundColor`: Fallback from `template.theme?.backgroundColor` → `globalTheme.bgColor` → default `#000`
   * `items`: from template
   * `background`: from template
   * `__endTime`: internal only, used for timing validation

6. The slide is added to the internal `slides[]` array

---

## 4. Method: `build()`

Finalizes and validates all slides, producing the output deck:

```ts
{
  designWidth,
  designHeight,
  slides: [ { startTime, endTime, items, background, id, backgroundColor }, ... ]
}
```

### 🔒 Steps:

1. `finalizeSlides()`:

   * Computes `startTime` and `endTime` from `__endTime` field
   * Ensures monotonic timing (each slide starts after the previous ends)
   * Removes `__endTime` from final structure

2. `SlidesDataSchema.safeParse(...)`:

   * If validation fails:

     * Uses `formatZodError(...)` to format messages
     * Throws an exception with context

3. Returns validated slide data

---

## 5. Helper Functions

### `injectGlobalTheme(template, globalTheme)`

* If `globalTheme` exists, a **cloned** version is injected into `template.globalTheme`

### `injectGlobalBackground(template, globalBackground)`

* If the template does not already have a background, it receives a clone of the global one

### `timeCheck(endAt)`

* Throws if `endAt` is invalid (not a number > 0)

### `finalizeSlides(slides)`

* Converts `__endTime` into proper `startTime`/`endTime` ranges
* Ensures slides are temporally sequential and valid

### `uuid()`

* Generates a compliant unique ID for each slide

---

## 6. Developer Responsibilities

When using `DeckBuilder`, developers must:

* Call `add(endAt, template)` in correct sequence
* Ensure `template.getItems()` returns valid Zod-compatible objects
* Never pass raw/unvalidated templates to `build()`
* Handle any schema validation errors thrown by `build()`

---

## 7. Output Format

The output from `build()` is fully Zod-validated and follows this structure:

```ts
{
  designWidth: number,
  designHeight: number,
  slides: [
    {
      id: string,
      startTime: number,
      endTime: number,
      backgroundColor: string,
      background?: Background,
      items: Item[]
    },
    ...
  ]
}
```

This output is suitable for direct playback, export, or serialization.

---

`DeckBuilder` acts as a contract enforcer — ensuring that all slides are stylistically and structurally coherent before they are rendered or persisted.

