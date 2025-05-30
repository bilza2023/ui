
// items/arc/index.js
export default function arc(theme, {
    x,
    y,
    radius,
    innerRadius = 0,
    startAngle,
    endAngle,
    color = theme.primaryColor
  }) {
    return {
      type: "arc",
      x,
      y,
      radius,
      innerRadius,
      startAngle,
      endAngle,
      color
    };
  }
  