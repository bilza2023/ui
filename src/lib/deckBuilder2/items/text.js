// $lib/slideBuilder/items/jumboText.js

export function text(content = "Normal Text") {
    return {
      type: "text",
      text: content,
      color: "black",
      fontSize: 35,
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
  