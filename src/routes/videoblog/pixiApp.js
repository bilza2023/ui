

import * as PIXI from 'pixi.js';


export function pixiApp(backgroundColor,width,height){
    
    const app = new PIXI.Application({
        width,
        height,
        backgroundColor,
      });
      return app;
}