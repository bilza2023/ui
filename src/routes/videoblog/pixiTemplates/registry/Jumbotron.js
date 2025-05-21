
import { SlideTemplate } from "../SlideTemplate.js";
import { textItem } from "../items/textItem.js"; // or a central repo

export const Jumbotron = {
  _endTime: 5,
  data: { title: "Welcome" },
  config: { fontSize: 48 },
  getItems(data, config, globalTheme, background) {
    return [
      textItem({
        text: data.title,
        x: 100,
        y: 100,
        fontSize: 40,
        color: globalTheme.primaryColor,
      }),
    ];
  },
};
