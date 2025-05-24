'use strict';

  
  export function validateTheme(theme) {
    const requiredKeys = [
      'backgroundColor', 'baseTextColor', 'headingColor', 'bulletColor',
      'primaryColor', 'secondaryColor', 'borderColor', 'shadowColor',
      'fontFamilyHeading', 'fontFamilyBase'
    ];
  
    const missing = requiredKeys.filter(key => !(key in theme));
    if (missing.length > 0) {
      throw new Error(`Theme missing required keys: ${missing.join(', ')}`);
    }
  
    const sanitized = {
      backgroundColor: toPixiColor(theme.backgroundColor),
      baseTextColor: toPixiColor(theme.baseTextColor),
      headingColor: toPixiColor(theme.headingColor),
      bulletColor: toPixiColor(theme.bulletColor),
      primaryColor: toPixiColor(theme.primaryColor),
      secondaryColor: toPixiColor(theme.secondaryColor),
      borderColor: toPixiColor(theme.borderColor),
      shadowColor: theme.shadowColor, // left as string (e.g. rgba)
      fontFamilyHeading: theme.fontFamilyHeading,
      fontFamilyBase: theme.fontFamilyBase
    };
  
    return Object.freeze(sanitized);
  }

  ///////////////////
  function toPixiColor(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      if (value.startsWith('#')) return parseInt(value.slice(1), 16);
      if (value.startsWith('0x')) return parseInt(value, 16);
    }
    console.warn(`Invalid color format: ${value}`);
    return 0x000000; // fallback to black
  }