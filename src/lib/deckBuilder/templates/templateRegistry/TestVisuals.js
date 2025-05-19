// TestVisuals.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';
import { getBarGraph } from "../../itemsFolder/itemGenerators/getBarGraph.js";

function createTestVisuals() {
  const tmpl = new BaseTemplate("testVisuals");

  // ✅ No user-editable content or theme for now
  tmpl.data = {};
  tmpl.theme = {};

  tmpl.getItems = function () {
    const items = [];

    // Simple heading text
    const text = this.items.text("Visual Test Slide");
    text.x = 100;
    text.y = 40;
    text.fontSize = 40;
    text.color = this.globalTheme.primaryColor;
    text.backgroundColor = "#f0f0f0";
    text.padding = 10;
    items.push(text);

    // Rectangle
    const rect = this.items.rect({
      x: 100,
      y: 120,
      width: 250,
      height: 120,
      fill: "#ffe4b5",
      borderColor: "#cc7722",
      borderWidth: 4
    });
    items.push(rect);

    // Circle
    const circle = this.items.circle({
      x: 450,
      y: 180,
      radius: 60,
      fill: "#add8e6",
      borderColor: "#00008b",
      borderWidth: 3
    });
    items.push(circle);

    // Image
    const image = this.items.image({
      x: 650,
      y: 100,
      width: 200,
      height: 150,
      src: "images/atom.png"
    });
    items.push(image);

    // Bar Graph
    const barItems = getBarGraph({
      x: 100,
      y: 320,
      width: 600,
      height: 200,
      values: [30, 50, 70, 90, 60],
      labels: ["A", "B", "C", "D", "E"],
      barColor: "green"
    });
    items.push(...barItems);

    return {
      items,
      background: this._background
    };
  };

  return tmpl;
}

export { createTestVisuals };
