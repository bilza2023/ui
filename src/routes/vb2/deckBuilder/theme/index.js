'use strict';

import { darkTheme } from './globalThemes.js';
import { highContrast } from './globalThemes.js';
import { validateTheme } from './validateTheme.js';

export const GlobalThemes = {
  darkTheme: validateTheme(darkTheme),
  highContrast: validateTheme(highContrast)
};
