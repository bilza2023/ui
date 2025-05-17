import { createGlobalTheme } from './createGlobalTheme.js';

export const darkTheme = createGlobalTheme({
  primaryColor: "#00ffaa",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial",
  headingFontSize: 72,
  bgColor: "#1a1a1a",
  gapLarge: 60
});

export const lightTheme = createGlobalTheme({
  primaryColor: "#222222",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial",
  headingFontSize: 64,
  bgColor: "#ffffff",
  gapLarge: 40
});

export const rainbowShock = createGlobalTheme({
  bgColor: "#ff00ff",         // shocking magenta
  headingColor: "#00ffff",    // neon cyan
  bulletColor: "#ffff00",     // yellow
  headingFontSize: 80,
  bulletFontSize: 56,
  gapLarge: 100
});
