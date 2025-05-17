export function bulletPoint(content = "Bullet Point", color = "white", fontSize = 40) {
    return {
      type: "text",
      text: content,
      color: color,
      fontSize: fontSize,
      fontFamily: "Georgia",
      textAlign: "left",
      lineHeight: 1.6,
      padding: 8,
      backgroundColor: null,
      borderColor: null,
      borderWidth: 0,
      rotation: 0,
      zIndex: 0,
      visible: true
    };
  }
  