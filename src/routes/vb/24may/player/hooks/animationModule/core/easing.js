
// kinetics/easing.js

export function linear(k) {
    return k;
  }
  
  export function easeIn(k) {
    return k * k;
  }
  
  export function easeOut(k) {
    return 1 - (1 - k) * (1 - k);
  }
  
  export function pingPong(k) {
    return k < 0.5 ? k * 2 : (1 - k) * 2;
  }
  
  export function sine(k) {
    return Math.sin(k * Math.PI); // one full cycle (0 to π)
  }
  
  // Optional: export as a map
  export const easingMap = {
    linear,
    easeIn,
    easeOut,
    pingPong,
    sine
  };
  