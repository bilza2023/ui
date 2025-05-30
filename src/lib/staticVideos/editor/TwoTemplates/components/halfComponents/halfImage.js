// halfImage.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function halfImage(theme, data = {}, config = {}) {
  const {
    src,
    showAt = 0,
    width: cfgWidth,
    height: cfgHeight,
    xOffset = 0,
    yOffset = 0,
    margin = 20,
    x = 0,
    y = 0
  } = config;

  const halfCanvas = T.designWidth / 2;
  const finalWidth = cfgWidth != null ? cfgWidth : halfCanvas - margin * 2;
  const finalHeight = cfgHeight != null ? cfgHeight : undefined;

  const centerX = xOffset + (halfCanvas - finalWidth) / 2 + x;
  const finalY = T.layout.getBodyY("top", y) + yOffset;

  const imageItem = T.ItemBuilders.image(theme, {
    src,
    width: finalWidth,
    height: finalHeight,
    x: centerX,
    y: finalY
  });

  T.AnimApi.animate(imageItem, "alpha", 0, 1, showAt, showAt + 1);

  return [imageItem];
}
