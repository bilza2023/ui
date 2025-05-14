export const designWidth = 1020;
export const designHeight = 576;

export const slides = [
  {
    id: 'zindex-overlap',
    backgroundColor: '#222222',  // ✅ NEW LINE
    startTime: 0,
    endTime: 4,
    items: [
      {
        type: 'rect',
        x: 300, y: 150, width: 400, height: 200,
        fillColor: '#999', zIndex: 0
      },
      {
        type: 'circle',
        x: 350, y: 200, width: 100, height: 100,
        fillColor: '#f00', zIndex: 2
      },
      {
        type: 'text',
        x: 320, y: 180, width: 200, height: 60,
        text: "Middle Layer", fontSize: 20,
        color: '#000', backgroundColor: '#fff', zIndex: 1
      }
    ]
  }
];
