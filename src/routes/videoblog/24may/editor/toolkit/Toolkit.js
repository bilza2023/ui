// templateKit.js

// Animation presets (low-level tween logic, optional to expose)
import * as Anim from '../../player/hooks/animationModule/presets/index.js';
import AnimApi from './AnimApi.js';
// Item builders
import text from '../../items/text/index.js';
import icon from '../../items/icon/index.js';
import image from '../../items/image/index.js';
import richText from '../../items/richText/index.js';
import circle from '../../items/circle/index.js';
import rect from '../../items/rect/index.js';
import triangle from '../../items/triangle/index.js';

import * as AniHelpers from "./AniHelpers.js";
import toPixiColor from "./toPixiColor.js";
// Style presets (per-item)
import { textPresets } from '../../items/text/presets.js';
import { iconPresets } from '../../items/icon/presets.js';
import { imagePresets } from '../../items/image/presets.js';
import { richTextPresets } from '../../items/richText/presets.js';
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
    richText,
    circle,
    rect,
    triangle,
  },

  stylePresets,
  AnimApi,
  applyPreset,
  AniHelpers,
  toPixiColor
};
