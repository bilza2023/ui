import { createJumboTron } from './JumboTron.js';
import { createTitleWithBullets } from './TitleWithBullets.js';
// import { createTestVisuals } from './TestVisuals.js';
import { createTitleWithImage } from './createTitleWithImage.js';
import { createImageWithCaption } from './createImageWithCaption.js';
import { createImageLeftTextRight } from './createImageLeftTextRight.js';

export const Templates = {
  JumboTron: createJumboTron,
  TitleWithBullets: createTitleWithBullets,
  TitleWithImage: createTitleWithImage,
  ImageWithCaption: createImageWithCaption,
  ImageLeftTextRight: createImageLeftTextRight
};
