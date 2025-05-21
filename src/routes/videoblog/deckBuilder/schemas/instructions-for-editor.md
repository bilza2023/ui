# 📝 Instructions for Slide Editor

## 🎯 Purpose

This guide defines the structure and rules the slide editor must follow to ensure full compatibility with the Slim Presentation Player. All design assumptions, item definitions, and layout constraints are detailed below.

---

## 📐 Canvas & Coordinate System

* **Design Resolution:** `1020 × 576`
* **Coordinate Origin:** Top-left `(0,0)`
* **Bottom-right Corner:** `(1020,576)`
* **Coordinate Space:** All item `x`, `y`, `width`, and `height` values must be authored relative to this design resolution.

### 🔍 Rendering Behavior

* The canvas is scaled proportionally at runtime.
* Items placed outside the bounds **may be clipped**.
* Ensure that preview inside the editor reflects these dimensions.

---

## 🧱 Item Definitions (Schemas)

### 1. **Text Item**

```json
{
  "type": "text",
  "text": "",
  "x": 0,
  "y": 0,
  "width": 200,
  "height": 50,
  "fontSize": 24,
  "fontFamily": "Arial",
  "color": "#ffffff",
  "textAlign": "left",
  "lineHeight": 1.2,
  "backgroundColor": null,
  "padding": 0,
  "borderColor": null,
  "borderWidth": 0,
  "rotation": 0,
  "zIndex": 0,
  "visible": true
}
```

### 2. **Rectangle Item**

```json
{
  "type": "rect",
  "x": 0,
  "y": 0,
  "width": 100,
  "height": 100,
  "fillColor": "#cccccc",
  "borderColor": null,
  "borderWidth": 0,
  "rotation": 0,
  "zIndex": 0,
  "visible": true
}
```

### 3. **Circle Item**

```json
{
  "type": "circle",
  "x": 0,
  "y": 0,
  "radius": 50,
  "fillColor": "#999999",
  "borderColor": null,
  "borderWidth": 0,
  "rotation": 0,
  "zIndex": 0,
  "visible": true
}
```

---

## 🖼 Slide-Level Properties

Each slide must define:

```json
{
  "id": "slide-1",
  "startTime": 0,
  "endTime": 5,
  "backgroundColor": "#000000",
  "items": [ /* Array of items */ ]
}
```

* `id` must be unique across slides.
* `startTime`/`endTime` define when the slide is active (in seconds).
* `backgroundColor` fills the entire canvas for the duration of the slide.

---

## ✅ Optional Future Extensions (Non-Breaking)

### Slide Transitions

```json
"transition": {
  "type": "fade",
  "duration": 0.5
}
```

### Item Animations

```json
"animation": {
  "type": "fade-in",
  "delay": 0.3,
  "duration": 0.5
}
```

These fields are **optional** and will be supported in later phases without requiring changes to current slide definitions.

---

## 🔚 Final Notes

* Use the reference layout slides (corner dots, quadrant fills, etc.) to visually validate item positions.
* Always ensure exported slide data conforms to these schemas.
* Contact the player development team before introducing new item types.

---

End of document.
