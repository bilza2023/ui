// layoutUtils.js

export function centerHorizontally(item, canvasWidth, itemWidth) {
    item.width = itemWidth;
    item.x = (canvasWidth - itemWidth) / 2;
  }
  
  export function placeBelow(item, anchorItem, gap = 20) {
    item.y = anchorItem.y + anchorItem.height + gap;
  }
  