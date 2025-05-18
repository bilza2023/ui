// TitleWithBullets.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

const TitleWithBullets = new BaseTemplate("titleWithBullets");

TitleWithBullets.createBullet = function (text, referenceItem, showAt, isFirst = false) {
  const bullet = this.items.text(text || "");
  bullet.color = this.globalTheme.bulletColor;
  bullet.fontSize = this.resolve("bulletFontSize", 80);
  bullet.textAlign = "center";
  bullet.showAt = showAt;

  const gap = this.resolve(isFirst ? "bulletsTopGap" : "bulletGap", isFirst ? 110 : 50);
  this.placeBelow(bullet, referenceItem, gap);
  this.centerHorizontally(bullet);

  return bullet;
};
///////////////////////////////////////////////////
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

TitleWithBullets.setBackground(BaseTemplate.backgroundWithImage("black_mat"));

TitleWithBullets.getItems = function () {
  const result = [];

  const title = this.items.text(this.data.title);
  title.color = this.resolve("titleColor", this.globalTheme.primaryColor);
  title.fontSize = this.resolve("titleFontSize", 100);
  title.y = this.resolve("titleTopGap", 40);
  this.centerHorizontally(title);
  result.push(title);

  const bullet1 = this.createBullet(this.data.bullet1, title, this.data.showAt1, true);
  result.push(bullet1);
  
  const bullet2 = this.createBullet(this.data.bullet2, bullet1, this.data.showAt2);
  result.push(bullet2);
  
  const bullet3 = this.createBullet(this.data.bullet3, bullet2, this.data.showAt3);
  result.push(bullet3);
  
  return {
    items: result,
    background: this.getBackground()
  };
};

export { TitleWithBullets };

