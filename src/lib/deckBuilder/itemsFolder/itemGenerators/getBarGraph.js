

import { getText, getCircle, getRect, getImage } from '../index';

export   // 👉 Local helper for testing bar graphs
function getBarGraph({
  x = 0,
  y = 0,
  width = 400,
  height = 200,
  values = [],
  labels = [],
  barColor = "#3399ff",
  barSpacing = 20,
  fontSize = 20,
  maxValue = Math.max(...values)
}) {
  const items = [];
  const barCount = values.length;
  if (barCount === 0) return items;

  const barWidth = (width - (barSpacing * (barCount - 1))) / barCount;

  for (let i = 0; i < barCount; i++) {
    const value = values[i];
    const label = labels[i] || "";

    const barHeight = (value / maxValue) * height;
    const barX = x + i * (barWidth + barSpacing);
    const barY = y + (height - barHeight); // bottom-aligned

    const rect = getRect({
      x: barX,
      y: barY,
      width: barWidth,
      height: barHeight,
      fill: barColor
    });

    const text = getText(label);
    text.x = barX + barWidth / 2 - (text.width || 100) / 2;
    text.y = y + height + 10;
    text.fontSize = fontSize;
    text.color = "#333";
    text.padding = 0;
    text.backgroundColor = null;

    items.push(rect, text);
  }

  return items;
}