// IconTitleSlide.js
import { drawIcon, drawText } from "../items";

export function IconTitleSlide(data = {}, config = {}, background = {}) {
  const startTime = 0;
  const endTime = 5;

  const mergedData = {
    title: data.title || "Default Title",
    icon: data.icon || "BULB",
    iconSize: data.iconSize || 300,
    iconX: data.iconX || 460,
    iconY: data.iconY || 120,
    textX: data.textX || 260,
    textY: data.textY || 260,
  };

  const mergedConfig = {
    // iconColor: config.iconColor || 0xffcc00,//icons dont use colors
    textColor: config.textColor || 0xffffff,
    fontFamily: config.fontFamily || "Arial Black",
  };

  const icon = drawIcon({
    iconName: mergedData.icon,
    x: mergedData.iconX,
    y: mergedData.iconY,
    width: mergedData.iconSize,
  });

  const heading = drawText({
    text: mergedData.title,
    x: mergedData.textX,
    y: mergedData.textY,
    width: 500,
    height: 80,
    fontSize: 44,
    fontFamily: mergedConfig.fontFamily,
    color: mergedConfig.textColor,
    textAlign: "center",
    padding: 10,
    lineHeight: 1.3,
  });

  return {
    startTime,
    endTime,
    backgroundColor: 0x0e20ed,
    background,
    data: mergedData,
    config: mergedConfig,
    items: [icon, heading],
  };
}
