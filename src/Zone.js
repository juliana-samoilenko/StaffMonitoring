import {DrawableRectangle} from './Drawable.js';

export class Zone extends DrawableRectangle {
  draw() {
    super.draw();
    this._writeText();
  }

  _writeText() {
    let text = this.canvas.makeText(this.name, this.xCenter, this.yCenter);
    text.size = 14;
    this.canvas.update();
  }
}
