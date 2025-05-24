**Lock-in Checklist for a “Frozen” Player + DrawEngine**

1. **Pure Data Inputs** – Player receives only `{ app, slides }`; DrawEngine receives only `(slide, currentTime)`. No item-specific logic or hard-coded types sneak inside.
2. **Pluggable Hooks** – Expose two callbacks in DrawEngine: `runAnimation(item, t)` and `drawItem(item)`. Provide defaults that simply pass through. Future changes (new item types, new animation fns) swap those callbacks, not DrawEngine.
3. **No Mutation of Source Data** – Clone or work on display objects only; never alter the `slides` array. This guarantees stability even if editors change the data live.
4. **Zod (or schema) Gate** – Validate `slides` once on load. If it passes, Player assumes format is correct forever; no defensive checks hidden in core.
5. **Layer Isolation** – Background layer logic stays self-contained; item layer never touches it. Additional layers (e.g., emoji, sprite) must be injected, not hard-wired.
6. **Central Draw Registry** – Keep the `drawMap` in a separate file. Adding `drawChart` means editing the map only, not DrawEngine.
7. **Animation Module as Adapter** – AnimationModule owns every time-based mutation. DrawEngine just calls `runAnimation`. Swapping algorithms never touches core.
8. **Unit Tests on goldStandard.js** – A headless test renders the first frame and asserts no errors. CI fails if future edits break the contract.
9. **Read-Only Config Constants** – Design width/height and stage setup live in `pixiApp()`; DrawEngine just uses `app.screen`.
10. **Explicit Version Tag** – Store `contractVersion = 1` inside goldStandard; Player checks it once and warns if mismatched.

Freeze these ten points, push Player + DrawEngine into their own folder, and you never touch them again—only extend via registries and adapters. 🎉
