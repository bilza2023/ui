


import { getText } from './getText';
import { getImage } from './getImage';
import { getCircle } from './getCircle';
import { getRect } from './getRect';

export const itemsMap = Object.freeze({
        text   : getText,
        circle : getCircle,
        rect   : getRect,
        image  : getImage,
});