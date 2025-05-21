# From Fixed Seconds to Relative Offsets – Mindset Shift Recap

---

## 1 · Old Assumption

> "Narration is the master; every visual cue gets a **hard‑coded global timestamp** (53 s, 74 s …). Slides are adjusted only *after* the voice‑over is final."

*Result:* every small edit (trim silence, insert slide, speed change) meant retiming dozens—or thousands—of absolute stamps.

---

## 2 · New Model (Relative‑First)

| Concept            | What it means                                                                        | Why it matters                                                |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **Duration chain** | Slides expose just `duration`, ordered list → builder derives `startTime / endTime`. | Insert, delete, or reorder slides without re‑editing items.   |
| **Item offsets**   | Each item stores `showAt` **relative to its slide start (0 s → duration)**.          | One slide can live in many presentations and languages.       |
| **Author comfort** | API may accept absolute seconds (`showAbs`), but converts immediately to offsets.    | Authors think in narration cues; engine remains reorder‑safe. |
| **Master clock**   | Player adds `slide.startTime + item.showAt` at runtime.                              | Same JSON survives audio swaps, speed controls, overlays.     |

---

## 3 · Key Benefits

1. **Resilience to late edits** – trim audio, split slides, add overlays → builder re‑chains durations, no ripple retime.
2. **Multi‑track freedom** – swap English (180 s) with Urdu (195 s). Adjust slide durations once; offsets stay valid.
3. **Playback speed future‑proofing** – 1.25× or 0.75× multipliers scale the master clock; relative math still lands cues.
4. **Reusable assets** – the very same slide JSON can feature in a teaser, full course, or different language cut.

---

## 4 · Practical Rules We Locked In

1. **Author input** ➜ `duration` per slide, **optional** absolute `showAbs` for items.
2. **API layer** instantly converts `showAbs` → `showAt = showAbs – slideStartAbs` and drops `startAbs`.
3. **Engine stores** only `duration` + relative `showAt`.
4. **Builder** validates `showAt < duration` and sums durations to rebuild start/end after any reorder.
5. **Player** treats the JSON as gospel: `if (global ≥ start + showAt) → render`.

---

## 5 · Why This Mindset Felt Hard

* The human instinct is to line visuals to the *final* soundtrack—video editors work that way.
* Offset‑thinking requires trusting that start times are **derived**, not authored.
* Fear of "losing exactness" until we proved offsets + derived starts still land on the same global second.

Once that click happens, the model becomes obviously lighter, safer, and future‑proof.

> **Takeaway:** Author conveniences (absolute seconds) are *interfaces*. The **data contract** remains relative so the system stays agile.
