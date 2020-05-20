import { DrawableRectangle } from './Drawable/DrawableRectangle';

export class DrawableZone extends DrawableRectangle {
  constructor({
    zone,
    xCenter,
    yCenter,
    width,
    height,
    color,
  }, two) {
    super({
    xCenter,
    yCenter,
    width,
    height,
    color,
    }, two);
    this.id = zone.id;
    this.name = zone.name;
  }

  draw() {
    super.draw();
    this._writeText();
    this.update();
  }

  _writeText() {
    const text = this.two.makeText(this.name, this.xCenter, this.yCenter);
    text.size = 14;
  }
}
