// animationModule/animationFunctions.js
import { valueTween } from './kinetics/valueTween.js';

export const animationFunctions = {
  showAt(item, t, start, end, props) {
    item.visible = t >= start;
  },

  fadeIn(item, t, start, end, { from = 0, to = 1 }) {
    // debugger;
    if (t < start) {
      item.alpha = from;
    } else if (t > end) {
      item.alpha = to;
    } else {
      const k = (t - start) / (end - start);
      item.alpha = lerp(from, to, k);
    }
  },

  move(item, t, start, end, { fromX, toX, fromY, toY, primitive = "linear" }) {
    if (fromX !== undefined && toX !== undefined) {
      item.x = valueTween({ from: fromX, to: toX, t, start, end, primitive });
    }
    if (fromY !== undefined && toY !== undefined) {
      item.y = valueTween({ from: fromY, to: toY, t, start, end, primitive });
    }
  },

  scaleUp(item, t, start, end, { from = 1, to = 1 }) {
    if (t < start) {
      item.scale.set(from);
    } else if (t > end) {
      item.scale.set(to);
    } else {
      const k = (t - start) / (end - start);
      const scale = lerp(from, to, k);
      item.scale.set(scale);
    }
  },

  blink(item, t, start, end, { frequency = 2 }) {
    if (t < start || t > end) {
      item.visible = false;
      return;
    }
    const blinkCycle = Math.floor((t - start) * frequency * 2);
    item.visible = blinkCycle % 2 === 0;
  }
};
