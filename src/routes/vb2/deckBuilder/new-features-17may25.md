# New Features — 17 May 2025

## 1. Background Visuals Hierarchy

* A slide's background can now be one of the following, in order of priority:

  1. `backgroundPattern`
  2. `backgroundImage`
  3. `backgroundColor`
* Only one background type is active at a time.
* All background fields are defined in the global theme and can be overridden per slide.

## 2. Overlay System

* A new global overlay layer can render visuals based on **percentage of presentation time**.
* These are not part of any specific slide and do not occupy time on the main timeline.
* Use cases include watermarks, page numbers, HUD elements, and decorative corners.

## 3. Slide-Specific Add-ons via `addonItems`

* Templates remain closed and uneditable.
* When calling `deck.add(...)`, you may now pass an `addonItems` field.
* These items will be merged into the slide *after* the template is processed.
* Useful for:

  * Logos or watermarks for a single slide
  * Extra visuals like flowers, icons, or reminders

## Final Notes

* Templates are no longer expected to expose `getItems()` or be modified after loading.
* The `addonItems` convention ensures flexibility without compromising reusability.
* All these features are available per slide and do not alter the global structure.

---

This log is part of the design evolution for the Taleem Presentation System.
All features listed above are confirmed and ready for implementation.
