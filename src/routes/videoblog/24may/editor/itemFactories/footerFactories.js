// factories/footerFactories.js
import { TemplateToolkit } from '../toolkit/Toolkit';

const { Anim, layout, stylePresets, designWidth, designHeight } = TemplateToolkit;


/**
 * @returns {(theme: any) => SlideItem[]}
 */
export const footerFactories = {
  /**
   * Default footer: center-aligned text at bottom of the slide.
   */
  defaultFooter: () => (theme) => {
    const items = [];

    // Position: horizontally centered, just above bottom padding
    const x = theme.designWidth / 2;
    const y = theme.designHeight - theme.layout.bottomPadding;

    items.push({
      type: 'text',
      x,
      y,
      width: theme.designWidth - theme.layout.sidePadding * 2,
      height: null, // renderer computes height
      text: theme.footerText || '',
      style: theme.stylePresets.footer,
      showAt: 0,
      ...Anim.fadeIn(0, 0.5)
    });

    return items;
  }
};

// factories/index.js

