
//==>>> IconTitleSlide.js
import toPixiColor from "./util/toPixiColor";
// IconTitleTemplate.js
import { TemplateBuilder } from "../templateBuilder/TemplateBuilder";

export function IconTitleSlide(globalTheme, data = {}, config = {}, background = {}) {
 
  const builder = new TemplateBuilder();

  // --- Icon item ---
  const icon = builder.addItem("icon", { x: 560, y: 120 });

  icon.link("iconName").default("ROCKET").unlessData("icon");
  icon.link("width").default(300).unlessData("iconSize");
  icon.link("color").defaultTheme("headingColor").unlessConfig("textColor");
  icon.link("fontFamily").defaultTheme("fontFamilyHeading").unlessConfig("fontFamily");

  // --- Text item ---
  const text = builder.addItem("text", {
    x: 100,
    y: 200,
    width: 500,
    height: 80,
    textAlign: "center",
    padding: 10,
    lineHeight: 1.3,
  });

  text.link("text").default("Default Title").unlessData("title");
  text.link("fontSize").default(90).unlessData("fontSize");
  text.link("color").defaultTheme("headingColor").unlessConfig("textColor");
  text.link("fontFamily").defaultTheme("fontFamilyHeading").unlessConfig("fontFamily");

  return {
    items: builder.getItems(data, config, globalTheme),
    background,
  };
}
