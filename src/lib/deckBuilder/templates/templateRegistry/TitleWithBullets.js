// TitleWithBullets.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

const TitleWithBullets = new BaseTemplate("titleWithBullets");

// ✅ Content-specific data
TitleWithBullets.data = {
  title: "Welcome to SlideBuilder",
  bullet1: "Composable templates",
  bullet2: "Scriptable slides",
  bullet3: "Production-ready output",
  showAt1: 0,
  showAt2: 0,
  showAt3: 0,

  titleFontSize: 70,
  titleTopGap: 40,
  bulletsTopGap: 110,
  bulletGap: 50,
  bulletFontSize: 80
};

// ✅ Only expose what user is allowed to override
TitleWithBullets.theme = {

};

TitleWithBullets.getItems = function () {
  const items = [];

  const title = this.items.text(this.data.title);

  title.color = this.globalTheme.primaryColor;
  title.fontSize = this.data.titleFontSize ?? 100;
  title.y = this.data.titleTopGap ?? 40;
  title.textAlign = "center";
  this.centerHorizontally(title);
  items.push(title);

  const bullet1 = this.createBullet(this.data.bullet1, title, this.data.showAt1, true);
  const bullet2 = this.createBullet(this.data.bullet2, bullet1, this.data.showAt2);
  const bullet3 = this.createBullet(this.data.bullet3, bullet2, this.data.showAt3);

  items.push(bullet1, bullet2, bullet3);

  return {
    items,
    background: this._background
  };
};
////////////////////////////////
// 🔧 Bullet creator
TitleWithBullets.createBullet = function (text, refItem, showAt, isFirst = false) {
  const bullet = this.items.text(text || "");
  bullet.color = this.globalTheme.secondaryColor;
  bullet.fontSize = this.data.bulletFontSize ?? 80;
  bullet.textAlign = "center";
  bullet.showAt = showAt;

  const gap = isFirst
    ? this.data.bulletsTopGap ?? 110
    : this.data.bulletGap ?? 50;

  this.placeBelow(bullet, refItem, gap);
  this.centerHorizontally(bullet);

  return bullet;
};

////////////////////////////////
export { TitleWithBullets };
