import { DrawableRectangle } from './Drawable/DrawableRectangle';

export class Zone extends DrawableRectangle {
  draw() {
    super.draw();
    this._writeText();
  }

  _writeText() {
    const text = this.two.makeText(this.name, this.xCenter, this.yCenter);
    text.size = 14;
    this.two.update();
  }
}
