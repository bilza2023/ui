## 🗓️ Mission 24 May 2025

### 🎯 Mission Overview

Today, we will rebuild the core rendering system of our canvas slide engine, Inshallah. The goal is to create a clean, animation-native Player that renders slides based on time. We are removing legacy concepts like overlays and `showAt`, and building the system around a flat list of items with animation instructions baked into each item. The Player is the main runtime system — everything else (Builder, Templates, Editor) just prepares data for it.

---

### 🧠 Main System

At the heart of our design is a simple, powerful loop:

1. Load the current slide
2. Draw the slide background
3. Loop over all items:

   * Run animations (mutate props by time)
   * Draw item using its type-specific draw function

This loop runs every frame. The Player holds current time and slide index; the DrawEngine handles rendering.

---

### 🧭 Design Philosophy

**1. Flat Items Only** — All items are inside `slide.items[]`. No nesting, no overlays. Any grouping is conceptual, handled by the editor.

**2. Dumb Player** — The Player only runs the given slide data. It does not decide what to draw, show, or animate. It just loops over items, applies animations based on time, and calls `drawX()`.

**3. Data-Driven Animations** — Items contain an `animate[]` array. The animation module reads this and applies visual mutations like alpha, position, scale. Visibility is fully handled via animation (no `showAt`).

---

### 🧱 Features to Build (Player Side)

* A clean `Player.js` that manages time and slide switching
* `DrawEngine.js` with a `draw(slide, currentTime)` method
* Background drawing inside DrawEngine
* Animation module that applies `animate[]` to each item
* Dispatcher function `drawItem(item)` that routes to `drawText`, `drawIcon`, etc.
* Basic `drawX()` functions for item types
* Final item format: flat items with optional `animate[]`

---

This mission focuses purely on the Player pipeline. Builders and templates will be built after this, only to generate data for this system.
