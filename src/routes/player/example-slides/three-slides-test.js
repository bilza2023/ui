export const slidesData = {
    designWidth: 1020,
    designHeight: 576,
    slides: [
      {
        id: "slide-text",
        startTime: 0,
        endTime: 5,
        backgroundColor: "#1c1c1c",
        transition: {
          type: "fade",
          duration: 0.5
        },
        items: [
          {
            type: "text",
            text: "Welcome to Slide 1",
            x: 260, y: 120,
            width: 500, height: 60,
            fontSize: 30,
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "#333333",
            padding: 10
          }
        ]
      },
      {
        id: "slide-shapes",
        startTime: 5,
        endTime: 10,
        backgroundColor: "#002244",
        transition: {
          type: "slide",
          duration: 0.5
        },
        items: [
          {
            type: "rect",
            x: 100, y: 100,
            width: 200, height: 100,
            fill: "#ffcc00"
          },
          {
            type: "circle",
            x: 800, y: 200,
            radius: 50,
            fill: "#00ffcc"
          }
        ]
      },
      {
        id: "slide-mixed",
        startTime: 10,
        endTime: 15,
        backgroundColor: "#333",
        transition: {
          type: "fade",
          duration: 0.5
        },
        items: [
          {
            type: "text",
            text: "Final Slide!",
            x: 310, y: 80,
            width: 400, height: 50,
            fontSize: 26,
            color: "#ffffff",
            backgroundColor: "#660000",
            padding: 8,
            textAlign: "center"
          },
          {
            type: "rect",
            x: 100, y: 300,
            width: 100, height: 100,
            fill: "#cc0000"
          },
          {
            type: "circle",
            x: 900, y: 300,
            radius: 40,
            fill: "#0099ff"
          }
        ]
      }
    ]
  };
  