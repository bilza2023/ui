// createImageWithCaption.js

import { BaseTemplate } from '../baseTemplate/BaseTemplate';

function createImageWithCaption() {
  const tmpl = new BaseTemplate("imageWithCaption");

  tmpl.data = {
    imageSrc: "plant_cell",
    caption: "Plant cell structure",
    showAtImage: 0,
    showAtCaption: 5
  };

  tmpl.theme = {
    imageWidth: 600,
    imageHeight: 400,
    captionFontSize: 48,
    captionGap: 30
  };

  tmpl.getItems = function () {
    const items = [];

    const image = this.items.image({
      x: 0, y: 15,
      width: this.theme.imageWidth,
      height: this.theme.imageHeight,
      // src: this.data.imageSrc
      src: "images/mad_scientist.jpg"
    });
    image.showAt = this.data.showAtImage ?? 0;
    this.centerHorizontally(image);
    items.push(image);

    const caption = this.items.text(this.data.caption);
    caption.fontSize = this.theme.captionFontSize;
    caption.color = this.globalTheme.secondaryColor;
    caption.textAlign = "center";
    caption.showAt = this.data.showAtCaption ?? 5;
    this.placeBelow(caption, image, this.theme.captionGap);
    this.centerHorizontally(caption);
    items.push(caption);

    return {
      items,
      background: this._background
    };
  };

  return tmpl;
}

export { createImageWithCaption };
