
// templateKit.js

// Animation presets
import * as Anim from '../../../player/hooks/animationModule/presets';

// Item builders
import text from '../../../items/text/index.js';
import icon from '../../../items/icon/index.js';
import image from '../../../items/image/index.js';
import richText from '../../../items/richText/index.js';

// Style presets (now per-item)
import {textPresets} from '../../../items/text/presets.js';
import {iconPresets} from '../../../items/icon/presets.js';
import {imagePresets} from '../../../items/image/presets.js';
import {richTextPresets} from '../../../items/richText/presets.js';

// Helpers
import { layout } from './layout.js';

// Constants
const designWidth = 1020;
const designHeight = 576;

// Unified style presets object
const stylePresets = {
  text: textPresets,
  icon: iconPresets,
  image: imagePresets,
  richText:richTextPresets
};

function applyPreset(preset, data = {}) {
  return { ...preset, ...data };
}

// Final Toolkit export
export const TemplateToolkit = {
  Anim,
  layout,
  designWidth,
  designHeight,
  applyPreset,
  ItemBuilders: {
    text,
    icon,
    image,
    richText
  },

  stylePresets
};
