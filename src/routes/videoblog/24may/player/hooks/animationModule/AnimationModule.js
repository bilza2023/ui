// animationModule/AnimationModule.js
import { animationFunctions } from './animationFunctions.js';

export default class AnimationModule {
  runAnimations(items, currentTime) {
    for (const item of items) {
      const animations = item.animate || [];
      for (const anim of animations) {
        const fn = animationFunctions[anim.type];
        if (!fn) continue;

        fn(item, currentTime, anim.start, anim.end, anim.props || {});
      }
    }
  }
}
