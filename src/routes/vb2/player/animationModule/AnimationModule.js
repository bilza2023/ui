// AnimationModule.js

const animationFunctions = {
    fadeIn(item, t, start, end, { from = 0, to = 1 }) {
      const k = (t - start) / (end - start);
      item.alpha = from + (to - from) * k;
    },
    moveTo(item, t, start, end, { fromX = item.x, fromY = item.y, toX, toY }) {
      const k = (t - start) / (end - start);
      item.x = fromX + (toX - fromX) * k;
      item.y = fromY + (toY - fromY) * k;
    },
    scaleUp(item, t, start, end, { from = item.scale, to }) {
      const k = (t - start) / (end - start);
      item.scale = from + (to - from) * k;
    },
    blink(item, t, start, end, { frequency = 2 }) {
      const elapsed = t - start;
      if (elapsed < 0 || t > end) return;
      const on = Math.floor(elapsed * frequency) % 2 === 0;
      item.alpha = on ? 1 : 0;
    },
  };
  
  export default class AnimationModule {
    constructor(startTime = 0, endTime = 100) {
      this.startTime = startTime;
      this.endTime = endTime;
    }
  
    animate(slide, currentTime) {
      debugger;

      const animations = slide.animations;
      const items = slide.items;
///////////////////////////////      
      if (currentTime < this.startTime || currentTime > this.endTime) return items;
      if (!Array.isArray(items) || items.length === 0) return items;
  
      for (const item of items) {
        const animations = item.animation || [];
        for (const a of animations) {
          if (currentTime < a.start || currentTime > a.end) continue;
          const fn = animationFunctions[a.fn];
          if (fn) fn(item, currentTime, a.start, a.end, a.props || {});
        }
      }
      return items;
    }
  
    static register(name, fn) {
      animationFunctions[name] = fn;
    }
  }
  