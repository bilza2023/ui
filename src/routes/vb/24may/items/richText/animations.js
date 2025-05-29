// items/richText/animations.js
// Animation presets specifically for RICH TEXT items

export const fadeIn = (start = 0, duration = 1) => ({
    fn: "tween",
    start,
    end: start + duration,
    field: "alpha",
    props: { from: 0, to: 1, primitive: "easeOut" }
  });
  
  export const fadeOut = (start = 0, duration = 1) => ({
    fn: "tween",
    start,
    end: start + duration,
    field: "alpha",
    props: { from: 1, to: 0, primitive: "easeIn" }
  });
  
  export const focus = (start = 0) => ([
    {
      fn: "tween",
      start,
      end: start + 0.5,
      field: "alpha",
      props: { from: 0.5, to: 1, primitive: "easeOut" }
    },
    {
      fn: "tween",
      start,
      end: start + 0.6,
      field: "scale",
      props: { from: 0.95, to: 1.05, primitive: "easeOut" }
    }
  ]);
  
  export const slideInFromBottom = (start = 0, fromY = 300) => ({
    fn: "tween",
    start,
    end: start + 1,
    field: "y",
    props: { from: fromY, to: null, primitive: "easeOut" } // to be filled
  });
  
  export const dim = (start = 0) => ({
    fn: "tween",
    start,
    end: start + 0.5,
    field: "alpha",
    props: { from: 1, to: 0.3, primitive: "easeIn" }
  });
  