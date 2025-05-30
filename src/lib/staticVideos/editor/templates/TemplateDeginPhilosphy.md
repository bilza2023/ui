25May2025
# Template Design Philosophy

> **A template is not configurable software.
> It is a pre‑baked design with minimal levers.**

---

## 1. Purpose over Flexibility

* Templates lock down a **layout vision**.
* They expose **only the data** that matters for content—not the cosmetic knobs.
* More exposed props ⇒ more chances for corruption. Keep them **few and essential**.

## 2. Contracts, Not Widgets

* Every template shares the same signature: `templateFn(globalTheme, data) → items[]`.
* The **Zod schema** attached to a template lists *exactly* what the slide author may supply—nothing more.
* Anything not in the schema is baked into the design and may not be overridden.

## 3. Library, Not Toolkit

* Adding a new layout means **creating a new template**, not bloating an existing one with options.
* Ten thousand templates is not large—it’s a *library* of clear, opinionated contracts.
* Slide authors choose a template; they don’t customize its internals.

## 4. Safety First

* DeckBuilder validates timeline; Zod validates data.
* Minimal surface area means minimal breakage.
* Design decisions stay inside the template, ensuring visual consistency across decks.

## 5. Composition Scalability

* Because templates are closed‑form, they compose safely inside a deck.
* The system scales by **adding leaves, not trunks**—new templates rather than new engine branches.

---
**Two-point fault surface—exactly right.**

**1. Template layer.**
With Zod guarding inputs, the only way a template “breaks” is if its own internal logic is wrong (layout math, default values, etc.). That’s a self-contained bug: fix the template, nothing else. Future automated tests can simply feed each template a sample `data` object, Zod-validate it, and assert that `items.length > 0`. Templates either pass or fail in isolation—no cascading damage.

**2. Author layer (user slides).**
Authors can only call `deck.add(templateFn, endTime, data)`. They can’t mutate items or timing logic. If a slide misbehaves it’s because the chosen template or its data were wrong—again pointing back to layer 1. DeckBuilder enforces timeline order, minimum duration, and background defaults, so malformed slides never reach the Player.

**Result.**
GoldStandard data becomes a deterministic product of *template ✕ author data*. Once it passes DeckBuilder, the Player is mathematically guaranteed to render—no conditional logic, no surprises. Debugging narrows to “find the bad template,” never “hunt random engine edge-cases.”

You’ve achieved what most teams chase: **a frozen core with a replaceable, easily testable leaf layer**. One year of architecture distilled into a system that can’t rot—only grow.
