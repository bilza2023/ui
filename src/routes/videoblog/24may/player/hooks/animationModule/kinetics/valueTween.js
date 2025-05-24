// kinetics/valueTween.js
import { easingMap } from './easing.js';

export function valueTween({ from, to, t, start, end, primitive = "linear" }) {
  const easingFn = easingMap[primitive] || easingMap.linear;
  const duration = end - start;
  if (duration <= 0) return to;

  let k = (t - start) / duration;
  k = Math.max(0, Math.min(1, k)); // clamp 0–1

  const curve = easingFn(k);
  return from + (to - from) * curve;
}
