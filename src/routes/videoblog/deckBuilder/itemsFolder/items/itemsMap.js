


import { getText } from './getText';
import { getImage } from './getImage';
import { getCircle } from './getCircle';
import { getRect } from './getRect';
import { getEmoji } from './getEmoji';

export const itemsMap = Object.freeze({
        text   : getText,
        circle : getCircle,
        rect   : getRect,
        image  : getImage,
        emoji  : getEmoji,
});