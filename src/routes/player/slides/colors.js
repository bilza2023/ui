// src/routes/player/slides/colors.js
export const designWidth = 1020;
export const designHeight = 576;

export const slides = [
  {
    id: 'colors-alpha-borders',
    backgroundColor: '#222222',  // ✅ NEW LINE
    startTime: 0,
    endTime: 4,
    items: [
      {
        type: 'rect',
        x: 50, y: 50, width: 200, height: 100,
        fillColor: 'red', borderColor: 'black', borderWidth: 4
      },
      {
        type: 'rect',
        x: 300, y: 50, width: 200, height: 100,
        fillColor: 'blue', borderColor: 'white', borderWidth: 2,
        globalAlpha: 0.5
      },
      {
        type: 'circle',
        x: 600, y: 100, width: 100, height: 100,
        fillColor: 'green', borderColor: 'yellow', borderWidth: 6,
        globalAlpha: 0.3
      },
      {
        type: 'text',
        x: 750, y: 50, width: 200, height: 100,
        text: "Semi-transparent",
        fontSize: 20,
        backgroundColor: "#00000088",
        color: "#ffffff"
      }
    ]
  }
];
