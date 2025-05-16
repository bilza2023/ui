

export function applyTheme(templateTheme, globalTheme, mapThemeFn) {
    return {
      ...mapThemeFn(globalTheme),
      ...templateTheme // user overrides win
    };
  }
  