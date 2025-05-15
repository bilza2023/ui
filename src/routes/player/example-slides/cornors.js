export const slidesData = {
    designWidth: 1020,
    designHeight: 576,
    slides: [
      {
        id: "corner-center-rects",
        startTime: 0,
        endTime: 5,
        backgroundColor: "#000000",
        items: [
          // Top-left
          { type: "rect", x: 0, y: 0, width: 100, height: 60, fillColor: "#ff0000" },
  
          // Top-right
          { type: "rect", x: 920, y: 0, width: 100, height: 60, fillColor: "#00ff00" },
  
          // Bottom-left
          { type: "rect", x: 0, y: 516, width: 100, height: 60, fillColor: "#0000ff" },
  
          // Bottom-right
          { type: "rect", x: 920, y: 516, width: 100, height: 60, fillColor: "#ffff00" },
  
          // Center
          { type: "rect", x: 460, y: 258, width: 100, height: 60, fillColor: "#ffffff" }
        ]
      }
    ]
  };
  