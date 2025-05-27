// animationModule/AnimationModule.js

import { valueTween } from './valueTween.js';

const animationFunctions = {
  tween(item, t, start, end, props) {
    const value = valueTween({ ...props, t, start, end });
    item[props.field ?? "x"] = value; // supports x, y, alpha, scale, etc.
  }
};

export class AnimationModule {
  runAnimations(items, currentTime) {
    for (const item of items) {
      const animations = item.animations || []; // ✅ FIXED (was .animate)

      for (const anim of animations) {
        const fn = animationFunctions[anim.fn]; // fn is always "tween"
        if (!fn) continue;

        fn(item, currentTime, anim.start, anim.end, anim.props || {});
      }
    }
  }
}
