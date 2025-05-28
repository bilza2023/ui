
// imageComponent.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a single image with optional layout and fade-in timing.
 *
 * @param {Theme}    theme
 * @param {any[]}    data          – unused, kept for signature consistency
 * @param {{
 *   src: string,
 *   showAt?: number,
 *   width?: number,
 *   height?: number,
 *   stylePresetKey?: string,
 *   layoutMode?: string,
 *   x?: number,
 *   y?: number,
 *   xOffset?: number,
 *   yOffset?: number
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
    layoutMode = "center",
    x = 0,
    y = 0,
    xOffset = 0,
    yOffset = 0
  } = config;
 
  // Build the image item, injecting offsets into its position
  const preset = T.stylePresets.image[stylePresetKey] || T.stylePresets.image.default;
  const imageItem = T.ItemBuilders.image(
    theme,
    T.applyPreset(preset, {
      src,
      width,
      height,
      x: xOffset + x,
      y: yOffset + y
    })
  );

  // Apply automatic layout if requested
  // if (layoutMode) {
  //   T.layout(imageItem, layoutMode);
  // }

  // Fade in at the specified time
  T.AniHelpers.fadeIn(imageItem, showAt, 1);

  return [imageItem];
}
