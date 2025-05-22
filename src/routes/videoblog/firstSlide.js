import SlideBuilder from "./threeAndHalf/SlideBuilder.js";
import { IconTitleSlide } from "./threeAndHalf/slideTemplates/IconTitleSlide.js";

export const presentationData = {
  designWidth: 1020,
  designHeight: 576,
  slidesData: [
    new SlideBuilder()
      .setTemplate(IconTitleSlide)
      .setData({
        title: "New Ideas",
        icon: "ROCKET",
        iconSize: 300,
        fontSize: 90,
        iconX: 560,
        iconY: 120,
        textX: 100,
        textY: 200,
      })
      .setConfig({
        textColor: 0xf2de07,
        fontFamily: "Arial Black",
      })
      .setBackgroundColor(0x090342)
      .setStartTime(0)
      .setEndTime(5)
      .build()
  ]
};
