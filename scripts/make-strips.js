import fs from "fs";

/* =========================
   INPUT (DEMO VALUES)
   ========================= */
const OUTPUT_FILE = "./strip.tmj";

const SURAH_NUMBER = 2;
const SURAH_NAME = "Al-Baqarah";
const START_AYAH = 7;

const SCENES = 6;

/* =========================
   SCENE + TILE CONFIG
   ========================= */
const TILE_SIZE = 64;

const SCENE_WIDTH = 40;   // tiles per scene
const SCENE_HEIGHT = 20;  // tiles per scene

const MAP_WIDTH = SCENE_WIDTH * SCENES;
const MAP_HEIGHT = SCENE_HEIGHT;

/* =========================
   BACKGROUND TILE LAYER
   ========================= */
const backgroundLayer = {
  id: 1,
  name: "background",
  type: "tilelayer",
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  visible: true,
  opacity: 1,
  data: Array(MAP_WIDTH * MAP_HEIGHT).fill(1)
};

/* =========================
   OBJECT LAYER
   ========================= */
const objects = [];
let objectId = 1;

for (let i = 0; i < SCENES; i++) {
  const sceneX = i * SCENE_WIDTH * TILE_SIZE;
  const sceneWidthPx = SCENE_WIDTH * TILE_SIZE;
  const sceneHeightPx = SCENE_HEIGHT * TILE_SIZE;

  const ayahNumber = START_AYAH + i;

  /* ---- Scene Border ---- */
  objects.push({
    id: objectId++,
    name: "scene-border",
    type: "border",
    x: sceneX,
    y: 0,
    width: sceneWidthPx,
    height: sceneHeightPx,
    visible: true,
    properties: [
      { name: "sceneIndex", type: "int", value: i },
      { name: "surah", type: "int", value: SURAH_NUMBER },
      { name: "ayah", type: "int", value: ayahNumber }
    ]
  });

  /* ---- Ayah Number (TOP-LEFT) ---- */
  objects.push({
    id: objectId++,
    name: "ayah-number",
    type: "text",
    x: sceneX + 24,
    y: 24,
    width: 200,
    height: 60,
    visible: true,
    text: {
      text: `${SURAH_NUMBER}:${ayahNumber}`,
      wrap: false,
      pixelsize: 32,
      color: "#000000",
      bold: true,
      halign: "left",
      valign: "top"
    }
  });

  /* ---- Surah Name (BOTTOM-CENTER, SMALL) ---- */
  objects.push({
    id: objectId++,
    name: "surah-name",
    type: "text",
    x: sceneX + sceneWidthPx / 2 - 150,
    y: sceneHeightPx - 70,
    width: 300,
    height: 40,
    visible: true,
    text: {
      text: SURAH_NAME,
      wrap: false,
      pixelsize: 18,
      color: "#333333",
      bold: false,
      halign: "center",
      valign: "bottom"
    }
  });
}

/* =========================
   OBJECT LAYER WRAPPER
   ========================= */
const objectLayer = {
  id: 2,
  name: "labels",
  type: "objectgroup",
  draworder: "topdown",
  visible: true,
  opacity: 1,
  objects
};

/* =========================
   FINAL TMJ MAP
   ========================= */
const tmj = {
  type: "map",
  version: "1.10",
  tiledversion: "1.11.1",
  orientation: "orthogonal",
  renderorder: "right-down",
  tilewidth: TILE_SIZE,
  tileheight: TILE_SIZE,
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  layers: [
    backgroundLayer,
    objectLayer
  ],
  tilesets: [
    { firstgid: 1, source: "base.tsx" }
  ],
  nextlayerid: 3,
  nextobjectid: objectId + 1
};

/* =========================
   WRITE FILE (OVERWRITE)
   ========================= */
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tmj, null, 2));
console.log("✔ strip.tmj generated with ayah numbers + surah names");
