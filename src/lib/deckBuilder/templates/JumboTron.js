import { getTemplate } from './getTemplate.js';
import { getText, TextPresets } from '../itemsFolder';
import { centerHorizontally } from './layoutUtils.js';

export function jumboTron() {
  const tmpl = getTemplate("JumboTron");

  tmpl.data = {
    text: "Jumbo Headline"
  };

  tmpl.theme = {
    fontSize: 80,
    topGap: 200
  };

  tmpl.getItems = function () {
    const jumbo = getText(this.data.text);
    TextPresets.jumbotron(jumbo);

    jumbo.color = this.theme.color || this.globalTheme.primaryColor;
    jumbo.fontSize = this.theme.fontSize;
    jumbo.fontFamily = this.theme.fontFamily || this.globalTheme.fontFamilyHeading;
    jumbo.y = this.theme.topGap || 250;

    centerHorizontally(jumbo, 1020, 800);

    return {
      items: [jumbo],
      background: {
        backgroundImage: null,
        pattern: null
      }
    };
  };

  return tmpl;
}
