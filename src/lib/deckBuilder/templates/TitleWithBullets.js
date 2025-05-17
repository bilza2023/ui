import { getTemplate } from './getTemplate.js';
import { getText, TextPresets } from '../itemsFolder';
import { centerHorizontally,placeBelow } from './layoutUtils.js';

export function TitleWithBullets() {
  const tmpl = getTemplate();

  tmpl.name = "TitleWithBullets";

  tmpl.data = {
    title: "Welcome to SlideBuilder",
    bullet1: "Composable templates",
    bullet2: "Scriptable slides",
    bullet3: "Production-ready output",
  };

  tmpl.theme = {
    backgroundColor: "#223344",
    titleColor: "white",
    titleFontSize: 100,
    titleTopGap: 40,

    bulletsTopGap: 40,
    bulletGap: 20,
    bulletColor: "red",
    bulletFontSize: 50
  };

  tmpl.mapTheme = function (global) {
    return {
      backgroundColor: global.bgColor,
      titleColor: global.primaryColor,
      bulletColor: global.primaryColor
    };
  };
  

  tmpl.getItems = function (data = this.data, theme = this.theme) {
    debugger;
    const canvasWidth = 1020;
    const itemWidth = 800;
    const result = [];

    const title = getText(data.title);
    // TextPresets.heading(title);
    title.color = theme.titleColor;
    title.fontSize = theme.titleFontSize;
    
    title.y = theme.titleTopGap;
    // title.height = 80; 
    title.y = theme.titleTopGap;

    centerHorizontally(title, canvasWidth, itemWidth);
    result.push(title);

    const bullet1 = getText(data.bullet1 || "");
    // TextPresets.subtitle(bullet1);
    bullet1.color = theme.bulletColor;
    // bullet1.fontSize = theme.bulletFontSize;
    bullet1.fontSize = theme.bulletFontSize;
    placeBelow(bullet1, title, theme.bulletsTopGap);
    centerHorizontally(bullet1, canvasWidth, itemWidth);
    bullet1.textAlign = "center";
    result.push(bullet1);

    const bullet2 = getText(data.bullet2 || "");
    // TextPresets.subtitle(bullet2);
    bullet2.color = theme.bulletColor;
    bullet2.fontSize = theme.bulletFontSize;
    placeBelow(bullet2, bullet1, theme.bulletGap);
    centerHorizontally(bullet2, canvasWidth, itemWidth);
    bullet2.textAlign = "center";
    result.push(bullet2);

    const bullet3 = getText(data.bullet3 || "");
    // TextPresets.subtitle(bullet3);
    bullet3.color = theme.bulletColor;
    bullet3.fontSize = theme.bulletFontSize;
    placeBelow(bullet3, bullet2, theme.bulletGap);
    centerHorizontally(bullet3, canvasWidth, itemWidth);
    bullet3.textAlign = "center";
    result.push(bullet3);

    return result;
  };

  return tmpl; // ✅ this was missing
}
