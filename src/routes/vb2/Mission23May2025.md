
##### Mission23May2025

## ✅ Your Immediate Mission: “Lock The Core + Ship 3 Templates”

Here’s a **flat actionable list** of what’s needed, along with what's pending and **why it's not done yet**.

---

### 🔵 CORE SYSTEM (Player + DrawEngine + drawX)

1. ✅ **Finalize Player.js**
   *Status:* ✅ Done just now
   *Why not done earlier:* Still evolving structure; now it’s stable.

2. ✅ **Refactor DrawEngine to not expect `displayObject` from items**
   *Status:* ✅ Just fixed by you
   *Why delayed:* Old model relied on editor-augmented data with `displayObject`.

3. 🟡 **Create `drawX()` helpers for all needed types**
   *To do:*

   * `drawText(data)`
   * `drawIcon(data)`
   * `drawRect(data)`
   * `drawCircle(data)`
     *Why not done yet:* Scattered functions, no unified location yet.

4. 🟡 **Create a clean `drawItem(data)` dispatcher**
   *To do:* Central function that picks the correct `drawX()`
   *Why not done yet:* You were manually switching per item type inside DrawEngine.

---

### 🔵 TEMPLATE SYSTEM (3 locked templates)

5. 🟡 **Pick 3 templates to lock**
   *Recommended:* `Jumbotron`, `IconTitle`, `QuoteSlide`
   *Why not done:* Multiple rewrites, no final stable JSON output defined.

6. 🟡 **Standardize `getItems(data, config, theme)` in all templates**
   *To do:* Ensure they all return correct structure expected by DrawEngine.
   *Why not done:* Frequent changes to item format, and draw logic wasn’t locked.

7. 🟡 **Confirm each template renders on screen with Player**
   *To do:* Manual test: load each one and see on canvas
   *Why not done:* No stable renderer till now; often broke on new slide formats.

---

### 🔵 JSON OUTPUT STRUCTURE

8. 🟢 **Freeze final slide JSON format**
   *Current accepted format:*

   ```js
   {
     startAt: 0,
     endAt: 5,
     background: { backgroundColor: "#000" },
     items: [ { type: "text", text: "Welcome", ... } ]
   }
   ```

   *Why not done:* Ongoing evolution of DeckBuilder and template logic

9. 🟡 **Write Zod schema (or manual validator)**
   *To do:* To ensure incoming data always matches the structure
   *Why not done:* You deprioritized strict validation in early phase (correct call)

---

### 🔵 MISC BUT CRITICAL

10. 🟡 **Centralize all `drawX()` functions into `/lib/draw/`**
    *To do:* Move scattered draw functions to 1 folder
    *Why not done:* Code evolved organically; time to clean now.

11. 🟡 **Lock themes (color/fonts) to always pass `color: number` not hex**
    *To do:* Ensure theme values are preconverted before reaching draw functions
    *Why not done:* You just fixed this behavior recently

12. 🟡 **Fix missing assets for icons or sprite rendering (if needed)**
    *To do:* Confirm you have all needed textures loaded
    *Why not done:* Sometimes broken silently, not part of first render focus

---

## 💡 Suggested Immediate Sequence

1. ✅ Player.js (done)
2. ✅ DrawEngine uses `drawX()` only (done)
3. 🔜 Create `drawItem(data)` dispatcher
4. 🔜 Move `drawX()` to centralized folder
5. 🔜 Pick 3 templates + confirm JSON return shape
6. 🔜 Render all 3 using Player → verify canvas working
7. 🔜 Freeze the JSON format
8. 🔜 Write a `README.md` = 📦 v0.1 🎉

Would you like help creating `drawItem(data)` and cleaning your `/draw/` folder right now?
