// animationModule/index.js

import AnimationModule from './core/AnimationModule.js';
import * as Anim from './presets/index.js';

export {
  AnimationModule,
  Anim // expose as: Anim.fadeIn(), Anim.slideUp(), etc.
};
