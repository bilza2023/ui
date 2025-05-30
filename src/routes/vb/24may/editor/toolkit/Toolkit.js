// templateKit.js

import AnimApi from './AnimApi.js';
import {ItemBuilders} from "../../items/ItemBuilders.js";
import toPixiColor from "./toPixiColor.js";
import { layout } from './layout.js';

// Constants
const designWidth = 1020;
const designHeight = 576;



// Final toolkit export
export const TemplateToolkit = {
  layout,
  designWidth,
  designHeight,

  ItemBuilders,

  AnimApi,
  toPixiColor
};
