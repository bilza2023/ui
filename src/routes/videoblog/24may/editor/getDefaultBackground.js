

export function getDefaultBackground(globalTheme) {
  debugger;
    return {
      backgroundColor: globalTheme.backgroundColor || "#000000", // fallback just in case
      backgroundImage: null,
      backgroundImageOpacity: 1.0,
      pattern: null
    };
  }
  