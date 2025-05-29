import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a structured table with rows of text, with optional cell borders.
 * Supports both array-of-arrays and array-of-objects formats.
 * @param {object} theme  Global theme
 * @param {Array<Array<string>|{cells:string[], showAt?:number}>} rows  Table data
 * @param {object} config  Configuration options
 */
export default function table(theme, rows = [], config = {}) {
  const {
    fontSize = 28,
    fontFamily = "Arial",
    textAlign = "center",
    borderColor = "#000000",
    borderWidth = 2,
    cellPadding = 12,
    x = (T.designWidth - 820) / 2,
    y = 100,
    width = 820,
    rowHeight = fontSize * 2.2,
    textColor = theme.baseTextColor,
    drawBorders = false
  } = config;

  // Normalize rows: allow array of arrays
  const normalized = rows.map(r => Array.isArray(r) ? { cells: r, showAt: undefined } : r);

  const items = [];
  const numCols = normalized[0]?.cells.length || 1;
  const cellWidth = width / numCols;

  normalized.forEach((row, rowIndex) => {
    const yPos = y + rowIndex * rowHeight;
    const showAt = row.showAt;

    row.cells.forEach((cellText, colIndex) => {
      const xPos = x + colIndex * cellWidth;

      if (drawBorders) {
        const rect = T.ItemBuilders.rect(theme, {
          x: xPos,
          y: yPos,
          width: cellWidth,
          height: rowHeight,
          color: borderColor,
          borderWidth
        });
        rect.alpha = 1;
        items.push(rect);
      }

      const cell = T.ItemBuilders.text(theme, {
        text: cellText,
        x: xPos + cellPadding,
        y: yPos + cellPadding,
        width: cellWidth - 2 * cellPadding,
        height: rowHeight - 2 * cellPadding,
        fontSize,
        fontFamily,
        textAlign,
        color: textColor.startsWith('#') ? textColor : `#${textColor}`
      });
      cell.alpha = 1;

      // Optional showAt, no fade-out
      if (showAt !== undefined) {
        T.AniHelpers.showAndStay(cell, showAt);
      }

      items.push(cell);
    });
  });

  return items;
}
