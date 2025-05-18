import { getTemplate } from './getTemplate.js';
import { getText } from '../itemsFolder';
import { centerHorizontally, placeBelow } from './layoutUtils.js';
 
export function TitleWithBullets() {
  const tmpl = getTemplate("TitleWithBullets");

  tmpl.data = {
    title: "Welcome to SlideBuilder",
    bullet1: "Composable templates",
    bullet2: "Scriptable slides",
    bullet3: "Production-ready output",
    showAt1: 0,
    showAt2: 0,
    showAt3: 0,
  };

  tmpl.theme = {
    titleFontSize: 100,
    titleTopGap: 40,
    bulletsTopGap: 110,
    bulletGap: 50,
    bulletFontSize: 80
  };
/////////////////////////////////////////////////
  tmpl.getItems = function () {
 
    const result = [];

    const title = getText(this.data.title);
    title.color = this.theme.titleColor || this.globalTheme.primaryColor;
    title.fontSize = this.theme.titleFontSize || 100;
    title.y = this.theme.titleTopGap || 40;
    centerHorizontally(title, canvasWidth, itemWidth);
    result.push(title);

    const bullet1 = getText(this.data.bullet1 || "");
    bullet1.color = this.globalTheme.bulletColor;
    bullet1.fontSize = this.theme.bulletFontSize || 80;
    placeBelow(bullet1, title, this.theme.bulletsTopGap || 110);
    centerHorizontally(bullet1, canvasWidth, itemWidth);
    bullet1.textAlign = "center";
    bullet1.showAt = this.data.showAt1;
    result.push(bullet1);

    const bullet2 = getText(this.data.bullet2 || "");
    bullet2.color = this.globalTheme.bulletColor;
    bullet2.fontSize = bullet1.fontSize;
    placeBelow(bullet2, bullet1, this.theme.bulletGap || 50);
    centerHorizontally(bullet2, canvasWidth, itemWidth);
    bullet2.textAlign = "center";
    bullet2.showAt = this.data.showAt2;
    result.push(bullet2);

    const bullet3 = getText(this.data.bullet3 || "");
    bullet3.color = this.globalTheme.bulletColor;
    bullet3.fontSize = bullet1.fontSize;
    placeBelow(bullet3, bullet2, this.theme.bulletGap || 50);
    centerHorizontally(bullet3, canvasWidth, itemWidth);
    bullet3.textAlign = "center";
    bullet3.showAt = this.data.showAt3;
    result.push(bullet3);

    return {
      items: result,
      background: {
        backgroundImage: null,
        pattern: null
      }
    };
  };

  return tmpl;
}
