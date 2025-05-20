
import drawText from './drawers/drawText.js';
import drawRect from './drawers/drawRect.js';
import drawCircle from './drawers/drawCircle.js';
import drawImage from './drawers/drawImage.js';
import drawEmoji from './drawers/drawEmoji.js';

export const drawMap = {
  text: drawText,
  rect: drawRect,
  circle: drawCircle,
  image: drawImage,
  emoji: drawEmoji,
};
