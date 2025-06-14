// =========================
// File: /presets/text.js — final with appearance-only style presets
// =========================

import { ItemBuilders } from "taleem-video-deckbuilder";
import { makeVPos } from "./util/verticalPos";

const DESIGN_W = 1020;
const DESIGN_H = 576;
const vPos = makeVPos(DESIGN_H);

const resolveY = (v, yFallback) =>
  (v && vPos[v] !== undefined) ? vPos[v] : (yFallback ?? 0);

export const textPresets = {
  // Positional heading presets (keep these)

  leftHeading({ text }, theme, { v = "top" } = {}) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 48,
      fontWeight: "bold",
      x: 0,
      y: resolveY(v),
      showAt: 0,
      visible: true
    };
  },

  centerHeading({ text }, theme, { v = "center" } = {}) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 64,
      fontWeight: "bold",
      x: 0,
      width: DESIGN_W,
      y: resolveY(v),
      textAlign: "center",
      showAt: 0,
      visible: true
    };
  },

  rightHeading({ text }, theme, { v = "bottom" } = {}) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 48,
      fontWeight: "bold",
      x: 0,
      width: DESIGN_W,
      y: resolveY(v),
      textAlign: "right",
      showAt: 0,
      visible: true
    };
  },

////////////////////////////////////////////////////  
////////////////////////////////////////////////////  
  smallText({ text }, theme) {
    const base = ItemBuilders.text(text);
    const themed = theme?.text || {};
    const styled = {
      fontSize: 16,
      fontWeight: "normal",
      visible: true,
      showAt: 0
    };
    return {
      ...base,
      ...themed,
      ...styled
    };
  },
  

  caption({ text }, theme) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 14,
      fontStyle: "italic",
      color: 0x666666,
      visible: true,
      showAt: 0
    };
  },

  footnote({ text }, theme) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 12,
      color: 0x888888,
      fontWeight: "light",
      visible: true,
      showAt: 0
    };
  },

  heroText({ text }, theme) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 72,
      fontWeight: "900",
      visible: true,
      showAt: 0
    };
  },

  quoteLine({ text }, theme) {
    return {
      ...ItemBuilders.text(text),
      ...theme?.text,
      fontSize: 20,
      fontStyle: "italic",
      lineGap: 8,
      color: 0x444444,
      visible: true,
      showAt: 0
    };
  }
};
