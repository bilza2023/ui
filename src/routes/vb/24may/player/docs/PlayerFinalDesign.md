## Player Final Design — Locked Tasks

### 1. Pure Data Inputs

Freeze the outer contract: `new Player({ app, slides })` and `drawEngine.draw(slide, currentTime)`. Neither component inspects optional fields it doesn’t need. This ensures future template changes never require touching Player or DrawEngine.

### 2. Pluggable Hooks

DrawEngine delegates to two fixed‑signature callbacks: `runAnimation(item, t)` and `drawItem(item)`. Implementation details can evolve (new easing, new item types) by swapping these hooks, leaving the core untouched.

### 3. No Mutation of Source Data

Player and DrawEngine treat `slides` as immutable. All time‑based changes occur only on Pixi display objects (or shallow copies). This prevents editor/runtime desyncs and keeps debugging simple.

### 4. Layer Isolation (Background + Items)

DrawEngine maintains exactly two PIXI containers: `backgroundLayer` and `itemLayer`. Items rely on `zIndex` for ordering; any logical grouping is handled in the editor. No extra containers will ever be added in core.

### 5. Central Draw Registry

All renderers live in a single `drawRegistry.js` map (`{text: drawText, icon: drawIcon, …}`). Adding a new item type means writing `drawFoo()` and registering it—without modifying DrawEngine logic.

### 6. Animation Module as Adapter

DrawEngine calls `runAnimation(item, t)` once per frame. The standalone animation module owns every mutation rule. Replacing easing models or adding key‑frames simply swaps this module, preserving the core loop.

### 7. Read‑Only Config Constants

Create `coreConfig.js` with shared constants (designWidth, designHeight, contractVersion). Provide `playerConfig.js` and `editorConfig.js` facades that re‑export only what each side needs, ensuring single‑source truth without unnecessary coupling.

### 8. Explicit Version Tag

Embed `contractVersion: 1` in `goldStandard.js`. Player checks it on load; if mismatched, it logs a clear warning. Future breaking changes ship as `contractVersion: 2`, enabling parallel migration without core edits.
