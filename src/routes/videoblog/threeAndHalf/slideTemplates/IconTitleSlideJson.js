
//==>>> IconTitleSlide.js
import toPixiColor from "./util/toPixiColor";

export function IconTitleSlide(globalTheme, data = {}, config = {}, background = {}) {
  const startAt = 0;
  const endAt = 5;

  const mergedData = {
    title: data.title || "Default Title",
    fontSize: data.fontSize || 90,
    icon: data.icon || "ROCKET",
    iconSize: data.iconSize || 300,
    iconX: data.iconX || 560,
    iconY: data.iconY || 120,
    textX: data.textX || 100,
    textY: data.textY || 200,
  };

  const mergedConfig = {
    textColor: config.textColor || toPixiColor(globalTheme.headingColor) || 0xffffff,
    fontFamily: config.fontFamily || globalTheme.fontFamilyHeading || "Arial Black",
  };

  const iconData = {
    type: "icon",
    iconName: mergedData.icon,
    x: mergedData.iconX,
    y: mergedData.iconY,
    width: mergedData.iconSize,
    color: mergedConfig.textColor,
    fontFamily: mergedConfig.fontFamily,
  };

  const headingData = {
    type: "text",
    text: mergedData.title,
    x: mergedData.textX,
    y: mergedData.textY,
    width: 500,
    height: 80,
    fontSize: mergedData.fontSize,
    fontFamily: mergedConfig.fontFamily,
    color: mergedConfig.textColor,
    textAlign: "center",
    padding: 10,
    lineHeight: 1.3,
  };

  return {
    startAt,
    endAt,
    background: { backgroundColor: globalTheme.backgroundColor, ...background },
    data: mergedData,
    config: mergedConfig,
    items: [
      { data: iconData },
      { data: headingData },
    ],
  };
}
