
// donutChartWithLegend.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function donutChart(theme, data = [], config = {}) {
  const left = [];
  const right = [];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const centerX = T.designWidth / 4;
  const centerY = T.layout.getBodyY("center", config.outerRadius || 120);
  const outerRadius = config.outerRadius || 100;
  const innerRadius = config.innerRadius || 60;

  let startAngle = 0;

  data.forEach((entry) => {
    const { value, color } = entry;
    const sliceAngle = (value / total) * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;

    left.push(T.ItemBuilders.arc(theme, {
      x: centerX,
      y: centerY,
      radius: outerRadius,
      innerRadius,
      startAngle,
      endAngle,
      color: T.toPixiColor(color || theme.primaryColor)
    }));

    startAngle = endAngle;
  });

  const itemHeight = 36;
  const startY = centerY - (data.length * itemHeight) / 2;
  const legendX = T.designWidth * 0.55;

  data.forEach((entry, i) => {
    const y = startY + i * itemHeight;
    const pct = ((entry.value / total) * 100).toFixed(1) + "%";

    right.push(T.ItemBuilders.rect(theme, {
      x: legendX,
      y,
      width: 24,
      height: 24,
      color: T.toPixiColor(entry.color || theme.primaryColor)
    }));

    right.push(T.ItemBuilders.text(theme, {
      text: entry.label || "Item",
      x: legendX + 34,
      y,
      fontSize: 22,
      fontFamily: theme.fontFamilyBase,
      color: theme.baseTextColor
    }));

    right.push(T.ItemBuilders.text(theme, {
      text: pct,
      x: legendX + 180,
      y,
      width: 60,
      fontSize: 20,
      fontFamily: theme.fontFamilyBase,
      color: theme.baseTextColor,
      textAlign: "right"
    }));
  });

  return [...left, ...right];
}
