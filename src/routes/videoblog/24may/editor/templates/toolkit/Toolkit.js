
// templateKit.js

// Import animation presets
import * as Anim from '../../../player/hooks/animationModule/presets';

// Import item builders (template-level data-item creators)
import heading from '../items/heading.js';
import bulletList from '../items/bulletList.js';
import icon from '../items/icon.js';
import image from '../items/image.js';
import emojiGrid from '../items/emojiGrid.js';

// Import helpers
import { layout } from './layout.js';
import { createStylePresets } from './stylePresets.js';

// Constants
const designWidth = 1020;
const designHeight = 576;

// Export final Toolkit
export const TemplateToolkit = {
  Anim,
  layout,
  designWidth,
  designHeight,
  createStylePresets,

  ItemBuilders: {
    heading,
    bulletList,
    icon,
    image,
    emojiGrid
  }
};
