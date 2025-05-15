export const slidesData = {
    designWidth: 1020,
    designHeight: 576,
    slides: [
      {
        id: "placement-precision",
        startTime: 0,
        endTime: 5,
        backgroundColor: "#000000",
        items: [
          // Four corners
          { type: "circle", x: 0, y: 0, radius: 10, fillColor: "#ff0000" },          // Top-left
          { type: "circle", x: 1020, y: 0, radius: 10, fillColor: "#00ff00" },       // Top-right
          { type: "circle", x: 0, y: 576, radius: 10, fillColor: "#0000ff" },        // Bottom-left
          { type: "circle", x: 1020, y: 576, radius: 10, fillColor: "#ffff00" },     // Bottom-right
  
          // Center
          { type: "circle", x: 510, y: 288, radius: 12, fillColor: "#ffffff" },      // Center
  
          // Labels (optional)
          {
            type: "text", x: 420, y: 20, width: 180, height: 40,
            text: "Check corners + center", fontSize: 18, color: "#ffffff"
          }
        ]
      }
    ]
  };
  