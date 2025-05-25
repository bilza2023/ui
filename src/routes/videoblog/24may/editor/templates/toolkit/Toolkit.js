// templateKit.js

// Import animation presets
import * as Anim from '../animationModule/presets/index.js';

// Import your existing item builders (data-item creators)
import heading from '../items/heading.js';
import bulletList from '../items/bulletList.js';
import icon from '../items/icon.js';
import image from '../items/image.js';
import emojiGrid from '../items/emojiGrid.js';

// Final export
export const TemplateToolkit = {
  Anim, // Author-facing animation presets

  ItemBuilders: {
    heading,
    bulletList,
    icon,
    image,
    emojiGrid,
  }
};
