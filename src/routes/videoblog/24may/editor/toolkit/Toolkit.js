// templateKit.js

// Animation presets (low-level tween logic, optional to expose)
import * as Anim from '../../player/hooks/animationModule/presets/index.js';
import AnimApi from './AnimApi.js';
// Item builders
import text from '../../items/text/index.js';
import icon from '../../items/icon/index.js';
import image from '../../items/image/index.js';
import richText from '../../items/richText/index.js';
import * as AniHelpers from "./AniHelpers.js";
// Style presets (per-item)
import { textPresets } from '../../items/text/presets.js';
import { iconPresets } from '../../items/icon/presets.js';
import { imagePresets } from '../../items/image/presets.js';
import { richTextPresets } from '../../items/richText/presets.js';

// // Animation presets (per-item)
// import * as textAnimations from '../../items/text/animations.js';
// import * as iconAnimations from '../../items/icon/animations.js';
// import * as imageAnimations from '../../items/image/animations.js';
// import * as richTextAnimations from '../../items/richText/animations.js';

// Layout helpers
import { layout } from './layout.js';



// Constants
const designWidth = 1020;
const designHeight = 576;

// Unified style preset map
const stylePresets = {
  text: textPresets,
  icon: iconPresets,
  image: imagePresets,
  richText: richTextPresets
};


function applyPreset(preset, data = {}) {
  return { ...preset, ...data };
}

// Final toolkit export
export const TemplateToolkit = {
  Anim, // optional, low-level tween helpers
  layout,
  designWidth,
  designHeight,

  ItemBuilders: {
    text,
    icon,
    image,
    richText
  },

  stylePresets,
  AnimApi,
  applyPreset,
  AniHelpers
};
