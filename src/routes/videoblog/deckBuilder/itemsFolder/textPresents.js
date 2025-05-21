

function applyHeadingStyle(textObj) {
    textObj.fontSize = 80;
    textObj.fontFamily = "Arial Black";
    textObj.lineHeight = 1.1;
    textObj.padding = 20;
    return textObj;
  }
  

function jumbotron(textObj) {
    textObj.fontSize = 200;
    textObj.fontFamily = "Arial Black";
    textObj.lineHeight = 1.1;
    textObj.padding = 20;
    return textObj;
  }
  
  function applySubtitleStyle(textObj) {
    textObj.fontSize = 50;
    textObj.fontFamily = "Georgia";
    textObj.lineHeight = 1.3;
    textObj.padding = 20;
    return textObj;
  }
  
  function applyQuoteStyle(textObj) {
    textObj.fontSize = 40;
    textObj.fontFamily = "Times New Roman";
    textObj.lineHeight = 1.5;
    textObj.padding = 30;
    return textObj;
  }
  
  // Export all as a single object
  export const TextPresets = {
    heading: applyHeadingStyle,
    subtitle: applySubtitleStyle,
    quote: applyQuoteStyle,
    jumbotron
  };
  