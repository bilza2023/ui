// JumboTron.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

const JumboTron = new BaseTemplate("jumbotron");

// ✅ Content-specific data
JumboTron.data = {
  text: "🚀 Taleem.help Presentation 📘"
};

// ✅ Only expose what user is allowed to override
JumboTron.theme = {
  fontSize: 70,
  topGap: 200
};


JumboTron.getItems = function () {
  const items = [];

  // 🔑 Use global theme for visual grammar

  const jumbo = this.items.text(this.data.text);
  jumbo.fontSize = this.theme.fontSize ?? 80;
  jumbo.y = this.theme.topGap ?? 250;
  jumbo.fontFamily = this.globalTheme.fontFamilyHeading;
  jumbo.color = this.globalTheme.primaryColor;

  this.centerHorizontally(jumbo);
  items.push(jumbo);

  //This ishere just for testing
  const emoji = this.items.emoji("🎓✨");
  emoji.fontSize = 48;
  emoji.y = jumbo.y + jumbo.fontSize + 20;
  this.centerHorizontally(emoji);
  items.push(emoji);

  return {
    items,
    background: this._background
  };
};

export { JumboTron };
