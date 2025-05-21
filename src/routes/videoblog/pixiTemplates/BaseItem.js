// BaseItem.js

export class BaseItem {
    constructor({ id, type, displayObject, showAt, stateTriggers = [], animations = [], meta = {} }) {
      this.id = id;
      this.type = type;
      this.displayObject = displayObject;
      this.showAt = showAt;
      this.stateTriggers = stateTriggers;
      this.animations = animations;
      this.meta = meta;
    }
  
    renderTo(container) {
      container.addChild(this.displayObject);
    }
  
    applyTimeline(currentTime) {
      // Handle showAt
      if (this.showAt !== undefined && currentTime < this.showAt) {
        this.displayObject.visible = false;
        return;
      } else {
        this.displayObject.visible = true;
      }
  
      // Handle stateTriggers
      for (const trigger of this.stateTriggers) {
        if (!trigger.fired && currentTime >= trigger.at) {
          this.applyEffect(trigger);
          trigger.fired = true;
        }
      }
  
      // Handle animations (deferred)
      // Implement animation logic here if needed
    }
  
    applyEffect(trigger) {
      // Dummy effect handler (override in subclass or attach effect registry)
      if (trigger.type === 'dim') {
        this.displayObject.alpha = 0.5;
      } else if (trigger.type === 'hide') {
        this.displayObject.visible = false;
      } else if (trigger.type === 'show') {
        this.displayObject.visible = true;
      }
      // Add more effects or delegate to EffectsRegistry
    }
  
    destroy() {
      this.displayObject.destroy({ children: true });
    }
  }
  