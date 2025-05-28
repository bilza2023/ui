
// halfImage.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function halfImage(theme, data = [], config = {}) {
  const {
    src,
    showAt = 0,
    width: cfgWidth,
    height,
    stylePresetKey = "withTopAndSideMargin",
    layoutMode = "center",
    x = 0,
    y = 0,
    xOffset = 0,
    yOffset = 0,
    margin = 20
  } = config;

  // half of the slide width (hard-coded to 1020/2)
  const halfWidth = 510;
  const width = cfgWidth != null ? cfgWidth : halfWidth - margin * 2;

  // build the image item, injecting offsets and margin
  const preset = T.stylePresets.image[stylePresetKey] || T.stylePresets.image.default;
  const imageItem = T.ItemBuilders.image(
    theme,
    T.applyPreset(preset, {
      src,
      width,
      height,
      x: xOffset + margin + x,
      y: yOffset + margin + y
    })
  );

//   if (layoutMode) {
//     T.layout(imageItem, layoutMode);
//   }

  T.AniHelpers.fadeIn(imageItem, showAt, 1);

  return [imageItem];
}
