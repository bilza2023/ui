// templateKit.js

// Animation presets (low-level tween logic, optional to expose)
import * as Anim from '../../../player/hooks/animationModule/presets';

// Item builders
import text from '../../../items/text/index.js';
import icon from '../../../items/icon/index.js';
import image from '../../../items/image/index.js';
import richText from '../../../items/richText/index.js';

// Style presets (per-item)
import { textPresets } from '../../../items/text/presets.js';
import { iconPresets } from '../../../items/icon/presets.js';
import { imagePresets } from '../../../items/image/presets.js';
import { richTextPresets } from '../../../items/richText/presets.js';

// Animation presets (per-item)
import * as textAnimations from '../../../items/text/animations.js';
import * as iconAnimations from '../../../items/icon/animations.js';
import * as imageAnimations from '../../../items/image/animations.js';
import * as richTextAnimations from '../../../items/richText/animations.js';

// Layout helpers
import { layout } from './layoutFunction.js';

function getAnimations(itemType) {
  return animationPresets[itemType] || {};
}

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

// Unified animation preset map
const animationPresets = {
  text: textAnimations,
  icon: iconAnimations,
  image: imageAnimations,
  richText: richTextAnimations
};


function addAnimation(item, type, presetName, start = 0) {
  const animFn = animationPresets[type]?.[presetName];
  if (!animFn) return;
  const preset = animFn(start);
  item.animations = Array.isArray(preset) ? preset : [preset];
}
/**
 * applyPreset(preset, data)
 *
 * Merges a style preset with custom values to produce final item data.
 *
 * This function does not "run" the preset — it simply combines two objects.
 * The preset provides default values (like fontSize, color), and the data
 * provides custom overrides (like text, position).
 *
 * This is how you apply style presets before passing them to item builders.
 *
 * Example:
 *   const data = applyPreset(stylePresets.text.heading, {
 *     text: "Welcome",
 *     y: 60
 *   });
 *   const item = text(theme, data);
 */
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
  // animationPresets,
  getAnimations,
  addAnimation,
  applyPreset
};
