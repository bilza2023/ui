Next Big Steps

1: Convert Eq Slide to curreent system
2: Investigate adding timings to the app in near future
3: adding lot of content in the system
4: creating syllabus
5: KateX and LaTeX format in slides
6: Workshop -BackOffice
7: Student Studio

8: This project has become non managable with out some system


Timings
## ✅ What We Need for Adding Timings (Condensed)

I. **Per-slide timing**
→ Add `start` and `end` to each slide in the deck JSON

II. **Per-item timing (optional)**
→ Add `start` field to items (e.g. bullets, lines) for staged reveals

III. **Expose `currentTime` in Player**
→ Used to determine which slide and which items are active

IV. **Slide activation logic**
→ Show slide if `currentTime >= start && currentTime < end`

V. **Item activation logic**
→ Show item if `currentTime >= item.start` (no `end` needed)

VI. **Time progress controller**
→ Can be manual (slider) or automatic (autoplay with timer)

VII. **Preview mode**
→ Allow slide testing at different times (scrub or simulate)

No animations. No UI chrome. Just raw `start`, `end`, and logic hooks.
