// createImageLeftTextRight.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

function createImageLeftTextRight() {
  const tmpl = new BaseTemplate("imageLeftTextRight");

  tmpl.data = {
    imageSrc: "microscope",
    text: "The microscope allows us to see microscopic organisms.",
    showAtImage: 0,
    showAtText: 5
  };

  tmpl.theme = {
    imageWidth: 400,
    imageHeight: 300,
    textFontSize: 48,
    gapX: 60,
    topY: 100
  };

  tmpl.getItems = function () {
    const items = [];

    const image = this.items.image({
      x: 100,
      y: this.theme.topY,
      width: this.theme.imageWidth,
      height: this.theme.imageHeight,
      src: this.data.imageSrc
    });
    image.showAt = this.data.showAtImage ?? 0;
    items.push(image);

    const text = this.items.text(this.data.text);
    text.fontSize = this.theme.textFontSize;
    text.color = this.globalTheme.primaryColor;
    text.x = image.x + this.theme.imageWidth + this.theme.gapX;
    text.y = image.y;
    text.width = 400;
    text.showAt = this.data.showAtText ?? 5;
    items.push(text);

    return {
      items,
      background: this._background
    };
  };

  return tmpl;
}

export { createImageLeftTextRight };
