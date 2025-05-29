
Here’s the **4-Core-Template System** laid out in plain terms:

---

## 1. What It Is

A **minimal set of slide-template functions** that cover every layout you’ll ever need, by varying only the **body’s width** while reusing the same header/footer logic.

---

## 2. The Four Core Templates

Each template has three “zones” stacked top-to-bottom:

1. **Header** (optional)
2. **Body**  (required)
3. **Footer** (optional)

They differ only in how the **body** zone is sized:

| Template Name       | Body Variant  | Description                                     |
| ------------------- | ------------- | ----------------------------------------------- |
| `headerFullBody`    | full (1/1)    | Body fills the entire width below header        |
| `headerHalfBody`    | half (1/2)    | Body split into two columns (choose left/right) |
| `headerThirdBody`   | third (1/3)   | Body split into three equal columns             |
| `headerQuarterBody` | quarter (1/4) | Body split into four equal columns              |

If you need **no header** or **no footer**, simply pass `null` for that slot—every template automatically collapses empty zones so there are **no gaps**.

---

## 3. How It Works

1. **Author picks a core template** by body size (full/half/third/quarter).
2. **Header & footer slots** accept any “headerBlock” or “footerBlock” item-templates you’ve built (e.g. `titleBar`, `progressFooter`).
3. **Body slot** accepts only the item-template variants built for its size (e.g. `bulletListFull` for full, `bulletListHalf` for half, etc.).
4. Under the hood, the template:

   * Computes the bounding box for each zone (using simple helpers like `full()`, `col(i,2)`, `col(i,3)`, `col(i,4)`).
   * Calls your item-template functions with `{ box, theme }`.
   * Flattens everything into one slide.

---

## 4. Why It’s Better

* **Only four templates** to learn and document.
* **Header/footer reuse**: write them once, plug them everywhere.
* **Strict body variants**: no more tweaking sizes in hundreds of slide-templates.
* **Flexibility**: omit header/footer at will, or swap in any item-template for dynamic “radio” slides.
* **GPT-ready**: each template is just a contract of “here’s your box, do your layout.”

---

### Next

With these four in place, you:

* Build or migrate your existing slides into them.
* Create the matching **item-template variants** (`*Full`, `*Half`, `*Third`, `*Quarter`) as needed.
* Enjoy a radically simplified, future-proof slide system.

addFull(   time: number, bodyItems: CanvasItem[], headerItems?: CanvasItem[], footerItems?: CanvasItem[] ): void;
addHalf(   time: number, bodyItems: CanvasItem[], headerItems?: CanvasItem[], footerItems?: CanvasItem[] ): void;
addThird(  time: number, bodyItems: CanvasItem[], headerItems?: CanvasItem[], footerItems?: CanvasItem[] ): void;
addQuarter(time: number, bodyItems: CanvasItem[], headerItems?: CanvasItem[], footerItems?: CanvasItem[] ): void;
