// items/icon/animations.js
// Animation presets specifically for ICON items

export const fadeIn = (start = 0, duration = 1) => ({
    fn: "tween",
    start,
    end: start + duration,
    field: "alpha",
    props: { from: 0, to: 1, primitive: "easeOut" }
  });
  
  export const pop = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 0.6,
    field: "scale",
    props: { from: 0.4, to: 1.0, primitive: "easeOut" }
  });
  
  export const flyInTop = (start = 0, fromY = -300) => ({
    fn: "tween",
    start,
    end: start + 1,
    field: "y",
    props: { from: fromY, to: null, primitive: "easeOut" } // to be filled
  });
  
  export const blink = (start = 0, duration = 0.5) => ({
    fn: "tween",
    start,
    end: start + duration,
    field: "alpha",
    props: { from: 1, to: 0.2, primitive: "pingPong" }
  });
  
  export const wiggle = (start = 0, amount = 5) => ({
    fn: "tween",
    start,
    end: start + 0.4,
    field: "x",
    props: { from: -amount, to: amount, primitive: "sine" }
  });
  