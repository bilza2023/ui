// items/image/animations.js
// Animation presets specifically for IMAGE items

export const fadeIn = (start = 0, duration = 1) => ({
    fn: "tween",
    start,
    end: start + duration,
    field: "alpha",
    props: { from: 0, to: 1, primitive: "easeOut" }
  });
  
  export const flyInRight = (start = 0, fromX = 1200) => ({
    fn: "tween",
    start,
    end: start + 1,
    field: "x",
    props: { from: fromX, to: null, primitive: "easeOut" } // to be filled
  });
  
  export const scalePop = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 0.6,
    field: "scale",
    props: { from: 0.5, to: 1.0, primitive: "easeOut" }
  });
  
  export const dim = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 0.5,
    field: "alpha",
    props: { from: 1, to: 0.3, primitive: "easeIn" }
  });
  
  export const focus = (start = 0) => ([
    {
      fn: "tween",
      start,
      end: start + 0.4,
      field: "alpha",
      props: { from: 0.5, to: 1, primitive: "easeOut" }
    },
    {
      fn: "tween",
      start,
      end: start + 0.6,
      field: "scale",
      props: { from: 0.9, to: 1.05, primitive: "easeOut" }
    }
  ]);
  