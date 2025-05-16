// $lib/slideBuilder/items/jumboText.js

export function jumboText(content = "Main Headline", color = "white", fontSize = 100) {
    return {
      type: "text",
      text: content,
      color: color,
      fontSize: fontSize,
      fontFamily: "Georgia",
      textAlign: "center",
      lineHeight: 1.2,
      padding: 20,
      backgroundColor: null,
      borderColor: null,
      borderWidth: 0,
      rotation: 0,
      zIndex: 0,
      visible: true
    };
  }
  