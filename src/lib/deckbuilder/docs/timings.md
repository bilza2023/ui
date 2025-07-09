````markdown
# Slide Timing Rules (v1)

## ✅ Objective

Ensure every `showAt` timestamp is valid within the deck’s global timeline and properly ordered per slide.

## ✅ Timing Concepts

- **Global timeline**  
  All times (`start`, `end`, and `showAt`) are measured in seconds from the very beginning of the deck playback.

- **Slide boundaries**  
  - `start`: automatically injected by DeckBuilder as the previous slide’s `end`.  
  - `end`: provided by your builder call (must be strictly greater than `start`).

- **Item appearance (`showAt`)**  
  - Absolute timestamp (in the same global timeline).  
  - Must satisfy:  
    ```text
    start ≤ showAt ≤ end
    ```  
  - If omitted in your builder data, DeckBuilder defaults it to the slide’s `start` time.

## ✅ Validation Rules

1. **Monotonic slide order**  
   Each slide’s `end` must be > the previous slide’s `end`.

2. **Item timing bounds**  
   For every item in `slide.data`:  
   ```text
   slide.start ≤ item.showAt ≤ slide.end
````

3. **Global progression**
   No two slides overlap in time. The deck’s timeline is contiguous.

## ✅ Common Pitfalls

* Forgetting to set a new `end` time, causing zero-length slides.
* Using a `showAt` less than `start` or greater than `end`.
* Inconsistent treatment of `showAt` as relative—remember it’s always absolute.

## ✅ Quick Checks

* **Per-slide**: glance at `[start, end]` and ensure every `showAt` falls inside.
* **Deck-wide**: verify `deck.slides[i].end < deck.slides[i+1].end` for all `i`.

---

This timing spec is frozen in **v1**; any extensions (grouping, transitions, offsets) will appear in **v2**.

