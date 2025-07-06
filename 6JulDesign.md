**Responsive-Slide Fix Guide**

Use this exact checklist whenever you refactor a slide. Follow the rules in order; do not skip steps. The goal is a single layout that automatically scales instead of breaking into separate mobile / desktop versions.

---

### 1. Wrap Every Slide in a Scalable Shell

Create (or reuse) a wrapper component that applies
`transform: scale(var(--scale))`
and sets `--scale` globally to
`min(1, window.innerWidth / 1000)`.
All inner content now shrinks uniformly on narrow screens.

### 2. Convert the Slide Root to a Flex Stack

Replace fixed positioning with flex:

```
display: flex;
flex-direction: column;
justify-content: center;
gap: clamp(1rem, 5vh, 3rem);
```

No absolute pixel offsets. The gap gives automatic breathing space that scales with viewport height.

### 3. Replace Hard Font and Image Sizes with clamp()

Use **clamp(min, ideal, max)** for everything that scales:

* Titles → `font-size: clamp(2rem, 6vw, 4rem)`
* Body text → `font-size: clamp(1rem, 4vw, 2.5rem)`
* Images → `width: clamp(60%, 90vw, 100%); aspect-ratio: 3/2`

This single rule removes the need for separate mobile font settings.

### 4. Eliminate Media Queries Except for Layout Collapse

Only add a media query when the entire layout must flip from:

* row → column
* grid → stacked

If your slide never needs to flip, delete all media queries and rely on the scale wrapper plus `clamp()` sizing.

### 5. Treat Each Slide Like a Centered Card

Give every slide a max content width (e.g. 1000 px) and center it with auto margins. Do **not** force full-height unless the design demands it. Vertical rhythm comes from the flex `gap`, not from manual top/bottom padding tweaks.

### 6. Move Common Patterns to Utility Classes

Create a tiny CSS layer:

```
.responsive-text  { font-size: clamp(1.2rem, 5vw, 2.5rem); }
.responsive-img   { width: clamp(60%, 80vw, 100%); aspect-ratio: 3 / 2; }
.responsive-stack { display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: clamp(1rem, 5vh, 2rem); }
```

Apply these classes instead of redefining styles in every component.

---

### Core Principle

**Design for the container, not the slide.**
If the scalable wrapper and `clamp()` rules are in place, *every* slide will render “smaller but intact” on a phone and “full size” on a desktop—no fragile per-slide tweaks required.
