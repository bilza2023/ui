
// factories/headingFactories.js
import { TemplateToolkit } from '../toolkit/Toolkit';

const { Anim, layout, stylePresets, designWidth, designHeight } = TemplateToolkit;


/**
 * @param {string} text
 * @returns {(theme: any) => SlideItem[]}
 */
export const headingFactories = {
  h1: (text) => (theme) => {
    const items = [];
    // Example positioning: centered at top
    const x = theme.designWidth / 2;
    const y = 10;

    items.push({
      type: 'text',
      x,
      y,
      width: 200,
      height: null, // height calculated by renderer
      text,
      style: theme.stylePresets.heading1,
      showAt: 0,
      ...Anim.fadeIn(0, 0.5)
    });

    return items;
  },

  h2: (text) => (theme) => {
    const items = [];
    const x = theme.layout.sidePadding;
    const y = theme.layout.topPadding;

    items.push({
      type: 'text',
      x,
      y,
      width: theme.designWidth - theme.layout.sidePadding * 2,
      height: null,
      text,
      style: theme.stylePresets.heading2,
      showAt: 0,
      ...Anim.fadeIn(0, 0.5)
    });

    return items;
  }
};
