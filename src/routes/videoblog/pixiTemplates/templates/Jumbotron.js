'use strict';
import { textItem } from "../items/textItem.js"; // or a central repo

export const Jumbotron = {
  _endTime: 5,
  data: { title: "Welcome" },
  config: { fontSize: 48 },
  getItems(data) {
  
    let item = {}
    item.data =   textItem({
      text: data.title,
      x: 100,
      y: 100,
      fontSize: 40,
      color: 0xf9e104, // if we remove this then the return to globalTheme
    });

    // console.log(items);
    return [item];
    // return Object.freeze(items.map(Object.freeze));
  },
};
