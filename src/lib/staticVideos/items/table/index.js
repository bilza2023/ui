export default function table(data = {}) {
    const {
      x = 100,
      y = 100,
      width = 800,
      height = 300,
      rows = [], // Array of { cells: [..], showAt: number }
      fontSize = 28,
      fontFamily = "Arial",
      cellPadding = 12,
      borderColor = "#000000",
      borderWidth = 2,
      textAlign = "center",
      rotation = 0,
      visible = true,
      zIndex = 1,
    } = data;
  
    return {
      type: "table",
      x,
      y,
      width,
      height,
      rows,
      fontSize,
      fontFamily,
      cellPadding,
      borderColor,
      borderWidth,
      textAlign,
      rotation,
      visible,
      zIndex
    };
  }
  