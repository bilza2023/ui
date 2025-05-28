// half.js
import { cloneBackground } from './backgroundUtils.js';
import { fullComponents  } from './fullComponents.js';

export default function half(
  builder,
  endTime,
  leftKey,   leftData = [],  leftConfig = {},
  rightKey,  rightData = [], rightConfig = {}
) {
  if (!builder.globalTheme || !builder.globalBackground) {
    throw new Error('DeckBuilder: theme or background not set');
  }

  // 1) Gather header items, if any
  let allItems = [];
  if (builder.currentHeader) {
    const { templateKey: hKey, data: hData, config: hCfg } = builder.currentHeader;
    allItems.push(...fullComponents[hKey](builder.globalTheme, hData, hCfg));
  }

  // 2) Compute offsets
  const halfWidth = builder.globalTheme.designWidth / 2;
  const yOffset  = builder.getHeaderHeight();
  const leftCfg  = { ...leftConfig,  xOffset: 0,          yOffset };
  const rightCfg = { ...rightConfig, xOffset: halfWidth, yOffset };

  // 3) Invoke left & right components
  allItems.push(...fullComponents[leftKey]( builder.globalTheme, leftData,  leftCfg));
  allItems.push(...fullComponents[rightKey](builder.globalTheme, rightData, rightCfg));

  // 4) Allocate timing
  const startTime = builder.currentStart;
  const duration  = endTime - startTime;
  if (duration < builder.minDuration) {
    throw new Error(`Minimum slide duration is ${builder.minDuration}s`);
  }
  builder.currentStart = endTime;

  // 5) Store slide with cloned background
  const background = cloneBackground(builder.globalBackground);
  builder.slides.push({ background, items: allItems, startTime, endTime });
}
