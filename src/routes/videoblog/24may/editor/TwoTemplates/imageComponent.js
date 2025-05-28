
// imageComponent.js
import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

/**
 * Renders a single image with optional layout and fade-in timing.
 *
 * @param {Theme}                   theme
 * @param {any[]}                   data   – unused (for signature consistency)
 * @param {{
 *   src: string,                // image key or URL (required)
 *   showAt?: number,            // when to fade in (absolute seconds)
 *   width?: number,             // optional override
 *   height?: number,            // optional override
 *   stylePresetKey?: string,    // e.g. "image.withTopAndSideMargin"
 *   layoutMode?: string         // e.g. "center", "left", etc.
 * }} config
 * @returns {SlideItem[]}
 */
export default function image(theme, data = [], config = {}) {
  const {
    src,
    showAt = 0,
    width,
    height,
    stylePresetKey = "withTopAndSideMargin",
    layoutMode = "center"
  } = config;

  const items = [];

  // build the image item
  const preset = T.stylePresets.image[stylePresetKey] || T.stylePresets.image.default;
  const imageItem = T.ItemBuilders.image(
    theme,
    T.applyPreset(preset, { src, width, height })
  );

  // optional automatic layout
  if (layoutMode) {
    T.layout(imageItem, layoutMode);
  }

  // fade in
  T.AniHelpers.fadeIn(imageItem, showAt, 1);

  items.push(imageItem);
  return items;
}
