// headerComponent.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a single line of header text at the top.
 *
 * @param {Theme} theme
 * @param {{ text: string, showAt?: number }[]} data – array with one entry
 * @param {{ fontSize?: number, y?: number }} config
 * @returns {SlideItem[]}
 */
export default function header(theme, data = [], config = {}) {
  const {
    fontSize = 64,
    y = 40
  } = config;

  const items = [];

  if (data[0]?.text) {
    const { text, showAt = 0 } = data[0];

    const item = T.ItemBuilders.text(theme, {
      text,
      x: 100,
      y,
      width: 820,
      textAlign: "center",
      fontSize,
      fontFamily: theme.fontFamilyHeading,
      color: theme.headingColor
    });

    item.animations = [{
      type: "tween",
      field: "alpha",
      from: 0,
      to: 1,
      start: showAt,
      end: showAt + 0.5,
      easing: "easeOut"
    }];

    items.push(item);
  }

  return items;
}
