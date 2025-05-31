import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Full-component bar graph with manually centered value and label under each bar.
 *
 * @param {object} theme
 * @param {Array<{value: number, label?: string, color?: string, showAt?: number}>} data
 * @param {{
 *   maxValue?: number,
 *   height?: number,
 *   barPadding?: number,
 *   barColor?: string,
 *   fontSize?: number,
 *   maxBarWidth?: number,
 *   labelFontSize?: number
 * }} config
 */
export default function barchart(theme, data = [], config = {}) {
  const {
    maxValue = Math.max(...data.map(d => d.value), 1),
    height = config.height || 240,
    barPadding = config.barPadding || 100,
    barColor = theme.primaryColor || "#00ffaa",
    fontSize = config.fontSize || 22,
    maxBarWidth = config.maxBarWidth || 25,
    labelFontSize = config.labelFontSize || 20
  } = config;

  const numBars = data.length;
  const barWidth = Math.min(maxBarWidth, (T.designWidth - (numBars + 1) * barPadding) / numBars);
  const totalWidth = numBars * barWidth + (numBars + 1) * barPadding;
  const xStart = (T.designWidth - totalWidth) / 2;
  const yStart = T.layout.getBodyY("center", height + fontSize + labelFontSize + 12);

  const items = [];

  data.forEach((entry, index) => {
    const { value, color, label = "", showAt = 0 } = entry;
    const barHeight = (value / maxValue) * height;
    const x = xStart + barPadding + index * (barWidth + barPadding);
    const barBottom = yStart + height;

    // Colored bar
    items.push(T.ItemBuilders.rect(theme, {
      x,
      y: barBottom - barHeight,
      width: barWidth,
      height: barHeight,
      color: T.toPixiColor(color || barColor)
    }));


    // Value under label
// Value under label
items.push(T.ItemBuilders.text(theme, {
  text: `${entry.label}`,
  x,
  y: barBottom + labelFontSize + 6,
  width: barWidth,
  textAlign: "center",
  fontSize,
  fontFamily: theme.fontFamilyBase,
  color: theme.baseTextColor
}));


  });

  return items;
}
