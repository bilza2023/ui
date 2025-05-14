
// src/lib/slides-tests/geometry/corners.js
export const designWidth = 1020;
export const designHeight = 576;

export const slides = [
  {
    id: 'test-corners',
    backgroundColor: '#222222',  // ✅ NEW LINE
    startTime: 0,
    endTime: 3,
    items: [
      { type: 'rect', x: 0, y: 0, width: 100, height: 100, fillColor: '#f00' },
      { type: 'rect', x: 920, y: 0, width: 100, height: 100, fillColor: '#0f0' },
      { type: 'rect', x: 0, y: 476, width: 100, height: 100, fillColor: '#00f' },
      { type: 'rect', x: 920, y: 476, width: 100, height: 100, fillColor: '#ff0' }
    ]
  }
];
