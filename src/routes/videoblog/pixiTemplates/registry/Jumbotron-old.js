
import { SlideTemplate } from "../SlideTemplate.js";
import { textItem } from "../items/textItem.js"; // or a central repo

export function Jumbotron() {
  
  const tmpl = new SlideTemplate();

  // Required setup by deck builder or template system
  tmpl.setData({title : "Title Of The Slide"});
  tmpl.setStartTime(0);
  tmpl.setEndTime( 5);

 
  tmpl.getItems = function(){
 
    //we have to keep this in the function
    tmpl.setBackgroundColor(tmpl.globalTheme.backgroundColor);
    const headingItem = textItem();

    headingItem.data.text =  tmpl.data.title || "Default Title";
    headingItem.data.x =  150;
    headingItem.data.y =  150;
    
    return   [ headingItem ];
  }
 

  return tmpl;
}

