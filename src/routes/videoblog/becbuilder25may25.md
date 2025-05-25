
### 🔒 Contract-Driven Core (DeckBuilder)

* **DeckBuilder is the final gate**: all validation, timing, and structure must pass through here.
* **Player never breaks** — it trusts DeckBuilder output completely.
* **deck.build() is the only step** that assembles and locks the deck.
* Everything else is just functions feeding it.

---

### 🧩 Template System (Templating Pipeline)

* **Single signature**: `templateFn(globalTheme, data)`
* Returns either:

  * **Partial** (items only) → `items/*.js`
  * **Full** (slide object) → `slides/*.js`
* Internally, same logic — exposed differently for clarity and workflow.
* **Slide authors only import `templates.slide.*`** — no need to know how items are built.

---

### 🛠️ Slide Author Workflow (Author-Friendly API)

* Add full slide: `builder.add(templates.slide.titleWith3Bullets, { ... })`
* Add extra items: `slide.add(templates.items.flowersInLBot)`
* DeckBuilder supports both full-slide and incremental approaches.

---

### ✅ Next Steps (Phased Build)

1. **Lock template signature** → done.
2. **Finish core item templates** → test individually.
3. **Create 2–3 slide templates** using item compositions.
4. **Test DeckBuilder as a free-form builder** (mix/match items).
5. **Later**: enforce stricter rules (e.g. no freeform items) if needed.

---

This gives you:

* Creative freedom now
* Clear authoring API
* Clean contract to Player
* Room to tighten later

Let’s call this your **DeckBuilder Manifesto v1** — and now we implement it step by step.
