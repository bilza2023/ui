// halfImage.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function halfImage(theme, data = {}, config = {}) {
  const {
    src,
    showAt = 0,
    // optional explicit width/height
    width: cfgWidth,
    height: cfgHeight,
    // offsets from DeckBuilder.half()
    xOffset = 0,
    yOffset = 0,
    // spacing inside the half-pane
    margin = 20,
    // any per-slide tweaks
    x = 0,
    y = 0
  } = config;


  // 1) compute half-canvas dimensions
  const halfCanvas = T.designWidth / 2;
  const finalWidth  = cfgWidth  != null ? cfgWidth  : halfCanvas - margin * 2;
  const finalHeight = cfgHeight != null ? cfgHeight : undefined;

  // 2) manual horizontal centering within the half-pane
  //    start of this half = xOffset
  //    free space = halfCanvas − finalWidth
  const centerX = xOffset + (halfCanvas - finalWidth) / 2 + x;

  // 3) vertical position = header offset + top margin + any user y
  // const finalY = yOffset + margin + y;
  const finalY =    T.layout.getBodyY("top", y);

  // 4) build the item
  const imageItem = T.ItemBuilders.image(theme, {
    src,
    width:  finalWidth,
    height: finalHeight,
    x:      centerX,
    y:      finalY,
    showAt
  });

  // 5) fade-in animation
  T.AniHelpers.fadeIn(imageItem, showAt, 1);

  return [imageItem];
}
