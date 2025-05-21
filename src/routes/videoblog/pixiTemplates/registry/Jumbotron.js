import { SlideTemplate } from "../SlideTemplate.js";

export function Jumbotron(data = {}, config = {}, background = {}, canvasDims) {
  const tmpl = new SlideTemplate(data, config, background, canvasDims);

  // Required setup by deck builder or template system
  tmpl.setStartTime(data.startTime || 0);
  tmpl.setEndTime(data.endTime || 5);
  tmpl.globalTheme = config.globalTheme || {}; // fallback to empty object if not provided
  tmpl.setBackgroundColor(tmpl.globalTheme.backgroundColor);
  tmpl.items = [
    {
      data: {
        id: "jumbo-title",
        type: "text",
        text: data.title || "Default Title",
        x: canvasDims.width / 2 - 150,
        y: canvasDims.height / 4,
        width: 300,
        fontSize: 48,
        fontFamily: config.fontFamily || "Arial",
        color: config.primaryColor || "#ffffff",
        padding: 0,
        textAlign: "center",
        rotation: 0,
        zIndex: 2,
        showAt: 0
      },
      animations: [],
      effects: []
    }
  ];

  return tmpl.buildSlide();
}
