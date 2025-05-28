  
  // coreTemplates/core/half.js  
  /**
   * Half-slide layout template: header, left block, right block, footer.
   * @param {Object} slots
   * @param {Function} [slots.heading] - optional heading factory invocation
   * @param {Function} slots.left    - left-side factory invocation
   * @param {Function} slots.right   - right-side factory invocation
   * @param {Function} [slots.footer]  - optional footer factory invocation
   * @returns {{ getSlide: () => (theme: any, data?: any) => SlideItem[] }}
   */
  export function half({ heading, left, right, footer }) {
    return {
      getSlide() {
        return (theme, data = {}) => {
          const items = [];
          if (heading) items.push(...heading(theme));
          if (left)    items.push(...left(theme));
          if (right)   items.push(...right(theme));
          if (footer)  items.push(...footer(theme));
          return items;
        };
      }
    };
  }
  