export const designWidth = 1020;
export const designHeight = 576;

export const slides = [
  {
    id: 'stress-100-dots',
    backgroundColor: '#222222',  // ✅ NEW LINE
    startTime: 0,
    endTime: 4,
    items: Array.from({ length: 100 }, (_, i) => ({
      type: 'circle',
      x: (i % 10) * 100 + 10,
      y: Math.floor(i / 10) * 50 + 10,
      width: 20,
      height: 20,
      fillColor: '#888'
    }))
  }
];
