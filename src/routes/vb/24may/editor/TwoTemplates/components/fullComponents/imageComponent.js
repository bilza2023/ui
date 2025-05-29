
// src/components/imageComponent.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a full‐slide image centered in the body zone (below any header),
 * at its intrinsic size (from theme.assets[src]).
 *
 * @param {object} theme       – your global theme, including theme.assets
 * @param {any[]}  data        – unused, kept for signature consistency
 * @param {{
 *   src: string,
 *   showAt?: number,
 *   xOffset?: number,      – injected by DeckBuilder.full()
 *   yOffset?: number       – injected by DeckBuilder.full()
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

  // 1) Get the asset's registered dimensions
  const asset = theme.assets?.[src] || {};
  const finalH = asset.height;

  // 3) Compute Y inside the body zone (header‐aware)
  const yPos = T.layout.getBodyY("top", finalH);

  // 4) Build the image item
  const imageItem = T.ItemBuilders.image(theme, {
    src,
    width:  T.designWidth -20,
    height: 400,
    x:      0 + 10, // 10 is padding
    y:      yPos,
    showAt
  });

  // 5) Fade it in
  T.AniHelpers.fadeIn(imageItem, showAt, 1);

  return [imageItem];
}
