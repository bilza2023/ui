✅ Let’s finalize this **frozen player milestone** into a clean internal doc.

We’ll write this as `PlayerEngineLocked.md` — capturing **exactly what was done, what’s frozen, and what can change**.

---

### 📦 `PlayerEngineLocked.md` (summary plan)

#### ✅ Frozen Now (Complete)

1. **Pure Data Inputs**

   * `Player({ app, slides, timeSource })`
   * `DrawEngine.draw(slide, currentTime)`
   * No custom logic inside core.

2. **Pluggable Hooks**

   * `drawItem()` and `runAnimation()` are imported from `hooks/`
   * DrawEngine doesn’t know what items or animations exist

3. **No Mutation of Source Data**

   * `slides[]` is read-only
   * All mutations are applied to PIXI objects only

4. **Layer Isolation (2 layers)**

   * `backgroundLayer` and `itemLayer` only
   * No cross-layer logic or nesting

5. **Central Draw Registry**

   * `drawItem.js` maps `type → drawX()`
   * Adding items is plug-and-play

6. **Animation Module as Adapter**

   * `runAnimation(item, time)` is injected logic
   * Swap presets or engines with zero core change

7. **Read-Only Config Constants**

   * All dimensions come from `pixiApp()`
   * No dynamic screen size assumptions

8. **Version Tag (Planned)**

* `contractVersion = 1` will be stored in goldStandard.js
* Player will check it and warn if mismatched

---

#### 🕒 Still To Be Done

4. **Zod or Schema Gate**

   * Not enforced yet, but expected at load or build time

5. **Unit Test for `goldStandard.js`**

   * Add headless render test later to prevent regression

---

Shall I now write this doc in full and save it as `PlayerEngineLocked.md`?
