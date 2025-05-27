
// items/text/animations.js
// Animation presets specifically designed for TEXT items

export const fadeInFast = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 0.5,
    field: "alpha",
    props: { from: 0, to: 1, primitive: "easeOut" }
  });
  
  export const fadeOutSlow = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 2,
    field: "alpha",
    props: { from: 1, to: 0, primitive: "easeIn" }
  });
  
  export const flyInLeft = (start = 0, fromX = -300) => ({
    fn: "tween",
    start,
    end: start + 1,
    field: "x",
    props: { from: fromX, to: null, primitive: "easeOut" } // to be filled in template
  });
  
  export const focus = (start = 0) => ([
    {
      fn: "tween",
      start,
      end: start + 0.4,
      field: "alpha",
      props: { from: 0.4, to: 1, primitive: "easeOut" }
    },
    {
      fn: "tween",
      start,
      end: start + 0.5,
      field: "scale",
      props: { from: 0.9, to: 1.05, primitive: "easeOut" }
    }
  ]);
  
  export const dim = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 0.5,
    field: "alpha",
    props: { from: 1, to: 0.3, primitive: "easeIn" }
  });
  