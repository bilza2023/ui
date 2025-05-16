

export function createGlobalTheme(overrides = {}) {
    const defaults = {
      // Colors
      bgColor: "#ffffff",
      primaryColor: "#00bcd4",
      secondaryColor: "#ff9800",
      baseTextColor: "#333333",
      headingColor: "#111111",
      bulletColor: "#555555",
  
      // Fonts
      fontFamilyBase: "Arial",
      fontFamilyHeading: "Georgia",
      baseFontSize: 40,
      headingFontSize: 64,
      bulletFontSize: 42,
  
      // Spacing
      gapLarge: 80,
      gapMedium: 40,
      gapSmall: 20,
      paddingSlide: 30,
      paddingItem: 10
    };
  
    return { ...defaults, ...overrides };
  }
  