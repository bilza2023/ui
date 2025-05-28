
// factories/bodyFactories.js
import { TemplateToolkit } from '../toolkit/Toolkit';

const { Anim, layout, stylePresets, designWidth, designHeight } = TemplateToolkit;


/**
 * @param {Array<{ text: string, showAt: number, animOptions?: any }>} data
 * @param {{ iconType?: string, gap?: number }} config
 * @returns {(theme: any) => SlideItem[]}
 */

export const bodyFactories = {
  bullets: (data, config = {}) => (theme) => {
    const items = [];
    const { iconType = 'disc', gap = theme.layout.lineHeight } = config;
    const leftX = theme.layout.sidePadding;
    let currentY = theme.layout.headingHeight + theme.layout.spacing;

    data.forEach((entry) => {
      const showTime = entry.showAt;

      // Icon or bullet
      items.push({
        type: 'icon',
        iconName: iconType,
        x: leftX,
        y: currentY,
        size: theme.stylePresets.bulletSize,
        showAt: showTime,
        ...Anim.fadeIn(showTime, showTime + 0.5)
      });

      // Text
      items.push({
        type: 'text',
        x: leftX + theme.layout.bulletIndent,
        y: currentY,
        width: theme.designWidth - theme.layout.sidePadding * 2 - theme.layout.bulletIndent,
        height: null,
        text: entry.text,
        style: theme.stylePresets.body,
        showAt: showTime,
        ...Anim.fadeIn(showTime, showTime + 0.5)
      });

      currentY += gap;
    });

    return items;
  }
};
