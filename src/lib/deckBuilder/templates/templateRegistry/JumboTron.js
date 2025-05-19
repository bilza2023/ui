// JumboTron.js
import { BaseTemplate } from '../baseTemplate/BaseTemplate';

function createJumboTron() {
  const tmpl = new BaseTemplate("jumbotron");

  // ✅ Content-specific data
  tmpl.data = {
    text: "🚀 Taleem.help Presentation 📘"
  };

  // ✅ Only expose what user is allowed to override
  tmpl.theme = {
    fontSize: 70,
    topGap: 200
  };

  tmpl.getItems = function () {
    const items = [];

    // 🔑 Use global theme for visual grammar
    const jumbo = this.items.text(this.data.text);
    jumbo.fontSize = this.theme.fontSize ?? 80;
    jumbo.y = this.theme.topGap ?? 250;
    jumbo.fontFamily = this.globalTheme.fontFamilyHeading;
    jumbo.color = this.globalTheme.primaryColor;
    this.centerHorizontally(jumbo);
    items.push(jumbo);

    // 🧪 Optional: test emoji
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

  return tmpl;
}

export { createJumboTron };
