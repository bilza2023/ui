import { getTemplate } from './getTemplate.js';
import { getText, getCircle, getRect, getImage } from '../itemsFolder';
import { getBarGraph } from "../itemsFolder/itemGenerators/getBarGraph.js";

export function testVisuals() {
  const tmpl = getTemplate("testVisuals");

  tmpl.data = {};
  tmpl.theme = {};

  tmpl.getItems = function () {
    const items = [];

    const text = getText("Visual Test Slide");
    text.x = 100;
    text.y = 40;
    text.fontSize = 40;
    text.color = "#1a1a1a";
    text.backgroundColor = "#f0f0f0";
    text.padding = 10;

    const rect = getRect({
      x: 100,
      y: 120,
      width: 250,
      height: 120,
      fill: "#ffe4b5",
      borderColor: "#cc7722",
      borderWidth: 4
    });

    const circle = getCircle({
      x: 450,
      y: 180,
      radius: 60,
      fill: "#add8e6",
      borderColor: "#00008b",
      borderWidth: 3
    });

    const image = getImage({
      x: 650,
      y: 100,
      width: 200,
      height: 150,
      src: "images/atom.png"
    });

    const barItems = getBarGraph({
      x: 100,
      y: 320,
      width: 600,
      height: 200,
      values: [30, 50, 70, 90, 60],
      labels: ["A", "B", "C", "D", "E"],
      barColor: "green"
    });

    items.push(text, rect, circle, image, ...barItems);

    return {
      items,
      background: {
        backgroundImage: null,
        pattern: {
          type: "grid",
          cellWidth: 50,
          cellHeight: 50,
          lineColor: "#cccccc",
          lineWidth: 1
        }
      }
    };
    
  };

  return tmpl;
}
