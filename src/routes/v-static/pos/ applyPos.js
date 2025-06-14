// /pos/applyPos.js
// Final positional system for Taleem canvas slides
// Sets x = 0, width = designW, textAlign from enum, y from enum + optional dy

import { pos } from "./grid.js";

function apply(item, key, designW, { dy = 0 } = {}) {
  const def = pos[key];
  if (!def) throw new Error(`Invalid position key: ${key}`);
  item.x = 0;
  item.width = designW;
  item.textAlign = def.align;
  item.y = def.y + dy;
}

export const applyPos = {
  topLeft:       (item, w, o) => apply(item, "topLeft", w, o),
  topCenter:     (item, w, o) => apply(item, "topCenter", w, o),
  topRight:      (item, w, o) => apply(item, "topRight", w, o),

  centerLeft:    (item, w, o) => apply(item, "centerLeft", w, o),
  center:        (item, w, o) => apply(item, "center", w, o),
  centerRight:   (item, w, o) => apply(item, "centerRight", w, o),

  bottomLeft:    (item, w, o) => apply(item, "bottomLeft", w, o),
  bottomCenter:  (item, w, o) => apply(item, "bottomCenter", w, o),
  bottomRight:   (item, w, o) => apply(item, "bottomRight", w, o),
};
