export const slidesData = {
  designWidth: 1020,
  designHeight: 576,
  slides: [
    {
      id: "slide-4",
      startTime: 9,
      endTime: 12,
      items: [
        // Top Left
        {
          type: "rect",
          x: 30,
          y: 30,
          width: 200,
          height: 80,
          fillColor: "#880000",
          zIndex: 0
        },
        {
          type: "text",
          x: 40,
          y: 40,
          width: 180,
          height: 60,
          text: "Top Left",
          fontSize: 20,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: 6,
          zIndex: 1
        },
    
        // Top Right
        {
          type: "rect",
          x: 790,
          y: 30,
          width: 200,
          height: 80,
          fillColor: "#008800",
          zIndex: 0
        },
        {
          type: "text",
          x: 800,
          y: 40,
          width: 180,
          height: 60,
          text: "Top Right",
          fontSize: 20,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: 6,
          zIndex: 1
        },
    
        // Bottom Left
        {
          type: "rect",
          x: 30,
          y: 466,
          width: 200,
          height: 80,
          fillColor: "#000088",
          zIndex: 0
        },
        {
          type: "text",
          x: 40,
          y: 476,
          width: 180,
          height: 60,
          text: "Bottom Left",
          fontSize: 20,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: 6,
          zIndex: 1
        },
    
        // Bottom Right
        {
          type: "rect",
          x: 790,
          y: 466,
          width: 200,
          height: 80,
          fillColor: "#888800",
          zIndex: 0
        },
        {
          type: "text",
          x: 800,
          y: 476,
          width: 180,
          height: 60,
          text: "Bottom Right",
          fontSize: 20,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: 6,
          zIndex: 1
        }
      ]
    },    
    {
      id: "slide-1",
      startTime: 0,
      endTime: 3,
      items: [
        {
          type: "rect",
          x: 50,
          y: 120,
          width: 700,
          height: 200,
          fillColor: "#444444",
          borderColor: "#ffffff",
          borderWidth: 2,
          zIndex: 1
        },
        {
          type: "text",
          x: 100,
          y: 160,
          width: 600,
          height: 100,
          text: "Welcome to the Slide Player",
          fontSize: 36,
          fontFamily: "Arial",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "#000000",
          padding: 10,
          zIndex: 2
        }
      ]
    },
    {
      id: "slide-2",
      startTime: 3,
      endTime: 6,
      items: [
        {
          type: "rect",
          x: 100,
          y: 100,
          width: 820,
          height: 300,
          fillColor: "#228822",
          zIndex: 0
        },
        {
          type: "text",
          x: 150,
          y: 150,
          width: 720,
          height: 100,
          text: "Slide 2: Large Section",
          fontSize: 30,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: 10,
          zIndex: 1
        }
      ]
    }
  ]
};
