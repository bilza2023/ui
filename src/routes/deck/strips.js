// strips.js

const TILE = 64;
const SCENE_TILES_W = 40;
const SCENE_TILES_H = 20;

export const SCENE_W = SCENE_TILES_W * TILE; // 2560
export const SCENE_H = SCENE_TILES_H * TILE; // 1280
export const SCENES_PER_STRIP = 6;

export function getSceneFromStrip({ stripUrl, sceneIndexInStrip }) {
  return {
    stripUrl,
    offsetX: sceneIndexInStrip * SCENE_W,
    offsetY: 0,
    width: SCENE_W,
    height: SCENE_H
  };
}
