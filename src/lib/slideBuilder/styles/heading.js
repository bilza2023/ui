export function heading(content = "Heading Text", color = "red", fontSize = 70) {
  return {
    type: "text",
    text: content,
    color: color,
    fontSize: fontSize,
    fontFamily: "Georgia",
    textAlign: "center",
    lineHeight: 1.4,
    padding: 10,
    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
    rotation: 0,
    zIndex: 0,
    visible: true
  };
}
