
import SlideBuilder from "./threeAndHalf/SlideBuilder.js";
import { IconTitleSlide } from "./threeAndHalf/slideTemplates/IconTitleSlide.js";
import {GlobalThemes} from "./threeAndHalf/themes/globalThemes.js"


export const presentationData = {
  designWidth: 1020,
  designHeight: 576,
  slidesData: [
    new SlideBuilder(GlobalThemes.highContrast)
      .setTemplate(IconTitleSlide)
      .setData({
        title: "New Ideas",
        icon: "ROCKET",
      })
      // .setBackgroundColor(0x090342) // to override global theme
      .setStartTime(0)
      .setEndTime(5)
      .build()
  ]
};
