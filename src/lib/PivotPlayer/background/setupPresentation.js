// setupPresentation.js
import * as globalThemes  from "./globalThemes.js";
import * as globalBackgrounds  from "./globalBackgrounds.js";

export function setup(themeName = "neonDark", backgroundName = "defaultBg") {
  const theme = globalThemes[themeName];

  const background = {
    ...globalBackgrounds[backgroundName],
    backgroundColor: theme.bgPrimary  // sync color with theme
  };

  return { theme, background };
}
