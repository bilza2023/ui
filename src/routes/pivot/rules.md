`p-p`

Here’s your **layout rule summary** for your `.md` doc:

---

## 📐 Slide Layout Rules (v1)

### 1. **Width**

* Always set to `100%` of the available container
* Max width can be capped (e.g. `1280px`) for ultra-wide screens

### 2. **Aspect Ratio**

* All slides use a **16:9 aspect ratio**
* Height is automatically calculated based on width

```css
aspect-ratio: 16 / 9;
width: 100%;
max-width: 1280px;
```

### 3. **Height**

* Do **not** use fixed pixel or `100vh` height
* Let height derive from width to ensure layout scale stays predictable
* Extra vertical space (if any) appears as black bars (letterboxing)

### 4. **Centering (Optional)**

* Wrap slides in a flex container to center vertically if needed:

```css
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
```

---

This ensures:

* Visual stability
* Mobile responsiveness
* Seamless audio/visual sync
* Export-readiness to video or iframe

---

> Use this in your `layout-rules.md` or embed directly into `slide-system-spec-v2.md`. Ready to generate `SlideWrapper.svelte` now?
