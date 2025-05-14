// src/routes/player/slides/testMaster.js
import * as corners from './corners.js';
import * as typography from './typography.js';
import * as colors from './colors.js';
import * as zindex from './zindex.js';
import * as stress from './stress.js';
import { concatSlides } from './helpers.js';

export const { designWidth, designHeight, slides } = concatSlides(
  corners,
  typography,
  colors,
  zindex,
  stress
);
