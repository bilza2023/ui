// testVisuals.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';
import { getBarGraph } from "../../itemsFolder/itemGenerators/getBarGraph.js";

const testVisuals = new BaseTemplate("testVisuals");

testVisuals.data = {};
testVisuals.theme = {};

testVisuals.getItems = function () {
  const items = [];

  const text = this.items.text("Visual Test Slide");
  text.x = 100;
  text.y = 40;
  text.fontSize = 40;
  text.color = "#1a1a1a";
  text.backgroundColor = "#f0f0f0";
  text.padding = 10;

  const rect = this.items.rect({
    x: 100,
    y: 120,
    width: 250,
    height: 120,
    fill: "#ffe4b5",
    borderColor: "#cc7722",
    borderWidth: 4
  });

  const circle = this.items.circle({
    x: 450,
    y: 180,
    radius: 60,
    fill: "#add8e6",
    borderColor: "#00008b",
    borderWidth: 3
  });

  const image = this.items.image({
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

  testVisuals.setBackground({
    backgroundImage: null,
    pattern: {
      type: "grid",
      cellWidth: 50,
      cellHeight: 50,
      lineColor: "#cccccc",
      lineWidth: 1
    }
  });

  return {
    items,
    background: this.getBackground()
  };
};

export { testVisuals };
