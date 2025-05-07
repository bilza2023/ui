export const slide = {
  uuid: "slide-white-shapes-001",
  name: "white-shapes-demo",
  background: {
    color: "gray",
    opacity: 0.7,
    backgroundColor: "blue", // light cream
    cellHeight: 25,
    cellWidth: 25,
    backgroundImage: null,
    showGrid: false,
    gridLineWidth: 1,
    gridLineColor: "black"
  },
  items: [
    {
      type: "rectangle",
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      filled: true,
      color: "#ff9999",
      dash: 0,
      gap: 0,
      lineWidth: 2,
      rotation: 0,
      opacity: 1,
      uuid: "rect-001",
      name: "red-rectangle"
    },
    {
      type: "circle",
      x: 400,
      y: 100,
      radius: 50,
      startAngle: 0,
      endAngle: 6.28318,
      filled: true,
      color: "#66ccff",
      dash: 0,
      gap: 0,
      lineWidth: 2,
      opacity: 1,
      rotation: 0,
      uuid: "circle-001",
      name: "blue-circle"
    },
    {
      type: "ellipse",
      x: 250,
      y: 250,
      radiusX: 60,
      radiusY: 40,
      rotation: 0,
      startAngle: 0,
      endAngle: 6.28318,
      lineWidth: 2,
      filled: true,
      color: "#aaffaa",
      opacity: 1,
      uuid: "ellipse-001",
      name: "green-ellipse"
    },
    {
      "type": "line",
      "uuid": "line-001",
      "name": "baseline",
      "opacity": 1,
      "color": "#ff0000",
      "rotation": 0,
      "x1": 100,
      "y1": 200,
      "x2": 300,
      "y2": 200,
      "lineWidth": 2,
      "dash": 4,
      "gap": 2
    }
    
  ]
};
