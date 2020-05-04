import {DrawableRectangle} from './Drawable.js';

export class Zone extends DrawableRectangle {
  draw() {
    this._writeZoneName();
    super.draw();
  }

  _writeZoneName() {
    let text = this.canvas.makeText(this.name, this.xCenter, this.yCenter);
    text.size = 14;
  }
}
