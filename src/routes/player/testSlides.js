export const slides = [
  {
    id: "slide-1",
    startTime: 0,
    endTime: 3,
    items: [
      {
        type: "text",
        x: 100,
        y: 100,
        width: 400,
        height: 100,
        text: "Welcome to the Player",
        fontSize: 32,
        fontFamily: "Arial",
        color: "#ffffff",
        backgroundColor: "#333333",
        padding: 10,
        textAlign: "center",
        lineHeight: 1.4,
        zIndex: 2,
        rotation: 0,
        visible: true
      },
      {
        type: "rect",
        x: 90,
        y: 90,
        width: 420,
        height: 120,
        fillColor: "#ff6600",
        borderColor: "#000000",
        borderWidth: 2,
        rotation: 0,
        zIndex: 1,
        visible: true
      }
    ]
  },
  {
    id: "slide-2",
    startTime: 3,
    endTime: 6,
    items: [
      {
        type: "text",
        x: 120,
        y: 150,
        width: 500,
        height: 100,
        text: "This is Slide Two",
        fontSize: 30,
        fontFamily: "Courier New",
        color: "#00ffcc",
        backgroundColor: "#222222",
        padding: 10,
        textAlign: "left",
        rotation: 0,
        zIndex: 1,
        visible: true
      }
    ]
  }
];
