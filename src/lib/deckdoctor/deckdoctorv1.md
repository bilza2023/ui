# Deck System Refactor – **Phase 1**

*Date: 23 July 2025*

---

## 1  Problems We Have Identified

### 1.1  Format Fragmentation

* **DeckBuilder DSL** doubled as a *compiler* and *validator*, producing runtime JSON **and** enforcing rules.
* **Deck‑v1 JSON** was consumed directly by the Player when authored manually or by AI.
* Any new rule (pointer overlay, EQ sidebar, background defaults) required edits in *both* DeckBuilder **and** Player, leading to drift and duplicated logic.

### 1.2  Player Monolith

* `Player.js` bundles timing engine, Howler audio control, and DOM rendering in a single component.
* Variant behaviours (silent preview, static scroll, alternative backgrounds) currently require forking the entire Svelte page.

### 1.3  Schema Ambiguity

* Legacy code still expects `background` **outside** the deck object, while the latest `deck‑v1` keeps it **inside**.
* Some generators wrap data twice (`data.deck.deck`), confusing upload services and front‑end loaders.

### 1.4  Validation Scattered

* Zod schema lives in `ZodDeckV1.js`.
* Timing checks live in DeckBuilder.
* Front‑end throws runtime errors for slide‑type mismatches.
  *Result*: no single source of truth for “is this deck valid?”.

---

## 2  Phase 1 — Planned Actions

### 2.1  Introduce **DeckDoctor** (new module)

| Capability    | Short Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `validate()`  | Wraps `zodDeckV1.parse`, returns `{ ok, errors }` instead of throwing.                                    |
| `normalise()` | Auto‑fixes common drift: flattens `deck.deck`, injects default background, converts legacy timing fields. |
| `analyse()`   | Helper metrics (`getTotalDuration`, `slideAtTime`).                                                       |
| `transform()` | Pure utilities (`toStaticBackground`, `withoutSound`, `flattenEQ`).                                       |
| `diff()`      | Slide‑level comparison of two decks for change tracking.                                                  |

DeckDoctor becomes the **single import** anywhere deck integrity matters (upload API, Player, editor, CLI scripts).

### 2.2  Refactor **DeckBuilder DSL**

1. **Remove** all validation and auto‑timing logic.
2. Treat the file strictly as an *authoring convenience* that returns a raw deck object.
3. Document that every DeckBuilder output **must** pass through DeckDoctor before storage or playback.

### 2.3  Freeze `deck‑v1` Schema (minor clarifications, no breaking changes)

* `background` stays **inside** deck (optional with defaults).
* Legacy nested path `deck.deck` will be auto‑flattened in `normalise()`.
* Timing fields: maintain absolute `showAt`; pointer overlay TBD under dedicated `overlays` array (future Phase 2).

### 2.4  Player Modularisation (outlined, implemented in Phase 2)

1. **player‑core** (headless clock + audio).
2. **timeline‑engine** (maps time → active slide/items).
3. **render‑layer** (Svelte).
4. **wrappers** (`audioPlayer.svelte`, `staticPlayer.svelte`, `previewPlayer.svelte`).

### 2.5  Pipeline Updates

* **Upload `+server.js`** → call `DeckDoctor.validate()` & `normalise()` before saving.
* **Static test pages** → load baked JSON through DeckDoctor to guarantee compliance.
* **AI prompts** → instruct LLMs to output valid `deck‑v1` JSON; DeckBuilder use is optional.

### 2.6  Testing & Documentation

* Jest tests for DeckDoctor covering: format drift, legacy migration, timing validation.
* Update README & schema docs to reference DeckDoctor as canonical validator.
* Deprecate any guidance that suggests writing Player‑specific JSON quirks.

---

### ✅ Deliverables for Phase 1

1. `lib/deck/DeckDoctor.js` with *validate* and *normalise* implemented.
2. DeckBuilder stripped of compiler duties.
3. Upload route refactored.
4. Two demo decks (one DSL, one pure JSON) both passing DeckDoctor and playable via `staticPlayer`.
5. Updated documentation (this file plus README snippets).

*End of Phase 1 plan.*
