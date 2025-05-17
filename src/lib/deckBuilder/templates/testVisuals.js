
import { getTemplate } from './getTemplate.js';
import { getText, getCircle, getRect } from '../itemsFolder';

/////////////////////////////////////////

export function testVisuals() {
  const tmpl = getTemplate("testVisuals");

  tmpl.data = {};   // No dynamic input
  tmpl.theme = {};  // No theming

  tmpl.getItems = function () {
    const items = [];

    const text = getText("Testing Shapes");
    text.x = 100;
    text.y = 50;

    const rect = getRect({ x: 100, y: 150, width: 200, height: 100, fill: "#ff9999" });

    const circle = getCircle({ x: 400, y: 200, radius: 50, fill: "#3399ff" });

    items.push(text, rect, circle);

    return items;
  };

  return tmpl;
}
