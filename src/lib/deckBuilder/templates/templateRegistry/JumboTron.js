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
////////////////////////////////////////////

JumboTron.setBackground(BaseTemplate.backgroundWithImage("black_mat"));

////////////////////////////////////////////
JumboTron.getItems = function () {
  const jumbo = this.items.text(this.data.text);

  jumbo.color = this.resolve("color", this.globalTheme.primaryColor);
  jumbo.fontSize = this.resolve("fontSize", 80);
  jumbo.fontFamily = this.resolve("fontFamily", this.globalTheme.fontFamilyHeading);
  jumbo.y = this.resolve("topGap", 250);

  this.centerHorizontally(jumbo);
///////////////////////////////////////////////////////
const emoji = this.items.emoji("🎓✨");
emoji.fontSize = 48;
emoji.y = jumbo.y + jumbo.fontSize + 20;
this.centerHorizontally(emoji);

///////////////////////////////////////////////////////
  return {
    items: [jumbo,emoji],
    background: this.getBackground()
  };
};

export { JumboTron };
