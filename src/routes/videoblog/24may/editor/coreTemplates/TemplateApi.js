// templates/index.js
// Central API for slide templates and item factories

import { full, half } from './index';
import { factories } from '../itemFactories';

/**
 * Core slide templates:
 *  - full: header + body + footer
 *  - half: header + left + right + footer
 */
export const temp = {
  /**
   * Full-slide layout:
   * @param {Object} slots
   * @param {Function} slots.heading - headingFactories.h1/2(...) invocation
   * @param {Function} slots.body    - bodyFactories.bullets/... invocation
   * @param {Function} [slots.footer] - footerFactories.defaultFooter() invocation
   * @returns {{ getSlide: () => (theme, data?) => SlideItem[] }}
   */
  full,

  /**
   * Half-slide layout:
   * @param {Object} slots
   * @param {Function} [slots.heading]
   * @param {Function} slots.left    - left-side factory invocation
   * @param {Function} slots.right   - right-side factory invocation
   * @param {Function} [slots.footer]
   * @returns {{ getSlide: () => (theme, data?) => SlideItem[] }}
   */
  half
};

/**
 * Available atomic item factories:
 *  - heading: h1, h2, ...
 *  - body: bullets, numberedList, sideBySide, ...
 *  - footer: defaultFooter, ...
 */
export const factories = {
  heading: factories.heading,
  body:    factories.body,
  footer:  factories.footer
};

// Usage example:
//
// import { temp, factories } from './templates';
//
// const slideFn = temp.full({
//   heading: factories.heading.h1("Key Takeaways"),
//   body:    factories.body.bullets(bulletsData, { iconType: "disc", gap: 24 }),
//   footer:  factories.footer.defaultFooter()
// }).getSlide();
//
// deck.add(slideFn, /* endTime */ 53);
