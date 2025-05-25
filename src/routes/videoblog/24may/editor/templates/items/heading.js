
// templates/items/heading.js

export default function heading(globalTheme, data = {}) {
    const {
      text = "Sample Heading",
      x = 100,
      y = 100,
      width = 800,
      height = 100,
      fontSize = 48,
      textAlign = "center",
    } = data;
  
    return [
      {
        type: "text",
        x,
        y,
        width,
        height,
        text,
        fontSize,
        fontFamily: globalTheme.fontFamilyHeading || "Arial",
        color: globalTheme.headingColor || "#ffffff",
        textAlign,
        padding: 10,
      },
    ];
  }