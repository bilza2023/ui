// createTitleWithImage.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

function createTitleWithImage() {
  const tmpl = new BaseTemplate("titleWithImage");

  tmpl.data = {
    title: "Slide Title",
    imageSrc: "images/placeholder.png",
    showAtTitle: 0,
    showAtImage: 5
  };

  tmpl.theme = {
    titleFontSize: 80,
    imageTopGap: 60
  };

  tmpl.getItems = function () {
    const items = [];

    // Title text
    const title = this.items.text(this.data.title);
    title.fontSize = this.theme.titleFontSize ?? 80;
    title.color = this.globalTheme.primaryColor;
    title.fontFamily = this.globalTheme.fontFamilyHeading;
    title.textAlign = "center";
    title.showAt = this.data.showAtTitle ?? 0;
    this.centerHorizontally(title);
    items.push(title);

    // Image below title
    const image = this.items.image({
      x: 0, y: 0, width: 400, height: 400, src: this.data.imageSrc
    });
    image.showAt = this.data.showAtImage ?? 5;

    const gap = this.theme.imageTopGap ?? 60;
    this.placeBelow(image, title, gap);
    this.centerHorizontally(image);
    items.push(image);

    return {
      items,
      background: this._background
    };
  };

  return tmpl;
}

export { createTitleWithImage };
