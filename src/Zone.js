import {DrawableRectangle} from './Drawable.js';

export default class Zone extends DrawableRectangle {
  draw() {
    super.draw();
    this._writeZoneName();
    this.canvas.update();
  }

  _writeZoneName() {
    let text = this.canvas.makeText(this.name, this.xCenter, this.yCenter);
    text.size = 14;
  }
}
