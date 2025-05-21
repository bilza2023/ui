export function createGlobalTheme(overrides = {}) {
  const defaults = {
    // Background and Foreground Colors
    bgColor: "#ffffff",
    baseTextColor: "#333333",
    headingColor: "#111111",
    bulletColor: "#555555",

    // Accent Colors
    primaryColor: "#00bcd4",
    secondaryColor: "#ff9800",

    // Shadow / Border Colors
    shadowColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "#dddddd",

    // Fonts (names only, not sizes)
    fontFamilyBase: "Arial",
    fontFamilyHeading: "Georgia"
  };

  return { ...defaults, ...overrides };
}
