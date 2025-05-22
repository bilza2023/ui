



export default class SlideBuilder {



setBackgroundColor(color) {
    if (typeof color === "string" && color.startsWith("#")) {
        // Convert "#RRGGBB" to number
        this.backgroundColor = parseInt(color.slice(1), 16);
    } else if (typeof color === "number") {
        this.backgroundColor = color;
    } else {
        throw new Error("Invalid backgroundColor. Use hex number or '#rrggbb' string.");
    }
    return this;
}
      
}