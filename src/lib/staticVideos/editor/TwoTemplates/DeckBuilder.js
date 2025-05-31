// QuickDeckBuilder.js
import { DeckBuilderBase } from "./DeckBuilderBase.js";

export class DeckBuilder extends DeckBuilderBase {
  constructor() {
    super();
    this.qHalf = null;
  }

  startQuickHalf(endTime) {
    this.qHalf = { endTime };
  }

  setLeftHalf(key, data = [], config = {}) {
    if (!this.qHalf) throw new Error("startQuickHalf must be called first");
    this.qHalf.left = { key, data, config };
  }

  setRightHalf(key, data = [], config = {}) {
    if (!this.qHalf) throw new Error("startQuickHalf must be called first");
    this.qHalf.right = { key, data, config };
  }

  commitHalf() {
    const { endTime, left, right } = this.qHalf || {};
    if (!left || !right) throw new Error("Both left and right halves must be defined.");
    this.half(
      endTime,
      left.key, left.data, left.config,
      right.key, right.data, right.config
    );
    this.qHalf = null;
  }
}
