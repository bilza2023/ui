
import { getTemplate } from './getTemplate.js';
import { getText, TextPresets } from '../itemsFolder';
import { centerHorizontally } from './layoutUtils.js';

export function jumboTron() {
  const tmpl = getTemplate("JumboTron");

  tmpl.data = {
    text: "Jumbo Headline"
  };

  tmpl.theme = {
    fontSize: 200,
    topGap: 150
  };

  tmpl.getItems = function () {
    const jumbo = getText(this.data.text);
    TextPresets.jumbotron(jumbo);

    jumbo.color = this.theme.color || this.globalTheme.primaryColor;
    jumbo.fontSize = this.theme.fontSize || 200;
    jumbo.fontFamily = this.theme.fontFamily || this.globalTheme.fontFamilyHeading;
    jumbo.y = this.theme.topGap || 150;

    centerHorizontally(jumbo, 1020, 800);
    return [jumbo];
  };

  return tmpl;
}
