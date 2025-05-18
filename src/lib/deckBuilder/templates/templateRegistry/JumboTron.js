// JumboTron.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

const JumboTron = new BaseTemplate("jumbotron");

JumboTron.data = {
  text: "🚀 Taleem.help Presentation 📘"
};

JumboTron.theme = {
  fontSize: 80,
  topGap: 200
};

JumboTron.getItems = function () {
  const jumbo = this.items.text(this.data.text);

  jumbo.color = this.resolve("color", this.globalTheme.primaryColor);
  jumbo.fontSize = this.resolve("fontSize", 80);
  jumbo.fontFamily = this.resolve("fontFamily", this.globalTheme.fontFamilyHeading);
  jumbo.y = this.resolve("topGap", 250);

  this.centerHorizontally(jumbo);

  return {
    items: [jumbo],
    background: this.getBackground()
  };
};

export { JumboTron };
