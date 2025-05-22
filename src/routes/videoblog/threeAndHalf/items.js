import * as PIXI from 'pixi.js';
import Icons  from "./Icons"; // your predefined icons map



export function drawText() {
  const fontFamily = 'Arial';
  const fontSize = 36;
  const fontKey = `Font_${fontFamily}_${fontSize}`;

  if (!PIXI.BitmapFont.available[fontKey]) {
    PIXI.BitmapFont.from(fontKey, {
      fontFamily,
      fontSize,
      fill: 0x000000
    });
  }

  const text = new PIXI.BitmapText('Welcome', {
    fontName: fontKey,
    fontSize,
    tint: 0x000000
  });

  text.x = 100;
  text.y = 100;
  return text;
}
export function drawIcon(data) {
  const icon = Icons[data.iconName];
  if (!icon) throw new Error(`Icon "${data.iconName}" not found in iconMap`);

  const gfx = new PIXI.Text(icon, {
    fontSize: data.width || 100,
    fill: data.color || 0xffffff,
    fontFamily: data.fontFamily || "Arial"
  });

  gfx.x = data.x;
  gfx.y = data.y;
  gfx.rotation = data.rotation || 0;
  gfx.visible = data.visible !== false;

  return gfx;
}

export function drawRect() {
  const rect = new PIXI.Graphics();
  rect.beginFill(0x00ccff);
  rect.drawRect(0, 0, 200, 100);
  rect.endFill();
  rect.x = 300;
  rect.y = 100;
  return rect;
}

export function drawCircle() {
  const circle = new PIXI.Graphics();
  circle.beginFill(0xff6666);
  circle.drawCircle(0, 0, 50); // radius 50
  circle.endFill();
  circle.x = 600;
  circle.y = 150;
  return circle;
}

export function drawTriangle() {
  const triangle = new PIXI.Graphics();
  triangle.beginFill(0x66ff66);
  triangle.moveTo(0, 0);
  triangle.lineTo(100, 0);
  triangle.lineTo(50, 86);
  triangle.lineTo(0, 0);
  triangle.endFill();
  triangle.x = 850;
  triangle.y = 120;
  return triangle;
}

export function drawImage() {
    const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');
    const sprite = new PIXI.Sprite(texture);
    sprite.x = 500;
    sprite.y = 300;
    sprite.width = 100;
    sprite.height = 100;
    return sprite;
  }
  