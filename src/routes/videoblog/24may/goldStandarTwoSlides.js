

// goldStandardTwoSlides.js

export const presentationData = {
    designWidth: 1020,
    designHeight: 576,
    slidesData: [
      {
        startTime: 0,
        endTime: 5,
        background: { backgroundColor: "#1a1a1a" },
        items: [
          {
            type: "text",
            text: "Slide One",
            x: 100,
            y: 100,
            fontSize: 80,
            fontFamily: "Arial",
            color: 0xffffff,
            textAlign: "left",
            lineHeight: 1.2,
            padding: 10,
            animate: []
          }
        ]
      },
      {
        startTime: 5,
        endTime: 10,
        background: { backgroundColor: "#003366" },
        items: [
          {
            type: "text",
            text: "Slide Two",
            x: 100,
            y: 100,
            fontSize: 80,
            fontFamily: "Arial",
            color: 0xffcc00,
            textAlign: "left",
            lineHeight: 1.2,
            padding: 10,
            animate: []
          }
        ]
      }
    ]
  };
  