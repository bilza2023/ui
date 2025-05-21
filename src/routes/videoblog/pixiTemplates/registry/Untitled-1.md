LEts concentrate on Jumbotron and SlideTemplate

in slideTemplate we are replacing the data and config we should merge

wrong
export class SlideTemplate {
constructor(data, config, background, canvasDims) {
this.data = data;
this.config = config;

correct
  setData(newData) {
    this.data = { ...this.data, ...newData };
  }
  
  setConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
  
  