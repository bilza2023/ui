// animationModule/AnimationModule.js

import { valueTween } from './valueTween.js';

// === Internal animation runner map ===
const animationFunctions = {
  tween(item, t, start, end, props) {
    const value = valueTween({ ...props, t, start, end });
    item[props.field ?? "x"] = value; // apply to target field
  }
};

export default class AnimationModule {
  runAnimations(items, currentTime) {
    for (const item of items) {
      const animations = item.animate || [];

      for (const anim of animations) {
        const fn = animationFunctions[anim.fn]; // always "tween"
        if (!fn) continue;

        fn(item, currentTime, anim.start, anim.end, anim.props || {});
      }
    }
  }
}
