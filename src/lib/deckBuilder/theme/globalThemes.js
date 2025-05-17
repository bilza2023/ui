
import { createGlobalTheme } from './createGlobalTheme.js';

export const darkTheme = createGlobalTheme({
  bgColor: "#1a1a1a",
  baseTextColor: "#eeeeee",
  headingColor: "#ffffff",
  bulletColor: "#bbbbbb",
  primaryColor: "#00ffaa",
  secondaryColor: "#ffaa00",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial"
});

export const lightTheme = createGlobalTheme({
  bgColor: "#ffffff",
  baseTextColor: "#333333",
  headingColor: "#111111",
  bulletColor: "#555555",
  primaryColor: "#222222",
  secondaryColor: "#999999",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial"
});

export const rainbowShock = createGlobalTheme({
  bgColor: "#ff00ff",         // shocking magenta
  headingColor: "#00ffff",    // neon cyan
  bulletColor: "#ffff00",     // yellow
  baseTextColor: "#000000",
  primaryColor: "#ff0000",
  secondaryColor: "#0000ff",
  fontFamilyHeading: "Comic Sans MS",
  fontFamilyBase: "Impact"
});

export const educationSoft = createGlobalTheme({
  bgColor: "#fdf6e3",
  baseTextColor: "#333333",
  headingColor: "#2c3e50",
  bulletColor: "#5d6d7e",
  primaryColor: "#3498db",        // soft blue
  secondaryColor: "#2ecc71",      // green
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Segoe UI"
});

export const blueEducation = createGlobalTheme({
  bgColor: "#eaf4fc",              // very light blue
  baseTextColor: "#1f2d3d",
  headingColor: "#0a2f5c",
  bulletColor: "#34495e",
  primaryColor: "#3498db",         // soft blue
  secondaryColor: "#2980b9",       // deeper blue
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Verdana"
});

export const blueBusiness = createGlobalTheme({
  bgColor: "#f0f6fb",
  baseTextColor: "#2c3e50",
  headingColor: "#1b2631",
  bulletColor: "#5d6d7e",
  primaryColor: "#154360",         // navy blue
  secondaryColor: "#1f618d",       // steel blue
  fontFamilyHeading: "Helvetica Neue",
  fontFamilyBase: "Arial"
});

export const techBlueMinimal = createGlobalTheme({
  bgColor: "#ffffff",
  baseTextColor: "#222222",
  headingColor: "#0d1a26",
  bulletColor: "#4a6fa5",
  primaryColor: "#2e86de",         // vivid tech blue
  secondaryColor: "#74b9ff",       // sky blue
  fontFamilyHeading: "Roboto",
  fontFamilyBase: "Open Sans"
});

export const classicPaper = createGlobalTheme({
  bgColor: "#f5f0e1",              // aged paper / light cream
  baseTextColor: "#3e2f1c",
  headingColor: "#2d1f0f",
  bulletColor: "#5a4632",
  primaryColor: "#8b5e3c",         // earthy brown
  secondaryColor: "#c49e78",       // soft tan
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Palatino Linotype"
});

export const coffeeNote = createGlobalTheme({
  bgColor: "#f3e7d3",              // latte cream
  baseTextColor: "#3b2e25",
  headingColor: "#2c1e13",
  bulletColor: "#5e4b3c",
  primaryColor: "#a9745a",         // light mocha
  secondaryColor: "#d6bda7",       // soft beige
  fontFamilyHeading: "Merriweather",
  fontFamilyBase: "Serif"
});

export const desertScroll = createGlobalTheme({
  bgColor: "#f8f1e5",              // sand parchment
  baseTextColor: "#4a3f35",
  headingColor: "#2e261f",
  bulletColor: "#7b6b5d",
  primaryColor: "#b77b57",         // terracotta
  secondaryColor: "#d2a679",       // camel tan
  fontFamilyHeading: "Garamond",
  fontFamilyBase: "Book Antiqua"
});

