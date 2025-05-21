
export function getEmoji (text = "🎉💯🔥") {
  return {
    type: "emoji",
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    text,
    fontSize: 48,
    fontFamily: "Segoe UI Emoji", // Windows
    color: "#000000",
    rotation: 0,
    zIndex: 1,
    visible: true
  };
  
}
