
**Taleem Pixi Drawing App – Final Architecture**

The Pixi Drawing App uses a **Template-First Rendering System**. Each slide is rendered using a `PixiTemplate` — a class-based object that draws a complete slide using predefined structure and helpers. Templates do not use item arrays; they render directly onto a PIXI application.

---

**Core Concepts**

* **PixiTemplate:** A class that defines `.draw(app)` method and controls everything shown on the slide.
* **BasePixiTemp:** An abstract base class extended by all templates. It provides utility methods, shape helpers, section layout system, and future extensibility (like animation ticks).
* **Sections System:** Every slide is divided into standard vertical sections: `header`, `main`, and `footer`. These are pre-initialized containers with fixed dimensions based on the design canvas.
* **Shapes Library:** A centralized helper toolkit that provides functions to draw basic and educational shapes (e.g., `drawCircle`, `drawVenn`, `drawAxis`, `drawPieChart`) using PIXI.Graphics.
* **Factory Registration:** Each template is exported using a factory function that returns an instance of its class, ready to be added to a deck.

---

**Sections Structure**

Available sections by default:

* `this.sections.header`
* `this.sections.main`
* `this.sections.footer`

---

=>
we still need background , pattern , bg images , themes

further
the idea is a mindset change  I have been making slides as if they are to be shown on huge projector to some big crowd. but these are suppose to be shown on mobile phones to users, so all we need is 1-2 max 3 items on a screen -- mobile first should be the rule ->agreed?

