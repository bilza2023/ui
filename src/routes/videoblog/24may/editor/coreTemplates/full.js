
// coreTemplates/core/full.js
/**
 * Full-slide layout template: header, body, footer in order.
 * @param {Object} slots
 * @param {Function} slots.heading - heading factory invocation (theme => SlideItem[])
 * @param {Function} slots.body    - body factory invocation (theme => SlideItem[])
 * @param {Function} [slots.footer] - optional footer factory invocation
 * @returns {{ getSlide: () => (theme: any, data?: any) => SlideItem[] }}
 */
export function full({ heading, body, footer }) {
    return {
      getSlide() {
        return (theme, data = {}) => {
          const items = [];
          if (heading) items.push(...heading(theme));
          if (body)    items.push(...body(theme));
          if (footer)  items.push(...footer(theme));
          return items;
        };
      }
    };
  }
