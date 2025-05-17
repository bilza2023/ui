

import { getTemplate } from './getTemplate.js';
import { getText, TextPresets } from '../itemsFolder';
import { centerHorizontally } from './layoutUtils.js';

///////////////////////////////////////////////////
export function jumboTronTemplate() {
  const tmpl = getTemplate("JumboTron");

  tmpl.data = {
    text: "Jumbo Headline"
  };

  tmpl.theme = {
    backgroundColor: "#111",
    color: "white",
    fontSize: 200,
    topGap: 150
  };

  tmpl.mapTheme = function (global) {
    return {
      backgroundColor: global.bgColor,
      color: global.primaryColor,
      fontFamily: global.fontFamilyHeading
    };
  };

  tmpl.getItems = function (data = this.data, theme = this.theme) {
    const jumbo = getText(data.text);
    TextPresets.jumbotron(jumbo);

    jumbo.color = theme.color;
    jumbo.fontFamily = theme.fontFamily;
    jumbo.y = theme.topGap ?? 150;

    centerHorizontally(jumbo, 1020, 800);
    return [jumbo];
  };

  return tmpl;
}
