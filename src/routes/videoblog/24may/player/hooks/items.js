
import * as PIXI from 'pixi.js';
import Icons from '../core/engine/Icons.js';
import toPixiColor from "./toPixiColor.js";
// === TEXT ===
export function drawText(props = {}) {
  // debugger;
  const merged = {
    text: 'Default Text',
    type: 'text',
    x: 0,
    y: 0,
    width: 1020,              // default to full screen width
    fontSize: 36,
    fontFamily: 'Arial',
    color: 0x000000,
    textAlign: 'left',        // new: honor layout intent
    rotation: 0,
    visible: true,
    ...props,
  };

  // toPixiColor
  merged.color = toPixiColor(merged.color); 
  const fontKey = `Font_${merged.fontFamily}_${merged.fontSize}`;

  if (!PIXI.BitmapFont.available[fontKey]) {
    PIXI.BitmapFont.from(fontKey, {
      fontFamily: merged.fontFamily,
      fontSize: merged.fontSize,
      fill: merged.color,
    });
  }

  const text = new PIXI.BitmapText(merged.text, {
    fontName: fontKey,
    fontSize: merged.fontSize,
    tint: merged.color,
  });

  // === Alignment logic ===
  if (merged.textAlign === 'center') {
    text.anchor.set(0.5, 0);                         // center
    text.x = merged.x + merged.width / 2;
  } else if (merged.textAlign === 'right') {
    text.anchor.set(1, 0);                           // right-align
    text.x = merged.x + merged.width;
  } else {
    text.anchor.set(0, 0);                           // left-align
    text.x = merged.x;
  }

  text.y = merged.y;
  text.rotation = merged.rotation;
  text.visible = merged.visible;
  return text;
}

// === ICON ===
export function drawIcon(props = {}) {
  const merged = {
    iconName: 'BULB',
    type : 'icon',
    x: 0,
    y: 0,
    width: 100,
    color: 0xffffff,
    fontFamily: 'Arial',
    rotation: 0,
    visible: true,
    ...props,
  };

  const icon = Icons[merged.iconName];
  if (!icon) throw new Error(`Icon "${merged.iconName}" not found in Icons`);

  const text = new PIXI.Text(icon, {
    fontSize: merged.width,
    fill: merged.color,
    fontFamily: merged.fontFamily,
  });

  text.x = merged.x;
  text.y = merged.y;
  text.rotation = merged.rotation;
  text.visible = merged.visible;
  return text;
}

// === RECTANGLE ===
export function drawRect(props = {}) {
  const merged = {
    type : 'rect',
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    color: 0x00ccff,
    rotation: 0,
    visible: true,
    ...props,
  };

  const rect = new PIXI.Graphics();
  rect.beginFill(merged.color);
  rect.drawRect(0, 0, merged.width, merged.height);
  rect.endFill();

  rect.x = merged.x;
  rect.y = merged.y;
  rect.rotation = merged.rotation;
  rect.visible = merged.visible;
  return rect;
}

// === CIRCLE ===
export function drawCircle(props = {}) {
  const merged = {
    type : 'circle',
    x: 0,
    y: 0,
    radius: 50,
    color: 0xff6666,
    rotation: 0,
    visible: true,
    ...props,
  };

  const circle = new PIXI.Graphics();
  circle.beginFill(merged.color);
  circle.drawCircle(0, 0, merged.radius);
  circle.endFill();

  circle.x = merged.x;
  circle.y = merged.y;
  circle.rotation = merged.rotation;
  circle.visible = merged.visible;
  return circle;
}

// === TRIANGLE ===
export function drawTriangle(props = {}) {
  const merged = {
    type : 'triangle',
    x: 0,
    y: 0,
    size: 100,
    color: 0x66ff66,
    rotation: 0,
    visible: true,
    ...props,
  };

  const triHeight = merged.size * 0.86;
  const triangle = new PIXI.Graphics();
  triangle.beginFill(merged.color);
  triangle.moveTo(0, 0);
  triangle.lineTo(merged.size, 0);
  triangle.lineTo(merged.size / 2, triHeight);
  triangle.lineTo(0, 0);
  triangle.endFill();

  triangle.x = merged.x;
  triangle.y = merged.y;
  triangle.rotation = merged.rotation;
  triangle.visible = merged.visible;
  return triangle;
}

// === IMAGE ===
export function drawImage(props = {}, assets = {}) {
  
  const merged = {
    type: 'image',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    src: 'book',
    rotation: 0,
    visible: true,
    ...props,
  };

  const texture = assets[merged.src];
  if (!texture) {
    console.warn(`⚠️ Image asset "${merged.src}" not found in assets map.`);
    return new PIXI.Sprite(PIXI.Texture.WHITE); // or return null
  }

  const sprite = new PIXI.Sprite(texture);
  sprite.x = merged.x;
  sprite.y = merged.y;
  sprite.width = merged.width;
  sprite.height = merged.height;
  sprite.rotation = merged.rotation;
  sprite.visible = merged.visible;

  return sprite;
}


