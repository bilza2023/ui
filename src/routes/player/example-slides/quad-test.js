export const slidesData = {
    designWidth: 1020,
    designHeight: 576,
    slides: [
      {
        id: "quadrant-test",
        startTime: 0,
        endTime: 5,
        backgroundColor: "#000000",
        items: [
          // Top-left quadrant
          {
            type: "rect",
            x: 0, y: 0,
            width: 510, height: 288,
            fillColor: "#ff0000"  // red
          },
          // Top-right quadrant
          {
            type: "rect",
            x: 510, y: 0,
            width: 510, height: 288,
            fillColor: "#00ff00"  // green
          },
          // Bottom-left quadrant
          {
            type: "rect",
            x: 0, y: 288,
            width: 510, height: 288,
            fillColor: "#0000ff"  // blue
          },
          // Bottom-right quadrant
          {
            type: "rect",
            x: 510, y: 288,
            width: 510, height: 288,
            fillColor: "#ffff00"  // yellow
          }
        ]
      }
    ]
  };
  