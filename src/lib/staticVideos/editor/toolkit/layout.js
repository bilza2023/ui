// layout.js
// Defines fixed header and body zones, plus helper for vertical alignment

export const layout = {
    // Header occupies top of slide
    headerZone: { y: 0, height: 120 },
    
    // Body zone starts just below header
    bodyZone: {
      y: 120,
      height: 576 - 120, // designHeight(576) minus header height
    },
  
    /**
     * Computes the y-coordinate within bodyZone for given alignment.
     * @param {'top'|'center'|'bottom'} alignment
     * @param {number} contentHeight
     * @returns {number} y position
     */
    getBodyY(alignment, contentHeight) {
      const { y, height } = this.bodyZone;
      switch (alignment) {
        case 'center':
          return y + (height - contentHeight) / 2;
        case 'bottom':
          return y + height - contentHeight;
        default:
          return y; // top
      }
    }
  };