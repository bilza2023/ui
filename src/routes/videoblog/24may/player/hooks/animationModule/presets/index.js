
// animationModule/presets/index.js

export function fadeIn(delay = 0, dur = 1) {
    return {
      field: "alpha",
      fn: "tween",
      start: delay,
      end: delay + dur,
      props: { from: 0, to: 1, primitive: "easeOut" }
    };
  }
  
  export function slideUp(delay = 0, dur = 1, distance = 60, easing = "easeOut") {
    return {
      field: "y",
      fn: "tween",
      start: delay,
      end: delay + dur,
      props: { from: `+${distance}`, to: 0, primitive: easing }
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
  