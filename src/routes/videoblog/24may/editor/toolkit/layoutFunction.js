
///Error the designWidth and height should not be here
const designWidth = 1020;
const designHeight = 576;

export function layout(item, align = "left", yPercent = 0.2, xOffset = 0) {
    // Set vertical position
    item.y = Math.round(designHeight * yPercent);
  
    // Set horizontal position and alignment
    if (align === "center") {
      item.textAlign = "center";
      item.x = 0 + xOffset;
      item.width = designWidth;
    } else if (align === "right") {
      item.textAlign = "right";
      item.x = 80 + xOffset;
      item.width = designWidth - 160;
    } else {
      // default: left
      item.textAlign = "left";
      item.x = 80 + xOffset;
      item.width = designWidth - 160;
    }
  }