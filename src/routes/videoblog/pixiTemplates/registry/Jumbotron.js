
import { SlideTemplate } from "../SlideTemplate.js";

export function Jumbotron() {
  
  const tmpl = new SlideTemplate();

  // Required setup by deck builder or template system
  tmpl.setData({title : "Title Of The Slide"});
  tmpl.setStartTime(0);
  tmpl.setEndTime( 5);

 
  tmpl.getItems = function(){
    
    tmpl.setBackgroundColor(tmpl.globalTheme.backgroundColor);
    return   [
        {
          data: {
            id: "jumbo-title",
            type: "text",
            text: tmpl.data.title || "Default Title",
            x: 150,
            y: 150,
            width: 300,
            fontSize: 48,
            fontFamily:  "Arial",
            color: tmpl.globalTheme.primaryColor,
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
  }
 

  return tmpl;
}
