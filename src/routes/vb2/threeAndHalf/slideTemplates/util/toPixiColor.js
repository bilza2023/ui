

export default function toPixiColor(color) {
  if (typeof color === "string" && color.startsWith("#")) {
    const hex = color.slice(1);
    // Force prepend 0x and parse
    const no = Number("0x" + hex.padStart(6, "0"));
    return no;
  }
  return color;
}
