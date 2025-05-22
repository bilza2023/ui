import { IconTitleSlide } from "./threeAndHalf/slideTemplates/IconTitleSlide";

export const presentationData = {
  designWidth: 1020,
  designHeight: 576,
  slidesData: [
    {
      id: '69623375-54ad-417a-bd32-0bc505f9584f',
      ...IconTitleSlide(
        { title: "Bright Ideas", icon: "ROCKET" },
        {
          iconColor: 0xffcc00,
          textColor: 0xffffff,
          fontFamily: "Arial Black"
        },
        {
          // Optional background object if needed
        }
      )
    }
  ]
};
