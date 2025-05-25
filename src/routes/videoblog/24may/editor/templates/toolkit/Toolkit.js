// templateKit.js

// Import animation presets
import * as Anim from '../../../player/hooks/animationModule/presets';

// Import your existing item builders (data-item creators)
import heading from '../items/heading.js';
import bulletList from '../items/bulletList.js';
import icon from '../items/icon.js';
import image from '../items/image.js';
import emojiGrid from '../items/emojiGrid.js';
import {layout} from './layout.js';

const designWidth = 1020;
const designHeight = 576;

// Final export
export const TemplateToolkit = {
  Anim, // Author-facing animation presets
  designWidth,
  designHeight,
  layout,

///////////////////////  
  ItemBuilders: {
    heading,
    bulletList,
    icon,
    image,
    emojiGrid,
  }
  
};
