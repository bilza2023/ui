// imageComponent.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a full-slide image centered in the body zone (below any header).
 *
 * @param {object} theme – global theme, including theme.assets
 * @param {any[]}  data – unused, kept for signature consistency
 * @param {{
 *   src: string,
 *   showAt?: number,
 *   xOffset?: number,
 *   yOffset?: number
 * }} config
 * @returns {SlideItem[]}
 */
export default function imageComponent(theme, data = [], config = {}) {
  const {
    src,
    showAt = 0,
    xOffset = 0,
    yOffset = 0
  } = config;

  // Default height if not available in theme.assets
  const asset = theme.assets?.[src] || {};
  const finalH = asset.height || 400;

  const yPos = T.layout.getBodyY("top", finalH) + yOffset;
  const xPos = xOffset + 10;
  const width = T.designWidth - 20;

  const imageItem = T.ItemBuilders.image(theme, {
    src,
    width,
    height: finalH,
    x: xPos,
    y: yPos
  });

  T.AnimApi.animate(imageItem, "alpha", 0, 1, showAt, showAt + 1, "easeOut");

  return [imageItem];
}
