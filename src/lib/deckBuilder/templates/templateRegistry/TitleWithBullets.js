// TitleWithBullets.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

const TitleWithBullets = new BaseTemplate("titleWithBullets");

TitleWithBullets.data = {
  title: "Welcome to SlideBuilder",
  bullet1: "Composable templates",
  bullet2: "Scriptable slides",
  bullet3: "Production-ready output",
  showAt1: 0,
  showAt2: 0,
  showAt3: 0
};

TitleWithBullets.theme = {
  titleFontSize: 100,
  titleTopGap: 40,
  bulletsTopGap: 110,
  bulletGap: 50,
  bulletFontSize: 80
};

TitleWithBullets.getItems = function () {
  const result = [];

  const title = this.items.text(this.data.title);
  title.color = this.resolve("titleColor", this.globalTheme.primaryColor);
  title.fontSize = this.resolve("titleFontSize", 100);
  title.y = this.resolve("titleTopGap", 40);
  this.centerHorizontally(title);
  result.push(title);

  const bullet1 = this.items.text(this.data.bullet1 || "");
  bullet1.color = this.globalTheme.bulletColor;
  bullet1.fontSize = this.resolve("bulletFontSize", 80);
  this.placeBelow(bullet1, title, this.resolve("bulletsTopGap", 110));
  this.centerHorizontally(bullet1);
  bullet1.textAlign = "center";
  bullet1.showAt = this.data.showAt1;
  result.push(bullet1);

  const bullet2 = this.items.text(this.data.bullet2 || "");
  bullet2.color = this.globalTheme.bulletColor;
  bullet2.fontSize = bullet1.fontSize;
  this.placeBelow(bullet2, bullet1, this.resolve("bulletGap", 50));
  this.centerHorizontally(bullet2);
  bullet2.textAlign = "center";
  bullet2.showAt = this.data.showAt2;
  result.push(bullet2);

  const bullet3 = this.items.text(this.data.bullet3 || "");
  bullet3.color = this.globalTheme.bulletColor;
  bullet3.fontSize = bullet1.fontSize;
  this.placeBelow(bullet3, bullet2, this.resolve("bulletGap", 50));
  this.centerHorizontally(bullet3);
  bullet3.textAlign = "center";
  bullet3.showAt = this.data.showAt3;
  result.push(bullet3);

  return {
    items: result,
    background: this.getBackground()
  };
};

export { TitleWithBullets };
