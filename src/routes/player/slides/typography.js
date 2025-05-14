// src/routes/player/slides/typography.js
export const designWidth = 1020;
export const designHeight = 576;

export const slides = [
  {
    id: 'typography-basic',
    backgroundColor: '#222222',  // ✅ NEW LINE
    startTime: 0,
    endTime: 4,
    items: [
      {
        type: 'text',
        x: 50, y: 50, width: 300, height: 100,
        text: "Left aligned\nwith padding",
        fontSize: 24,
        textAlign: "left",
        padding: 10,
        backgroundColor: "#333",
        color: "#fff"
      },
      {
        type: 'text',
        x: 400, y: 50, width: 300, height: 100,
        text: "Center aligned",
        fontSize: 24,
        textAlign: "center",
        backgroundColor: "#222",
        color: "#fff"
      },
      {
        type: 'text',
        x: 750, y: 50, width: 200, height: 100,
        text: "Right\nAligned",
        fontSize: 24,
        textAlign: "right",
        lineHeight: 1.5,
        backgroundColor: "#111",
        color: "#0f0"
      }
    ]
  }
];
