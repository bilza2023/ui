// animationModule/presets/index.js

// Only returns clean tween objects — no direct item access

export function fadeIn(delay = 0, dur = 1) {
  return {
    field: "alpha",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: { from: 0, to: 1, primitive: "easeOut" }
  };
}

export function fadeOut(delay = 0, dur = 1) {
  return {
    field: "alpha",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: { from: 1, to: 0, primitive: "easeIn" }
  };
}

export function slideUp(delay = 0, dur = 1, fromY = null, toY = null, easing = "easeOut") {
  return {
    field: "y",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: {
      from: fromY,
      to: toY,
      primitive: easing
    }
  };
}

export function scaleUp(delay = 0, dur = 1, from = 0.5, to = 1, easing = "easeOut") {
  return {
    field: "scale",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: { from, to, primitive: easing }
  };
}
