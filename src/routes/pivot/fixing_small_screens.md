Here’s your compact, precise `.md` strategy file for fixing Pivot slides for small screens:

---

### 📱 Pivot Slide Responsiveness Strategy (Mobile Fix Plan)

**Goal:**
Ensure all 25 Svelte slide components display cleanly on **small screens (<768px width)** with readable text and stacked layout where needed.

---

### ✅ Global Principles

I. Use `flex-direction: column` or `grid-template-columns: 1fr` below 768px
II. All child containers: `width: 100%`, `max-width: 100%`
III. Add consistent `padding`, `gap`, and `box-sizing: border-box`
IV. Use `object-fit: contain` for images
V. Reduce `font-size` for headings and body text
VI. Maintain center alignment unless slide demands otherwise

---

### 🔧 Universal CSS Snippet

```css
@media (max-width: 768px) {
  .slide-container {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }

  .slide-title,
  .bullet-item,
  .caption-text {
    font-size: 1rem;
  }

  .image-zone,
  .text-zone,
  .bullets-zone {
    width: 100%;
    max-width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
}
```

---

### 📌 Fix Checklist Per Slide

1. Identify `.slide-container` or main layout block
2. Add `@media` query with flex/grid switch
3. Resize text zones and images
4. Test collapse behavior (should stack top-to-bottom)
5. Confirm nothing overflows or shrinks unreadably

---

**When to Apply:**
After reaching 25 desktop-perfect slides.
Apply in 1–2 day QA pass.

---

Let me know if you want this saved as a file or enhanced with visual examples.
