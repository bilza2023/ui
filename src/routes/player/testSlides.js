export const slidesData = {
  designWidth: 1020,
  designHeight: 576,
  slides: [
    // ──────────────────────────────────
    // 1. Corner‑rect sanity check
    // ──────────────────────────────────
    {
      id: "corners",
      startTime: 0,
      endTime: 3,
      items: [
        // TL
        { type: "rect", x: 0,                y: 0,                width: 80, height: 80, fillColor: "#d32f2f" },
        // TR
        { type: "rect", x: 1020-80,          y: 0,                width: 80, height: 80, fillColor: "#388e3c" },
        // BL
        { type: "rect", x: 0,                y: 576-80,           width: 80, height: 80, fillColor: "#1976d2" },
        // BR
        { type: "rect", x: 1020-80,          y: 576-80,           width: 80, height: 80, fillColor: "#fbc02d" },

        // Centre marker
        { type: "circle", x: 510, y: 288, radius: 15, fillColor: "#ffffff", borderColor:"#000000", borderWidth:2 },
        { type: "text",   x: 480, y: 305, width: 120, height: 30, text: "(510,288)", fontSize: 14, color:"#ffffff" }
      ]
    },

    // ──────────────────────────────────
    // 2. Edge mid‑points + labels
    // ──────────────────────────────────
    {
      id: "edges",
      startTime: 3,
      endTime: 6,
      items: [
        // Top‑mid
        { type: "circle", x: 510, y: 0,    radius: 12, fillColor:"#ff4081" },
        { type: "text",   x: 470, y: 15,   width: 120, height: 25, text: "Top‑mid", fontSize:14, color:"#ffffff"},
        // Bottom‑mid
        { type: "circle", x: 510, y: 576, radius: 12, fillColor:"#ff4081" },
        { type: "text",   x: 455, y: 540, width: 160, height: 25, text: "Bottom‑mid", fontSize:14, color:"#ffffff"},
        // Left‑mid
        { type: "circle", x: 0,   y: 288, radius: 12, fillColor:"#ff4081" },
        { type: "text",   x: 20,  y: 260, width: 120, height: 25, text: "Left‑mid", fontSize:14, color:"#ffffff"},
        // Right‑mid
        { type: "circle", x: 1020, y: 288, radius: 12, fillColor:"#ff4081" },
        { type: "text",   x: 870, y: 260, width: 140, height: 25, text: "Right‑mid", fontSize:14, color:"#ffffff"}
      ]
    },

    // ──────────────────────────────────
    // 3. “Union‑Jack” diagonals test
    // ──────────────────────────────────
    {
      id: "diagonals",
      startTime: 6,
      endTime: 9,
      items: [
        // NW↘SE diagonal dots (every 15%)
        ...[0.15,0.30,0.45,0.60,0.75,0.90].map(t => ({
          type:"circle",
          x: 1020*t,
          y: 576*t,
          radius: 10,
          fillColor:"#00e5ff"
        })),
        // NE↙SW diagonal dots (every 15%)
        ...[0.15,0.30,0.45,0.60,0.75,0.90].map(t => ({
          type:"circle",
          x: 1020*(1-t),
          y: 576*t,
          radius: 10,
          fillColor:"#ffea00"
        }))
      ]
    },

    // ──────────────────────────────────
    // 4. 10×10 grid intersection dots
    //    (tiny grey markers)
    // ──────────────────────────────────
    {
      id: "grid‑10x10",
      startTime: 9,
      endTime: 12,
      items: [
        ...Array.from({ length: 11 }, (_, gx) =>
          Array.from({ length: 11 }, (_, gy) => ({
            type: "circle",
            x: (1020 / 10) * gx,
            y: (576  / 10) * gy,
            radius: 4,
            fillColor: "#9e9e9e"
          }))
        ).flat()
      ]
    }
  ]
};
