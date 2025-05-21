## 📊 Taleem App V2 - Core Architecture (3-Steps System)

---

### 🔹 **Step 1: Authoring Layer — `user-slide.js`**

**Input**:
– Human-written or auto-generated data using `DeckBuilder`

**Output**:
– An array of slide configs:

```js
[
  {
    template: "VocabSlide",
    data: { word: "Ephemeral", meaning: "Lasting a short time" },
    startAt: 0,
    endAt: 5
  },
  ...
]
```

**Objective**:
– Capture intent and content
– Attach it to a named visual strategy (template)
– Define time boundaries

**Design Rule**:
– This layer contains **no logic**, **no layout**, and **no rendering**
– It is a structured data entry interface only (JSON-like config)
– Template-specific data shapes must be **clearly documented**

---

### 🔹 **Step 2: Translation Layer — `Template.getItems(data)`**

**Input**:
– Slide config (template name + data)

**Output**:
– Array of **PixiJS DisplayObjects**, fully styled and positioned

**Objective**:
– Convert structured data into visual items
– Abstract layout and visual rules (e.g., spacing, font, scaling)
– Remain agnostic to internal template logic (can use components, presets, etc.)

**Why Pixi-Aware?**:
– Templates directly return PixiJS objects because:

* Avoids an unnecessary second translation step
* Simplifies visual testing
* Keeps system fast and tightly integrated

**Design Statement**:
– This system is **intentionally Pixi-specific**
– It is **not renderer-agnostic**, and no effort will be made to support other renderers
– Templates are Pixi-aware **for creation**, but not responsible for rendering or ticking

---

### 🔹 **Step 3: Runtime Layer — `DrawEngine`**

**Input**:
– Flat array of Pixi DisplayObjects from all slides
– Timing info per item (`startAt`, `endAt`, etc.)

**Output**:
– Manages Pixi stage
– Shows, hides, animates items based on timeline
– Final rendered PixiJS presentation

**Objective**:
– Own rendering and visibility
– Remain agnostic to data origin or layout logic
– Evaluate per-frame state (via Ticker or raf)

**Key Rule**:
– DrawEngine works **only with visual items**
– It is unaware of templates, slide configs, or original data sources

---

## 🔁 Text-Based System Diagram

```
[ user-slide.js ]
        |
        V
[ DeckBuilder -> Slide Configs ]
        |
        V
[ Translator: template.getItems(data) ]
        |
        V
[ Flat Pixi DisplayObjects[] ]
        |
        V
[ DrawEngine -> Stage + Timeline Control ]
        |
        V
[ Rendered PixiJS Presentation ]
```

---

📌 **Pin: 3 steps = Author → Translate → Render**
📌 **Pin: Each layer is isolated, composable, and testable**
📌 **Pin: Pixi is the foundational rendering layer and is not abstracted**
📌 **Pin: Templates output visuals; DrawEngine controls time and display**

You are now working on a highly structured, high-clarity pipeline built over PixiJS.


## How The Changes will be Managed in the App

✅ 100% agreed — and you’ve now mapped the real-world maintenance concerns that define robust architecture.

---

### 🧠 Layer 1 → Layer 2: Template Binding

– If **template data structure changes**, old slides might **no longer match expected fields**
– New slides can provide correct data, but **existing ones break silently**

**Solutions:**
– Use default values or safe fallbacks in templates
– Eventually, introduce **template versioning** to support backward compatibility
– Maintain changelogs for template structure changes

📌 **Pin: Templates must guard against missing data if no versioning exists**

---

### 🧠 Layer 2 → Layer 3: Display + Behavior Integration

– `item.data` must **fully map** to Pixi’s expected fields
– Renderers should pass only known, safe properties — no surprises

**If animation/effects structure changes:**
– You must update the **DrawEngine modules** that read and apply them
– These changes are isolated — they don’t affect templates or rendering logic

📌 **Pin: `item.data` must be Pixi-aligned to avoid mismatch**
📌 **Pin: Changes in animation/effects are isolated to DrawEngine modules**

---

✅ Final Lock:
– **Template structure changes** = template-side safety + future versioning
– **Pixi compatibility** = renderer-level contract
– **Animation/effect logic** = module-isolated and safe to evolve

✅ Perfect — here’s a clean, structured **DrawEngine Block Diagram (Text-Based)** plus a step-by-step flat list of how it works.

---

## 🔁 **DrawEngine Block Diagram (Text-Based)**

```
[ CurrentTime ] ─────────────┐
                            ▼
[ Slide.Items[] ] ──> [ Filter by showAt ] ──> [ Apply Timeline (effects/animations) ]
                                                |
                                                ▼
                                        [ Add to Stage ]
                                                |
                                                ▼
                                         [ Update Display ]
```

---

## 🧱 DrawEngine Operation – Step-by-Step List

1. **Receive `currentTime` and active slide**
2. Loop through `slide.items[]`
3. For each `item`:

   * ✅ Check `item.showAt` — skip if not visible yet
   * ✅ Run `item.effects` and `item.animations` via `applyTimeline(currentTime)`
4. If visible:

   * ✅ Call `item.renderTo(stage)` or `stage.addChild(item.displayObject)`
5. Repeat every tick/frame (via `PIXI.Ticker`)

---

📌 **Pin: Engine reads, never mutates item config**
📌 **Pin: Engine is timeline-aware, not layout-aware**
📌 **Pin: Engine owns the stage, visibility, and tick loop**


✅ Here's the full list of finalized **top-level architectural decisions** to add to your `Plan.md` under a new section like:

---

## 🔧 Architectural Finalizations (Pre-Implementation)

### 1. **Template Registry**

* Templates are exported as factory functions: `function VocabSlide(data, theme, background) => VisualItems[]`
* `templateRegistry/index.js` maps names to these functions

### 2. **Theme Source**

* A global theme object is passed into DeckBuilder
* Templates receive theme via function arguments, never own it

### 3. **VisualItem IDs**

* IDs are dynamically generated during slide assembly (e.g., user-slide or DeckBuilder)
* IDs are not stable across builds (OK for playback-focused apps)

### 4. **Sections Usage**

* Sections are internal to templates (`templates/sections/`)
* Not registered or composable from the outside
* Used to avoid duplication inside specific templates only

### 5. **Debug Hooks in DrawEngine**

* DrawEngine supports optional logging/debugging via a `debug` flag
* Logs visibility (`showAt`), effect triggers, and animation phases per item

---

📌 These decisions ensure implementation remains consistent, scalable, and traceable across all layers.

