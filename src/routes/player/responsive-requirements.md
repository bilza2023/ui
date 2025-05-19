Perfect — based on your 3-point **Objective**, here’s a clear explanation of how we achieve it.

---

## ✅ Objective Breakdown

---

### **1: Keep a fixed design resolution (1020×576)**

This is your **logical canvas space** — your drawing engine and item positions are defined in this size.

📌 Example:

* A title at `x: 100, y: 100` means **100px from the top-left of the 1020×576 design**.
* All templates, backgrounds, and items are designed in this space.

This design resolution is **not the physical pixel size of the canvas**, but the coordinate system you want to preserve.

---

### **2: Show the entire slide on screen below the SlideNav**

We calculate how much space is available:

```js
availableHeight = window.innerHeight - NAV_H - FOOT_H;
```

Then, we run this logic:

```js
function fitCanvasToViewport(viewportW, viewportH) {
  let width = viewportW;
  let height = width / (16 / 9);

  if (height > viewportH) {
    height = viewportH;
    width = height * (16 / 9);
  }

  return { width, height };
}
```

This ensures:

* We try to use full screen width
* But **if the height is too big**, we shrink the canvas to fit vertically instead
* This avoids cutting off the canvas in **mobile landscape**

---

### **3: Keep aspect ratio perfect (16:9)**

We **never distort** the canvas because:

* We always calculate `height = width / aspectRatio`
* Or the reverse if needed
* This preserves the 16:9 shape

✅ Result:

* No squishing
* No stretching
* Just a **scaled down version** of your 1020×576 design that fits the screen

---

## 🧠 Bonus: Scaling for Drawing Items

To convert design-space positions to actual screen pixels, you already use:

```js
scale = Math.min(canvasW / designW, canvasH / designH);
```

Then apply:

```js
screenX = item.x * scale + offsetX;
screenY = item.y * scale + offsetY;
```

So all items are correctly scaled and centered.

---

### ✅ Final Result

| Aspect       | Result                                      |
| ------------ | ------------------------------------------- |
| Design size  | Always 1020×576                             |
| Screen fit   | Shrinks canvas if needed, no overflow       |
| Aspect ratio | Preserved perfectly (16:9)                  |
| Item scaling | Uniform scale keeps item proportions intact |

---

Would you like to visualize this next with a mock image or move to test it live?
